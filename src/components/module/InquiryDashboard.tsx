import React, { useState, useMemo } from "react";
import {
  Search, Filter, Check, X, ChevronDown, ChevronUp, RefreshCw,
  TrendingUp, Landmark, ArrowRightLeft, DollarSign, Wallet,
  HelpCircle, Sparkles, Send, Clock, FileSpreadsheet, Download
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getExchangeRates, getQuotedRequests, postQuoteRequest, updateQuoteStatus, QuotedRateRequest } from "@/lib/inquiry";

export function InquiryDashboard() {
  const [activeTab, setActiveTab] = useState("rates");
  const [updateTick, setUpdateTick] = useState(0);
  const triggerUpdate = () => setUpdateTick(prev => prev + 1);

  // Load datasets
  const rates = useMemo(() => getExchangeRates(), []);
  const quotes = useMemo(() => getQuotedRequests(), [updateTick]);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <a href="/app" className="hover:text-navy">Dashboard</a>
        <ChevronDown className="w-3 h-3 -rotate-90" />
        <span className="text-foreground font-semibold">Treasury Exchange Rates</span>
      </nav>

      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
        <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Exchange Rate & FX Inquiry</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          View real-time central clearing board rates, convert currencies dynamically, and negotiate custom quoted spot rates for high-volume corporate transactions.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-sm text-navy">
        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0">
            <DollarSign className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">USD Board Buy</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              ৳ 117.50
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Board Spot Rate (BDT)</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 text-success grid place-items-center shrink-0">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Market Shift</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              +0.15% (USD)
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Daily delta volatility</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center shrink-0">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">FX Negotiations</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {quotes.filter(q => q.status === "Pending Quote").length} RFQs Pending
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Special rate quotes active</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border w-full justify-start p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="rates" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <TrendingUp className="w-3.5 h-3.5" /> Exchange Board & Converter
          </TabsTrigger>
          <TabsTrigger value="negotiate" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <ArrowRightLeft className="w-3.5 h-3.5" /> Special Quoted Rates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rates">
          <RatesAndConverterTab rates={rates} />
        </TabsContent>

        <TabsContent value="negotiate">
          <NegotiationQuotesTab
            quotes={quotes}
            rates={rates}
            onTriggerUpdate={triggerUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* =========================================================================
   TAB 1: EXCHANGE BOARD & CONVERTER
   ========================================================================= */
function RatesAndConverterTab({ rates }: { rates: any[] }) {
  // Converter states
  const [amount, setAmount] = useState("1000");
  const [sourceCcy, setSourceCcy] = useState("USD");
  const [targetCcy, setTargetCcy] = useState("BDT");

  const convertedAmount = useMemo(() => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return 0;
    if (sourceCcy === targetCcy) return amt;

    // Direct conversion logic
    if (sourceCcy === "BDT") {
      const rateObj = rates.find(r => r.baseCcy === targetCcy);
      return rateObj ? amt / rateObj.sellingRate : amt;
    } else if (targetCcy === "BDT") {
      const rateObj = rates.find(r => r.baseCcy === sourceCcy);
      return rateObj ? amt * rateObj.buyingRate : amt;
    } else {
      // Cross rate through BDT
      const srcRate = rates.find(r => r.baseCcy === sourceCcy);
      const tgtRate = rates.find(r => r.baseCcy === targetCcy);
      if (srcRate && tgtRate) {
        const bdtValue = amt * srcRate.buyingRate;
        return bdtValue / tgtRate.sellingRate;
      }
      return amt;
    }
  }, [amount, sourceCcy, targetCcy, rates]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Board rates list */}
      <Card className="lg:col-span-7 border border-border">
        <CardHeader className="bg-muted/10 border-b border-border py-3 flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Board Spot Rates</CardTitle>
            <CardDescription className="text-[10px]">Real-time interbank buy/sell clearing indicators.</CardDescription>
          </div>
          <Badge variant="outline" className="text-[9px] border-success/30 text-success bg-success/5 font-mono">Board Live</Badge>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Currency Pair</TableHead>
              <TableHead>Base</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead className="text-right">Bank Buying Rate</TableHead>
              <TableHead className="text-right">Bank Selling Rate</TableHead>
              <TableHead className="text-center pr-4">Daily Shift</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rates.map(rate => (
              <TableRow key={rate.pair} className="hover:bg-muted/10">
                <TableCell className="pl-4 font-bold text-navy text-xs font-mono">{rate.pair}</TableCell>
                <TableCell className="text-xs">{rate.baseCcy}</TableCell>
                <TableCell className="text-xs">{rate.quoteCcy}</TableCell>
                <TableCell className="text-right font-mono text-xs font-bold text-navy">{rate.buyingRate.toFixed(2)}</TableCell>
                <TableCell className="text-right font-mono text-xs font-bold text-navy">{rate.sellingRate.toFixed(2)}</TableCell>
                <TableCell className="text-center pr-4 font-mono text-[10px]">
                  <span className={rate.change.startsWith("+") ? "text-success" : rate.change.startsWith("-") ? "text-destructive" : "text-muted-foreground"}>
                    {rate.change}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Converter tool */}
      <Card className="lg:col-span-5 border border-border">
        <CardHeader className="bg-muted/10 border-b border-border py-3">
          <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Treasury Rate Converter</CardTitle>
          <CardDescription className="text-[10px]">Simulated FX conversion values based on board spot rates.</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-4 text-xs text-navy">
          <div className="space-y-1">
            <Label htmlFor="conv-amt">Conversion Amount</Label>
            <Input
              id="conv-amt"
              type="number"
              placeholder="0.00"
              className="text-xs font-mono"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Source Currency</Label>
              <Select value={sourceCcy} onValueChange={setSourceCcy}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BDT">BDT — Bangladesh Taka</SelectItem>
                  <SelectItem value="USD">USD — US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR — Euro</SelectItem>
                  <SelectItem value="GBP">GBP — British Pound</SelectItem>
                  <SelectItem value="SAR">SAR — Saudi Riyal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Target Currency</Label>
              <Select value={targetCcy} onValueChange={setTargetCcy}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BDT">BDT — Bangladesh Taka</SelectItem>
                  <SelectItem value="USD">USD — US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR — Euro</SelectItem>
                  <SelectItem value="GBP">GBP — British Pound</SelectItem>
                  <SelectItem value="SAR">SAR — Saudi Riyal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Result visualizer */}
          <div className="bg-navy/5 border border-navy/10 p-4 rounded-lg flex items-center justify-between text-navy mt-2">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-sans">Quoted Value</span>
              <div className="font-display text-xl font-bold font-mono">
                {convertedAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {targetCcy}
              </div>
            </div>
            <Badge variant="outline" className="text-[10px] border-gold/40 text-gold bg-gold/5 font-sans">
              Spot Base: 1 {sourceCcy}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* =========================================================================
   TAB 2: SPECIAL QUOTED RATES (NEGOTIATED RFQS)
   ========================================================================= */
function NegotiationQuotesTab({
  quotes,
  rates,
  onTriggerUpdate
}: {
  quotes: QuotedRateRequest[];
  rates: any[];
  onTriggerUpdate: () => void;
}) {
  const [rfqModal, setRfqModal] = useState(false);
  const [pair, setPair] = useState("USD/BDT");
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState<"Buy" | "Sell">("Buy");
  const [reqRate, setReqRate] = useState("");

  const handleCreateRFQ = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(amount);
    const rateVal = parseFloat(reqRate);
    if (isNaN(amountVal) || amountVal <= 0 || isNaN(rateVal) || rateVal <= 0) {
      toast.error("Please fill in valid positive amount and requested rate fields.");
      return;
    }

    postQuoteRequest(pair, amountVal, side, rateVal);
    toast.success(`Spot Rate RFQ submitted to treasury desk.`);
    setRfqModal(false);
    onTriggerUpdate();

    // Reset Form
    setAmount("");
    setReqRate("");
  };

  const handleUpdateStatus = (id: string, status: "Accepted" | "Expired", rate?: number) => {
    updateQuoteStatus(id, status, rate);
    toast.success(`Quote successfully marked as ${status}.`);
    onTriggerUpdate();
  };

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      "Pending Quote": "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
      "Quoted": "bg-sky-500/15 text-sky-600 border-sky-500/30",
      "Accepted": "bg-success/15 text-success border-success/30",
      "Expired": "bg-destructive/15 text-destructive border-destructive/30"
    };
    return <Badge className={`text-[10px] font-semibold ${map[s] || ""}`} variant="outline">{s}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Search & Action Panel */}
      <Card className="p-4 bg-card border border-border flex justify-between items-center flex-wrap gap-2">
        <div>
          <h4 className="text-navy text-sm font-bold">Negotiated Corporate Quotes</h4>
          <p className="text-[10px] text-muted-foreground mt-0.5">Submit custom spot price RFQs for central bank/high volume swaps.</p>
        </div>
        <Button onClick={() => setRfqModal(true)} className="bg-navy hover:bg-navy/90 text-xs h-8">
          Request Spot Rate Quote (RFQ)
        </Button>
      </Card>

      {/* Quotes Table Grid */}
      <Card className="border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">RFQ Ref</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Currency Pair</TableHead>
              <TableHead className="text-right">Transaction Volume</TableHead>
              <TableHead className="text-center">Order Side</TableHead>
              <TableHead className="text-right">Target Rate (BDT)</TableHead>
              <TableHead className="text-right">Treasury Quote</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map(req => (
              <TableRow key={req.id} className="hover:bg-muted/10">
                <TableCell className="pl-4 font-mono text-xs font-semibold text-navy">{req.id}</TableCell>
                <TableCell className="text-xs font-mono">{req.date}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-navy">{req.pair}</TableCell>
                <TableCell className="text-right font-mono text-xs font-semibold">
                  {req.amount.toLocaleString()} {req.pair.split("/")[0]}
                </TableCell>
                <TableCell className="text-center text-xs">
                  <Badge variant="outline" className={`text-[9px] ${
                    req.side === "Buy" ? "border-success/30 text-success bg-success/5" : "border-destructive/30 text-destructive bg-destructive/5"
                  }`}>{req.side}</Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-navy font-semibold">{req.requestedRate.toFixed(2)}</TableCell>
                <TableCell className="text-right font-mono text-xs font-bold text-navy">
                  {req.offeredRate ? req.offeredRate.toFixed(2) : <span className="text-muted-foreground italic text-[10px]">Awaiting Desk</span>}
                </TableCell>
                <TableCell className="text-center">{statusBadge(req.status)}</TableCell>
                <TableCell className="text-right pr-4">
                  {req.status === "Quoted" && (
                    <div className="flex justify-end gap-1">
                      <Button
                        size="sm"
                        className="h-7 text-[10px] bg-success text-white hover:bg-success/90"
                        onClick={() => handleUpdateStatus(req.id, "Accepted", req.offeredRate)}
                      >
                        Accept Rate
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-[10px] text-destructive hover:bg-destructive/10"
                        onClick={() => handleUpdateStatus(req.id, "Expired")}
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                  {req.status === "Pending Quote" && (
                    <div className="flex justify-end gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-[10px] text-navy hover:bg-navy/10"
                        onClick={() => handleUpdateStatus(req.id, "Quoted", req.requestedRate + 0.15)}
                      >
                        Simulate Desk Quote
                      </Button>
                    </div>
                  )}
                  {req.status === "Accepted" && (
                    <span className="text-[10px] text-success font-mono font-semibold italic pr-2">Committed</span>
                  )}
                  {req.status === "Expired" && (
                    <span className="text-[10px] text-muted-foreground font-mono italic pr-2">Expired</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* RFQ Submission Modal */}
      {rfqModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4">
          <Card className="w-full max-w-md border border-border shadow-2xl bg-white">
            <CardHeader className="bg-navy/5 border-b pb-3">
              <CardTitle className="text-navy text-base font-bold flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-gold" /> Spot Rate RFQ Submission
              </CardTitle>
              <CardDescription className="text-xs">
                Submit high-volume currency conversion details to negotiate direct treasury quotes.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleCreateRFQ}>
              <CardContent className="space-y-4 pt-4 text-xs text-navy">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Currency Pair</Label>
                    <Select value={pair} onValueChange={setPair}>
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {rates.map(r => (
                          <SelectItem key={r.pair} value={r.pair}>{r.pair}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Transaction Side</Label>
                    <Select value={side} onValueChange={(val: any) => setSide(val)}>
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Buy">Buy Base Currency</SelectItem>
                        <SelectItem value="Sell">Sell Base Currency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="rfq-volume">Transaction Volume</Label>
                    <Input
                      id="rfq-volume"
                      type="number"
                      placeholder="e.g. 100000"
                      className="text-xs font-mono"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="rfq-rate">Requested Spot Rate (BDT)</Label>
                    <Input
                      id="rfq-rate"
                      type="number"
                      step="0.01"
                      placeholder="e.g. 117.20"
                      className="text-xs font-mono"
                      value={reqRate}
                      onChange={(e) => setReqRate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-yellow-500/5 text-yellow-700 border border-yellow-500/20 rounded p-3 text-xs flex gap-2 items-start">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong>RFQ Terms:</strong> Spot quotes must exceed USD 50,000 equivalent. Custom desk quotes are binding for 60 seconds upon receipt.
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/10 border-t py-3 flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setRfqModal(false)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-navy text-white hover:bg-navy/90 text-xs">
                  Request Spot Quote
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
