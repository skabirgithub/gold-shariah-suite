import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Wallet, AlertCircle, CheckSquare, Activity, Plus,
} from "lucide-react";
import { MODULES, KEY_JOURNEYS } from "@/lib/modules";
import { getSession } from "@/lib/session";
import { useEffect, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, CartesianGrid,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { create as storeCreate, update as storeUpdate, list as storeList } from "@/lib/moduleStore";
import { Check, Upload, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";


export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const liquidityData = [
  { d: "Mon", in: 24, out: 18 },
  { d: "Tue", in: 31, out: 22 },
  { d: "Wed", in: 28, out: 25 },
  { d: "Thu", in: 42, out: 30 },
  { d: "Fri", in: 38, out: 28 },
  { d: "Sat", in: 22, out: 15 },
  { d: "Sun", in: 18, out: 12 },
];

const collections = [
  { m: "Jan", v: 120 }, { m: "Feb", v: 165 }, { m: "Mar", v: 142 },
  { m: "Apr", v: 198 }, { m: "May", v: 210 }, { m: "Jun", v: 245 },
];

const accounts = [
  { name: "Current — Operations", num: "**** 4521", bal: 124562300, ccy: "BDT", change: 2.4 },
  { name: "Current — Payroll",    num: "**** 8830", bal: 18450000,  ccy: "BDT", change: -0.8 },
  { name: "USD Operating",        num: "**** 2104", bal: 845200,    ccy: "USD", change: 1.2 },
  { name: "Mudaraba Term Deposit",num: "**** 9912", bal: 50000000,  ccy: "BDT", change: 0.0 },
];

const pendingApprovals = [
  { id: "TXN-92841", type: "RTGS Transfer", amount: "BDT 4,500,000", beneficiary: "Globex Industries", maker: "n.rahman", risk: "low" },
  { id: "TXN-92843", type: "Bulk Payroll",  amount: "BDT 12,840,000", beneficiary: "Salary — Aug '25", maker: "a.haque", risk: "medium" },
  { id: "TXN-92844", type: "LC Initiation", amount: "USD 320,000",   beneficiary: "Yangtse Mfg.",      maker: "s.karim",  risk: "high" },
  { id: "TXN-92847", type: "EFTN Transfer", amount: "BDT 850,000",   beneficiary: "BRAC Logistics",    maker: "n.rahman", risk: "low" },
];

const recentActivity = [
  { t: "10:42", who: "n.rahman", act: "Submitted RTGS TXN-92847" },
  { t: "10:18", who: "you",      act: "Approved Bulk Payroll BLK-1284" },
  { t: "09:55", who: "s.karim",  act: "Created beneficiary 'Yangtse Mfg.'" },
  { t: "09:30", who: "system",   act: "Sweep executed: BDT 8.2M → Master" },
  { t: "08:00", who: "system",   act: "Daily exchange rates published" },
];

function fmtMoney(v: number, ccy: string) {
  return `${ccy} ${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function Dashboard() {
  const [name, setName] = useState("there");
  const [livePendingApprovals, setLivePendingApprovals] = useState<any[]>([]);

  useEffect(() => {
    const s = getSession();
    if (s) setName(s.displayName);
  }, []);

  useEffect(() => {
    const updateApprovals = () => {
      try {
        const list = storeList("approval");
        setLivePendingApprovals(list.filter((a) => a.status === "Pending"));
      } catch { /* ignore */ }
    };
    updateApprovals();
    const interval = setInterval(updateApprovals, 1000);
    return () => clearInterval(interval);
  }, []);

  const [activeJourney, setActiveJourney] = useState<typeof KEY_JOURNEYS[0] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Salary Payroll Journey State
  const [simulatedFile, setSimulatedFile] = useState<string | null>(null);
  const [validationProgress, setValidationProgress] = useState(0);
  const [validationStatus, setValidationStatus] = useState<"idle" | "loading" | "success">("idle");
  const [createdBatchId, setCreatedBatchId] = useState("");
  const [approvalTaskId, setApprovalTaskId] = useState("");
  const [approving, setApproving] = useState(false);
  const [clearingProgress, setClearingProgress] = useState(0);
  const [clearingStatus, setClearingStatus] = useState<"idle" | "loading" | "success">("idle");

  // API Integration Journey State
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [apiTesting, setApiTesting] = useState(false);

  // Clean reset function for journey states
  const resetJourney = () => {
    setActiveJourney(null);
    setCurrentStepIndex(0);
    setSimulatedFile(null);
    setValidationProgress(0);
    setValidationStatus("idle");
    setCreatedBatchId("");
    setApprovalTaskId("");
    setApproving(false);
    setClearingProgress(0);
    setClearingStatus("idle");
    setApiResponse(null);
    setApiTesting(false);
  };

  const handleUploadFile = () => {
    setSimulatedFile("payroll-employees-aug2025.csv");
    toast.success("Sample payroll file selected.");
  };

  const startValidation = () => {
    setValidationStatus("loading");
    setValidationProgress(0);
    const timer = setInterval(() => {
      setValidationProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setValidationStatus("success");
          toast.success("Validation Complete: 248 records parsed.");
          return 100;
        }
        return p + 10;
      });
    }, 150);
  };

  const submitPayroll = () => {
    // Create a real bulk transfer record
    const rec = storeCreate("bulk-transfer", {
      batchRef: "PAYROLL-AUG-2025",
      fileName: "payroll-employees-aug2025.csv",
      fileType: "CSV",
      totalRecords: 248,
      totalAmount: 12840000,
      currency: "BDT",
      valueDate: new Date().toISOString().slice(0, 10),
      remarks: "Simulated payroll release via guided journey.",
    });

    // Find corresponding approval task
    const approvals = storeList("approval");
    const appTask = approvals.find((a) => a.ref === rec.id);
    
    setCreatedBatchId(rec.id);
    if (appTask) {
      setApprovalTaskId(appTask.id);
    }
    toast.success("Batch payroll created and routed to Approval Dashboard!");
    setCurrentStepIndex(3); // Go to checker approval step
  };

  const approvePayroll = () => {
    if (!approvalTaskId) return;
    setApproving(true);
    setTimeout(() => {
      storeUpdate("approval", approvalTaskId, { status: "Approved" });
      setApproving(false);
      toast.success("Payroll transaction authorized successfully!");
      setCurrentStepIndex(4); // Go to CBS processing step
      startClearing();
    }, 1000);
  };

  const startClearing = () => {
    setClearingStatus("loading");
    setClearingProgress(0);
    const timer = setInterval(() => {
      setClearingProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setClearingStatus("success");
          toast.success("Straight-Through Processing completed by CBS!");
          return 100;
        }
        return p + 8;
      });
    }, 120);
  };

  const quickLinks = MODULES.filter(m => ["fund-transfer", "bulk-transfer", "beneficiary", "lc-initiation", "bill-pay", "approval"].includes(m.slug));


  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold">Dashboard</div>
          <h1 className="font-display text-3xl mt-1">As-salamu alaykum, {name}.</h1>
          <p className="text-sm text-muted-foreground mt-1">Here is your corporate banking overview for today.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline"><Link to="/app/approval"><CheckSquare className="w-4 h-4" />Approvals {livePendingApprovals.length > 0 && <Badge className="ml-1 bg-destructive text-destructive-foreground">{livePendingApprovals.length}</Badge>}</Link></Button>
          <Button asChild className="bg-navy text-navy-foreground hover:bg-navy/90"><Link to="/app/fund-transfer"><Plus className="w-4 h-4" />New transfer</Link></Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total balance (BDT eq.)" value="৳ 213.4 Cr" sub="+2.4% vs last week" up icon={<Wallet className="w-4 h-4" />} />
        <KpiCard label="Pending approvals" value={livePendingApprovals.length.toString()} sub={`${livePendingApprovals.filter(a => a.risk === "High").length} high-risk`} icon={<CheckSquare className="w-4 h-4" />} />
        <KpiCard label="Today's inflows" value="BDT 38.2 M" sub="+12% DoD" up icon={<ArrowDownRight className="w-4 h-4" />} />
        <KpiCard label="Today's outflows" value="BDT 28.7 M" sub="-4% DoD" down icon={<ArrowUpRight className="w-4 h-4" />} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg">Liquidity flow — this week</h3>
              <p className="text-xs text-muted-foreground">Inflows vs outflows (BDT millions)</p>
            </div>
            <Badge variant="outline" className="border-success text-success">Healthy</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={liquidityData}>
                <defs>
                  <linearGradient id="in" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="out" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--navy)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--navy)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Area dataKey="in" stroke="var(--gold)" fill="url(#in)" strokeWidth={2} name="Inflow" />
                <Area dataKey="out" stroke="var(--navy)" fill="url(#out)" strokeWidth={2} name="Outflow" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-lg">Collections — 6 months</h3>
          <p className="text-xs text-muted-foreground mb-4">Distributor & invoice collections (BDT M)</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collections}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="v" fill="var(--gold)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Accounts + Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg">Your accounts</h3>
            <Link to="/app/accounts" className="text-xs text-navy hover:text-gold">View all →</Link>
          </div>
          <div className="divide-y divide-border">
            {accounts.map((a) => (
              <div key={a.num} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{a.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">{a.num}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold">{fmtMoney(a.bal, a.ccy)}</div>
                  <div className={`text-xs flex items-center gap-1 justify-end ${a.change > 0 ? "text-success" : a.change < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                    {a.change > 0 ? <TrendingUp className="w-3 h-3" /> : a.change < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                    {a.change === 0 ? "—" : `${a.change > 0 ? "+" : ""}${a.change}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg">Pending approvals</h3>
            <Link to="/app/approval" className="text-xs text-navy hover:text-gold">All →</Link>
          </div>
          <div className="space-y-3">
            {livePendingApprovals.length === 0 ? (
              <div className="text-xs text-muted-foreground text-center py-6">
                No pending approvals.
              </div>
            ) : (
              livePendingApprovals.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  to={`/app/approval/view/${p.id}`}
                  className="block border border-border rounded-md p-3 hover:border-gold/50 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-muted-foreground">{p.ref}</span>
                    <Badge variant="outline" className={
                      p.risk === "High" ? "border-destructive text-destructive" :
                      p.risk === "Medium" ? "border-warning text-warning" : "border-success text-success"
                    }>{p.risk}</Badge>
                  </div>
                  <div className="text-sm font-medium mt-1">{p.moduleTitle}</div>
                  <div className="text-xs text-muted-foreground truncate">{p.details}</div>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="font-semibold">{p.amount > 0 ? `BDT ${p.amount.toLocaleString()}` : "—"}</span>
                    <span className="text-muted-foreground">by {p.maker}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Quick links + activity + journeys */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <h3 className="font-display text-lg mb-4">Quick actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((q) => (
              <Link key={q.slug} to={`/app/${q.slug}`}
                className="flex flex-col items-start gap-2 p-3 rounded-md border border-border hover:border-gold hover:bg-muted/40 transition-colors">
                <div className="w-8 h-8 rounded-md bg-navy/5 text-navy grid place-items-center">
                  <q.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium leading-tight">{q.short}</span>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg">Activity</h3>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </div>
          <ul className="space-y-3">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="text-xs text-muted-foreground font-mono mt-0.5 w-10 shrink-0">{a.t}</span>
                <div className="min-w-0">
                  <div className="text-foreground truncate">{a.act}</div>
                  <div className="text-xs text-muted-foreground">{a.who}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-lg mb-1">Guided journeys</h3>
          <p className="text-xs text-muted-foreground mb-4">Step-by-step workflows</p>
          <div className="space-y-2">
            {KEY_JOURNEYS.map((j) => (
              <div 
                key={j.slug} 
                onClick={() => {
                  setActiveJourney(j);
                  setCurrentStepIndex(0);
                }}
                className="p-3 rounded-md border border-border hover:border-gold hover:bg-muted/40 cursor-pointer transition-all duration-200 group flex justify-between items-center"
              >
                <div>
                  <div className="text-sm font-medium group-hover:text-gold transition-colors">{j.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{j.steps.length} steps</div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Compliance bar */}
      <Card className="p-4 bg-navy/[0.03] border-navy/20">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <AlertCircle className="w-4 h-4 text-gold" />
          <span><strong>Shariah Notice:</strong> All facilities labelled as <em>Investment</em> follow Islamic finance principles. Returns are <em>Profit</em>, not interest.</span>
          <span className="ml-auto text-muted-foreground">AML monitoring active · audit trail enabled</span>
        </div>
      </Card>

      {/* Guided Journey Dialog */}
      <Dialog open={activeJourney !== null} onOpenChange={(open) => !open && resetJourney()}>
        <DialogContent className="max-w-2xl bg-card border-border text-foreground">
          {activeJourney && (
            <>
              <DialogHeader>
                <div className="text-xs uppercase tracking-widest text-gold font-semibold">Interactive Guided Journey</div>
                <DialogTitle className="font-display text-2xl mt-1">{activeJourney.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground text-xs">
                  Experience this Corporate Transaction Banking process flow step-by-step.
                </DialogDescription>
              </DialogHeader>

              {/* Progress Stepper */}
              <div className="my-4 border-b border-border pb-4">
                <div className="flex justify-between items-center relative">
                  {/* Stepper bar connector */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-muted -z-10" />
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gold -z-10 transition-all duration-300"
                    style={{ width: `${(currentStepIndex / (activeJourney.steps.length - 1)) * 100}%` }}
                  />

                  {activeJourney.steps.map((step, idx) => {
                    const isCompleted = idx < currentStepIndex;
                    const isActive = idx === currentStepIndex;
                    return (
                      <button
                        key={step}
                        onClick={() => idx <= currentStepIndex && setCurrentStepIndex(idx)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 font-mono text-xs font-semibold grid place-items-center transition-colors shadow-sm",
                          isCompleted ? "bg-gold border-gold text-navy-foreground" :
                          isActive ? "bg-navy border-gold text-white" :
                          "bg-card border-muted text-muted-foreground cursor-not-allowed"
                        )}
                        title={step}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground text-center">
                  {activeJourney.steps.map((step, idx) => (
                    <span 
                      key={step} 
                      className={cn(
                        "w-16 truncate font-medium",
                        idx === currentStepIndex ? "text-gold font-semibold scale-105" : ""
                      )}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step Content Area */}
              <div className="min-h-[220px] bg-muted/30 border border-border rounded-lg p-5 flex flex-col justify-between">
                {activeJourney.slug === "salary-payroll" ? (
                  /* Salary Payroll Interactive Flow */
                  <div>
                    {currentStepIndex === 0 && (
                      <div className="space-y-4 text-center">
                        <div className="font-display text-base font-semibold">Step 1: Upload salary file</div>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                          In Corporate Banking, payroll transactions start with the Maker preparing a CSV or XML file from their internal ERP system.
                        </p>
                        <div 
                          onClick={handleUploadFile}
                          className="border border-dashed border-border hover:border-gold rounded-lg p-6 bg-card cursor-pointer max-w-sm mx-auto flex flex-col items-center gap-2 transition-colors"
                        >
                          <Upload className="w-8 h-8 text-gold animate-pulse" />
                          <span className="text-xs font-medium text-muted-foreground">
                            {simulatedFile ? simulatedFile : "Click here to upload sample payroll file"}
                          </span>
                          <span className="text-[10px] text-muted-foreground/60">(Requires: CSV format, max 250 rows)</span>
                        </div>
                        {simulatedFile && (
                          <Button 
                            onClick={() => setCurrentStepIndex(1)} 
                            className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs mt-3"
                          >
                            Proceed to Validation <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Button>
                        )}
                      </div>
                    )}

                    {currentStepIndex === 1 && (
                      <div className="space-y-4 text-center">
                        <div className="font-display text-base font-semibold">Step 2: System validation & duplicates check</div>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                          Once uploaded, the bank's portal automatically validates headers, format, and scans beneficiary accounts for formatting errors or duplicate names.
                        </p>
                        <div className="max-w-sm mx-auto p-4 bg-card border border-border rounded-lg text-left space-y-3 shadow-sm">
                          {validationStatus === "idle" && (
                            <div className="text-center py-4">
                              <Button onClick={startValidation} className="bg-gold text-gold-foreground hover:bg-gold/90 text-xs">
                                Run Verification Checks
                              </Button>
                            </div>
                          )}
                          {validationStatus === "loading" && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin text-gold" /> Validating records...</span>
                                <span>{validationProgress}%</span>
                              </div>
                              <Progress value={validationProgress} className="h-1.5" />
                            </div>
                          )}
                          {validationStatus === "success" && (
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center gap-1.5 text-success font-semibold">
                                <Check className="w-4 h-4" /> Validation Successful!
                              </div>
                              <ul className="space-y-1 text-muted-foreground list-disc pl-4 font-mono text-[11px]">
                                <li>File format: CSV (Compliant)</li>
                                <li>Parsed Records: 248 Employees</li>
                                <li>Calculated Amount: BDT 12,840,000</li>
                                <li>Duplicate Accounts: 0 detected</li>
                              </ul>
                            </div>
                          )}
                        </div>
                        {validationStatus === "success" && (
                          <Button 
                            onClick={() => setCurrentStepIndex(2)} 
                            className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs"
                          >
                            Submit Batch <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Button>
                        )}
                      </div>
                    )}

                    {currentStepIndex === 2 && (
                      <div className="space-y-4 text-center">
                        <div className="font-display text-base font-semibold">Step 3: Maker submits to authorization queue</div>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                          The Maker confirms the validated batch details and submits it for approval. Under Maker-Checker protocol, the Maker has no authority to release funds.
                        </p>
                        <div className="max-w-md mx-auto bg-card border border-border rounded-lg p-4 text-left text-xs grid grid-cols-2 gap-3 shadow-sm font-mono">
                          <div>
                            <span className="text-muted-foreground block text-[10px] uppercase">Batch Reference</span>
                            <span className="font-semibold text-foreground">PAYROLL-AUG-2025</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-[10px] uppercase">Total Records</span>
                            <span className="font-semibold text-foreground">248 employee accounts</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-[10px] uppercase">Total BDT Amount</span>
                            <span className="font-semibold text-gold">BDT 12,840,000.00</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-[10px] uppercase">Debit Account</span>
                            <span className="font-semibold text-foreground">**** 8830 (SJIBL Payroll A/C)</span>
                          </div>
                          <div className="col-span-2 border-t border-border pt-2 text-[10px] text-muted-foreground">
                            Shariah notice: Non-interest-based fee structure applied.
                          </div>
                        </div>
                        <Button 
                          onClick={submitPayroll} 
                          className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs"
                        >
                          Submit to Authorization Queue <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </div>
                    )}

                    {currentStepIndex === 3 && (
                      <div className="space-y-4 text-center">
                        <div className="font-display text-base font-semibold">Step 4: Checker / Approver Authorizes</div>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                          An email/SMS notification alert is generated for the Checker. The Checker logs in, reviews the transaction risk profile, and signs the release.
                        </p>
                        <div className="max-w-md mx-auto bg-card border border-border rounded-lg p-4 text-left space-y-3 shadow-sm">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-mono text-muted-foreground">Verification Task ID: {approvalTaskId || "TXN-AUTO"}</span>
                            <Badge variant="outline" className="border-warning text-warning">Medium Risk</Badge>
                          </div>
                          <div className="space-y-1.5 text-xs border-y border-border py-2.5">
                            <div><strong>Details:</strong> Bulk Payroll for Aug '25 (248 records)</div>
                            <div><strong>Amount:</strong> BDT 12,840,000.00</div>
                            <div><strong>Requested By:</strong> tania.m (Maker)</div>
                            <div><strong>Linked File:</strong> payroll-employees-aug2025.csv</div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button 
                              onClick={approvePayroll} 
                              disabled={approving} 
                              className="bg-success text-success-foreground hover:bg-success/90 text-xs"
                            >
                              {approving ? (
                                <span className="flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Authorizing...</span>
                              ) : (
                                "Verify & Authorize Release"
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStepIndex === 4 && (
                      <div className="space-y-4 text-center">
                        <div className="font-display text-base font-semibold">Step 5: Core Banking System (STP Execution)</div>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                          Once authorized, the CTB Portal triggers Straight-Through Processing (STP) pipelines, posting bulk ledger credits and routing payments via clearing networks.
                        </p>
                        <div className="max-w-sm mx-auto p-4 bg-card border border-border rounded-lg text-left space-y-3 shadow-sm">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="flex items-center gap-1.5">
                                {clearingStatus === "loading" && <Loader2 className="w-3.5 h-3.5 animate-spin text-gold" />}
                                {clearingStatus === "success" && <Check className="w-4 h-4 text-success" />}
                                Clearing payments (EFTN)...
                              </span>
                              <span>{clearingProgress}%</span>
                            </div>
                            <Progress value={clearingProgress} className="h-1.5" />
                          </div>
                          {clearingStatus === "success" && (
                            <p className="text-[10px] text-muted-foreground font-mono text-center">
                              All entries posted successfully. Transaction Ref: SJIBL-PR-9921
                            </p>
                          )}
                        </div>
                        {clearingStatus === "success" && (
                          <Button 
                            onClick={() => setCurrentStepIndex(5)} 
                            className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs"
                          >
                            View Execution Status <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Button>
                        )}
                      </div>
                    )}

                    {currentStepIndex === 5 && (
                      <div className="space-y-4 text-center">
                        <div className="w-12 h-12 rounded-full bg-success/15 text-success grid place-items-center mx-auto text-xl font-bold">✓</div>
                        <div className="font-display text-base font-semibold">Step 6: Status & execution report</div>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                          The payroll batch has been fully executed. The system creates an immutable log and publishes reports accessible by corporate accounting.
                        </p>
                        <div className="max-w-sm mx-auto p-4 bg-card border border-border rounded-lg space-y-2 shadow-sm text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Reference</span>
                            <span className="font-semibold">{createdBatchId || "BLK-1002"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status</span>
                            <Badge variant="outline" className="border-success text-success bg-success/5 font-mono text-[10px]">Executed</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Paid</span>
                            <span className="font-semibold text-gold">BDT 12,840,000.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Employees</span>
                            <span className="font-semibold">248 accounts credited</span>
                          </div>
                        </div>
                        <div className="flex justify-center gap-2 mt-4">
                          <Button variant="outline" size="sm" onClick={() => toast.success("Downloading PDF payroll receipt...")} className="text-xs">
                            Download Receipt (PDF)
                          </Button>
                          <Button onClick={resetJourney} className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs">
                            Finish Walkthrough
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : activeJourney.slug === "api-payment" ? (
                  /* API Integration Flow */
                  <div className="space-y-4">
                    {currentStepIndex === 0 && (
                      <div className="space-y-2">
                        <div className="font-display text-base font-semibold">1. Review API schema specifications</div>
                        <p className="text-xs text-muted-foreground">
                          Corporates connect directly from their ERP (SAP, Oracle) via REST APIs. Review the standardized payment request JSON payload:
                        </p>
                        <pre className="bg-card border border-border rounded p-3 text-[10px] font-mono text-muted-foreground overflow-x-auto max-h-36">
{`POST /api/v1/payments/single HTTP/1.1
Host: api.sjibl-corporate.com
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "fromAccount": "0123100001",
  "beneficiaryAccount": "9981200022",
  "amount": 4500000.00,
  "currency": "BDT",
  "routingNumber": "185261452",
  "paymentMethod": "RTGS",
  "purpose": "Supplier Payment"
}`}
                        </pre>
                      </div>
                    )}

                    {currentStepIndex === 1 && (
                      <div className="space-y-2 text-center">
                        <div className="font-display text-base font-semibold">2. Simulated ERP transfer interface</div>
                        <p className="text-xs text-muted-foreground">
                          ERP system prepares payment entries and calls the gateway when ready. Test the API gateway connection:
                        </p>
                        <div className="max-w-sm mx-auto bg-card border border-border p-4 rounded-lg space-y-3 shadow-sm text-left">
                          <div className="text-xs font-mono text-muted-foreground">ERP Endpoint Connector:</div>
                          <div className="flex gap-2">
                            <Input value="https://api.sjibl-corporate.com/api/v1/payments/single" readOnly className="text-xs font-mono bg-muted/40 h-8" />
                            <Button 
                              onClick={() => {
                                setApiTesting(true);
                                setTimeout(() => {
                                  setApiTesting(false);
                                  setApiResponse(JSON.stringify({
                                    status: "Accepted",
                                    transactionId: "TXN-API-55201A",
                                    message: "Payment request validated and accepted. Awaiting checker verification."
                                  }, null, 2));
                                  toast.success("API Response: Status Accepted");
                                }, 1000);
                              }}
                              disabled={apiTesting}
                              className="bg-gold text-gold-foreground hover:bg-gold/90 text-xs h-8 whitespace-nowrap"
                            >
                              {apiTesting ? "Testing..." : "Test POST API"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStepIndex === 2 && (
                      <div className="space-y-2">
                        <div className="font-display text-base font-semibold">3. Request / response gateway log</div>
                        <p className="text-xs text-muted-foreground">
                          The SJIBL API Gateway evaluates cryptographic payload signatures and responds with payment acceptance status:
                        </p>
                        <div className="bg-card border border-border rounded p-3 text-[10px] font-mono text-muted-foreground overflow-x-auto min-h-24">
                          {apiResponse ? (
                            <pre className="text-success">{apiResponse}</pre>
                          ) : (
                            <div className="text-center text-muted-foreground py-6">Please trigger the test request in the previous step.</div>
                          )}
                        </div>
                      </div>
                    )}

                    {currentStepIndex === 3 && (
                      <div className="space-y-4 text-center">
                        <div className="w-12 h-12 rounded-full bg-success/15 text-success grid place-items-center mx-auto text-xl font-bold">✓</div>
                        <div className="font-display text-base font-semibold">4. Straight-Through Processing (STP) status</div>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                          API payments are validated automatically. If within daily limits, funds are transferred instantly (STP). If thresholds are exceeded, the task routes to the CTB portal for authorizers.
                        </p>
                        <Button onClick={resetJourney} className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs">
                          Complete Integration Journey
                        </Button>
                      </div>
                    )}

                    {/* Navigation Buttons for explaining journeys */}
                    <div className="flex justify-between border-t border-border pt-4 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={currentStepIndex === 0} 
                        onClick={() => setCurrentStepIndex((i) => i - 1)}
                        className="text-xs h-8"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Previous
                      </Button>
                      <Button 
                        size="sm" 
                        disabled={currentStepIndex === activeJourney.steps.length - 1} 
                        onClick={() => setCurrentStepIndex((i) => i + 1)}
                        className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs h-8"
                      >
                        Next <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Generic Explanatory Journey Flow */
                  <div className="space-y-4 flex flex-col justify-between h-full min-h-[220px]">
                    <div>
                      <div className="font-display text-base font-semibold">
                        Step {currentStepIndex + 1}: {activeJourney.steps[currentStepIndex]}
                      </div>
                      <div className="text-xs text-muted-foreground mt-3 leading-relaxed">
                        {activeJourney.slug === "distributor-collection" && (
                          currentStepIndex === 0 ? "The Corporate Admin configures the distributor's database, linking their dealer profiles with specific corporate accounts." :
                          currentStepIndex === 1 ? "The bank assigns dedicated virtual account ID templates (VAs) mapped to each distributor dealer." :
                          currentStepIndex === 2 ? "Dealers pay their invoice bills using virtual account numbers via branch deposit, internet banking, or mobile financial services (MFS)." :
                          "The collection engine parses the transaction credits, associates them with the distributor's dealer code, and auto-reconciles ledgers instantly in real time."
                        )}
                        {activeJourney.slug === "virtual-account" && (
                          currentStepIndex === 0 ? "Select an active corporate current account (e.g., Al-Wadeeah Current) to serve as the master pooling ledger." :
                          currentStepIndex === 1 ? "Generate virtual account numbers (sub-ledgers) mapped directly under the master pooling account." :
                          currentStepIndex === 2 ? "Assign each virtual account number to a specific corporate client or vendor, allowing payments to bypass manual reconciliation." :
                          currentStepIndex === 3 ? "When depositors credit a virtual account, the system identifies the source sub-ledger based on the VA prefix." :
                          currentStepIndex === 4 ? "Funds are swept automatically into the central master current account ledger in real time." :
                          "Export granular consolidated payment sheets directly formatted to your ERP specs (SAP / Oracle / QuickBooks)."
                        )}
                        {activeJourney.slug === "liquidity" && (
                          currentStepIndex === 0 ? "A consolidated interface displays account ledger positions for all branches and subsidiaries." :
                          currentStepIndex === 1 ? "Color-coded tags (Red/Green) show deficit or surplus balance status based on operational requirements." :
                          currentStepIndex === 2 ? "Set sweep rules, such as zero-balance sweep (ZBA) or target-balance triggers, to automate funds pooling." :
                          currentStepIndex === 3 ? "Sweep schedules run (e.g. daily EOD) to pull all surplus cash into the primary yield-bearing master current account." :
                          "Monitor consolidated group liquidity balances, view historical charts, and maximize Shariah-compliant Mudaraba yield."
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between border-t border-border pt-4 mt-4 shrink-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={currentStepIndex === 0} 
                        onClick={() => setCurrentStepIndex((i) => i - 1)}
                        className="text-xs h-8"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Previous
                      </Button>
                      
                      {currentStepIndex === activeJourney.steps.length - 1 ? (
                        <Button 
                          onClick={resetJourney} 
                          className="bg-gold text-gold-foreground hover:bg-gold/90 text-xs h-8 font-semibold"
                        >
                          Complete Journey
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => setCurrentStepIndex((i) => i + 1)}
                          className="bg-navy text-navy-foreground hover:bg-navy/90 text-xs h-8"
                        >
                          Next <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function KpiCard({ label, value, sub, up, down, icon }: {
  label: string; value: string; sub: string; up?: boolean; down?: boolean; icon: React.ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className="w-8 h-8 rounded-md bg-navy/5 text-navy grid place-items-center">{icon}</div>
      </div>
      <div className="font-display text-2xl mt-2">{value}</div>
      <div className={`text-xs mt-1 ${up ? "text-success" : down ? "text-destructive" : "text-muted-foreground"}`}>{sub}</div>
    </Card>
  );
}
