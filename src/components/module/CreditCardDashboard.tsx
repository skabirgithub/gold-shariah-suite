import React, { useState, useMemo } from "react";
import {
  CreditCard, Calendar, Plus, RefreshCw, Check, X, Search, Filter,
  ArrowRight, CheckCircle2, ChevronDown, ChevronUp, AlertCircle,
  Building2, HelpCircle, Loader2, Sparkles, AlertTriangle, FileSpreadsheet,
  Download, ArrowRightLeft, Landmark, DollarSign, Wallet
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { OWN_ACCOUNTS } from "@/lib/fundTransfers";
import {
  getCards,
  tagCard,
  getTransactionsForCard,
  getUnbilledTransactions,
  payCardBill,
  CorporateCard,
  CardTransaction
} from "@/lib/creditCards";

export function CreditCardDashboard() {
  const [activeTab, setActiveTab] = useState("summary");
  const [updateTick, setUpdateTick] = useState(0);
  const triggerUpdate = () => setUpdateTick(prev => prev + 1);

  // Load datasets
  const cards = useMemo(() => getCards(), [updateTick]);
  const [selectedCardNo, setSelectedCardNo] = useState<string>(cards[0]?.cardNumber || "");

  const activeCard = useMemo(() => {
    return cards.find(c => c.cardNumber === selectedCardNo) || cards[0];
  }, [cards, selectedCardNo]);

  // Aggregate stats
  const totalLimit = useMemo(() => cards.reduce((sum, c) => sum + c.limitAmount, 0), [cards]);
  const totalOutstanding = useMemo(() => cards.reduce((sum, c) => sum + c.outstandingAmount, 0), [cards]);
  const totalAvailable = useMemo(() => cards.reduce((sum, c) => sum + c.availableLimit, 0), [cards]);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <a href="/app" className="hover:text-navy">Dashboard</a>
        <ChevronDown className="w-3 h-3 -rotate-90" />
        <span className="text-foreground font-semibold">Credit Card Management</span>
      </nav>

      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
        <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Corporate Credit Cards</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Overview of credit limits, settlement dues, mini-statements, real-time unbilled transaction feeds, and Shariah-compliant corporate card linkages.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-sm text-navy">
        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0">
            <CreditCard className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Corporate Limit</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              ৳ {totalLimit.toLocaleString()}
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Consolidated approved credit</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 text-destructive grid place-items-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Total Outstanding</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              ৳ {totalOutstanding.toLocaleString()}
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Total card liabilities</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 text-success grid place-items-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Available Limit</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              ৳ {totalAvailable.toLocaleString()}
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Unutilized spending limit</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Payment Due Date</div>
            <div className="font-display text-base mt-1.5 text-navy font-bold font-sans">
              25 Jun 2026
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Auto-debit instructions active</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border w-full justify-start p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="summary" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <CreditCard className="w-3.5 h-3.5" /> Summary & List
          </TabsTrigger>
          <TabsTrigger value="statement" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <FileSpreadsheet className="w-3.5 h-3.5" /> Details & Statements
          </TabsTrigger>
          <TabsTrigger value="tag" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Plus className="w-3.5 h-3.5" /> Tag Corporate Card
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <CardSummaryTab
            cards={cards}
            onSelectCard={(no) => {
              setSelectedCardNo(no);
              setActiveTab("statement");
            }}
            onTriggerUpdate={triggerUpdate}
          />
        </TabsContent>

        <TabsContent value="statement">
          <CardStatementTab
            activeCard={activeCard}
            cards={cards}
            onSelectCardNo={setSelectedCardNo}
          />
        </TabsContent>

        <TabsContent value="tag">
          <TagCardTab onTriggerUpdate={triggerUpdate} onGoToSummary={() => setActiveTab("summary")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* =========================================================================
   TAB 1: CARD SUMMARY & LIST
   ========================================================================= */
function CardSummaryTab({
  cards,
  onSelectCard,
  onTriggerUpdate
}: {
  cards: CorporateCard[];
  onSelectCard: (no: string) => void;
  onTriggerUpdate: () => void;
}) {
  const [payModal, setPayModal] = useState(false);
  const [payCardNo, setPayCardNo] = useState("");
  const [paySourceAcc, setPaySourceAcc] = useState(OWN_ACCOUNTS[0].label);
  const [payAmount, setPayAmount] = useState("");

  const selectedCardObj = useMemo(() => {
    return cards.find(c => c.cardNumber === payCardNo);
  }, [cards, payCardNo]);

  const handleOpenPay = (cardNumber: string) => {
    setPayCardNo(cardNumber);
    setPayAmount("");
    setPayModal(true);
  };

  const handlePayBill = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(payAmount);
    if (!payCardNo) return;
    if (isNaN(amountVal) || amountVal <= 0) {
      toast.error("Please enter a valid positive payment amount.");
      return;
    }
    if (selectedCardObj && amountVal > selectedCardObj.outstandingAmount) {
      toast.error(`Payment amount BDT ${amountVal.toLocaleString()} cannot exceed outstanding dues of BDT ${selectedCardObj.outstandingAmount.toLocaleString()}.`);
      return;
    }

    payCardBill(payCardNo, amountVal);
    toast.success(`Settlement payment of BDT ${amountVal.toLocaleString()} successfully spooled.`);
    setPayModal(false);
    onTriggerUpdate();
  };

  return (
    <div className="space-y-6">
      {/* Grid of Credit Cards visually styled */}
      <div>
        <h3 className="text-xs uppercase font-bold text-navy tracking-wider mb-4">Active Cards Directory</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => {
            const isVisa = card.cardType.includes("Visa");
            const grad = isVisa
              ? "from-slate-900 via-indigo-950 to-slate-900 border-indigo-500/20"
              : "from-amber-950 via-zinc-900 to-amber-950 border-amber-600/20";
            return (
              <Card
                key={card.id}
                className={`relative overflow-hidden text-white border bg-gradient-to-br shadow-xl aspect-[1.586/1] flex flex-col justify-between p-5 transition-all duration-300 hover:scale-[1.02] ${grad}`}
              >
                {/* Glossmorphic glass filter reflection */}
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[0.5px] pointer-events-none" />

                {/* Card Header */}
                <div className="flex justify-between items-start z-10">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold">SJIBL Corporate</span>
                    <div className="text-[11px] font-sans text-white/80 font-medium mt-0.5">{card.cardType}</div>
                  </div>
                  <Landmark className="w-5 h-5 text-gold/80" />
                </div>

                {/* Chip Icon & Signal */}
                <div className="flex items-center gap-2 z-10 mt-3">
                  <div className="w-7 h-5 rounded bg-amber-400/80 border border-amber-300/40 relative overflow-hidden flex flex-col justify-around px-1 py-0.5">
                    <div className="w-full h-[0.5px] bg-slate-800/20" />
                    <div className="w-full h-[0.5px] bg-slate-800/20" />
                    <div className="w-full h-[0.5px] bg-slate-800/20" />
                  </div>
                  <div className="w-3 h-3 text-white/50 border border-current rounded-full flex items-center justify-center text-[6px]">)))</div>
                </div>

                {/* Card number masked */}
                <div className="font-mono text-base tracking-[0.2em] font-semibold text-white/90 z-10 mt-2">
                  {card.cardNumber}
                </div>

                {/* Card footer details */}
                <div className="flex justify-between items-end z-10 mt-4">
                  <div>
                    <span className="text-[7px] uppercase tracking-wider text-white/50 block">Cardholder</span>
                    <span className="text-xs font-semibold text-white/95">{card.cardholderName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[7px] uppercase tracking-wider text-white/50 block">Available Limit</span>
                    <span className="text-xs font-mono font-bold text-gold">৳ {card.availableLimit.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Structured Cards Table Ledger */}
      <Card className="border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Cardholder Name</TableHead>
              <TableHead>Card Number</TableHead>
              <TableHead>Card Type</TableHead>
              <TableHead className="text-right">Total Limit</TableHead>
              <TableHead className="text-right">Outstanding</TableHead>
              <TableHead className="text-right">Available BDT</TableHead>
              <TableHead className="text-center">Due Date</TableHead>
              <TableHead className="text-right pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map(card => (
              <TableRow key={card.id} className="hover:bg-muted/10">
                <TableCell className="pl-4 font-semibold text-sm">{card.cardholderName}</TableCell>
                <TableCell className="font-mono text-xs font-semibold text-navy">{card.cardNumber}</TableCell>
                <TableCell className="text-xs">
                  <Badge variant="secondary" className="bg-navy/5 text-navy font-semibold text-[10px]">
                    {card.cardType}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">{card.limitAmount.toLocaleString()}</TableCell>
                <TableCell className="text-right font-mono text-xs text-destructive font-semibold">{card.outstandingAmount.toLocaleString()}</TableCell>
                <TableCell className="text-right font-mono text-xs text-success font-semibold">{card.availableLimit.toLocaleString()}</TableCell>
                <TableCell className="text-center text-xs font-mono">{card.dueDate}</TableCell>
                <TableCell className="text-right pr-4">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs text-navy hover:bg-navy/10 px-2"
                      onClick={() => onSelectCard(card.cardNumber)}
                    >
                      Statements
                    </Button>
                    {card.outstandingAmount > 0 && (
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-navy text-white hover:bg-navy/90 px-2"
                        onClick={() => handleOpenPay(card.cardNumber)}
                      >
                        Settle Dues
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pay Bill Modal */}
      {payModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4">
          <Card className="w-full max-w-md border border-border shadow-2xl bg-white">
            <CardHeader className="bg-navy/5 border-b pb-3">
              <CardTitle className="text-navy text-base font-bold flex items-center gap-2">
                <Landmark className="w-5 h-5 text-gold" /> Pay Corporate Card Bill
              </CardTitle>
              <CardDescription className="text-xs">
                Direct settlement of credit card balances from corporate accounts.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePayBill}>
              <CardContent className="space-y-4 pt-4 text-xs text-navy">
                <div className="grid grid-cols-2 gap-3 bg-muted/30 p-3 rounded-lg">
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase">Outstanding Due</span>
                    <strong className="text-destructive font-mono text-sm">
                      BDT {selectedCardObj?.outstandingAmount.toLocaleString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase">Minimum Due</span>
                    <strong className="text-navy font-mono text-sm">
                      BDT {selectedCardObj?.minDue.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="pay-source">Debit Source Account</Label>
                  <Select value={paySourceAcc} onValueChange={setPaySourceAcc}>
                    <SelectTrigger id="pay-source" className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {OWN_ACCOUNTS.map(acc => (
                        <SelectItem key={acc.id} value={acc.label}>{acc.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="pay-amt">Settlement Amount (BDT)</Label>
                  <Input
                    id="pay-amt"
                    type="number"
                    placeholder="0.00"
                    className="text-xs font-mono"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/10 border-t py-3 flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setPayModal(false)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-navy text-white hover:bg-navy/90 text-xs">
                  Settle Credit Ledger
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   TAB 2: DETAILS & STATEMENT
   ========================================================================= */
function CardStatementTab({
  activeCard,
  cards,
  onSelectCardNo
}: {
  activeCard: CorporateCard;
  cards: CorporateCard[];
  onSelectCardNo: (no: string) => void;
}) {
  const [statementFilter, setStatementFilter] = useState<"All" | "Billed" | "Unbilled">("All");

  const transactions = useMemo(() => {
    return getTransactionsForCard(activeCard.cardNumber);
  }, [activeCard]);

  const filteredTxs = useMemo(() => {
    return transactions.filter(t => statementFilter === "All" || t.status === statementFilter);
  }, [transactions, statementFilter]);

  const miniStatement = useMemo(() => {
    // Last 5 transactions
    return transactions.slice(0, 5);
  }, [transactions]);

  const handleExportStatement = () => {
    toast.success("Statement CSV downloaded successfully.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Selector & Card Details Column */}
      <Card className="lg:col-span-4 border border-border">
        <CardHeader className="bg-muted/10 border-b border-border py-3">
          <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Select Active Card</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4 text-xs text-navy">
          <div className="space-y-1">
            <Label>Linked Corporate Cards</Label>
            <Select value={activeCard.cardNumber} onValueChange={onSelectCardNo}>
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cards.map(c => (
                  <SelectItem key={c.id} value={c.cardNumber}>
                    {c.cardholderName} ({c.cardNumber.slice(-4)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <h4 className="font-bold text-[11px] uppercase tracking-wider text-muted-foreground">Card Entitlements & Ledger</h4>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-muted/20 p-3 rounded-md">
              <div className="col-span-2">
                <span className="text-[9px] text-muted-foreground uppercase font-sans">Corporate Entity</span>
                <span className="font-semibold block">{activeCard.entity}</span>
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground uppercase font-sans">Credit Limit</span>
                <span className="font-bold block">৳ {activeCard.limitAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground uppercase font-sans">Available Limit</span>
                <span className="font-bold text-success block">৳ {activeCard.availableLimit.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground uppercase font-sans">Outstanding</span>
                <span className="font-bold text-destructive block">৳ {activeCard.outstandingAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground uppercase font-sans">Min Payment Due</span>
                <span className="font-bold text-navy block">৳ {activeCard.minDue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mini statement & Transaction list ledger */}
      <div className="lg:col-span-8 space-y-6">
        {/* Mini Statement */}
        <Card className="border border-border">
          <CardHeader className="bg-muted/10 border-b border-border py-2 flex flex-row items-center justify-between">
            <CardTitle className="text-navy font-bold text-xs uppercase tracking-wider">Mini Statement (Last 5 Logs)</CardTitle>
            <Badge variant="outline" className="text-[9px] border-gold/40 text-gold bg-gold/5 font-mono">Real-time Feed</Badge>
          </CardHeader>
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="pl-4">Date</TableHead>
                <TableHead>Merchant / Payee</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right pr-4">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {miniStatement.map(tx => (
                <TableRow key={tx.id}>
                  <TableCell className="pl-4 font-mono text-xs">{tx.date}</TableCell>
                  <TableCell className="font-semibold text-xs text-navy">{tx.merchant}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{tx.category}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={`text-[9px] ${
                      tx.status === "Billed" ? "border-navy/30 text-navy bg-navy/5" : "border-yellow-500/30 text-yellow-600 bg-yellow-500/5"
                    }`}>{tx.status}</Badge>
                  </TableCell>
                  <TableCell className={`text-right font-mono text-xs font-bold pr-4 ${tx.amount < 0 ? "text-success" : "text-navy"}`}>
                    {tx.amount < 0 ? "" : "৳ "}{tx.amount.toLocaleString()} {tx.currency !== "BDT" ? tx.currency : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Full transaction ledger & filter */}
        <Card className="border border-border">
          <CardHeader className="bg-muted/10 border-b border-border py-3 flex flex-row items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Card Transaction History</CardTitle>
              <CardDescription className="text-[10px]">Filter billed statements vs current cycle unbilled charges.</CardDescription>
            </div>
            <div className="flex gap-2 items-center">
              <Select value={statementFilter} onValueChange={(val: any) => setStatementFilter(val)}>
                <SelectTrigger className="w-32 h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Items</SelectItem>
                  <SelectItem value="Billed">Billed History</SelectItem>
                  <SelectItem value="Unbilled">Unbilled Statement</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline" onClick={handleExportStatement} className="h-8 text-[11px]">
                <Download className="w-3.5 h-3.5 mr-1" /> Export CSV
              </Button>
            </div>
          </CardHeader>
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="pl-4">TXN ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Billing Cycle</TableHead>
                <TableHead className="text-right pr-4">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTxs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-xs py-6 italic text-muted-foreground">
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTxs.map(tx => (
                  <TableRow key={tx.id}>
                    <TableCell className="pl-4 font-mono text-[11px]">{tx.id}</TableCell>
                    <TableCell className="font-mono text-xs">{tx.date}</TableCell>
                    <TableCell className="font-semibold text-xs text-navy">{tx.merchant}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{tx.category}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={`text-[9px] ${
                        tx.status === "Billed" ? "border-navy/30 text-navy bg-navy/5" : "border-yellow-500/30 text-yellow-600 bg-yellow-500/5"
                      }`}>{tx.status}</Badge>
                    </TableCell>
                    <TableCell className={`text-right font-mono text-xs font-bold pr-4 ${tx.amount < 0 ? "text-success" : "text-navy"}`}>
                      {tx.amount < 0 ? "" : "৳ "}{tx.amount.toLocaleString()} {tx.currency !== "BDT" ? tx.currency : ""}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 3: TAG / LINK CREDIT CARD
   ========================================================================= */
function TagCardTab({
  onTriggerUpdate,
  onGoToSummary
}: {
  onTriggerUpdate: () => void;
  onGoToSummary: () => void;
}) {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState<"Visa Corporate Gold" | "Mastercard Corporate Platinum">("Visa Corporate Gold");
  const [limitAmount, setLimitAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pin, setPin] = useState("");

  const handleTagCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardholderName.trim() || !cardNumber.trim() || !limitAmount || !dueDate || !pin) {
      toast.error("Please fill in all requested fields to authorize card tagging.");
      return;
    }

    // Basic format checks
    if (!/^\d{4}-XXXX-XXXX-\d{4}$/.test(cardNumber)) {
      toast.error("Card number must follow the format: 4521-XXXX-XXXX-8830");
      return;
    }
    if (pin.length !== 4) {
      toast.error("Authorization PIN must be a 4-digit code.");
      return;
    }

    tagCard({
      cardholderName,
      cardNumber,
      cardType,
      limitAmount: parseFloat(limitAmount),
      dueDate
    });

    toast.success(`Corporate Card linked. Secure connection established with card processing server.`);
    onTriggerUpdate();
    onGoToSummary();

    // Clear form
    setCardholderName("");
    setCardNumber("");
    setLimitAmount("");
    setDueDate("");
    setPin("");
  };

  return (
    <Card className="border border-border max-w-xl">
      <CardHeader className="bg-muted/10 border-b border-border py-3">
        <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Link Corporate Credit Card</CardTitle>
        <CardDescription className="text-[10px]">Authenticate and tag an existing corporate credit card to Globex treasury.</CardDescription>
      </CardHeader>
      <form onSubmit={handleTagCard}>
        <CardContent className="pt-4 space-y-4 text-xs text-navy">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="tag-holder">Cardholder Name</Label>
              <Input
                id="tag-holder"
                placeholder="Holder name as printed (e.g. Tania Mahmud)"
                className="text-xs"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tag-type">Card Type / Class</Label>
              <Select value={cardType} onValueChange={(val: any) => setCardType(val)}>
                <SelectTrigger id="tag-type" className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Visa Corporate Gold">Visa Corporate Gold</SelectItem>
                  <SelectItem value="Mastercard Corporate Platinum">Mastercard Corporate Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="tag-no">Card Number (Masked)</Label>
              <Input
                id="tag-no"
                placeholder="4521-XXXX-XXXX-1104"
                className="text-xs font-mono"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tag-limit">Approved Credit Limit (BDT)</Label>
              <Input
                id="tag-limit"
                type="number"
                placeholder="e.g. 1500000"
                className="text-xs font-mono"
                value={limitAmount}
                onChange={(e) => setLimitAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="tag-due">Payment Statement Cycle Date</Label>
              <Input
                id="tag-due"
                type="date"
                className="text-xs"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tag-pin">Verification PIN (4 digits)</Label>
              <Input
                id="tag-pin"
                type="password"
                maxLength={4}
                placeholder="••••"
                className="text-xs text-center tracking-widest font-mono"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-yellow-500/5 text-yellow-700 border border-yellow-500/20 rounded p-3 text-xs flex gap-2 items-start">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong>Security Protocol:</strong> Tagging requires a valid 4-digit verification PIN and will trigger a secure OTP to the cardholder's registered mobile number.
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/10 border-t py-3 flex justify-end gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onGoToSummary} className="text-xs">
            Cancel
          </Button>
          <Button type="submit" size="sm" className="bg-navy text-white hover:bg-navy/90 text-xs">
            Authenticate & Tag Credit Instrument
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
