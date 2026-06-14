import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button, C as Card } from "./card-D8uTml63.mjs";
import { B as Badge, l as list, c as create, u as update } from "./badge-BIVg79D5.mjs";
import { a as MODULES, K as KEY_JOURNEYS } from "./router-BjipO9dc.mjs";
import { g as getSession, I as Input } from "./input-YVcJYwBl.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog--up_DbYf.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as SquareCheckBig, E as Plus, W as Wallet, G as ArrowDownRight, I as ArrowUpRight, T as TrendingUp, J as TrendingDown, N as Activity, O as ArrowRight, Q as CircleAlert, w as Check, e as Upload, D as LoaderCircle, V as ArrowLeft } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Area, B as BarChart, b as Bar } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
const liquidityData = [{
  d: "Mon",
  in: 24,
  out: 18
}, {
  d: "Tue",
  in: 31,
  out: 22
}, {
  d: "Wed",
  in: 28,
  out: 25
}, {
  d: "Thu",
  in: 42,
  out: 30
}, {
  d: "Fri",
  in: 38,
  out: 28
}, {
  d: "Sat",
  in: 22,
  out: 15
}, {
  d: "Sun",
  in: 18,
  out: 12
}];
const collections = [{
  m: "Jan",
  v: 120
}, {
  m: "Feb",
  v: 165
}, {
  m: "Mar",
  v: 142
}, {
  m: "Apr",
  v: 198
}, {
  m: "May",
  v: 210
}, {
  m: "Jun",
  v: 245
}];
const accounts = [{
  name: "Current — Operations",
  num: "**** 4521",
  bal: 124562300,
  ccy: "BDT",
  change: 2.4
}, {
  name: "Current — Payroll",
  num: "**** 8830",
  bal: 1845e4,
  ccy: "BDT",
  change: -0.8
}, {
  name: "USD Operating",
  num: "**** 2104",
  bal: 845200,
  ccy: "USD",
  change: 1.2
}, {
  name: "Mudaraba Term Deposit",
  num: "**** 9912",
  bal: 5e7,
  ccy: "BDT",
  change: 0
}];
const recentActivity = [{
  t: "10:42",
  who: "n.rahman",
  act: "Submitted RTGS TXN-92847"
}, {
  t: "10:18",
  who: "you",
  act: "Approved Bulk Payroll BLK-1284"
}, {
  t: "09:55",
  who: "s.karim",
  act: "Created beneficiary 'Yangtse Mfg.'"
}, {
  t: "09:30",
  who: "system",
  act: "Sweep executed: BDT 8.2M → Master"
}, {
  t: "08:00",
  who: "system",
  act: "Daily exchange rates published"
}];
function fmtMoney(v, ccy) {
  return `${ccy} ${v.toLocaleString("en-US", {
    maximumFractionDigits: 0
  })}`;
}
function Dashboard() {
  const [name, setName] = reactExports.useState("there");
  const [livePendingApprovals, setLivePendingApprovals] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const s = getSession();
    if (s) setName(s.displayName);
  }, []);
  reactExports.useEffect(() => {
    const updateApprovals = () => {
      try {
        const list$1 = list("approval");
        setLivePendingApprovals(list$1.filter((a) => a.status === "Pending"));
      } catch {
      }
    };
    updateApprovals();
    const interval = setInterval(updateApprovals, 1e3);
    return () => clearInterval(interval);
  }, []);
  const [activeJourney, setActiveJourney] = reactExports.useState(null);
  const [currentStepIndex, setCurrentStepIndex] = reactExports.useState(0);
  const [simulatedFile, setSimulatedFile] = reactExports.useState(null);
  const [validationProgress, setValidationProgress] = reactExports.useState(0);
  const [validationStatus, setValidationStatus] = reactExports.useState("idle");
  const [createdBatchId, setCreatedBatchId] = reactExports.useState("");
  const [approvalTaskId, setApprovalTaskId] = reactExports.useState("");
  const [approving, setApproving] = reactExports.useState(false);
  const [clearingProgress, setClearingProgress] = reactExports.useState(0);
  const [clearingStatus, setClearingStatus] = reactExports.useState("idle");
  const [apiResponse, setApiResponse] = reactExports.useState(null);
  const [apiTesting, setApiTesting] = reactExports.useState(false);
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
    const rec = create("bulk-transfer", {
      batchRef: "PAYROLL-AUG-2025",
      fileName: "payroll-employees-aug2025.csv",
      fileType: "CSV",
      totalRecords: 248,
      totalAmount: 1284e4,
      currency: "BDT",
      valueDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      remarks: "Simulated payroll release via guided journey."
    });
    const approvals = list("approval");
    const appTask = approvals.find((a) => a.ref === rec.id);
    setCreatedBatchId(rec.id);
    if (appTask) {
      setApprovalTaskId(appTask.id);
    }
    toast.success("Batch payroll created and routed to Approval Dashboard!");
    setCurrentStepIndex(3);
  };
  const approvePayroll = () => {
    if (!approvalTaskId) return;
    setApproving(true);
    setTimeout(() => {
      update("approval", approvalTaskId, {
        status: "Approved"
      });
      setApproving(false);
      toast.success("Payroll transaction authorized successfully!");
      setCurrentStepIndex(4);
      startClearing();
    }, 1e3);
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
  const quickLinks = MODULES.filter((m) => ["fund-transfer", "bulk-transfer", "beneficiary", "lc-initiation", "bill-pay", "approval"].includes(m.slug));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl mt-1", children: [
          "As-salamu alaykum, ",
          name,
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Here is your corporate banking overview for today." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/approval", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-4 h-4" }),
          "Approvals ",
          livePendingApprovals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1 bg-destructive text-destructive-foreground", children: livePendingApprovals.length })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "bg-navy text-navy-foreground hover:bg-navy/90", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/fund-transfer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          "New transfer"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Total balance (BDT eq.)", value: "৳ 213.4 Cr", sub: "+2.4% vs last week", up: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Pending approvals", value: livePendingApprovals.length.toString(), sub: `${livePendingApprovals.filter((a) => a.risk === "High").length} high-risk`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Today's inflows", value: "BDT 38.2 M", sub: "+12% DoD", up: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Today's outflows", value: "BDT 28.7 M", sub: "-4% DoD", down: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg", children: "Liquidity flow — this week" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Inflows vs outflows (BDT millions)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-success text-success", children: "Healthy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: liquidityData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "in", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--gold)", stopOpacity: 0.6 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--gold)", stopOpacity: 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "out", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--navy)", stopOpacity: 0.5 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--navy)", stopOpacity: 0 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "d", stroke: "var(--muted-foreground)", fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { dataKey: "in", stroke: "var(--gold)", fill: "url(#in)", strokeWidth: 2, name: "Inflow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { dataKey: "out", stroke: "var(--navy)", fill: "url(#out)", strokeWidth: 2, name: "Outflow" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg", children: "Collections — 6 months" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Distributor & invoice collections (BDT M)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: collections, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "m", stroke: "var(--muted-foreground)", fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "v", fill: "var(--gold)", radius: [4, 4, 0, 0] })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg", children: "Your accounts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/accounts", className: "text-xs text-navy hover:text-gold", children: "View all →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: accounts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-3 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: a.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-mono", children: a.num })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: fmtMoney(a.bal, a.ccy) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-xs flex items-center gap-1 justify-end ${a.change > 0 ? "text-success" : a.change < 0 ? "text-destructive" : "text-muted-foreground"}`, children: [
              a.change > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }) : a.change < 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }) : null,
              a.change === 0 ? "—" : `${a.change > 0 ? "+" : ""}${a.change}%`
            ] })
          ] })
        ] }, a.num)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg", children: "Pending approvals" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/approval", className: "text-xs text-navy hover:text-gold", children: "All →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: livePendingApprovals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground text-center py-6", children: "No pending approvals." }) : livePendingApprovals.slice(0, 4).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/app/approval/view/${p.id}`, className: "block border border-border rounded-md p-3 hover:border-gold/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground", children: p.ref }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: p.risk === "High" ? "border-destructive text-destructive" : p.risk === "Medium" ? "border-warning text-warning" : "border-success text-success", children: p.risk })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mt-1", children: p.moduleTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: p.details }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: p.amount > 0 ? `BDT ${p.amount.toLocaleString()}` : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "by ",
              p.maker
            ] })
          ] })
        ] }, p.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-4", children: "Quick actions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: quickLinks.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/app/${q.slug}`, className: "flex flex-col items-start gap-2 p-3 rounded-md border border-border hover:border-gold hover:bg-muted/40 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-navy/5 text-navy grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(q.icon, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium leading-tight", children: q.short })
        ] }, q.slug)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg", children: "Activity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: recentActivity.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono mt-0.5 w-10 shrink-0", children: a.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground truncate", children: a.act }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: a.who })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-1", children: "Guided journeys" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Step-by-step workflows" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: KEY_JOURNEYS.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => {
          setActiveJourney(j);
          setCurrentStepIndex(0);
        }, className: "p-3 rounded-md border border-border hover:border-gold hover:bg-muted/40 cursor-pointer transition-all duration-200 group flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium group-hover:text-gold transition-colors", children: j.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
              j.steps.length,
              " steps"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all" })
        ] }, j.slug)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 bg-navy/[0.03] border-navy/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Shariah Notice:" }),
        " All facilities labelled as ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Investment" }),
        " follow Islamic finance principles. Returns are ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Profit" }),
        ", not interest."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-muted-foreground", children: "AML monitoring active · audit trail enabled" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: activeJourney !== null, onOpenChange: (open) => !open && resetJourney(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl bg-card border-border text-foreground", children: activeJourney && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold font-semibold", children: "Interactive Guided Journey" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl mt-1", children: activeJourney.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-muted-foreground text-xs", children: "Experience this Corporate Transaction Banking process flow step-by-step." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-4 border-b border-border pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-muted -z-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gold -z-10 transition-all duration-300", style: {
            width: `${currentStepIndex / (activeJourney.steps.length - 1) * 100}%`
          } }),
          activeJourney.steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => idx <= currentStepIndex && setCurrentStepIndex(idx), className: cn("w-8 h-8 rounded-full border-2 font-mono text-xs font-semibold grid place-items-center transition-colors shadow-sm", isCompleted ? "bg-gold border-gold text-navy-foreground" : isActive ? "bg-navy border-gold text-white" : "bg-card border-muted text-muted-foreground cursor-not-allowed"), title: step, children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) : idx + 1 }, step);
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between mt-2 text-[10px] text-muted-foreground text-center", children: activeJourney.steps.map((step, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("w-16 truncate font-medium", idx === currentStepIndex ? "text-gold font-semibold scale-105" : ""), children: step }, step)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[220px] bg-muted/30 border border-border rounded-lg p-5 flex flex-col justify-between", children: activeJourney.slug === "salary-payroll" ? (
        /* Salary Payroll Interactive Flow */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          currentStepIndex === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold", children: "Step 1: Upload salary file" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-md mx-auto", children: "In Corporate Banking, payroll transactions start with the Maker preparing a CSV or XML file from their internal ERP system." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: handleUploadFile, className: "border border-dashed border-border hover:border-gold rounded-lg p-6 bg-card cursor-pointer max-w-sm mx-auto flex flex-col items-center gap-2 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 text-gold animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: simulatedFile ? simulatedFile : "Click here to upload sample payroll file" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/60", children: "(Requires: CSV format, max 250 rows)" })
            ] }),
            simulatedFile && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setCurrentStepIndex(1), className: "bg-navy text-navy-foreground hover:bg-navy/90 text-xs mt-3", children: [
              "Proceed to Validation ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1.5" })
            ] })
          ] }),
          currentStepIndex === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold", children: "Step 2: System validation & duplicates check" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-md mx-auto", children: "Once uploaded, the bank's portal automatically validates headers, format, and scans beneficiary accounts for formatting errors or duplicate names." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm mx-auto p-4 bg-card border border-border rounded-lg text-left space-y-3 shadow-sm", children: [
              validationStatus === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: startValidation, className: "bg-gold text-gold-foreground hover:bg-gold/90 text-xs", children: "Run Verification Checks" }) }),
              validationStatus === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-mono", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin text-gold" }),
                    " Validating records..."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    validationProgress,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: validationProgress, className: "h-1.5" })
              ] }),
              validationStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-success font-semibold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                  " Validation Successful!"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-muted-foreground list-disc pl-4 font-mono text-[11px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "File format: CSV (Compliant)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Parsed Records: 248 Employees" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Calculated Amount: BDT 12,840,000" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Duplicate Accounts: 0 detected" })
                ] })
              ] })
            ] }),
            validationStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setCurrentStepIndex(2), className: "bg-navy text-navy-foreground hover:bg-navy/90 text-xs", children: [
              "Submit Batch ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1.5" })
            ] })
          ] }),
          currentStepIndex === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold", children: "Step 3: Maker submits to authorization queue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-md mx-auto", children: "The Maker confirms the validated batch details and submits it for approval. Under Maker-Checker protocol, the Maker has no authority to release funds." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto bg-card border border-border rounded-lg p-4 text-left text-xs grid grid-cols-2 gap-3 shadow-sm font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground block text-[10px] uppercase", children: "Batch Reference" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "PAYROLL-AUG-2025" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground block text-[10px] uppercase", children: "Total Records" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "248 employee accounts" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground block text-[10px] uppercase", children: "Total BDT Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gold", children: "BDT 12,840,000.00" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground block text-[10px] uppercase", children: "Debit Account" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "**** 8830 (SJIBL Payroll A/C)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 border-t border-border pt-2 text-[10px] text-muted-foreground", children: "Shariah notice: Non-interest-based fee structure applied." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: submitPayroll, className: "bg-navy text-navy-foreground hover:bg-navy/90 text-xs", children: [
              "Submit to Authorization Queue ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1.5" })
            ] })
          ] }),
          currentStepIndex === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold", children: "Step 4: Checker / Approver Authorizes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-md mx-auto", children: "An email/SMS notification alert is generated for the Checker. The Checker logs in, reviews the transaction risk profile, and signs the release." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto bg-card border border-border rounded-lg p-4 text-left space-y-3 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground", children: [
                  "Verification Task ID: ",
                  approvalTaskId || "TXN-AUTO"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-warning text-warning", children: "Medium Risk" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-xs border-y border-border py-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Details:" }),
                  " Bulk Payroll for Aug '25 (248 records)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Amount:" }),
                  " BDT 12,840,000.00"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Requested By:" }),
                  " tania.m (Maker)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Linked File:" }),
                  " payroll-employees-aug2025.csv"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: approvePayroll, disabled: approving, className: "bg-success text-success-foreground hover:bg-success/90 text-xs", children: approving ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }),
                " Authorizing..."
              ] }) : "Verify & Authorize Release" }) })
            ] })
          ] }),
          currentStepIndex === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold", children: "Step 5: Core Banking System (STP Execution)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-md mx-auto", children: "Once authorized, the CTB Portal triggers Straight-Through Processing (STP) pipelines, posting bulk ledger credits and routing payments via clearing networks." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm mx-auto p-4 bg-card border border-border rounded-lg text-left space-y-3 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-mono", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    clearingStatus === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin text-gold" }),
                    clearingStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-success" }),
                    "Clearing payments (EFTN)..."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    clearingProgress,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: clearingProgress, className: "h-1.5" })
              ] }),
              clearingStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono text-center", children: "All entries posted successfully. Transaction Ref: SJIBL-PR-9921" })
            ] }),
            clearingStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setCurrentStepIndex(5), className: "bg-navy text-navy-foreground hover:bg-navy/90 text-xs", children: [
              "View Execution Status ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1.5" })
            ] })
          ] }),
          currentStepIndex === 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-success/15 text-success grid place-items-center mx-auto text-xl font-bold", children: "✓" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold", children: "Step 6: Status & execution report" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-md mx-auto", children: "The payroll batch has been fully executed. The system creates an immutable log and publishes reports accessible by corporate accounting." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm mx-auto p-4 bg-card border border-border rounded-lg space-y-2 shadow-sm text-xs font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Reference" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: createdBatchId || "BLK-1002" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-success text-success bg-success/5 font-mono text-[10px]", children: "Executed" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Paid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gold", children: "BDT 12,840,000.00" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Employees" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "248 accounts credited" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-2 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => toast.success("Downloading PDF payroll receipt..."), className: "text-xs", children: "Download Receipt (PDF)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: resetJourney, className: "bg-navy text-navy-foreground hover:bg-navy/90 text-xs", children: "Finish Walkthrough" })
            ] })
          ] })
        ] })
      ) : activeJourney.slug === "api-payment" ? (
        /* API Integration Flow */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          currentStepIndex === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold", children: "1. Review API schema specifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Corporates connect directly from their ERP (SAP, Oracle) via REST APIs. Review the standardized payment request JSON payload:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "bg-card border border-border rounded p-3 text-[10px] font-mono text-muted-foreground overflow-x-auto max-h-36", children: `POST /api/v1/payments/single HTTP/1.1
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
}` })
          ] }),
          currentStepIndex === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold", children: "2. Simulated ERP transfer interface" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "ERP system prepares payment entries and calls the gateway when ready. Test the API gateway connection:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm mx-auto bg-card border border-border p-4 rounded-lg space-y-3 shadow-sm text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono text-muted-foreground", children: "ERP Endpoint Connector:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: "https://api.sjibl-corporate.com/api/v1/payments/single", readOnly: true, className: "text-xs font-mono bg-muted/40 h-8" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
                  setApiTesting(true);
                  setTimeout(() => {
                    setApiTesting(false);
                    setApiResponse(JSON.stringify({
                      status: "Accepted",
                      transactionId: "TXN-API-55201A",
                      message: "Payment request validated and accepted. Awaiting checker verification."
                    }, null, 2));
                    toast.success("API Response: Status Accepted");
                  }, 1e3);
                }, disabled: apiTesting, className: "bg-gold text-gold-foreground hover:bg-gold/90 text-xs h-8 whitespace-nowrap", children: apiTesting ? "Testing..." : "Test POST API" })
              ] })
            ] })
          ] }),
          currentStepIndex === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold", children: "3. Request / response gateway log" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "The SJIBL API Gateway evaluates cryptographic payload signatures and responds with payment acceptance status:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded p-3 text-[10px] font-mono text-muted-foreground overflow-x-auto min-h-24", children: apiResponse ? /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-success", children: apiResponse }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground py-6", children: "Please trigger the test request in the previous step." }) })
          ] }),
          currentStepIndex === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-success/15 text-success grid place-items-center mx-auto text-xl font-bold", children: "✓" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold", children: "4. Straight-Through Processing (STP) status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-md mx-auto", children: "API payments are validated automatically. If within daily limits, funds are transferred instantly (STP). If thresholds are exceeded, the task routes to the CTB portal for authorizers." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: resetJourney, className: "bg-navy text-navy-foreground hover:bg-navy/90 text-xs", children: "Complete Integration Journey" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-border pt-4 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: currentStepIndex === 0, onClick: () => setCurrentStepIndex((i) => i - 1), className: "text-xs h-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5 mr-1" }),
              " Previous"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", disabled: currentStepIndex === activeJourney.steps.length - 1, onClick: () => setCurrentStepIndex((i) => i + 1), className: "bg-navy text-navy-foreground hover:bg-navy/90 text-xs h-8", children: [
              "Next ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1" })
            ] })
          ] })
        ] })
      ) : (
        /* Generic Explanatory Journey Flow */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 flex flex-col justify-between h-full min-h-[220px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-base font-semibold", children: [
              "Step ",
              currentStepIndex + 1,
              ": ",
              activeJourney.steps[currentStepIndex]
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-3 leading-relaxed", children: [
              activeJourney.slug === "distributor-collection" && (currentStepIndex === 0 ? "The Corporate Admin configures the distributor's database, linking their dealer profiles with specific corporate accounts." : currentStepIndex === 1 ? "The bank assigns dedicated virtual account ID templates (VAs) mapped to each distributor dealer." : currentStepIndex === 2 ? "Dealers pay their invoice bills using virtual account numbers via branch deposit, internet banking, or mobile financial services (MFS)." : "The collection engine parses the transaction credits, associates them with the distributor's dealer code, and auto-reconciles ledgers instantly in real time."),
              activeJourney.slug === "virtual-account" && (currentStepIndex === 0 ? "Select an active corporate current account (e.g., Al-Wadeeah Current) to serve as the master pooling ledger." : currentStepIndex === 1 ? "Generate virtual account numbers (sub-ledgers) mapped directly under the master pooling account." : currentStepIndex === 2 ? "Assign each virtual account number to a specific corporate client or vendor, allowing payments to bypass manual reconciliation." : currentStepIndex === 3 ? "When depositors credit a virtual account, the system identifies the source sub-ledger based on the VA prefix." : currentStepIndex === 4 ? "Funds are swept automatically into the central master current account ledger in real time." : "Export granular consolidated payment sheets directly formatted to your ERP specs (SAP / Oracle / QuickBooks)."),
              activeJourney.slug === "liquidity" && (currentStepIndex === 0 ? "A consolidated interface displays account ledger positions for all branches and subsidiaries." : currentStepIndex === 1 ? "Color-coded tags (Red/Green) show deficit or surplus balance status based on operational requirements." : currentStepIndex === 2 ? "Set sweep rules, such as zero-balance sweep (ZBA) or target-balance triggers, to automate funds pooling." : currentStepIndex === 3 ? "Sweep schedules run (e.g. daily EOD) to pull all surplus cash into the primary yield-bearing master current account." : "Monitor consolidated group liquidity balances, view historical charts, and maximize Shariah-compliant Mudaraba yield.")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-border pt-4 mt-4 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: currentStepIndex === 0, onClick: () => setCurrentStepIndex((i) => i - 1), className: "text-xs h-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5 mr-1" }),
              " Previous"
            ] }),
            currentStepIndex === activeJourney.steps.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: resetJourney, className: "bg-gold text-gold-foreground hover:bg-gold/90 text-xs h-8 font-semibold", children: "Complete Journey" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => setCurrentStepIndex((i) => i + 1), className: "bg-navy text-navy-foreground hover:bg-navy/90 text-xs h-8", children: [
              "Next ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1" })
            ] })
          ] })
        ] })
      ) })
    ] }) }) })
  ] });
}
function KpiCard({
  label,
  value,
  sub,
  up,
  down,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-navy/5 text-navy grid place-items-center", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl mt-2", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xs mt-1 ${up ? "text-success" : down ? "text-destructive" : "text-muted-foreground"}`, children: sub })
  ] });
}
export {
  Dashboard as component
};
