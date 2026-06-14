import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { H as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { L as LayoutDashboard, U as Users, S as SquareCheckBig, a as UserCog, W as Wallet, T as TrendingUp, P as PiggyBank, A as Award, b as Package, c as ArrowLeftRight, d as UserPlus, R as Receipt, e as Upload, F as FileSearch, f as FileText, g as FileOutput, h as FileInput, i as FilePlusCorner, j as Search, C as ConciergeBell, k as CreditCard, H as Headphones, l as Heart, B as Banknote, m as FileSpreadsheet, n as Printer } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const appCss = "/assets/styles-B_REtMn0.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-navy", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: "Go home" }) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent", children: "Go home" })
    ] })
  ] }) });
}
const Route$4 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SJIBL CTB Portal — Corporate Transaction Banking" },
      { name: "description", content: "Shahjalal Islami Bank PLC — Shariah-compliant corporate transaction banking portal." },
      { property: "og:title", content: "SJIBL CTB Portal — Corporate Transaction Banking" },
      { name: "twitter:title", content: "SJIBL CTB Portal — Corporate Transaction Banking" },
      { property: "og:description", content: "Shahjalal Islami Bank PLC — Shariah-compliant corporate transaction banking portal." },
      { name: "twitter:description", content: "Shahjalal Islami Bank PLC — Shariah-compliant corporate transaction banking portal." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1d3cca1b-883a-4333-9f00-7cbe3d5172c5/id-preview-e0f640d6--e6f10612-238c-42c2-9fc5-1ea90359334c.lovable.app-1781102719395.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1d3cca1b-883a-4333-9f00-7cbe3d5172c5/id-preview-e0f640d6--e6f10612-238c-42c2-9fc5-1ea90359334c.lovable.app-1781102719395.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$4.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] });
}
const $$splitComponentImporter$3 = () => import("./app-DBDgdtXO.mjs");
const Route$3 = createFileRoute("/app")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-BqATKRLE.mjs");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Sign In — SJIBL Corporate Transaction Banking"
    }, {
      name: "description",
      content: "Secure sign-in to Shahjalal Islami Bank PLC corporate banking portal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./app.index-No-YMfKk.mjs");
