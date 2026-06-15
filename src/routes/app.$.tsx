import { createFileRoute, Link, notFound, useParams, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getModule, MODULES } from "@/lib/modules";
import { getSchema } from "@/lib/moduleSchema";
import { list, get, update, remove } from "@/lib/moduleStore";
import { ModuleForm } from "@/components/module/ModuleForm";
import { ModuleDetail } from "@/components/module/ModuleDetail";
import { BulkTransferDashboard } from "@/components/module/BulkTransferDashboard";
import { CashManagementDashboard } from "@/components/module/CashManagementDashboard";
import { InvoiceDashboard } from "@/components/module/InvoiceDashboard";
import { PaymentInstructionDashboard } from "@/components/module/PaymentInstructionDashboard";
import { CreditCardDashboard } from "@/components/module/CreditCardDashboard";
import { ServiceRequestDashboard } from "@/components/module/ServiceRequestDashboard";
import { CorporateAdminDashboard } from "@/components/module/CorporateAdminDashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Download, Filter, Plus, FileText, Sparkles, ChevronRight, Eye, Pencil, Trash2, CheckSquare, UserPlus,
  ArrowLeft, ArrowDownLeft, ArrowUpRight, CheckCircle2, Info, Coins, Wallet, DollarSign, Calendar, Search, FileSpreadsheet,
  Upload, Check, X, Send, Clock, RefreshCw, Building2, Smartphone, ArrowRightLeft, History, AlarmClock,
  Zap, Phone, CreditCard, Receipt, Wifi, Lightbulb, Globe, ChevronLeft
} from "lucide-react";
import { getTransactionsForAccount, type Transaction } from "@/lib/accounts";
import { getInvestmentTransactions, type InvestmentTransaction } from "@/lib/investments";
import { getTDTransactions, getProfitSchedule, type TDTransaction } from "@/lib/termDeposits";
import { getFundTransferHistory, type FundTransferRecord, OWN_ACCOUNTS, BANGLADESH_BANKS, TRANSFER_PURPOSES } from "@/lib/fundTransfers";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { getSession } from "@/lib/session";

export const Route = createFileRoute("/app/$")({
  component: ModuleRouter,
  notFoundComponent: () => (
    <Card className="p-8 text-center">
      <h2 className="font-display text-xl">Module not found</h2>
      <p className="text-sm text-muted-foreground mt-2">The page you requested doesn't exist.</p>
      <Button asChild className="mt-4"><Link to="/app">Back to dashboard</Link></Button>
    </Card>
  ),
  loader: ({ params }) => {
    const slug = (params._splat || "").split("/")[0];
    if (!getModule(slug)) throw notFound();
    return null;
  },
});

function ModuleRouter() {
  const params = useParams({ from: "/app/$" });
  const segments = (params._splat || "").split("/").filter(Boolean);
  const [slug, action, id] = segments;
  const mod = getModule(slug)!;
  const schema = getSchema(slug);

  if (slug === "approval") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return <RecordMissing slug={slug} />;
      return <ApprovalDetailView record={record} />;
    }
    if (!action) {
      return <ApprovalDashboardView />;
    }
  }

  if (slug === "term-deposit") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return <RecordMissing slug={slug} />;
      return <TermDepositStatementView record={record} />;
    }
    if (!action) {
      return <TermDepositDashboardView />;
    }
  }

  if (slug === "fund-transfer") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return <RecordMissing slug={slug} />;
      return <FundTransferDetailView record={record} />;
    }
    if (action === "new") {
      const subType = id || "own";
      return <FundTransferFormView transferType={subType} />;
    }
    if (!action) {
      return <FundTransferDashboardView />;
    }
  }

  if (slug === "accounts") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return <RecordMissing slug={slug} />;
      return <AccountStatementView record={record} />;
    }
    if (!action) {
      return <AccountDashboardView />;
    }
  }

  if (slug === "investment") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return <RecordMissing slug={slug} />;
      return <InvestmentFacilityView record={record} />;
    }
    if (!action) {
      return <InvestmentDashboardView />;
    }
  }

  if (slug === "beneficiary") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return <RecordMissing slug={slug} />;
      return <BeneficiaryDetailView record={record} />;
    }
    if (!action) {
      return <BeneficiaryDashboardView />;
    }
  }

  if (slug === "bill-pay") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return <RecordMissing slug={slug} />;
      return <BillPayDetailView record={record} />;
    }
    if (action === "new") {
      const subType = id || "utility";
      return <BillPayFormView billType={subType} />;
    }
    if (!action) {
      return <BillPayDashboardView />;
    }
  }

  if (slug === "import-lc") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return <RecordMissing slug={slug} />;
      return <ImportLCDetailView record={record} />;
    }
    if (!action) {
      return <ImportLCDashboardView />;
    }
  }

  if (slug === "import-bill") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return <RecordMissing slug={slug} />;
      return <ImportBillDetailView record={record} />;
    }
    if (!action) {
      return <ImportBillDashboardView />;
    }
  }

  if (slug === "export-lc") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return <RecordMissing slug={slug} />;
      return <ExportLCDetailView record={record} />;
    }
    if (!action) {
      return <ExportLCDashboardView />;
    }
  }

  if (slug === "export-bill") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return <RecordMissing slug={slug} />;
      return <ExportBillDetailView record={record} />;
    }
    if (!action) {
      return <ExportBillDashboardView />;
    }
  }

  if (slug === "bulk-transfer") {
    if (!action) {
      return <BulkTransferDashboard />;
    }
  }

  if (slug === "cash-management") {
    if (!action) {
      return <CashManagementDashboard />;
    }
  }

  if (slug === "invoice") {
    if (!action) {
      return <InvoiceDashboard />;
    }
  }

  if (slug === "payment-instruction") {
    if (!action) {
      return <PaymentInstructionDashboard />;
    }
  }

  if (slug === "credit-card") {
    if (!action) {
      return <CreditCardDashboard />;
    }
  }

  if (slug === "service-request") {
    if (!action) {
      return <ServiceRequestDashboard />;
    }
  }

  if (slug === "corporate-admin") {
    if (!action) {
      return <CorporateAdminDashboard />;
    }
  }

  if (action === "new") {
    return <ModuleForm mod={mod} schema={schema} mode="create" />;
  }
  if (action === "view" && id) {
    const record = get(slug, id);
    if (!record) return <RecordMissing slug={slug} />;
    return <ModuleDetail mod={mod} schema={schema} record={record} />;
  }
  if (action === "edit" && id) {
    const record = get(slug, id);
    if (!record) return <RecordMissing slug={slug} />;
    return <ModuleForm mod={mod} schema={schema} mode="edit" recordId={id} initial={record} />;
  }
  return <ModuleListPage />;
}

function RecordMissing({ slug }: { slug: string }) {
  return (
    <Card className="p-8 text-center">
      <h2 className="font-display text-xl">Record not found</h2>
      <p className="text-sm text-muted-foreground mt-2">It may have been deleted or moved.</p>
      <Button asChild className="mt-4"><Link to="/app/$" params={{ _splat: slug }}>Back to list</Link></Button>
    </Card>
  );
}

function statusBadge(s: string) {
  const map: Record<string, string> = {
    Approved: "border-success text-success",
    Pending: "border-warning text-warning",
    Rejected: "border-destructive text-destructive",
    Draft: "border-muted-foreground text-muted-foreground",
  };
  return <Badge variant="outline" className={map[s] || ""}>{s}</Badge>;
}

