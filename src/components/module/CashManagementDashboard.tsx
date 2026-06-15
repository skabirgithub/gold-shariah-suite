import React, { useState, useMemo, useEffect } from "react";
import {
  Banknote, Coins, Calendar, Plus, RefreshCw, Check, X, Search, Filter,
  TrendingUp, Clock, FileText, ArrowRight, CheckCircle2, ChevronDown, ChevronUp,
  AlertCircle, Building2, HelpCircle, Loader2, Sparkles, AlertTriangle, Play
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { OWN_ACCOUNTS } from "@/lib/fundTransfers";
import {
  getCollections,
  saveCollection,
  getCampaigns,
  saveCampaign,
  updateCampaignBalance,
  getPostDatedCheques,
  realizePDC,
  returnPDC,
  getInvoices,
  postPartialCollection,
  getSweepSchedules,
  saveSweepSchedule,
  getSweepLogs,
  triggerSweepExecution,
  getReconcileItems,
  reconcileBatch,
  getShadowAdjustment,
  adjustShadowBalance,
  CollectionItem,
  CampaignItem,
  PostDatedCheque,
  InvoiceItem,
  SweepSchedule,
  SweepExecutionLog,
  ReconciliationItem
} from "@/lib/cashManagement";

export function CashManagementDashboard() {
  const [activeTab, setActiveTab] = useState("collections");
  const [updateTick, setUpdateTick] = useState(0);
  const triggerUpdate = () => setUpdateTick(prev => prev + 1);

  // Load state datasets
  const collections = useMemo(() => getCollections(), [updateTick]);
  const campaigns = useMemo(() => getCampaigns(), [updateTick]);
  const pdcs = useMemo(() => getPostDatedCheques(), [updateTick]);
  const invoices = useMemo(() => getInvoices(), [updateTick]);
  const sweeps = useMemo(() => getSweepSchedules(), [updateTick]);
  const sweepLogs = useMemo(() => getSweepLogs(), [updateTick]);
  const reconItems = useMemo(() => getReconcileItems(), [updateTick]);
  const shadowAdjustment = useMemo(() => getShadowAdjustment(), [updateTick]);

  // Aggregate stats
  const totalCollections = useMemo(() => {
    return collections.reduce((sum, c) => sum + c.amount, 0) + 
           invoices.reduce((sum, i) => sum + i.collectedAmount, 0);
  }, [collections, invoices]);

  const shadowBalanceVal = useMemo(() => {
    // Current primary account balance BDT 124,562,300 + pending cheque floats
    return OWN_ACCOUNTS[0].balance + shadowAdjustment;
  }, [shadowAdjustment]);

  const activeCampaignsCount = useMemo(() => {
    return campaigns.filter(c => c.status === "Active").length;
  }, [campaigns]);

  const activeSweepsCount = useMemo(() => {
    return sweeps.filter(s => s.status === "Active").length;
  }, [sweeps]);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <a href="/app" className="hover:text-navy">Dashboard</a>
        <ChevronDown className="w-3 h-3 -rotate-90" />
        <span className="text-foreground font-semibold">Cash Management</span>
      </nav>

      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
        <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Cash Management & Collection Port</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Establish automated sweep triggers, calculate instrument value dates automatically, track real-time shadow balances, and process partial collections on invoices.
        </p>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0">
            <Coins className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Total Inward Cash</div>
            <div className="font-display text-2xl mt-1 text-navy font-bold">
              BDT {totalCollections.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Real-time inward collections</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 text-success grid place-items-center shrink-0">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Real-time Shadow Bal</div>
            <div className="font-display text-2xl mt-1 text-navy font-bold">
              BDT {shadowBalanceVal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Incl. Central Bank clearing floats</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Active Campaigns</div>
            <div className="font-display text-2xl mt-1 text-navy font-bold">
              {activeCampaignsCount} Active Escrows
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Campaign collections setup</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-600 grid place-items-center shrink-0">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Sweep Schedules</div>
            <div className="font-display text-2xl mt-1 text-navy font-bold">
              {activeSweepsCount} Sweeps Running
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Zero Balance Accounts (ZBA)</div>
          </div>
        </Card>
      </div>

      {/* Tabs list */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border w-full justify-start p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="collections" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Coins className="w-3.5 h-3.5" /> Bill & Fee Collections
          </TabsTrigger>
          <TabsTrigger value="nature" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Building2 className="w-3.5 h-3.5" /> Modes & Nature Config
          </TabsTrigger>
          <TabsTrigger value="invoices" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <FileText className="w-3.5 h-3.5" /> Invoice Ledger
          </TabsTrigger>
          <TabsTrigger value="sweeps" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <RefreshCw className="w-3.5 h-3.5" /> Sweep Scheduler
          </TabsTrigger>
          <TabsTrigger value="reconcile" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <CheckCircle2 className="w-3.5 h-3.5" /> Reconciliation & Shadows
          </TabsTrigger>
        </TabsList>

        <TabsContent value="collections">
          <BillCollectionsTab campaigns={campaigns} collections={collections} onSubmitted={triggerUpdate} />
        </TabsContent>

        <TabsContent value="nature">
          <ModesNatureTab pdcs={pdcs} onSubmitted={triggerUpdate} />
        </TabsContent>

        <TabsContent value="invoices">
          <InvoicesTab invoices={invoices} onSubmitted={triggerUpdate} />
        </TabsContent>

        <TabsContent value="sweeps">
          <SweepsTab sweeps={sweeps} sweepLogs={sweepLogs} onSubmitted={triggerUpdate} />
        </TabsContent>

        <TabsContent value="reconcile">
          <ReconciliationTab reconItems={reconItems} shadowAdjustment={shadowAdjustment} onSubmitted={triggerUpdate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* =========================================================================
   TAB 1: BILL & FEE COLLECTIONS
   ========================================================================= */
function BillCollectionsTab({ campaigns, collections, onSubmitted }: { campaigns: CampaignItem[], collections: CollectionItem[], onSubmitted: () => void }) {
  const [subTab, setSubTab] = useState<"new-collection" | "campaigns" | "history">("new-collection");
  const [payerName, setPayerName] = useState("");
  const [refNo, setRefNo] = useState("");
  const [category, setCategory] = useState<"Utility Bill" | "Tuition Fee" | "Corporate Fee" | "Premium Collection">("Utility Bill");
  const [mode, setMode] = useState<"Cash" | "Cheque" | "PO/DD">("Cash");
  const [clearingType, setClearingType] = useState<"Same Day" | "Next Day">("Same Day");
  const [amount, setAmount] = useState("");
  const [instrumentNo, setInstrumentNo] = useState("");

  // Campaign State
  const [campName, setCampName] = useState("");
  const [campTarget, setCampTarget] = useState("");
  const [campAccount, setCampAccount] = useState(OWN_ACCOUNTS[0].id);
  const [campDate, setCampDate] = useState("");

  // Auto calculated value date
  const valueDateVal = useMemo(() => {
    const today = new Date();
    if (mode === "Cash" || clearingType === "Same Day") {
      return today.toISOString().split("T")[0]; // float days = 0
    } else {
      today.setDate(today.getDate() + 1); // float days = 1 (next day clearing)
      return today.toISOString().split("T")[0];
    }
  }, [mode, clearingType]);

  const handlePostCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payerName.trim() || !amount || parseFloat(amount) <= 0) {
      toast.error("Please fill in payer name and a valid amount.");
      return;
    }
    if (mode !== "Cash" && !instrumentNo.trim()) {
      toast.error("Instrument / Cheque number is required.");
      return;
    }

    const newCol: CollectionItem = {
      id: `COLL-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split("T")[0],
      payerName,
      referenceNo: refNo || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      category,
      mode,
      clearingType,
      amount: parseFloat(amount),
      valueDate: valueDateVal,
      instrumentNo: mode !== "Cash" ? instrumentNo : undefined,
      status: mode === "Cash" || clearingType === "Same Day" ? "Completed" : "Pending Clearing"
    };

    saveCollection(newCol);
    toast.success("Inward collection successfully logged in core treasury.");
    
    // Clear Form
    setPayerName("");
    setRefNo("");
    setAmount("");
    setInstrumentNo("");
    onSubmitted();
    setSubTab("history");
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campName.trim() || !campTarget || parseFloat(campTarget) <= 0 || !campDate) {
      toast.error("Please fill in campaign title, target limit, and expiry date.");
      return;
    }

    const newCamp: CampaignItem = {
      id: `CAMP-${Date.now().toString().slice(-4)}`,
      name: campName,
      targetAccount: campAccount,
      targetAmount: parseFloat(campTarget),
      collectedAmount: 0,
      expiryDate: campDate,
      status: "Active"
    };

    saveCampaign(newCamp);
    toast.success(`Temporary Campaign '${campName}' Escrow successfully established.`);
    
    setCampName("");
    setCampTarget("");
    setCampDate("");
    onSubmitted();
    setSubTab("campaigns");
  };

  return (
    <Card className="border border-border">
      <CardHeader className="bg-muted/15 border-b border-border pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-navy font-bold text-lg flex items-center gap-2">
            <Coins className="w-5 h-5 text-gold" /> Bill Collections & Campaigns
          </CardTitle>
          <CardDescription className="text-xs">
            Log real-time utility, fee, or premium collections and setup escrow campaign metrics.
          </CardDescription>
        </div>
        <div className="flex gap-1">
          <Button variant={subTab === "new-collection" ? "default" : "ghost"} size="sm" onClick={() => setSubTab("new-collection")} className="text-xs">
            Log Collection
          </Button>
          <Button variant={subTab === "campaigns" ? "default" : "ghost"} size="sm" onClick={() => setSubTab("campaigns")} className="text-xs">
            Campaign Escrows
          </Button>
          <Button variant={subTab === "history" ? "default" : "ghost"} size="sm" onClick={() => setSubTab("history")} className="text-xs">
            Collection Ledger
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {subTab === "new-collection" && (
          <form onSubmit={handlePostCollection} className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payer-name">Payer Company Name</Label>
                <Input
                  id="payer-name"
                  placeholder="e.g. Apex Footwear Ltd"
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payer-ref">Invoice / Reference No</Label>
                <Input
                  id="payer-ref"
                  placeholder="e.g. INV-90021"
                  value={refNo}
                  onChange={(e) => setRefNo(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coll-cat">Collection Category</Label>
                <Select value={category} onValueChange={(val: any) => setCategory(val)}>
                  <SelectTrigger id="coll-cat">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Utility Bill">Utility Bill Collection</SelectItem>
                    <SelectItem value="Tuition Fee">Tuition Fee Collection</SelectItem>
                    <SelectItem value="Corporate Fee">Corporate Trade Collection</SelectItem>
                    <SelectItem value="Premium Collection">Insurance Premium Collection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coll-amount">Collection Amount (BDT)</Label>
                <Input
                  id="coll-amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coll-mode">Collection Mode</Label>
                <Select value={mode} onValueChange={(val: any) => setMode(val)}>
                  <SelectTrigger id="coll-mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash (Immediate)</SelectItem>
                    <SelectItem value="Cheque">Bank Cheque</SelectItem>
                    <SelectItem value="PO/DD">Pay Order (PO) / Demand Draft (DD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {mode !== "Cash" && (
                <div className="space-y-2">
                  <Label htmlFor="coll-clearing">Clearing Type</Label>
                  <Select value={clearingType} onValueChange={(val: any) => setClearingType(val)}>
                    <SelectTrigger id="coll-clearing">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Same Day">Same Day clearing (Batch High Speed)</SelectItem>
                      <SelectItem value="Next Day">Next Day clearing (EFTN Routine)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {mode !== "Cash" && (
                <div className="space-y-2">
                  <Label htmlFor="inst-no">Instrument / Cheque No</Label>
                  <Input
                    id="inst-no"
                    placeholder="6 digits numeric"
                    value={instrumentNo}
                    onChange={(e) => setInstrumentNo(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Value Date Auto-calculation visualizer */}
            <div className="bg-muted/30 border border-border p-4 rounded-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-navy">
                <Calendar className="w-4 h-4 text-gold" />
                <div>
                  <strong className="block text-[11px] uppercase tracking-wider text-muted-foreground">Auto-Calculated Value Date</strong>
                  <span className="font-mono text-sm font-semibold">{valueDateVal}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px] bg-gold/5 border-gold/30 text-gold">
                Float Days: {mode === "Cash" || clearingType === "Same Day" ? "0 (T+0)" : "1 (T+1 clearing)"}
              </Badge>
            </div>

            <Button type="submit" className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs">
              Log Collection & Credit Shadow Balance
            </Button>
          </form>
        )}

        {subTab === "campaigns" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create Campaign form */}
            <Card className="lg:col-span-1 border border-border h-fit">
              <CardHeader className="pb-3 border-b border-border bg-muted/10">
                <CardTitle className="text-navy text-sm font-bold uppercase tracking-wider">Setup Escrow Campaign</CardTitle>
                <CardDescription className="text-[10px]">
                  Establish temporary collections accounts for real estate or CSR events.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleCreateCampaign} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="camp-title" className="text-xs">Campaign Title / Name</Label>
                    <Input
                      id="camp-title"
                      placeholder="e.g. Gulshan Heights Block B Sales"
                      value={campName}
                      onChange={(e) => setCampName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="camp-target" className="text-xs">Target Amount Limit (BDT)</Label>
                    <Input
                      id="camp-target"
                      type="number"
                      placeholder="e.g. 50000000"
                      value={campTarget}
                      onChange={(e) => setCampTarget(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="camp-acc" className="text-xs">Target Consolidation Account</Label>
                    <Select value={campAccount} onValueChange={setCampAccount}>
                      <SelectTrigger id="camp-acc" className="text-xs h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {OWN_ACCOUNTS.map(a => (
                          <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="camp-expiry" className="text-xs">Campaign Expiry Date</Label>
                    <Input
                      id="camp-expiry"
                      type="date"
                      value={campDate}
                      onChange={(e) => setCampDate(e.target.value)}
                    />
                  </div>

                  <Button type="submit" size="sm" className="w-full bg-navy text-navy-foreground text-xs mt-2">
                    Establish Temporary Escrow
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Active campaigns list */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xs uppercase font-bold text-navy tracking-wider">Active Campaigns Collections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaigns.map(camp => {
                  const pct = Math.min(100, Math.round((camp.collectedAmount / camp.targetAmount) * 100));
                  return (
                    <Card key={camp.id} className="p-4 border border-border space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="text-[10px] font-mono text-gold bg-gold/5 border-gold/20">{camp.id}</Badge>
                          <h4 className="font-bold text-sm text-navy mt-1">{camp.name}</h4>
                        </div>
                        <Badge className="bg-success/15 text-success border-success/30 font-semibold" variant="outline">
                          {camp.status}
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span>Collected: ৳ {camp.collectedAmount.toLocaleString()}</span>
                          <span>{pct}%</span>
                        </div>
                        <Progress value={pct} className="h-1.5" />
                        <div className="text-[10px] text-muted-foreground flex justify-between pt-1">
                          <span>Target: BDT {camp.targetAmount.toLocaleString()}</span>
                          <span>Expiry: {camp.expiryDate}</span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {subTab === "history" && (
          <div className="space-y-2">
            <div className="border border-border rounded-md overflow-hidden bg-white">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="pl-4">Collection ID</TableHead>
                    <TableHead>Execution Date</TableHead>
                    <TableHead>Payer</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-center">Mode</TableHead>
                    <TableHead className="text-center">Clearing</TableHead>
                    <TableHead className="text-right">Amount (BDT)</TableHead>
                    <TableHead>Value Date</TableHead>
                    <TableHead className="text-center pr-4">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {collections.map(col => (
                    <TableRow key={col.id}>
                      <TableCell className="pl-4 font-mono text-xs font-semibold text-navy">{col.id}</TableCell>
                      <TableCell className="text-xs">{col.date}</TableCell>
                      <TableCell className="text-sm font-semibold">{col.payerName}</TableCell>
                      <TableCell className="text-xs">
                        <Badge variant="outline" className="bg-navy/5 text-navy font-semibold text-[10px]">{col.category}</Badge>
                      </TableCell>
                      <TableCell className="text-center text-xs">{col.mode}</TableCell>
                      <TableCell className="text-center text-xs">{col.clearingType}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-navy text-xs">{col.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-xs font-mono">{col.valueDate}</TableCell>
                      <TableCell className="text-center pr-4">
                        <Badge className={`text-[10px] ${
                          col.status === "Completed" ? "bg-success/15 text-success border-success/30" : "bg-yellow-500/15 text-yellow-600 border-yellow-500/30"
                        }`} variant="outline">
                          {col.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* =========================================================================
   TAB 2: MODES & NATURE CONFIG
   ========================================================================= */
function ModesNatureTab({ pdcs, onSubmitted }: { pdcs: PostDatedCheque[], onSubmitted: () => void }) {
  const [natureType, setNatureType] = useState<"single" | "product">("single");
  const [activeTabSub, setActiveTabSub] = useState<"nature" | "pdc">("nature");

  // Local mappings list
  const [taggings, setTaggings] = useState([
    { product: "Utility Bills", account: OWN_ACCOUNTS[0].label },
    { product: "Tuition Fees", account: OWN_ACCOUNTS[1].label },
    { product: "Corporate Collections", account: OWN_ACCOUNTS[0].label },
    { product: "Insurance Premium", account: OWN_ACCOUNTS[2].label }
  ]);

  const handleUpdateTagging = (index: number, val: string) => {
    const updated = [...taggings];
    updated[index].account = val;
    setTaggings(updated);
    toast.success(`Nature Tagging updated for ${updated[index].product}`);
  };

  const handleRealizeCheque = (id: string) => {
    realizePDC(id);
    toast.success(`Cheque ${id} realized. Shadow ledger balance updated.`);
    onSubmitted();
  };

  const handleReturnCheque = (id: string) => {
    returnPDC(id);
    toast.warning(`Cheque ${id} marked as returned (clearing failed).`);
    onSubmitted();
  };

  return (
    <Card className="border border-border">
      <CardHeader className="bg-muted/15 border-b border-border pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-navy font-bold text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gold" /> Modes & Nature Management
          </CardTitle>
          <CardDescription className="text-xs">
            Manage product collections nature routing and process post-dated cheque clearances.
          </CardDescription>
        </div>
        <div className="flex gap-1">
          <Button variant={activeTabSub === "nature" ? "default" : "ghost"} size="sm" onClick={() => setActiveTabSub("nature")} className="text-xs">
            Nature Mappings
          </Button>
          <Button variant={activeTabSub === "pdc" ? "default" : "ghost"} size="sm" onClick={() => setActiveTabSub("pdc")} className="text-xs">
            PDC Ledger
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {activeTabSub === "nature" && (
          <div className="space-y-6 max-w-3xl">
            {/* Nature selection toggle */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Collections Nature Mode</Label>
              <div className="flex gap-3">
                <Button
                  variant={natureType === "single" ? "default" : "outline"}
                  onClick={() => { setNatureType("single"); toast.success("Set Collections to Single Consolidated Account mode."); }}
                  className="text-xs"
                >
                  Single Consolidated Account
                </Button>
                <Button
                  variant={natureType === "product" ? "default" : "outline"}
                  onClick={() => { setNatureType("product"); toast.success("Enabled Product-Wise Account Tagging routes."); }}
                  className="text-xs"
                >
                  Product-Wise Account Tagging
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {natureType === "single" 
                  ? "All billing product lines (Utilities, tuition, premiums) consolidate into a single primary current account automatically."
                  : "Allow treasury user to tag and segment different operational pooling accounts against specific inward collection lines."
                }
              </p>
            </div>

            {natureType === "product" && (
              <div className="space-y-3 pt-3 border-t border-border">
                <h4 className="text-xs font-bold text-navy uppercase tracking-wider">Product Mapping Matrix</h4>
                <div className="border border-border rounded-md overflow-hidden bg-white">
                  <Table>
                    <TableHeader className="bg-muted/40">
                      <TableRow>
                        <TableHead className="pl-4">Inward Product Line</TableHead>
                        <TableHead>Tagged Pooling Account (Destination)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {taggings.map((tag, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="pl-4 font-semibold text-sm">{tag.product}</TableCell>
                          <TableCell className="max-w-xs">
                            <Select
                              value={tag.account}
                              onValueChange={(val) => handleUpdateTagging(idx, val)}
                            >
                              <SelectTrigger className="h-8 text-xs font-mono">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {OWN_ACCOUNTS.map(a => (
                                  <SelectItem key={a.id} value={a.label}>{a.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTabSub === "pdc" && (
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-wider text-navy">Post-Dated Instruments clearing ledger</h3>
            <div className="border border-border rounded-md overflow-hidden bg-white">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="pl-4">ID</TableHead>
                    <TableHead>Cheque Issuer</TableHead>
                    <TableHead>Cheque No</TableHead>
                    <TableHead>Drawn Bank</TableHead>
                    <TableHead className="text-right">Amount (BDT)</TableHead>
                    <TableHead>Cheque Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right pr-4">Clearance Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pdcs.map(pdc => (
                    <TableRow key={pdc.id}>
                      <TableCell className="pl-4 font-mono text-xs font-semibold text-navy">{pdc.id}</TableCell>
                      <TableCell className="text-sm font-semibold">{pdc.issuerName}</TableCell>
                      <TableCell className="font-mono text-xs">{pdc.chequeNo}</TableCell>
                      <TableCell className="text-xs">{pdc.bankName}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-navy text-xs">{pdc.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-xs font-mono">{pdc.chequeDate}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={`text-[10px] ${
                          pdc.status === "Realized" ? "bg-success/15 text-success border-success/30" :
                          pdc.status === "Awaiting Mature" ? "bg-yellow-500/15 text-yellow-600 border-yellow-500/30" :
                          "bg-destructive/15 text-destructive border-destructive/30"
                        }`} variant="outline">
                          {pdc.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-4" onClick={(e) => e.stopPropagation()}>
                        {pdc.status === "Awaiting Mature" ? (
                          <div className="flex justify-end gap-1.5">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 text-xs text-success hover:bg-success/10 px-2"
                              onClick={() => handleRealizeCheque(pdc.id)}
                            >
                              <Check className="w-3.5 h-3.5 mr-1" /> Realize
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 text-xs text-destructive hover:bg-destructive/10 px-2"
                              onClick={() => handleReturnCheque(pdc.id)}
                            >
                              <X className="w-3.5 h-3.5 mr-1" /> Return
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground font-mono">Realized</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* =========================================================================
   TAB 3: INVOICES & PARTIAL PAYMENTS
   ========================================================================= */
function InvoicesTab({ invoices, onSubmitted }: { invoices: InvoiceItem[], onSubmitted: () => void }) {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [openPayModal, setOpenPayModal] = useState(false);

  const handlePostPayment = () => {
    if (!selectedInvoice) return;
    const payVal = parseFloat(paymentAmount);
    if (isNaN(payVal) || payVal <= 0) {
      toast.error("Please enter a valid positive payment amount.");
      return;
    }

    const outstanding = selectedInvoice.totalAmount - selectedInvoice.collectedAmount;
    let paymentType: "Partial" | "Full" | "Overpayment" = "Partial";

    if (payVal >= outstanding) {
      paymentType = payVal > outstanding ? "Overpayment" : "Full";
      if (payVal > outstanding) {
        toast.info(`Overpayment registered: BDT ${(payVal - outstanding).toLocaleString()} added as excess credit.`);
      }
    }

    postPartialCollection(selectedInvoice.id, payVal, paymentType);
    toast.success(`Payment of BDT ${payVal.toLocaleString()} posted to Invoice ${selectedInvoice.id}.`);
    
    setOpenPayModal(false);
    setSelectedInvoice(null);
    setPaymentAmount("");
    onSubmitted();
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      "Fully Paid": "bg-success/15 text-success border-success/30",
      "Partially Paid": "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
      "Unpaid": "bg-destructive/15 text-destructive border-destructive/30"
    };
    return <Badge className={`text-[10px] ${map[status] || ""}`} variant="outline">{status}</Badge>;
  };

  return (
    <Card className="border border-border">
      <CardHeader className="bg-muted/15 border-b border-border pb-3">
        <CardTitle className="text-navy font-bold text-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-gold" /> Inward Invoice Ledger
        </CardTitle>
        <CardDescription className="text-xs">
          Manage partial payment reconciliations, customer collections, and overpayment allocations.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="border border-border rounded-md overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="pl-4">Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Total Invoice (BDT)</TableHead>
                <TableHead className="text-right">Collected (BDT)</TableHead>
                <TableHead className="text-right">Outstanding (BDT)</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right pr-4">Post Collection</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(inv => {
                const outstanding = inv.totalAmount - inv.collectedAmount;
                return (
                  <TableRow key={inv.id} className="hover:bg-muted/5">
                    <TableCell className="pl-4 font-mono text-xs font-semibold text-navy">{inv.id}</TableCell>
                    <TableCell className="text-sm font-semibold">{inv.customerName}</TableCell>
                    <TableCell className="text-xs">{inv.issueDate}</TableCell>
                    <TableCell className="text-xs">{inv.dueDate}</TableCell>
                    <TableCell className="text-right font-mono text-xs font-semibold text-navy">{inv.totalAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-xs text-success font-semibold">{inv.collectedAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-xs text-destructive font-semibold">
                      {outstanding > 0 ? outstanding.toLocaleString() : "0.00"}
                    </TableCell>
                    <TableCell className="text-center">{getStatusBadge(inv.status)}</TableCell>
                    <TableCell className="text-right pr-4">
                      {inv.status !== "Fully Paid" ? (
                        <Button
                          size="sm"
                          className="h-7 text-[10px] bg-navy text-navy-foreground hover:bg-navy/90"
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setPaymentAmount(outstanding.toString());
                            setOpenPayModal(true);
                          }}
                        >
                          Receive Payment
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">Settled</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Receive payment modal */}
      <Dialog open={openPayModal} onOpenChange={setOpenPayModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Post Invoice Payment</DialogTitle>
            <DialogDescription>
              Submit collection for A/C matching. Partial deposits will deduct from invoice dues.
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4 py-3">
              <div className="space-y-1.5 text-xs bg-muted/40 p-3 rounded-md font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invoice Reference:</span>
                  <span className="font-semibold text-navy">{selectedInvoice.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-semibold">{selectedInvoice.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Outstanding Due:</span>
                  <span className="font-bold text-destructive">
                    BDT {(selectedInvoice.totalAmount - selectedInvoice.collectedAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pay-amt">Collection Amount to Post (BDT)</Label>
                <Input
                  id="pay-amt"
                  type="number"
                  placeholder="0.00"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
                <span className="text-[10px] text-muted-foreground block">
                  Entering less than outstanding marks Invoice as Partially Paid. Entering more flags Overpayment credits.
                </span>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setOpenPayModal(false); setSelectedInvoice(null); }}>Cancel</Button>
            <Button className="bg-navy text-navy-foreground hover:bg-navy/90" onClick={handlePostPayment}>Apply Collection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

/* =========================================================================
   TAB 4: LIQUIDITY SWEEP SCHEDULER
   ========================================================================= */
function SweepsTab({ sweeps, sweepLogs, onSubmitted }: { sweeps: SweepSchedule[], sweepLogs: SweepExecutionLog[], onSubmitted: () => void }) {
  const [sweepRef, setSweepRef] = useState("");
  const [type, setType] = useState<"Zero Balance Sweep (ZBA)" | "Target Balance Sweep" | "Surplus Pool Sweep">("Zero Balance Sweep (ZBA)");
  const [sourceAccount, setSourceAccount] = useState(OWN_ACCOUNTS[1].id);
  const [targetAccount, setTargetAccount] = useState(OWN_ACCOUNTS[0].id);
  const [thresholdAmount, setThresholdAmount] = useState("");
  const [frequency, setFrequency] = useState<"Daily EOD" | "Weekly (Thursday)" | "Monthly End">("Daily EOD");
  const [activeSubTab, setActiveSubTab] = useState<"new-sweep" | "history">("new-sweep");

  const handleCreateSweep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sweepRef.trim() || !thresholdAmount || parseFloat(thresholdAmount) < 0) {
      toast.error("Please fill in sweep name and a valid trigger threshold amount.");
      return;
    }
    if (sourceAccount === targetAccount) {
      toast.error("Source account and Target account must be different.");
      return;
    }

    const newSweep: SweepSchedule = {
      id: `SWP-${Date.now().toString().slice(-3)}`,
      sweepRef,
      type,
      sourceAccount: OWN_ACCOUNTS.find(a => a.id === sourceAccount)?.label || sourceAccount,
      targetAccount: OWN_ACCOUNTS.find(a => a.id === targetAccount)?.label || targetAccount,
      thresholdAmount: parseFloat(thresholdAmount),
      frequency,
      status: "Active"
    };

    saveSweepSchedule(newSweep);
    toast.success(`Sweep schedule '${sweepRef}' has been set in core treasury.`);
    
    setSweepRef("");
    setThresholdAmount("");
    onSubmitted();
    setActiveSubTab("history");
  };

  const handleTriggerSweepManual = (sch: SweepSchedule) => {
    // Mock balance check: source account balance
    const srcAcc = OWN_ACCOUNTS.find(a => a.label === sch.sourceAccount);
    const balance = srcAcc ? srcAcc.balance : 2500000; // default mock BDT 25 lac if not found
    
    triggerSweepExecution(sch.id, balance);
    toast.info(`Triggered ZBA transaction cycle for sweep: ${sch.sweepRef}...`);
    setTimeout(() => {
      onSubmitted();
    }, 500);
  };

  return (
    <Card className="border border-border">
      <CardHeader className="bg-muted/15 border-b border-border pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-navy font-bold text-lg flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-gold" /> Liquidity Sweep Scheduler
          </CardTitle>
          <CardDescription className="text-xs">
            Schedule Zero Balance (ZBA) sweeps to consolidate multi-entity balances into central treasury pools.
          </CardDescription>
        </div>
        <div className="flex gap-1">
          <Button variant={activeSubTab === "new-sweep" ? "default" : "ghost"} size="sm" onClick={() => setActiveSubTab("new-sweep")} className="text-xs">
            Create Sweep Rule
          </Button>
          <Button variant={activeSubTab === "history" ? "default" : "ghost"} size="sm" onClick={() => setActiveSubTab("history")} className="text-xs">
            Schedules & Logs
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {activeSubTab === "new-sweep" && (
          <form onSubmit={handleCreateSweep} className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sweep-ref">Sweep Reference Name</Label>
                <Input
                  id="sweep-ref"
                  placeholder="e.g. Operations Subsidiary Sweep"
                  value={sweepRef}
                  onChange={(e) => setSweepRef(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sweep-type">Sweep Model Type</Label>
                <Select value={type} onValueChange={(val: any) => setType(val)}>
                  <SelectTrigger id="sweep-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Zero Balance Sweep (ZBA)">Zero Balance Sweep (ZBA)</SelectItem>
                    <SelectItem value="Target Balance Sweep">Target Balance Sweep</SelectItem>
                    <SelectItem value="Surplus Pool Sweep">Surplus Pool Sweep</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sweep-src">Source Subsidiary Account</Label>
                <Select value={sourceAccount} onValueChange={setSourceAccount}>
                  <SelectTrigger id="sweep-src">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OWN_ACCOUNTS.map(a => (
                      <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sweep-dest">Target Pooling Account</Label>
                <Select value={targetAccount} onValueChange={setTargetAccount}>
                  <SelectTrigger id="sweep-dest">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OWN_ACCOUNTS.map(a => (
                      <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sweep-thresh">Trigger Threshold balance (BDT)</Label>
                <Input
                  id="sweep-thresh"
                  type="number"
                  placeholder="e.g. 500000"
                  value={thresholdAmount}
                  onChange={(e) => setThresholdAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sweep-freq">Schedule Run Frequency</Label>
                <Select value={frequency} onValueChange={(val: any) => setFrequency(val)}>
                  <SelectTrigger id="sweep-freq">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily EOD">Daily End-of-Day (17:30)</SelectItem>
                    <SelectItem value="Weekly (Thursday)">Weekly on Thursdays</SelectItem>
                    <SelectItem value="Monthly End">Month-End closing hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs">
              Configure Sweep Rule
            </Button>
          </form>
        )}

        {activeSubTab === "history" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* active list rules */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xs uppercase font-bold text-navy tracking-wider">Scheduled Sweep Triggers</h3>
              <div className="border border-border rounded-md overflow-hidden bg-white">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="pl-4">Sweep Rule</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Target Pooling A/C</TableHead>
                      <TableHead className="text-right">Threshold (BDT)</TableHead>
                      <TableHead className="text-center">Frequency</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right pr-4">Force Run</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sweeps.map(sch => (
                      <TableRow key={sch.id}>
                        <TableCell className="pl-4 font-semibold text-sm">{sch.sweepRef}</TableCell>
                        <TableCell className="text-xs font-mono">{sch.type}</TableCell>
                        <TableCell className="text-xs truncate max-w-[120px]" title={sch.targetAccount}>{sch.targetAccount}</TableCell>
                        <TableCell className="text-right font-mono text-xs font-bold text-navy">{sch.thresholdAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-center text-xs">{sch.frequency}</TableCell>
                        <TableCell className="text-xs font-mono">{sch.lastRun || "Never run"}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={
                            sch.status === "Active" ? "bg-success/15 text-success border-success/30 font-semibold" : "bg-muted text-muted-foreground border-border"
                          } variant="outline">
                            {sch.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-4">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-gold hover:bg-gold/10"
                            onClick={() => handleTriggerSweepManual(sch)}
                            title="Force run sweep now"
                          >
                            <Play className="w-3.5 h-3.5 fill-gold text-gold" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* sweep logs */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xs uppercase font-bold text-navy tracking-wider">Sweep execution History</h3>
              <div className="space-y-3">
                {sweepLogs.map(log => (
                  <Card key={log.id} className="p-3 border border-border flex justify-between items-start text-xs font-mono">
                    <div className="space-y-1">
                      <div className="font-bold text-navy">{log.sweepRef}</div>
                      <div className="text-[10px] text-muted-foreground">{log.timestamp}</div>
                      <div className="text-[10px] text-muted-foreground truncate max-w-[150px]">{log.targetAccount}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={
                        log.status === "Success" ? "bg-success/15 text-success border-success/20" : "bg-destructive/15 text-destructive border-destructive/20"
                      } variant="outline">
                        {log.status}
                      </Badge>
                      <div className="font-bold text-navy mt-1">৳ {log.amountSwept.toLocaleString()}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* =========================================================================
   TAB 5: RECONCILIATION & SHADOW BALANCES
   ========================================================================= */
function ReconciliationTab({ reconItems, shadowAdjustment, onSubmitted }: { reconItems: ReconciliationItem[], shadowAdjustment: number, onSubmitted: () => void }) {
  const [selectedStatementItem, setSelectedStatementItem] = useState<string | null>(null);
  const [selectedErpItem, setSelectedErpItem] = useState<string | null>(null);
  const [isReconciling, setIsReconciling] = useState(false);

  // Group items by source
  const statementItems = useMemo(() => reconItems.filter(r => r.source === "Bank Statement"), [reconItems]);
  const erpItems = useMemo(() => reconItems.filter(r => r.source === "ERP Ledger"), [reconItems]);

  const handleManualReconcile = () => {
    if (!selectedStatementItem || !selectedErpItem) {
      toast.error("Please select one transaction from Bank Statement and one from ERP Ledger.");
      return;
    }
    const stObj = statementItems.find(i => i.id === selectedStatementItem);
    const erpObj = erpItems.find(i => i.id === selectedErpItem);

    if (stObj && erpObj && stObj.amount === erpObj.amount && stObj.type === erpObj.type) {
      reconcileBatch(selectedStatementItem, selectedErpItem);
      toast.success("Manual reconciliation successful! Ledger entries matched.");
      setSelectedStatementItem(null);
      setSelectedErpItem(null);
      onSubmitted();
    } else {
      toast.error("Mismatch: Selected transactions must have identical values and debits/credits matching.");
    }
  };

  const handleAutoReconcile = () => {
    setIsReconciling(true);
    toast.info("Initializing multi-layer reconciliation matching engine...");
    
    setTimeout(() => {
      // Find all unmatched statements and try to match with unmatched ERP items by amount
      const unmatchedStatement = statementItems.filter(i => i.status === "Unmatched");
      const unmatchedErp = erpItems.filter(i => i.status === "Unmatched");

      let matchCount = 0;
      unmatchedStatement.forEach(st => {
        const matchingErp = unmatchedErp.find(erp => erp.amount === st.amount && erp.type === st.type && erp.status === "Unmatched");
        if (matchingErp) {
          reconcileBatch(st.id, matchingErp.id);
          matchingErp.status = "Matched"; // temporary mutation to avoid double match in same loop
          matchCount++;
        }
      });

      setIsReconciling(false);
      if (matchCount > 0) {
        toast.success(`Auto-reconciliation complete: successfully matched and closed ${matchCount} transaction pairs.`);
      } else {
        toast.info("Auto-reconciliation complete: no identical unmatched amount pairs found.");
      }
      onSubmitted();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Shadow balance analyzer */}
      <Card className="border border-border">
        <CardHeader className="bg-muted/15 border-b border-border pb-3">
          <CardTitle className="text-navy font-bold text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" /> Real-time Shadow balance Ledger Analyzer
          </CardTitle>
          <CardDescription className="text-xs">
            Shadow Balance monitors clearing flows, clearing speeds, float intervals, and collections before central clearing realization.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-sm text-navy">
            <div className="p-4 bg-muted/20 border border-border rounded-lg space-y-1.5">
              <span className="text-xs text-muted-foreground uppercase tracking-wider block">CBS Actual Ledger Balance</span>
              <div className="text-xl font-bold">৳ {OWN_ACCOUNTS[0].balance.toLocaleString()} BDT</div>
              <span className="text-[10px] text-muted-foreground block">Reflects realized/settled central ledger.</span>
            </div>

            <div className="p-4 bg-yellow-500/5 border border-yellow-500/25 rounded-lg space-y-1.5">
              <span className="text-xs text-yellow-600 uppercase tracking-wider block">Unrealized Collections Float</span>
              <div className="text-xl font-bold text-yellow-600">৳ {shadowAdjustment.toLocaleString()} BDT</div>
              <span className="text-[10px] text-muted-foreground block">Cheques, draft values currently in clearing.</span>
            </div>

            <div className="p-4 bg-navy/[0.04] border border-navy/20 rounded-lg space-y-1.5">
              <span className="text-xs text-gold uppercase tracking-wider block">Real-time Shadow Treasury Balance</span>
              <div className="text-xl font-bold text-gold">৳ {(OWN_ACCOUNTS[0].balance + shadowAdjustment).toLocaleString()} BDT</div>
              <span className="text-[10px] text-muted-foreground block">Available treasury headroom.</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reconciliation Engine */}
      <Card className="border border-border">
        <CardHeader className="bg-muted/15 border-b border-border pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-navy font-bold text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-gold" /> Bank Reconciliation Workspace
            </CardTitle>
            <CardDescription className="text-xs">
              Compare actual SJIBL bank statement feeds against internal ERP collection/payment records.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs gap-1.5"
              onClick={handleAutoReconcile}
              disabled={isReconciling}
            >
              {isReconciling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              Auto-Reconcile Dues
            </Button>
            <Button
              variant="outline"
              className="text-xs"
              onClick={handleManualReconcile}
              disabled={!selectedStatementItem || !selectedErpItem}
            >
              Match Selected
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Statement ledger */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-navy tracking-wider">Feed 1: Bank Statement records</h4>
              <div className="border border-border rounded-md overflow-hidden bg-white max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader className="bg-muted/40 sticky top-0">
                    <TableRow>
                      <TableHead className="w-10 pl-4"></TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount (BDT)</TableHead>
                      <TableHead className="text-center">Type</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statementItems.map(item => {
                      const isSelected = selectedStatementItem === item.id;
                      const isMatched = item.status === "Matched";
                      return (
                        <TableRow
                          key={item.id}
                          className={`hover:bg-muted/10 cursor-pointer ${isSelected ? "bg-gold/10 hover:bg-gold/10" : ""}`}
                          onClick={() => !isMatched && setSelectedStatementItem(isSelected ? null : item.id)}
                        >
                          <TableCell className="pl-4 text-center">
                            {!isMatched && (
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}} // handled by row click
                                className="rounded border-border text-navy"
                              />
                            )}
                          </TableCell>
                          <TableCell className="text-xs font-mono">{item.date}</TableCell>
                          <TableCell className="text-xs font-semibold">{item.details}</TableCell>
                          <TableCell className="text-right font-mono text-xs font-bold text-navy">{item.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-center text-xs">
                            <Badge variant="ghost" className={item.type === "Credit" ? "text-success" : "text-destructive"}>
                              {item.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={`text-[10px] ${
                              isMatched ? "bg-success/10 text-success border-success/20" : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                            }`} variant="outline">
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* ERP ledger */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-navy tracking-wider">Feed 2: ERP Ledger records</h4>
              <div className="border border-border rounded-md overflow-hidden bg-white max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader className="bg-muted/40 sticky top-0">
                    <TableRow>
                      <TableHead className="w-10 pl-4"></TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount (BDT)</TableHead>
                      <TableHead className="text-center">Type</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {erpItems.map(item => {
                      const isSelected = selectedErpItem === item.id;
                      const isMatched = item.status === "Matched";
                      return (
                        <TableRow
                          key={item.id}
                          className={`hover:bg-muted/10 cursor-pointer ${isSelected ? "bg-gold/10 hover:bg-gold/10" : ""}`}
                          onClick={() => !isMatched && setSelectedErpItem(isSelected ? null : item.id)}
                        >
                          <TableCell className="pl-4 text-center">
                            {!isMatched && (
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}} // handled by row click
                                className="rounded border-border text-navy"
                              />
                            )}
                          </TableCell>
                          <TableCell className="text-xs font-mono">{item.date}</TableCell>
                          <TableCell className="text-xs font-semibold">{item.details}</TableCell>
                          <TableCell className="text-right font-mono text-xs font-bold text-navy">{item.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-center text-xs">
                            <Badge variant="ghost" className={item.type === "Credit" ? "text-success" : "text-destructive"}>
                              {item.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={`text-[10px] ${
                              isMatched ? "bg-success/10 text-success border-success/20" : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                            }`} variant="outline">
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