const Route$1 = createFileRoute("/app/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const MODULE_GROUPS = [
  { id: "overview", label: "Overview" },
  { id: "admin", label: "Administration" },
  { id: "accounts", label: "Accounts & Investments" },
  { id: "transfers", label: "Payments & Transfers" },
  { id: "trade", label: "Trade Finance" },
  { id: "services", label: "Services & Requests" },
  { id: "cash", label: "Cash & Liquidity" }
];
const MODULES = [
  { slug: "dashboard", title: "Dashboard", short: "Dashboard", icon: LayoutDashboard, group: "overview", description: "Customizable widgets and account overview." },
  { slug: "corporate-admin", title: "Corporate Admin", short: "Corp Admin", icon: Users, group: "admin", description: "Onboarding, users, entitlements & multi-entity setup." },
  { slug: "approval", title: "Approval Dashboard", short: "Approvals", icon: SquareCheckBig, group: "admin", description: "Pending transactions awaiting Maker–Checker–Approver action." },
  { slug: "profile", title: "Profile Management", short: "Profile", icon: UserCog, group: "admin", description: "Customer details, password and activity log." },
  { slug: "accounts", title: "Account Management & Statements", short: "Accounts", icon: Wallet, group: "accounts", description: "Account summary, detail & downloadable statements." },
  { slug: "investment", title: "Investment (Finance/Credit)", short: "Investment", icon: TrendingUp, group: "accounts", description: "Funded & non-funded investments — Shariah-compliant." },
  { slug: "term-deposit", title: "Term Deposit (TD)", short: "Term Deposit", icon: PiggyBank, group: "accounts", description: "Fixed deposit summary, statements & profit schedule." },
  { slug: "sukuk", title: "Sukuk Portfolio", short: "Sukuk Port", icon: Award, group: "accounts", description: "View and manage Shariah-compliant Sukuk investments." },
  { slug: "murabaha", title: "Murabaha Procurement", short: "Murabaha", icon: Package, group: "accounts", description: "Maker–Checker goods procurement & Murabaha financing." },
  { slug: "fund-transfer", title: "Fund Transfer", short: "Transfer", icon: ArrowLeftRight, group: "transfers", description: "Own, within-bank, EFTN, RTGS, NPSB & scheduled transfers." },
  { slug: "beneficiary", title: "Beneficiary Management", short: "Beneficiaries", icon: UserPlus, group: "transfers", description: "Manage beneficiaries with Maker–Checker workflow." },
  { slug: "bill-pay", title: "Bill Pay", short: "Bill Pay", icon: Receipt, group: "transfers", description: "Mobile recharge, utility & credit card bill payments." },
  { slug: "bulk-transfer", title: "Bulk Transfer", short: "Bulk Transfer", icon: Upload, group: "transfers", description: "Upload bulk payment files (CSV/XML/ISO20022)." },
  { slug: "import-lc", title: "View Import LC", short: "Import LC", icon: FileSearch, group: "trade", description: "Search & view import letters of credit & SWIFT messages." },
  { slug: "import-bill", title: "View Import Bill", short: "Import Bill", icon: FileText, group: "trade", description: "Import bill summaries, discrepancies & advices." },
  { slug: "export-lc", title: "View Export LC", short: "Export LC", icon: FileOutput, group: "trade", description: "Export LC details, amendments & finance linkage." },
  { slug: "export-bill", title: "View Export Bill", short: "Export Bill", icon: FileInput, group: "trade", description: "Export bill summary, discrepancies & SWIFT messages." },
  { slug: "lc-initiation", title: "LC Initiation", short: "LC Initiation", icon: FilePlusCorner, group: "trade", description: "SWIFT-compliant LC request initiation." },
  { slug: "inquiry", title: "Inquiry", short: "Inquiry", icon: Search, group: "services", description: "Exchange rate inquiry and service request." },
  { slug: "services", title: "Services", short: "Services", icon: ConciergeBell, group: "services", description: "Cheque book, credit card & physical statement requests." },
  { slug: "credit-card", title: "Credit Card", short: "Credit Card", icon: CreditCard, group: "services", description: "Card list, transactions & unbilled statements." },
  { slug: "service-request", title: "Service Request", short: "Service Req", icon: Headphones, group: "services", description: "Company & user-wise service request tracking." },
  { slug: "zakat", title: "Zakat & CSR Portal", short: "Zakat & CSR", icon: Heart, group: "services", description: "Calculate corporate Zakatable wealth and pay to charities." },
  { slug: "cash-management", title: "Cash Management", short: "Cash Mgmt", icon: Banknote, group: "cash", description: "Collections, sweep, shadow balance & reconciliation." },
  { slug: "invoice", title: "Invoice Management", short: "Invoices", icon: FileSpreadsheet, group: "cash", description: "Invoice list, hybrid collection & reconciliation." },
  { slug: "payment-instruction", title: "Payment Instruction", short: "Pay Instr", icon: Printer, group: "cash", description: "Instruction tracker, instrument designer & printing." }
];
const KEY_JOURNEYS = [
  { slug: "salary-payroll", title: "Salary Payroll", steps: ["Upload salary file", "System validation", "Maker submits", "Checker/Approver authorizes", "Payment processed", "Status & report"] },
  { slug: "distributor-collection", title: "Distributor Collection", steps: ["Assign virtual IDs", "Distributors deposit", "Auto-reconcile", "Real-time dashboard"] },
  { slug: "virtual-account", title: "Virtual Account Management", steps: ["Master account", "Generate virtual accounts", "Assign to customers", "Auto-map payments", "Consolidate to master", "ERP export"] },
  { slug: "api-payment", title: "API-Based Payment Integration", steps: ["Review API docs", "Simulated ERP form", "Request/response log", "STP status"] },
  { slug: "liquidity", title: "Liquidity Management", steps: ["Multi-account dashboard", "Surplus/deficit indicator", "Configure auto-sweep", "Consolidation", "Liquidity chart"] }
];
function getModule(slug) {
  return MODULES.find((m) => m.slug === slug);
}
const $$splitNotFoundComponentImporter = () => import("./app._-5tr-RXbd.mjs");
const $$splitComponentImporter = () => import("./app._-C9ThdbUW.mjs");
const Route = createFileRoute("/app/$")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  loader: ({
    params
  }) => {
    const slug = (params._splat || "").split("/")[0];
    if (!getModule(slug)) throw notFound();
    return null;
  }
});
const AppRoute = Route$3.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$4
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const AppIndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppRoute
});
const AppSplatRoute = Route.update({
  id: "/$",
  path: "/$",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppSplatRoute,
  AppIndexRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  KEY_JOURNEYS as K,
  MODULE_GROUPS as M,
  MODULES as a,
  getModule as g,
  router as r
};