function ModuleListPage() {
  const params = useParams({ from: "/app/$" });
  const slug = (params._splat || "").split("/")[0];
  const mod = getModule(slug)!;
  const schema = getSchema(slug);
  const Icon = mod.icon;
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const all = list(slug);
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter((r) =>
      Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(q)),
    );
  }, [slug, query]);

  const related = MODULES.filter((m) => m.group === mod.group && m.slug !== mod.slug).slice(0, 4);

  const formatCell = (v: unknown, colName: string) => {
    if (v === undefined || v === null || v === "") return "—";
    const field = schema.fields.find((f) => f.name === colName);
    if (field?.type === "amount") {
      const n = Number(v);
      if (!isNaN(n)) return n.toLocaleString("en-US", { minimumFractionDigits: 2 });
    }
    return String(v);
  };

  const totalAmount = rows.reduce((acc, r) => {
    const amt = Number(r.amount ?? r.totalAmount ?? 0);
    return isNaN(amt) ? acc : acc + amt;
  }, 0);
  const pending = rows.filter((r) => r.status === "Pending").length;

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{mod.title}</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg navy-gradient text-navy-foreground grid place-items-center shrink-0">
            <Icon className="w-6 h-6 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold">{mod.group}</div>
            <h1 className="font-display text-3xl mt-0.5">{mod.title}</h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{mod.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="w-4 h-4" />Export</Button>
          {schema.canCreate && (
            <Button asChild className="bg-navy text-navy-foreground hover:bg-navy/90">
              <Link to="/app/$" params={{ _splat: `${slug}/new` }}>
                <Plus className="w-4 h-4" />New {schema.singular}
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total records" value={rows.length.toLocaleString()} />
        <Stat label="Pending action" value={pending.toString()} accent={pending > 0 ? "warning" : undefined} />
        <Stat label="Total value" value={totalAmount > 0 ? `BDT ${totalAmount.toLocaleString()}` : "—"} />
        <Stat label="Last updated" value={rows[0]?.updatedAt ? new Date(String(rows[0].updatedAt)).toLocaleDateString() : "—"} />
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder={`Search in ${mod.short}…`}
            className="max-w-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="outline" size="sm"><Filter className="w-4 h-4" />Filters</Button>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm"><FileText className="w-4 h-4" />PDF</Button>
            <Button variant="outline" size="sm"><Download className="w-4 h-4" />Excel</Button>
          </div>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              {schema.listColumns.map((c) => (
                <TableHead key={c.name} className={c.align === "right" ? "text-right" : ""}>
                  {c.label}
                </TableHead>
              ))}
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={schema.listColumns.length + 2} className="text-center text-sm text-muted-foreground py-10">
                  No records found.{" "}
                  {schema.canCreate && (
                    <Link to="/app/$" params={{ _splat: `${slug}/new` }} className="text-gold hover:underline">
                      Create the first {schema.singular.toLowerCase()}
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ) : rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">
                  <Link to="/app/$" params={{ _splat: `${slug}/view/${r.id}` }} className="hover:text-gold">
                    {r.id}
                  </Link>
                </TableCell>
                {schema.listColumns.map((c) => (
                  <TableCell key={c.name} className={`text-sm ${c.align === "right" ? "text-right font-mono" : ""}`}>
                    {c.name === "status"
                      ? statusBadge(String(r[c.name] ?? ""))
                      : formatCell(r[c.name], c.name)}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/app/$" params={{ _splat: `${slug}/view/${r.id}` }}>
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    </Button>
                    {schema.canCreate && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/app/$" params={{ _splat: `${slug}/edit/${r.id}` }}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {!schema.canCreate && (
        <Card className="p-5 bg-gold/[0.06] border-gold/30">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Read-only module</div>
              <p className="text-sm text-muted-foreground mt-1">
                {mod.title} entries are sourced from the core banking system. Records can be viewed
                and exported here, but cannot be created from the portal.
              </p>
            </div>
          </div>
        </Card>
      )}

      {related.length > 0 && (
        <div>
          <h3 className="font-display text-lg mb-3">Related modules</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {related.map((r) => (
              <Link key={r.slug} to="/app/$" params={{ _splat: r.slug }}
                className="p-4 rounded-md border border-border hover:border-gold hover:bg-muted/40 transition-colors flex items-start gap-3">
                <r.icon className="w-4 h-4 text-navy shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{r.short}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">{r.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: "warning" }) {
  return (
    <Card className="p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`font-display text-2xl mt-2 ${accent === "warning" ? "text-warning" : ""}`}>{value}</div>
    </Card>
  );
}

/* ------------------- Enhanced Accounts & Statements Views ------------------- */

function AccountDashboardView() {
  const accounts = list("accounts");
  const [tab, setTab] = useState("all");

  const filtered = useMemo(() => {
    if (tab === "all") return accounts;
    if (tab === "current") return accounts.filter(a => a.accountType === "Al-Wadeeah Current");
    if (tab === "savings") return accounts.filter(a => a.accountType !== "Al-Wadeeah Current");
    return accounts;
  }, [accounts, tab]);

  // Aggregate totals
  const totalBDT = useMemo(() => {
    return accounts
      .filter(a => a.currency === "BDT")
      .reduce((acc, a) => acc + Number(a.balance || 0), 0);
  }, [accounts]);

  const totalUSD = useMemo(() => {
    return accounts
      .filter(a => a.currency === "USD")
      .reduce((acc, a) => acc + Number(a.balance || 0), 0);
  }, [accounts]);

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-semibold">Accounts & Investments</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Account Management & Statements</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Real-time balance inquiry, transaction history ledger, and SWIFT-compliant bank statement downloads.
          </p>
        </div>
      </div>

      {/* Aggregate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0">
            <Wallet className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Total Local Currency Bal</div>
            <div className="font-display text-2xl mt-2 text-navy font-bold">
              BDT {totalBDT.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">Across BDT Accounts</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0">
            <DollarSign className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Total FCY Balance</div>
            <div className="font-display text-2xl mt-2 text-navy font-bold">
              USD {totalUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">Across OBU Accounts</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4 col-span-1 sm:col-span-2 lg:col-span-1 bg-gold/[0.04] border-gold/30">
          <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Shariah-Compliance</div>
            <div className="font-display text-lg mt-2 text-foreground font-semibold">Al-Wadeeah & Mudaraba</div>
            <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
              Accounts strictly adhere to Islamic profit-sharing ratios and non-interest pooling.
            </p>
          </div>
        </Card>
      </div>

      {/* Account Table & Filters */}
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-card p-3 rounded-lg border border-border">
          <TabsList>
            <TabsTrigger value="all">All Accounts ({accounts.length})</TabsTrigger>
            <TabsTrigger value="current">Current Accounts</TabsTrigger>
            <TabsTrigger value="savings">Savings & SND</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" /> Profit Rates
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Mudaraba Weightages & Profit Rates</DialogTitle>
                  <DialogDescription>
                    Shahjalal Islami Bank PLC declared provisional profit sharing ratios for the current month.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-3 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium">Account Type</span>
                    <span className="font-semibold text-gold">Weightage / Ratio</span>
                  </div>
                  <div className="flex justify-between text-xs py-1">
                    <span>Mudaraba Savings (Corporate)</span>
                    <span>45% (Customer) : 55% (Bank)</span>
                  </div>
                  <div className="flex justify-between text-xs py-1">
                    <span>Special Notice Deposit (SND)</span>
                    <span>30% (Customer) : 70% (Bank)</span>
                  </div>
                  <div className="flex justify-between text-xs py-1">
                    <span>Mudaraba Term Deposit (1 Month)</span>
                    <span>1.10 weightage</span>
                  </div>
                  <div className="flex justify-between text-xs py-1">
                    <span>Mudaraba Term Deposit (12 Month)</span>
                    <span>1.35 weightage</span>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" className="w-full" asChild>
                    <a href="#" onClick={(e) => { e.preventDefault(); toast.success("Weightages brochure downloaded."); }}>
                      <Download className="w-4 h-4 mr-2" /> Download Brochure (PDF)
                    </a>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(acc => {
            return (
              <Card key={acc.id} className="p-6 flex flex-col justify-between hover:border-gold/50 transition-colors border border-border">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{acc.accountType}</span>
                      <h2 className="font-display font-bold text-lg text-navy line-clamp-1 mt-0.5">{acc.accountName}</h2>
                    </div>
                    <Badge variant="outline" className={acc.currency === "BDT" ? "bg-navy/5 text-navy border-navy/20" : "bg-gold/5 text-gold border-gold/20"}>
                      {acc.currency}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground font-mono">A/C: {acc.accountNo}</span>
                    <div className="mt-2 text-2xl font-display font-bold text-foreground">
                      {acc.currency} {Number(acc.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1 flex justify-between">
                      <span>Available:</span>
                      <span className="font-semibold text-foreground">{acc.currency} {Number(acc.availableBalance).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                  <div className="text-[10px] text-muted-foreground">
                    {acc.branchName}
                  </div>
                  <Button size="sm" variant="ghost" className="text-gold hover:text-gold/80 hover:bg-gold/5 text-xs gap-1.5 p-0 h-auto" asChild>
                    <Link to="/app/$" params={{ _splat: `accounts/view/${acc.id}` }}>
                      View Statement <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}

function AccountStatementView({ record }: { record: any }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const [showCertDialog, setShowCertDialog] = useState(false);
  const [certPurpose, setCertPurpose] = useState("");
  const [certBranch, setCertBranch] = useState("");

  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState("PDF");
  const [downloadPeriod, setDownloadPeriod] = useState("30days");

  const allTransactions = useMemo(() => {
    return getTransactionsForAccount(record.accountNo);
  }, [record.accountNo]);

  // Filtering transactions
  const transactions = useMemo(() => {
    let list = [...allTransactions];

    // Filter by type
    if (typeFilter === "credit") {
      list = list.filter(t => t.type === "Credit");
    } else if (typeFilter === "debit") {
      list = list.filter(t => t.type === "Debit");
    }

    // Filter by date
    if (dateRange === "7days") {
      const boundary = new Date("2026-06-08T00:00:00Z");
      list = list.filter(t => new Date(t.date) >= boundary);
    } else if (dateRange === "30days") {
      const boundary = new Date("2026-05-16T00:00:00Z");
      list = list.filter(t => new Date(t.date) >= boundary);
    }

    // Filter by search query
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t => 
        t.description.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.reference.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [allTransactions, query, typeFilter, dateRange]);

  // Aggregated statements stats
  const stats = useMemo(() => {
    let inflow = 0;
    let outflow = 0;
    transactions.forEach(t => {
      if (t.type === "Credit") inflow += t.amount;
      else outflow += t.amount;
    });
    return {
      inflow,
      outflow,
      net: inflow - outflow
    };
  }, [transactions]);

  function handleRequestCertificate(e: React.FormEvent) {
    e.preventDefault();
    if (!certPurpose || !certBranch) {
      toast.error("Please fill in all details");
      return;
    }
    // Simulate Maker-Checker Approval entry addition
    const session = getSession();
    const maker = session?.username || "maker";
    const appRows = JSON.parse(localStorage.getItem(`sjibl.ctb.v2.approval`) || "[]");
    
    const newApproval = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "Pending",
      ref: record.id,
      moduleTitle: "Accounts & Investments",
      details: `Request Balance Certificate for A/C ${record.accountNo} (Purpose: ${certPurpose}, Delivery: ${certBranch})`,
      maker: maker,
      risk: "Low",
      amount: 0,
      sourceSlug: "accounts",
      remarks: "Awaiting Checker verification for signature and issuance."
    };
    appRows.unshift(newApproval);
    localStorage.setItem(`sjibl.ctb.v2.approval`, JSON.stringify(appRows));

    toast.success("Balance Certificate request submitted to Approval Queue!");
    setShowCertDialog(false);
    setCertPurpose("");
    setCertBranch("");
  }

  function handleDownloadStatement() {
    let filteredTxs = [...allTransactions];
    if (downloadPeriod === "7days") {
      const boundary = new Date("2026-06-08T00:00:00Z");
      filteredTxs = filteredTxs.filter(t => new Date(t.date) >= boundary);
    } else if (downloadPeriod === "30days") {
      const boundary = new Date("2026-05-16T00:00:00Z");
      filteredTxs = filteredTxs.filter(t => new Date(t.date) >= boundary);
    }

    if (downloadFormat === "CSV") {
      downloadCSV(record.accountNo, filteredTxs);
    } else if (downloadFormat === "MT940") {
      downloadMT940(record.accountNo, filteredTxs);
    } else {
      downloadPDF(record.accountNo, record.accountName, record.accountType, record.balance, filteredTxs);
    }

    toast.success(`Bank Statement downloaded successfully in ${downloadFormat} format!`);
    setShowDownloadDialog(false);
  }

  const isMudaraba = record.accountType.includes("Mudaraba") || record.accountType.includes("Deposit") || record.accountType.includes("Notice");

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: "accounts" }} className="hover:text-navy">Accounts</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-mono">{record.accountNo}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate({ to: "/app/$", params: { _splat: "accounts" } })}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold">{record.accountType}</div>
            <h1 className="font-display text-3xl font-bold text-navy mt-0.5">{record.accountName}</h1>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              Account No: {record.accountNo} · Branch: {record.branchName}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Download Dialog */}
          <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
            <DialogTrigger asChild>
              <Button className="bg-navy text-navy-foreground hover:bg-navy/90">
                <Download className="w-4 h-4 mr-2" /> Download Statement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Generate Bank Statement</DialogTitle>
                <DialogDescription>
                  Configure date range and export format. Sourced securely from core ledger.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-3 text-sm">
                <div className="space-y-2">
                  <Label htmlFor="period">Statement Period</Label>
                  <Select value={downloadPeriod} onValueChange={setDownloadPeriod}>
                    <SelectTrigger id="period">
                      <SelectValue placeholder="Select Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 Days (Jun 08 - Present)</SelectItem>
                      <SelectItem value="30days">Last 30 Days (May 16 - Present)</SelectItem>
                      <SelectItem value="all">Full History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format">File Format</Label>
                  <Select value={downloadFormat} onValueChange={setDownloadFormat}>
                    <SelectTrigger id="format">
                      <SelectValue placeholder="Select Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF Ledger Report (.txt)</SelectItem>
                      <SelectItem value="CSV">Excel CSV Spreadsheet (.csv)</SelectItem>
                      <SelectItem value="MT940">MT940 SWIFT Statement (.sta)</SelectItem>
                    </SelectContent>
                  </Select>
                  {downloadFormat === "MT940" && (
                    <p className="text-[10px] text-muted-foreground bg-muted p-2 rounded leading-relaxed">
                      MT940 statements follow SWIFT MT940 specifications, matching account, sequence numbers, field :60F, :61, :86, and :62F for ERP reconciliation.
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDownloadDialog(false)}>Cancel</Button>
                <Button onClick={handleDownloadStatement} className="bg-gold text-gold-foreground hover:bg-gold/90">
                  Generate & Download
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Certificate Dialog */}
          <Dialog open={showCertDialog} onOpenChange={setShowCertDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" /> Request Balance Certificate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <form onSubmit={handleRequestCertificate}>
                <DialogHeader>
                  <DialogTitle>Request Balance Certificate</DialogTitle>
                  <DialogDescription>
                    Submit a request to issue an official balance certificate signed by branch managers.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-3 text-sm">
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose of Certificate</Label>
                    <Select value={certPurpose} onValueChange={setCertPurpose}>
                      <SelectTrigger id="purpose">
                        <SelectValue placeholder="Select Purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Audit Verification">Corporate Audit Verification</SelectItem>
                        <SelectItem value="Visa / Embassy">Embassy / Visa Application</SelectItem>
                        <SelectItem value="Credit Facilities">Credit Rating / Facilities</SelectItem>
                        <SelectItem value="General Reference">General Reference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch">Delivery Branch</Label>
                    <Select value={certBranch} onValueChange={setCertBranch}>
                      <SelectTrigger id="branch">
                        <SelectValue placeholder="Select Collection Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dilkusha Branch">Dilkusha Branch (Dhaka)</SelectItem>
                        <SelectItem value="Motijheel Branch">Motijheel Corporate Branch</SelectItem>
                        <SelectItem value="Gulshan Branch">Gulshan Branch</SelectItem>
                        <SelectItem value="Uttara Branch">Uttara Branch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowCertDialog(false)}>Cancel</Button>
                  <Button type="submit" className="bg-navy text-navy-foreground hover:bg-navy/90">
                    Submit Request
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Account Info and Summary statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-muted/40">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Ledger Balance</span>
              <div className="text-xl font-bold font-mono mt-1 text-navy">
                {record.currency} {Number(record.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </Card>

            <Card className="p-4 bg-muted/40">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Available Balance</span>
              <div className="text-xl font-bold font-mono mt-1 text-foreground">
                {record.currency} {Number(record.availableBalance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </Card>

            <Card className="p-4 bg-muted/40">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Branch & BIC</span>
              <div className="text-xs font-semibold mt-1 truncate">
                {record.branchName}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">BIC: {record.swiftCode}</span>
            </Card>
          </div>

          {/* Statement details stats */}
          <Card className="p-5">
            <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Statement Statistics (Filtered View)</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="border-r border-border">
                <span className="text-xs text-muted-foreground">Total Inflows</span>
                <div className="text-sm sm:text-base md:text-lg font-bold font-mono text-success flex justify-center items-center gap-1 mt-1">
                  <ArrowDownLeft className="w-4 h-4 shrink-0" />
                  <span>{record.currency} {stats.inflow.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="border-r border-border">
                <span className="text-xs text-muted-foreground">Total Outflows</span>
                <div className="text-sm sm:text-base md:text-lg font-bold font-mono text-destructive flex justify-center items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                  <span>{record.currency} {stats.outflow.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-muted-foreground">Net Ledger Change</span>
                <div className={`text-sm sm:text-base md:text-lg font-bold font-mono flex justify-center items-center gap-1 mt-1 ${stats.net >= 0 ? "text-navy" : "text-destructive"}`}>
                  <span>{stats.net >= 0 ? "+" : ""}{record.currency} {stats.net.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Transaction Ledger Table */}
          <Card className="p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative max-w-xs flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search ledger..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex gap-2 flex-wrap text-xs">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-9 w-28 text-xs">
                    <SelectValue placeholder="All Txns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Txns</SelectItem>
                    <SelectItem value="credit">Credits (In)</SelectItem>
                    <SelectItem value="debit">Debits (Out)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="h-9 w-32 text-xs">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All History</SelectItem>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Reference ID</TableHead>
                    <TableHead>Narration / Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-10">
                        No transactions found matching filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactions.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="text-xs whitespace-nowrap">{t.date}</TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                          {t.id}
                        </TableCell>
                        <TableCell className="text-sm font-medium">{t.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                            {t.category}
                          </Badge>
                        </TableCell>
                        <TableCell className={`text-right font-mono font-semibold whitespace-nowrap ${t.type === "Credit" ? "text-success" : "text-destructive"}`}>
                          {t.type === "Credit" ? "+" : "-"}{Number(t.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs whitespace-nowrap">
                          {Number(t.balanceAfter).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Account Profile Card */}
          <Card className="p-5 space-y-4">
            <h2 className="font-display font-semibold text-lg text-navy">Account Profile</h2>
            <div className="text-xs space-y-3">
              <div className="flex justify-between border-b border-border pb-1.5">
                <span className="text-muted-foreground">Routing Number:</span>
                <span className="font-semibold">{record.routingNumber}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-1.5">
                <span className="text-muted-foreground">SWIFT BIC Code:</span>
                <span className="font-semibold">{record.swiftCode}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-1.5 font-mono">
                <span className="text-muted-foreground font-sans">IBAN Number:</span>
                <span className="font-semibold truncate max-w-[150px]" title={`BD99SJIB000${record.accountNo}`}>BD99SJIB000{record.accountNo}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-1.5">
                <span className="text-muted-foreground">Account Status:</span>
                <span className="font-semibold text-success flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active
                </span>
              </div>
            </div>
          </Card>

          {/* Shariah compliance / Mudaraba Panel */}
          {isMudaraba ? (
            <Card className="p-5 border-gold bg-gold/[0.04] space-y-4">
              <div className="flex items-center gap-2 text-gold">
                <Coins className="w-5 h-5 shrink-0" />
                <h2 className="font-display font-semibold text-lg text-navy">Mudaraba Account Details</h2>
              </div>
              <p className="text-xs text-muted-foreground leading-normal">
                This account operates under the Mudaraba principle, where the customer acts as a capital provider (Sahib-al-Maal) and the bank acts as a manager (Mudarib).
              </p>
              <div className="text-xs space-y-3 pt-2">
                <div className="flex justify-between border-b border-gold/20 pb-1.5">
                  <span className="text-muted-foreground">Profit sharing ratio:</span>
                  <span className="font-semibold">45% Customer : 55% Bank</span>
                </div>
                <div className="flex justify-between border-b border-gold/20 pb-1.5">
                  <span className="text-muted-foreground">Declared weightage:</span>
                  <span className="font-semibold">0.45 weightage</span>
                </div>
                <div className="flex justify-between border-b border-gold/20 pb-1.5">
                  <span className="text-muted-foreground">Distribution frequency:</span>
                  <span className="font-semibold">Monthly Payout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next payout:</span>
                  <span className="font-semibold text-gold">July 01, 2026</span>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-5 border-navy/30 bg-navy/[0.02] space-y-4">
              <div className="flex items-center gap-2 text-navy">
                <Info className="w-5 h-5 shrink-0 text-gold" />
                <h2 className="font-display font-semibold text-lg">Al-Wadeeah Current</h2>
              </div>
              <p className="text-xs text-muted-foreground leading-normal font-light">
                This account is based on the Al-Wadeeah contract, acting as a safe custodianship. The bank guarantees the principal balance, and no profit is shared or distributed.
              </p>
              <div className="text-xs space-y-3 pt-2">
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span className="text-muted-foreground">Principal guarantee:</span>
                  <span className="font-semibold text-success">100% Guaranteed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit/Interest rate:</span>
                  <span className="font-semibold">0.00% (Interest-Free)</span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------- Client-Side Statement Download Helpers ----------------- */

function downloadCSV(accountNo: string, txs: Transaction[]) {
  const headers = "Date,Transaction ID,Description,Category,Type,Amount,Running Balance,Reference\n";
  const rows = txs.map(t => 
    `"${t.date}","${t.id}","${t.description.replace(/"/g, '""')}","${t.category}","${t.type}",${t.amount},${t.balanceAfter},"${t.reference}"`
  ).join("\n");
  const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `statement_${accountNo}_${new Date().toISOString().slice(0,10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadMT940(accountNo: string, txs: Transaction[]) {
  const todayStr = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // YYMMDD
  const balance = txs[0] ? txs[0].balanceAfter : 0;
  const initialBalance = txs[txs.length - 1] ? (txs[txs.length - 1].balanceAfter + (txs[txs.length - 1].type === "Debit" ? txs[txs.length - 1].amount : -txs[txs.length - 1].amount)) : 0;

  let mt940 = `:20:START\n:25:${accountNo}\n:28C:00001\n:60F:C${todayStr}BDT${initialBalance.toFixed(2).replace(".", ",")}\n`;
  
  txs.forEach((t) => {
    const txnDate = t.date.slice(2, 10).replace(/-/g, ""); // YYMMDD
    const entryDate = txnDate.slice(2); // MMDD
    const typeIndicator = t.type === "Credit" ? "C" : "D";
    const amtStr = t.amount.toFixed(2).replace(".", ",");
    mt940 += `:61:${txnDate}${entryDate}${typeIndicator}${amtStr}FTRF${t.reference}//${t.id}\n:86:${t.description.toUpperCase()}\n`;
  });
  
  mt940 += `:62F:C${todayStr}BDT${balance.toFixed(2).replace(".", ",")}\n`;

  const blob = new Blob([mt940], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `MT940_${accountNo}_${todayStr}.sta`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadPDF(accountNo: string, accountName: string, type: string, balance: number, txs: Transaction[]) {
  let text = `SHAHJALAL ISLAMI BANK PLC\nCORPORATE TRANSACTION BANKING STATEMENT\n`;
  text += `========================================================================\n`;
  text += `Account Name: ${accountName}\n`;
  text += `Account Number: ${accountNo}\n`;
  text += `Account Type: ${type}\n`;
  text += `Current Balance: BDT ${balance.toLocaleString()}\n`;
  text += `Statement Date: ${new Date().toLocaleString()}\n`;
  text += `========================================================================\n\n`;
  text += `DATE        TXN ID      TYPE     AMOUNT            BALANCE           NARRATION\n`;
  text += `------------------------------------------------------------------------\n`;
  
  txs.forEach(t => {
    const amt = (t.type === "Credit" ? "+" : "-") + t.amount.toLocaleString().padStart(12);
    const bal = t.balanceAfter.toLocaleString().padStart(12);
    text += `${t.date}  ${t.id.padEnd(10)}  ${t.type.padEnd(6)}  ${amt.padEnd(16)}  ${bal.padEnd(16)}  ${t.description.slice(0, 40)}\n`;
  });
  
  const blob = new Blob([text], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `statement_${accountNo}_${new Date().toISOString().slice(0,10)}.txt`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ------------------- Enhanced Investments & Facilities Views ------------------- */

function InvestmentDashboardView() {
  const facilities = list("investment");
  const [tab, setTab] = useState("all");

  const filtered = useMemo(() => {
    if (tab === "all") return facilities;
    if (tab === "murabaha") return facilities.filter(f => f.facilityType === "Bai-Murabaha");
    if (tab === "hpsm") return facilities.filter(f => f.facilityType.includes("HPSM"));
    return facilities;
  }, [facilities, tab]);

  // Aggregate stats
  const stats = useMemo(() => {
    let limit = 0;
    let outstanding = 0;
    facilities.forEach(f => {
      limit += Number(f.limitAmount || 0);
      outstanding += Number(f.outstandingAmount || 0);
    });
    return {
      limit,
      outstanding,
      available: limit - outstanding
    };
  }, [facilities]);

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-semibold">Investments</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Corporate Investment Facilities</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Monitor approved funded and non-funded Islamic credit limits, trace outstanding drawdowns, and request vendor disbursements.
          </p>
        </div>
      </div>

      {/* Aggregate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Total Approved limits</span>
          <div className="text-2xl font-bold font-mono text-navy mt-2">
            BDT {stats.limit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Funded & Non-Funded limits</div>
        </Card>

        <Card className="p-5">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Total Outstanding</span>
          <div className="text-2xl font-bold font-mono text-destructive mt-2">
            BDT {stats.outstanding.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">
            {stats.limit > 0 ? ((stats.outstanding / stats.limit) * 100).toFixed(1) : 0}% Limit Utilization
          </div>
        </Card>

        <Card className="p-5">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Total Available limit</span>
          <div className="text-2xl font-bold font-mono text-success mt-2">
            BDT {stats.available.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Available for Payout Drawdown</div>
        </Card>
      </div>

      {/* Limits Utilisation Progress bar list */}
      <Card className="p-5 space-y-4">
        <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground font-bold">Facility Limit Utilization</h2>
        <div className="space-y-4 text-xs">
          {facilities.map(f => {
            const pct = Math.min(100, Math.round((Number(f.outstandingAmount) / Number(f.limitAmount)) * 100));
            return (
              <div key={f.id} className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span>{f.facilityNo} ({f.facilityType})</span>
                  <span>{pct}% Utilized ({Number(f.outstandingAmount).toLocaleString()} / {Number(f.limitAmount).toLocaleString()} BDT)</span>
                </div>
                <div className="w-full h-2 rounded bg-muted overflow-hidden">
                  <div className={`h-full rounded transition-all duration-300 ${pct > 80 ? "bg-destructive" : pct > 50 ? "bg-gold" : "bg-navy"}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Facilities Grid */}
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Limits ({facilities.length})</TabsTrigger>
          <TabsTrigger value="murabaha">Murabaha Limits</TabsTrigger>
          <TabsTrigger value="hpsm">HPSM Limits</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(fac => {
            const avail = Number(fac.limitAmount) - Number(fac.outstandingAmount);
            return (
              <Card key={fac.id} className="p-6 flex flex-col justify-between hover:border-gold/50 transition-colors border border-border">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gold font-bold">{fac.facilityType}</span>
                      <h2 className="font-display font-bold text-lg text-navy mt-0.5">{fac.facilityNo}</h2>
                    </div>
                    <Badge variant="outline" className={fac.status === "Approved" ? "bg-success/5 text-success border-success/20" : "bg-warning/5 text-warning border-warning/20"}>
                      {fac.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Approved Limit:</span>
                      <div className="font-semibold font-mono text-sm mt-0.5">BDT {Number(fac.limitAmount).toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Outstanding:</span>
                      <div className="font-semibold font-mono text-sm mt-0.5 text-destructive">BDT {Number(fac.outstandingAmount).toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Available Room:</span>
                      <div className="font-semibold font-mono text-sm mt-0.5 text-success">BDT {avail.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Markup Profit:</span>
                      <div className="font-semibold font-mono text-sm mt-0.5">{fac.profitRate}% p.a.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Expires: {fac.expiryDate}</span>
                  <Button size="sm" variant="ghost" className="text-gold hover:text-gold/80 hover:bg-gold/5 text-xs gap-1.5 p-0 h-auto font-semibold" asChild>
                    <Link to="/app/$" params={{ _splat: `investment/view/${fac.id}` }}>
                      View Facility Statement <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}

function InvestmentFacilityView({ record }: { record: any }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [reqVendor, setReqVendor] = useState("");
  const [reqInvoice, setReqInvoice] = useState("");
  const [reqAmount, setReqAmount] = useState("");
  const [reqRemarks, setReqRemarks] = useState("");

  const ledger = useMemo(() => {
    return getInvestmentTransactions(record.facilityNo);
  }, [record.facilityNo]);

  // Filtering transactions
  const transactions = useMemo(() => {
    let list = [...ledger];

    // Filter by type
    if (typeFilter === "disbursement") {
      list = list.filter(t => t.type === "Disbursement");
    } else if (typeFilter === "repayment") {
      list = list.filter(t => t.type === "Repayment");
    }

    // Filter by query
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t => 
        t.description.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.reference.toLowerCase().includes(q)
      );
    }

    return list;
  }, [ledger, query, typeFilter]);

  // Aggregated statements stats
  const stats = useMemo(() => {
    let disbursements = 0;
    let repayments = 0;
    transactions.forEach(t => {
      if (t.type === "Disbursement") disbursements += t.amount;
      else repayments += t.amount;
    });
    return {
      disbursements,
      repayments
    };
  }, [transactions]);

  function handleRequestDisbursement(e: React.FormEvent) {
    e.preventDefault();
    if (!reqVendor || !reqAmount) {
      toast.error("Please fill in Vendor and Amount");
      return;
    }
    const amtNum = parseFloat(reqAmount);
    if (isNaN(amtNum) || amtNum <= 0) {
      toast.error("Invalid amount");
      return;
    }

    const avail = Number(record.limitAmount) - Number(record.outstandingAmount);
    if (amtNum > avail) {
      toast.error("Disbursement amount exceeds available headroom");
      return;
    }

    // Submit to Approval Queue
    const session = getSession();
    const maker = session?.username || "maker";
    const appRows = JSON.parse(localStorage.getItem(`sjibl.ctb.v2.approval`) || "[]");
    
    const newApproval = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "Pending",
      ref: record.id,
      moduleTitle: "Investment (Finance/Credit)",
      details: `Request Disbursement BDT ${amtNum.toLocaleString()} to ${reqVendor} (Limit: ${record.facilityNo}, Ref: ${reqInvoice || "N/A"})`,
      maker: maker,
      risk: amtNum >= 10000000 ? "High" : amtNum >= 1000000 ? "Medium" : "Low",
      amount: amtNum,
      sourceSlug: "investment",
      remarks: "Awaiting Checker verification of supplier proforma invoice and delivery receipt."
    };
    appRows.unshift(newApproval);
    localStorage.setItem(`sjibl.ctb.v2.approval`, JSON.stringify(appRows));

    toast.success("Disbursement request queued for Maker-Checker approval!");
    setShowRequestDialog(false);
    setReqVendor("");
    setReqInvoice("");
    setReqAmount("");
    setReqRemarks("");
  }

  function handleDownloadStatement(format: "PDF" | "CSV") {
    if (format === "CSV") {
      downloadInvestmentCSV(record.facilityNo, ledger);
    } else {
      downloadInvestmentPDF(record.facilityNo, record.facilityType, Number(record.limitAmount), Number(record.outstandingAmount), ledger);
    }
    toast.success(`Facility Statement downloaded successfully in ${format} format!`);
  }

  const isMurabaha = record.facilityType === "Bai-Murabaha";
  const available = Number(record.limitAmount) - Number(record.outstandingAmount);

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: "investment" }} className="hover:text-navy">Investments</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-mono">{record.facilityNo}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate({ to: "/app/$", params: { _splat: "investment" } })}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold">{record.facilityType}</div>
            <h1 className="font-display text-3xl font-bold text-navy mt-0.5">{record.facilityNo}</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Approved limit: BDT {Number(record.limitAmount).toLocaleString()} · Markup rate: {record.profitRate}% p.a.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Download Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" /> Download Statement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xs">
              <DialogHeader>
                <DialogTitle className="text-sm font-bold">Export Statement</DialogTitle>
                <DialogDescription className="text-xs">
                  Choose formatting for statement download.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2 py-3">
                <Button variant="outline" size="sm" onClick={() => handleDownloadStatement("PDF")}>
                  <FileText className="w-4 h-4 mr-2 text-destructive" /> PDF Format (.txt)
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownloadStatement("CSV")}>
                  <FileSpreadsheet className="w-4 h-4 mr-2 text-success" /> Excel CSV (.csv)
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Request Disbursement Dialog */}
          <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
            <DialogTrigger asChild>
              <Button className="bg-navy text-navy-foreground hover:bg-navy/90">
                <Plus className="w-4 h-4 mr-2" /> {isMurabaha ? "Request Procurement" : "Request Drawdown"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <form onSubmit={handleRequestDisbursement}>
                <DialogHeader>
                  <DialogTitle>{isMurabaha ? "Request Murabaha Procurement Payout" : "Request Lease Drawdown"}</DialogTitle>
                  <DialogDescription>
                    Submit supplier proforma invoice to disburse funds from the approved headroom.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-3 text-sm">
                  <div className="space-y-2">
                    <Label htmlFor="vendor">Supplier / Vendor Name</Label>
                    <Input id="vendor" placeholder="e.g. Steel-Works Bangladesh" value={reqVendor} onChange={(e) => setReqVendor(e.target.value)} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoice">Invoice / Quotation Ref</Label>
                      <Input id="invoice" placeholder="e.g. PI-9902" value={reqInvoice} onChange={(e) => setReqInvoice(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Disbursement BDT</Label>
                      <Input id="amount" type="number" placeholder="Amount" value={reqAmount} onChange={(e) => setReqAmount(e.target.value)} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Proforma Quotation</Label>
                    <div className="flex items-center justify-center border border-dashed border-input hover:border-gold rounded-md p-4 cursor-pointer text-xs text-muted-foreground">
                      <Upload className="w-5 h-5 mr-2" /> Upload proforma_invoice.pdf
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="remarks">Remarks / Delivery specifications</Label>
                    <Input id="remarks" placeholder="Goods description, delivery terms" value={reqRemarks} onChange={(e) => setReqRemarks(e.target.value)} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowRequestDialog(false)}>Cancel</Button>
                  <Button type="submit" className="bg-navy text-navy-foreground hover:bg-navy/90">
                    Submit to Checker
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-muted/40">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Approved limit</span>
          <div className="text-xl font-bold font-mono text-navy mt-1">
            BDT {Number(record.limitAmount).toLocaleString()}
          </div>
        </Card>

        <Card className="p-4 bg-muted/40">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Outstanding principal</span>
          <div className="text-xl font-bold font-mono text-destructive mt-1">
            BDT {Number(record.outstandingAmount).toLocaleString()}
          </div>
        </Card>

        <Card className="p-4 bg-muted/40">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Available headroom</span>
          <div className="text-xl font-bold font-mono text-success mt-1">
            BDT {available.toLocaleString()}
          </div>
        </Card>

        <Card className="p-4 bg-muted/40">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Facility Expiry</span>
          <div className="text-sm font-semibold mt-1.5 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gold shrink-0" /> {record.expiryDate}
          </div>
        </Card>
      </div>

      {/* Main Ledger Table and side panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Table */}
          <Card className="p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display font-semibold text-base text-navy font-bold">Facility Statement Ledger</h2>

              <div className="flex gap-2 text-xs flex-wrap">
                <div className="relative max-w-xs">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search ref..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-8 h-8 text-xs w-40" />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-8 w-28 text-xs">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All transactions</SelectItem>
                    <SelectItem value="disbursement">Disbursements</SelectItem>
                    <SelectItem value="repayment">Repayments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Narration / Vendor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Outstanding Bal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-10">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactions.map(t => (
                      <TableRow key={t.id}>
                        <TableCell className="text-xs whitespace-nowrap">{t.date}</TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">{t.id}</TableCell>
                        <TableCell className="text-sm font-medium">{t.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[10px] uppercase font-semibold ${t.type === "Disbursement" ? "border-destructive text-destructive" : "border-success text-success"}`}>
                            {t.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold">
                          BDT {t.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs">
                          BDT {t.balanceAfter.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        {/* Side Panel terms & Shariah */}
        <div className="space-y-6">
          <Card className="p-5 space-y-4">
            <h2 className="font-display font-semibold text-lg text-navy">Security & Collateral</h2>
            <div className="text-xs space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                {record.securityDetails || "Security hypothecation of current assets and personal guarantees."}
              </p>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Facility Status:</span>
                  <span className="font-semibold text-success flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Insurance Cover:</span>
                  <span className="font-semibold">Takaful covered (110%)</span>
                </div>
              </div>
            </div>
          </Card>

          {isMurabaha ? (
            <Card className="p-5 border-gold bg-gold/[0.04] space-y-3 text-xs">
              <div className="flex items-center gap-2 text-gold">
                <Coins className="w-5 h-5 shrink-0" />
                <h2 className="font-display font-semibold text-lg text-navy">Murabaha Principles</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Bai-Murabaha is a cost-plus sale contract. The bank purchases goods from supplier at customer's request and sells them to the customer at cost + specified markup.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-gold/20">
                <div className="flex justify-between">
                  <span>Markup profit rate:</span>
                  <span className="font-semibold">{record.profitRate}% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span>Repayment model:</span>
                  <span className="font-semibold">Deferred lumpsum / EMI</span>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-5 border-navy/30 bg-navy/[0.02] space-y-3 text-xs">
              <div className="flex items-center gap-2 text-navy">
                <Info className="w-5 h-5 shrink-0 text-gold" />
                <h2 className="font-display font-semibold text-lg">HPSM Principles</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Hire Purchase under Shirkatul Melk (HPSM) is a lease-to-own facility. The bank and customer jointly purchase an asset. The bank leases its share to the customer for rental, which is paid along with ownership purchase installments.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-border">
                <div className="flex justify-between">
                  <span>Rental rate:</span>
                  <span className="font-semibold">{record.profitRate}% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span>Ownership transfer:</span>
                  <span className="font-semibold">Gradual on lease end</span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------- Client-Side Investment Statement Download ----------------- */

function downloadInvestmentCSV(facilityNo: string, txs: InvestmentTransaction[]) {
  const headers = "Date,Transaction ID,Description,Type,Amount,Outstanding Balance,Reference\n";
  const rows = txs.map(t => 
    `"${t.date}","${t.id}","${t.description.replace(/"/g, '""')}","${t.type}",${t.amount},${t.balanceAfter},"${t.reference}"`
  ).join("\n");
  const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `facility_${facilityNo}_${new Date().toISOString().slice(0,10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadInvestmentPDF(facilityNo: string, type: string, limit: number, outstanding: number, txs: InvestmentTransaction[]) {
  let text = `SHAHJALAL ISLAMI BANK PLC\nINVESTMENT FACILITY STATEMENT\n`;
  text += `========================================================================\n`;
  text += `Facility Number: ${facilityNo}\n`;
  text += `Mode of Finance: ${type}\n`;
  text += `Approved Limit: BDT ${limit.toLocaleString()}\n`;
  text += `Outstanding Balance: BDT ${outstanding.toLocaleString()}\n`;
  text += `Available Headroom: BDT ${(limit - outstanding).toLocaleString()}\n`;
  text += `Statement Date: ${new Date().toLocaleString()}\n`;
  text += `========================================================================\n\n`;
  text += `DATE        TXN ID      TYPE          AMOUNT            OUTSTANDING       NARRATION\n`;
  text += `------------------------------------------------------------------------\n`;
  
  txs.forEach(t => {
    const amt = (t.type === "Disbursement" ? "+" : "-") + t.amount.toLocaleString().padStart(12);
    const bal = t.balanceAfter.toLocaleString().padStart(12);
    text += `${t.date}  ${t.id.padEnd(10)}  ${t.type.padEnd(12)}  ${amt.padEnd(16)}  ${bal.padEnd(16)}  ${t.description.slice(0, 40)}\n`;
  });
  
  const blob = new Blob([text], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `facility_${facilityNo}_${new Date().toISOString().slice(0,10)}.txt`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* -------------------- Enhanced Approval Dashboard Views -------------------- */

interface EmailLog {
  id: string;
  time: string;
  to: string;
  subject: string;
  body: string;
}

function getEmailLogs(): EmailLog[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("sjibl.ctb.v2.email_log");
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

function addEmailLog(to: string, subject: string, body: string) {
  if (typeof window === "undefined") return;
  const logs = getEmailLogs();
  logs.unshift({
    id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
    time: new Date().toISOString(),
    to,
    subject,
    body
  });
  localStorage.setItem("sjibl.ctb.v2.email_log", JSON.stringify(logs));
}

function ApprovalDashboardView() {
  const navigate = useNavigate();
  const approvals = list("approval");
  const [tab, setTab] = useState("Pending");
  const [catFilter, setCatFilter] = useState("all");
  const [query, setQuery] = useState("");

  const pendingCount = useMemo(() => approvals.filter(a => a.status === "Pending").length, [approvals]);
  const approvedCount = useMemo(() => approvals.filter(a => a.status === "Approved").length, [approvals]);
  const rejectedCount = useMemo(() => approvals.filter(a => a.status === "Rejected").length, [approvals]);

  // Aggregate stats
  const totalPendingBDT = useMemo(() => {
    return approvals
      .filter(a => a.status === "Pending")
      .reduce((acc, a) => acc + Number(a.amount || 0), 0);
  }, [approvals]);

  const highRiskCount = useMemo(() => {
    return approvals.filter(a => a.status === "Pending" && a.risk === "High").length;
  }, [approvals]);

  // Payment type categories pending lists
  const catTransfers = useMemo(() => {
    return approvals.filter(a => a.status === "Pending" && (a.sourceSlug === "fund-transfer" || a.sourceSlug === "bulk-transfer" || a.sourceSlug === "bill-pay"));
  }, [approvals]);

  const catTrade = useMemo(() => {
    return approvals.filter(a => a.status === "Pending" && (a.sourceSlug === "lc-initiation" || a.sourceSlug === "import-bill" || a.sourceSlug === "murabaha"));
  }, [approvals]);

  const catZakat = useMemo(() => {
    return approvals.filter(a => a.status === "Pending" && a.sourceSlug === "zakat");
  }, [approvals]);

  const catOther = useMemo(() => {
    return approvals.filter(a => a.status === "Pending" && !["fund-transfer", "bulk-transfer", "bill-pay", "lc-initiation", "import-bill", "murabaha", "zakat"].includes(String(a.sourceSlug)));
  }, [approvals]);

  const filtered = useMemo(() => {
    let list = approvals.filter(a => a.status === tab);

    // Apply category filter
    if (tab === "Pending") {
      if (catFilter === "transfers") {
        list = catTransfers;
      } else if (catFilter === "trade") {
        list = catTrade;
      } else if (catFilter === "zakat") {
        list = catZakat;
      } else if (catFilter === "other") {
        list = catOther;
      }
    }

    // Apply search query
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(a => 
        String(a.ref || "").toLowerCase().includes(q) ||
        String(a.details || "").toLowerCase().includes(q) ||
        String(a.maker || "").toLowerCase().includes(q) ||
        String(a.moduleTitle || "").toLowerCase().includes(q)
      );
    }

    return list;
  }, [approvals, tab, catFilter, query, catTransfers, catTrade, catZakat, catOther]);

  const emailLogs = getEmailLogs().slice(0, 5);

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-semibold">Approvals</span>
      </nav>

      {/* Pending alerts banner */}
      {pendingCount > 0 && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 flex items-start gap-3">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-sm">Pending Authorizations Required</div>
            <p className="text-xs mt-1 text-destructive/80 leading-normal">
              You have {pendingCount} transaction requests awaiting Maker-Checker authorization. Failure to authorize in time may cancel the value date rate lock.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold font-bold">Checker Workspace</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Corporate Approval Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Review and sign pending payouts, trade transactions, and corporate requests using multi-factor OTP validation.
          </p>
        </div>
      </div>

      {/* Aggregate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Pending Requests</span>
          <div className="text-3xl font-bold font-mono text-navy mt-2">
            {pendingCount}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Awaiting checker action</div>
        </Card>

        <Card className="p-5">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Total Pending Value</span>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground mt-2 truncate">
            BDT {totalPendingBDT.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Sum of pending transfers/L/Cs</div>
        </Card>

        <Card className="p-5 border-destructive bg-destructive/[0.02]">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">High Risk Alerts</span>
          <div className="text-3xl font-bold font-mono text-destructive mt-2">
            {highRiskCount}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Requests over BDT 10,000,000 / L/Cs</div>
        </Card>
      </div>

      {/* Transaction payment type-wise Request summary */}
      <div className="space-y-3">
        <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground font-bold">Payment Type-Wise Summaries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className={`p-4 cursor-pointer hover:border-gold/50 transition-colors ${catFilter === "transfers" ? "border-gold bg-gold/[0.02]" : "border-border"}`}
            onClick={() => setCatFilter(catFilter === "transfers" ? "all" : "transfers")}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-navy">Transfers & Bill Pay</span>
              <Badge className="bg-navy/10 text-navy hover:bg-navy/10">{catTransfers.length}</Badge>
            </div>
            <div className="mt-3 text-base lg:text-lg font-bold font-mono truncate">
              BDT {catTransfers.reduce((acc, a) => acc + Number(a.amount || 0), 0).toLocaleString()}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Fund transfers, Bulk files, Utility</p>
          </Card>

          <Card 
            className={`p-4 cursor-pointer hover:border-gold/50 transition-colors ${catFilter === "trade" ? "border-gold bg-gold/[0.02]" : "border-border"}`}
            onClick={() => setCatFilter(catFilter === "trade" ? "all" : "trade")}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-navy">Trade & Murabaha</span>
              <Badge className="bg-gold/10 text-gold hover:bg-gold/10">{catTrade.length}</Badge>
            </div>
            <div className="mt-3 text-base lg:text-lg font-bold font-mono truncate">
              BDT {catTrade.reduce((acc, a) => acc + Number(a.amount || 0), 0).toLocaleString()}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">LC application, Murabaha, Import bills</p>
          </Card>

          <Card 
            className={`p-4 cursor-pointer hover:border-gold/50 transition-colors ${catFilter === "zakat" ? "border-gold bg-gold/[0.02]" : "border-border"}`}
            onClick={() => setCatFilter(catFilter === "zakat" ? "all" : "zakat")}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-navy">Zakat & CSR Port</span>
              <Badge className="bg-navy/10 text-navy hover:bg-navy/10">{catZakat.length}</Badge>
            </div>
            <div className="mt-3 text-base lg:text-lg font-bold font-mono truncate">
              BDT {catZakat.reduce((acc, a) => acc + Number(a.amount || 0), 0).toLocaleString()}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Islamic charity, CSR payouts</p>
          </Card>

          <Card 
            className={`p-4 cursor-pointer hover:border-gold/50 transition-colors ${catFilter === "other" ? "border-gold bg-gold/[0.02]" : "border-border"}`}
            onClick={() => setCatFilter(catFilter === "other" ? "all" : "other")}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-navy">Other Requests</span>
              <Badge className="bg-muted-foreground/10 text-muted-foreground hover:bg-muted-foreground/10">{catOther.length}</Badge>
            </div>
            <div className="mt-3 text-base lg:text-lg font-bold font-mono truncate">
              BDT {catOther.reduce((acc, a) => acc + Number(a.amount || 0), 0).toLocaleString()}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Certificates, Beneficiary Maker, Admin</p>
          </Card>
        </div>
      </div>

      {/* Main Table */}
      <Tabs value={tab} onValueChange={(t) => { setTab(t); setCatFilter("all"); }} className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-card p-3 rounded-lg border border-border">
          <TabsList>
            <TabsTrigger value="Pending">Pending Action ({pendingCount})</TabsTrigger>
            <TabsTrigger value="Approved">Approved Requests ({approvedCount})</TabsTrigger>
            <TabsTrigger value="Rejected">Rejected Requests ({rejectedCount})</TabsTrigger>
          </TabsList>

          <div className="relative max-w-xs flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search approvals..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9 h-9" />
          </div>
        </div>

        <div className="border rounded-md overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Submission</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Description / details</TableHead>
                <TableHead>Maker</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-sm text-muted-foreground py-10">
                    No approval requests found matching filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(app => {
                  return (
                    <TableRow key={app.id}>
                      <TableCell className="font-mono text-xs text-navy font-semibold">{app.ref}</TableCell>
                      <TableCell className="text-xs whitespace-nowrap">{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-xs font-medium">{app.moduleTitle}</TableCell>
                      <TableCell className="text-sm font-semibold max-w-sm truncate">{app.details}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{app.maker}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={app.risk === "High" ? "border-destructive text-destructive" : app.risk === "Medium" ? "border-warning text-warning" : "border-muted-foreground text-muted-foreground"}
                        >
                          {app.risk}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold">
                        {app.amount > 0 ? `BDT ${app.amount.toLocaleString()}` : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" className="text-gold hover:text-gold/80 hover:bg-gold/5 font-semibold" asChild>
                          <Link to="/app/$" params={{ _splat: `approval/view/${app.id}` }}>
                            {tab === "Pending" ? "Review & Sign" : "View Details"}
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Tabs>

      {/* Notifications Sent Logs */}
      {emailLogs.length > 0 && (
        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground font-bold">Notification Alert Log (Checker Dispatch)</h2>
            <Badge className="bg-gold text-gold-foreground font-semibold">Live SMTP Alerts</Badge>
          </div>
          <div className="space-y-3 text-xs font-mono">
            {emailLogs.map(log => (
              <div key={log.id} className="p-3 bg-muted rounded border border-border space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground border-b border-border pb-1">
                  <span>ID: {log.id} · {new Date(log.time).toLocaleTimeString()}</span>
                  <span className="text-success font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Emailed to Maker
                  </span>
                </div>
                <div><span className="font-semibold text-navy font-sans">To:</span> {log.to}</div>
                <div><span className="font-semibold text-navy font-sans">Subject:</span> {log.subject}</div>
                <div className="text-foreground mt-1 text-xs pt-1 leading-normal font-sans italic bg-card p-2 rounded">
                  {log.body}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function ApprovalDetailView({ record }: { record: any }) {
  const navigate = useNavigate();
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [actionType, setActionType] = useState<"Approve" | "Reject">("Approve");

  // Fetch the source record metadata dynamically
  const sourceRecord = useMemo(() => {
    if (record.sourceSlug && record.ref) {
      return get(record.sourceSlug, record.ref);
    }
    return null;
  }, [record.sourceSlug, record.ref]);

  const sourceSchema = useMemo(() => {
    if (record.sourceSlug) {
      return getSchema(record.sourceSlug);
    }
    return null;
  }, [record.sourceSlug]);

  function handleActionSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otpCode !== "123456") {
      toast.error("Invalid OTP Code. Please use test code 123456.");
      return;
    }

    const finalStatus = actionType === "Approve" ? "Approved" : "Rejected";
    
    // Update the approval task in store
    update("approval", record.id, { status: finalStatus });

    // Send notifications email
    const mailTo = `${record.maker || "maker"}@globex.bd`;
    const mailSubject = `Corporate Transaction Action Alert: ${finalStatus} Reference ${record.ref}`;
    const mailBody = `Dear Maker, \n\nYour submitted transaction of BDT ${record.amount.toLocaleString()} (Reference Ref: ${record.ref}) under the ${record.moduleTitle} module has been ${finalStatus.toUpperCase()} by rashed.c (Checker) on ${new Date().toLocaleString()}.\n\nRemarks: Checked and validated.\n\nShahjalal Islami Bank PLC.`;
    
    addEmailLog(mailTo, mailSubject, mailBody);

    toast.success(`Transaction successfully ${finalStatus.toLowerCase()} and Maker notified via email!`);
    setShowOtpDialog(false);
    setOtpCode("");
    navigate({ to: "/app/$", params: { _splat: "approval" } });
  }

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: "approval" }} className="hover:text-navy">Approvals</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-mono">{record.ref}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate({ to: "/app/$", params: { _splat: "approval" } })}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold">{record.moduleTitle}</div>
            <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Authorize Request</h1>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs font-mono text-muted-foreground">ID: {record.ref}</span>
              <Badge variant="outline" className={record.risk === "High" ? "border-destructive text-destructive" : record.risk === "Medium" ? "border-warning text-warning" : "border-muted-foreground text-muted-foreground"}>
                {record.risk} Risk
              </Badge>
              <Badge variant="outline" className={record.status === "Approved" ? "border-success text-success" : record.status === "Rejected" ? "border-destructive text-destructive" : "border-warning text-warning"}>
                {record.status}
              </Badge>
            </div>
          </div>
        </div>

        {record.status === "Pending" && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => { setActionType("Reject"); setShowOtpDialog(true); }}
            >
              <X className="w-4 h-4 mr-2" /> Reject Payout
            </Button>
            <Button 
              className="bg-navy text-navy-foreground hover:bg-navy/90"
              onClick={() => { setActionType("Approve"); setShowOtpDialog(true); }}
            >
              <Check className="w-4 h-4 mr-2" /> Approve & Sign
            </Button>
          </div>
        )}
      </div>

      {/* OTP Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="max-w-sm">
          <form onSubmit={handleActionSubmit}>
            <DialogHeader>
              <DialogTitle>{actionType === "Approve" ? "Approve Transaction Request" : "Reject Transaction Request"}</DialogTitle>
              <DialogDescription className="text-xs">
                To confirm the checker action, please enter the One-Time Passcode sent to rashed.c (Checker) verified email.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-3 text-sm">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter 6-Digit Passcode</Label>
                <Input id="otp" type="password" placeholder="e.g. 123456" maxLength={6} className="text-center font-mono text-xl tracking-[0.2em] font-semibold h-11" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} required />
                <p className="text-[10px] text-muted-foreground text-center bg-muted py-1 rounded font-mono">
                  Demo bypass helper: Use passcode 123456
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowOtpDialog(false)}>Cancel</Button>
              <Button type="submit" className={actionType === "Approve" ? "bg-success text-success-foreground hover:bg-success/90" : "bg-destructive text-destructive-foreground hover:bg-destructive/90"}>
                Confirm {actionType}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Request Summary */}
          <Card className="p-6 space-y-4">
            <h2 className="font-display font-semibold text-lg text-navy">Review Summary details</h2>
            <div className="p-4 bg-muted/40 rounded-lg text-sm leading-relaxed text-foreground">
              {record.details}
            </div>

            <dl className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">Requested By (Maker)</dt>
                <dd className="font-semibold text-sm mt-0.5">{record.maker}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">Submission Time</dt>
                <dd className="font-semibold text-sm mt-0.5">{new Date(record.createdAt).toLocaleString()}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">Maker Remarks</dt>
                <dd className="font-semibold text-sm mt-0.5 bg-muted/20 p-2.5 rounded border leading-relaxed">{record.remarks || "No supplementary maker remarks provided."}</dd>
              </div>
            </dl>
          </Card>

          {/* Dynamic Original Record Metadata Card */}
          {sourceRecord && sourceSchema && (
            <Card className="p-6">
              <h2 className="font-display font-semibold text-lg text-navy mb-4">Underlying Record Metadata</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs">
                {sourceSchema.fields.map(f => {
                  const val = sourceRecord[f.name];
                  if (val === undefined || val === null || val === "") return null;
                  return (
                    <div key={f.name} className={f.span === 2 ? "sm:col-span-2" : ""}>
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{f.label}</dt>
                      <dd className={`mt-1 font-semibold text-sm ${f.type === "amount" ? "font-mono" : ""} ${f.type === "textarea" ? "whitespace-pre-wrap leading-relaxed" : ""}`}>
                        {f.type === "amount" ? `BDT ${Number(val).toLocaleString()}` : String(val)}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </Card>
          )}
        </div>

        {/* Side Panel Entitlements */}
        <div className="space-y-6">
          <Card className="p-5 space-y-4">
            <h2 className="font-display font-semibold text-lg text-navy">Checker Policy ENT</h2>
            <div className="text-xs space-y-3 text-muted-foreground leading-relaxed">
              <p>
                In compliance with bank Shariah Maker-Checker dual authorization protocols, high-risk requests (Trade and transactions BDT &gt; 1,000,000) require approval signatures.
              </p>
              <p>
                Checker entitlements are verified against Entitlement List upon OTP signing.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


/* ===================== TERM DEPOSIT (TD) VIEWS ===================== */

function TermDepositDashboardView() {
  const deposits = list("term-deposit");
  const navigate = useNavigate();

  const totalPrincipal = deposits.reduce((s: number, d: any) => s + (d.principalAmount || 0), 0);
  const totalExpectedProfit = deposits.reduce((s: number, d: any) => s + (d.expectedProfit || 0), 0);
  const today = new Date().toISOString().slice(0, 10);
  const activeCount = deposits.filter((d: any) => d.status === "Approved" && d.maturityDate >= today).length;
  const maturedCount = deposits.filter((d: any) => d.maturityDate < today).length;

  const fmt = (n: number) => `BDT ${n.toLocaleString()}`;

  const maturityAlerts = deposits.filter((d: any) => {
    const days = Math.ceil((new Date(d.maturityDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days >= 0 && days <= 90;
  });

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">Term Deposits</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">ACCOUNTS & DEPOSITS</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-1">Term Deposit Portfolio</h1>
          <p className="text-sm text-muted-foreground mt-1">Mudaraba fixed deposit portfolio overview & profit schedule</p>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-md bg-navy/10 grid place-items-center"><Coins className="w-4 h-4 text-navy" /></div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Principal</span>
          </div>
          <div className="font-mono text-xl font-bold text-navy">{fmt(totalPrincipal)}</div>
          <div className="text-[10px] text-muted-foreground mt-1">{deposits.length} FDR account{deposits.length !== 1 ? "s" : ""}</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-md bg-gold/10 grid place-items-center"><Sparkles className="w-4 h-4 text-gold" /></div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Expected Profit</span>
          </div>
          <div className="font-mono text-xl font-bold text-gold">{fmt(totalExpectedProfit)}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Total across all tenures</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-md bg-success/10 grid place-items-center"><CheckCircle2 className="w-4 h-4 text-success" /></div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Active FDRs</span>
          </div>
          <div className="font-mono text-xl font-bold text-success">{activeCount}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Currently running deposits</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-md bg-warning/10 grid place-items-center"><Calendar className="w-4 h-4 text-warning" /></div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Matured FDRs</span>
          </div>
          <div className="font-mono text-xl font-bold text-warning">{maturedCount}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Awaiting renewal / withdrawal</div>
        </Card>
      </div>

      {/* Maturity Alerts */}
      {maturityAlerts.length > 0 && (
        <Card className="p-5 border-l-4 border-l-warning bg-warning/5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-warning" />
            <h2 className="font-semibold text-sm text-warning">Upcoming Maturity Alerts</h2>
          </div>
          <div className="space-y-2">
            {maturityAlerts.map((d: any) => {
              const days = Math.ceil((new Date(d.maturityDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={d.id} className="flex items-center justify-between text-xs p-2 rounded bg-background border">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-navy">{d.receiptNo}</span>
                    <span className="text-muted-foreground">·</span>
                    <span>{d.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono">Principal: {fmt(d.principalAmount)}</span>
                    <Badge variant="outline" className={days <= 30 ? "border-destructive text-destructive" : "border-warning text-warning"}>
                      {days === 0 ? "Matures Today" : `${days}d to maturity`}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* FDR Portfolio Table */}
      <Card>
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg text-navy">Fixed Deposit Receipts</h2>
          <Badge variant="outline" className="text-xs">{deposits.length} records</Badge>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-[11px] uppercase tracking-wide">FDR Receipt No</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide">Deposit Scheme</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide text-right">Principal (BDT)</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide text-right">Expected Profit (BDT)</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide">Profit Rate</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide">Frequency</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide">Opening Date</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide">Maturity Date</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide">Status</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deposits.map((d: any) => {
                const matured = d.maturityDate < today;
                const daysLeft = Math.ceil((new Date(d.maturityDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <TableRow key={d.id} className="hover:bg-muted/20 cursor-pointer" onClick={() => navigate({ to: "/app/$", params: { _splat: `term-deposit/view/${d.id}` } })}>
                    <TableCell className="font-mono font-bold text-navy text-sm">{d.receiptNo}</TableCell>
                    <TableCell className="text-xs max-w-[180px]">{d.type}</TableCell>
                    <TableCell className="text-right font-mono text-sm font-semibold">{d.principalAmount?.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-sm text-gold font-semibold">{(d.expectedProfit || 0).toLocaleString()}</TableCell>
                    <TableCell className="text-sm font-mono">{d.profitRate}%</TableCell>
                    <TableCell className="text-xs">{d.profitFrequency || "At Maturity"}</TableCell>
                    <TableCell className="text-xs">{d.openingDate}</TableCell>
                    <TableCell className="text-xs">
                      <div>{d.maturityDate}</div>
                      {!matured && daysLeft <= 90 && (
                        <div className={`text-[10px] font-semibold ${daysLeft <= 30 ? "text-destructive" : "text-warning"}`}>{daysLeft}d remaining</div>
                      )}
                      {matured && <div className="text-[10px] text-muted-foreground">Matured</div>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={d.status === "Approved" ? "default" : "secondary"} className="text-[10px]">{d.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" className="gap-1.5 text-navy hover:bg-navy/5" onClick={(e) => { e.stopPropagation(); navigate({ to: "/app/$", params: { _splat: `term-deposit/view/${d.id}` } }); }}>
                        <Eye className="w-3.5 h-3.5" /> Statement
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function TermDepositStatementView({ record }: { record: any }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("statement");
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState("PDF");
  const [downloadPeriod, setDownloadPeriod] = useState("all");

  const allTransactions = useMemo(() => getTDTransactions(record.receiptNo), [record.receiptNo]);

  const profitSchedule = useMemo(() =>
    getProfitSchedule(
      record.receiptNo,
      record.profitRate,
      record.principalAmount,
      record.openingDate,
      record.maturityDate,
      record.profitFrequency || "At Maturity"
    ), [record]);

  const filteredTxs = useMemo(() => {
    if (downloadPeriod === "all") return allTransactions;
    const now = new Date();
    let boundary: Date;
    if (downloadPeriod === "1year") {
      boundary = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    } else {
      boundary = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    }
    return allTransactions.filter(t => new Date(t.date) >= boundary);
  }, [allTransactions, downloadPeriod]);

  const totalProfitPaid = allTransactions.filter(t => t.type === "Profit Credit").reduce((s, t) => s + t.amount, 0);
  const today = new Date().toISOString().slice(0, 10);
  const matured = record.maturityDate < today;
  const daysLeft = Math.ceil((new Date(record.maturityDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  function handleDownloadTDStatement() {
    if (downloadFormat === "PDF") {
      downloadTDPDF(record, filteredTxs);
    } else {
      downloadTDCSV(record, filteredTxs);
    }
    toast.success(`TD Statement downloaded in ${downloadFormat} format!`);
    setShowDownloadDialog(false);
  }

  const txTypeColor: Record<TDTransaction["type"], string> = {
    "Principal Placed": "text-navy",
    "Profit Credit": "text-success",
    "Renewal": "text-gold",
    "Partial Withdrawal": "text-destructive",
    "Maturity Payout": "text-warning",
  };

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: "term-deposit" }} className="hover:text-navy">Term Deposits</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-mono">{record.receiptNo}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate({ to: "/app/$", params: { _splat: "term-deposit" } })}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold">{record.type}</div>
            <h1 className="font-display text-3xl font-bold text-navy mt-0.5">{record.receiptNo}</h1>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              {record.entity} · {record.branchName} · Linked: {record.linkedAccount}
            </p>
          </div>
        </div>

        {/* Download Dialog */}
        <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
          <DialogTrigger asChild>
            <Button className="bg-navy text-navy-foreground hover:bg-navy/90">
              <Download className="w-4 h-4 mr-2" /> Download Statement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Download TD Statement</DialogTitle>
              <DialogDescription>
                Generate a term deposit statement for <span className="font-mono font-bold">{record.receiptNo}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-3 text-sm">
              <div className="space-y-2">
                <Label htmlFor="td-period">Statement Period</Label>
                <Select value={downloadPeriod} onValueChange={setDownloadPeriod}>
                  <SelectTrigger id="td-period"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last 1 Year</SelectItem>
                    <SelectItem value="all">Full Tenure (All Records)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="td-format">File Format</Label>
                <Select value={downloadFormat} onValueChange={setDownloadFormat}>
                  <SelectTrigger id="td-format"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">
                      <div className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-destructive" /> PDF Statement (.txt)</div>
                    </SelectItem>
                    <SelectItem value="CSV">
                      <div className="flex items-center gap-2"><FileSpreadsheet className="w-3.5 h-3.5 text-success" /> Excel / CSV Spreadsheet (.csv)</div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 rounded bg-muted/40 border text-[11px] text-muted-foreground leading-relaxed">
                <strong>Note:</strong> TD Statements include FDR details, profit payment history, accrued amounts and auto-renewal instruction per BFIU e-reporting standards.
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDownloadDialog(false)}>Cancel</Button>
              <Button onClick={handleDownloadTDStatement} className="bg-navy text-navy-foreground hover:bg-navy/90">
                <Download className="w-4 h-4 mr-2" />
                {downloadFormat === "PDF" ? "Download PDF" : "Download Excel"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* FDR Info Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Principal Amount</div>
          <div className="font-mono text-lg font-bold text-navy">BDT {record.principalAmount?.toLocaleString()}</div>
          <div className="text-[10px] text-muted-foreground mt-1">{record.currency}</div>
        </Card>
        <Card className="p-5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Expected Profit</div>
          <div className="font-mono text-lg font-bold text-gold">BDT {(record.expectedProfit || 0).toLocaleString()}</div>
          <div className="text-[10px] text-muted-foreground mt-1">{record.profitRate}% p.a. · {record.profitFrequency}</div>
        </Card>
        <Card className="p-5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Maturity Date</div>
          <div className="font-mono text-lg font-bold text-navy">{record.maturityDate}</div>
          {!matured ? (
            <div className={`text-[10px] font-semibold mt-1 ${daysLeft <= 30 ? "text-destructive" : daysLeft <= 90 ? "text-warning" : "text-success"}`}>{daysLeft} days remaining</div>
          ) : (
            <div className="text-[10px] text-muted-foreground mt-1">Matured — {record.autoRenewal}</div>
          )}
        </Card>
        <Card className="p-5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Profit Paid to Date</div>
          <div className="font-mono text-lg font-bold text-success">BDT {totalProfitPaid.toLocaleString()}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Paid from {record.openingDate}</div>
        </Card>
      </div>

      {/* FDR Details Card */}
      <Card className="p-6">
        <h2 className="font-display font-semibold text-base text-navy mb-4">FDR Account Details</h2>
        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4 text-xs">
          {[
            { label: "Receipt No", val: record.receiptNo },
            { label: "Deposit Scheme", val: record.type },
            { label: "Entity Name", val: record.entity },
            { label: "Branch", val: record.branchName },
            { label: "Opening Date", val: record.openingDate },
            { label: "Maturity Date", val: record.maturityDate },
            { label: "Tenure", val: `${record.tenureMonths} months` },
            { label: "Principal", val: `BDT ${record.principalAmount?.toLocaleString()}` },
            { label: "Profit Rate", val: `${record.profitRate}% p.a.` },
            { label: "Profit Frequency", val: record.profitFrequency },
            { label: "Auto Renewal", val: record.autoRenewal },
            { label: "Linked Payout Account", val: record.linkedAccount },
          ].map(({ label, val }) => (
            <div key={label}>
              <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</dt>
              <dd className="mt-1 font-semibold text-sm">{val}</dd>
            </div>
          ))}
          {record.remarks && (
            <div className="col-span-2 sm:col-span-3 lg:col-span-4">
              <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Remarks</dt>
              <dd className="mt-1 font-semibold text-sm bg-muted/20 rounded p-2 border">{record.remarks}</dd>
            </div>
          )}
        </dl>
      </Card>

      {/* Tabs: Statement Ledger | Profit Schedule */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="statement" id="td-tab-statement">Statement Ledger</TabsTrigger>
          <TabsTrigger value="schedule" id="td-tab-schedule">Profit Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="statement">
          <Card>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-sm">Transaction Ledger — {record.receiptNo}</h2>
              <Badge variant="outline">{allTransactions.length} entries</Badge>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-[11px] uppercase tracking-wide">Date</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wide">Transaction ID</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wide">Type</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wide">Narration</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wide text-right">Amount (BDT)</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wide text-right">Balance (BDT)</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wide">Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allTransactions.map(t => (
                    <TableRow key={t.id} className="hover:bg-muted/20 text-xs">
                      <TableCell className="font-mono">{t.date}</TableCell>
                      <TableCell className="font-mono text-navy font-semibold">{t.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] font-semibold ${txTypeColor[t.type]} border-current`}>{t.type}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[280px] leading-snug">{t.description}</TableCell>
                      <TableCell className={`text-right font-mono font-semibold ${t.type === "Profit Credit" ? "text-success" : t.type === "Maturity Payout" ? "text-warning" : "text-navy"}`}>
                        {t.type === "Principal Placed" ? "" : t.type === "Maturity Payout" ? "-" : "+"}{t.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono">{t.balanceAfter.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-muted-foreground text-[11px]">{t.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-sm">Profit Payment Schedule — {record.receiptNo}</h2>
              <Badge variant="outline">{profitSchedule.length} period{profitSchedule.length !== 1 ? "s" : ""}</Badge>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-[11px] uppercase tracking-wide">Period</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wide">Due Date</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wide text-right">Profit Amount (BDT)</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wide">Credit Account</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wide">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profitSchedule.map((s, i) => (
                    <TableRow key={i} className="hover:bg-muted/20 text-xs">
                      <TableCell className="font-medium text-navy">{s.period}</TableCell>
                      <TableCell className="font-mono">{s.dueDate}</TableCell>
                      <TableCell className="text-right font-mono font-semibold text-gold">{s.profitAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">{s.creditAccount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={s.status === "Paid" ? "default" : "outline"}
                          className={`text-[10px] ${
                            s.status === "Paid" ? "bg-success/10 text-success border-success" :
                            s.status === "Upcoming" ? "border-gold text-gold" :
                            "border-muted-foreground text-muted-foreground"
                          }`}
                        >
                          {s.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ----------- TD Download Helpers ----------- */

function downloadTDPDF(record: any, txs: TDTransaction[]) {
  let text = `SHAHJALAL ISLAMI BANK PLC\nTERM DEPOSIT (FDR) STATEMENT\n`;
  text += `========================================================================\n`;
  text += `FDR Receipt No : ${record.receiptNo}\n`;
  text += `Deposit Scheme  : ${record.type}\n`;
  text += `Entity Name     : ${record.entity}\n`;
  text += `Branch          : ${record.branchName}\n`;
  text += `Principal Amount: BDT ${record.principalAmount?.toLocaleString()}\n`;
  text += `Profit Rate     : ${record.profitRate}% p.a.\n`;
  text += `Profit Frequency: ${record.profitFrequency}\n`;
  text += `Opening Date    : ${record.openingDate}\n`;
  text += `Maturity Date   : ${record.maturityDate}\n`;
  text += `Linked Account  : ${record.linkedAccount}\n`;
  text += `Auto Renewal    : ${record.autoRenewal}\n`;
  text += `Statement Date  : ${new Date().toLocaleString()}\n`;
  text += `========================================================================\n\n`;
  text += `DATE        TXN ID           TYPE                 AMOUNT           BALANCE\n`;
  text += `------------------------------------------------------------------------\n`;
  txs.forEach(t => {
    const amt = t.amount.toLocaleString().padStart(14);
    const bal = t.balanceAfter.toLocaleString().padStart(14);
    text += `${t.date}  ${t.id.padEnd(16)}  ${t.type.padEnd(20)}  ${amt}  ${bal}\n`;
    text += `           ${t.description}\n`;
    text += `           Ref: ${t.reference}\n\n`;
  });
  const blob = new Blob([text], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `TD_Statement_${record.receiptNo}_${new Date().toISOString().slice(0, 10)}.txt`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadTDCSV(record: any, txs: TDTransaction[]) {
  const headers = `FDR Receipt No,Deposit Scheme,Entity,Branch,Principal (BDT),Profit Rate,Opening Date,Maturity Date\n`;
  const meta = `"${record.receiptNo}","${record.type}","${record.entity}","${record.branchName}",${record.principalAmount},${record.profitRate}%,"${record.openingDate}","${record.maturityDate}"\n\n`;
  const txHeaders = `Date,Transaction ID,Type,Description,Amount (BDT),Running Balance (BDT),Reference\n`;
  const txRows = txs.map(t =>
    `"${t.date}","${t.id}","${t.type}","${t.description.replace(/"/g, '""')}",${t.amount},${t.balanceAfter},"${t.reference}"`
  ).join("\n");
  const blob = new Blob([headers + meta + txHeaders + txRows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `TD_Statement_${record.receiptNo}_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ==================== FUND TRANSFER MODULE ==================== */

const FT_STATUS_MAP: Record<string, string> = {
  Completed: "border-success text-success bg-success/10",
  Approved: "border-success text-success bg-success/10",
  Pending: "border-warning text-warning bg-warning/10",
  Processing: "border-blue-500 text-blue-600 bg-blue-50",
  Scheduled: "border-purple-500 text-purple-600 bg-purple-50",
  Rejected: "border-destructive text-destructive bg-destructive/10",
};

const FT_TYPE_ICONS: Record<string, React.ReactNode> = {
  "Own Account": <ArrowRightLeft className="w-4 h-4" />,
  "Within Bank": <Building2 className="w-4 h-4" />,
  "EFTN": <Send className="w-4 h-4" />,
  "RTGS": <RefreshCw className="w-4 h-4" />,
  "NPSB": <Smartphone className="w-4 h-4" />,
};

function ftStatusBadge(s: string) {
  const cls = FT_STATUS_MAP[s] || "border-muted-foreground text-muted-foreground";
  return <Badge variant="outline" className={cls}>{s}</Badge>;
}

function downloadFTHistoryCSV(rows: FundTransferRecord[]) {
  const headers = `Reference,Date,Transfer Type,From Account,Beneficiary,Beneficiary Bank,Beneficiary A/C,Amount (BDT),Currency,Purpose,Status\n`;
  const dataRows = rows.map(r =>
    `"${r.reference}","${r.date}","${r.transferType}","${r.fromAccount}","${r.beneficiary}","${r.beneficiaryBank}","${r.beneficiaryAccount}",${r.amount},"${r.currency}","${r.purpose}","${r.status}"`
  ).join("\n");
  const blob = new Blob([headers + dataRows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `FundTransfer_History_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ---- Dashboard ---- */
function FundTransferDashboardView() {
  const navigate = useNavigate();
  const allRecords = list("fund-transfer");
  const historyData = getFundTransferHistory();
  const [tab, setTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // KPI aggregates
  const completed = allRecords.filter(r => r.status === "Approved" || r.status === "Completed");
  const pending = allRecords.filter(r => r.status === "Pending");
  const scheduled = allRecords.filter(r => r.status === "Scheduled");
  const rejected = allRecords.filter(r => r.status === "Rejected");
  const totalMTD = completed.reduce((s, r) => s + Number(r.amount || 0), 0);

  // Type breakdown for pie summary
  const typeBreakdown = ["Own Account", "Within Bank", "EFTN", "RTGS", "NPSB"].map(type => ({
    type,
    count: allRecords.filter(r => r.transferType === type).length,
    amount: allRecords.filter(r => r.transferType === type).reduce((s, r) => s + Number(r.amount || 0), 0),
  }));

  // Filtered history view
  const filteredHistory = useMemo(() => {
    let rows = historyData;
    if (tab !== "all" && tab !== "scheduled") rows = rows.filter(r => r.transferType === tab);
    if (tab === "scheduled") rows = rows.filter(r => r.status === "Scheduled");
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rows = rows.filter(r =>
        r.reference.toLowerCase().includes(q) ||
        r.beneficiary.toLowerCase().includes(q) ||
        r.beneficiaryBank.toLowerCase().includes(q) ||
        r.beneficiaryAccount.includes(q) ||
        r.purpose.toLowerCase().includes(q)
      );
    }
    if (dateFrom) rows = rows.filter(r => r.date >= dateFrom);
    if (dateTo) rows = rows.filter(r => r.date <= dateTo);
    return rows;
  }, [historyData, tab, searchQuery, dateFrom, dateTo]);

  const quickActions = [
    { label: "Own Account", icon: ArrowRightLeft, sub: "Between your accounts", color: "from-navy/80 to-navy", type: "own" },
    { label: "Within Bank", icon: Building2, sub: "Other SJIBL account", color: "from-blue-700 to-blue-800", type: "within" },
    { label: "EFTN", icon: Send, sub: "Interbank BEFTN", color: "from-indigo-600 to-indigo-700", type: "eftn" },
    { label: "RTGS", icon: RefreshCw, sub: "High value RTGS", color: "from-violet-600 to-violet-700", type: "rtgs" },
    { label: "NPSB", icon: Smartphone, sub: "National payment switch", color: "from-purple-600 to-purple-700", type: "npsb" },
    { label: "Schedule", icon: AlarmClock, sub: "Future dated / recurring", color: "from-gold/80 to-amber-600", type: "schedule" },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Fund Transfer</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg navy-gradient text-navy-foreground grid place-items-center shrink-0">
            <Send className="w-6 h-6 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold">Transfers</div>
            <h1 className="font-display text-3xl mt-0.5">Fund Transfer</h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Initiate Own Account, Within Bank, EFTN, RTGS, or NPSB transfers with Maker-Checker approval.
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={() => downloadFTHistoryCSV(filteredHistory)}>
            <FileSpreadsheet className="w-4 h-4" /> Export CSV
          </Button>
          <Button
            className="bg-navy text-navy-foreground hover:bg-navy/90"
            onClick={() => navigate({ to: "/app/$", params: { _splat: "fund-transfer/new/own" } })}
          >
            <Plus className="w-4 h-4" /> New Transfer
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-success">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Total Transferred (MTD)</div>
          <div className="font-display text-2xl mt-2 text-success">BDT {totalMTD.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">{completed.length} transactions</div>
        </Card>
        <Card className="p-5 border-l-4 border-l-warning">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Pending Approval</div>
          <div className={`font-display text-2xl mt-2 ${pending.length > 0 ? "text-warning" : ""}`}>{pending.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Awaiting checker action</div>
        </Card>
        <Card className="p-5 border-l-4 border-l-purple-500">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Scheduled</div>
          <div className="font-display text-2xl mt-2 text-purple-600">{scheduled.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Future-dated transfers</div>
        </Card>
        <Card className="p-5 border-l-4 border-l-destructive">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Rejected</div>
          <div className={`font-display text-2xl mt-2 ${rejected.length > 0 ? "text-destructive" : ""}`}>{rejected.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Requires resubmission</div>
        </Card>
      </div>

      {/* Quick Action Buttons */}
      <div>
        <h2 className="font-display text-lg mb-3">Initiate Transfer</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map(qa => (
            <button
              key={qa.type}
              onClick={() => navigate({ to: "/app/$", params: { _splat: `fund-transfer/new/${qa.type}` } })}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br ${qa.color} text-white hover:opacity-90 transition-all hover:scale-105 shadow-sm cursor-pointer`}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 grid place-items-center">
                <qa.icon className="w-5 h-5" />
              </div>
              <div className="text-sm font-semibold">{qa.label}</div>
              <div className="text-xs opacity-80 text-center leading-tight">{qa.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Transfer Type Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {typeBreakdown.map(tb => (
          <Card key={tb.type} className="p-4 hover:border-gold/40 transition-colors cursor-pointer" onClick={() => setTab(tb.type.toLowerCase().replace(" ", "-"))}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-navy">{FT_TYPE_ICONS[tb.type]}</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{tb.type}</span>
            </div>
            <div className="font-display text-xl">{tb.count}</div>
            <div className="text-xs text-muted-foreground mt-1">BDT {(tb.amount / 1000).toFixed(0)}K</div>
          </Card>
        ))}
      </div>

      {/* History Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-navy">
            <History className="w-4 h-4" />
            <span className="font-semibold">Transfer History</span>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search transfers…"
                className="pl-8 h-8 w-48 text-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Input type="date" className="h-8 w-36 text-sm" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
            <Input type="date" className="h-8 w-36 text-sm" value={dateTo} onChange={e => setDateTo(e.target.value)} />
            <Button variant="outline" size="sm" onClick={() => downloadFTHistoryCSV(filteredHistory)}>
              <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
            </Button>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <div className="px-4 pt-2 border-b border-border bg-muted/30">
            <TabsList className="h-auto bg-transparent gap-0">
              {[
                { value: "all", label: "All" },
                { value: "Own Account", label: "Own Account" },
                { value: "Within Bank", label: "Within Bank" },
                { value: "EFTN", label: "EFTN" },
                { value: "RTGS", label: "RTGS" },
                { value: "NPSB", label: "NPSB" },
                { value: "scheduled", label: "Scheduled" },
              ].map(t => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-navy data-[state=active]:bg-transparent px-4 py-2 text-sm"
                >
                  {t.label}
                  {t.value === "scheduled" && scheduled.length > 0 && (
                    <span className="ml-1.5 bg-purple-100 text-purple-700 text-xs px-1.5 py-0.5 rounded-full">{scheduled.length}</span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={tab} className="m-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead>Reference</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Beneficiary</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Amount (BDT)</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center text-sm text-muted-foreground py-10">
                      No transfer records found.
                    </TableCell>
                  </TableRow>
                ) : filteredHistory.map(r => (
                  <TableRow key={r.id} className="hover:bg-muted/20">
                    <TableCell className="font-mono text-xs text-gold font-semibold">{r.reference}</TableCell>
                    <TableCell className="text-sm">{r.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span className="text-navy">{FT_TYPE_ICONS[r.transferType]}</span>
                        <span className="text-sm">{r.transferType}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{r.beneficiary}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.beneficiaryBank}</TableCell>
                    <TableCell className="font-mono text-xs">{r.beneficiaryAccount}</TableCell>
                    <TableCell className="text-right font-mono text-sm font-semibold">{r.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.purpose}</TableCell>
                    <TableCell>{ftStatusBadge(r.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/app/$" params={{ _splat: `fund-transfer/view/${r.id}` }}>
                          <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>

        {/* Footer summary */}
        <div className="p-3 border-t border-border bg-muted/10 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{filteredHistory.length} records shown</span>
          <span className="text-xs font-semibold text-navy">
            Total: BDT {filteredHistory.reduce((s, r) => s + r.amount, 0).toLocaleString()}
          </span>
        </div>
      </Card>

      {/* Shariah Note */}
      <Card className="p-5 bg-gold/[0.06] border-gold/30">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div>
            <div className="font-medium">Shariah-Compliant Fund Transfer</div>
            <p className="text-sm text-muted-foreground mt-1">
              All fund transfers are subject to Maker-Checker approval workflow in accordance with SJIBL's dual-control policy.
              RTGS and EFTN transactions follow Bangladesh Bank guidelines. No ribā-based instruments are processed.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ---- Transfer Form ---- */
function FundTransferFormView({ transferType }: { transferType: string }) {
  const navigate = useNavigate();

  const searchParams = useMemo(() => {
    return typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  }, []);

  const typeMap: Record<string, string> = {
    own: "Own Account", within: "Within Bank", eftn: "EFTN", rtgs: "RTGS", npsb: "NPSB", schedule: "EFTN"
  };
  const initialType = typeMap[transferType] || "EFTN";
  const isSchedule = transferType === "schedule";

  const [selectedType, setSelectedType] = useState(initialType);
  const [fromAccount, setFromAccount] = useState(OWN_ACCOUNTS[0].id);
  const [toAccount, setToAccount] = useState(OWN_ACCOUNTS[1].id); // for own account
  const [beneficiary, setBeneficiary] = useState(searchParams?.get("beneficiary") || "");
  const [beneficiaryAccount, setBeneficiaryAccount] = useState(searchParams?.get("account") || "");
  const [beneficiaryBank, setBeneficiaryBank] = useState(searchParams?.get("bank") || "");
  const [beneficiaryBranch, setBeneficiaryBranch] = useState(searchParams?.get("branch") || "");
  const [routingNo, setRoutingNo] = useState(searchParams?.get("routing") || "");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(searchParams?.get("currency") || "BDT");
  const [purpose, setPurpose] = useState("");
  const [narration, setNarration] = useState("");
  const [remarks, setRemarks] = useState("");
  const [scheduleEnabled, setScheduleEnabled] = useState(isSchedule);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("10:00");
  const [frequency, setFrequency] = useState("One-time");
  const [step, setStep] = useState(1); // 1=form, 2=review, 3=submitted
  const [submitting, setSubmitting] = useState(false);

  const isOwnAccount = selectedType === "Own Account";
  const isWithinBank = selectedType === "Within Bank";
  const isInterBank = ["EFTN", "RTGS", "NPSB"].includes(selectedType);

  const typeInfo: Record<string, { maxAmount: string; cutoff: string; settlement: string }> = {
    "EFTN": { maxAmount: "No limit (under BDT 1 Cr)", cutoff: "Cut-off: 3:30 PM", settlement: "T+1 business day" },
    "RTGS": { maxAmount: "Min BDT 1 Lac", cutoff: "Cut-off: 4:00 PM", settlement: "Real-time gross settlement" },
    "NPSB": { maxAmount: "Max BDT 2 Lac per transaction", cutoff: "Cut-off: 24×7", settlement: "Near real-time" },
    "Own Account": { maxAmount: "No limit", cutoff: "Available 24×7", settlement: "Immediate" },
    "Within Bank": { maxAmount: "No limit", cutoff: "Available 24×7", settlement: "Immediate" },
  };
  const info = typeInfo[selectedType];

  const fromAccObj = OWN_ACCOUNTS.find(a => a.id === fromAccount);
  const toAccObj = OWN_ACCOUNTS.find(a => a.id === toAccount);

  function handleSubmit() {
    if (!amount || parseFloat(amount) <= 0) { toast.error("Please enter a valid amount."); return; }
    if (isOwnAccount && fromAccount === toAccount) { toast.error("Source and destination accounts must be different."); return; }
    if (!isOwnAccount && !beneficiary.trim()) { toast.error("Please enter beneficiary name."); return; }
    if (!isOwnAccount && !beneficiaryAccount.trim()) { toast.error("Please enter beneficiary account number."); return; }
    if (isInterBank && !beneficiaryBank) { toast.error("Please select the beneficiary bank."); return; }
    if (!purpose) { toast.error("Please select a transfer purpose."); return; }
    if (scheduleEnabled && !scheduledDate) { toast.error("Please select a scheduled date."); return; }
    setStep(2);
  }

  function handleConfirm() {
    setSubmitting(true);
    setTimeout(() => {
      const { create } = require("@/lib/moduleStore") as typeof import("@/lib/moduleStore");
      const ref = `FT-${Date.now().toString().slice(-6)}`;
      create("fund-transfer", {
        reference: ref,
        transferType: selectedType,
        fromAccount: fromAccObj?.label || fromAccount,
        toAccount: isOwnAccount ? (toAccObj?.label || toAccount) : "",
        beneficiary: isOwnAccount ? (toAccObj?.label || `Own — ${toAccount}`) : beneficiary,
        beneficiaryAccount: isOwnAccount ? toAccount : beneficiaryAccount,
        beneficiaryBank: isOwnAccount ? "SJIBL" : (isWithinBank ? "SJIBL" : beneficiaryBank),
        beneficiaryBranch,
        routingNo,
        amount: parseFloat(amount),
        currency,
        purpose,
        narration,
        remarks,
        valueDate: scheduleEnabled ? scheduledDate : new Date().toISOString().slice(0, 10),
        scheduledDate: scheduleEnabled ? scheduledDate : undefined,
        scheduledTime: scheduleEnabled ? scheduledTime : undefined,
        frequency: scheduleEnabled ? frequency : undefined,
        status: scheduleEnabled ? "Scheduled" : "Pending",
      });
      setSubmitting(false);
      setStep(3);
    }, 1200);
  }

  if (step === 3) {
    return (
      <div className="space-y-6">
        <nav className="text-xs text-muted-foreground flex items-center gap-1">
          <Link to="/app" className="hover:text-navy">Dashboard</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/app/$" params={{ _splat: "fund-transfer" }} className="hover:text-navy">Fund Transfer</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">Transfer Submitted</span>
        </nav>
        <Card className="max-w-lg mx-auto p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-success/15 grid place-items-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h2 className="font-display text-2xl">Transfer Submitted</h2>
          <p className="text-sm text-muted-foreground">
            Your {selectedType} transfer of <span className="font-semibold text-foreground">BDT {parseFloat(amount).toLocaleString()}</span> has been submitted successfully.
            {scheduleEnabled
              ? ` It is scheduled for ${scheduledDate} at ${scheduledTime} (${frequency}).`
              : " It is now pending Checker approval."}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button variant="outline" onClick={() => navigate({ to: "/app/$", params: { _splat: "fund-transfer" } })}>
              View History
            </Button>
            <Button className="bg-navy text-navy-foreground hover:bg-navy/90" onClick={() => navigate({ to: "/app/$", params: { _splat: "approval" } })}>
              Go to Approvals
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-6">
        <nav className="text-xs text-muted-foreground flex items-center gap-1">
          <Link to="/app" className="hover:text-navy">Dashboard</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/app/$" params={{ _splat: "fund-transfer" }} className="hover:text-navy">Fund Transfer</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">Review & Confirm</span>
        </nav>
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div>
            <h1 className="font-display text-2xl">Review Transfer</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Please verify all details before confirming.</p>
          </div>
        </div>

        <Card className="max-w-2xl divide-y divide-border">
          <div className="p-4 bg-navy/5">
            <div className="flex items-center gap-2">
              <span className="text-navy">{FT_TYPE_ICONS[selectedType]}</span>
              <span className="font-semibold">{selectedType} Transfer</span>
              <Badge variant="outline" className="ml-auto border-warning text-warning">Pending Approval</Badge>
            </div>
          </div>
          {[
            { label: "From Account", value: fromAccObj?.label || fromAccount },
            isOwnAccount
              ? { label: "To Account", value: toAccObj?.label || toAccount }
              : { label: "Beneficiary", value: beneficiary },
            !isOwnAccount && { label: "Beneficiary Account", value: beneficiaryAccount },
            !isOwnAccount && !isWithinBank && { label: "Beneficiary Bank", value: beneficiaryBank },
            !isOwnAccount && beneficiaryBranch && { label: "Branch", value: beneficiaryBranch },
            !isOwnAccount && routingNo && { label: "Routing No.", value: routingNo },
            { label: "Amount", value: `${currency} ${parseFloat(amount).toLocaleString()}` },
            { label: "Purpose", value: purpose },
            narration && { label: "Narration", value: narration },
            scheduleEnabled && { label: "Scheduled Date", value: scheduledDate },
            scheduleEnabled && { label: "Scheduled Time", value: scheduledTime },
            scheduleEnabled && { label: "Frequency", value: frequency },
            remarks && { label: "Remarks", value: remarks },
          ].filter(Boolean).map((row: any) => (
            <div key={row.label} className="flex items-start gap-4 px-4 py-3">
              <div className="w-44 text-sm text-muted-foreground shrink-0">{row.label}</div>
              <div className="text-sm font-medium">{row.value}</div>
            </div>
          ))}
        </Card>

        <Card className="max-w-2xl p-4 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              This transfer will be submitted for Checker approval before processing. The Checker will receive an email notification.
            </p>
          </div>
        </Card>

        <div className="flex gap-3 max-w-2xl">
          <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Edit Transfer</Button>
          <Button
            className="flex-1 bg-navy text-navy-foreground hover:bg-navy/90"
            disabled={submitting}
            onClick={handleConfirm}
          >
            {submitting ? <><RefreshCw className="w-4 h-4 animate-spin" /> Processing…</> : <><Check className="w-4 h-4" /> Confirm & Submit</>}
          </Button>
        </div>
      </div>
    );
  }

  // Step 1: Form
  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: "fund-transfer" }} className="hover:text-navy">Fund Transfer</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">New Transfer</span>
      </nav>

      <div className="flex items-start gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/app/$" params={{ _splat: "fund-transfer" }}><ArrowLeft className="w-4 h-4" /> Back</Link>
        </Button>
        <div>
          <h1 className="font-display text-2xl">New Fund Transfer</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Fill in transfer details. All submissions go through Maker-Checker approval.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Transfer Type Selector */}
          <Card className="p-5">
            <h2 className="font-semibold mb-3 flex items-center gap-2"><ArrowRightLeft className="w-4 h-4 text-gold" /> Transfer Type</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {["Own Account", "Within Bank", "EFTN", "RTGS", "NPSB"].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                    selectedType === type
                      ? "border-gold bg-gold/10 text-navy"
                      : "border-border text-muted-foreground hover:border-gold/50"
                  }`}
                >
                  <span className={selectedType === type ? "text-navy" : "text-muted-foreground"}>
                    {FT_TYPE_ICONS[type]}
                  </span>
                  {type}
                </button>
              ))}
            </div>
          </Card>

          {/* From / To Accounts */}
          <Card className="p-5 space-y-4">
            <h2 className="font-semibold flex items-center gap-2"><Wallet className="w-4 h-4 text-gold" /> Account Details</h2>

            <div>
              <Label className="text-sm mb-1.5 block">From Account *</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OWN_ACCOUNTS.map(a => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.label} — Balance: {a.currency} {a.balance.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isOwnAccount ? (
              <div>
                <Label className="text-sm mb-1.5 block">To Account *</Label>
                <Select value={toAccount} onValueChange={setToAccount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OWN_ACCOUNTS.filter(a => a.id !== fromAccount).map(a => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.label} — Balance: {a.currency} {a.balance.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm mb-1.5 block">Beneficiary Name *</Label>
                  <Input placeholder="e.g. Globex Industries Ltd" value={beneficiary} onChange={e => setBeneficiary(e.target.value)} />
                </div>
                <div>
                  <Label className="text-sm mb-1.5 block">Beneficiary Account No. *</Label>
                  <Input placeholder="Account number" value={beneficiaryAccount} onChange={e => setBeneficiaryAccount(e.target.value)} />
                </div>
                {isWithinBank ? (
                  <div className="sm:col-span-2">
                    <Label className="text-sm mb-1.5 block">Beneficiary Branch (SJIBL)</Label>
                    <Input placeholder="e.g. Motijheel, Gulshan, Dhanmondi" value={beneficiaryBranch} onChange={e => setBeneficiaryBranch(e.target.value)} />
                  </div>
                ) : (
                  <>
                    <div>
                      <Label className="text-sm mb-1.5 block">Beneficiary Bank *</Label>
                      <Select value={beneficiaryBank} onValueChange={setBeneficiaryBank}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bank…" />
                        </SelectTrigger>
                        <SelectContent>
                          {BANGLADESH_BANKS.map(b => (
                            <SelectItem key={b} value={b}>{b}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm mb-1.5 block">Branch</Label>
                      <Input placeholder="Branch name" value={beneficiaryBranch} onChange={e => setBeneficiaryBranch(e.target.value)} />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-sm mb-1.5 block">Bank Routing No.</Label>
                      <Input placeholder="9-digit routing number" value={routingNo} onChange={e => setRoutingNo(e.target.value)} />
                    </div>
                  </>
                )}
              </div>
            )}
          </Card>

          {/* Amount & Purpose */}
          <Card className="p-5 space-y-4">
            <h2 className="font-semibold flex items-center gap-2"><DollarSign className="w-4 h-4 text-gold" /> Amount & Purpose</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Label className="text-sm mb-1.5 block">Transfer Amount *</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  min="1"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="text-lg font-mono"
                />
                {amount && !isNaN(parseFloat(amount)) && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {parseFloat(amount).toLocaleString("en-BD", { minimumFractionDigits: 2 })} {currency}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-sm mb-1.5 block">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BDT">BDT — Taka</SelectItem>
                    <SelectItem value="USD">USD — US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR — Euro</SelectItem>
                    <SelectItem value="GBP">GBP — Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-3">
                <Label className="text-sm mb-1.5 block">Purpose *</Label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger><SelectValue placeholder="Select purpose…" /></SelectTrigger>
                  <SelectContent>
                    {TRANSFER_PURPOSES.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-3">
                <Label className="text-sm mb-1.5 block">Narration / Payment Details</Label>
                <Input placeholder="Brief description for beneficiary's statement" value={narration} onChange={e => setNarration(e.target.value)} />
              </div>
              <div className="sm:col-span-3">
                <Label className="text-sm mb-1.5 block">Internal Remarks (optional)</Label>
                <Input placeholder="Notes for Checker (not visible to beneficiary)" value={remarks} onChange={e => setRemarks(e.target.value)} />
              </div>
            </div>
          </Card>

          {/* Schedule Options */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2"><AlarmClock className="w-4 h-4 text-gold" /> Schedule Transfer</h2>
              <button
                onClick={() => setScheduleEnabled(!scheduleEnabled)}
                className={`relative w-11 h-6 rounded-full transition-colors ${scheduleEnabled ? "bg-navy" : "bg-muted-foreground/30"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${scheduleEnabled ? "translate-x-5" : ""}`} />
              </button>
            </div>
            {scheduleEnabled && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <Label className="text-sm mb-1.5 block">Scheduled Date *</Label>
                  <Input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} min={new Date().toISOString().slice(0, 10)} />
                </div>
                <div>
                  <Label className="text-sm mb-1.5 block">Time</Label>
                  <Input type="time" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)} />
                </div>
                <div>
                  <Label className="text-sm mb-1.5 block">Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="One-time">One-time</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Fortnightly">Fortnightly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {!scheduleEnabled && (
              <p className="text-sm text-muted-foreground">Transfer will be processed on today's value date after Checker approval.</p>
            )}
          </Card>

          {/* Submit */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" asChild>
              <Link to="/app/$" params={{ _splat: "fund-transfer" }}>Cancel</Link>
            </Button>
            <Button className="flex-1 bg-navy text-navy-foreground hover:bg-navy/90" onClick={handleSubmit}>
              <Send className="w-4 h-4" /> Review & Submit
            </Button>
          </div>
        </div>

        {/* Right Sidebar Info */}
        <div className="space-y-4">
          {/* Transfer type info card */}
          <Card className="p-4 bg-navy/5 border-navy/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-navy">{FT_TYPE_ICONS[selectedType]}</span>
              <span className="font-semibold text-navy">{selectedType}</span>
            </div>
            {info && (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">{info.maxAmount}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">{info.cutoff}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">{info.settlement}</span>
                </div>
              </div>
            )}
          </Card>

          {/* Approval workflow info */}
          <Card className="p-4 border-gold/30 bg-gold/5">
            <div className="text-xs font-semibold text-gold uppercase tracking-wide mb-3">Approval Workflow</div>
            <div className="space-y-3">
              {[
                { step: 1, label: "Maker Submits", desc: "You initiate the transfer" },
                { step: 2, label: "Checker Reviews", desc: "Authorised checker approves" },
                { step: 3, label: "Bank Processes", desc: "Transfer sent to settlement" },
              ].map(s => (
                <div key={s.step} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-gold/20 text-gold text-xs grid place-items-center font-bold shrink-0 mt-0.5">{s.step}</div>
                  <div>
                    <div className="text-xs font-medium">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Shariah note */}
          <Card className="p-4 border-success/30 bg-success/5">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-success shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-success mb-1">Shariah Notice</div>
                <p className="text-xs text-muted-foreground">
                  Fund transfers under SJIBL are processed on a fee-based (Ujrah) model. No ribā-based interest is charged on transactions.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---- Transfer Detail View ---- */
function FundTransferDetailView({ record }: { record: any }) {
  const statusTimeline = [
    { label: "Initiated", done: true, desc: `Submitted by ${record.maker || "Maker"}` },
    { label: "Pending Approval", done: record.status !== "Pending", desc: "Awaiting Checker review" },
    { label: "Processing", done: ["Approved", "Completed", "Scheduled"].includes(record.status), desc: "Sent to Bangladesh Bank settlement" },
    { label: record.status === "Scheduled" ? "Scheduled" : "Completed", done: record.status === "Approved" || record.status === "Completed" || record.status === "Scheduled", desc: record.status === "Scheduled" ? `Scheduled: ${record.scheduledDate || "—"}` : "Transfer completed successfully" },
  ];

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: "fund-transfer" }} className="hover:text-navy">Fund Transfer</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{record.reference || record.id}</span>
      </nav>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/app/$" params={{ _splat: "fund-transfer" }}><ArrowLeft className="w-4 h-4" /> Back</Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-navy">{FT_TYPE_ICONS[record.transferType as string] || <Send className="w-4 h-4" />}</span>
              <h1 className="font-display text-2xl">{record.transferType} Transfer</h1>
              {ftStatusBadge(record.status)}
            </div>
            <p className="text-sm text-muted-foreground">Reference: <span className="font-mono font-semibold text-gold">{record.reference || record.id}</span></p>
          </div>
        </div>
        <Button variant="outline" onClick={() => {
          const data = [record as FundTransferRecord];
          downloadFTHistoryCSV(data);
        }}>
          <FileSpreadsheet className="w-4 h-4" /> Export
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Transfer Details Card */}
          <Card className="divide-y divide-border">
            <div className="p-4 bg-muted/20">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Transfer Details</span>
            </div>
            {[
              { label: "Transfer Reference", value: record.reference || record.id, mono: true },
              { label: "Transfer Type", value: record.transferType },
              { label: "Value Date", value: record.valueDate || record.createdAt?.slice(0, 10) },
              { label: "From Account", value: record.fromAccount },
              record.transferType === "Own Account"
                ? { label: "To Account", value: record.toAccount }
                : { label: "Beneficiary Name", value: record.beneficiary },
              { label: "Beneficiary Account", value: record.beneficiaryAccount, mono: true },
              { label: "Beneficiary Bank", value: record.beneficiaryBank || "—" },
              record.beneficiaryBranch && { label: "Beneficiary Branch", value: record.beneficiaryBranch },
              record.routingNo && { label: "Bank Routing No.", value: record.routingNo, mono: true },
              { label: "Currency", value: record.currency || "BDT" },
              { label: "Amount", value: `${record.currency || "BDT"} ${Number(record.amount || 0).toLocaleString()}`, bold: true },
              { label: "Purpose", value: record.purpose || "—" },
              record.narration && { label: "Narration", value: record.narration },
              record.remarks && { label: "Remarks", value: record.remarks },
              record.scheduledDate && { label: "Scheduled Date", value: record.scheduledDate },
              record.scheduledTime && { label: "Scheduled Time", value: record.scheduledTime },
              record.frequency && { label: "Frequency", value: record.frequency },
            ].filter(Boolean).map((row: any) => (
              <div key={row.label} className="flex items-start gap-4 px-4 py-3">
                <div className="w-44 text-sm text-muted-foreground shrink-0">{row.label}</div>
                <div className={`text-sm flex-1 ${row.mono ? "font-mono" : ""} ${row.bold ? "font-bold text-navy text-base" : "font-medium"}`}>{row.value}</div>
              </div>
            ))}
          </Card>

          {/* Audit info */}
          <Card className="divide-y divide-border">
            <div className="p-4 bg-muted/20">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Audit Trail</span>
            </div>
            {[
              { label: "Record ID", value: record.id, mono: true },
              { label: "Created", value: record.createdAt ? new Date(record.createdAt).toLocaleString() : "—" },
              { label: "Last Updated", value: record.updatedAt ? new Date(record.updatedAt).toLocaleString() : "—" },
              { label: "Status", value: record.status },
            ].map(row => (
              <div key={row.label} className="flex items-start gap-4 px-4 py-3">
                <div className="w-44 text-sm text-muted-foreground shrink-0">{row.label}</div>
                <div className={`text-sm font-medium ${(row as any).mono ? "font-mono" : ""}`}>{row.value}</div>
              </div>
            ))}
          </Card>
        </div>

        {/* Right: Status Timeline */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Transfer Status</div>
            <div className="space-y-0">
              {statusTimeline.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full grid place-items-center shrink-0 ${
                      record.status === "Rejected" && i === 1
                        ? "bg-destructive text-white"
                        : s.done ? "bg-success text-white" : "bg-muted border-2 border-border"
                    }`}>
                      {record.status === "Rejected" && i === 1 ? (
                        <X className="w-3 h-3" />
                      ) : s.done ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3 text-muted-foreground" />
                      )}
                    </div>
                    {i < statusTimeline.length - 1 && (
                      <div className={`w-0.5 h-8 ${s.done ? "bg-success" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className={`text-sm font-medium ${s.done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick actions */}
          <Card className="p-4 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Actions</div>
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link to="/app/$" params={{ _splat: "approval" }}>
                <CheckCircle2 className="w-4 h-4 text-gold" /> View Approval Queue
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => navigate({ to: "/app/$", params: { _splat: `fund-transfer/new/${(record.transferType as string || "eftn").toLowerCase().replace(" ", "")}` } })}
            >
              <RefreshCw className="w-4 h-4 text-navy" /> Repeat Transfer
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => downloadFTHistoryCSV([record as FundTransferRecord])}>
              <FileSpreadsheet className="w-4 h-4" /> Download Advice
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}


/* ===================== BENEFICIARY VIEWS ===================== */

function BeneficiaryDashboardView() {
  const beneficiaries = list("beneficiary");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const totalCount = beneficiaries.length;
  const withinBankCount = beneficiaries.filter((b: any) => b.type === "Within Bank").length;
  const otherBankCount = beneficiaries.filter((b: any) => b.type === "Other Bank (EFTN/RTGS/NPSB)").length;
  const foreignCount = beneficiaries.filter((b: any) => b.type === "Foreign (SWIFT)").length;
  const pendingCount = beneficiaries.filter((b: any) => b.status === "Pending").length;

  const filtered = useMemo(() => {
    let list = [...beneficiaries];
    
    // Type Filter
    if (tab === "within") {
      list = list.filter(b => b.type === "Within Bank");
    } else if (tab === "other") {
      list = list.filter(b => b.type === "Other Bank (EFTN/RTGS/NPSB)");
    } else if (tab === "foreign") {
      list = list.filter(b => b.type === "Foreign (SWIFT)");
    }

    // Status Filter
    if (statusFilter !== "all") {
      list = list.filter(b => String(b.status).toLowerCase() === statusFilter.toLowerCase());
    }

    // Search Query
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(b => 
        String(b.name || "").toLowerCase().includes(q) ||
        String(b.nickname || "").toLowerCase().includes(q) ||
        String(b.account || "").toLowerCase().includes(q) ||
        String(b.bankName || "").toLowerCase().includes(q) ||
        String(b.branch || "").toLowerCase().includes(q)
      );
    }
    
    return list;
  }, [beneficiaries, tab, statusFilter, query]);

  function getInitials(name: string) {
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function getTransferLink(b: any) {
    const params = new URLSearchParams();
    params.set("beneficiary", b.name);
    params.set("account", b.account);
    params.set("bank", b.bankName);
    params.set("branch", b.branch || "");
    params.set("routing", b.swiftCode || b.routingNo || "");
    params.set("currency", b.currency || "BDT");
    
    let path = "eftn";
    if (b.type === "Within Bank") {
      path = "within";
    } else if (b.type === "Foreign (SWIFT)") {
      path = "foreign";
    } else {
      path = "eftn";
    }
    return `/app/fund-transfer/new/${path}?${params.toString()}`;
  }

  function handleDelete(id: string) {
    remove("beneficiary", id);
    toast.success("Beneficiary removed successfully");
    navigate({ to: "/app/$", params: { _splat: "beneficiary" } });
  }

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-semibold">Beneficiary Management</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">Payments & Transfers</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Beneficiary Management</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Maintain your beneficiary directory for fast transfers. Added entries require Maker–Checker authorization.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="bg-navy text-navy-foreground hover:bg-navy/90">
            <Link to="/app/$" params={{ _splat: "beneficiary/new" }}>
              <Plus className="w-4 h-4 mr-2" /> Add Beneficiary
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-5 flex flex-col justify-between">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Total Beneficiaries</div>
          <div className="font-display text-2xl font-bold text-navy mt-2">{totalCount}</div>
        </Card>
        <Card className="p-5 flex flex-col justify-between">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Within SJIBL</div>
          <div className="font-display text-2xl font-bold text-gold mt-2">{withinBankCount}</div>
        </Card>
        <Card className="p-5 flex flex-col justify-between">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Other Banks</div>
          <div className="font-display text-2xl font-bold text-foreground mt-2">{otherBankCount}</div>
        </Card>
        <Card className="p-5 flex flex-col justify-between">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Foreign Payees</div>
          <div className="font-display text-2xl font-bold text-foreground mt-2">{foreignCount}</div>
        </Card>
        <Card className="p-5 flex flex-col justify-between col-span-2 lg:col-span-1 bg-gold/[0.04] border-gold/30">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Pending Action</div>
          <div className={`font-display text-2xl font-bold mt-2 ${pendingCount > 0 ? "text-warning animate-pulse" : "text-success"}`}>
            {pendingCount}
          </div>
        </Card>
      </div>

      {/* Search & Filter section */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 min-w-[280px] max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search beneficiary name, account, bank..."
                className="pl-9 w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Tabs list */}
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <div className="bg-card p-1.5 rounded-lg border border-border inline-flex">
          <TabsList>
            <TabsTrigger value="all">All Payees</TabsTrigger>
            <TabsTrigger value="within">Within SJIBL</TabsTrigger>
            <TabsTrigger value="other">Other Banks</TabsTrigger>
            <TabsTrigger value="foreign">Foreign SWIFT</TabsTrigger>
          </TabsList>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wide">Beneficiary</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wide">Account Number</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wide">Bank / Branch</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wide">Currency</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wide">Status</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wide text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-10">
                      No beneficiaries found matching the criteria.{" "}
                      <Link to="/app/$" params={{ _splat: "beneficiary/new" }} className="text-gold hover:underline font-semibold">
                        Add a new beneficiary
                      </Link>
                    </TableCell>
                  </TableRow>
                ) : filtered.map((b) => (
                  <TableRow key={b.id} className="hover:bg-muted/10">
                    <TableCell>
                      <div className="w-8 h-8 rounded-full bg-navy/10 text-navy font-bold flex items-center justify-center text-xs">
                        {getInitials(String(b.name || ""))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Link to="/app/$" params={{ _splat: `beneficiary/view/${b.id}` }} className="font-semibold text-navy hover:text-gold block text-sm">
                          {String(b.name)}
                        </Link>
                        {b.nickname && (
                          <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-medium mt-0.5 inline-block">
                            {String(b.nickname)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-semibold text-foreground">
                      {String(b.account)}
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-medium text-foreground">{String(b.bankName)}</div>
                      {b.branch && <div className="text-[10px] text-muted-foreground">{String(b.branch)}</div>}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={b.currency === "BDT" ? "bg-navy/5 text-navy border-navy/20" : "bg-gold/5 text-gold border-gold/20"}>
                        {String(b.currency || "BDT")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {statusBadge(String(b.status))}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5 items-center">
                        {b.status === "Approved" ? (
                          <Button size="sm" className="bg-gold text-gold-foreground hover:bg-gold/90 text-xs gap-1 h-8 px-2.5" asChild>
                            <Link to="/app/$" params={{ _splat: getTransferLink(b).replace("/app/fund-transfer/new/", "fund-transfer/new/") }}>
                              <Send className="w-3 h-3" /> Pay
                            </Link>
                          </Button>
                        ) : (
                          <Button size="sm" variant="ghost" disabled className="text-xs h-8 px-2.5 gap-1">
                            <Clock className="w-3 h-3" /> Locked
                          </Button>
                        )}

                        <Button size="sm" variant="ghost" className="h-8 px-2" asChild>
                          <Link to="/app/$" params={{ _splat: `beneficiary/view/${b.id}` }}>
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        </Button>

                        <Button size="sm" variant="ghost" className="h-8 px-2" asChild>
                          <Link to="/app/$" params={{ _splat: `beneficiary/edit/${b.id}` }}>
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 px-2">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove Beneficiary?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove <span className="font-semibold text-foreground">{String(b.name)}</span> from your payee list?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(b.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </Tabs>
    </div>
  );
}

function BeneficiaryDetailView({ record }: { record: any }) {
  const navigate = useNavigate();
  const session = getSession();
  const isChecker = ["Checker", "Approver", "Admin"].includes(session?.role || "Maker");

  function onDelete() {
    remove("beneficiary", record.id);
    toast.success("Beneficiary deleted successfully");
    navigate({ to: "/app/$", params: { _splat: "beneficiary" } });
  }

  function handleSetStatus(status: string) {
    update("beneficiary", record.id, { status });
    toast.success(`Beneficiary marked as ${status}`);
    navigate({ to: "/app/$", params: { _splat: `beneficiary/view/${record.id}` } });
  }

  function getTransferLink() {
    const params = new URLSearchParams();
    params.set("beneficiary", record.name);
    params.set("account", record.account);
    params.set("bank", record.bankName);
    params.set("branch", record.branch || "");
    params.set("routing", record.swiftCode || record.routingNo || "");
    params.set("currency", record.currency || "BDT");
    
    let path = "eftn";
    if (record.type === "Within Bank") {
      path = "within";
    } else if (record.type === "Foreign (SWIFT)") {
      path = "foreign";
    } else {
      path = "eftn";
    }
    return `/app/fund-transfer/new/${path}?${params.toString()}`;
  }

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: "beneficiary" }} className="hover:text-navy">Beneficiary Management</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-mono">{record.id}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">{record.type}</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-0.5">{record.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-mono text-muted-foreground">{record.id}</span>
            {statusBadge(record.status)}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {record.status === "Approved" ? (
            <Button className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold gap-1.5" asChild>
              <Link to="/app/$" params={{ _splat: getTransferLink().replace("/app/fund-transfer/new/", "fund-transfer/new/") }}>
                <Send className="w-4 h-4" /> Transfer Funds
              </Link>
            </Button>
          ) : (
            <Button disabled className="gap-1.5">
              <Clock className="w-4 h-4" /> Awaiting Approval
            </Button>
          )}

          <Button variant="outline" asChild>
            <Link to="/app/$" params={{ _splat: `beneficiary/edit/${record.id}` }}>
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </Link>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this beneficiary?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The record {record.id} ({record.name}) will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Beneficiary Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="font-display text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-gold" /> Payee Profile
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Beneficiary Name</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{record.name}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Nickname</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{record.nickname || "—"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Payee Account / IBAN</dt>
                <dd className="mt-1 text-sm font-mono font-bold text-navy">{record.account}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Transfer Mode</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{record.type}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Bank Name</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{record.bankName}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Branch Name</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{record.branch || "—"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">SWIFT / Routing Code</dt>
                <dd className="mt-1 text-sm font-mono">{record.swiftCode || "—"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Preferred Currency</dt>
                <dd className="mt-1 text-sm">
                  <Badge variant="outline" className="bg-navy/5 text-navy border-navy/20 font-bold">
                    {record.currency || "BDT"}
                  </Badge>
                </dd>
              </div>
              {record.email && (
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Email Address</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{record.email}</dd>
                </div>
              )}
              {record.phone && (
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Phone Number</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{record.phone}</dd>
                </div>
              )}
              {record.address && (
                <div className="sm:col-span-2">
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Physical Address</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground whitespace-pre-wrap">{record.address}</dd>
                </div>
              )}
            </dl>
          </Card>
        </div>

        {/* Right column: Checker Actions & Audit Trail */}
        <div className="space-y-6">
          {record.status === "Pending" && (
            <Card className="p-5 border border-warning bg-warning/5 space-y-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-warning" />
                <h3 className="font-semibold text-sm text-warning">Checker Authorization Panel</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Review this beneficiary entry. Verify account details against invoice/requisition forms before signing.
              </p>
              
              <div className="space-y-2 border-y border-border py-3">
                <div className="flex items-start gap-2 text-xs">
                  <input type="checkbox" className="mt-0.5 cursor-pointer" id="chk-acct" defaultChecked />
                  <label htmlFor="chk-acct" className="text-muted-foreground cursor-pointer select-none">Account Title & Number matches core records</label>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <input type="checkbox" className="mt-0.5 cursor-pointer" id="chk-routing" defaultChecked />
                  <label htmlFor="chk-routing" className="text-muted-foreground cursor-pointer select-none">Routing number and branch details validated</label>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <input type="checkbox" className="mt-0.5 cursor-pointer" id="chk-kyc" defaultChecked />
                  <label htmlFor="chk-kyc" className="text-muted-foreground cursor-pointer select-none">AML / Sanctions check complete</label>
                </div>
              </div>

              {isChecker ? (
                <div className="flex gap-2 pt-1">
                  <Button className="flex-1 bg-success hover:bg-success/90 text-white font-semibold text-xs h-9" onClick={() => handleSetStatus("Approved")}>
                    <Check className="w-3.5 h-3.5 mr-1" /> Approve Entry
                  </Button>
                  <Button variant="outline" className="flex-1 border-destructive text-destructive hover:bg-destructive/10 text-xs h-9" onClick={() => handleSetStatus("Rejected")}>
                    <X className="w-3.5 h-3.5 mr-1" /> Reject
                  </Button>
                </div>
              ) : (
                <div className="text-[11px] text-muted-foreground bg-muted p-2 rounded leading-normal">
                  Your corporate role is set as **{session?.role || "Maker"}**. Maker accounts cannot self-approve entries.
                </div>
              )}
            </Card>
          )}

          {/* Audit trail */}
          <Card className="p-5">
            <h3 className="font-display text-sm font-bold text-navy mb-4">Audit History</h3>
            <ol className="relative border-l border-border pl-4 space-y-4 text-xs">
              <BeneficiaryAuditItem time={String(record.createdAt)} actor="Maker" action="Beneficiary entry created" />
              {record.updatedAt && record.updatedAt !== record.createdAt && (
                <BeneficiaryAuditItem time={String(record.updatedAt)} actor="Maker" action="Entry modified" />
              )}
              {record.status === "Approved" && (
                <BeneficiaryAuditItem time={String(record.updatedAt)} actor="Checker" action="Authorized & Activated" />
              )}
              {record.status === "Rejected" && (
                <BeneficiaryAuditItem time={String(record.updatedAt)} actor="Checker" action="Entry Rejected" />
              )}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}

function BeneficiaryAuditItem({ time, actor, action }: { time: string; actor: string; action: string }) {
  return (
    <li className="relative pl-1">
      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gold" />
      <div className="text-sm font-medium text-foreground">{action}</div>
      <div className="text-xs text-muted-foreground">
        {new Date(time).toLocaleString()} · {actor}
      </div>
    </li>
  );
}

/* ====================== BILL PAY MODULE ====================== */

const BILL_CATEGORIES = [
  {
    id: "recharge",
    label: "Mobile Recharge",
    icon: Smartphone,
    desc: "Top-up any mobile number across all BD operators instantly.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    operators: ["Grameenphone", "Robi", "Banglalink", "Teletalk", "Airtel"],
  },
  {
    id: "own-card",
    label: "Own CC Bill",
    icon: CreditCard,
    desc: "Instantly settle your SJIBL corporate credit card outstanding.",
    color: "text-navy",
    bg: "bg-navy/5",
    border: "border-navy/20",
    operators: [],
  },
  {
    id: "other-card",
    label: "Other Bank CC",
    icon: Receipt,
    desc: "Pay credit card bills for cards issued by any other bank.",
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
    operators: ["Brac Bank CC", "Dutch-Bangla CC", "Prime Bank CC", "Eastern Bank CC", "IFIC Bank CC", "Islami Bank CC", "City Bank CC"],
  },
  {
    id: "utility",
    label: "Utility Bill",
    icon: Zap,
    desc: "Pay electricity, gas, water, internet, and other utility bills.",
    color: "text-gold",
    bg: "bg-gold/5",
    border: "border-gold/30",
    operators: ["DESCO", "DPDC", "BREB", "Titas Gas", "Bakhrabad Gas", "WASA Dhaka", "WASA CTG", "Jalalabad Gas"],
  },
];

const BILL_PAY_EXTRA_HISTORY = [
  { id: "BP-201", biller: "DESCO", billerCategory: "Utility", consumerNo: "ACC-771122", amount: 14200, status: "Approved", createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: "BP-203", biller: "Titas Gas", billerCategory: "Utility", consumerNo: "GTD-44201", amount: 3800, status: "Approved", createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: "BP-204", biller: "Brac Bank CC", billerCategory: "Credit Card (Other)", consumerNo: "4521-XXXX-XXXX-9901", amount: 45000, status: "Approved", createdAt: new Date(Date.now() - 7 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 7 * 86400000).toISOString() },
];

const OWN_CARDS = [
  { id: "4521-XXXX-XXXX-8830", label: "Visa Corporate Gold — *8830 (Outstanding: BDT 2,45,000)" },
  { id: "4521-XXXX-XXXX-1104", label: "Mastercard Corporate Platinum — *1104 (Outstanding: BDT 4,85,000)" },
];

const OWN_CARD_OUTSTANDING: Record<string, number> = {
  "4521-XXXX-XXXX-8830": 245000,
  "4521-XXXX-XXXX-1104": 485000,
};

function BillPayDashboardView() {
  const navigate = useNavigate();
  const payments = list("bill-pay");
  const allPayments = [...BILL_PAY_EXTRA_HISTORY, ...payments].sort(
    (a, b) => new Date(String(b.createdAt)).getTime() - new Date(String(a.createdAt)).getTime()
  );

  const totalPaid = useMemo(() =>
    payments.filter(p => p.status === "Approved").reduce((s, p) => s + Number(p.amount || 0), 0)
  , [payments]);

  const pending = payments.filter(p => p.status === "Pending").length;
  const thisMonth = allPayments.filter(p => {
    const d = new Date(String(p.createdAt));
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const recentHistory = allPayments.slice(0, 6);

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-semibold">Bill Pay</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Bill Payment Center</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Recharge mobile numbers, settle credit card bills, and pay utility invoices with Maker–Checker compliance.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/app/$" params={{ _splat: "approval" }}>
            <CheckSquare className="w-4 h-4 mr-2" /> View Pending Approvals
          </Link>
        </Button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Total Bills Paid</div>
          <div className="font-display text-2xl font-bold text-navy mt-2">{payments.filter(p => p.status === "Approved").length + 3}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Approved payments</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Total Amount</div>
          <div className="font-display text-2xl font-bold text-foreground mt-2">BDT {(totalPaid + 63000).toLocaleString()}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Settled this period</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">This Month</div>
          <div className="font-display text-2xl font-bold text-foreground mt-2">{thisMonth}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Payments initiated</div>
        </Card>
        <Card className={`p-5 ${pending > 0 ? "bg-warning/5 border-warning/30" : ""}`}>
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Pending Checker</div>
          <div className={`font-display text-2xl font-bold mt-2 ${pending > 0 ? "text-warning animate-pulse" : "text-success"}`}>{pending}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Awaiting authorization</div>
        </Card>
      </div>

      {/* Bill Category Tiles */}
      <div>
        <h2 className="font-display text-xl font-bold text-navy mb-4">Select Payment Type</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BILL_CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => navigate({ to: "/app/$", params: { _splat: `bill-pay/new/${cat.id}` } })}
                className={`group rounded-xl border-2 p-5 text-left transition-all hover:shadow-lg hover:scale-[1.02] active:scale-100 cursor-pointer w-full ${cat.bg} ${cat.border}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border ${cat.border} ${cat.bg}`}>
                  <Icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <div className={`font-display font-bold text-base ${cat.color} mb-1`}>{cat.label}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  Pay Now <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent History */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl font-bold text-navy">Recent Payments</h2>
        </div>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-[11px] uppercase tracking-wide">Reference</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide">Biller / Category</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide">Consumer No.</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide text-right">Amount (BDT)</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide">Status</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wide text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentHistory.map(p => (
                <TableRow key={p.id} className="hover:bg-muted/10">
                  <TableCell className="font-mono text-xs font-bold text-navy">{String(p.id)}</TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{String(p.biller)}</div>
                    <div className="text-[10px] text-muted-foreground">{String(p.billerCategory)}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{String(p.consumerNo)}</TableCell>
                  <TableCell className="text-right font-mono font-semibold">{Number(p.amount).toLocaleString()}</TableCell>
                  <TableCell>{statusBadge(String(p.status))}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" asChild>
                      <Link to="/app/$" params={{ _splat: `bill-pay/view/${p.id}` }}>
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

function BillPayFormView({ billType }: { billType: string }) {
  const navigate = useNavigate();
  const cat = BILL_CATEGORIES.find(c => c.id === billType) || BILL_CATEGORIES[3];
  const Icon = cat.icon;

  const [fromAccount, setFromAccount] = useState(OWN_ACCOUNTS[0]?.value || "");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Recharge
  const [mobileNo, setMobileNo] = useState("");
  const [operator, setOperator] = useState("");
  const [rechargeType, setRechargeType] = useState("prepaid");

  // Own CC
  const [ownCard, setOwnCard] = useState(OWN_CARDS[0]?.id || "");
  const [payType, setPayType] = useState("full");

  // Other CC
  const [otherBank, setOtherBank] = useState("");
  const [otherCardNo, setOtherCardNo] = useState("");
  const [otherHolderName, setOtherHolderName] = useState("");

  // Utility
  const [utilityBiller, setUtilityBiller] = useState("");
  const [consumerNo, setConsumerNo] = useState("");
  const [billMonth, setBillMonth] = useState("");

  // Set default amount when own card changes
  const ownCardOutstanding = OWN_CARD_OUTSTANDING[ownCard] || 0;

  useMemo(() => {
    if (billType === "own-card") {
      if (payType === "full") setAmount(String(ownCardOutstanding));
      else if (payType === "minimum") setAmount(String(Math.round(ownCardOutstanding * 0.05)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownCard, payType]);

  const isValid = useMemo(() => {
    if (!fromAccount || !amount || isNaN(Number(amount)) || Number(amount) <= 0) return false;
    if (billType === "recharge") return !!mobileNo && !!operator;
    if (billType === "own-card") return !!ownCard;
    if (billType === "other-card") return !!otherBank && !!otherCardNo && !!otherHolderName;
    if (billType === "utility") return !!utilityBiller && !!consumerNo;
    return true;
  }, [billType, fromAccount, amount, mobileNo, operator, ownCard, otherBank, otherCardNo, otherHolderName, utilityBiller, consumerNo]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) { toast.error("Please fill all required fields."); return; }
    setSubmitting(true);

    let biller = "";
    let billerCategory = "";
    let consumer = "";

    if (billType === "recharge") {
      biller = operator;
      billerCategory = "Telecom / Recharge";
      consumer = mobileNo;
    } else if (billType === "own-card") {
      biller = `SJIBL — ${ownCard}`;
      billerCategory = "Credit Card (Own)";
      consumer = ownCard;
    } else if (billType === "other-card") {
      biller = otherBank;
      billerCategory = "Credit Card (Other)";
      consumer = otherCardNo;
    } else {
      biller = utilityBiller;
      billerCategory = "Utility";
      consumer = consumerNo;
    }

    const now = new Date().toISOString();
    const newId = `BP-${Date.now().toString(36).toUpperCase()}`;
    const rows = JSON.parse(localStorage.getItem("sjibl.ctb.v2.bill-pay") || "[]");
    const newRec = {
      id: newId,
      createdAt: now,
      updatedAt: now,
      status: "Pending",
      reference: newId,
      billerCategory,
      biller,
      consumerNo: consumer,
      billMonth: billMonth || new Date().toLocaleDateString("en-BD", { month: "long", year: "numeric" }),
      amount: Number(amount),
      currency: "BDT",
      fromAccount,
      narration: narration || `${billerCategory} payment to ${biller}`,
    };
    rows.unshift(newRec);
    localStorage.setItem("sjibl.ctb.v2.bill-pay", JSON.stringify(rows));

    // Approval record
    const appRows = JSON.parse(localStorage.getItem("sjibl.ctb.v2.approval") || "[]");
    const session = getSession();
    appRows.unshift({
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: now,
      updatedAt: now,
      status: "Pending",
      ref: newId,
      moduleTitle: "Bill Pay",
      details: `Bill Payment to ${biller} (${consumer}, BDT ${Number(amount).toLocaleString()})`,
      maker: session?.username || "maker",
      risk: "Low",
      amount: Number(amount),
      sourceSlug: "bill-pay",
      remarks: "Awaiting maker-checker verification.",
    });
    localStorage.setItem("sjibl.ctb.v2.approval", JSON.stringify(appRows));

    setTimeout(() => {
      toast.success("Bill payment submitted for Checker authorization!");
      navigate({ to: "/app/$", params: { _splat: "bill-pay" } });
    }, 700);
  }

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: "bill-pay" }} className="hover:text-navy">Bill Pay</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-semibold">{cat.label}</span>
      </nav>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate({ to: "/app/$", params: { _splat: "bill-pay" } })}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">Bill Pay</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-0.5">{cat.label}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
          {/* Debit Account */}
          <Card className="p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-navy flex items-center gap-2">
              <Wallet className="w-5 h-5 text-gold" /> Debit Account
            </h2>
            <div className="space-y-2">
              <Label htmlFor="bp-from">Debit From Account <span className="text-destructive">*</span></Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger id="bp-from">
                  <SelectValue placeholder="Select Account" />
                </SelectTrigger>
                <SelectContent>
                  {OWN_ACCOUNTS.map(a => (
                    <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Biller Details */}
          <Card className="p-6 space-y-5">
            <h2 className="font-display text-lg font-bold text-navy flex items-center gap-2">
              <Icon className={`w-5 h-5 ${cat.color}`} /> {cat.label} Details
            </h2>

            {billType === "recharge" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bp-operator">Mobile Operator <span className="text-destructive">*</span></Label>
                    <Select value={operator} onValueChange={setOperator}>
                      <SelectTrigger id="bp-operator">
                        <SelectValue placeholder="Select Operator" />
                      </SelectTrigger>
                      <SelectContent>
                        {cat.operators.map(op => (
                          <SelectItem key={op} value={op}>{op}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bp-rechtype">Recharge Type</Label>
                    <Select value={rechargeType} onValueChange={setRechargeType}>
                      <SelectTrigger id="bp-rechtype">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prepaid">Prepaid Top-Up</SelectItem>
                        <SelectItem value="postpaid">Postpaid Bill</SelectItem>
                        <SelectItem value="data">Data Pack</SelectItem>
                        <SelectItem value="bundle">Bundle Offer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bp-mobile">Mobile Number <span className="text-destructive">*</span></Label>
                  <Input id="bp-mobile" placeholder="e.g. 01711-000-000" value={mobileNo} onChange={e => setMobileNo(e.target.value)} />
                </div>
              </>
            )}

            {billType === "own-card" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bp-owncard">Select Your SJIBL Card <span className="text-destructive">*</span></Label>
                  <Select value={ownCard} onValueChange={v => { setOwnCard(v); setPayType("full"); }}>
                    <SelectTrigger id="bp-owncard">
                      <SelectValue placeholder="Select Card" />
                    </SelectTrigger>
                    <SelectContent>
                      {OWN_CARDS.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-lg bg-muted p-4 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Outstanding Balance</div>
                  <div className="font-display text-xl font-bold text-navy">
                    BDT {ownCardOutstanding.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Payment Option</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["full", "minimum", "custom"] as const).map(pt => (
                      <button
                        type="button"
                        key={pt}
                        onClick={() => {
                          setPayType(pt);
                          if (pt === "full") setAmount(String(ownCardOutstanding));
                          else if (pt === "minimum") setAmount(String(Math.round(ownCardOutstanding * 0.05)));
                          else setAmount("");
                        }}
                        className={`p-2.5 rounded-lg border text-xs font-semibold capitalize transition-all ${
                          payType === pt ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-gold/50"
                        }`}
                      >
                        {pt === "full" ? "Full Amount" : pt === "minimum" ? "Min. Due (5%)" : "Custom"}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {billType === "other-card" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bp-otherbank">Issuing Bank <span className="text-destructive">*</span></Label>
                  <Select value={otherBank} onValueChange={setOtherBank}>
                    <SelectTrigger id="bp-otherbank">
                      <SelectValue placeholder="Select Issuing Bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {cat.operators.map(op => (
                        <SelectItem key={op} value={op}>{op}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bp-cardno">Credit Card Number <span className="text-destructive">*</span></Label>
                    <Input
                      id="bp-cardno"
                      placeholder="e.g. 4521-XXXX-XXXX-0000"
                      value={otherCardNo}
                      onChange={e => setOtherCardNo(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bp-holder">Cardholder Name <span className="text-destructive">*</span></Label>
                    <Input id="bp-holder" placeholder="Name on card" value={otherHolderName} onChange={e => setOtherHolderName(e.target.value)} />
                  </div>
                </div>
              </>
            )}

            {billType === "utility" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bp-ubiller">Select Utility Biller <span className="text-destructive">*</span></Label>
                  <Select value={utilityBiller} onValueChange={setUtilityBiller}>
                    <SelectTrigger id="bp-ubiller">
                      <SelectValue placeholder="Select Biller" />
                    </SelectTrigger>
                    <SelectContent>
                      {cat.operators.map(op => (
                        <SelectItem key={op} value={op}>{op}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bp-consumer">Consumer / Account No. <span className="text-destructive">*</span></Label>
                    <Input id="bp-consumer" placeholder="e.g. ACC-771122" value={consumerNo} onChange={e => setConsumerNo(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bp-month">Bill Month</Label>
                    <Input id="bp-month" type="month" value={billMonth} onChange={e => setBillMonth(e.target.value)} />
                  </div>
                </div>
              </>
            )}
          </Card>

          {/* Amount & Narration */}
          <Card className="p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-navy flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gold" /> Payment Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bp-amount">Amount (BDT) <span className="text-destructive">*</span></Label>
                <Input
                  id="bp-amount"
                  type="number"
                  min="1"
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  disabled={billType === "own-card" && payType !== "custom"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bp-narr">Narration / Reference</Label>
                <Input id="bp-narr" placeholder="Optional note" value={narration} onChange={e => setNarration(e.target.value)} />
              </div>
            </div>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate({ to: "/app/$", params: { _splat: "bill-pay" } })}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || submitting}
              className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold gap-2 min-w-[180px]"
            >
              {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Submit for Approval
            </Button>
          </div>
        </form>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Category Info */}
          <Card className={`p-5 border-2 ${cat.bg} ${cat.border}`}>
            <div className={`w-10 h-10 rounded-lg border ${cat.border} flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${cat.color}`} />
            </div>
            <div className={`font-display font-bold text-lg ${cat.color}`}>{cat.label}</div>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{cat.desc}</p>
          </Card>

          {/* Workflow */}
          <Card className="p-5 space-y-4">
            <h3 className="text-sm font-bold text-navy">Payment Workflow</h3>
            <ol className="space-y-3 text-xs">
              {[
                { step: "1", label: "Maker Initiates", desc: "You fill and submit this form" },
                { step: "2", label: "Checker Review", desc: "Authorized user verifies details" },
                { step: "3", label: "Authorization", desc: "Checker approves or rejects" },
                { step: "4", label: "Settlement", desc: "SJIBL CBS processes payment instantly" },
              ].map(s => (
                <li key={s.step} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold/10 text-gold font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">{s.step}</div>
                  <div>
                    <div className="font-semibold text-foreground">{s.label}</div>
                    <div className="text-muted-foreground">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          {/* Other Categories */}
          <Card className="p-5 space-y-1">
            <h3 className="text-sm font-bold text-navy mb-3">Other Payment Types</h3>
            {BILL_CATEGORIES.filter(c => c.id !== billType).map(c => {
              const CIcon = c.icon;
              return (
                <Link
                  key={c.id}
                  to="/app/$"
                  params={{ _splat: `bill-pay/new/${c.id}` }}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/60 transition-colors group"
                >
                  <div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center border ${c.border}`}>
                    <CIcon className={`w-3.5 h-3.5 ${c.color}`} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{c.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-muted-foreground group-hover:text-foreground" />
                </Link>
              );
            })}
          </Card>
        </div>
      </div>
    </div>
  );
}

function BillPayDetailView({ record }: { record: any }) {
  const navigate = useNavigate();
  const session = getSession();
  const isChecker = ["Checker", "Approver", "Admin"].includes(session?.role || "Maker");

  function handleSetStatus(status: string) {
    update("bill-pay", record.id, { status });
    toast.success(`Payment ${status === "Approved" ? "approved and processed" : "rejected"} successfully!`);
    navigate({ to: "/app/$", params: { _splat: `bill-pay/view/${record.id}` } });
  }

  const catInfo = BILL_CATEGORIES.find(c => {
    const cat = String(record.billerCategory || "").toLowerCase();
    return cat.includes("recharge") || cat.includes("telecom") ? c.id === "recharge"
      : cat.includes("own") ? c.id === "own-card"
      : cat.includes("other") || cat.includes("credit") ? c.id === "other-card"
      : c.id === "utility";
  }) || BILL_CATEGORIES[3];
  const Icon = catInfo.icon;

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: "bill-pay" }} className="hover:text-navy">Bill Pay</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-mono">{record.id}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate({ to: "/app/$", params: { _splat: "bill-pay" } })}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold">{record.billerCategory}</div>
            <h1 className="font-display text-3xl font-bold text-navy mt-0.5">{record.biller}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-xs text-muted-foreground">{record.id}</span>
              {statusBadge(String(record.status))}
            </div>
          </div>
        </div>
        {record.status === "Approved" && (
          <Button variant="outline" onClick={() => toast.info("Receipt downloaded (demo)")}>
            <Download className="w-4 h-4 mr-2" /> Download Receipt
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="font-display text-lg font-bold text-navy mb-5 flex items-center gap-2">
              <Icon className={`w-5 h-5 ${catInfo.color}`} /> Payment Details
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Biller / Operator</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{record.biller}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Category</dt>
                <dd className="mt-1 text-sm font-medium">{record.billerCategory}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Consumer / Card No.</dt>
                <dd className="mt-1 text-sm font-mono font-bold text-navy">{record.consumerNo}</dd>
              </div>
              {record.billMonth && (
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Bill Month</dt>
                  <dd className="mt-1 text-sm font-medium">{record.billMonth}</dd>
                </div>
              )}
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Debit Account</dt>
                <dd className="mt-1 text-sm font-mono">{record.fromAccount || "0123100001 — SJIBL Current"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Currency</dt>
                <dd className="mt-1">
                  <Badge variant="outline" className="bg-navy/5 text-navy border-navy/20 font-bold">BDT</Badge>
                </dd>
              </div>
              {record.narration && (
                <div className="sm:col-span-2">
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Narration</dt>
                  <dd className="mt-1 text-sm text-foreground">{record.narration}</dd>
                </div>
              )}
            </dl>
          </Card>

          {/* Amount Summary */}
          <Card className="p-6 bg-navy/[0.03] border-navy/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Payment Amount</div>
                <div className="font-display text-4xl font-bold text-navy mt-2">
                  BDT {Number(record.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Initiated: {new Date(String(record.createdAt)).toLocaleString()}
                </div>
              </div>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                record.status === "Approved" ? "bg-success/10" :
                record.status === "Rejected" ? "bg-destructive/10" : "bg-warning/10"
              }`}>
                {record.status === "Approved" ? <CheckCircle2 className="w-8 h-8 text-success" /> :
                 record.status === "Rejected" ? <X className="w-8 h-8 text-destructive" /> :
                 <Clock className="w-8 h-8 text-warning" />}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="space-y-5">
          {record.status === "Pending" && (
            <Card className="p-5 border border-warning bg-warning/5 space-y-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-warning" />
                <h3 className="font-semibold text-sm text-warning">Checker Authorization</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Verify biller, consumer number, and debit account before authorizing.
              </p>
              <div className="space-y-2 border-y border-border py-3">
                {[
                  { id: "chk-biller-dp", label: "Biller name and category confirmed" },
                  { id: "chk-consumer-dp", label: "Consumer / card number verified" },
                  { id: "chk-amount-dp", label: "Payment amount authorized within limit" },
                ].map(c => (
                  <div key={c.id} className="flex items-start gap-2 text-xs">
                    <input type="checkbox" className="mt-0.5 cursor-pointer" id={c.id} defaultChecked />
                    <label htmlFor={c.id} className="text-muted-foreground cursor-pointer select-none">{c.label}</label>
                  </div>
                ))}
              </div>
              {isChecker ? (
                <div className="flex gap-2 pt-1">
                  <Button
                    className="flex-1 bg-success hover:bg-success/90 text-white font-semibold text-xs h-9"
                    onClick={() => handleSetStatus("Approved")}
                  >
                    <Check className="w-3.5 h-3.5 mr-1" /> Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-destructive text-destructive hover:bg-destructive/10 text-xs h-9"
                    onClick={() => handleSetStatus("Rejected")}
                  >
                    <X className="w-3.5 h-3.5 mr-1" /> Reject
                  </Button>
                </div>
              ) : (
                <div className="text-[11px] text-muted-foreground bg-muted p-2 rounded leading-normal">
                  Your role is <strong>{session?.role || "Maker"}</strong>. Only Checker accounts can authorize payments.
                </div>
              )}
            </Card>
          )}

          {/* Audit */}
          <Card className="p-5">
            <h3 className="font-display text-sm font-bold text-navy mb-4">Audit Trail</h3>
            <ol className="relative border-l border-border pl-4 space-y-4 text-xs">
              <li className="relative pl-1">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gold" />
                <div className="text-sm font-medium">Payment Initiated</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(String(record.createdAt)).toLocaleString()} · Maker
                </div>
              </li>
              {record.status === "Approved" && (
                <li className="relative pl-1">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-success" />
                  <div className="text-sm font-medium text-success">Approved & Settled</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(String(record.updatedAt)).toLocaleString()} · Checker
                  </div>
                </li>
              )}
              {record.status === "Rejected" && (
                <li className="relative pl-1">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-destructive" />
                  <div className="text-sm font-medium text-destructive">Payment Rejected</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(String(record.updatedAt)).toLocaleString()} · Checker
                  </div>
                </li>
              )}
              {record.status === "Pending" && (
                <li className="relative pl-1">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-warning animate-pulse" />
                  <div className="text-sm font-medium text-warning">Awaiting Authorization</div>
                  <div className="text-xs text-muted-foreground">Pending Checker action</div>
                </li>
              )}
            </ol>
          </Card>

          {/* Quick Actions */}
          <Card className="p-5 space-y-3">
            <h3 className="font-display text-sm font-bold text-navy">Quick Actions</h3>
            <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90 gap-2" asChild>
              <Link to="/app/$" params={{ _splat: `bill-pay/new/${catInfo.id}` }}>
                <RefreshCw className="w-4 h-4" /> Pay Again
              </Link>
            </Button>
            <Button variant="outline" className="w-full gap-2" asChild>
              <Link to="/app/$" params={{ _splat: "bill-pay" }}>
                <History className="w-4 h-4" /> Payment History
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ==================== VIEW IMPORT LC MODULE ==================== */

function ImportLCDashboardView() {
  const navigate = useNavigate();
  const records = list("import-lc");
  const [query, setQuery] = useState("");
  const [lcTypeFilter, setLcTypeFilter] = useState("all");
  const [expiryFilter, setExpiryFilter] = useState("all");

  const now = new Date();

  const filtered = useMemo(() => {
    let rows = [...records];

    // LC Type filter
    if (lcTypeFilter !== "all") {
      rows = rows.filter((r) =>
        String(r.lcType || "").toLowerCase().includes(lcTypeFilter.toLowerCase())
      );
    }

    // Expiry filter
    if (expiryFilter === "30days") {
      const boundary = new Date(now.getTime() + 30 * 86400000);
      rows = rows.filter((r) => {
        const d = new Date(String(r.expiryDate));
        return d >= now && d <= boundary;
      });
    } else if (expiryFilter === "90days") {
      const boundary = new Date(now.getTime() + 90 * 86400000);
      rows = rows.filter((r) => {
        const d = new Date(String(r.expiryDate));
        return d >= now && d <= boundary;
      });
    }

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((r) =>
        Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(q))
      );
    }

    return rows;
  }, [records, query, lcTypeFilter, expiryFilter]);

  // Aggregates
  const totalUSD = useMemo(() =>
    records.filter((r) => r.currency === "USD").reduce((a, r) => a + Number(r.lcAmount || 0), 0),
    [records]
  );
  const totalEUR = useMemo(() =>
    records.filter((r) => r.currency === "EUR").reduce((a, r) => a + Number(r.lcAmount || 0), 0),
    [records]
  );
  const expiringSoon = useMemo(() => {
    const boundary = new Date(now.getTime() + 30 * 86400000);
    return records.filter((r) => {
      const d = new Date(String(r.expiryDate));
      return d >= now && d <= boundary;
    }).length;
  }, [records]);

  const lcTypeBadgeColor = (t: string) => {
    if (t?.includes("Sight")) return "bg-blue-50 text-blue-700 border-blue-200";
    if (t?.includes("UPAS")) return "bg-purple-50 text-purple-700 border-purple-200";
    if (t?.includes("Usance")) return "bg-amber-50 text-amber-700 border-amber-200";
    if (t?.includes("Back")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-semibold">View Import LC</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">Trade Finance</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Import Letters of Credit</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Search, view, and monitor all import LC records including SWIFT messages, amendments, bills, and advices.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success("LC PDF report exported.")}><FileText className="w-4 h-4" />Export PDF</Button>
          <Button variant="outline" onClick={() => toast.success("LC Excel report exported.")}><Download className="w-4 h-4" />Export Excel</Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Total LCs</div>
          <div className="font-display text-3xl font-bold text-navy mt-2">{records.length}</div>
          <div className="text-[10px] text-muted-foreground mt-1">{filtered.length} matching search</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">USD LC Value</div>
          <div className="font-display text-2xl font-bold text-navy mt-2">
            USD {totalUSD.toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Across Sight & UPAS LCs</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">EUR LC Value</div>
          <div className="font-display text-2xl font-bold text-navy mt-2">
            EUR {totalEUR.toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Across Chemical & Goods LCs</div>
        </Card>
        <Card className={`p-5 ${expiringSoon > 0 ? "border-amber-300 bg-amber-50/30" : ""}`}>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Expiring in 30 Days</div>
          <div className={`font-display text-3xl font-bold mt-2 ${expiringSoon > 0 ? "text-amber-600" : "text-foreground"}`}>
            {expiringSoon}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Requires attention</div>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="import-lc-search"
              placeholder="Search LC No., Beneficiary, SWIFT Ref…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={lcTypeFilter} onValueChange={setLcTypeFilter}>
            <SelectTrigger className="w-40 text-xs" id="lc-type-filter">
              <SelectValue placeholder="LC Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All LC Types</SelectItem>
              <SelectItem value="Sight">Sight LC</SelectItem>
              <SelectItem value="Usance">Usance LC</SelectItem>
              <SelectItem value="UPAS">UPAS LC</SelectItem>
              <SelectItem value="Back">Back-to-Back</SelectItem>
            </SelectContent>
          </Select>
          <Select value={expiryFilter} onValueChange={setExpiryFilter}>
            <SelectTrigger className="w-44 text-xs" id="expiry-filter">
              <SelectValue placeholder="Expiry Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Expiry Dates</SelectItem>
              <SelectItem value="30days">Expiring in 30 Days</SelectItem>
              <SelectItem value="90days">Expiring in 90 Days</SelectItem>
            </SelectContent>
          </Select>
          {(query || lcTypeFilter !== "all" || expiryFilter !== "all") && (
            <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setLcTypeFilter("all"); setExpiryFilter("all"); }}>
              <X className="w-3.5 h-3.5" /> Clear
            </Button>
          )}
        </div>
      </Card>

      {/* LC Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>LC Number</TableHead>
              <TableHead>LC Type</TableHead>
              <TableHead>Beneficiary</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">LC Amount</TableHead>
              <TableHead>Opening Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-sm text-muted-foreground py-12">
                  No Import LCs found matching your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((r) => {
                const expiry = new Date(String(r.expiryDate));
                const daysToExpiry = Math.ceil((expiry.getTime() - now.getTime()) / 86400000);
                const isExpiringSoon = daysToExpiry > 0 && daysToExpiry <= 30;
                return (
                  <TableRow key={r.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => navigate({ to: "/app/$", params: { _splat: `import-lc/view/${r.id}` } })}>
                    <TableCell className="font-mono text-sm font-semibold text-navy">
                      {String(r.lcNumber)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] font-semibold ${lcTypeBadgeColor(String(r.lcType))}`}>
                        {String(r.lcType)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{String(r.beneficiaryName)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {String(r.beneficiaryAddress || "").split(",").pop()?.trim() || "—"}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {String(r.currency)} {Number(r.lcAmount).toLocaleString("en-US", { minimumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{String(r.openingDate)}</TableCell>
                    <TableCell className="text-xs">
                      <span className={isExpiringSoon ? "text-amber-600 font-semibold" : ""}>
                        {String(r.expiryDate)}
                        {isExpiringSoon && <span className="ml-1 text-[10px] text-amber-500">({daysToExpiry}d)</span>}
                      </span>
                    </TableCell>
                    <TableCell>{statusBadge(String(r.status))}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                        <Link to="/app/$" params={{ _splat: `import-lc/view/${r.id}` }}>
                          <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Info Banner */}
      <Card className="p-5 bg-gold/[0.04] border-gold/20">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-sm">Read-Only Trade Finance Module</div>
            <p className="text-xs text-muted-foreground mt-1">
              Import LC records are sourced from the core trade finance system (Shahjalal Islami Bank CBS). 
              To open a new LC, use the <Link to="/app/$" params={{ _splat: "lc-initiation" }} className="text-gold hover:underline">LC Initiation</Link> module.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ---- Mock data helpers for Import LC Detail View ---- */

function getAmendments(lcNumber: string) {
  return [
    {
      id: "AMD-001",
      amendmentNo: "01",
      date: "2025-06-15",
      description: "Extension of LC expiry date by 30 days as per beneficiary request.",
      swiftRef: "MT707-00192",
      status: "Approved",
      requestedBy: "Globex Industries Ltd",
    },
    {
      id: "AMD-002",
      amendmentNo: "02",
      date: "2025-07-02",
      description: "Tolerance amended from ±5% to ±10%. Goods description updated with HS code.",
      swiftRef: "MT707-00228",
      status: "Pending",
      requestedBy: "Globex Industries Ltd",
    },
  ].filter((_, i) => lcNumber.includes("0992") ? true : i < 1);
}

function getSwiftMessages(lcNumber: string) {
  const msgs = [
    {
      id: "SW-001", msgType: "MT700", date: "2025-05-10 10:22:00",
      subject: "Issue of Documentary Credit",
      from: "SJIBBDDHXXX (Shahjalal Islami Bank PLC)",
      to: "BKCHCNBJXXX (Bank of China, Shanghai)",
      status: "Sent", body: "Field 27: 1/1 | Field 40A: IRREVOCABLE | Field 20: LC-IMP-2025-0992",
    },
    {
      id: "SW-002", msgType: "MT707", date: "2025-06-15 14:05:00",
      subject: "Amendment to Documentary Credit",
      from: "SJIBBDDHXXX (Shahjalal Islami Bank PLC)",
      to: "BKCHCNBJXXX (Bank of China, Shanghai)",
      status: "Sent", body: "Field 31E: 20250715 | Amendment No: 01",
    },
    {
      id: "SW-003", msgType: "MT710", date: "2025-05-12 09:15:00",
      subject: "Advice of Third Bank's Documentary Credit",
      from: "BKCHCNBJXXX (Bank of China, Shanghai)",
      to: "SJIBBDDHXXX (Shahjalal Islami Bank PLC)",
      status: "Received", body: "Advice of LC issued by SJIBL, confirmed by advising bank.",
    },
    {
      id: "SW-004", msgType: "MT754", date: "2025-08-01 11:30:00",
      subject: "Advice of Payment / Acceptance / Negotiation",
      from: "BKCHCNBJXXX (Bank of China, Shanghai)",
      to: "SJIBBDDHXXX (Shahjalal Islami Bank PLC)",
      status: "Received", body: "USD 150,000 — Documents presented, accepted for payment.",
    },
  ];
  return lcNumber.includes("0994") ? msgs.slice(0, 2) : msgs;
}

function getAdviceMessages(lcNumber: string) {
  return [
    {
      id: "ADV-001",
      date: "2025-05-12",
      type: "LC Advice",
      from: "Advising Bank (Bank of China, Shanghai)",
      to: "Globex Industries Ltd",
      summary: "Documentary Credit No. LC-IMP-2025-0992 has been advised as per SWIFT MT710. Please review the terms.",
      status: "Acknowledged",
    },
    {
      id: "ADV-002",
      date: "2025-06-16",
      type: "Amendment Advice",
      from: "SJIBL Trade Finance Desk",
      to: "Globex Industries Ltd",
      summary: "Amendment No. 01 to LC No. LC-IMP-2025-0992 has been transmitted to beneficiary's bank.",
      status: "Acknowledged",
    },
  ].filter((_, i) => lcNumber.includes("0994") ? i < 1 : true);
}

/* ---- ImportLCDetailView ---- */

function ImportLCDetailView({ record }: { record: any }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");

  // Fetch linked import bills
  const linkedBills = useMemo(() => {
    const bills = list("import-bill");
    return bills.filter((b) => String(b.lcNumber) === String(record.lcNumber));
  }, [record.lcNumber]);

  const amendments = useMemo(() => getAmendments(String(record.lcNumber)), [record.lcNumber]);
  const swiftMessages = useMemo(() => getSwiftMessages(String(record.lcNumber)), [record.lcNumber]);
  const adviceMessages = useMemo(() => getAdviceMessages(String(record.lcNumber)), [record.lcNumber]);

  const now = new Date();
  const expiry = new Date(String(record.expiryDate));
  const daysToExpiry = Math.ceil((expiry.getTime() - now.getTime()) / 86400000);
  const isExpired = daysToExpiry < 0;
  const isExpiringSoon = daysToExpiry >= 0 && daysToExpiry <= 30;

  const lcTypeBadgeColor = (t: string) => {
    if (t?.includes("Sight")) return "border-blue-300 text-blue-700 bg-blue-50";
    if (t?.includes("UPAS")) return "border-purple-300 text-purple-700 bg-purple-50";
    if (t?.includes("Usance")) return "border-amber-300 text-amber-700 bg-amber-50";
    if (t?.includes("Back")) return "border-emerald-300 text-emerald-700 bg-emerald-50";
    return "";
  };

  const fieldRow = (label: string, value: string | undefined, mono = false) => (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground shrink-0 min-w-[140px]">{label}</span>
      <span className={`text-sm font-medium text-right ${mono ? "font-mono" : ""}`}>{value || "—"}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: "import-lc" }} className="hover:text-navy">Import LC</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-mono">{record.lcNumber}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate({ to: "/app/$", params: { _splat: "import-lc" } })}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-xs uppercase tracking-widest text-gold font-bold">Import LC</div>
              <Badge variant="outline" className={`text-[10px] font-bold ${lcTypeBadgeColor(String(record.lcType))}`}>
                {record.lcType}
              </Badge>
              {statusBadge(String(record.status))}
              {isExpired && <Badge variant="outline" className="text-destructive border-destructive text-[10px]">EXPIRED</Badge>}
              {isExpiringSoon && !isExpired && (
                <Badge variant="outline" className="text-amber-600 border-amber-400 bg-amber-50 text-[10px]">
                  Expiring in {daysToExpiry} days
                </Badge>
              )}
            </div>
            <h1 className="font-display text-2xl font-bold text-navy mt-0.5">{record.lcNumber}</h1>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              SWIFT Ref: {record.swiftReference || "—"} · Opened: {record.openingDate}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={() => { toast.success("LC copy downloaded as PDF."); }}>
            <FileText className="w-4 h-4" /> Download LC Copy
          </Button>
          <Button variant="outline" onClick={() => { toast.success("LC details exported."); }}>
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">LC Amount</div>
          <div className="font-mono font-bold text-lg text-navy mt-1">
            {record.currency} {Number(record.lcAmount).toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Beneficiary</div>
          <div className="font-semibold text-sm mt-1 truncate">{record.beneficiaryName}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Expiry Date</div>
          <div className={`font-semibold text-sm mt-1 ${isExpiringSoon && !isExpired ? "text-amber-600" : isExpired ? "text-destructive" : ""}`}>
            {String(record.expiryDate)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Linked Bills</div>
          <div className="font-bold text-2xl text-navy mt-1">{linkedBills.length}</div>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="min-w-max">
            <TabsTrigger value="summary" id="tab-lc-summary">LC Summary</TabsTrigger>
            <TabsTrigger value="details" id="tab-lc-details">LC Details</TabsTrigger>
            <TabsTrigger value="amendment" id="tab-amendment">
              Amendment {amendments.length > 0 && <Badge className="ml-1 h-4 text-[10px] px-1 bg-navy text-white">{amendments.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="bills" id="tab-bills">
              Bills {linkedBills.length > 0 && <Badge className="ml-1 h-4 text-[10px] px-1 bg-navy text-white">{linkedBills.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="guarantee" id="tab-guarantee">Guarantee</TabsTrigger>
            <TabsTrigger value="swift" id="tab-swift">
              SWIFT Messages {swiftMessages.length > 0 && <Badge className="ml-1 h-4 text-[10px] px-1 bg-navy text-white">{swiftMessages.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="advice" id="tab-advice">Advice</TabsTrigger>
            <TabsTrigger value="banks" id="tab-banks">Banks</TabsTrigger>
          </TabsList>
        </div>

        {/* ── TAB 1: LC Summary ── */}
        <TabsContent value="summary" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 space-y-1">
              <h2 className="font-display text-lg font-bold text-navy mb-4">LC Identification</h2>
              {fieldRow("LC Number", String(record.lcNumber), true)}
              {fieldRow("LC Type", String(record.lcType))}
              {fieldRow("SWIFT Reference", String(record.swiftReference || "—"), true)}
              {fieldRow("Status", String(record.status))}
              {fieldRow("Opening Date", String(record.openingDate))}
              {fieldRow("Expiry Date", String(record.expiryDate))}
              {fieldRow("Latest Shipment", String(record.shipmentDate || "—"))}
            </Card>
            <Card className="p-6 space-y-1">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Financial Details</h2>
              {fieldRow("LC Amount", `${record.currency} ${Number(record.lcAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, true)}
              {fieldRow("Currency", String(record.currency))}
              {fieldRow("Tolerance (%)", String(record.tolerance || "5% / -5%"))}
              {fieldRow("Mode of Payment", String(record.lcType).includes("Usance") || String(record.lcType).includes("UPAS") ? "Deferred / Usance" : "At Sight")}
              {fieldRow("Applicable Rules", "UCP600 / ISBP 745")}
              {fieldRow("Partial Shipment", "Permitted")}
              {fieldRow("Transshipment", "Not Permitted")}
            </Card>
            <Card className="p-6 space-y-1">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Beneficiary Information</h2>
              {fieldRow("Beneficiary Name", String(record.beneficiaryName))}
              {fieldRow("Beneficiary Address", String(record.beneficiaryAddress || "—"))}
              {fieldRow("Country", String(record.beneficiaryAddress || "").split(",").pop()?.trim() || "—")}
            </Card>
            <Card className="p-6 space-y-1">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Applicant Information</h2>
              {fieldRow("Applicant Name", "Globex Industries Ltd")}
              {fieldRow("Applicant Address", "House 12, Road 5, Gulshan-1, Dhaka 1212, Bangladesh")}
              {fieldRow("Applicant Account", "0123100001 — Al-Wadeeah Current")}
              {fieldRow("Customer CIF", "CIF-GBX-10029")}
            </Card>
          </div>
        </TabsContent>

        {/* ── TAB 2: LC Details ── */}
        <TabsContent value="details" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Goods & Shipment Details</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Description of Goods</div>
                  <p className="text-sm leading-relaxed bg-muted/40 rounded-md p-3">
                    {String(record.goodsDescription || "—")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <div className="text-xs text-muted-foreground">Port of Loading</div>
                    <div className="font-semibold">Shanghai / Ningbo</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Port of Discharge</div>
                    <div className="font-semibold">Chittagong</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Incoterms</div>
                    <div className="font-semibold">CIF Chittagong</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Latest Shipment</div>
                    <div className="font-semibold">{String(record.shipmentDate || "—")}</div>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Documents Required</h2>
              <ul className="space-y-2 text-sm">
                {[
                  "Signed Commercial Invoice (3 originals)",
                  "Full Set of Clean On-Board Bill of Lading",
                  "Packing List (3 copies)",
                  "Certificate of Origin (Country of Origin: China)",
                  "Insurance Certificate (all risks, CIF + 10%)",
                  "Pre-shipment Inspection Certificate",
                  "Beneficiary's Certificate confirming shipment",
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 lg:col-span-2">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Additional Conditions</h2>
              <div className="bg-muted/40 rounded-md p-4 text-sm leading-relaxed space-y-2">
                <p>• All documents must be presented within 21 days from the date of shipment but within the validity of the credit.</p>
                <p>• Third party documents acceptable except invoice.</p>
                <p>• Documents should clearly state the LC number and the name of the issuing bank.</p>
                <p>• Discrepant documents may be forwarded on collection basis subject to applicant's consent.</p>
                <p>• This LC is subject to ICC Uniform Customs and Practice for Documentary Credits (UCP 600) Publication No. 600 and ISBP 745.</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ── TAB 3: Amendment ── */}
        <TabsContent value="amendment" className="mt-4">
          <Card>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-navy">Amendment History</h2>
              <Badge variant="outline">{amendments.length} Amendment{amendments.length !== 1 ? "s" : ""}</Badge>
            </div>
            {amendments.length === 0 ? (
              <div className="p-10 text-center text-sm text-muted-foreground">No amendments on this LC.</div>
            ) : (
              <div className="divide-y divide-border">
                {amendments.map((amd) => (
                  <div key={amd.id} className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-navy text-sm">AMD-{amd.amendmentNo}</span>
                          {statusBadge(amd.status)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Date: {amd.date} · SWIFT: {amd.swiftRef}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">Requested by: {amd.requestedBy}</div>
                    </div>
                    <p className="text-sm text-foreground bg-muted/40 rounded-md p-3">{amd.description}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card className="p-4 mt-4 bg-muted/30">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                LC amendments are transmitted via SWIFT MT707. Amendment requests must be initiated through the Trade Finance Desk and are subject to beneficiary acceptance.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* ── TAB 4: Bills ── */}
        <TabsContent value="bills" className="mt-4">
          <Card>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-navy">Linked Import Bills</h2>
              <Badge variant="outline">{linkedBills.length} Bill{linkedBills.length !== 1 ? "s" : ""}</Badge>
            </div>
            {linkedBills.length === 0 ? (
              <div className="p-10 text-center text-sm text-muted-foreground">
                No import bills are linked to this LC yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill Number</TableHead>
                    <TableHead className="text-right">Bill Amount</TableHead>
                    <TableHead>Discrepancy Status</TableHead>
                    <TableHead>Acceptance Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {linkedBills.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-mono text-sm font-semibold">{String(b.billNumber)}</TableCell>
                      <TableCell className="text-right font-mono font-semibold">
                        {String(b.currency)} {Number(b.billAmount).toLocaleString("en-US", { minimumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            String(b.discrepancyStatus).includes("Clean")
                              ? "text-success border-success text-[10px]"
                              : "text-amber-600 border-amber-400 text-[10px]"
                          }
                        >
                          {String(b.discrepancyStatus)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">{String(b.acceptanceDate || "—")}</TableCell>
                      <TableCell className="text-xs">{String(b.dueDate)}</TableCell>
                      <TableCell>{statusBadge(String(b.status))}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/app/$" params={{ _splat: `import-bill/view/${b.id}` }}>
                            <Eye className="w-3.5 h-3.5" /> View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
          {/* Utilization summary */}
          {linkedBills.length > 0 && (
            <Card className="p-5 mt-4">
              <h3 className="font-semibold text-sm mb-3">LC Utilization Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">LC Value</div>
                  <div className="font-mono font-bold text-navy">
                    {record.currency} {Number(record.lcAmount).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Bills Presented</div>
                  <div className="font-mono font-bold text-foreground">
                    {record.currency}{" "}
                    {linkedBills.reduce((a, b) => a + Number(b.billAmount || 0), 0).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Remaining</div>
                  <div className="font-mono font-bold text-success">
                    {record.currency}{" "}
                    {(Number(record.lcAmount) - linkedBills.reduce((a, b) => a + Number(b.billAmount || 0), 0)).toLocaleString()}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* ── TAB 5: Guarantee ── */}
        <TabsContent value="guarantee" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 space-y-1">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Bank Guarantee / Security Details</h2>
              {fieldRow("Security Type", "Lien on Import LC proceeds")}
              {fieldRow("Cash Margin", "10% of LC Amount")}
              {fieldRow("Cash Margin Amount", `${record.currency} ${(Number(record.lcAmount) * 0.1).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, true)}
              {fieldRow("Margin Account", "0123100001 — Al-Wadeeah Current")}
              {fieldRow("Collateral Type", "Stock hypothecation & personal guarantee")}
              {fieldRow("Guarantee Reference", `BG-${String(record.lcNumber).replace("LC-", "")}`)  }
              {fieldRow("Guarantee Issue Date", String(record.openingDate))}
              {fieldRow("Guarantee Expiry", String(record.expiryDate))}
            </Card>
            <Card className="p-6">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Margin & Charge Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">LC Commission (0.5%)</span>
                  <span className="font-mono font-bold">{record.currency} {(Number(record.lcAmount) * 0.005).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Cash Margin (10%)</span>
                  <span className="font-mono font-bold">{record.currency} {(Number(record.lcAmount) * 0.1).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">SWIFT Charges (MT700)</span>
                  <span className="font-mono font-bold">BDT 3,500.00</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Courier / Handling</span>
                  <span className="font-mono font-bold">BDT 1,200.00</span>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span>Total Charges Debited</span>
                  <span className="font-mono text-navy">{record.currency} {(Number(record.lcAmount) * 0.105).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </Card>
            <Card className="p-5 lg:col-span-2 bg-muted/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <strong>Shariah Compliance Note:</strong> The cash margin collected operates under an Al-Wadeeah (safe-custody) arrangement. No interest is charged on the margin. 
                  LC commission represents the bank's actual service charge (Ujr) for facilitating trade, which is permissible under Islamic finance principles.
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ── TAB 6: SWIFT Messages ── */}
        <TabsContent value="swift" className="mt-4">
          <Card>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-navy">SWIFT Message Log</h2>
              <Badge variant="outline">{swiftMessages.length} Message{swiftMessages.length !== 1 ? "s" : ""}</Badge>
            </div>
            <div className="divide-y divide-border">
              {swiftMessages.map((msg) => (
                <div key={msg.id} className="p-5 space-y-2">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`text-[10px] font-bold px-2 py-0.5 ${
                        msg.msgType === "MT700" ? "bg-blue-100 text-blue-700 border border-blue-300" :
                        msg.msgType === "MT707" ? "bg-purple-100 text-purple-700 border border-purple-300" :
                        msg.msgType === "MT710" ? "bg-amber-100 text-amber-700 border border-amber-300" :
                        "bg-green-100 text-green-700 border border-green-300"
                      }`}>
                        {msg.msgType}
                      </Badge>
                      <span className="font-semibold text-sm">{msg.subject}</span>
                      <Badge variant="outline" className={`text-[10px] ${msg.status === "Sent" ? "text-success border-success" : "text-blue-600 border-blue-400"}`}>
                        {msg.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">{msg.date}</div>
                  </div>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <div><span className="font-semibold text-foreground">From:</span> {msg.from}</div>
                    <div><span className="font-semibold text-foreground">To:</span> {msg.to}</div>
                  </div>
                  <div className="bg-muted/40 rounded-md p-3 font-mono text-xs text-muted-foreground">
                    {msg.body}
                  </div>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" className="text-xs gap-1.5" onClick={() => toast.success(`SWIFT ${msg.msgType} message downloaded.`)}>
                      <Download className="w-3 h-3" /> Download {msg.msgType}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ── TAB 7: Advice ── */}
        <TabsContent value="advice" className="mt-4">
          <Card>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-navy">Advice Messages</h2>
              <Badge variant="outline">{adviceMessages.length} Advice</Badge>
            </div>
            {adviceMessages.length === 0 ? (
              <div className="p-10 text-center text-sm text-muted-foreground">No advice messages on this LC.</div>
            ) : (
              <div className="divide-y divide-border">
                {adviceMessages.map((adv) => (
                  <div key={adv.id} className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px]">{adv.type}</Badge>
                          <Badge variant="outline" className="text-[10px] text-success border-success">{adv.status}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{adv.date}</div>
                      </div>
                    </div>
                    <div className="text-xs space-y-1 text-muted-foreground">
                      <div><span className="font-semibold text-foreground">From:</span> {adv.from}</div>
                      <div><span className="font-semibold text-foreground">To:</span> {adv.to}</div>
                    </div>
                    <p className="text-sm bg-muted/40 rounded-md p-3">{adv.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        {/* ── TAB 8: Banks ── */}
        <TabsContent value="banks" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Issuing Bank */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md navy-gradient grid place-items-center shrink-0">
                  <Building2 className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-gold font-bold">Issuing Bank</div>
                  <h3 className="font-bold text-sm">Shahjalal Islami Bank PLC</h3>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                {fieldRow("SWIFT BIC", "SJIBBDDHXXX", true)}
                {fieldRow("Branch", "Dilkusha Corporate Branch")}
                {fieldRow("Address", "10, Dilkusha C/A, Dhaka-1000")}
                {fieldRow("Country", "Bangladesh")}
                {fieldRow("Contact", "+880-2-9560082")}
                {fieldRow("Trade Desk Email", "trade@sjiblbd.com")}
              </div>
            </Card>

            {/* Advising Bank */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-blue-100 grid place-items-center shrink-0">
                  <Building2 className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-blue-600 font-bold">Advising Bank</div>
                  <h3 className="font-bold text-sm">
                    {String(record.lcNumber).includes("0994")
                      ? "Commerzbank AG, Frankfurt"
                      : "Bank of China, Shanghai Branch"}
                  </h3>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                {fieldRow("SWIFT BIC", String(record.lcNumber).includes("0994") ? "COBADEFFXXX" : "BKCHCNBJXXX", true)}
                {fieldRow("Branch", String(record.lcNumber).includes("0994") ? "Frankfurt Main" : "Pudong Branch, Shanghai")}
                {fieldRow("Address", String(record.lcNumber).includes("0994") ? "Kaiserplatz, 60311 Frankfurt" : "2 East Chang'an Ave, Dongcheng, Beijing")}
                {fieldRow("Country", String(record.lcNumber).includes("0994") ? "Germany" : "China")}
                {fieldRow("Advising Ref", `ADV-${String(record.swiftReference || "").replace("SWF-", "")}`)}
              </div>
            </Card>

            {/* Confirming / Negotiating Bank */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-emerald-100 grid place-items-center shrink-0">
                  <Building2 className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-emerald-600 font-bold">Confirming / Negotiating Bank</div>
                  <h3 className="font-bold text-sm">Not Confirmed</h3>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                {fieldRow("Confirmation Status", "Unconfirmed LC")}
                {fieldRow("Negotiating Bank", "At Advising Bank's Discretion")}
                {fieldRow("Reimbursing Bank", "SJIBBDDHXXX (Self)")}
                {fieldRow("Reimbursement Terms", "Via SJIBL Nostro (CHIPS/SWIFT)")}
              </div>
              <div className="mt-4 p-3 bg-muted/40 rounded-md text-[11px] text-muted-foreground">
                This LC is unconfirmed. The advising bank has not added its confirmation. Beneficiary bears issuing bank risk.
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ==================== VIEW IMPORT BILL MODULE ==================== */

function ImportBillDashboardView() {
  const navigate = useNavigate();
  const records = list("import-bill");
  const [query, setQuery] = useState("");
  const [discrepancyFilter, setDiscrepancyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    let rows = [...records];

    // Discrepancy filter
    if (discrepancyFilter !== "all") {
      rows = rows.filter((r) =>
        String(r.discrepancyStatus || "").toLowerCase().includes(discrepancyFilter.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      rows = rows.filter((r) =>
        String(r.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((r) =>
        Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(q))
      );
    }

    return rows;
  }, [records, query, discrepancyFilter, statusFilter]);

  // Aggregates
  const pendingCount = useMemo(() =>
    records.filter((r) => r.status === "Pending").length,
    [records]
  );
  
  const totalUSD = useMemo(() =>
    records.filter((r) => r.currency === "USD").reduce((a, r) => a + Number(r.billAmount || 0), 0),
    [records]
  );

  const totalEUR = useMemo(() =>
    records.filter((r) => r.currency === "EUR").reduce((a, r) => a + Number(r.billAmount || 0), 0),
    [records]
  );

  const discrepancyBadgeColor = (s: string) => {
    if (s?.includes("Clean")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (s?.includes("Minor")) return "bg-amber-50 text-amber-700 border-amber-200";
    if (s?.includes("Major")) return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-semibold">View Import Bill</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">Trade Finance</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Import Bills</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Monitor, audit, and authorize payments for import documentary bills, track discrepancies, and arrange post-import financing.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success("Import Bill PDF report exported.")}><FileText className="w-4 h-4" />Export PDF</Button>
          <Button variant="outline" onClick={() => toast.success("Import Bill Excel report exported.")}><Download className="w-4 h-4" />Export Excel</Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Total Import Bills</div>
          <div className="font-display text-3xl font-bold text-navy mt-2">{records.length}</div>
          <div className="text-[10px] text-muted-foreground mt-1">{filtered.length} matching search</div>
        </Card>
        <Card className={`p-5 ${pendingCount > 0 ? "border-amber-300 bg-amber-50/30" : ""}`}>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Pending Acceptance</div>
          <div className={`font-display text-3xl font-bold mt-2 ${pendingCount > 0 ? "text-amber-600" : "text-navy"}`}>
            {pendingCount}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Awaiting applicant consent</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">USD Bill Value</div>
          <div className="font-display text-2xl font-bold text-navy mt-2">
            USD {totalUSD.toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Presented under LCs</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">EUR Bill Value</div>
          <div className="font-display text-2xl font-bold text-navy mt-2">
            EUR {totalEUR.toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Presented under LCs</div>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="import-bill-search"
              placeholder="Search Bill No., LC No. or amount…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={discrepancyFilter} onValueChange={setDiscrepancyFilter}>
            <SelectTrigger className="w-44 text-xs" id="discrepancy-filter">
              <SelectValue placeholder="Discrepancy Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Discrepancy Types</SelectItem>
              <SelectItem value="Clean">Clean Bills</SelectItem>
              <SelectItem value="Minor">Minor Discrepancy</SelectItem>
              <SelectItem value="Major">Major Discrepancy</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 text-xs" id="status-filter">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved & Settled</SelectItem>
              <SelectItem value="pending">Pending Acceptance</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          {(query || discrepancyFilter !== "all" || statusFilter !== "all") && (
            <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setDiscrepancyFilter("all"); setStatusFilter("all"); }}>
              <X className="w-3.5 h-3.5" /> Clear
            </Button>
          )}
        </div>
      </Card>

      {/* Bills Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bill Number</TableHead>
              <TableHead>Linked LC</TableHead>
              <TableHead className="text-right">Bill Amount</TableHead>
              <TableHead>Discrepancies</TableHead>
              <TableHead>Acceptance Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-sm text-muted-foreground py-12">
                  No Import Bills found matching search criteria.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((r) => (
                <TableRow key={r.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => navigate({ to: "/app/$", params: { _splat: `import-bill/view/${r.id}` } })}>
                  <TableCell className="font-mono text-sm font-semibold text-navy">
                    {String(r.billNumber)}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {String(r.lcNumber)}
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    {String(r.currency)} {Number(r.billAmount).toLocaleString("en-US", { minimumFractionDigits: 0 })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] font-semibold ${discrepancyBadgeColor(String(r.discrepancyStatus))}`}>
                      {String(r.discrepancyStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{String(r.acceptanceDate || "—")}</TableCell>
                  <TableCell className="text-xs font-semibold">{String(r.dueDate)}</TableCell>
                  <TableCell>{statusBadge(String(r.status))}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                      <Link to="/app/$" params={{ _splat: `import-bill/view/${r.id}` }}>
                        <Eye className="w-3.5 h-3.5" /> View Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

/* ---- Mock data helpers for Import Bill Detail View ---- */

function getBillSwiftMessages(billNumber: string) {
  return [
    {
      id: "SWB-001", msgType: "MT750", date: "2025-05-22 11:14:00",
      subject: "Advice of Discrepancy",
      from: "BKCHCNBJXXX (Bank of China, Shanghai)",
      to: "SJIBBDDHXXX (Shahjalal Islami Bank PLC)",
      status: "Received", body: "Field 77A: DISCREPANCIES\n1. LATE SHIPMENT BY 2 DAYS\n2. COMMERCIAL INVOICE DOES NOT SHOW HS CODE",
    },
    {
      id: "SWB-002", msgType: "MT754", date: "2025-05-25 15:30:00",
      subject: "Advice of Payment / Acceptance / Negotiation",
      from: "BKCHCNBJXXX (Bank of China, Shanghai)",
      to: "SJIBBDDHXXX (Shahjalal Islami Bank PLC)",
      status: "Received", body: "Field 32B: USD 150000,00\nField 34B: USD 150000,00\nWE HAVE NEGOTIATED DOCUMENTS AND FORWARDED TO YOU ON COLLECTION BASIS.",
    },
  ].filter((_, i) => billNumber.includes("55204") ? true : i === 1);
}

function getBillAdviceMessages(billNumber: string) {
  return [
    {
      id: "ADVB-001",
      date: "2025-05-23",
      type: "Lodgement Advice",
      from: "SJIBL Trade Services Dept",
      to: "Globex Industries Ltd",
      summary: "Import documents under Bill Ref: BL-IMP-55204 received from presenter bank. Discrepancies noted. Awaiting your acceptance.",
      status: "Action Required",
    },
    {
      id: "ADVB-002",
      date: "2025-06-15",
      type: "Payment Advice",
      from: "SJIBL Corporate Banking",
      to: "Globex Industries Ltd",
      summary: "We have debited your current account for settlement of Bill BL-IMP-55201. SWIFT payment message MT756 transmitted.",
      status: "Disbursed",
    },
  ].filter((m) => billNumber.includes("55204") ? m.id === "ADVB-001" : m.id === "ADVB-002");
}

/* ---- ImportBillDetailView ---- */

function ImportBillDetailView({ record }: { record: any }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");
  const [billStatus, setBillStatus] = useState(String(record.status));

  // Find linked LC
  const linkedLC = useMemo(() => {
    const lcs = list("import-lc");
    return lcs.find((lc) => String(lc.lcNumber) === String(record.lcNumber));
  }, [record.lcNumber]);

  const swiftMessages = useMemo(() => getBillSwiftMessages(String(record.billNumber)), [record.billNumber]);
  const adviceMessages = useMemo(() => getBillAdviceMessages(String(record.billNumber)), [record.billNumber]);

  const discrepancyBadgeColor = (s: string) => {
    if (s?.includes("Clean")) return "border-emerald-300 text-emerald-700 bg-emerald-50";
    if (s?.includes("Minor")) return "border-amber-300 text-amber-700 bg-amber-50";
    if (s?.includes("Major")) return "border-rose-300 text-rose-700 bg-rose-50";
    return "";
  };

  const fieldRow = (label: string, value: string | undefined, mono = false) => (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground shrink-0 min-w-[140px]">{label}</span>
      <span className={`text-sm font-medium text-right ${mono ? "font-mono" : ""}`}>{value || "—"}</span>
    </div>
  );

  const handleAcceptDiscrepancies = () => {
    setBillStatus("Approved");
    toast.success("Discrepancies accepted. Payment authorized successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: "import-bill" }} className="hover:text-navy">Import Bills</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-mono">{record.billNumber}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate({ to: "/app/$", params: { _splat: "import-bill" } })}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-xs uppercase tracking-widest text-gold font-bold">Import Bill</div>
              <Badge variant="outline" className={`text-[10px] font-bold ${discrepancyBadgeColor(String(record.discrepancyStatus))}`}>
                {record.discrepancyStatus}
              </Badge>
              {statusBadge(billStatus)}
            </div>
            <h1 className="font-display text-2xl font-bold text-navy mt-0.5">{record.billNumber}</h1>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              Linked LC: <Link to="/app/$" params={{ _splat: `import-lc/view/${linkedLC?.id || ""}` }} className="text-gold hover:underline">{record.lcNumber}</Link> · Due Date: {record.dueDate}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={() => { toast.success("Bill summary downloaded."); }}>
            <FileText className="w-4 h-4" /> Download Bill Summary
          </Button>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Bill Amount</div>
          <div className="font-mono font-bold text-lg text-navy mt-1">
            {record.currency} {Number(record.billAmount).toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Linked LC Number</div>
          <div className="font-mono font-semibold text-sm mt-1 truncate">{record.lcNumber}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Due Date</div>
          <div className="font-semibold text-sm mt-1 text-navy">{String(record.dueDate)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Discrepancy Status</div>
          <div className="font-semibold text-xs mt-1 text-amber-600 truncate">{String(record.discrepancyStatus)}</div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="min-w-max">
            <TabsTrigger value="summary" id="tab-bill-summary">Bill Summary</TabsTrigger>
            <TabsTrigger value="lc-details" id="tab-bill-lc">LC Details</TabsTrigger>
            <TabsTrigger value="discrepancy" id="tab-bill-disc">Discrepancy Details</TabsTrigger>
            <TabsTrigger value="swift" id="tab-bill-swift">SWIFT Message</TabsTrigger>
            <TabsTrigger value="advice" id="tab-bill-adv">Advice</TabsTrigger>
            <TabsTrigger value="investment" id="tab-bill-inv">Investment (Credit)</TabsTrigger>
          </TabsList>
        </div>

        {/* ── TAB 1: Bill Summary ── */}
        <TabsContent value="summary" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 space-y-1">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Bill Details</h2>
              {fieldRow("Bill Number", String(record.billNumber), true)}
              {fieldRow("Linked LC Number", String(record.lcNumber), true)}
              {fieldRow("Bill Amount", `${record.currency} ${Number(record.billAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, true)}
              {fieldRow("Lodgement Date", String(record.acceptanceDate ? "2025-05-15" : "2025-05-22"))}
              {fieldRow("Acceptance Date", String(record.acceptanceDate || "—"))}
              {fieldRow("Due Date", String(record.dueDate))}
              {fieldRow("Tenure / Terms", linkedLC ? String(linkedLC.lcType).includes("Sight") ? "Sight / On Presentation" : "Usance (90 Days EOD)" : "Usance (90 Days EOD)")}
            </Card>

            <Card className="p-6 space-y-1">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Applicant & Supplier</h2>
              {fieldRow("Applicant", "Globex Industries Ltd")}
              {fieldRow("Applicant CIF", "CIF-GBX-10029")}
              {fieldRow("Debit Account", "0123100001 — Al-Wadeeah Current")}
              {fieldRow("Supplier / Beneficiary", linkedLC ? String(linkedLC.beneficiaryName) : "Global Goods Ltd")}
              {fieldRow("Beneficiary Country", linkedLC ? String(linkedLC.beneficiaryAddress || "").split(",").pop()?.trim() || "China" : "China")}
              {fieldRow("Presenting Bank SWIFT", "BKCHCNBJXXX (Bank of China, Shanghai)")}
            </Card>
          </div>
        </TabsContent>

        {/* ── TAB 2: LC Details (General, Shipment, Documents) ── */}
        <TabsContent value="lc-details" className="mt-4">
          {linkedLC ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General details */}
              <Card className="p-6 space-y-1">
                <h2 className="font-display text-lg font-bold text-navy mb-4">General LC Details</h2>
                {fieldRow("LC Number", String(linkedLC.lcNumber), true)}
                {fieldRow("LC Type", String(linkedLC.lcType))}
                {fieldRow("SWIFT Reference", String(linkedLC.swiftReference || "—"), true)}
                {fieldRow("Status", String(linkedLC.status))}
                {fieldRow("Opening Date", String(linkedLC.openingDate))}
                {fieldRow("Expiry Date", String(linkedLC.expiryDate))}
                {fieldRow("LC Amount", `${linkedLC.currency} ${Number(linkedLC.lcAmount).toLocaleString()}`, true)}
              </Card>

              {/* Shipment details */}
              <Card className="p-6 space-y-3">
                <h2 className="font-display text-lg font-bold text-navy mb-2">Shipment details</h2>
                {fieldRow("Latest Shipment Date", String(linkedLC.shipmentDate || "—"))}
                {fieldRow("Port of Loading", "Shanghai / Ningbo")}
                {fieldRow("Port of Discharge", "Chittagong Port, Bangladesh")}
                {fieldRow("Incoterms", "CIF Chittagong")}
                <div className="pt-2">
                  <span className="text-xs text-muted-foreground block mb-1">Description of Goods</span>
                  <div className="p-3 bg-muted/40 rounded-md text-sm">{String(linkedLC.goodsDescription || "—")}</div>
                </div>
              </Card>

              {/* Documents Required */}
              <Card className="p-6 lg:col-span-2 space-y-3">
                <h2 className="font-display text-lg font-bold text-navy mb-2">Documents Required Under LC</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {[
                    "Signed Commercial Invoice (3 originals)",
                    "Full Set of Clean On-Board Bill of Lading",
                    "Packing List (3 copies)",
                    "Certificate of Origin (Country of Origin: China)",
                    "Insurance Certificate (all risks, CIF + 10%)",
                    "Pre-shipment Inspection Certificate",
                  ].map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ) : (
            <Card className="p-8 text-center text-muted-foreground">
              <Info className="w-12 h-12 mx-auto text-muted-foreground opacity-50 mb-3" />
              <p className="text-sm">Corresponding LC record ({record.lcNumber}) was not found in the local database.</p>
            </Card>
          )}
        </TabsContent>

        {/* ── TAB 3: Discrepancy Details ── */}
        <TabsContent value="discrepancy" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 lg:col-span-2 space-y-4">
              <h2 className="font-display text-lg font-bold text-navy">Document Discrepancy Log</h2>
              
              <div className={`p-4 rounded-md border flex items-start gap-3 ${
                String(record.discrepancyStatus).includes("Clean")
                  ? "bg-emerald-50/50 border-emerald-200 text-emerald-800"
                  : "bg-amber-50/50 border-amber-200 text-amber-800"
              }`}>
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Discrepancy Status: {record.discrepancyStatus}</div>
                  <p className="text-xs mt-1 text-muted-foreground leading-relaxed">
                    {String(record.discrepancyStatus).includes("Clean")
                      ? "Documents are clean and comply fully with the terms and conditions of the LC. Straight-through settlement authorized."
                      : "Presenting bank forwarded documents containing discrepancies. Payment cannot be released until discrepancies are formally accepted by the applicant."}
                  </p>
                </div>
              </div>

              {!String(record.discrepancyStatus).includes("Clean") && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-navy">Reported Discrepancies:</h3>
                  <div className="bg-muted/40 p-4 rounded-md font-mono text-xs leading-relaxed space-y-2">
                    <p>1. LATE SHIPMENT: Goods shipped on 2025-05-12, exceeding the latest shipment limit of 2025-05-10 by 2 days.</p>
                    <p>2. DESCRIPTION MISMATCH: Invoice lists "Additives Compound G-2" instead of "Chemical grade additives and solvents".</p>
                    <p>3. INVOICE HS CODE: Commercial invoice omits the required 8-digit HS Code reference.</p>
                  </div>
                </div>
              )}

              {/* Action consent box */}
              {billStatus === "Pending" && !String(record.discrepancyStatus).includes("Clean") && (
                <Card className="p-4 border border-gold/30 bg-gold/[0.02] space-y-3">
                  <h3 className="font-display text-sm font-bold text-navy">Corporate Authorization & Waiver</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    As the applicant, you must authorize a waiver of these discrepancies in order to release payment/acceptance to the presenting bank. By clicking accept, you authorize SJIBL to credit the negotiating bank.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" className="bg-gold text-gold-foreground hover:bg-gold/90 gap-1.5" onClick={handleAcceptDiscrepancies}>
                      <Check className="w-3.5 h-3.5" /> Accept Discrepancy & Accept Bill
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => { setBillStatus("Rejected"); toast.error("Bill rejected. Documents returned on collection basis."); }}>
                      Reject & Return Documents
                    </Button>
                  </div>
                </Card>
              )}
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="font-display text-sm font-bold text-navy">Regulatory Audit</h2>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-muted-foreground block">UCP 600 Compliance</span>
                  <span className="font-semibold text-foreground">Article 16 (Discrepant Documents & Waiver)</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Auditor Decision window</span>
                  <span className="font-semibold text-foreground">5 Banking Days from lodgement</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Lodgement Reference</span>
                  <span className="font-semibold font-mono text-foreground">LOD-IMP-55204</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <span className="text-muted-foreground leading-relaxed block text-[10px]">
                    <strong>Note:</strong> Under Shariah compliance, payments on discrepant documents can proceed only once the buyer waives their objection and agrees to purchase the goods as delivered.
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ── TAB 4: SWIFT Message ── */}
        <TabsContent value="swift" className="mt-4">
          <Card>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-navy">Linked SWIFT Messages</h2>
              <Badge variant="outline">{swiftMessages.length} Messages</Badge>
            </div>
            <div className="divide-y divide-border">
              {swiftMessages.map((msg) => (
                <div key={msg.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`text-[10px] font-bold px-2 py-0.5 ${
                        msg.msgType === "MT750" ? "bg-rose-100 text-rose-700 border border-rose-300" :
                        "bg-blue-100 text-blue-700 border border-blue-300"
                      }`}>
                        {msg.msgType}
                      </Badge>
                      <span className="font-semibold text-sm">{msg.subject}</span>
                      <Badge variant="outline" className="text-[10px] text-success border-success">
                        {msg.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">{msg.date}</div>
                  </div>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <div><span className="font-semibold text-foreground">From:</span> {msg.from}</div>
                    <div><span className="font-semibold text-foreground">To:</span> {msg.to}</div>
                  </div>
                  <div className="bg-muted/40 rounded-md p-3 font-mono text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                    {msg.body}
                  </div>
                  <div className="flex justify-end pt-1">
                    <Button variant="ghost" size="sm" className="text-xs gap-1.5" onClick={() => toast.success(`SWIFT message ${msg.msgType} downloaded.`)}>
                      <Download className="w-3.5 h-3.5" /> Download SWIFT Body
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ── TAB 5: Advice ── */}
        <TabsContent value="advice" className="mt-4">
          <Card>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-navy">Trade Services Advice Letters</h2>
              <Badge variant="outline">{adviceMessages.length} Advices</Badge>
            </div>
            {adviceMessages.length === 0 ? (
              <div className="p-10 text-center text-sm text-muted-foreground">No advise documents generated for this bill.</div>
            ) : (
              <div className="divide-y divide-border">
                {adviceMessages.map((adv) => (
                  <div key={adv.id} className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] bg-muted/50">{adv.type}</Badge>
                          <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300">{adv.status}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1.5">Dated: {adv.date}</div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1.5" onClick={() => toast.success(`${adv.type} letter downloaded.`)}>
                        <FileText className="w-3.5 h-3.5" /> Download PDF
                      </Button>
                    </div>
                    <div className="text-xs space-y-1 text-muted-foreground">
                      <div><span className="font-semibold text-foreground">Sender:</span> {adv.from}</div>
                      <div><span className="font-semibold text-foreground">Recipient:</span> {adv.to}</div>
                    </div>
                    <p className="text-sm bg-muted/40 rounded-md p-3 leading-relaxed text-foreground">{adv.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        {/* ── TAB 6: Investment (Finance / Credit) ── */}
        <TabsContent value="investment" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="font-display text-lg font-bold text-navy">Post-Import Credit & Financing</h2>
                <Badge className="bg-navy text-gold font-bold">Bai-Murabaha Mode</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-md space-y-1">
                  <div className="text-xs text-muted-foreground">Finance Instrument</div>
                  <div className="font-semibold text-sm">MPI (Murabaha Post-Import) / LTR Equivalent</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-md space-y-1">
                  <div className="text-xs text-muted-foreground">Linked Credit Facility</div>
                  <div className="font-semibold text-sm">FAC-MUR-8839 (Globex Raw Material Limit)</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-md space-y-1">
                  <div className="text-xs text-muted-foreground">Financed Amount</div>
                  <div className="font-mono font-bold text-navy text-base">
                    {record.currency} {Number(record.billAmount * 0.9).toLocaleString("en-US", { minimumFractionDigits: 0 })}
                  </div>
                  <div className="text-[10px] text-muted-foreground">90% of Bill Value (10% paid via Cash Margin)</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-md space-y-1">
                  <div className="text-xs text-muted-foreground">Markup / profit rate</div>
                  <div className="font-semibold text-sm">9.50% per annum (Shariah Fixed Cost)</div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Repayment Schedule Summary</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Installment</TableHead>
                      <TableHead>Principal Due</TableHead>
                      <TableHead>Profit Markup</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-xs">Installment #1 (30d)</TableCell>
                      <TableCell className="font-mono text-xs">
                        {record.currency} {Number(record.billAmount * 0.3).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {record.currency} {Number(record.billAmount * 0.9 * 0.095 * 30 / 365).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-xs">
                        {new Date(new Date(String(record.dueDate)).getTime() + 30 * 86400000).toISOString().slice(0, 10)}
                      </TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px] text-muted-foreground">Scheduled</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-xs">Installment #2 (60d)</TableCell>
                      <TableCell className="font-mono text-xs">
                        {record.currency} {Number(record.billAmount * 0.3).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {record.currency} {Number(record.billAmount * 0.9 * 0.095 * 60 / 365).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-xs">
                        {new Date(new Date(String(record.dueDate)).getTime() + 60 * 86400000).toISOString().slice(0, 10)}
                      </TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px] text-muted-foreground">Scheduled</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-xs">Installment #3 (90d)</TableCell>
                      <TableCell className="font-mono text-xs">
                        {record.currency} {Number(record.billAmount * 0.3).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {record.currency} {Number(record.billAmount * 0.9 * 0.095 * 90 / 365).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-xs">
                        {new Date(new Date(String(record.dueDate)).getTime() + 90 * 86400000).toISOString().slice(0, 10)}
                      </TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px] text-muted-foreground">Scheduled</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="font-display text-sm font-bold text-navy">Credit Facilities Ledger</h2>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-muted-foreground block mb-0.5">Approved MPI Limit</span>
                  <div className="font-mono font-bold text-sm text-navy">BDT 150,000,000</div>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Available Limit</span>
                  <div className="font-mono font-bold text-sm text-success">BDT 64,600,000</div>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Financing Tenure</span>
                  <span className="font-semibold text-foreground">90 Days Usance</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Liquidation mode</span>
                  <span className="font-semibold text-foreground">Automated debit on maturity</span>
                </div>
                
                <div className="border-t pt-4">
                  <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90 gap-1.5" onClick={() => toast.success("Refinancing request submitted to checker.")}>
                    <Coins className="w-3.5 h-3.5" /> Convert to Post-Import Loan
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ==================== VIEW EXPORT LC MODULE ==================== */

function ExportLCDashboardView() {
  const navigate = useNavigate();
  const records = list("export-lc");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    let rows = [...records];

    // Status filter
    if (statusFilter !== "all") {
      rows = rows.filter((r) =>
        String(r.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((r) =>
        Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(q))
      );
    }

    return rows;
  }, [records, query, statusFilter]);

  // Aggregates
  const totalUSD = useMemo(() =>
    records.filter((r) => r.currency === "USD").reduce((a, r) => a + Number(r.lcAmount || 0), 0),
    [records]
  );
  
  const activeCount = useMemo(() =>
    records.filter((r) => r.status === "Approved").length,
    [records]
  );

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-semibold">View Export LC</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">Trade Finance</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Export Letters of Credit</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Track export letters of credit advised through SJIBL, manage amendments, monitor presented export bills, and view pre/post-shipment export finance details.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success("Export LC PDF report generated.")}><FileText className="w-4 h-4" />Export PDF</Button>
          <Button variant="outline" onClick={() => toast.success("Export LC Excel report generated.")}><Download className="w-4 h-4" />Export Excel</Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Total Advised LCs</div>
          <div className="font-display text-3xl font-bold text-navy mt-2">{records.length}</div>
          <div className="text-[10px] text-muted-foreground mt-1">{filtered.length} matching search</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Active Export Value</div>
          <div className="font-display text-2xl font-bold text-navy mt-2">
            USD {totalUSD.toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Advised to local exporters</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Active LCs</div>
          <div className="font-display text-3xl font-bold text-success mt-2">{activeCount}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Awaiting presentation / realization</div>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="export-lc-search"
              placeholder="Search LC No., Buyer, Issuing Bank…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 text-xs" id="status-filter">
              <SelectValue placeholder="LC Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved & Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          {(query || statusFilter !== "all") && (
            <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setStatusFilter("all"); }}>
              <X className="w-3.5 h-3.5" /> Clear
            </Button>
          )}
        </div>
      </Card>

      {/* LCs Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>LC Number</TableHead>
              <TableHead>Buyer / Applicant</TableHead>
              <TableHead>Issuing Bank</TableHead>
              <TableHead>Advising Ref</TableHead>
              <TableHead className="text-right">LC Amount</TableHead>
              <TableHead>Opening Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-sm text-muted-foreground py-12">
                  No Export LCs found matching search criteria.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((r) => (
                <TableRow key={r.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => navigate({ to: "/app/$", params: { _splat: `export-lc/view/${r.id}` } })}>
                  <TableCell className="font-mono text-sm font-semibold text-navy">
                    {String(r.lcNumber)}
                  </TableCell>
                  <TableCell className="text-sm font-medium">{String(r.applicantName)}</TableCell>
                  <TableCell className="text-sm">{String(r.issuingBank)}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{String(r.advisingRef || "—")}</TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    {String(r.currency)} {Number(r.lcAmount).toLocaleString("en-US", { minimumFractionDigits: 0 })}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{String(r.openingDate)}</TableCell>
                  <TableCell className="text-xs">{String(r.expiryDate)}</TableCell>
                  <TableCell>{statusBadge(String(r.status))}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                      <Link to="/app/$" params={{ _splat: `export-lc/view/${r.id}` }}>
                        <Eye className="w-3.5 h-3.5" /> View Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

/* ---- Mock data helpers for Export LC Detail View ---- */

function getExportAmendments(lcNumber: string) {
  return [
    {
      id: "AMDE-001",
      amendmentNo: "01",
      date: "2025-05-10",
      description: "Increase in LC value by USD 50,000. Total value amended to USD 900,000.",
      swiftRef: "MT707-00911",
      status: "Approved",
    },
    {
      id: "AMDE-002",
      amendmentNo: "02",
      date: "2025-05-28",
      description: "Extension of latest shipment date to 2025-06-30 and expiry date to 2025-07-31.",
      swiftRef: "MT707-00944",
      status: "Approved",
    }
  ];
}

function getExportSwiftMessages(lcNumber: string) {
  return [
    {
      id: "SWE-001", msgType: "MT710", date: "2025-04-15 09:30:00",
      subject: "Advice of Third Bank's Documentary Credit",
      from: "WELSUS6NYXXX (Wells Fargo Bank NA, NY)",
      to: "SJIBBDDHXXX (Shahjalal Islami Bank PLC)",
      status: "Received", body: "Sender Ref: 2025-WF-88912 | Receiver Ref: ADV-88291 | Beneficiary: Globex Industries Ltd | Applicant: Walmart Inc | Amount: USD 850,000.00",
    },
    {
      id: "SWE-002", msgType: "MT707", date: "2025-05-10 14:20:00",
      subject: "Amendment to Documentary Credit",
      from: "WELSUS6NYXXX (Wells Fargo Bank NA, NY)",
      to: "SJIBBDDHXXX (Shahjalal Islami Bank PLC)",
      status: "Received", body: "Amendment No: 01 | Increase in LC Amount: USD 50,000.00 | New LC Value: USD 900,000.00",
    },
    {
      id: "SWE-003", msgType: "MT754", date: "2025-06-10 16:45:00",
      subject: "Advice of Payment/Acceptance/Negotiation",
      from: "SJIBBDDHXXX (Shahjalal Islami Bank PLC)",
      to: "WELSUS6NYXXX (Wells Fargo Bank NA, NY)",
      status: "Sent", body: "We have negotiated export documents and claimed USD 350,000 under your credit reference 2025-WF-88912.",
    }
  ];
}

/* ---- ExportLCDetailView ---- */

function ExportLCDetailView({ record }: { record: any }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");

  // Fetch linked export bills
  const linkedBills = useMemo(() => {
    const bills = list("export-bill");
    return bills.filter((b) => String(b.lcNumber) === String(record.lcNumber));
  }, [record.lcNumber]);

  const amendments = useMemo(() => getExportAmendments(String(record.lcNumber)), [record.lcNumber]);
  const swiftMessages = useMemo(() => getExportSwiftMessages(String(record.lcNumber)), [record.lcNumber]);

  const now = new Date();
  const expiry = new Date(String(record.expiryDate));
  const daysToExpiry = Math.ceil((expiry.getTime() - now.getTime()) / 86400000);
  const isExpired = daysToExpiry < 0;

  const fieldRow = (label: string, value: string | undefined, mono = false) => (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground shrink-0 min-w-[140px]">{label}</span>
      <span className={`text-sm font-medium text-right ${mono ? "font-mono" : ""}`}>{value || "—"}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: "export-lc" }} className="hover:text-navy">Export LC</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-mono">{record.lcNumber}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate({ to: "/app/$", params: { _splat: "export-lc" } })}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-xs uppercase tracking-widest text-gold font-bold">Export LC</div>
              {statusBadge(String(record.status))}
              {isExpired && <Badge variant="outline" className="text-destructive border-destructive text-[10px]">EXPIRED</Badge>}
            </div>
            <h1 className="font-display text-2xl font-bold text-navy mt-0.5">{record.lcNumber}</h1>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              Advising Ref: {record.advisingRef || "—"} · Advising Date: {record.openingDate}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={() => toast.success("Export LC Summary PDF exported.")}>
            <FileText className="w-4 h-4" /> Download Advising Letter
          </Button>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">LC Amount</div>
          <div className="font-mono font-bold text-lg text-navy mt-1">
            {record.currency} {Number(record.lcAmount).toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Buyer / Applicant</div>
          <div className="font-semibold text-sm mt-1 truncate">{record.applicantName}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Expiry Date</div>
          <div className={`font-semibold text-sm mt-1 ${isExpired ? "text-destructive" : "text-navy"}`}>
            {String(record.expiryDate)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Presented Export Bills</div>
          <div className="font-bold text-2xl text-navy mt-1">{linkedBills.length}</div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="min-w-max">
            <TabsTrigger value="summary" id="tab-ex-summary">Export LC Summary</TabsTrigger>
            <TabsTrigger value="details" id="tab-ex-lc">LC Details</TabsTrigger>
            <TabsTrigger value="amendment" id="tab-ex-amd">
              Amendment {amendments.length > 0 && <Badge className="ml-1 h-4 text-[10px] px-1 bg-navy text-white">{amendments.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="bills" id="tab-ex-bills">
              Bills {linkedBills.length > 0 && <Badge className="ml-1 h-4 text-[10px] px-1 bg-navy text-white">{linkedBills.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="guarantee" id="tab-ex-guar">Guarantee</TabsTrigger>
            <TabsTrigger value="swift" id="tab-ex-swift">SWIFT Message</TabsTrigger>
            <TabsTrigger value="investment" id="tab-ex-inv">Investment (Credit)</TabsTrigger>
          </TabsList>
        </div>

        {/* ── TAB 1: Export LC Summary ── */}
        <TabsContent value="summary" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 space-y-1">
              <h2 className="font-display text-lg font-bold text-navy mb-4">LC Overview</h2>
              {fieldRow("LC Number", String(record.lcNumber), true)}
              {fieldRow("Buyer / Applicant", String(record.applicantName))}
              {fieldRow("LC Amount", `${record.currency} ${Number(record.lcAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, true)}
              {fieldRow("Advising Reference", String(record.advisingRef || "—"), true)}
              {fieldRow("Advising Date", String(record.openingDate))}
              {fieldRow("Expiry Date", String(record.expiryDate))}
              {fieldRow("Latest Shipment", String(record.shipmentDate || "—"))}
            </Card>

            <Card className="p-6 space-y-1">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Advising & Issuing Bank</h2>
              {fieldRow("Issuing Bank", String(record.issuingBank))}
              {fieldRow("Issuing Bank SWIFT", "WELSUS6NYXXX (Wells Fargo Bank NA, NY)")}
              {fieldRow("Advising Bank", "Shahjalal Islami Bank PLC")}
              {fieldRow("Advising Branch", "Dilkusha Corporate Branch")}
              {fieldRow("Exporter / Beneficiary", "Globex Industries Ltd")}
              {fieldRow("Exporter Account", "0123100001 — Al-Wadeeah Current")}
            </Card>
          </div>
        </TabsContent>

        {/* ── TAB 2: LC Details (General, Shipment, Documents) ── */}
        <TabsContent value="details" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General details */}
            <Card className="p-6 space-y-1">
              <h2 className="font-display text-lg font-bold text-navy mb-4">General Terms</h2>
              {fieldRow("LC Rules", "UCP LATEST VERSION (UCP 600)")}
              {fieldRow("Transferable Status", "Irrevocable & Non-Transferable")}
              {fieldRow("Partial Shipment", "Allowed")}
              {fieldRow("Transshipment", "Allowed")}
              {fieldRow("Tolerance (%)", "5% / -5%")}
              {fieldRow("Mode of Payment", "Negotiation at 60 Days Usance")}
            </Card>

            {/* Shipment details */}
            <Card className="p-6 space-y-3">
              <h2 className="font-display text-lg font-bold text-navy mb-2">Shipment details</h2>
              {fieldRow("Latest Shipment Date", String(record.shipmentDate || "—"))}
              {fieldRow("Port of Loading", "Chittagong Port, Bangladesh")}
              {fieldRow("Port of Discharge", "Port of New York / Newark, USA")}
              {fieldRow("Incoterms", "FOB Chittagong")}
              <div className="pt-2">
                <span className="text-xs text-muted-foreground block mb-1">Description of Goods</span>
                <div className="p-3 bg-muted/40 rounded-md text-sm">{String(record.goodsDescription || "—")}</div>
              </div>
            </Card>

            {/* Documents Required */}
            <Card className="p-6 lg:col-span-2 space-y-3">
              <h2 className="font-display text-lg font-bold text-navy mb-2">Documents Required for Bill Presentation</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                To realize funds from the issuing bank, exporters must present compliance records verifying shipment details:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm pt-2">
                {[
                  "Signed Commercial Invoice (Original + 3 copies) indicating FOB values",
                  "Full set of Clean On-Board Ocean Bills of Lading made out to the order of Wells Fargo Bank",
                  "Packing List detailing exact weights, cartons, and dimensions",
                  "Certificate of Origin issued by Chamber of Commerce, Bangladesh",
                  "GSP Certificate of Origin Form A",
                  "Beneficiary's certificate confirming shipment samples dispatched to applicant",
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </TabsContent>

        {/* ── TAB 3: Amendment ── */}
        <TabsContent value="amendment" className="mt-4">
          <Card>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-navy">Amendment History</h2>
              <Badge variant="outline">{amendments.length} Amendments</Badge>
            </div>
            {amendments.length === 0 ? (
              <div className="p-10 text-center text-sm text-muted-foreground">No amendments advised for this credit.</div>
            ) : (
              <div className="divide-y divide-border">
                {amendments.map((amd) => (
                  <div key={amd.id} className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-navy text-sm">AMD-{amd.amendmentNo}</span>
                          <Badge variant="outline" className="text-[10px] text-success border-success">{amd.status}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Advised on: {amd.date} · SWIFT Reference: {amd.swiftRef}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground bg-muted/40 rounded-md p-3">{amd.description}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        {/* ── TAB 4: Bills ── */}
        <TabsContent value="bills" className="mt-4">
          <Card>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-navy">Presented Export Bills</h2>
              <Badge variant="outline">{linkedBills.length} Bill Presented</Badge>
            </div>
            {linkedBills.length === 0 ? (
              <div className="p-10 text-center text-sm text-muted-foreground">
                No export bills have been negotiated or presented under this credit.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill Reference</TableHead>
                    <TableHead className="text-right">Presented Amount</TableHead>
                    <TableHead className="text-right">Negotiated Amount</TableHead>
                    <TableHead className="text-right">Realized Amount</TableHead>
                    <TableHead>Realization Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {linkedBills.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-mono text-sm font-semibold">{String(b.billNumber)}</TableCell>
                      <TableCell className="text-right font-mono font-semibold">
                        {String(b.currency)} {Number(b.billAmount).toLocaleString("en-US", { minimumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-navy">
                        {b.negotiatedAmount ? `${String(b.currency)} ${Number(b.negotiatedAmount).toLocaleString()}` : "—"}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-success">
                        {b.realizedAmount ? `${String(b.currency)} ${Number(b.realizedAmount).toLocaleString()}` : "—"}
                      </TableCell>
                      <TableCell className="text-xs">{String(b.realizationDate || "Pending")}</TableCell>
                      <TableCell>{statusBadge(String(b.status))}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/app/$" params={{ _splat: `export-bill/view/${b.id}` }}>
                            <Eye className="w-3.5 h-3.5" /> View Bill
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>

          {/* Export LC utilization aggregates */}
          {linkedBills.length > 0 && (
            <Card className="p-5 mt-4">
              <h3 className="font-semibold text-sm mb-3">Export LC Utilization summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">LC Amount Limit</div>
                  <div className="font-mono font-bold text-navy">
                    {record.currency} {Number(record.lcAmount).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Presented Bills</div>
                  <div className="font-mono font-bold text-foreground">
                    {record.currency}{" "}
                    {linkedBills.reduce((a, b) => a + Number(b.billAmount || 0), 0).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Remaining Balance</div>
                  <div className="font-mono font-bold text-success">
                    {record.currency}{" "}
                    {(Number(record.lcAmount) - linkedBills.reduce((a, b) => a + Number(b.billAmount || 0), 0)).toLocaleString()}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* ── TAB 5: Guarantee ── */}
        <TabsContent value="guarantee" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 space-y-1">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Advising & Backing Guarantee</h2>
              {fieldRow("Confirmation Status", "Wells Fargo Bank NA Confirmed Credit")}
              {fieldRow("Confirmation Reference", "WFC-CO-2025-0012")}
              {fieldRow("Confirming Bank Amount", `${record.currency} ${Number(record.lcAmount).toLocaleString("en-US")}`, true)}
              {fieldRow("SBLC / Standing Credit Backing", "Wells Fargo Bank corporate backing")}
              {fieldRow("Guarantee Issue Date", String(record.openingDate))}
              {fieldRow("Guarantee Expiry", String(record.expiryDate))}
            </Card>

            <Card className="p-6">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Advising & Confirmation Fees</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">LC Advising Commission</span>
                  <span className="font-mono font-semibold">BDT 1,500.00</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Confirmation Fee (0.2% per quarter)</span>
                  <span className="font-mono font-semibold">{record.currency} {(Number(record.lcAmount) * 0.002).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Courier and SWIFT advising fees</span>
                  <span className="font-mono font-semibold">BDT 2,200.00</span>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span>Total Advising Charges Debited</span>
                  <span className="font-mono text-navy">BDT 3,700.00 + USD {(Number(record.lcAmount) * 0.002).toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ── TAB 6: SWIFT Message ── */}
        <TabsContent value="swift" className="mt-4">
          <Card>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-navy">SWIFT Advices Log</h2>
              <Badge variant="outline">{swiftMessages.length} Messages</Badge>
            </div>
            <div className="divide-y divide-border">
              {swiftMessages.map((msg) => (
                <div key={msg.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-blue-100 text-blue-700 border border-blue-300 text-[10px] font-bold px-2 py-0.5">
                        {msg.msgType}
                      </Badge>
                      <span className="font-semibold text-sm">{msg.subject}</span>
                      <Badge variant="outline" className="text-[10px] text-success border-success">
                        {msg.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">{msg.date}</div>
                  </div>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <div><span className="font-semibold text-foreground">From:</span> {msg.from}</div>
                    <div><span className="font-semibold text-foreground">To:</span> {msg.to}</div>
                  </div>
                  <div className="bg-muted/40 rounded-md p-3 font-mono text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                    {msg.body}
                  </div>
                  <div className="flex justify-end pt-1">
                    <Button variant="ghost" size="sm" className="text-xs gap-1.5" onClick={() => toast.success(`Export LC SWIFT ${msg.msgType} message downloaded.`)}>
                      <Download className="w-3.5 h-3.5" /> Download SWIFT Body
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ── TAB 7: Investment (Finance / Credit) ── */}
        <TabsContent value="investment" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="font-display text-lg font-bold text-navy">Export Financing & Credit Facilities</h2>
                <Badge className="bg-navy text-gold font-bold">Pre & Post Shipment Finance</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-md space-y-1">
                  <div className="text-xs text-muted-foreground">Pre-Shipment Finance Instrument</div>
                  <div className="font-semibold text-sm">Export Packing Credit (PC) / Bai-Murabaha PC</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-md space-y-1">
                  <div className="text-xs text-muted-foreground">Post-Shipment Finance Instrument</div>
                  <div className="font-semibold text-sm">FDBP (Foreign Document Bill Purchase) Negotiation</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-md space-y-1">
                  <div className="text-xs text-muted-foreground">PC Financed Limit (up to 70% of LC)</div>
                  <div className="font-mono font-bold text-navy text-base">
                    USD {Number(record.lcAmount * 0.7).toLocaleString("en-US", { minimumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-md space-y-1">
                  <div className="text-xs text-muted-foreground">Export Credit Profit Rate</div>
                  <div className="font-semibold text-sm">7.50% per annum (Concessionary Exporter Rate)</div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Export Credit Active Financing Accounts</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Facility Account</TableHead>
                      <TableHead>Disbursed Finance</TableHead>
                      <TableHead>Profit Rate</TableHead>
                      <TableHead>Value Date</TableHead>
                      <TableHead>Maturity Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-xs">A/C 0123-PC-10022 (Packing Credit)</TableCell>
                      <TableCell className="font-mono text-xs">USD 150,000</TableCell>
                      <TableCell className="text-xs">7.50% p.a.</TableCell>
                      <TableCell className="text-xs">2025-04-20</TableCell>
                      <TableCell className="text-xs">2025-07-20</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px] text-success border-success bg-success/5">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-xs">A/C 0123-FDBP-44211 (Bill Purchase)</TableCell>
                      <TableCell className="font-mono text-xs">USD 340,000</TableCell>
                      <TableCell className="text-xs">7.50% p.a.</TableCell>
                      <TableCell className="text-xs">2025-06-10</TableCell>
                      <TableCell className="text-xs">2025-08-10</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px] text-success border-success bg-success/5">Active</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="font-display text-sm font-bold text-navy">Export Credit Facilities Ledger</h2>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-muted-foreground block mb-0.5">Approved Exporter Credit Limit</span>
                  <div className="font-mono font-bold text-sm text-navy">BDT 300,000,000</div>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Outstanding Balance</span>
                  <div className="font-mono font-bold text-sm text-amber-600">BDT 182,400,000</div>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Available Headroom</span>
                  <div className="font-mono font-bold text-sm text-success">BDT 117,600,000</div>
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90 gap-1.5" onClick={() => toast.success("Packing Credit request form loaded.")}>
                    <Coins className="w-3.5 h-3.5" /> Request Packing Credit (PC)
                  </Button>
                  <Button variant="outline" className="w-full gap-1.5" onClick={() => toast.success("Bill Purchase Negotiation submission opened.")}>
                    <TrendingUp className="w-3.5 h-3.5" /> Negotiate Export Bill (FDBP)
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// EXPORT BILL MODULE
// ═══════════════════════════════════════════════════════════════════

const EXPORT_BILL_MOCK: Array<Record<string, unknown>> = [
  {
    id: "EXPB-001",
    billNumber: "EXPB-2025-001",
    lcNumber: "LC-2025-EXP-001",
    beneficiary: "Dhaka Garments Ltd.",
    issuingBank: "Al-Amanah Bank, Dubai",
    currency: "USD",
    billAmount: 485000,
    lcAmount: 500000,
    billDate: "2025-05-10",
    maturityDate: "2025-08-10",
    status: "Accepted",
    discrepancyStatus: "Clean",
    paymentTerms: "90 Days Usance",
    shipmentPort: "Chittagong, Bangladesh",
    destinationPort: "Jebel Ali, UAE",
    commodity: "Ready Made Garments (RMG)",
  },
  {
    id: "EXPB-002",
    billNumber: "EXPB-2025-002",
    lcNumber: "LC-2025-EXP-002",
    beneficiary: "Chittagong Textiles Co.",
    issuingBank: "Emirates Islamic Bank, Abu Dhabi",
    currency: "EUR",
    billAmount: 210000,
    lcAmount: 225000,
    billDate: "2025-06-01",
    maturityDate: "2025-09-01",
    status: "Pending",
    discrepancyStatus: "Minor Discrepancy",
    paymentTerms: "60 Days Usance",
    shipmentPort: "Mongla, Bangladesh",
    destinationPort: "Rotterdam, Netherlands",
    commodity: "Frozen Fish Products",
  },
  {
    id: "EXPB-003",
    billNumber: "EXPB-2025-003",
    lcNumber: "LC-2025-EXP-003",
    beneficiary: "Apex Footwear Ltd.",
    issuingBank: "Kuwait Finance House, Kuwait",
    currency: "USD",
    billAmount: 320000,
    lcAmount: 340000,
    billDate: "2025-04-15",
    maturityDate: "2025-07-15",
    status: "Settled",
    discrepancyStatus: "Clean",
    paymentTerms: "Sight",
    shipmentPort: "Chittagong, Bangladesh",
    destinationPort: "Kuwait City, Kuwait",
    commodity: "Footwear & Leather Goods",
  },
  {
    id: "EXPB-004",
    billNumber: "EXPB-2025-004",
    lcNumber: "LC-2025-EXP-004",
    beneficiary: "Square Pharmaceuticals Ltd.",
    issuingBank: "Qatar Islamic Bank, Doha",
    currency: "USD",
    billAmount: 95000,
    lcAmount: 100000,
    billDate: "2025-06-12",
    maturityDate: "2025-09-12",
    status: "Pending",
    discrepancyStatus: "Major Discrepancy",
    paymentTerms: "90 Days Usance",
    shipmentPort: "Chittagong, Bangladesh",
    destinationPort: "Doha, Qatar",
    commodity: "Pharmaceutical Products",
  },
];

function getExportBillSwiftMessages(billNumber: string) {
  return [
    {
      id: "sw-eb-1",
      msgType: "MT754",
      direction: "Received",
      from: "AIBKAEADDXXX (Al-Amanah Bank, Dubai)",
      date: "2025-05-12",
      subject: `Payment Advice under LC — ${billNumber}`,
      status: "Processed",
      body: `MT754 PAYMENT ADVICE\n:20:${billNumber}\n:21:LC-2025-EXP-001\n:32B:USD485000,00\n:53B:/AE123456789012345678901234\nAL-AMANAH BANK, DUBAI\n:57A:SJIBLBDDH\n:58A:SJIBLBDDH\n:70:PAYMENT UNDER DOC PRESENTATION\n:71A:OUR`,
    },
    {
      id: "sw-eb-2",
      msgType: "MT742",
      direction: "Sent",
      from: "SJIBLBDDH (SJIBL, Dhaka)",
      date: "2025-05-11",
      subject: `Reimbursement Claim — ${billNumber}`,
      status: "Acknowledged",
      body: `MT742 REIMBURSEMENT CLAIM\n:20:${billNumber}\n:21:LC-2025-EXP-001\n:32B:USD485000,00\n:53A:SJIBLBDDH\n:54A:AIBKAEADDXXX\n:57A:CBKUKWKW\n:72:/REC/EXPORT BILL NEGOTIATION\nFDBP FINANCED`,
    },
    {
      id: "sw-eb-3",
      msgType: "MT799",
      direction: "Received",
      from: "AIBKAEADDXXX (Al-Amanah Bank, Dubai)",
      date: "2025-05-13",
      subject: `Free Format — Discrepancy Waiver`,
      status: "Processed",
      body: `MT799 FREE FORMAT MESSAGE\n:20:${billNumber}\n:21:LC-2025-EXP-001\n:79:WE CONFIRM APPLICANT HAS ACCEPTED\nDOCUMENTS UNDER RESERVE AND WAIVED\nALL DISCREPANCIES. PLEASE RELEASE\nPAYMENT AS PER NORMAL.`,
    },
  ];
}

function getExportBillAdviceMessages(billNumber: string) {
  return [
    {
      id: "adv-eb-1",
      type: "Negotiation Advice",
      date: "2025-05-11",
      to: "Dhaka Garments Ltd. (Exporter)",
      channel: "E-mail / Portal",
      ref: `ADV-NEG-${billNumber}`,
      body: `Dear Customer,\n\nWe are pleased to advise that your Export Bill No. ${billNumber} has been negotiated under Letter of Credit LC-2025-EXP-001.\n\nNegotiated Amount: USD 485,000.00\nValue Date: 2025-05-11\nProceeds Credited To: A/C 0123-100001 (Al-Wadeeah Current)\n\nPlease note that proceeds are credited as collection basis. Final settlement subject to receipt from issuing bank.\n\nThank you for banking with SJIBL.`,
    },
    {
      id: "adv-eb-2",
      type: "Realization Advice",
      date: "2025-05-14",
      to: "Dhaka Garments Ltd. (Exporter)",
      channel: "E-mail / Portal",
      ref: `ADV-REL-${billNumber}`,
      body: `Dear Customer,\n\nWe are pleased to confirm realization of Export Bill No. ${billNumber}.\n\nRealized Amount: USD 485,000.00\nBDT Equivalent: BDT 53,350,000.00 (@ 110.00)\nDate of Realization: 2025-05-14\nCredited To: A/C 0123-100001\n\nRegards,\nSJIBL Trade Finance Division`,
    },
    {
      id: "adv-eb-3",
      type: "FDBP Finance Advice",
      date: "2025-05-12",
      to: "Dhaka Garments Ltd. (Exporter)",
      channel: "E-mail / Portal",
      ref: `ADV-FDBP-${billNumber}`,
      body: `Dear Customer,\n\nYour request for Foreign Documentary Bill Purchase (FDBP) financing against Export Bill ${billNumber} has been approved.\n\nFinanced Amount: USD 340,000.00\nProfit Rate: 7.50% per annum\nTenor: 90 Days\nMaturity Date: 2025-08-10\nFacility Account: A/C 0123-FDBP-44211\n\nShariah Basis: Murabaha (cost-plus financing) arrangement under SJIBL approved framework.\n\nRegards,\nSJIBL Trade Finance Division`,
    },
  ];
}

// ─── Export Bill Dashboard View ───────────────────────────────────────────────
function ExportBillDashboardView() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [discrepancyFilter, setDiscrepancyFilter] = useState("all");

  const records = EXPORT_BILL_MOCK;

  const filtered = useMemo(() => {
    let rows = [...records];
    if (discrepancyFilter !== "all") {
      rows = rows.filter((r) =>
        String(r.discrepancyStatus || "").toLowerCase().includes(discrepancyFilter.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      rows = rows.filter((r) =>
        String(r.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((r) =>
        Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(q))
      );
    }
    return rows;
  }, [records, query, discrepancyFilter, statusFilter]);

  const pendingCount = records.filter((r) => r.status === "Pending").length;
  const totalUSD = records.filter((r) => r.currency === "USD").reduce((a, r) => a + Number(r.billAmount || 0), 0);
  const totalEUR = records.filter((r) => r.currency === "EUR").reduce((a, r) => a + Number(r.billAmount || 0), 0);

  const discrepancyBadgeColor = (s: string) => {
    if (s?.includes("Clean")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (s?.includes("Minor")) return "bg-amber-50 text-amber-700 border-amber-200";
    if (s?.includes("Major")) return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-muted text-muted-foreground";
  };

  const statusColor = (s: string) => {
    if (s === "Accepted" || s === "Settled") return "border-success text-success";
    if (s === "Pending") return "border-amber-500 text-amber-600";
    return "border-muted-foreground text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-semibold">View Export Bill</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">Trade Finance</div>
          <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Export Bills</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Monitor, realize, and finance export documentary bills negotiated under Letters of Credit.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success("Export Bill PDF exported.")}><FileText className="w-4 h-4" />Export PDF</Button>
          <Button variant="outline" onClick={() => toast.success("Export Bill Excel exported.")}><Download className="w-4 h-4" />Export Excel</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Total Export Bills</div>
          <div className="font-display text-3xl font-bold text-navy mt-2">{records.length}</div>
          <div className="text-[10px] text-muted-foreground mt-1">{filtered.length} matching search</div>
        </Card>
        <Card className={`p-5 ${pendingCount > 0 ? "border-amber-300 bg-amber-50/30" : ""}`}>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Pending Acceptance</div>
          <div className={`font-display text-3xl font-bold mt-2 ${pendingCount > 0 ? "text-amber-600" : "text-navy"}`}>{pendingCount}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Awaiting issuing bank payment</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">USD Bill Value</div>
          <div className="font-display text-2xl font-bold text-navy mt-2">USD {totalUSD.toLocaleString("en-US", { minimumFractionDigits: 0 })}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Presented under export LCs</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">EUR Bill Value</div>
          <div className="font-display text-2xl font-bold text-navy mt-2">EUR {totalEUR.toLocaleString("en-US", { minimumFractionDigits: 0 })}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Presented under export LCs</div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search bill number, beneficiary, LC, bank…"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="settled">Settled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={discrepancyFilter} onValueChange={setDiscrepancyFilter}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Discrepancy" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Discrepancies</SelectItem>
              <SelectItem value="clean">Clean</SelectItem>
              <SelectItem value="minor">Minor Discrepancy</SelectItem>
              <SelectItem value="major">Major Discrepancy</SelectItem>
            </SelectContent>
          </Select>
          {(query || statusFilter !== "all" || discrepancyFilter !== "all") && (
            <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setStatusFilter("all"); setDiscrepancyFilter("all"); }}>
              <X className="w-4 h-4 mr-1" /> Clear
            </Button>
          )}
        </div>
      </Card>

      <Card>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-sm">Export Bill Records</h2>
          <Badge variant="outline">{filtered.length} Record{filtered.length !== 1 ? "s" : ""}</Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bill Number</TableHead>
              <TableHead>LC Number</TableHead>
              <TableHead>Beneficiary</TableHead>
              <TableHead>Issuing Bank</TableHead>
              <TableHead>Ccy</TableHead>
              <TableHead className="text-right">Bill Amount</TableHead>
              <TableHead>Maturity</TableHead>
              <TableHead>Discrepancy</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-muted-foreground py-10">
                  No export bills match the current filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((r) => (
                <TableRow
                  key={String(r.id)}
                  className="hover:bg-muted/40 cursor-pointer"
                  onClick={() => navigate({ to: "/app/$", params: { _splat: `export-bill/view/${r.id}` } })}
                >
                  <TableCell className="font-medium text-xs font-mono">{String(r.billNumber)}</TableCell>
                  <TableCell className="text-xs font-mono">{String(r.lcNumber)}</TableCell>
                  <TableCell className="text-xs">{String(r.beneficiary)}</TableCell>
                  <TableCell className="text-xs">{String(r.issuingBank)}</TableCell>
                  <TableCell className="text-xs font-mono">{String(r.currency)}</TableCell>
                  <TableCell className="text-right font-mono text-xs font-semibold">
                    {Number(r.billAmount).toLocaleString("en-US", { minimumFractionDigits: 0 })}
                  </TableCell>
                  <TableCell className="text-xs">{String(r.maturityDate)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${discrepancyBadgeColor(String(r.discrepancyStatus))}`}>
                      {String(r.discrepancyStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${statusColor(String(r.status))}`}>
                      {String(r.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate({ to: "/app/$", params: { _splat: `export-bill/view/${r.id}` } });
                      }}
                    >
                      <Eye className="w-3 h-3 mr-1" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

// ─── Export Bill Detail View ──────────────────────────────────────────────────
function ExportBillDetailView({ record }: { record: Record<string, unknown> }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");

  const swiftMessages = getExportBillSwiftMessages(String(record.billNumber));
  const adviceMessages = getExportBillAdviceMessages(String(record.billNumber));

  const fieldRow = (label: string, value: string | React.ReactNode, mono = false) => (
    <div className="flex justify-between items-start border-b border-border/50 py-2 gap-3 last:border-0">
      <span className="text-xs text-muted-foreground shrink-0 w-44">{label}</span>
      <span className={`text-xs text-right ${mono ? "font-mono font-semibold text-navy" : "font-medium"}`}>{value}</span>
    </div>
  );

  const discrepancyBadgeColor = (s: string) => {
    if (s?.includes("Clean")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (s?.includes("Minor")) return "bg-amber-50 text-amber-700 border-amber-200";
    if (s?.includes("Major")) return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-muted text-muted-foreground";
  };

  const swiftBadge = (type: string) => {
    const colors: Record<string, string> = {
      MT754: "bg-blue-100 text-blue-700 border border-blue-300",
      MT742: "bg-purple-100 text-purple-700 border border-purple-300",
      MT799: "bg-slate-100 text-slate-700 border border-slate-300",
    };
    return colors[type] || "bg-muted text-muted-foreground border border-border";
  };

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <button
          onClick={() => navigate({ to: "/app/$", params: { _splat: "export-bill" } })}
          className="hover:text-navy"
        >
          View Export Bill
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-semibold">{String(record.billNumber)}</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">Trade Finance · Export Bill</div>
          <h1 className="font-display text-2xl font-bold text-navy mt-0.5">{String(record.billNumber)}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {String(record.beneficiary)} · under {String(record.lcNumber)}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={`${discrepancyBadgeColor(String(record.discrepancyStatus))} text-xs`}>
            {String(record.discrepancyStatus)}
          </Badge>
          {record.status === "Accepted" && <Badge variant="outline" className="border-success text-success text-xs">Accepted</Badge>}
          {record.status === "Pending" && <Badge variant="outline" className="border-amber-500 text-amber-600 text-xs">Pending</Badge>}
          {record.status === "Settled" && <Badge variant="outline" className="border-blue-500 text-blue-600 text-xs">Settled</Badge>}
          <Button variant="outline" size="sm" onClick={() => navigate({ to: "/app/$", params: { _splat: "export-bill" } })}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <Button size="sm" className="bg-gold text-gold-foreground hover:bg-gold/90" onClick={() => toast.success("Export Bill statement exported.")}>
            <Download className="w-4 h-4 mr-1" /> Export PDF
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="summary">Bill Summary</TabsTrigger>
          <TabsTrigger value="lc-details">LC Details</TabsTrigger>
          <TabsTrigger value="discrepancy">Discrepancy</TabsTrigger>
          <TabsTrigger value="swift">SWIFT Messages</TabsTrigger>
          <TabsTrigger value="advice">Advice</TabsTrigger>
          <TabsTrigger value="investment">Finance / Credit</TabsTrigger>
        </TabsList>

        {/* ── TAB 1: Bill Summary ── */}
        <TabsContent value="summary" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-6 space-y-1">
                <h2 className="font-display text-lg font-bold text-navy mb-3">Export Bill Summary</h2>
                {fieldRow("Bill Number", String(record.billNumber), true)}
                {fieldRow("LC Reference", String(record.lcNumber), true)}
                {fieldRow("Beneficiary (Exporter)", String(record.beneficiary))}
                {fieldRow("Issuing Bank", String(record.issuingBank))}
                {fieldRow("Bill Currency", String(record.currency))}
                {fieldRow("Bill Amount", `${record.currency} ${Number(record.billAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, true)}
                {fieldRow("LC Amount", `${record.currency} ${Number(record.lcAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, true)}
                {fieldRow("Bill Date", String(record.billDate))}
                {fieldRow("Maturity Date", String(record.maturityDate))}
                {fieldRow("Payment Terms", String(record.paymentTerms))}
                {fieldRow("Commodity", String(record.commodity))}
                {fieldRow("Bill Status", String(record.status))}
                {fieldRow("Discrepancy Status",
                  <Badge variant="outline" className={`text-[10px] ${discrepancyBadgeColor(String(record.discrepancyStatus))}`}>
                    {String(record.discrepancyStatus)}
                  </Badge>
                )}
              </Card>
              <Card className="p-6 space-y-1">
                <h2 className="font-display text-sm font-bold text-navy mb-3">Shipment Details</h2>
                {fieldRow("Port of Loading", String(record.shipmentPort))}
                {fieldRow("Port of Discharge", String(record.destinationPort))}
                {fieldRow("Shipment Date", String(record.billDate))}
                {fieldRow("Incoterms", "FOB")}
                {fieldRow("B/L Number", `BL-${String(record.billNumber).replace("EXPB-", "")}-2025`)}
                {fieldRow("B/L Date", String(record.billDate))}
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="p-5 bg-navy/5 border-navy/20">
                <h3 className="font-semibold text-sm text-navy mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Bill Financials
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Bill Amount</span>
                    <span className="font-mono font-bold">{String(record.currency)} {Number(record.billAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Bank Charges</span>
                    <span className="font-mono">USD 1,200.00</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">SWIFT Charges</span>
                    <span className="font-mono">USD 85.00</span>
                  </div>
                  <div className="flex justify-between font-bold pt-1">
                    <span>Net Proceeds</span>
                    <span className="font-mono text-navy">{String(record.currency)} {(Number(record.billAmount) - 1285).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold text-sm mb-3">Key Dates</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Bill Date:</span>
                    <span className="font-medium">{String(record.billDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Maturity:</span>
                    <span className="font-medium">{String(record.maturityDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Terms:</span>
                    <span className="font-medium">{String(record.paymentTerms)}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-muted/30">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    <strong>Shariah Note:</strong> Export bill financing under FDBP/PC operates via a Murabaha structure — the bank purchases the export receivable and earns a markup, which is permissible under Islamic finance.
                  </p>
                </div>
              </Card>

              <div className="space-y-2">
                <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90 gap-1.5" onClick={() => toast.success("FDBP financing request submitted.")}>
                  <Coins className="w-4 h-4" /> Request FDBP Financing
                </Button>
                <Button variant="outline" className="w-full gap-1.5" onClick={() => toast.success("Export Bill statement exported.")}>
                  <FileText className="w-4 h-4" /> Export Statement
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── TAB 2: LC Details ── */}
        <TabsContent value="lc-details" className="mt-4">
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="shipment">Shipment</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 space-y-1">
                  <h2 className="font-display text-lg font-bold text-navy mb-3">LC General Information</h2>
                  {fieldRow("LC Number", String(record.lcNumber), true)}
                  {fieldRow("LC Type", "Irrevocable Documentary LC")}
                  {fieldRow("Issuing Bank", String(record.issuingBank))}
                  {fieldRow("Advising Bank", "SJIBL Dhaka Main Branch")}
                  {fieldRow("Negotiating Bank", "SJIBL Dhaka Main Branch")}
                  {fieldRow("LC Currency", String(record.currency))}
                  {fieldRow("LC Amount", `${record.currency} ${Number(record.lcAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, true)}
                  {fieldRow("Payment Terms", String(record.paymentTerms))}
                  {fieldRow("Tolerance (%)", "±5%")}
                  {fieldRow("Partial Shipment", "Allowed")}
                  {fieldRow("Transhipment", "Not Allowed")}
                </Card>
                <Card className="p-6 space-y-1">
                  <h2 className="font-display text-lg font-bold text-navy mb-3">LC Dates & Parties</h2>
                  {fieldRow("LC Issue Date", "2025-04-01")}
                  {fieldRow("LC Expiry Date", "2025-09-30")}
                  {fieldRow("Expiry Place", "Bangladesh")}
                  {fieldRow("Latest Shipment Date", String(record.billDate))}
                  {fieldRow("Applicant", "International Buyer Corp.")}
                  {fieldRow("Beneficiary", String(record.beneficiary))}
                  {fieldRow("Reimbursing Bank", "Citi Bank N.A., New York")}
                  {fieldRow("Confirmation", "Unconfirmed")}
                  {fieldRow("Transferable", "No")}
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="shipment" className="mt-4">
              <Card className="p-6">
                <h2 className="font-display text-lg font-bold text-navy mb-4">Shipment Terms</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    {fieldRow("Port of Loading", String(record.shipmentPort))}
                    {fieldRow("Port of Discharge", String(record.destinationPort))}
                    {fieldRow("Incoterms", "FOB (Free On Board)")}
                    {fieldRow("Mode of Transport", "Sea Freight")}
                    {fieldRow("Carrier / Vessel", "MSC MARIANNA V. 004W")}
                    {fieldRow("B/L Number", `BL-${String(record.billNumber).replace("EXPB-", "")}-2025`)}
                    {fieldRow("B/L Date", String(record.billDate))}
                    {fieldRow("Commodity", String(record.commodity))}
                    {fieldRow("HS Code", "6204.62.00")}
                    {fieldRow("Gross Weight", "12,400 KG")}
                    {fieldRow("Net Weight", "11,950 KG")}
                    {fieldRow("No. of Packages", "2,480 Cartons")}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shipment Timeline</h3>
                    <div className="space-y-2 text-xs">
                      {[
                        { date: "2025-04-25", event: "Cargo booking confirmed", done: true },
                        { date: "2025-05-01", event: "Factory loading completed", done: true },
                        { date: "2025-05-05", event: "Vessel departed Chittagong", done: true },
                        { date: "2025-05-10", event: "B/L issued — documents presented", done: true },
                        { date: "2025-05-18", event: "Vessel ETA at destination", done: record.status === "Settled" },
                        { date: String(record.maturityDate), event: "Payment maturity date", done: record.status === "Settled" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${item.done ? "bg-success text-white" : "bg-muted border border-border"}`}>
                            {item.done ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3 text-muted-foreground" />}
                          </div>
                          <div>
                            <div className="text-muted-foreground">{item.date}</div>
                            <div className="font-medium">{item.event}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <Card>
                <div className="p-4 border-b border-border">
                  <h2 className="font-display text-lg font-bold text-navy">Required Documents Checklist</h2>
                  <p className="text-xs text-muted-foreground mt-1">LC stipulated documents vs. presented documents</p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Presented</TableHead>
                      <TableHead>Originals</TableHead>
                      <TableHead>Copies</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { doc: "Commercial Invoice", req: "1 Original + 3 Copies", presented: "1 + 3", orig: 1, copies: 3, ok: true },
                      { doc: "Full Set Clean On Board B/L", req: "3/3 Originals", presented: "3/3", orig: 3, copies: 0, ok: true },
                      { doc: "Packing List", req: "1 Original + 2 Copies", presented: "1 + 2", orig: 1, copies: 2, ok: true },
                      { doc: "Certificate of Origin", req: "1 Original", presented: "1", orig: 1, copies: 0, ok: true },
                      { doc: "Insurance Certificate", req: "2 Originals", presented: "1", orig: 1, copies: 0, ok: false },
                      { doc: "Inspection Certificate", req: "1 Original", presented: "1", orig: 1, copies: 0, ok: true },
                      { doc: "Weight & Measurement Certificate", req: "1 Original", presented: "1", orig: 1, copies: 0, ok: true },
                    ].map((d, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-xs">{d.doc}</TableCell>
                        <TableCell className="text-xs">{d.req}</TableCell>
                        <TableCell className="text-xs">{d.presented}</TableCell>
                        <TableCell className="text-xs">{d.orig}</TableCell>
                        <TableCell className="text-xs">{d.copies}</TableCell>
                        <TableCell>
                          {d.ok
                            ? <Badge variant="outline" className="text-[10px] text-success border-success bg-success/5">Compliant</Badge>
                            : <Badge variant="outline" className="text-[10px] text-rose-600 border-rose-400 bg-rose-50">Discrepant</Badge>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ── TAB 3: Discrepancy ── */}
        <TabsContent value="discrepancy" className="mt-4">
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="font-display text-lg font-bold text-navy mb-4">Discrepancy Summary</h2>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className={`px-3 py-1 text-sm font-bold ${discrepancyBadgeColor(String(record.discrepancyStatus))}`}>
                  {String(record.discrepancyStatus)}
                </Badge>
                {record.discrepancyStatus === "Clean" && (
                  <span className="text-xs text-muted-foreground">All documents comply with LC terms and conditions.</span>
                )}
                {String(record.discrepancyStatus).includes("Discrepancy") && (
                  <span className="text-xs text-amber-600 font-medium">Issuing bank or applicant review required.</span>
                )}
              </div>

              {record.discrepancyStatus === "Clean" ? (
                <div className="p-6 rounded-lg bg-emerald-50/60 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <p className="font-semibold text-emerald-700">No Discrepancies Found</p>
                  <p className="text-xs text-emerald-600 max-w-md mx-auto">
                    All presented documents are in strict conformity with the LC terms. Payment will proceed on the due date per the agreed schedule.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Document</TableHead>
                      <TableHead>Discrepancy Description</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Issuing Bank Response</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        num: 1,
                        doc: "Insurance Certificate",
                        desc: "Only 1 original presented; LC requires 2 originals per Field 46A",
                        severity: record.discrepancyStatus === "Major Discrepancy" ? "Major" : "Minor",
                        response: record.discrepancyStatus === "Major Discrepancy" ? "Pending applicant waiver" : "Applicant accepted under reserve",
                        status: record.discrepancyStatus === "Major Discrepancy" ? "Open" : "Resolved",
                      },
                      ...(record.discrepancyStatus === "Major Discrepancy" ? [{
                        num: 2,
                        doc: "Bill of Lading",
                        desc: "B/L date (05-10) is after latest shipment date (05-08) stipulated in LC",
                        severity: "Major",
                        response: "Issuing bank awaiting applicant instruction",
                        status: "Open",
                      }] : []),
                    ].map((d, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs">{d.num}</TableCell>
                        <TableCell className="font-medium text-xs">{d.doc}</TableCell>
                        <TableCell className="text-xs max-w-xs">{d.desc}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[10px] ${d.severity === "Major" ? "border-rose-400 text-rose-600 bg-rose-50" : "border-amber-400 text-amber-600 bg-amber-50"}`}>
                            {d.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">{d.response}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[10px] ${d.status === "Resolved" ? "border-success text-success bg-success/5" : "border-amber-400 text-amber-600"}`}>
                            {d.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Card>

            {String(record.discrepancyStatus).includes("Discrepancy") && (
              <Card className="p-5 bg-amber-50/40 border-amber-200">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-800 space-y-1">
                    <p className="font-semibold">Discrepancy Resolution Process</p>
                    <p>Documents presented with discrepancies were forwarded to the issuing bank "under reserve." The issuing bank will seek applicant's waiver. Upon waiver, payment proceeds.</p>
                    <p className="mt-2">SJIBL Ref: {String(record.billNumber)} | Forwarded: {String(record.billDate)}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="text-xs h-7 border-amber-400 text-amber-700 hover:bg-amber-100" onClick={() => toast.success("Waiver request reminder sent to issuing bank.")}>
                        <Send className="w-3 h-3 mr-1" /> Send Reminder
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* ── TAB 4: SWIFT Messages ── */}
        <TabsContent value="swift" className="mt-4">
          <Card>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-navy">SWIFT Message Log</h2>
              <Badge variant="outline">{swiftMessages.length} Messages</Badge>
            </div>
            <div className="divide-y divide-border">
              {swiftMessages.map((msg) => (
                <div key={msg.id} className="p-5 space-y-2">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`text-[10px] font-bold px-2 py-0.5 ${swiftBadge(msg.msgType)}`}>
                        {msg.msgType}
                      </Badge>
                      <Badge variant="outline" className={`text-[10px] ${msg.direction === "Received" ? "border-blue-400 text-blue-600" : "border-purple-400 text-purple-600"}`}>
                        {msg.direction === "Received" ? "↓ " : "↑ "}{msg.direction}
                      </Badge>
                      <span className="text-xs font-semibold">{msg.subject}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{msg.date}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{msg.from}</div>
                  <pre className="text-[10px] bg-muted/40 rounded p-3 overflow-auto whitespace-pre-wrap font-mono border border-border/50">
                    {msg.body}
                  </pre>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => toast.success(`${msg.msgType} downloaded.`)}>
                      <Download className="w-3 h-3 mr-1" /> Download
                    </Button>
                    <Badge variant="outline" className={`text-[10px] ml-auto ${msg.status === "Processed" || msg.status === "Acknowledged" ? "border-success text-success" : "border-muted-foreground text-muted-foreground"}`}>
                      {msg.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ── TAB 5: Advice ── */}
        <TabsContent value="advice" className="mt-4">
          <div className="space-y-4">
            {adviceMessages.map((adv) => (
              <Card key={adv.id} className="p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                  <div>
                    <Badge variant="outline" className="text-[10px] border-navy/30 text-navy mb-1">{adv.type}</Badge>
                    <div className="text-xs text-muted-foreground">To: {adv.to}</div>
                    <div className="text-xs text-muted-foreground">Ref: {adv.ref} · {adv.date}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{adv.channel}</Badge>
                </div>
                <pre className="text-xs bg-muted/30 rounded-lg p-4 whitespace-pre-wrap font-mono border border-border/50 leading-relaxed">
                  {adv.body}
                </pre>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => toast.success(`${adv.type} downloaded.`)}>
                    <Download className="w-3 h-3 mr-1" /> Download
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => toast.success(`${adv.type} re-sent to customer.`)}>
                    <Send className="w-3 h-3 mr-1" /> Resend
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── TAB 6: Finance / Credit ── */}
        <TabsContent value="investment" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-6 space-y-4">
                <h2 className="font-display text-lg font-bold text-navy">Export Finance Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-md space-y-1">
                    <div className="text-xs text-muted-foreground">Financing Type</div>
                    <div className="font-semibold text-sm">FDBP — Foreign Documentary Bill Purchase</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-md space-y-1">
                    <div className="text-xs text-muted-foreground">Shariah Structure</div>
                    <div className="font-semibold text-sm">Murabaha (Cost-Plus)</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-md space-y-1">
                    <div className="text-xs text-muted-foreground">Financed Amount (up to 70%)</div>
                    <div className="font-mono font-bold text-navy text-base">
                      {String(record.currency)} {Number(Number(record.billAmount) * 0.7).toLocaleString("en-US", { minimumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-md space-y-1">
                    <div className="text-xs text-muted-foreground">Export Credit Profit Rate</div>
                    <div className="font-semibold text-sm">7.50% per annum</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-3">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Active Export Finance Accounts</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Facility Account</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Financed</TableHead>
                      <TableHead>Profit Rate</TableHead>
                      <TableHead>Value Date</TableHead>
                      <TableHead>Maturity</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-xs">A/C 0123-FDBP-44211</TableCell>
                      <TableCell className="text-xs">FDBP</TableCell>
                      <TableCell className="font-mono text-xs">{String(record.currency)} {Number(Number(record.billAmount) * 0.7).toLocaleString()}</TableCell>
                      <TableCell className="text-xs">7.50% p.a.</TableCell>
                      <TableCell className="text-xs">{String(record.billDate)}</TableCell>
                      <TableCell className="text-xs">{String(record.maturityDate)}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px] text-success border-success bg-success/5">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-xs">A/C 0123-PC-10022</TableCell>
                      <TableCell className="text-xs">Packing Credit</TableCell>
                      <TableCell className="font-mono text-xs">USD 150,000</TableCell>
                      <TableCell className="text-xs">7.50% p.a.</TableCell>
                      <TableCell className="text-xs">2025-04-01</TableCell>
                      <TableCell className="text-xs">2025-07-01</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px] text-success border-success bg-success/5">Active</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>

              <Card className="p-6 space-y-3">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">FDBP Profit Amortization Schedule</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Total Due</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { period: "Month 1", principal: Number(record.billAmount) * 0.7 / 3, profit: Number(record.billAmount) * 0.7 * 0.075 / 12, dueDate: "2025-06-10", done: true },
                      { period: "Month 2", principal: Number(record.billAmount) * 0.7 / 3, profit: Number(record.billAmount) * 0.7 * 0.075 / 12, dueDate: "2025-07-10", done: record.status === "Settled" },
                      { period: "Month 3 (Final)", principal: Number(record.billAmount) * 0.7 / 3, profit: Number(record.billAmount) * 0.7 * 0.075 / 12, dueDate: String(record.maturityDate), done: record.status === "Settled" },
                    ].map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs font-medium">{row.period}</TableCell>
                        <TableCell className="font-mono text-xs">{String(record.currency)} {row.principal.toLocaleString("en-US", { maximumFractionDigits: 0 })}</TableCell>
                        <TableCell className="font-mono text-xs">{String(record.currency)} {row.profit.toLocaleString("en-US", { maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="font-mono text-xs font-semibold">{String(record.currency)} {(row.principal + row.profit).toLocaleString("en-US", { maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-xs">{row.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[10px] ${row.done ? "text-success border-success bg-success/5" : "text-amber-600 border-amber-400"}`}>
                            {row.done ? "Paid" : "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="p-6">
                <h2 className="font-display text-sm font-bold text-navy mb-4">Export Credit Ledger</h2>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Approved Export Credit Limit</span>
                    <div className="font-mono font-bold text-sm text-navy">BDT 300,000,000</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Outstanding Balance</span>
                    <div className="font-mono font-bold text-sm text-amber-600">BDT 182,400,000</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Available Headroom</span>
                    <div className="font-mono font-bold text-sm text-success">BDT 117,600,000</div>
                  </div>
                  <div className="border-t pt-3 space-y-2">
                    <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90 gap-1.5 text-xs" onClick={() => toast.success("FDBP request form opened.")}>
                      <Coins className="w-3.5 h-3.5" /> Request FDBP Finance
                    </Button>
                    <Button variant="outline" className="w-full gap-1.5 text-xs" onClick={() => toast.success("Packing Credit request opened.")}>
                      <ArrowUpRight className="w-3.5 h-3.5" /> Apply Packing Credit (PC)
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-muted/30">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    <strong>Shariah Note:</strong> FDBP and Packing Credit are structured as Murabaha facilities. The bank purchases the export receivable (FDBP) or advances funds against confirmed export orders (PC), earning a halal markup rather than conventional interest.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
