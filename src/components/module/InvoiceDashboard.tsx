import React, { useState, useMemo } from "react";
import {
  FileText, Coins, Plus, Trash2, Calendar, FileSpreadsheet,
  Check, ChevronDown, ChevronUp, Download, Search, CheckCircle2,
  AlertTriangle, ArrowRightLeft, DollarSign, Wallet
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  getInvoices,
  postSingleInvoiceMultiInstruments,
  postMultiInvoicesSingleInstrument,
  CollectionInstrument,
  Invoice
} from "@/lib/invoiceManagement";

export function InvoiceDashboard() {
  const [activeTab, setActiveTab] = useState("ledger");
  const [updateTick, setUpdateTick] = useState(0);
  const triggerUpdate = () => setUpdateTick(prev => prev + 1);

  const invoices = useMemo(() => getInvoices(), [updateTick]);

  // Aggregate stats
  const totalOutstanding = useMemo(() => {
    return invoices
      .filter(i => i.status !== "Fully Paid")
      .reduce((sum, i) => sum + (i.totalAmount - i.collectedAmount), 0);
  }, [invoices]);

  const totalCollected = useMemo(() => {
    return invoices.reduce((sum, i) => sum + i.collectedAmount, 0);
  }, [invoices]);

  const unpaidCount = useMemo(() => {
    return invoices.filter(i => i.status === "Unpaid").length;
  }, [invoices]);

  const partialCount = useMemo(() => {
    return invoices.filter(i => i.status === "Partially Paid").length;
  }, [invoices]);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <a href="/app" className="hover:text-navy">Dashboard</a>
        <ChevronDown className="w-3 h-3 -rotate-90" />
        <span className="text-foreground font-semibold">Invoice Management</span>
      </nav>

      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
        <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Corporate Invoice Ledger</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Track customer outstanding bills, and reconcile cash/cheque/transfer deposits using flexible hybrid collections.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-sm text-navy">
        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0">
            <FileSpreadsheet className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Total Invoiced</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              ৳ {invoices.reduce((sum, i) => sum + i.totalAmount, 0).toLocaleString()}
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Customer ledger value</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 text-success grid place-items-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Total Collected</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              ৳ {totalCollected.toLocaleString()}
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Reconciled payments</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 text-destructive grid place-items-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Outstanding Due</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              ৳ {totalOutstanding.toLocaleString()}
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">{unpaidCount + partialCount} Bills pending payment</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Hybrid Matching</div>
            <div className="font-display text-lg mt-1 text-navy font-bold font-sans">
              Dynamic Routing
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Multi-instrument supported</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border w-full justify-start p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="ledger" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <FileSpreadsheet className="w-3.5 h-3.5" /> Invoices Ledger
          </TabsTrigger>
          <TabsTrigger value="hybrid" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Coins className="w-3.5 h-3.5" /> Hybrid Collections Manager
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ledger">
          <InvoiceLedgerTab invoices={invoices} />
        </TabsContent>

        <TabsContent value="hybrid">
          <HybridCollectionsTab invoices={invoices} onSubmitted={triggerUpdate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* =========================================================================
   TAB 1: INVOICES LEDGER
   ========================================================================= */
function InvoiceLedgerTab({ invoices }: { invoices: Invoice[] }) {
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredInvoices = useMemo(() => {
    return invoices.filter(i =>
      i.id.toLowerCase().includes(search.toLowerCase()) ||
      i.customerName.toLowerCase().includes(search.toLowerCase())
    );
  }, [invoices, search]);

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      "Fully Paid": "bg-success/15 text-success border-success/30",
      "Partially Paid": "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
      "Unpaid": "bg-destructive/15 text-destructive border-destructive/30"
    };
    return <Badge className={`text-[10px] font-semibold ${map[s] || ""}`} variant="outline">{s}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Filtering */}
      <Card className="p-4 bg-card border border-border">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search invoice number or customer name..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>

      {/* Ledger Table */}
      <Card className="border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Invoice No</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Total Invoice (BDT)</TableHead>
              <TableHead className="text-right">Collected (BDT)</TableHead>
              <TableHead className="text-right">Outstanding (BDT)</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map(inv => {
              const isExpanded = expandedInvoice === inv.id;
              const outstanding = inv.totalAmount - inv.collectedAmount;
              return (
                <React.Fragment key={inv.id}>
                  <TableRow className="hover:bg-muted/10 cursor-pointer" onClick={() => setExpandedInvoice(isExpanded ? null : inv.id)}>
                    <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-6 w-6 animate-fade-in" onClick={() => setExpandedInvoice(isExpanded ? null : inv.id)}>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-semibold text-navy">{inv.id}</TableCell>
                    <TableCell className="text-sm font-semibold">{inv.customerName}</TableCell>
                    <TableCell className="text-xs">{inv.issueDate}</TableCell>
                    <TableCell className="text-xs">{inv.dueDate}</TableCell>
                    <TableCell className="text-right font-mono text-xs font-bold text-navy">{inv.totalAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-xs text-success font-bold">{inv.collectedAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-xs text-destructive font-bold">
                      {outstanding > 0 ? outstanding.toLocaleString() : "0.00"}
                    </TableCell>
                    <TableCell className="text-center">{statusBadge(inv.status)}</TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow className="bg-muted/5 hover:bg-muted/5">
                      <TableCell colSpan={9} className="p-4 border-t">
                        <div className="space-y-3">
                          <h4 className="text-xs uppercase font-bold text-navy tracking-wider">Payment History & Instrument Details</h4>
                          {inv.payments.length === 0 ? (
                            <div className="text-xs text-muted-foreground py-2 italic">No payment logs recorded yet.</div>
                          ) : (
                            <div className="border border-border bg-white rounded-md overflow-hidden max-w-2xl">
                              <Table>
                                <TableHeader className="bg-muted/30">
                                  <TableRow>
                                    <TableHead className="w-12 text-center">Row</TableHead>
                                    <TableHead>Payment Date</TableHead>
                                    <TableHead>Instrument</TableHead>
                                    <TableHead>Reference No</TableHead>
                                    <TableHead className="text-right pr-4">Amount Credited (BDT)</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {inv.payments.map((p, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell className="text-center font-mono text-xs">{idx + 1}</TableCell>
                                      <TableCell className="text-xs">{p.date}</TableCell>
                                      <TableCell className="text-xs">
                                        <Badge variant="secondary" className="bg-navy/5 text-navy font-semibold text-[10px]">{p.instrumentType}</Badge>
                                      </TableCell>
                                      <TableCell className="font-mono text-xs">{p.instrumentRef}</TableCell>
                                      <TableCell className="text-right font-mono text-xs font-bold text-navy pr-4">{p.amount.toLocaleString()}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

/* =========================================================================
   TAB 2: HYBRID COLLECTIONS MANAGER
   ========================================================================= */
function HybridCollectionsTab({ invoices, onSubmitted }: { invoices: Invoice[], onSubmitted: () => void }) {
  const [hybridMode, setHybridMode] = useState<"single-multi" | "multi-single">("single-multi");

  // State Case A: Single Invoice - Multi Instruments
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [instruments, setInstruments] = useState<CollectionInstrument[]>([
    { type: "Cheque", referenceNo: "", amount: 0, date: new Date().toISOString().split("T")[0] }
  ]);

  // State Case B: Multi Invoices - Single Instrument
  const [instType, setInstType] = useState<"Cheque" | "Pay Order" | "Demand Draft" | "Online Transfer">("Cheque");
  const [instRef, setInstRef] = useState("");
  const [instTotalAmount, setInstTotalAmount] = useState("");
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<string[]>([]);
  const [allocations, setAllocations] = useState<Record<string, number>>({});

  // Filter out unpaid/partial invoices
  const outstandingInvoices = useMemo(() => {
    return invoices.filter(i => i.status !== "Fully Paid");
  }, [invoices]);

  const selectedInvoiceObj = useMemo(() => {
    return invoices.find(i => i.id === selectedInvoiceId);
  }, [invoices, selectedInvoiceId]);

  const targetInvoiceDue = useMemo(() => {
    if (!selectedInvoiceObj) return 0;
    return selectedInvoiceObj.totalAmount - selectedInvoiceObj.collectedAmount;
  }, [selectedInvoiceObj]);

  // CASE A functions
  const addInstrumentRow = () => {
    setInstruments([...instruments, { type: "Cheque", referenceNo: "", amount: 0, date: new Date().toISOString().split("T")[0] }]);
  };

  const removeInstrumentRow = (idx: number) => {
    if (instruments.length === 1) {
      toast.error("At least one instrument is required.");
      return;
    }
    setInstruments(instruments.filter((_, i) => i !== idx));
  };

  const updateInstrumentRow = (idx: number, key: keyof CollectionInstrument, val: any) => {
    const updated = [...instruments];
    if (key === "amount") {
      updated[idx][key] = parseFloat(val) || 0;
    } else {
      updated[idx][key] = val;
    }
    setInstruments(updated);
  };

  const sumInstruments = useMemo(() => {
    return instruments.reduce((sum, inst) => sum + inst.amount, 0);
  }, [instruments]);

  const handlePostCaseA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceId) {
      toast.error("Please select an invoice to allocate payments to.");
      return;
    }

    // Validation
    for (let i = 0; i < instruments.length; i++) {
      const rowNum = i + 1;
      const inst = instruments[i];
      if (!inst.referenceNo.trim()) {
        toast.error(`Instrument Row ${rowNum}: Reference number is required.`);
        return;
      }
      if (inst.amount <= 0) {
        toast.error(`Instrument Row ${rowNum}: Amount must be a positive number.`);
        return;
      }
    }

    postSingleInvoiceMultiInstruments(selectedInvoiceId, instruments);
    toast.success(`Hybrid payments applied successfully to Invoice ${selectedInvoiceId}.`);

    // Reset Form
    setSelectedInvoiceId("");
    setInstruments([{ type: "Cheque", referenceNo: "", amount: 0, date: new Date().toISOString().split("T")[0] }]);
    onSubmitted();
  };

  // CASE B functions
  const toggleSelectInvoice = (id: string) => {
    if (selectedInvoiceIds.includes(id)) {
      setSelectedInvoiceIds(selectedInvoiceIds.filter(x => x !== id));
      const updated = { ...allocations };
      delete updated[id];
      setAllocations(updated);
    } else {
      setSelectedInvoiceIds([...selectedInvoiceIds, id]);
      const invObj = outstandingInvoices.find(x => x.id === id);
      const remainingDue = invObj ? (invObj.totalAmount - invObj.collectedAmount) : 0;
      setAllocations({ ...allocations, [id]: remainingDue });
    }
  };

  const handleUpdateAllocation = (id: string, amount: string) => {
    const parsed = parseFloat(amount) || 0;
    setAllocations({ ...allocations, [id]: parsed });
  };

  const sumAllocations = useMemo(() => {
    return Object.values(allocations).reduce((sum, val) => sum + val, 0);
  }, [allocations]);

  const handlePostCaseB = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instRef.trim() || !instTotalAmount || parseFloat(instTotalAmount) <= 0) {
      toast.error("Please provide payment instrument reference and total value.");
      return;
    }
    if (selectedInvoiceIds.length === 0) {
      toast.error("Please select at least one invoice for allocation.");
      return;
    }

    const totalInstVal = parseFloat(instTotalAmount);
    if (sumAllocations > totalInstVal) {
      toast.error(`Allocation Mismatch: Allocated sum (৳ ${sumAllocations.toLocaleString()}) cannot exceed the Instrument total (৳ ${totalInstVal.toLocaleString()}).`);
      return;
    }

    // Format allocations
    const formatted = selectedInvoiceIds.map(id => ({
      invoiceId: id,
      amountAllocated: allocations[id] || 0
    }));

    const singleInstrument: CollectionInstrument = {
      type: instType,
      referenceNo: instRef,
      amount: totalInstVal,
      date: new Date().toISOString().split("T")[0]
    };

    postMultiInvoicesSingleInstrument(formatted, singleInstrument);
    toast.success(`Instrument allocation of BDT ${totalInstVal.toLocaleString()} reconciled across ${selectedInvoiceIds.length} invoices.`);

    // Reset Form
    setInstRef("");
    setInstTotalAmount("");
    setSelectedInvoiceIds([]);
    setAllocations({});
    onSubmitted();
  };

  return (
    <Card className="border border-border">
      <CardHeader className="bg-muted/10 border-b border-border pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-navy font-bold text-base flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-gold" /> Hybrid Collection Matrix
          </CardTitle>
          <CardDescription className="text-xs">
            Post splits of multiple cheques against single invoices, or allocate one cheque across multiple customer bills.
          </CardDescription>
        </div>
        <div className="flex gap-1">
          <Button variant={hybridMode === "single-multi" ? "default" : "ghost"} size="sm" onClick={() => setHybridMode("single-multi")} className="text-xs">
            1 Invoice - Multi Instruments
          </Button>
          <Button variant={hybridMode === "multi-single" ? "default" : "ghost"} size="sm" onClick={() => setHybridMode("multi-single")} className="text-xs">
            Multi Invoices - 1 Instrument
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {hybridMode === "single-multi" ? (
          /* Case A Form */
          <form onSubmit={handlePostCaseA} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
              <div className="space-y-1">
                <Label htmlFor="target-inv" className="text-xs font-semibold">Select Target Invoice</Label>
                <Select value={selectedInvoiceId} onValueChange={setSelectedInvoiceId}>
                  <SelectTrigger id="target-inv">
                    <SelectValue placeholder="Choose Invoice" />
                  </SelectTrigger>
                  <SelectContent>
                    {outstandingInvoices.map(i => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.id} — {i.customerName} (Due: ৳ {(i.totalAmount - i.collectedAmount).toLocaleString()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedInvoiceObj && (
                <div className="p-3 bg-muted/40 rounded-lg flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase">Invoice Outstanding</span>
                    <span className="font-bold text-destructive">BDT {targetInvoiceDue.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase">Total Invoice</span>
                    <span className="font-semibold">{selectedInvoiceObj.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic instruments grid */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Collection Instruments</Label>
              <div className="border border-border rounded-md overflow-hidden bg-white">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="w-10 text-center">Row</TableHead>
                      <TableHead>Instrument Mode</TableHead>
                      <TableHead>Reference / Chq Number</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[180px]">Amount (BDT)</TableHead>
                      <TableHead className="w-12 text-center">Delete</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instruments.map((inst, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-center font-mono text-xs">{idx + 1}</TableCell>
                        <TableCell>
                          <Select
                            value={inst.type}
                            onValueChange={(val: any) => updateInstrumentRow(idx, "type", val)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Cheque">Local Cheque</SelectItem>
                              <SelectItem value="Pay Order">Pay Order (PO)</SelectItem>
                              <SelectItem value="Demand Draft">Demand Draft (DD)</SelectItem>
                              <SelectItem value="Cash">Cash Deposit</SelectItem>
                              <SelectItem value="Online Transfer">BEFTN / Online Transfer</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Reference No"
                            className="h-8 text-xs font-mono"
                            value={inst.referenceNo}
                            onChange={(e) => updateInstrumentRow(idx, "referenceNo", e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="date"
                            className="h-8 text-xs"
                            value={inst.date}
                            onChange={(e) => updateInstrumentRow(idx, "date", e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            placeholder="Amount"
                            className="h-8 text-xs font-mono"
                            value={inst.amount || ""}
                            onChange={(e) => updateInstrumentRow(idx, "amount", e.target.value)}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" onClick={() => removeInstrumentRow(idx)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button variant="outline" size="sm" onClick={addInstrumentRow} className="text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Instrument
                </Button>
                <div className="text-xs text-muted-foreground flex items-center gap-4">
                  <span>Total Payments: <strong className="text-navy">BDT {sumInstruments.toLocaleString()}</strong></span>
                  {selectedInvoiceObj && (
                    <span className={sumInstruments > targetInvoiceDue ? "text-yellow-600 font-semibold" : ""}>
                      {sumInstruments > targetInvoiceDue ? "Excess Credit (Overpayment)" : `Remaining Due: BDT ${(targetInvoiceDue - sumInstruments).toLocaleString()}`}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs">
              Apply Hybrid Payments to Invoice
            </Button>
          </form>
        ) : (
          /* Case B Form */
          <form onSubmit={handlePostCaseB} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
              <div className="space-y-1">
                <Label htmlFor="inst-type" className="text-xs font-semibold">Instrument Type</Label>
                <Select value={instType} onValueChange={(val: any) => setInstType(val)}>
                  <SelectTrigger id="inst-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cheque">Local Clearing Cheque</SelectItem>
                    <SelectItem value="Pay Order">Pay Order (PO)</SelectItem>
                    <SelectItem value="Demand Draft">Demand Draft (DD)</SelectItem>
                    <SelectItem value="Online Transfer">Batch Clearing Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="inst-ref" className="text-xs font-semibold">Instrument Reference / No</Label>
                <Input
                  id="inst-ref"
                  placeholder="e.g. DD-90082"
                  value={instRef}
                  onChange={(e) => setInstRef(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="inst-val" className="text-xs font-semibold">Total Instrument Amount (BDT)</Label>
                <Input
                  id="inst-val"
                  type="number"
                  placeholder="0.00"
                  value={instTotalAmount}
                  onChange={(e) => setInstTotalAmount(e.target.value)}
                />
              </div>
            </div>

            {/* Invoices Selection & Allocation list */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-3 border-t border-border">
              <div className="lg:col-span-2 space-y-2">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Select Invoices & Allocate Amounts</Label>
                <div className="border border-border rounded-md overflow-hidden bg-white">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead className="w-10 text-center"></TableHead>
                        <TableHead>Invoice No</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Outstanding (BDT)</TableHead>
                        <TableHead className="w-[180px] text-right pr-4">Amount to Allocate (BDT)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {outstandingInvoices.map(inv => {
                        const isChecked = selectedInvoiceIds.includes(inv.id);
                        const outstanding = inv.totalAmount - inv.collectedAmount;
                        return (
                          <TableRow key={inv.id} className={isChecked ? "bg-gold/5" : ""}>
                            <TableCell className="text-center">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleSelectInvoice(inv.id)}
                                className="rounded border-border text-navy"
                              />
                            </TableCell>
                            <TableCell className="font-mono text-xs font-semibold">{inv.id}</TableCell>
                            <TableCell className="text-sm font-semibold">{inv.customerName}</TableCell>
                            <TableCell className="text-right font-mono text-xs text-destructive font-semibold">
                              {outstanding.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right pr-4">
                              <Input
                                type="number"
                                disabled={!isChecked}
                                className="h-8 text-xs font-mono text-right"
                                value={allocations[inv.id] !== undefined ? allocations[inv.id] : ""}
                                onChange={(e) => handleUpdateAllocation(inv.id, e.target.value)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Allocation stats card */}
              <div className="lg:col-span-1 space-y-4">
                <Card className="border border-border p-4 bg-muted/20 h-fit space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy">Reconciliation Summary</h4>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Instrument Value:</span>
                      <span className="font-semibold">৳ {instTotalAmount ? parseFloat(instTotalAmount).toLocaleString() : "0.00"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Allocated Sum:</span>
                      <span className="font-semibold text-success">৳ {sumAllocations.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 border-border">
                      <span className="text-muted-foreground">Remaining Unallocated:</span>
                      <span className={`font-bold ${
                        instTotalAmount && parseFloat(instTotalAmount) - sumAllocations < 0 ? "text-destructive" : ""
                      }`}>
                        ৳ {instTotalAmount ? (parseFloat(instTotalAmount) - sumAllocations).toLocaleString() : "0.00"}
                      </span>
                    </div>
                  </div>

                  {instTotalAmount && (
                    <div className="space-y-1.5">
                      <Progress
                        value={Math.min(100, Math.round((sumAllocations / parseFloat(instTotalAmount)) * 100))}
                        className={`h-1.5 ${
                          sumAllocations > parseFloat(instTotalAmount) ? "[&>div]:bg-destructive" : ""
                        }`}
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>Allocation Progress</span>
                        <span>{Math.round((sumAllocations / parseFloat(instTotalAmount)) * 100)}%</span>
                      </div>
                    </div>
                  )}

                  {sumAllocations > (parseFloat(instTotalAmount) || 0) && (
                    <div className="bg-destructive/5 text-destructive border border-destructive/20 rounded p-2.5 text-[10px] flex gap-1.5 items-start">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>Warning: Allocated amounts exceed total instrument value. Adjust allocations down.</span>
                    </div>
                  )}
                </Card>
              </div>
            </div>

            <Button
              type="submit"
              className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs"
              disabled={sumAllocations > (parseFloat(instTotalAmount) || 0) || selectedInvoiceIds.length === 0}
            >
              Reconcile & Apply Batch Allocations
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
