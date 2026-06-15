import React, { useState, useMemo } from "react";
import {
  FileText, Search, Plus, Check, X, ChevronDown, ChevronUp, RefreshCw,
  Landmark, CreditCard, ShieldAlert, AlertTriangle, AlertCircle,
  Truck, Calendar, Printer, CheckCircle2, Ban
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
import { OWN_ACCOUNTS } from "@/lib/fundTransfers";
import {
  getChequeBookRequests,
  postChequeBookRequest,
  getChequeLeaves,
  stopChequeLeaf,
  getCardApplications,
  postCardApplication,
  getStatementRequests,
  postStatementRequest,
  ChequeBookRequest,
  ChequeLeaf,
  CardApplication,
  PhysicalStatementRequest
} from "@/lib/services";

export function ServicesDashboard() {
  const [activeTab, setActiveTab] = useState("cheque");
  const [updateTick, setUpdateTick] = useState(0);
  const triggerUpdate = () => setUpdateTick(prev => prev + 1);

  // Load datasets
  const chqRequests = useMemo(() => getChequeBookRequests(), [updateTick]);
  const leaves = useMemo(() => getChequeLeaves(), [updateTick]);
  const cardApps = useMemo(() => getCardApplications(), [updateTick]);
  const statements = useMemo(() => getStatementRequests(), [updateTick]);

  // Aggregate stats
  const pendingChequeBooks = useMemo(() => chqRequests.filter(r => r.status !== "Delivered").length, [chqRequests]);
  const pendingCards = useMemo(() => cardApps.filter(c => c.status !== "Approved" && c.status !== "Rejected").length, [cardApps]);
  const pendingStatements = useMemo(() => statements.filter(s => s.status !== "Delivered").length, [statements]);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <a href="/app" className="hover:text-navy">Dashboard</a>
        <ChevronDown className="w-3 h-3 -rotate-90" />
        <span className="text-foreground font-semibold">Operational Services</span>
      </nav>

      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
        <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Corporate Services & Requests</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Order cheque books, manage leaf status clearings, register stopped leaves instantly, request corporate credit cards, and dispatch printed transaction statements.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-sm text-navy">
        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0">
            <FileText className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Cheque Requests</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {pendingChequeBooks} Pending
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Cheque books in print queue</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-600 grid place-items-center shrink-0">
            <CreditCard className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Card Applications</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {pendingCards} In Progress
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Corporate card applications</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 text-success grid place-items-center shrink-0">
            <Printer className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Statement Spools</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {pendingStatements} Pending
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Physical statements queued</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Blocked Leaves</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {leaves.filter(l => l.status === "Stopped").length} Stopped
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Active stop-payments</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border w-full justify-start p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="cheque" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <FileText className="w-3.5 h-3.5" /> Cheque Book & Leaf Manager
          </TabsTrigger>
          <TabsTrigger value="cards" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <CreditCard className="w-3.5 h-3.5" /> Corporate Card Requests
          </TabsTrigger>
          <TabsTrigger value="statement" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Printer className="w-3.5 h-3.5" /> Physical Statements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cheque">
          <ChequeManagerTab
            chqRequests={chqRequests}
            leaves={leaves}
            onTriggerUpdate={triggerUpdate}
          />
        </TabsContent>

        <TabsContent value="cards">
          <CardApplicationsTab
            cardApps={cardApps}
            onTriggerUpdate={triggerUpdate}
          />
        </TabsContent>

        <TabsContent value="statement">
          <StatementSpoolTab
            statements={statements}
            onTriggerUpdate={triggerUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* =========================================================================
   TAB 1: CHEQUE BOOK & LEAF MANAGER
   ========================================================================= */
function ChequeManagerTab({
  chqRequests,
  leaves,
  onTriggerUpdate
}: {
  chqRequests: ChequeBookRequest[];
  leaves: ChequeLeaf[];
  onTriggerUpdate: () => void;
}) {
  const [chqAccount, setChqAccount] = useState(OWN_ACCOUNTS[0].label);
  const [leavesCount, setLeavesCount] = useState<20 | 50 | 100>(50);
  const [branchName, setBranchName] = useState("Dilkusha Branch");

  // Leaf Query states
  const [queryLeafNo, setQueryLeafNo] = useState("");
  const [queriedLeaf, setQueriedLeaf] = useState<ChequeLeaf | null>(null);

  // Stop Cheque states
  const [stopLeafNo, setStopLeafNo] = useState("");
  const [stopReason, setStopReason] = useState("");

  const handleOrderChequeBook = (e: React.FormEvent) => {
    e.preventDefault();
    postChequeBookRequest(chqAccount, leavesCount, branchName);
    toast.success(`Cheque book order placed successfully.`);
    onTriggerUpdate();
  };

  const handleQueryLeaf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryLeafNo.trim()) return;
    const found = leaves.find(l => l.leafNo === queryLeafNo);
    if (found) {
      setQueriedLeaf(found);
    } else {
      setQueriedLeaf({ leafNo: queryLeafNo, status: "Unused" });
      toast.info(`Leaf #${queryLeafNo} is unused and available for presentation.`);
    }
  };

  const handleStopCheque = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stopLeafNo.trim() || !stopReason.trim()) {
      toast.error("Please enter leaf number and reason to register stop-payment.");
      return;
    }
    stopChequeLeaf(stopLeafNo, stopReason);
    toast.warning(`Stop payment registered for Cheque Leaf #${stopLeafNo}.`);
    setStopLeafNo("");
    setStopReason("");
    onTriggerUpdate();
    // Refresh query results if stopped active queried leaf
    if (queriedLeaf && queriedLeaf.leafNo === stopLeafNo) {
      setQueriedLeaf({ leafNo: stopLeafNo, status: "Stopped", stopReason });
    }
  };

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      "Pending Maker": "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
      "Awaiting Dispatch": "bg-sky-500/15 text-sky-600 border-sky-500/30",
      "Sent to Branch": "bg-orange-500/15 text-orange-600 border-orange-500/30",
      "Delivered": "bg-success/15 text-success border-success/30"
    };
    return <Badge className={`text-[10px] font-semibold ${map[s] || ""}`} variant="outline">{s}</Badge>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Order Cheque form & Stop cheque form */}
      <div className="lg:col-span-5 space-y-6">
        {/* Order Form */}
        <Card className="border border-border">
          <CardHeader className="bg-muted/10 border-b border-border py-3">
            <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider font-sans">Request Cheque Book</CardTitle>
            <CardDescription className="text-[10px]">Replenish cheque leaf books for your operational current accounts.</CardDescription>
          </CardHeader>
          <form onSubmit={handleOrderChequeBook}>
            <CardContent className="pt-4 space-y-3 text-xs text-navy">
              <div className="space-y-1">
                <Label>Debit Source Account</Label>
                <Select value={chqAccount} onValueChange={setChqAccount}>
                  <SelectTrigger className="h-9 text-xs font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OWN_ACCOUNTS.map(a => (
                      <SelectItem key={a.id} value={a.label}>{a.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Leaves Count</Label>
                  <Select value={leavesCount.toString()} onValueChange={(val) => setLeavesCount(parseInt(val) as any)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20 Leaves</SelectItem>
                      <SelectItem value="50">50 Leaves (Standard)</SelectItem>
                      <SelectItem value="100">100 Leaves (Corporate)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="chq-branch">Pickup Branch</Label>
                  <Input
                    id="chq-branch"
                    className="h-9 text-xs"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/10 border-t py-2.5 flex justify-end">
              <Button type="submit" size="sm" className="bg-navy hover:bg-navy/90 text-xs w-full">
                 spool Cheque Book Order
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Stop Cheque leaf form */}
        <Card className="border border-border">
          <CardHeader className="bg-muted/10 border-b border-border py-3">
            <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Ban className="w-4 h-4 text-destructive" /> Stop / Block Cheque Leaf
            </CardTitle>
            <CardDescription className="text-[10px]">Immediately block a cheque leaf to stop clearing presentations.</CardDescription>
          </CardHeader>
          <form onSubmit={handleStopCheque}>
            <CardContent className="pt-4 space-y-3 text-xs text-navy">
              <div className="space-y-1">
                <Label htmlFor="stop-leaf-no">Cheque Leaf Number</Label>
                <Input
                  id="stop-leaf-no"
                  placeholder="6 digit leaf number (e.g. 100204)"
                  className="text-xs font-mono"
                  value={stopLeafNo}
                  onChange={(e) => setStopLeafNo(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="stop-reason">Reason for Stop Payment</Label>
                <Input
                  id="stop-reason"
                  placeholder="e.g. Cheque book leaf lost, altered amount"
                  className="text-xs"
                  value={stopReason}
                  onChange={(e) => setStopReason(e.target.value)}
                />
              </div>

              <div className="bg-destructive/5 text-destructive border border-destructive/20 rounded p-2.5 text-[10px] flex gap-2 items-start">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>Important:</strong> Stop payments register instantly on Core banking. Any presentation of blocked leaf will result in immediate return.
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/10 border-t py-2.5">
              <Button type="submit" size="sm" className="bg-destructive text-white hover:bg-destructive/90 text-xs w-full">
                Register Stop Payment
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      {/* Cheque orders & leaf checker lookup */}
      <div className="lg:col-span-7 space-y-6">
        {/* Leaf status lookup */}
        <Card className="border border-border">
          <CardHeader className="bg-muted/10 border-b border-border py-2 flex flex-row items-center justify-between">
            <CardTitle className="text-navy font-bold text-xs uppercase tracking-wider">Cheque Leaf Status Tracker</CardTitle>
            <span className="text-[9px] text-muted-foreground font-mono">Clearing Query</span>
          </CardHeader>
          <CardContent className="pt-4 space-y-4 text-xs text-navy">
            <form onSubmit={handleQueryLeaf} className="flex gap-2">
              <Input
                placeholder="Enter cheque leaf number..."
                className="text-xs font-mono h-9"
                value={queryLeafNo}
                onChange={(e) => setQueryLeafNo(e.target.value)}
              />
              <Button type="submit" size="sm" className="bg-navy hover:bg-navy/90 text-xs h-9">
                Query Leaf
              </Button>
            </form>

            {queriedLeaf && (
              <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-wrap justify-between items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase block font-sans">Cheque Leaf</span>
                  <strong className="text-navy font-mono text-sm">Leaf No: #{queriedLeaf.leafNo}</strong>
                </div>
                <div className="space-y-1 text-center">
                  <span className="text-[10px] text-muted-foreground uppercase block font-sans">Leaf Status</span>
                  <Badge variant="outline" className={`text-[10px] font-semibold ${
                    queriedLeaf.status === "Cleared" ? "bg-success/15 text-success border-success/30" :
                    queriedLeaf.status === "Stopped" ? "bg-destructive/15 text-destructive border-destructive/30" :
                    "bg-slate-500/15 text-slate-600 border-slate-500/20"
                  }`}>{queriedLeaf.status}</Badge>
                </div>
                {queriedLeaf.status === "Cleared" && (
                  <div className="space-y-1 text-right">
                    <span className="text-[10px] text-muted-foreground uppercase block font-sans">Cleared Value</span>
                    <strong className="text-navy font-mono text-xs">BDT {queriedLeaf.amount?.toLocaleString()}</strong>
                    <div className="text-[9px] text-muted-foreground font-mono">{queriedLeaf.dateCleared}</div>
                  </div>
                )}
                {queriedLeaf.status === "Stopped" && (
                  <div className="space-y-1 text-right max-w-[150px]">
                    <span className="text-[10px] text-destructive uppercase block font-sans">Stop Note</span>
                    <span className="text-[10px] block leading-4 text-muted-foreground">{queriedLeaf.stopReason}</span>
                  </div>
                )}
                {queriedLeaf.status === "Unused" && (
                  <div className="text-xs text-muted-foreground italic">No presentations logged. Available.</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cheque Book Delivery requests */}
        <Card className="border border-border">
          <CardHeader className="bg-muted/10 border-b border-border py-3">
            <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider font-sans">Cheque Book Delivery Logs</CardTitle>
            <CardDescription className="text-[10px]">Tracking parameters for cheque book printing and branch dispatches.</CardDescription>
          </CardHeader>
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="pl-4">Request ID</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-center">Leaves</TableHead>
                <TableHead>Pickup Branch</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead className="text-center pr-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chqRequests.map(req => (
                <TableRow key={req.id}>
                  <TableCell className="pl-4 font-mono text-xs font-semibold text-navy">{req.id}</TableCell>
                  <TableCell className="text-xs font-mono">{req.account.split(" — ")[0]}</TableCell>
                  <TableCell className="text-center text-xs font-semibold">{req.leavesCount}</TableCell>
                  <TableCell className="text-xs">{req.branchName}</TableCell>
                  <TableCell className="text-xs font-mono">{req.raisedDate}</TableCell>
                  <TableCell className="text-center pr-4">{statusBadge(req.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 2: CREDIT CARD APPLICATIONS
   ========================================================================= */
function CardApplicationsTab({
  cardApps,
  onTriggerUpdate
}: {
  cardApps: CardApplication[];
  onTriggerUpdate: () => void;
}) {
  const [holder, setHolder] = useState("");
  const [cardType, setCardType] = useState("Visa Corporate Gold");
  const [limit, setLimit] = useState("");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const limitVal = parseFloat(limit);
    if (!holder.trim() || isNaN(limitVal) || limitVal <= 0) {
      toast.error("Please fill in applicant name and a valid request limit.");
      return;
    }

    postCardApplication(holder, cardType, limitVal);
    toast.success(`Corporate card application logged. Sent to checker.`);
    setHolder("");
    setLimit("");
    onTriggerUpdate();
  };

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      "Awaiting Checker": "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
      "Pending Bank": "bg-sky-500/15 text-sky-600 border-sky-500/30",
      "Approved": "bg-success/15 text-success border-success/30",
      "Rejected": "bg-destructive/15 text-destructive border-destructive/30"
    };
    return <Badge className={`text-[10px] font-semibold ${map[s] || ""}`} variant="outline">{s}</Badge>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Request form */}
      <Card className="lg:col-span-5 border border-border">
        <CardHeader className="bg-muted/10 border-b border-border py-3">
          <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider font-sans">Apply for Corporate Card</CardTitle>
          <CardDescription className="text-[10px]">Add additional executive credit cards under corporate limit pool.</CardDescription>
        </CardHeader>
        <form onSubmit={handleApply}>
          <CardContent className="pt-4 space-y-3 text-xs text-navy">
            <div className="space-y-1">
              <Label htmlFor="app-holder">Cardholder Full Name</Label>
              <Input
                id="app-holder"
                placeholder="e.g. Tanvir Hasan"
                className="text-xs"
                value={holder}
                onChange={(e) => setHolder(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Card Class</Label>
                <Select value={cardType} onValueChange={setCardType}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Visa Corporate Gold">Visa Corporate Gold</SelectItem>
                    <SelectItem value="Mastercard Corporate Platinum">Mastercard Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="app-limit">Requested Limit (BDT)</Label>
                <Input
                  id="app-limit"
                  type="number"
                  placeholder="e.g. 500000"
                  className="text-xs font-mono"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/10 border-t py-2.5">
            <Button type="submit" size="sm" className="bg-navy hover:bg-navy/90 text-xs w-full">
              Submit Card Application
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Applications lists */}
      <Card className="lg:col-span-7 border border-border">
        <CardHeader className="bg-muted/10 border-b border-border py-3">
          <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider font-sans">Card Applications Log</CardTitle>
          <CardDescription className="text-[10px]">Applications statuses under maker-checker processing.</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">App Ref</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Card Class</TableHead>
              <TableHead className="text-right">Requested Limit</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead className="text-center pr-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cardApps.map(app => (
              <TableRow key={app.id}>
                <TableCell className="pl-4 font-mono text-xs font-semibold text-navy">{app.id}</TableCell>
                <TableCell className="text-xs font-semibold">{app.cardholderName}</TableCell>
                <TableCell className="text-xs">{app.cardType}</TableCell>
                <TableCell className="text-right font-mono text-xs text-navy font-semibold">{app.requestedLimit.toLocaleString()}</TableCell>
                <TableCell className="text-xs font-mono">{app.dateApplied}</TableCell>
                <TableCell className="text-center pr-4">{statusBadge(app.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

/* =========================================================================
   TAB 3: PHYSICAL STATEMENTS
   ========================================================================= */
function StatementSpoolTab({
  statements,
  onTriggerUpdate
}: {
  statements: PhysicalStatementRequest[];
  onTriggerUpdate: () => void;
}) {
  const [account, setAccount] = useState(OWN_ACCOUNTS[0].label);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [delivery, setDelivery] = useState<"Courier" | "Branch Pickup">("Courier");

  const handleRequestStatement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!start || !end) {
      toast.error("Please select both start and end statement dates.");
      return;
    }

    postStatementRequest(account, start, end, delivery);
    toast.success(`Statement printing order spooled to clearing desk.`);
    setStart("");
    setEnd("");
    onTriggerUpdate();
  };

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      "Pending Print": "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
      "Dispatched": "bg-sky-500/15 text-sky-600 border-sky-500/30",
      "Delivered": "bg-success/15 text-success border-success/30"
    };
    return <Badge className={`text-[10px] font-semibold ${map[s] || ""}`} variant="outline">{s}</Badge>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Request form */}
      <Card className="lg:col-span-5 border border-border">
        <CardHeader className="bg-muted/10 border-b border-border py-3">
          <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider font-sans">Spool Printed Statement</CardTitle>
          <CardDescription className="text-[10px]">Order physical paper statements matching audit cycles.</CardDescription>
        </CardHeader>
        <form onSubmit={handleRequestStatement}>
          <CardContent className="pt-4 space-y-3 text-xs text-navy">
            <div className="space-y-1">
              <Label>Source Account</Label>
              <Select value={account} onValueChange={setAccount}>
                <SelectTrigger className="h-9 text-xs font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OWN_ACCOUNTS.map(a => (
                    <SelectItem key={a.id} value={a.label}>{a.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="stm-start">Start Date</Label>
                <Input
                  id="stm-start"
                  type="date"
                  className="text-xs"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="stm-end">End Date</Label>
                <Input
                  id="stm-end"
                  type="date"
                  className="text-xs"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Delivery Mode</Label>
              <Select value={delivery} onValueChange={(val: any) => setDelivery(val)}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Courier">Secure Courier Dispatch</SelectItem>
                  <SelectItem value="Branch Pickup">Branch Counter Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/10 border-t py-2.5">
            <Button type="submit" size="sm" className="bg-navy hover:bg-navy/90 text-xs w-full">
              Request Printed Statement
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* History table */}
      <Card className="lg:col-span-7 border border-border">
        <CardHeader className="bg-muted/10 border-b border-border py-3">
          <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider font-sans">Statement Orders History</CardTitle>
          <CardDescription className="text-[10px]">Tracking codes for printed statement dispatches.</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Request ID</TableHead>
              <TableHead>Account No</TableHead>
              <TableHead>Range</TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead>Spool Date</TableHead>
              <TableHead className="text-center pr-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statements.map(req => (
              <TableRow key={req.id}>
                <TableCell className="pl-4 font-mono text-xs font-semibold text-navy">{req.id}</TableCell>
                <TableCell className="text-xs font-mono">{req.account.split(" — ")[0]}</TableCell>
                <TableCell className="text-xs font-mono whitespace-nowrap">
                  {req.startDate} to {req.endDate}
                </TableCell>
                <TableCell className="text-xs">
                  <Badge variant="secondary" className="bg-navy/5 text-navy text-[9px] font-semibold">
                    {req.deliveryMode}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs font-mono">{req.dateRequested}</TableCell>
                <TableCell className="text-center pr-4">{statusBadge(req.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
