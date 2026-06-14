import {
  LayoutDashboard, Users, CheckSquare, Wallet, TrendingUp, PiggyBank,
  ArrowLeftRight, UserPlus, Receipt, FileText, FileSearch, FileOutput,
  FileInput, FilePlus2, Upload, Search, ConciergeBell, UserCog,
  CreditCard, Headphones, Banknote, FileSpreadsheet, Printer,
  Award, Package, Heart,
  type LucideIcon,
} from "lucide-react";

export type ModuleDef = {
  slug: string;
  title: string;
  short: string;
  icon: LucideIcon;
  group: string;
  description: string;
};

export const MODULE_GROUPS: { id: string; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "admin", label: "Administration" },
  { id: "accounts", label: "Accounts & Investments" },
  { id: "transfers", label: "Payments & Transfers" },
  { id: "trade", label: "Trade Finance" },
  { id: "services", label: "Services & Requests" },
  { id: "cash", label: "Cash & Liquidity" },
];

export const MODULES: ModuleDef[] = [
  { slug: "dashboard", title: "Dashboard", short: "Dashboard", icon: LayoutDashboard, group: "overview", description: "Customizable widgets and account overview." },
  { slug: "corporate-admin", title: "Corporate Admin", short: "Corp Admin", icon: Users, group: "admin", description: "Onboarding, users, entitlements & multi-entity setup." },
  { slug: "approval", title: "Approval Dashboard", short: "Approvals", icon: CheckSquare, group: "admin", description: "Pending transactions awaiting Maker–Checker–Approver action." },
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
  { slug: "lc-initiation", title: "LC Initiation", short: "LC Initiation", icon: FilePlus2, group: "trade", description: "SWIFT-compliant LC request initiation." },
  { slug: "inquiry", title: "Inquiry", short: "Inquiry", icon: Search, group: "services", description: "Exchange rate inquiry and service request." },
  { slug: "services", title: "Services", short: "Services", icon: ConciergeBell, group: "services", description: "Cheque book, credit card & physical statement requests." },
  { slug: "credit-card", title: "Credit Card", short: "Credit Card", icon: CreditCard, group: "services", description: "Card list, transactions & unbilled statements." },
  { slug: "service-request", title: "Service Request", short: "Service Req", icon: Headphones, group: "services", description: "Company & user-wise service request tracking." },
  { slug: "zakat", title: "Zakat & CSR Portal", short: "Zakat & CSR", icon: Heart, group: "services", description: "Calculate corporate Zakatable wealth and pay to charities." },
  { slug: "cash-management", title: "Cash Management", short: "Cash Mgmt", icon: Banknote, group: "cash", description: "Collections, sweep, shadow balance & reconciliation." },
  { slug: "invoice", title: "Invoice Management", short: "Invoices", icon: FileSpreadsheet, group: "cash", description: "Invoice list, hybrid collection & reconciliation." },
  { slug: "payment-instruction", title: "Payment Instruction", short: "Pay Instr", icon: Printer, group: "cash", description: "Instruction tracker, instrument designer & printing." },
];

export const KEY_JOURNEYS = [
  { slug: "salary-payroll", title: "Salary Payroll", steps: ["Upload salary file", "System validation", "Maker submits", "Checker/Approver authorizes", "Payment processed", "Status & report"] },
  { slug: "distributor-collection", title: "Distributor Collection", steps: ["Assign virtual IDs", "Distributors deposit", "Auto-reconcile", "Real-time dashboard"] },
  { slug: "virtual-account", title: "Virtual Account Management", steps: ["Master account", "Generate virtual accounts", "Assign to customers", "Auto-map payments", "Consolidate to master", "ERP export"] },
  { slug: "api-payment", title: "API-Based Payment Integration", steps: ["Review API docs", "Simulated ERP form", "Request/response log", "STP status"] },
  { slug: "liquidity", title: "Liquidity Management", steps: ["Multi-account dashboard", "Surplus/deficit indicator", "Configure auto-sweep", "Consolidation", "Liquidity chart"] },
];

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}
