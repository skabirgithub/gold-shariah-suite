import React, { useState, useMemo } from "react";
import {
  Printer, Search, Filter, Check, X, ChevronDown, ChevronUp, Sliders,
  Download, RefreshCw, Play, FileText, CheckCircle2, Trash2, Plus, Type,
  Image, Terminal, Settings, AlertTriangle, Building2, User, HelpCircle,
  Scissors
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
  getInstructions,
  saveInstruction,
  updateInstructionStatus,
  getDesigns,
  saveDesign,
  getPrinters,
  PaymentInstruction,
  InstrumentDesign,
  PrinterProfile
} from "@/lib/paymentInstructions";

export function PaymentInstructionDashboard() {
  const [activeTab, setActiveTab] = useState("tracker");
  const [updateTick, setUpdateTick] = useState(0);
  const triggerUpdate = () => setUpdateTick(prev => prev + 1);

  // Load state datasets
  const instructions = useMemo(() => getInstructions(), [updateTick]);
  const designs = useMemo(() => getDesigns(), [updateTick]);
  const printers = useMemo(() => getPrinters(), []);

  // Stats
  const totalInstructions = useMemo(() => instructions.length, [instructions]);
  const pendingCount = useMemo(() => instructions.filter(i => i.status === "Pending").length, [instructions]);
  const printedCount = useMemo(() => instructions.filter(i => i.status === "Printed").length, [instructions]);
  const dispatchedCount = useMemo(() => instructions.filter(i => i.status === "Dispatched").length, [instructions]);

  // Support jumping to print queue with pre-selected instructions
  const [preSelectedPrintIds, setPreSelectedPrintIds] = useState<string[]>([]);

  const handleGoToPrint = (ids: string[]) => {
    setPreSelectedPrintIds(ids);
    setActiveTab("printing");
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <a href="/app" className="hover:text-navy">Dashboard</a>
        <ChevronDown className="w-3 h-3 -rotate-90" />
        <span className="text-foreground font-semibold">Payment Instruction</span>
      </nav>

      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
        <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Payment Instruction & Cheque Spooler</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Track physical instruments, design corporate cheques & demand drafts using dynamic coordinate sliders, and manage local or remote branch clearing printer spoolers.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-sm text-navy">
        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0">
            <FileText className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Total Instructions</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {totalInstructions} Records
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Instruction database logs</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-600 grid place-items-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Pending Printing</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {pendingCount} Instruments
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Awaiting physical printing</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 text-success grid place-items-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Printed Instruments</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {printedCount} Cheques
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Successfully spool calibrated</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center shrink-0">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Dispatched / Sent</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {dispatchedCount} Instruments
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Sent to payees/clearing</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border w-full justify-start p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="tracker" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <FileText className="w-3.5 h-3.5" /> Instruction Tracker
          </TabsTrigger>
          <TabsTrigger value="designer" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Sliders className="w-3.5 h-3.5" /> Instrument Designer
          </TabsTrigger>
          <TabsTrigger value="printing" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Printer className="w-3.5 h-3.5" /> Printing Queue
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracker">
          <InstructionTrackerTab
            instructions={instructions}
            onGoToPrint={handleGoToPrint}
            onTriggerUpdate={triggerUpdate}
          />
        </TabsContent>

        <TabsContent value="designer">
          <InstrumentDesignerTab
            designs={designs}
            onTriggerUpdate={triggerUpdate}
          />
        </TabsContent>

        <TabsContent value="printing">
          <PrintingQueueTab
            printers={printers}
            designs={designs}
            instructions={instructions}
            preSelectedIds={preSelectedPrintIds}
            onClearPreSelection={() => setPreSelectedPrintIds([])}
            onTriggerUpdate={triggerUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* =========================================================================
   TAB 1: INSTRUCTION TRACKER
   ========================================================================= */
function InstructionTrackerTab({
  instructions,
  onGoToPrint,
  onTriggerUpdate
}: {
  instructions: PaymentInstruction[];
  onGoToPrint: (ids: string[]) => void;
  onTriggerUpdate: () => void;
}) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [newInstModal, setNewInstModal] = useState(false);
  const [newPayee, setNewPayee] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newType, setNewType] = useState<"Pay Order" | "Demand Draft" | "Corporate Cheque">("Pay Order");
  const [newAccount, setNewAccount] = useState(OWN_ACCOUNTS[0].label);

  const filtered = useMemo(() => {
    return instructions.filter(i => {
      const matchesSearch =
        i.payeeName.toLowerCase().includes(search.toLowerCase()) ||
        i.referenceNo.toLowerCase().includes(search.toLowerCase()) ||
        i.id.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === "All" || i.instrumentType === filterType;
      const matchesStatus = filterStatus === "All" || i.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [instructions, search, filterType, filterStatus]);

  const handleCreateInstruction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayee.trim() || !newAmount || parseFloat(newAmount) <= 0) {
      toast.error("Please fill in payee name and a valid amount.");
      return;
    }

    const newInst: PaymentInstruction = {
      id: `PAY-${Date.now().toString().slice(-4)}`,
      referenceNo: `PIN-${Math.floor(100000 + Math.random() * 900000)}`,
      instrumentType: newType,
      fromAccount: newAccount,
      payeeName: newPayee,
      amount: parseFloat(newAmount),
      date: new Date().toISOString().split("T")[0],
      status: "Pending"
    };

    saveInstruction(newInst);
    toast.success("New payment instruction logged. Ready to design/print.");
    setNewPayee("");
    setNewAmount("");
    setNewInstModal(false);
    onTriggerUpdate();
  };

  const handleUpdateStatus = (id: string, nextStatus: "Pending" | "Printed" | "Dispatched" | "Cancelled") => {
    updateInstructionStatus(id, nextStatus);
    toast.success(`Instruction ${id} marked as ${nextStatus}.`);
    onTriggerUpdate();
  };

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      "Pending": "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
      "Printed": "bg-success/15 text-success border-success/30",
      "Dispatched": "bg-navy/15 text-navy border-navy/30",
      "Cancelled": "bg-destructive/15 text-destructive border-destructive/30"
    };
    return <Badge className={`text-[10px] font-semibold ${map[s] || ""}`} variant="outline">{s}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <Card className="p-4 bg-card border border-border flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search reference, payee..."
              className="pl-9 text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40 text-xs h-8">
                <SelectValue placeholder="Instrument Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Instruments</SelectItem>
                <SelectItem value="Pay Order">Pay Orders</SelectItem>
                <SelectItem value="Demand Draft">Demand Drafts</SelectItem>
                <SelectItem value="Corporate Cheque">Corporate Cheques</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-36 text-xs h-8">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending Printing</SelectItem>
                <SelectItem value="Printed">Printed</SelectItem>
                <SelectItem value="Dispatched">Dispatched</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={() => setNewInstModal(true)} className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs h-8">
          <Plus className="w-3.5 h-3.5 mr-1" /> New Instruction
        </Button>
      </Card>

      {/* Grid Ledger Table */}
      <Card className="border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">ID</TableHead>
              <TableHead>Reference No</TableHead>
              <TableHead>Payee Name</TableHead>
              <TableHead>Debit Account</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount (BDT)</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right pr-4">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-xs text-muted-foreground py-8 italic">
                  No payment instructions match your search filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(inst => (
                <TableRow key={inst.id} className="hover:bg-muted/10">
                  <TableCell className="pl-4 font-mono text-xs font-semibold text-navy">{inst.id}</TableCell>
                  <TableCell className="font-mono text-xs">{inst.referenceNo}</TableCell>
                  <TableCell className="text-sm font-semibold">{inst.payeeName}</TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">{inst.fromAccount}</TableCell>
                  <TableCell className="text-xs">
                    <Badge variant="secondary" className="bg-navy/5 text-navy font-semibold text-[10px]">
                      {inst.instrumentType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs font-bold text-navy">
                    {inst.amount.toLocaleString("en-US")}
                  </TableCell>
                  <TableCell className="text-xs font-mono">{inst.date}</TableCell>
                  <TableCell className="text-center">{statusBadge(inst.status)}</TableCell>
                  <TableCell className="text-right pr-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1.5">
                      {inst.status === "Pending" && (
                        <>
                          <Button
                            size="sm"
                            className="h-7 text-[10px] bg-navy text-white hover:bg-navy/90"
                            onClick={() => onGoToPrint([inst.id])}
                          >
                            <Printer className="w-3 h-3 mr-1" /> Spool Print
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-[10px] text-destructive hover:bg-destructive/10"
                            onClick={() => handleUpdateStatus(inst.id, "Cancelled")}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {inst.status === "Printed" && (
                        <>
                          <Button
                            size="sm"
                            className="h-7 text-[10px] bg-success text-white hover:bg-success/90"
                            onClick={() => handleUpdateStatus(inst.id, "Dispatched")}
                          >
                            <Check className="w-3 h-3 mr-1" /> Dispatch
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-[10px] text-muted-foreground hover:bg-muted"
                            onClick={() => handleUpdateStatus(inst.id, "Pending")}
                          >
                            Re-spool
                          </Button>
                        </>
                      )}
                      {inst.status === "Dispatched" && (
                        <span className="text-[10px] text-muted-foreground font-mono italic pr-2">Cleared</span>
                      )}
                      {inst.status === "Cancelled" && (
                        <span className="text-[10px] text-destructive font-mono italic pr-2">Cancelled</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Modal Dialog for New Instruction */}
      {newInstModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4">
          <Card className="w-full max-w-md border border-border shadow-2xl bg-white">
            <CardHeader className="bg-navy/5 border-b pb-3">
              <CardTitle className="text-navy text-base font-bold flex items-center gap-2">
                <Printer className="w-5 h-5 text-gold" /> Log Payment Instruction
              </CardTitle>
              <CardDescription className="text-xs">
                Log a cheque or pay order parameter set. Visual design is customized in Tab 2.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleCreateInstruction}>
              <CardContent className="space-y-4 pt-4 text-xs text-navy">
                <div className="space-y-1">
                  <Label htmlFor="inst-payee">Payee Name</Label>
                  <Input
                    id="inst-payee"
                    placeholder="Beneficiary name (e.g. Bata Shoes Ltd)"
                    className="text-xs"
                    value={newPayee}
                    onChange={(e) => setNewPayee(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="inst-amount">Amount (BDT)</Label>
                    <Input
                      id="inst-amount"
                      type="number"
                      placeholder="0.00"
                      className="text-xs font-mono"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="inst-type-sel">Instrument Type</Label>
                    <Select value={newType} onValueChange={(val: any) => setNewType(val)}>
                      <SelectTrigger id="inst-type-sel" className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pay Order">Pay Order</SelectItem>
                        <SelectItem value="Demand Draft">Demand Draft</SelectItem>
                        <SelectItem value="Corporate Cheque">Corporate Cheque</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="inst-debit">Debit Pooling Account</Label>
                  <Select value={newAccount} onValueChange={setNewAccount}>
                    <SelectTrigger id="inst-debit" className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {OWN_ACCOUNTS.map(acc => (
                        <SelectItem key={acc.id} value={acc.label}>{acc.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/10 border-t py-3 flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setNewInstModal(false)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-navy text-white hover:bg-navy/90 text-xs">
                  Log Parameter Record
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
   TAB 2: INSTRUMENT DESIGNER
   ========================================================================= */
function InstrumentDesignerTab({
  designs,
  onTriggerUpdate
}: {
  designs: InstrumentDesign[];
  onTriggerUpdate: () => void;
}) {
  const [selectedDesignId, setSelectedDesignId] = useState<string>(designs[0]?.id || "DES-01");

  // Local copy of currently selected design fields to allow sliding
  const currentDesign = useMemo(() => {
    return designs.find(d => d.id === selectedDesignId) || {
      id: `DES-${Date.now().toString().slice(-3)}`,
      name: "Custom Cheque Template",
      templateType: "Corporate Cheque" as const,
      fontFamily: "font-mono",
      borderColor: "border-gold",
      logoWatermark: "Classic SJIBL Crest",
      payeeX: 40,
      payeeY: 35,
      amountX: 75,
      amountY: 48,
      dateX: 80,
      dateY: 12,
      signX: 70,
      signY: 75
    };
  }, [designs, selectedDesignId]);

  // Form states matching selected design
  const [name, setName] = useState(currentDesign.name);
  const [templateType, setTemplateType] = useState(currentDesign.templateType);
  const [fontFamily, setFontFamily] = useState(currentDesign.fontFamily);
  const [borderColor, setBorderColor] = useState(currentDesign.borderColor);
  const [logoWatermark, setLogoWatermark] = useState(currentDesign.logoWatermark);

  const [payeeX, setPayeeX] = useState(currentDesign.payeeX);
  const [payeeY, setPayeeY] = useState(currentDesign.payeeY);
  const [amountX, setAmountX] = useState(currentDesign.amountX);
  const [amountY, setAmountY] = useState(currentDesign.amountY);
  const [dateX, setDateX] = useState(currentDesign.dateX);
  const [dateY, setDateY] = useState(currentDesign.dateY);
  const [signX, setSignX] = useState(currentDesign.signX);
  const [signY, setSignY] = useState(currentDesign.signY);

  // Sync state when loading a different template
  React.useEffect(() => {
    setName(currentDesign.name);
    setTemplateType(currentDesign.templateType);
    setFontFamily(currentDesign.fontFamily);
    setBorderColor(currentDesign.borderColor);
    setLogoWatermark(currentDesign.logoWatermark);
    setPayeeX(currentDesign.payeeX);
    setPayeeY(currentDesign.payeeY);
    setAmountX(currentDesign.amountX);
    setAmountY(currentDesign.amountY);
    setDateX(currentDesign.dateX);
    setDateY(currentDesign.dateY);
    setSignX(currentDesign.signX);
    setSignY(currentDesign.signY);
  }, [currentDesign]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: InstrumentDesign = {
      id: selectedDesignId === "new" ? `DES-${Date.now().toString().slice(-4)}` : selectedDesignId,
      name,
      templateType,
      fontFamily,
      borderColor,
      logoWatermark,
      payeeX,
      payeeY,
      amountX,
      amountY,
      dateX,
      dateY,
      signX,
      signY
    };

    saveDesign(payload);
    toast.success(`Instrument Template "${name}" saved to database.`);
    if (selectedDesignId === "new") {
      setSelectedDesignId(payload.id);
    }
    onTriggerUpdate();
  };

  const handleCreateNew = () => {
    setSelectedDesignId("new");
    setName("New Corporate Template");
    setTemplateType("Corporate Cheque");
    setFontFamily("font-serif");
    setBorderColor("border-navy");
    setLogoWatermark("Classic SJIBL Crest");
    setPayeeX(40);
    setPayeeY(40);
    setAmountX(75);
    setAmountY(50);
    setDateX(80);
    setDateY(15);
    setSignX(70);
    setSignY(75);
  };

  // Border mapping to CSS classes
  const borderClasses: Record<string, string> = {
    "border-gold": "border-gold/60 ring-2 ring-gold/20",
    "border-navy": "border-navy/60 ring-2 ring-navy/20",
    "border-emerald": "border-emerald-600/60 ring-2 ring-emerald-600/20"
  };

  // Font family mappings to CSS classes
  const fontClasses: Record<string, string> = {
    "font-mono": "font-mono",
    "font-serif": "font-serif",
    "font-sans": "font-sans",
    "font-display": "font-sans tracking-wide uppercase font-semibold"
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Design Control panel */}
      <Card className="lg:col-span-5 border border-border">
        <CardHeader className="bg-muted/10 border-b border-border py-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Design Controls</CardTitle>
            <CardDescription className="text-[10px]">Adjust text print coordinates dynamically.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleCreateNew} className="text-xs h-7 px-2">
            + New Design
          </Button>
        </CardHeader>
        <CardContent className="pt-4 space-y-4 text-xs text-navy">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="design-select">Select Template</Label>
              <Select value={selectedDesignId} onValueChange={setSelectedDesignId}>
                <SelectTrigger id="design-select" className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {designs.map(d => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                  {selectedDesignId === "new" && (
                    <SelectItem value="new">New Corporate Template</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="des-inst-type">Instrument Type</Label>
              <Select value={templateType} onValueChange={(val: any) => setTemplateType(val)}>
                <SelectTrigger id="des-inst-type" className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Corporate Cheque">Corporate Cheque</SelectItem>
                  <SelectItem value="Demand Draft">Demand Draft</SelectItem>
                  <SelectItem value="Pay Order">Pay Order</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="des-name">Template Name</Label>
            <Input
              id="des-name"
              className="h-8 text-xs font-semibold"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label>Font Family</Label>
              <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="font-sans">Inter (Sans)</SelectItem>
                  <SelectItem value="font-serif">Playfair (Serif)</SelectItem>
                  <SelectItem value="font-mono">JetBrains (Mono)</SelectItem>
                  <SelectItem value="font-display">Outfit (Display)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Border Theme</Label>
              <Select value={borderColor} onValueChange={setBorderColor}>
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="border-gold">SJIBL Gold</SelectItem>
                  <SelectItem value="border-navy">Treasury Navy</SelectItem>
                  <SelectItem value="border-emerald">Islamic Emerald</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Watermark Logo</Label>
              <Select value={logoWatermark} onValueChange={setLogoWatermark}>
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Classic SJIBL Crest">SJIBL Crest</SelectItem>
                  <SelectItem value="Standard Geometric Tint">Geometric Tint</SelectItem>
                  <SelectItem value="Treasury Filigree Seal">Filigree Seal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Coordinate Sliders */}
          <div className="space-y-3 pt-3 border-t border-border">
            <h4 className="font-bold text-navy uppercase text-[10px] tracking-wider">Coordinates (Print Alignment %)</h4>

            {/* Payee coordinates */}
            <div className="space-y-1.5 p-2 bg-muted/40 rounded-lg">
              <div className="flex justify-between font-semibold">
                <span>Payee Name Position</span>
                <span className="font-mono text-[10px] text-muted-foreground">X: {payeeX}% | Y: {payeeY}%</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[10px] text-muted-foreground">Horizontal (X)</Label>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    className="w-full h-1 accent-navy bg-border rounded-lg appearance-none cursor-pointer"
                    value={payeeX}
                    onChange={(e) => setPayeeX(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">Vertical (Y)</Label>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    className="w-full h-1 accent-navy bg-border rounded-lg appearance-none cursor-pointer"
                    value={payeeY}
                    onChange={(e) => setPayeeY(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Amount coordinates */}
            <div className="space-y-1.5 p-2 bg-muted/40 rounded-lg">
              <div className="flex justify-between font-semibold">
                <span>Amount Numeric Position</span>
                <span className="font-mono text-[10px] text-muted-foreground">X: {amountX}% | Y: {amountY}%</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[10px] text-muted-foreground">Horizontal (X)</Label>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    className="w-full h-1 accent-navy bg-border rounded-lg appearance-none cursor-pointer"
                    value={amountX}
                    onChange={(e) => setAmountX(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">Vertical (Y)</Label>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    className="w-full h-1 accent-navy bg-border rounded-lg appearance-none cursor-pointer"
                    value={amountY}
                    onChange={(e) => setAmountY(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Date coordinates */}
            <div className="space-y-1.5 p-2 bg-muted/40 rounded-lg">
              <div className="flex justify-between font-semibold">
                <span>Date Field Position</span>
                <span className="font-mono text-[10px] text-muted-foreground">X: {dateX}% | Y: {dateY}%</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[10px] text-muted-foreground">Horizontal (X)</Label>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    className="w-full h-1 accent-navy bg-border rounded-lg appearance-none cursor-pointer"
                    value={dateX}
                    onChange={(e) => setDateX(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">Vertical (Y)</Label>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    className="w-full h-1 accent-navy bg-border rounded-lg appearance-none cursor-pointer"
                    value={dateY}
                    onChange={(e) => setDateY(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Sign coordinates */}
            <div className="space-y-1.5 p-2 bg-muted/40 rounded-lg">
              <div className="flex justify-between font-semibold">
                <span>Authorized Signatory Position</span>
                <span className="font-mono text-[10px] text-muted-foreground">X: {signX}% | Y: {signY}%</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[10px] text-muted-foreground">Horizontal (X)</Label>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    className="w-full h-1 accent-navy bg-border rounded-lg appearance-none cursor-pointer"
                    value={signX}
                    onChange={(e) => setSignX(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">Vertical (Y)</Label>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    className="w-full h-1 accent-navy bg-border rounded-lg appearance-none cursor-pointer"
                    value={signY}
                    onChange={(e) => setSignY(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/10 border-t py-3 flex justify-end">
          <Button onClick={handleSave} className="bg-navy hover:bg-navy/90 text-xs w-full">
            Save Design Layout
          </Button>
        </CardFooter>
      </Card>

      {/* Visual Cheque Mockup preview */}
      <Card className="lg:col-span-7 border border-border h-full flex flex-col items-center justify-center p-6 bg-slate-50">
        <h4 className="text-xs uppercase font-bold text-navy tracking-wider mb-4 flex items-center gap-1">
          <Image className="w-3.5 h-3.5" /> High-Fidelity Print Preview
        </h4>

        {/* Outer Cheque Container */}
        <div
          className={`relative w-full max-w-[540px] aspect-[18/8] bg-white rounded-lg shadow-lg border p-4 overflow-hidden select-none transition-all duration-300 ${
            borderClasses[borderColor] || "border-gold"
          }`}
          style={{
            backgroundImage: "radial-gradient(#e2e8f0 1.5px, transparent 1.5px)",
            backgroundSize: "12px 12px",
          }}
        >
          {/* Watermark Centered */}
          <div className="absolute inset-0 grid place-items-center opacity-[0.04] pointer-events-none">
            <div className="text-center rotate-12">
              <Building2 className="w-36 h-36 mx-auto" />
              <span className="font-serif text-2xl font-bold tracking-widest uppercase">SJIBL TREASURY</span>
            </div>
          </div>

          {/* SJIBL Cheque Header Banner */}
          <div className="flex justify-between items-start border-b pb-1.5 border-navy/20">
            <div>
              <div className="text-[10px] font-bold text-navy uppercase tracking-wider flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-gold" /> Shahjalal Islami Bank PLC.
              </div>
              <div className="text-[8px] text-muted-foreground">Corporate Clearing Instrument — {templateType}</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-bold text-navy font-mono">№ SJ-1002928</div>
              <Badge variant="outline" className="text-[8px] h-4 text-gold border-gold/40">
                MICR Calibrated
              </Badge>
            </div>
          </div>

          {/* Watermark Label in Cheque Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none text-center">
            <span className="text-xs uppercase font-mono tracking-widest">{logoWatermark}</span>
          </div>

          {/* Absolute printable texts aligned by coordinates */}
          <div
            className={`absolute pointer-events-none font-bold text-xs text-navy/95 whitespace-nowrap ${fontClasses[fontFamily]}`}
            style={{ left: `${payeeX}%`, top: `${payeeY}%` }}
          >
            Payee: Bata Shoes Bangladesh PLC
          </div>

          <div
            className={`absolute pointer-events-none font-mono font-bold text-sm text-navy/95 bg-navy/5 px-2 py-0.5 border border-navy/10 rounded ${fontClasses[fontFamily]}`}
            style={{ left: `${amountX}%`, top: `${amountY}%` }}
          >
            ৳ 1,500,000.00
          </div>

          <div
            className={`absolute pointer-events-none font-mono font-bold text-xs text-navy/95 border-b border-navy/40 border-dashed pb-0.5 ${fontClasses[fontFamily]}`}
            style={{ left: `${dateX}%`, top: `${dateY}%` }}
          >
            Date: 15-06-2026
          </div>

          <div
            className={`absolute pointer-events-none text-center ${fontClasses[fontFamily]}`}
            style={{ left: `${signX}%`, top: `${signY}%` }}
          >
            <div className="text-[8px] text-muted-foreground uppercase border-t border-navy/40 border-dotted pt-0.5 px-3 whitespace-nowrap">
              Authorized Signatory
            </div>
            <span className="text-[9px] font-semibold text-navy/70 block mt-0.5 font-sans">Corporate Checker</span>
          </div>

          {/* MICR Encoding line at bottom of Cheque */}
          <div className="absolute bottom-2 left-6 right-6 flex justify-between items-center text-[9px] font-mono text-muted-foreground/60 border-t border-dashed pt-1.5">
            <span>⑈001002928⑈ 002150043⑆ 0123100001⑈ 12</span>
            <span className="text-[8px] font-sans">NOT EXCEEDING BDT 50,000,000</span>
          </div>
        </div>

        <div className="mt-4 bg-yellow-500/5 text-yellow-700 border border-yellow-500/20 rounded p-3 text-xs flex gap-2 items-start max-w-[540px]">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Calibration Note:</strong> Ensure that the target printer margins match the coordinate values exactly. Move the sliders to shift fields and prevent overlaps on physical pre-printed cheque leaves.
          </div>
        </div>
      </Card>
    </div>
  );
}

/* =========================================================================
   TAB 3: PRINTING QUEUE
   ========================================================================= */
interface PrintingQueueTabProps {
  printers: PrinterProfile[];
  designs: InstrumentDesign[];
  instructions: PaymentInstruction[];
  preSelectedIds: string[];
  onClearPreSelection: () => void;
  onTriggerUpdate: () => void;
}

function PrintingQueueTab({
  printers,
  designs,
  instructions,
  preSelectedIds,
  onClearPreSelection,
  onTriggerUpdate
}: PrintingQueueTabProps) {
  const [selectedPrinterId, setSelectedPrinterId] = useState(printers[0]?.id || "");
  const [selectedDesignId, setSelectedDesignId] = useState(designs[0]?.id || "");
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  // Sync checkboxes if preselected from Tracker tab
  React.useEffect(() => {
    if (preSelectedIds.length > 0) {
      setCheckedIds(preSelectedIds);
      // Clear parent memory so user can toggle checkboxes freely
      onClearPreSelection();
    }
  }, [preSelectedIds]);

  // Load only pending items for the print selection table
  const pendingInstructions = useMemo(() => {
    return instructions.filter(i => i.status === "Pending");
  }, [instructions]);

  const selectedPrinter = useMemo(() => {
    return printers.find(p => p.id === selectedPrinterId);
  }, [printers, selectedPrinterId]);

  const selectedDesign = useMemo(() => {
    return designs.find(d => d.id === selectedDesignId);
  }, [designs, selectedDesignId]);

  // Simulation states
  const [isPrinting, setIsPrinting] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const handleCheckboxToggle = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter(x => x !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (checkedIds.length === pendingInstructions.length) {
      setCheckedIds([]);
    } else {
      setCheckedIds(pendingInstructions.map(x => x.id));
    }
  };

  const triggerPrintSimulation = () => {
    if (!selectedPrinterId) {
      toast.error("Please select a target printer.");
      return;
    }
    if (!selectedDesignId) {
      toast.error("Please select an instrument design template.");
      return;
    }
    if (checkedIds.length === 0) {
      toast.error("Please select at least one instruction to print.");
      return;
    }
    if (selectedPrinter && selectedPrinter.status === "Offline") {
      toast.error(`Target printer "${selectedPrinter.name}" is Offline. Select a running spooler.`);
      return;
    }

    setIsPrinting(true);
    setPrintProgress(0);
    setLogs([]);

    const printerName = selectedPrinter?.name || "Printer";
    const designName = selectedDesign?.name || "Design";

    const simulationSteps = [
      { p: 5, l: `[INFO] Initializing secure print queue link to printer: ${printerName}...` },
      { p: 15, l: `[INFO] Verifying hardware status. Location: ${selectedPrinter?.locationType || "Local"}${selectedPrinter?.branchName ? ` (${selectedPrinter.branchName} Branch)` : ""}. Status: Online.` },
      { p: 25, l: `[CALIBRATING] Laser alignment margin check using template: "${designName}"...` },
      { p: 35, l: `[CALIBRATING] Coordinate alignment set: Payee(X:${selectedDesign?.payeeX}, Y:${selectedDesign?.payeeY}), Amount(X:${selectedDesign?.amountX}, Y:${selectedDesign?.amountY})` },
      { p: 48, l: `[SECURITY] Accessing protected MICR font cartridge on target printer...` },
      { p: 60, l: `[SECURITY] Commencing security watermark laser etching...` },
      ...checkedIds.flatMap((id, idx) => [
        { p: 65 + idx * 10, l: `[PRINTING] Spooling instrument page ${idx + 1} of ${checkedIds.length} (ID: ${id})` },
        { p: 70 + idx * 10, l: `[PRINTING] Calibrating magnetic check ink fonts for payee: "${instructions.find(x => x.id === id)?.payeeName}"` },
        { p: 75 + idx * 10, l: `[SUCCESS] Output sensor: Instrument ${id} successfully ejected to tray.` }
      ]),
      { p: 100, l: `[SUCCESS] All ${checkedIds.length} physical documents printed successfully. Makers auditing logs recorded.` }
    ];

    let currentStepIdx = 0;
    const runSimulation = () => {
      if (currentStepIdx < simulationSteps.length) {
        const step = simulationSteps[currentStepIdx];
        setPrintProgress(step.p);
        setLogs(prev => [...prev, step.l]);
        currentStepIdx++;
        setTimeout(runSimulation, 600);
      } else {
        // Simulation finished
        setIsPrinting(false);
        // Bulk update printed status in localStorage
        checkedIds.forEach(id => {
          updateInstructionStatus(id, "Printed", printerName, designName);
        });
        toast.success(`Printed ${checkedIds.length} instructions successfully!`);
        setCheckedIds([]);
        onTriggerUpdate();
      }
    };

    setTimeout(runSimulation, 200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Selection & Parameters Panel */}
      <Card className="lg:col-span-7 border border-border">
        <CardHeader className="bg-muted/10 border-b border-border py-3">
          <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Spooler Selections</CardTitle>
          <CardDescription className="text-[10px]">Select pending payment instructions and trigger print runs.</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-4 text-xs text-navy">
          {/* Printer & Template pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="spool-printer">Target Clearing Printer</Label>
              <Select value={selectedPrinterId} onValueChange={setSelectedPrinterId}>
                <SelectTrigger id="spool-printer" className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {printers.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.locationType === "Local" ? "HQ Local" : `${p.branchName} Branch`})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="spool-design">Layout Template</Label>
              <Select value={selectedDesignId} onValueChange={setSelectedDesignId}>
                <SelectTrigger id="spool-design" className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {designs.map(d => (
                    <SelectItem key={d.id} value={d.id}>{d.name} ({d.templateType})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pending table */}
          <div className="space-y-1 pt-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Pending Spooler Items</Label>
            <div className="border border-border rounded-md overflow-hidden bg-white max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader className="bg-muted/30 sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="w-10 text-center">
                      <input
                        type="checkbox"
                        checked={pendingInstructions.length > 0 && checkedIds.length === pendingInstructions.length}
                        onChange={handleSelectAll}
                        className="rounded border-border text-navy"
                      />
                    </TableHead>
                    <TableHead>Instruction ID</TableHead>
                    <TableHead>Payee Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right pr-4">Amount (BDT)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingInstructions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-xs text-muted-foreground py-6 italic">
                        No pending instructions awaiting print queues.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pendingInstructions.map(inst => {
                      const isChecked = checkedIds.includes(inst.id);
                      return (
                        <TableRow key={inst.id} className={isChecked ? "bg-gold/5" : ""}>
                          <TableCell className="text-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleCheckboxToggle(inst.id)}
                              className="rounded border-border text-navy"
                            />
                          </TableCell>
                          <TableCell className="font-mono text-xs font-semibold">{inst.id}</TableCell>
                          <TableCell className="text-xs font-semibold">{inst.payeeName}</TableCell>
                          <TableCell className="text-[10px]">{inst.instrumentType}</TableCell>
                          <TableCell className="text-right font-mono text-xs font-bold text-navy pr-4">
                            {inst.amount.toLocaleString("en-US")}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <Button
            onClick={triggerPrintSimulation}
            disabled={checkedIds.length === 0 || isPrinting}
            className="w-full bg-navy hover:bg-navy/90 text-xs font-semibold py-2.5 h-10 flex gap-2"
          >
            <Printer className="w-4 h-4" /> Trigger Calibration & Print Run ({checkedIds.length} Items)
          </Button>
        </CardContent>
      </Card>

      {/* Terminal logs panel */}
      <Card className="lg:col-span-5 border border-border bg-slate-950 text-white font-mono rounded-lg overflow-hidden flex flex-col h-[480px]">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-gold" /> Spooler Printer Terminal Terminal
          </span>
          <span className="text-[10px]">9600 BAUD</span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-1.5 text-xs text-emerald-400 selection:bg-emerald-800 selection:text-white scrollbar-thin scrollbar-thumb-slate-800">
          {logs.length === 0 ? (
            <div className="text-slate-500 italic py-8 text-center text-[11px]">
              Spooler idle. Select instruments and click "Trigger Spooler" to monitor telemetry output.
            </div>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className="leading-5 animate-fade-in">
                <span className="text-gold mr-1.5">&gt;</span>
                {log}
              </div>
            ))
          )}
        </div>

        {isPrinting && (
          <div className="bg-slate-900 border-t border-slate-800 p-4 space-y-2">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Etching Calibration Progress</span>
              <span>{printProgress}%</span>
            </div>
            <Progress value={printProgress} className="h-1 bg-slate-800 [&>div]:bg-gold" />
          </div>
        )}
      </Card>
    </div>
  );
}
