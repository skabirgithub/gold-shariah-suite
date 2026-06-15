import React, { useState, useMemo, useEffect } from "react";
import {
  Upload, Check, X, FileText, Terminal, Plus, Trash2, Search, Filter,
  ChevronDown, ChevronUp, Loader2, Coins, Download, Smartphone, History,
  FileSpreadsheet, AlertTriangle, CheckCircle2, Clock, ArrowRightLeft, Sparkles, Building2, User
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { OWN_ACCOUNTS, BANGLADESH_BANKS, TRANSFER_PURPOSES } from "@/lib/fundTransfers";
import {
  getBulkTransferBatches,
  saveBulkTransferBatch,
  approveBulkTransferBatch,
  rejectBulkTransferBatch,
  getBulkRechargeBatches,
  saveBulkRechargeBatch,
  getExternalLogs,
  saveExternalLog,
  BulkTransferBatch,
  BulkTransferRow,
  BulkRechargeBatch,
  BulkRechargeRow,
  ExternalUploadLog
} from "@/lib/bulkTransfers";

export function BulkTransferDashboard() {
  const [activeTab, setActiveTab] = useState("transfer-new");

  // Force re-fetch stats when items are modified
  const [updateTick, setUpdateTick] = useState(0);
  const triggerUpdate = () => setUpdateTick(prev => prev + 1);

  // Load datasets
  const transferBatches = useMemo(() => getBulkTransferBatches(), [updateTick]);
  const rechargeBatches = useMemo(() => getBulkRechargeBatches(), [updateTick]);
  const uploadLogs = useMemo(() => getExternalLogs(), [updateTick]);

  // Aggregate stats
  const totalBulkTransferred = useMemo(() => {
    return transferBatches
      .filter(b => b.status === "Completed")
      .reduce((sum, b) => sum + b.totalAmount, 0);
  }, [transferBatches]);

  const pendingBatchesCount = useMemo(() => {
    return transferBatches.filter(b => b.status === "Pending").length +
           rechargeBatches.filter(b => b.status === "Pending").length;
  }, [transferBatches, rechargeBatches]);

  const activeQueuesCount = useMemo(() => {
    return transferBatches.filter(b => b.status === "Processing").length +
           rechargeBatches.filter(b => b.status === "Processing").length;
  }, [transferBatches, rechargeBatches]);

  const totalMobileRecharges = useMemo(() => {
    return rechargeBatches
      .filter(b => b.status === "Completed")
      .reduce((sum, b) => sum + b.totalAmount, 0);
  }, [rechargeBatches]);

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <a href="/app" className="hover:text-navy">Dashboard</a>
        <ChevronDown className="w-3 h-3 -rotate-90" />
        <span className="text-foreground font-semibold">Bulk Transfer</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Bulk Payment & Routing System</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Upload bulk corporate transactions, process mobile airtime disbursements, and parse SWIFT MT101 or ISO 20022 XML messages under secure Maker-Checker workflows.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0">
            <Coins className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Total Transferred</div>
            <div className="font-display text-2xl mt-1 text-navy font-bold">
              BDT {totalBulkTransferred.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Approved bulk batches</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-600 grid place-items-center shrink-0">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Pending Approvals</div>
            <div className="font-display text-2xl mt-1 text-navy font-bold">
              {pendingBatchesCount} Batches
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Awaiting Checker verification</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 text-success grid place-items-center shrink-0">
            <Loader2 className="w-5 h-5 text-success animate-spin" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Active Queues</div>
            <div className="font-display text-2xl mt-1 text-navy font-bold">
              {activeQueuesCount} Processing
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Real-time settlement queues</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Bulk Airtime Sent</div>
            <div className="font-display text-2xl mt-1 text-navy font-bold">
              BDT {totalMobileRecharges.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Mobile recharge disbursements</div>
          </div>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border w-full justify-start p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="transfer-new" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Plus className="w-3.5 h-3.5" /> Bulk Transfer (New)
          </TabsTrigger>
          <TabsTrigger value="transfer-history" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <History className="w-3.5 h-3.5" /> Bulk History
          </TabsTrigger>
          <TabsTrigger value="mobile-recharge" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Smartphone className="w-3.5 h-3.5" /> Bulk Mobile Recharge
          </TabsTrigger>
          <TabsTrigger value="external-resource" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <FileText className="w-3.5 h-3.5" /> External XML / MT101
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: New Bulk Transfer */}
        <TabsContent value="transfer-new">
          <NewBulkTransferForm onSubmitted={() => { triggerUpdate(); setActiveTab("transfer-history"); }} />
        </TabsContent>

        {/* Tab 2: Bulk Transfer History */}
        <TabsContent value="transfer-history">
          <BulkTransferHistory transferBatches={transferBatches} onDataUpdated={triggerUpdate} />
        </TabsContent>

        {/* Tab 3: Bulk Mobile Recharge */}
        <TabsContent value="mobile-recharge">
          <BulkMobileRechargeSection rechargeBatches={rechargeBatches} onSubmitted={triggerUpdate} />
        </TabsContent>

        {/* Tab 4: External Resource Upload & Logs */}
        <TabsContent value="external-resource">
          <ExternalResourceSection uploadLogs={uploadLogs} onSubmitted={triggerUpdate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* =========================================================================
   TAB 1: NEW BULK TRANSFER COMPONENT
   ========================================================================= */
function NewBulkTransferForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [subType, setSubType] = useState<"1-to-Many" | "Within-Bank" | "Other-Bank" | "Many-to-1">("1-to-Many");
  const [sourceAccount, setSourceAccount] = useState(OWN_ACCOUNTS[0].id);
  const [destAccount, setDestAccount] = useState(OWN_ACCOUNTS[1].id); // For Many-to-1
  const [batchTitle, setBatchTitle] = useState("");
  const [purpose, setPurpose] = useState(TRANSFER_PURPOSES[0]);

  // Dynamic Row State
  const [rows, setRows] = useState<any[]>([
    { beneficiaryName: "", beneficiaryAccount: "", beneficiaryBank: "SJIBL", routingNo: "", amount: "", narration: "" }
  ]);

  // Handle row additions / deletions
  const addRow = () => {
    if (subType === "Many-to-1") {
      // For Many-to-1, source accounts are owned accounts
      setRows([...rows, { sourceAccount: OWN_ACCOUNTS[0].id, amount: "", narration: "Consolidation sweep" }]);
    } else {
      setRows([...rows, { beneficiaryName: "", beneficiaryAccount: "", beneficiaryBank: subType === "Within-Bank" ? "SJIBL" : "", routingNo: "", amount: "", narration: "" }]);
    }
  };

  const removeRow = (index: number) => {
    if (rows.length === 1) {
      toast.error("At least one transaction row is required.");
      return;
    }
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, key: string, value: any) => {
    const updated = [...rows];
    updated[index][key] = value;
    setRows(updated);
  };

  // Convert subType reset
  useEffect(() => {
    if (subType === "Many-to-1") {
      setRows([{ sourceAccount: OWN_ACCOUNTS[1].id, amount: "", narration: "Consolidation sweep" }]);
    } else if (subType === "Within-Bank") {
      setRows([{ beneficiaryName: "", beneficiaryAccount: "", beneficiaryBank: "SJIBL", amount: "", narration: "" }]);
    } else {
      setRows([{ beneficiaryName: "", beneficiaryAccount: "", beneficiaryBank: "", routingNo: "", amount: "", narration: "" }]);
    }
  }, [subType]);

  // Totals calculations
  const totalAmount = useMemo(() => {
    return rows.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
  }, [rows]);

  // Download template
  const downloadCSVEmailTemplate = () => {
    let headers = "Beneficiary Name,Account Number,Bank Name,Routing Number,Amount,Narration\n";
    let sample = "Globex Industries,9981200022,Dutch-Bangla Bank,090261139,4500000,Raw materials payment\nKarim Islam,1241000990,SJIBL,,950000,Staff Allowance June\n";
    
    if (subType === "Within-Bank") {
      headers = "Beneficiary Name,Account Number,Amount,Narration\n";
      sample = "SJIBL Employee,0123100002,25000,Bonus payment\nCorporate Partner,0123100003,1500000,Murabaha Settlement\n";
    } else if (subType === "Many-to-1") {
      headers = "Source Account Number,Amount,Narration\n";
      sample = `${OWN_ACCOUNTS[1].id},500000,Internal transfer sweep\n${OWN_ACCOUNTS[2].id},25000,Foreign exchange consolidation\n`;
    }

    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + sample);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `sjibl_bulk_${subType.toLowerCase()}_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Template CSV file downloaded.");
  };

  // CSV File Upload Parsing
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split(/\r?\n/).filter(line => line.trim());
      if (lines.length <= 1) {
        toast.error("CSV file is empty or missing data rows.");
        return;
      }
      
      const parsedRows: any[] = [];
      lines.slice(1).forEach((line) => {
        const cols = line.split(",").map(c => c.trim().replace(/^"|"$/g, ''));
        if (cols.length >= 2) {
          if (subType === "Many-to-1") {
            parsedRows.push({
              sourceAccount: cols[0] || "",
              amount: cols[1] || "",
              narration: cols[2] || "Consolidation sweep"
            });
          } else if (subType === "Within-Bank") {
            parsedRows.push({
              beneficiaryName: cols[0] || "",
              beneficiaryAccount: cols[1] || "",
              beneficiaryBank: "SJIBL",
              amount: cols[2] || "",
              narration: cols[3] || "Bulk Payout"
            });
          } else {
            parsedRows.push({
              beneficiaryName: cols[0] || "",
              beneficiaryAccount: cols[1] || "",
              beneficiaryBank: cols[2] || "",
              routingNo: cols[3] || "",
              amount: cols[4] || "",
              narration: cols[5] || "Bulk Payout"
            });
          }
        }
      });
      if (parsedRows.length > 0) {
        setRows(parsedRows);
        toast.success(`Parsed ${parsedRows.length} rows successfully from CSV.`);
      } else {
        toast.error("Could not parse any rows. Ensure commas match schema.");
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // clear input
  };

  // Validate all records before submission
  const validateForm = () => {
    if (!batchTitle.trim()) {
      toast.error("Please enter a Batch Title for tracking.");
      return false;
    }

    const fromAccObj = OWN_ACCOUNTS.find(a => a.id === sourceAccount);
    if (!fromAccObj && subType !== "Many-to-1") {
      toast.error("Invalid source account.");
      return false;
    }

    // Row-level validations
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const rowNum = i + 1;

      if (subType === "Many-to-1") {
        if (!r.sourceAccount) {
          toast.error(`Row ${rowNum}: Please select a source account.`);
          return false;
        }
        if (r.sourceAccount === destAccount) {
          toast.error(`Row ${rowNum}: Source account must be different from destination account.`);
          return false;
        }
      } else {
        if (!r.beneficiaryName.trim()) {
          toast.error(`Row ${rowNum}: Beneficiary Name is required.`);
          return false;
        }
        if (!r.beneficiaryAccount.trim()) {
          toast.error(`Row ${rowNum}: Account Number is required.`);
          return false;
        }
        if (subType === "Other-Bank" && !r.beneficiaryBank) {
          toast.error(`Row ${rowNum}: Bank Name is required.`);
          return false;
        }
        if (subType === "Other-Bank" && r.routingNo && !/^\d{9}$/.test(r.routingNo)) {
          toast.error(`Row ${rowNum}: Routing number must be exactly 9 numeric digits.`);
          return false;
        }
      }

      const amtVal = parseFloat(r.amount);
      if (isNaN(amtVal) || amtVal <= 0) {
        toast.error(`Row ${rowNum}: Amount must be a positive number.`);
        return false;
      }
    }

    return true;
  };

  // Submit batch
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const handleSubmitClick = () => {
    if (validateForm()) {
      setIsSubmitOpen(true);
    }
  };

  const handleConfirmSubmit = () => {
    const fromAccObj = OWN_ACCOUNTS.find(a => a.id === sourceAccount);
    const destAccObj = OWN_ACCOUNTS.find(a => a.id === destAccount);

    const formattedRows: BulkTransferRow[] = rows.map(r => {
      if (subType === "Many-to-1") {
        const srcObj = OWN_ACCOUNTS.find(a => a.id === r.sourceAccount);
        return {
          beneficiaryName: destAccObj?.label || "Consolidation Dest",
          beneficiaryAccount: destAccount,
          beneficiaryBank: "SJIBL",
          amount: parseFloat(r.amount),
          narration: r.narration || "Consolidation sweep",
          status: "Pending"
        };
      } else {
        return {
          beneficiaryName: r.beneficiaryName,
          beneficiaryAccount: r.beneficiaryAccount,
          beneficiaryBank: r.beneficiaryBank || "SJIBL",
          routingNo: r.routingNo || undefined,
          amount: parseFloat(r.amount),
          narration: r.narration || "Bulk transfer",
          status: "Pending"
        };
      }
    });

    const newBatch: BulkTransferBatch = {
      id: `BULK-FT-${Date.now().toString().slice(-4)}`,
      title: batchTitle,
      date: new Date().toISOString().split("T")[0],
      sourceAccount: subType === "Many-to-1"
        ? `Consolidated A/C: ${destAccObj?.label || destAccount}`
        : (fromAccObj?.label || sourceAccount),
      transferType: subType === "Within-Bank" ? "Within Bank"
                   : subType === "Other-Bank" ? "Other Bank"
                   : subType === "Many-to-1" ? "Many-to-1"
                   : "1-to-Many",
      totalAmount,
      transactionCount: formattedRows.length,
      status: "Pending",
      rows: formattedRows
    };

    saveBulkTransferBatch(newBatch);
    setIsSubmitOpen(false);
    toast.success(`Bulk Batch '${batchTitle}' has been queued for Checker authorization.`);
    onSubmitted();
  };

  return (
    <Card className="border border-border">
      <CardHeader className="border-b border-border pb-4 bg-muted/20">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <CardTitle className="text-navy font-bold text-xl flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-gold" /> Bulk Transfer Entry Screen
            </CardTitle>
            <CardDescription className="text-xs">
              Establish bulk transfer batches. Supports multiple modes of fund routings.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={downloadCSVEmailTemplate} className="text-xs gap-1">
              <Download className="w-3.5 h-3.5" /> Template CSV
            </Button>
            <Label htmlFor="csv-upload" className="cursor-pointer">
              <div className="inline-flex items-center justify-center gap-1.5 rounded-md text-xs font-medium border border-border bg-white hover:bg-muted text-foreground h-9 px-3">
                <Upload className="w-3.5 h-3.5" /> Upload CSV
              </div>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleCSVUpload}
              />
            </Label>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Step 1: Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Bulk Sub-Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={subType === "1-to-Many" ? "default" : "outline"}
                size="sm"
                onClick={() => setSubType("1-to-Many")}
                className="text-xs"
              >
                1-to-Many Payout
              </Button>
              <Button
                variant={subType === "Within-Bank" ? "default" : "outline"}
                size="sm"
                onClick={() => setSubType("Within-Bank")}
                className="text-xs"
              >
                Within Bank
              </Button>
              <Button
                variant={subType === "Other-Bank" ? "default" : "outline"}
                size="sm"
                onClick={() => setSubType("Other-Bank")}
                className="text-xs"
              >
                Other Bank (Interbank)
              </Button>
              <Button
                variant={subType === "Many-to-1" ? "default" : "outline"}
                size="sm"
                onClick={() => setSubType("Many-to-1")}
                className="text-xs"
              >
                Many-to-1 Sweep
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="batch-title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Batch / Payroll Title</Label>
            <Input
              id="batch-title"
              placeholder="e.g. Sales Commission Q2 2026"
              value={batchTitle}
              onChange={(e) => setBatchTitle(e.target.value)}
            />
          </div>

          {subType === "Many-to-1" ? (
            <div className="space-y-2">
              <Label htmlFor="dest-account" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Destination Account (Own)</Label>
              <Select value={destAccount} onValueChange={setDestAccount}>
                <SelectTrigger id="dest-account">
                  <SelectValue placeholder="Select Destination Account" />
                </SelectTrigger>
                <SelectContent>
                  {OWN_ACCOUNTS.map(a => (
                    <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="source-account" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Source Account (Debit)</Label>
              <Select value={sourceAccount} onValueChange={setSourceAccount}>
                <SelectTrigger id="source-account">
                  <SelectValue placeholder="Select Source Account" />
                </SelectTrigger>
                <SelectContent>
                  {OWN_ACCOUNTS.map(a => (
                    <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Step 2: Data Grid */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Transaction Entries ({rows.length})</Label>
            <div className="text-xs text-muted-foreground">
              Accumulated Total: <strong className="text-navy">BDT {totalAmount.toLocaleString()}</strong>
            </div>
          </div>

          <div className="border border-border rounded-md overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-10">Row</TableHead>
                  {subType === "Many-to-1" ? (
                    <>
                      <TableHead>Debit Account (Source)</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Narration</TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead className="min-w-[150px]">Beneficiary Name</TableHead>
                      <TableHead className="min-w-[150px]">Account Number</TableHead>
                      {subType !== "Within-Bank" && <TableHead className="min-w-[150px]">Beneficiary Bank</TableHead>}
                      {subType === "Other-Bank" && <TableHead className="min-w-[120px]">Routing Number (9-digit)</TableHead>}
                      <TableHead className="w-[150px]">Amount (BDT)</TableHead>
                      <TableHead className="min-w-[150px]">Narration</TableHead>
                    </>
                  )}
                  <TableHead className="w-10 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index} className="hover:bg-muted/10">
                    <TableCell className="text-center text-xs font-mono">{index + 1}</TableCell>
                    
                    {subType === "Many-to-1" ? (
                      <>
                        <TableCell>
                          <Select
                            value={row.sourceAccount}
                            onValueChange={(val) => updateRow(index, "sourceAccount", val)}
                          >
                            <SelectTrigger className="h-8 text-xs font-mono">
                              <SelectValue placeholder="Select Source A/C" />
                            </SelectTrigger>
                            <SelectContent>
                              {OWN_ACCOUNTS.map(a => (
                                <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="0.00"
                            type="number"
                            className="h-8 text-xs font-mono"
                            value={row.amount}
                            onChange={(e) => updateRow(index, "amount", e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Narration"
                            className="h-8 text-xs"
                            value={row.narration}
                            onChange={(e) => updateRow(index, "narration", e.target.value)}
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>
                          <Input
                            placeholder="Name"
                            className="h-8 text-xs"
                            value={row.beneficiaryName}
                            onChange={(e) => updateRow(index, "beneficiaryName", e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="A/C Number"
                            className="h-8 text-xs font-mono"
                            value={row.beneficiaryAccount}
                            onChange={(e) => updateRow(index, "beneficiaryAccount", e.target.value)}
                          />
                        </TableCell>
                        {subType !== "Within-Bank" && (
                          <TableCell>
                            {subType === "1-to-Many" ? (
                              <Input
                                placeholder="Bank Name"
                                className="h-8 text-xs"
                                value={row.beneficiaryBank}
                                onChange={(e) => updateRow(index, "beneficiaryBank", e.target.value)}
                              />
                            ) : (
                              <Select
                                value={row.beneficiaryBank}
                                onValueChange={(val) => updateRow(index, "beneficiaryBank", val)}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="Select Bank" />
                                </SelectTrigger>
                                <SelectContent>
                                  {BANGLADESH_BANKS.map(b => (
                                    <SelectItem key={b} value={b}>{b}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </TableCell>
                        )}
                        {subType === "Other-Bank" && (
                          <TableCell>
                            <Input
                              placeholder="9 digits"
                              className="h-8 text-xs font-mono"
                              value={row.routingNo}
                              maxLength={9}
                              onChange={(e) => updateRow(index, "routingNo", e.target.value)}
                            />
                          </TableCell>
                        )}
                        <TableCell>
                          <Input
                            placeholder="Amount"
                            type="number"
                            className="h-8 text-xs font-mono"
                            value={row.amount}
                            onChange={(e) => updateRow(index, "amount", e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="e.g. Salary"
                            className="h-8 text-xs"
                            value={row.narration}
                            onChange={(e) => updateRow(index, "narration", e.target.value)}
                          />
                        </TableCell>
                      </>
                    )}

                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" onClick={() => removeRow(index)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button variant="outline" size="sm" onClick={addRow} className="text-xs">
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Entry Row
            </Button>
            <Button className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs" onClick={handleSubmitClick}>
              Submit Batch for Checker
            </Button>
          </div>
        </div>

        {/* Shariah compliance reminder banner */}
        <Card className="p-4 bg-gold/[0.04] border-gold/20 flex gap-3 items-start">
          <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <strong className="text-navy block">Shariah Regulatory Compliance Check</strong>
            <span className="text-muted-foreground block">
              In alignment with Islamic Banking principles, all bulk financial sweeps or interbank credits require dual maker-checker authorization blocks and strict transaction log compliance. Ribā-oriented transfers are blocked systematically.
            </span>
          </div>
        </Card>
      </CardContent>

      {/* Confirmation Modal */}
      <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Bulk Payment Dispatch</DialogTitle>
            <DialogDescription>
              Double check details before posting to approval queues.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 border-t border-b border-border py-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Batch Name:</span>
              <span className="font-semibold">{batchTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Routing Type:</span>
              <span className="font-semibold">{subType === "Within-Bank" ? "Within Bank Bulk" : subType === "Other-Bank" ? "Other Bank (EFTN/RTGS)" : subType === "Many-to-1" ? "Many-to-1 Sweep" : "1-to-Many Payout"}</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-muted-foreground">Target Transactions:</span>
              <span className="font-semibold">{rows.length} records</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Batch Amount:</span>
              <span className="font-bold text-navy text-base">BDT {totalAmount.toLocaleString()}</span>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsSubmitOpen(false)}>Cancel</Button>
            <Button className="bg-navy text-navy-foreground hover:bg-navy/90" onClick={handleConfirmSubmit}>Confirm & Queue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

/* =========================================================================
   TAB 2: BULK TRANSFER HISTORY & CHECKER SIMULATION
   ========================================================================= */
function BulkTransferHistory({ transferBatches, onDataUpdated }: { transferBatches: BulkTransferBatch[], onDataUpdated: () => void }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Accordion/row expand state
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null);

  // Checker terminal log simulation state
  const [approvingBatchId, setApprovingBatchId] = useState<string | null>(null);
  const [progressVal, setProgressVal] = useState(0);
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [isApproving, setIsApproving] = useState(false);

  // Filter batches
  const filteredBatches = useMemo(() => {
    return transferBatches.filter(b => {
      const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || b.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesType = typeFilter === "all" || b.transferType.toLowerCase() === typeFilter.toLowerCase();
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [transferBatches, search, statusFilter, typeFilter]);

  // Checker Approval process simulation
  const handleApproveBatch = (batchId: string) => {
    const batch = transferBatches.find(b => b.id === batchId);
    if (!batch) return;

    setApprovingBatchId(batchId);
    setIsApproving(true);
    setProgressVal(0);
    setActiveLogs(["[INIT] 10:45:00 - Checking Maker credentials and signature verification..."]);

    // Dynamic step simulator
    const logsSequence = [
      "[INFO] 10:45:01 - Loading bulk transaction database records...",
      `[INFO] 10:45:02 - Processing ${batch.transactionCount} entries for BDT ${batch.totalAmount.toLocaleString()}...`,
      "[SHARIAH] 10:45:03 - Running interest-filtering algorithms on beneficiaries: COMPLIANT",
      "[ROUTING] 10:45:04 - Resolving bank routing numbers and core clearing houses...",
      "[LEDGER] 10:45:05 - Querying core treasury accounts for balance hold: APPROVED",
      "[CLEARING] 10:45:06 - Transmitting bulk instruction blocks to Bangladesh Bank BEFTN/RTGS gateway...",
      "[SUCCESS] 10:45:07 - Core ledger updated. Transaction successfully posted!"
    ];

    let currentProgress = 0;
    let logIndex = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgressVal(100);
        approveBulkTransferBatch(batchId);
        setIsApproving(false);
        setApprovingBatchId(null);
        toast.success(`Batch ${batchId} approved and processed successfully!`);
        onDataUpdated();
      } else {
        setProgressVal(currentProgress);
        if (logIndex < logsSequence.length && currentProgress % 15 === 0) {
          const nextLog = logsSequence[logIndex];
          setActiveLogs(l => [...l, nextLog]);
          logIndex++;
        }
      }
    }, 120);
  };

  const handleRejectBatch = (batchId: string) => {
    const reason = prompt("Please provide a reason for rejecting this bulk transfer batch:");
    if (reason === null) return; // cancelled prompt
    if (!reason.trim()) {
      toast.error("Rejection reason is required.");
      return;
    }
    rejectBulkTransferBatch(batchId, reason);
    toast.warning(`Batch ${batchId} has been rejected.`);
    onDataUpdated();
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      Completed: "bg-success/10 text-success border-success/20",
      Pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      Processing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      Rejected: "bg-destructive/10 text-destructive border-destructive/20"
    };
    return <Badge variant="outline" className={map[status] || ""}>{status}</Badge>;
  };

  // Export batch data
  const downloadBatchLog = (batch: BulkTransferBatch) => {
    let text = `SJIBL CORPORATE TREASURY PORTAL - AUDIT LEDGER\n`;
    text += `=================================================\n`;
    text += `Batch ID: ${batch.id}\n`;
    text += `Batch Title: ${batch.title}\n`;
    text += `Execution Date: ${batch.date}\n`;
    text += `Debit Source Account: ${batch.sourceAccount}\n`;
    text += `Routing Type: ${batch.transferType}\n`;
    text += `Total Value: BDT ${batch.totalAmount.toLocaleString()}\n`;
    text += `Status: ${batch.status}\n`;
    if (batch.remarks) text += `Remarks: ${batch.remarks}\n`;
    text += `=================================================\n\n`;
    text += `Individual Transactions:\n`;
    text += `-------------------------------------------------\n`;
    batch.rows.forEach((r, idx) => {
      text += `${idx + 1}. Beneficiary: ${r.beneficiaryName} | A/C: ${r.beneficiaryAccount} | Bank: ${r.beneficiaryBank} | Amt: BDT ${r.amount.toLocaleString()} | Status: ${r.status}\n`;
    });

    const fileContent = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
    const link = document.createElement("a");
    link.setAttribute("href", fileContent);
    link.setAttribute("download", `sjibl_batch_report_${batch.id}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Audit log downloaded successfully.");
  };

  return (
    <div className="space-y-4">
      {/* Filtering tools */}
      <Card className="p-4 bg-card border border-border">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search batches by ID or Title..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-[150px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-[180px]">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Batch Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="1-to-many">1-to-Many</SelectItem>
                <SelectItem value="within bank">Within Bank</SelectItem>
                <SelectItem value="other bank">Other Bank</SelectItem>
                <SelectItem value="many-to-1">Many-to-1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Batches Table */}
      <Card className="border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Batch ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Batch Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Source Account</TableHead>
              <TableHead className="text-right">Total Amount (BDT)</TableHead>
              <TableHead className="text-center">Records</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBatches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10 text-muted-foreground text-sm">
                  No matching bulk batches found.
                </TableCell>
              </TableRow>
            ) : (
              filteredBatches.map(batch => {
                const isExpanded = expandedBatch === batch.id;
                return (
                  <React.Fragment key={batch.id}>
                    <TableRow className="hover:bg-muted/10 cursor-pointer" onClick={() => setExpandedBatch(isExpanded ? null : batch.id)}>
                      <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setExpandedBatch(isExpanded ? null : batch.id)}>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                      </TableCell>
                      <TableCell className="font-mono text-xs font-semibold text-navy">{batch.id}</TableCell>
                      <TableCell className="text-xs">{batch.date}</TableCell>
                      <TableCell className="font-medium text-sm">{batch.title}</TableCell>
                      <TableCell className="text-xs">
                        <Badge variant="secondary" className="bg-navy/5 text-navy font-semibold">{batch.transferType}</Badge>
                      </TableCell>
                      <TableCell className="text-xs truncate max-w-[180px]" title={batch.sourceAccount}>
                        {batch.sourceAccount}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-sm text-navy">
                        {batch.totalAmount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center text-xs font-mono">{batch.transactionCount}</TableCell>
                      <TableCell className="text-center">{statusBadge(batch.status)}</TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" onClick={() => downloadBatchLog(batch)} className="h-8 gap-1 text-xs">
                          <Download className="w-3.5 h-3.5" /> PDF
                        </Button>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <TableRow className="bg-muted/10 hover:bg-muted/10">
                        <TableCell colSpan={10} className="p-4 border-t border-border">
                          <div className="space-y-4">
                            {batch.remarks && (
                              <div className="bg-destructive/5 text-destructive p-3 rounded-md border border-destructive/20 text-xs flex gap-2 items-center">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <div>
                                  <strong>Checker Rejection Comments:</strong> {batch.remarks}
                                </div>
                              </div>
                            )}

                            {/* Inner transactions list */}
                            <div className="space-y-2">
                              <h4 className="text-xs uppercase font-bold tracking-wider text-navy">Batch Transaction Details</h4>
                              <div className="border border-border rounded-md bg-white overflow-hidden">
                                <Table>
                                  <TableHeader className="bg-muted/40">
                                    <TableRow>
                                      <TableHead className="w-12 text-center">Row</TableHead>
                                      <TableHead>Beneficiary</TableHead>
                                      <TableHead>Account Number</TableHead>
                                      <TableHead>Bank</TableHead>
                                      {batch.transferType === "Other Bank" && <TableHead>Routing No</TableHead>}
                                      <TableHead className="text-right">Amount (BDT)</TableHead>
                                      <TableHead>Narration</TableHead>
                                      <TableHead className="text-center">Status</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {batch.rows.map((row, idx) => (
                                      <TableRow key={idx} className="hover:bg-muted/5">
                                        <TableCell className="text-center text-xs font-mono">{idx + 1}</TableCell>
                                        <TableCell className="text-sm font-semibold">{row.beneficiaryName}</TableCell>
                                        <TableCell className="font-mono text-xs">{row.beneficiaryAccount}</TableCell>
                                        <TableCell className="text-xs">{row.beneficiaryBank}</TableCell>
                                        {batch.transferType === "Other Bank" && <TableCell className="font-mono text-xs">{row.routingNo || "—"}</TableCell>}
                                        <TableCell className="text-right font-mono font-bold text-navy text-xs">{row.amount.toLocaleString()}</TableCell>
                                        <TableCell className="text-xs text-muted-foreground">{row.narration}</TableCell>
                                        <TableCell className="text-center">
                                          <Badge variant="outline" className={`text-[10px] ${
                                            row.status === "Completed" ? "text-success border-success bg-success/5" :
                                            row.status === "Pending" ? "text-yellow-600 border-yellow-500 bg-yellow-500/5" :
                                            "text-destructive border-destructive bg-destructive/5"
                                          }`}>
                                            {row.status}
                                          </Badge>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>

                            {/* Checker Action Panel */}
                            {batch.status === "Pending" && (
                              <div className="flex gap-2 justify-end border-t border-border pt-4">
                                <Button variant="outline" size="sm" onClick={() => handleRejectBatch(batch.id)} className="text-destructive hover:bg-destructive/10 text-xs">
                                  Reject Batch
                                </Button>
                                <Button className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs" size="sm" onClick={() => handleApproveBatch(batch.id)}>
                                  Authorize & Process (Checker)
                                </Button>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Interactive Terminal modal during approval */}
      <Dialog open={isApproving} onOpenChange={setIsApproving}>
        <DialogContent className="max-w-xl bg-slate-950 text-emerald-400 border border-emerald-900 font-mono">
          <DialogHeader>
            <DialogTitle className="text-emerald-500 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-500" /> Transaction Execution Terminal
            </DialogTitle>
            <DialogDescription className="text-emerald-700">
              Processing batch payload transfers. Please wait while nodes synchronize.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="h-64 overflow-y-auto bg-black border border-emerald-950 rounded p-4 text-xs space-y-1.5 scrollbar-thin">
              {activeLogs.map((log, idx) => (
                <div key={idx} className={log.includes("[SUCCESS]") ? "text-success" : log.includes("[SHARIAH]") ? "text-amber-400" : ""}>
                  {log}
                </div>
              ))}
              <div className="animate-pulse inline-block w-2 h-4 bg-emerald-400 ml-1" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-emerald-600">
                <span>Core Settlement Routing: BEFTN/RTGS</span>
                <span>{progressVal}%</span>
              </div>
              <Progress value={progressVal} className="h-1 bg-emerald-950 [&>div]:bg-emerald-500" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* =========================================================================
   TAB 3: BULK MOBILE RECHARGE COMPONENT
   ========================================================================= */
function BulkMobileRechargeSection({ rechargeBatches, onSubmitted }: { rechargeBatches: BulkRechargeBatch[], onSubmitted: () => void }) {
  const [subTab, setSubTab] = useState<"new" | "history">("new");
  const [sourceAccount, setSourceAccount] = useState(OWN_ACCOUNTS[0].id);
  const [batchTitle, setBatchTitle] = useState(`Bulk Mobile Recharge ${new Date().toLocaleDateString()}`);

  const [expandedRecharge, setExpandedRecharge] = useState<string | null>(null);

  // Recharge inputs state
  const [rows, setRows] = useState<any[]>([
    { mobileNo: "", operator: "Grameenphone", connectionType: "Prepaid", amount: "" }
  ]);

  const addRow = () => {
    setRows([...rows, { mobileNo: "", operator: "Grameenphone", connectionType: "Prepaid", amount: "" }]);
  };

  const removeRow = (index: number) => {
    if (rows.length === 1) {
      toast.error("At least one entry row is required.");
      return;
    }
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, key: string, value: any) => {
    const updated = [...rows];
    updated[index][key] = value;
    
    // Auto-detect BD operators from prefix
    if (key === "mobileNo" && value.length >= 3) {
      const prefix = value.slice(0, 3);
      if (prefix === "017" || prefix === "013") updated[index]["operator"] = "Grameenphone";
      else if (prefix === "018") updated[index]["operator"] = "Robi";
      else if (prefix === "016") updated[index]["operator"] = "Airtel";
      else if (prefix === "019" || prefix === "014") updated[index]["operator"] = "Banglalink";
      else if (prefix === "015") updated[index]["operator"] = "Teletalk";
    }

    setRows(updated);
  };

  const totalAmount = useMemo(() => {
    return rows.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
  }, [rows]);

  const downloadRechargeTemplate = () => {
    const headers = "Mobile Number,Operator,Type,Amount\n";
    const sample = "01711223344,Grameenphone,Prepaid,500\n01811223344,Robi,Postpaid,1000\n";
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + sample);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "sjibl_bulk_recharge_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Mobile template CSV downloaded.");
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split(/\r?\n/).filter(line => line.trim());
      if (lines.length <= 1) {
        toast.error("CSV is empty.");
        return;
      }
      
      const parsedRows: any[] = [];
      lines.slice(1).forEach((line) => {
        const cols = line.split(",").map(c => c.trim().replace(/^"|"$/g, ''));
        if (cols.length >= 2) {
          parsedRows.push({
            mobileNo: cols[0] || "",
            operator: cols[1] || "Grameenphone",
            connectionType: cols[2] || "Prepaid",
            amount: cols[3] || ""
          });
        }
      });
      if (parsedRows.length > 0) {
        setRows(parsedRows);
        toast.success(`Successfully parsed ${parsedRows.length} phone lines.`);
      } else {
        toast.error("Failed to parse file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Submit recharge
  const handleRechargeSubmit = () => {
    // Validate
    if (!batchTitle.trim()) {
      toast.error("Please provide a batch title.");
      return;
    }
    
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const rowNum = i + 1;
      
      if (!/^\d{11}$/.test(r.mobileNo) || !r.mobileNo.startsWith("01")) {
        toast.error(`Row ${rowNum}: Mobile number must be exactly 11 digits and start with 01.`);
        return;
      }
      
      const amtVal = parseFloat(r.amount);
      if (isNaN(amtVal) || amtVal < 10 || amtVal > 5000) {
        toast.error(`Row ${rowNum}: Recharge amount must be between BDT 10 and BDT 5,000.`);
        return;
      }
    }

    const fromAccObj = OWN_ACCOUNTS.find(a => a.id === sourceAccount);
    const newBatch: BulkRechargeBatch = {
      id: `RECH-${Date.now().toString().slice(-4)}`,
      title: batchTitle,
      date: new Date().toISOString().split("T")[0],
      sourceAccount: fromAccObj?.label || sourceAccount,
      totalAmount,
      mobileCount: rows.length,
      status: "Pending",
      rows: rows.map(r => ({
        mobileNo: r.mobileNo,
        operator: r.operator,
        connectionType: r.connectionType as "Prepaid" | "Postpaid",
        amount: parseFloat(r.amount),
        status: "Pending"
      }))
    };

    saveBulkRechargeBatch(newBatch);
    toast.success("Bulk recharge batch submitted for authorization.");
    
    // Clear form
    setRows([{ mobileNo: "", operator: "Grameenphone", connectionType: "Prepaid", amount: "" }]);
    onSubmitted();
    setSubTab("history");
  };

  // Approval simulation recharge
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const handleApproveRecharge = (batchId: string) => {
    setApprovingId(batchId);
    toast.info("Activating GSM gateway interface nodes...");
    
    setTimeout(() => {
      const batches = getBulkRechargeBatches();
      const idx = batches.findIndex(b => b.id === batchId);
      if (idx !== -1) {
        batches[idx].status = "Completed";
        batches[idx].rows = batches[idx].rows.map(r => ({ ...r, status: "Completed" }));
        localStorage.setItem("sjibl.bulk.recharges", JSON.stringify(batches));
      }
      setApprovingId(null);
      toast.success("Airtime packages credited successfully via Flexiload/Top-up gateway!");
      onSubmitted();
    }, 2000);
  };

  return (
    <Card className="border border-border">
      <CardHeader className="bg-muted/15 border-b border-border pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-navy font-bold text-lg flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-gold" /> Bulk Mobile Recharge Utility
          </CardTitle>
          <CardDescription className="text-xs">
            Send corporate airtime balances to staff members instantly.
          </CardDescription>
        </div>
        <div className="flex gap-1">
          <Button variant={subTab === "new" ? "default" : "ghost"} size="sm" onClick={() => setSubTab("new")} className="text-xs">
            New Top-up
          </Button>
          <Button variant={subTab === "history" ? "default" : "ghost"} size="sm" onClick={() => setSubTab("history")} className="text-xs">
            History Ledger
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {subTab === "new" ? (
          <div className="space-y-6">
            {/* Form configuration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="source-acc-rech" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Debit Account</Label>
                <Select value={sourceAccount} onValueChange={setSourceAccount}>
                  <SelectTrigger id="source-acc-rech">
                    <SelectValue placeholder="Select Account" />
                  </SelectTrigger>
                  <SelectContent>
                    {OWN_ACCOUNTS.map(a => (
                      <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 col-span-2 flex flex-col justify-end">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="rech-title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recharge Batch Title</Label>
                  <div className="flex gap-2">
                    <Button variant="link" size="sm" onClick={downloadRechargeTemplate} className="h-auto p-0 text-gold text-xs gap-1">
                      <Download className="w-3 h-3" /> Template CSV
                    </Button>
                    <Label htmlFor="csv-recharge-upload" className="cursor-pointer text-gold hover:underline text-xs flex items-center gap-1 font-semibold">
                      <Upload className="w-3 h-3" /> Import CSV
                    </Label>
                    <input
                      id="csv-recharge-upload"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleCSVUpload}
                    />
                  </div>
                </div>
                <Input
                  id="rech-title"
                  placeholder="Sales Agents June Top-Up"
                  value={batchTitle}
                  onChange={(e) => setBatchTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Input list grid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-muted-foreground uppercase tracking-wider">Numbers Grid ({rows.length})</span>
                <span className="text-muted-foreground">Accumulated Sum: <strong className="text-navy">BDT {totalAmount.toLocaleString()}</strong></span>
              </div>

              <div className="border border-border rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="w-12 text-center">Row</TableHead>
                      <TableHead>Mobile Number (11-digit)</TableHead>
                      <TableHead>GSM Network Operator</TableHead>
                      <TableHead>Subscription Type</TableHead>
                      <TableHead className="w-[180px]">Recharge Amount (BDT)</TableHead>
                      <TableHead className="w-12 text-center">Delete</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-center font-mono text-xs">{idx + 1}</TableCell>
                        <TableCell>
                          <Input
                            placeholder="017xxxxxxxx"
                            className="h-8 font-mono text-xs"
                            value={row.mobileNo}
                            maxLength={11}
                            onChange={(e) => updateRow(idx, "mobileNo", e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={row.operator}
                            onValueChange={(val) => updateRow(idx, "operator", val)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="Select Operator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Grameenphone">Grameenphone</SelectItem>
                              <SelectItem value="Robi">Robi</SelectItem>
                              <SelectItem value="Airtel">Airtel</SelectItem>
                              <SelectItem value="Banglalink">Banglalink</SelectItem>
                              <SelectItem value="Teletalk">Teletalk</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={row.connectionType}
                            onValueChange={(val) => updateRow(idx, "connectionType", val)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Prepaid">Prepaid (Flexiload)</SelectItem>
                              <SelectItem value="Postpaid">Postpaid (Billpay)</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Amount (10 - 5000)"
                            type="number"
                            className="h-8 font-mono text-xs"
                            value={row.amount}
                            onChange={(e) => updateRow(idx, "amount", e.target.value)}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" onClick={() => removeRow(idx)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button variant="outline" size="sm" onClick={addRow} className="text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Number
                </Button>
                <Button className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs" onClick={handleRechargeSubmit}>
                  Authorize Recharge Batch
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Batch ID</TableHead>
                  <TableHead>Execution Date</TableHead>
                  <TableHead>Batch Title</TableHead>
                  <TableHead>Debit Account</TableHead>
                  <TableHead className="text-right">Total Amount (BDT)</TableHead>
                  <TableHead className="text-center">Phone Count</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Authorize</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rechargeBatches.map(batch => {
                  const isExpanded = expandedRecharge === batch.id;
                  const isPending = batch.status === "Pending";
                  
                  return (
                    <React.Fragment key={batch.id}>
                      <TableRow className="hover:bg-muted/10 cursor-pointer" onClick={() => setExpandedRecharge(isExpanded ? null : batch.id)}>
                        <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setExpandedRecharge(isExpanded ? null : batch.id)}>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                        </TableCell>
                        <TableCell className="font-mono text-xs font-semibold text-navy">{batch.id}</TableCell>
                        <TableCell className="text-xs">{batch.date}</TableCell>
                        <TableCell className="font-semibold text-sm">{batch.title}</TableCell>
                        <TableCell className="text-xs truncate max-w-[150px]">{batch.sourceAccount}</TableCell>
                        <TableCell className="text-right font-mono font-bold text-navy">{batch.totalAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-center font-mono text-xs">{batch.mobileCount}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={
                            batch.status === "Completed" ? "bg-success/15 text-success border-success/30" : "bg-yellow-500/15 text-yellow-600 border-yellow-500/30"
                          }>
                            {batch.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          {isPending ? (
                            <Button
                              className="bg-navy text-navy-foreground hover:bg-navy/80 h-7 text-[10px] gap-1 px-2.5"
                              onClick={() => handleApproveRecharge(batch.id)}
                              disabled={approvingId !== null}
                            >
                              {approvingId === batch.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )}
                              Approve
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-success" /> Active
                            </span>
                          )}
                        </TableCell>
                      </TableRow>

                      {isExpanded && (
                        <TableRow className="bg-muted/5 hover:bg-muted/5">
                          <TableCell colSpan={9} className="p-4 border-t">
                            <div className="space-y-2">
                              <h4 className="text-xs uppercase font-bold text-navy">Recharge Target Details</h4>
                              <div className="border border-border bg-white rounded-md overflow-hidden">
                                <Table>
                                  <TableHeader className="bg-muted/30">
                                    <TableRow>
                                      <TableHead className="w-12 text-center">Row</TableHead>
                                      <TableHead>Mobile Number</TableHead>
                                      <TableHead>Operator</TableHead>
                                      <TableHead>Type</TableHead>
                                      <TableHead className="text-right">Amount (BDT)</TableHead>
                                      <TableHead className="text-center">Status</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {batch.rows.map((row, rIdx) => (
                                      <TableRow key={rIdx}>
                                        <TableCell className="text-center font-mono text-xs">{rIdx + 1}</TableCell>
                                        <TableCell className="font-mono text-xs font-semibold">{row.mobileNo}</TableCell>
                                        <TableCell className="text-xs">{row.operator}</TableCell>
                                        <TableCell className="text-xs">{row.connectionType}</TableCell>
                                        <TableCell className="text-right font-mono text-navy font-bold text-xs">{row.amount.toLocaleString()}</TableCell>
                                        <TableCell className="text-center">
                                          <Badge variant="outline" className={`text-[10px] ${
                                            row.status === "Completed" ? "text-success border-success bg-success/5" : "text-yellow-600 border-yellow-500 bg-yellow-500/5"
                                          }`}>
                                            {row.status}
                                          </Badge>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* =========================================================================
   TAB 4: EXTERNAL RESOURCES (ISO 20022 XML / MT101 PARSER)
   ========================================================================= */
function ExternalResourceSection({ uploadLogs, onSubmitted }: { uploadLogs: ExternalUploadLog[], onSubmitted: () => void }) {
  const [fileType, setFileType] = useState<"ISO 20022" | "SWIFT MT101" | "XML Bulk" | "CSV File">("ISO 20022");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Terminal simulated logs state
  const [isParsing, setIsParsing] = useState(false);
  const [termProgress, setTermProgress] = useState(0);
  const [termLogs, setTermLogs] = useState<string[]>([]);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [viewingLogRecord, setViewingLogRecord] = useState<ExternalUploadLog | null>(null);

  // Handle Drag Events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      toast.success(`Loaded file: ${e.dataTransfer.files[0].name}`);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success(`Loaded file: ${e.target.files[0].name}`);
    }
  };

  // Run File Parser Simulation
  const handleStartParsing = () => {
    if (!selectedFile) {
      toast.error("Please load or drop a file before parsing.");
      return;
    }

    setIsParsing(true);
    setTermProgress(0);
    setTermLogs([`[INFO] 11:32:00 - Initializing file upload handler for '${selectedFile.name}' (${Math.round(selectedFile.size / 1024)} KB)...`]);

    const isoLogsSequence = [
      `[INFO] 11:32:01 - Processing ISO 20022 pain.001.001.08 XML namespace parser...`,
      `[SCHEMA] 11:32:02 - Mapping tags <GrpHdr>, <PmtInf>, <CdtTrfTxInf>...`,
      `[SHARIAH] 11:32:03 - Querying Shariah compliance directory services for beneficiaries...`,
      `[SHARIAH] 11:32:03 - Filter output: 100% compliant. No prohibited transaction matches.`,
      `[VALIDATION] 11:32:04 - Comparing batch sum with source balance ledger limits: HOLD SUCCESS`,
      `[VALIDATION] 11:32:05 - Validating routing codes for EFTN/RTGS routes...`,
      `[SUCCESS] 11:32:06 - Signature validated. Created Batch BULK-XML-${Date.now().toString().slice(-4)}`
    ];

    const swiftLogsSequence = [
      `[INFO] 11:32:01 - Loading SWIFT message MT101 structural segments...`,
      `[PARSE] 11:32:02 - Extracted tag :20: Ref: ${Date.now().toString().slice(-6)}`,
      `[PARSE] 11:32:03 - Extracted tag :32B: Amount Currency (BDT)`,
      `[SHARIAH] 11:32:04 - Scanning routing lines for Shariah compliance blocks...`,
      `[VALIDATION] 11:32:05 - Checksum control matches payload block length: SUCCESS`,
      `[SUCCESS] 11:32:06 - Transmitting parsed records into Checker authorization queue.`
    ];

    const sequence = fileType === "ISO 20022" ? isoLogsSequence : swiftLogsSequence;
    let currentProgress = 0;
    let logIdx = 0;

    const interval = setInterval(() => {
      currentProgress += 5;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTermProgress(100);
        
        // Complete Simulation, Save Log
        const recordCount = Math.floor(5 + Math.random() * 120);
        const totalAmount = recordCount * 125000;
        const newLog: ExternalUploadLog = {
          id: `LOG-${Date.now().toString().slice(-4)}`,
          fileName: selectedFile.name,
          fileType: fileType,
          uploadedAt: new Date().toISOString().replace("T", " ").slice(0, 19),
          uploadedBy: "maker_user_sjibl",
          recordCount,
          totalAmount,
          status: "Success",
          logs: [...termLogs, ...sequence, "[LEDGER] 11:32:07 - Saved upload log records successfully."]
        };

        // Save batch record to history too as Pending
        const newBatch: BulkTransferBatch = {
          id: `BULK-EXT-${Date.now().toString().slice(-4)}`,
          title: `Parsed File: ${selectedFile.name}`,
          date: new Date().toISOString().split("T")[0],
          sourceAccount: OWN_ACCOUNTS[0].label,
          transferType: fileType === "SWIFT MT101" ? "Other Bank" : "1-to-Many",
          totalAmount,
          transactionCount: recordCount,
          status: "Pending",
          rows: Array.from({ length: recordCount }).map((_, i) => ({
            beneficiaryName: `External Beneficiary ${i + 1}`,
            beneficiaryAccount: `99880011${Math.floor(10 + Math.random() * 90)}`,
            beneficiaryBank: "Dutch-Bangla Bank",
            routingNo: "090261139",
            amount: 125000,
            narration: "External system dispatch",
            status: "Pending"
          }))
        };

        saveExternalLog(newLog);
        saveBulkTransferBatch(newBatch);
        
        setIsParsing(false);
        setSelectedFile(null);
        toast.success("File parsed successfully! A pending bulk transfer batch has been created in history.");
        onSubmitted();
      } else {
        setTermProgress(currentProgress);
        if (logIdx < sequence.length && currentProgress % 15 === 0) {
          const nextLog = sequence[logIdx];
          setTermLogs(l => [...l, nextLog]);
          logIdx++;
        }
      }
    }, 120);
  };

  const handleViewLogDetails = (log: ExternalUploadLog) => {
    setViewingLogRecord(log);
    setLogModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Upload Zone */}
      <Card className="lg:col-span-1 border border-border h-fit">
        <CardHeader className="bg-muted/15 border-b border-border pb-3">
          <CardTitle className="text-navy font-bold text-lg flex items-center gap-2">
            <Upload className="w-5 h-5 text-gold" /> File Upload Interface
          </CardTitle>
          <CardDescription className="text-xs">
            Ingest financial message files directly.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ext-type" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Standard Format</Label>
            <Select value={fileType} onValueChange={(val: any) => setFileType(val)}>
              <SelectTrigger id="ext-type">
                <SelectValue placeholder="Select Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ISO 20022">ISO 20022 XML (pain.001)</SelectItem>
                <SelectItem value="SWIFT MT101">SWIFT MT101 Request for Transfer</SelectItem>
                <SelectItem value="XML Bulk">XML Bulk Clearing Schema</SelectItem>
                <SelectItem value="CSV File">CSV Spreadsheet Upload</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Drag and drop panel */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
              dragActive ? "border-gold bg-gold/[0.03]" : "border-border hover:border-gold hover:bg-muted/20"
            }`}
          >
            <input
              type="file"
              id="file-select-input"
              className="hidden"
              onChange={handleFileSelect}
              accept={fileType === "ISO 20022" || fileType === "XML Bulk" ? ".xml" : fileType === "CSV File" ? ".csv" : ".txt,.swift"}
            />
            <Label htmlFor="file-select-input" className="cursor-pointer space-y-2 block">
              <Upload className="w-8 h-8 text-gold mx-auto" />
              <div className="text-sm font-semibold text-navy">
                {selectedFile ? selectedFile.name : "Drag & Drop files here"}
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedFile ? `${Math.round(selectedFile.size / 1024)} KB` : "or click here to browse local machine"}
              </p>
            </Label>
          </div>

          <Button
            className="w-full bg-navy text-navy-foreground hover:bg-navy/90 text-xs"
            onClick={handleStartParsing}
            disabled={isParsing || !selectedFile}
          >
            {isParsing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing Message...
              </>
            ) : (
              "Parse & Submit Batch"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Terminal View or Upload Log list */}
      <div className="lg:col-span-2 space-y-6">
        {isParsing ? (
          <Card className="bg-slate-950 border border-emerald-950 text-emerald-400 font-mono p-5 h-[360px] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-emerald-950 pb-2 text-[10px] text-emerald-600">
              <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5 animate-pulse" /> MESSAGE GATEWAY NODE PARSER</span>
              <span>PROGRESS: {termProgress}%</span>
            </div>
            <div className="flex-1 overflow-y-auto py-4 text-xs space-y-1 scrollbar-thin">
              {termLogs.map((log, idx) => (
                <div key={idx} className={log.includes("[SUCCESS]") ? "text-success" : log.includes("[SHARIAH]") ? "text-amber-400" : ""}>
                  {log}
                </div>
              ))}
              <div className="animate-pulse inline-block w-2 h-4 bg-emerald-400 ml-1" />
            </div>
            <Progress value={termProgress} className="h-1 bg-emerald-950 [&>div]:bg-emerald-500" />
          </Card>
        ) : (
          <Card className="border border-border">
            <CardHeader className="bg-muted/15 border-b border-border pb-3">
              <CardTitle className="text-navy font-bold text-lg">External Upload Log Ledger</CardTitle>
              <CardDescription className="text-xs">
                Review previous XML / MT101 messages validation log history.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">Log ID</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Uploaded At</TableHead>
                    <TableHead className="text-right">Extracted Sum</TableHead>
                    <TableHead className="text-center">Count</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right pr-4">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadLogs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell className="pl-4 font-mono text-xs font-semibold text-navy">{log.id}</TableCell>
                      <TableCell className="text-sm font-semibold max-w-[150px] truncate" title={log.fileName}>{log.fileName}</TableCell>
                      <TableCell className="text-xs">
                        <Badge variant="outline" className="bg-navy/5 text-navy">{log.fileType}</Badge>
                      </TableCell>
                      <TableCell className="text-xs font-mono">{log.uploadedAt}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-xs text-navy">
                        {log.totalAmount > 0 ? `BDT ${log.totalAmount.toLocaleString()}` : "—"}
                      </TableCell>
                      <TableCell className="text-center font-mono text-xs">{log.recordCount}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={
                          log.status === "Success" ? "bg-success/15 text-success border-success/30" : "bg-destructive/15 text-destructive border-destructive/30"
                        } variant="outline">
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-4">
                        <Button variant="ghost" size="sm" onClick={() => handleViewLogDetails(log)} className="h-8 text-xs">
                          Logs
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Log Details Modal */}
      <Dialog open={logModalOpen} onOpenChange={setLogModalOpen}>
        <DialogContent className="max-w-xl bg-slate-950 border border-emerald-950 text-emerald-400 font-mono">
          <DialogHeader>
            <DialogTitle className="text-emerald-500 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-500" /> Upload Audit Log: {viewingLogRecord?.fileName}
            </DialogTitle>
            <DialogDescription className="text-emerald-700">
              System output logs captured during compiler mapping.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="h-80 overflow-y-auto bg-black border border-emerald-950 rounded p-4 text-xs space-y-1.5 scrollbar-thin">
              {viewingLogRecord?.logs.map((logLine, idx) => (
                <div key={idx} className={logLine.includes("ERROR") || logLine.includes("Error") ? "text-destructive" : logLine.includes("SUCCESS") ? "text-success" : logLine.includes("SHARIAH") ? "text-amber-400" : ""}>
                  {logLine}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-emerald-800 text-emerald-500 hover:bg-emerald-950/30" onClick={() => setLogModalOpen(false)}>Close Log View</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
