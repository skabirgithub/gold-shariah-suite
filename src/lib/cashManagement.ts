export interface CollectionItem {
  id: string;
  date: string;
  payerName: string;
  referenceNo: string;
  category: "Utility Bill" | "Tuition Fee" | "Corporate Fee" | "Premium Collection";
  mode: "Cash" | "Cheque" | "PO/DD";
  clearingType: "Same Day" | "Next Day";
  amount: number;
  valueDate: string;
  instrumentNo?: string;
  status: "Completed" | "Pending Clearing" | "Returned";
}

export interface CampaignItem {
  id: string;
  name: string;
  targetAccount: string;
  targetAmount: number;
  collectedAmount: number;
  expiryDate: string;
  status: "Active" | "Closed" | "Matured";
}

export interface PostDatedCheque {
  id: string;
  issuerName: string;
  chequeNo: string;
  bankName: string;
  amount: number;
  chequeDate: string;
  valueDate: string;
  status: "Awaiting Mature" | "Realized" | "Returned";
}

export interface InvoiceItem {
  id: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  collectedAmount: number;
  status: "Fully Paid" | "Partially Paid" | "Unpaid";
  history: { date: string; amount: number; type: "Partial" | "Full" | "Overpayment" }[];
}

export interface SweepSchedule {
  id: string;
  sweepRef: string;
  type: "Zero Balance Sweep (ZBA)" | "Target Balance Sweep" | "Surplus Pool Sweep";
  sourceAccount: string;
  targetAccount: string;
  thresholdAmount: number;
  frequency: "Daily EOD" | "Weekly (Thursday)" | "Monthly End";
  status: "Active" | "Paused";
  lastRun?: string;
}

export interface SweepExecutionLog {
  id: string;
  timestamp: string;
  sweepRef: string;
  sourceAccount: string;
  targetAccount: string;
  amountSwept: number;
  status: "Success" | "Failed";
}

export interface ReconciliationItem {
  id: string;
  date: string;
  details: string;
  amount: number;
  type: "Credit" | "Debit";
  source: "Bank Statement" | "ERP Ledger";
  matchedId?: string;
  status: "Matched" | "Unmatched";
}

// Initial Mock Data
const INITIAL_COLLECTIONS: CollectionItem[] = [
  {
    id: "COLL-1001",
    date: "2026-06-14",
    payerName: "Apex Footwear Ltd",
    referenceNo: "INV-98210",
    category: "Corporate Fee",
    mode: "Cash",
    clearingType: "Same Day",
    amount: 850000,
    valueDate: "2026-06-14",
    status: "Completed"
  },
  {
    id: "COLL-1002",
    date: "2026-06-14",
    payerName: "Scholastica School",
    referenceNo: "STUD-99210",
    category: "Tuition Fee",
    mode: "Cheque",
    clearingType: "Next Day",
    amount: 1250000,
    valueDate: "2026-06-15",
    instrumentNo: "CHQ-882910",
    status: "Pending Clearing"
  },
  {
    id: "COLL-1003",
    date: "2026-06-13",
    payerName: "MetLife Insurance",
    referenceNo: "POL-771120",
    category: "Premium Collection",
    mode: "PO/DD",
    clearingType: "Same Day",
    amount: 3200000,
    valueDate: "2026-06-13",
    instrumentNo: "PO-229100",
    status: "Completed"
  }
];

const INITIAL_CAMPAIGNS: CampaignItem[] = [
  {
    id: "CAMP-2001",
    name: "Gulshan Heights Block A Sales",
    targetAccount: "0123100001 — SJIBL Current",
    targetAmount: 50000000,
    collectedAmount: 34000000,
    expiryDate: "2026-09-30",
    status: "Active"
  },
  {
    id: "CAMP-2002",
    name: "Hajj Pilgrimage Sweep Account 2026",
    targetAccount: "0123100002 — SJIBL Mudaraba",
    targetAmount: 20000000,
    collectedAmount: 18500000,
    expiryDate: "2026-07-15",
    status: "Active"
  }
];

const INITIAL_PDCS: PostDatedCheque[] = [
  {
    id: "PDC-3001",
    issuerName: "Bata Shoes BD Ltd",
    chequeNo: "998231",
    bankName: "Dutch-Bangla Bank",
    amount: 2500000,
    chequeDate: "2026-06-25",
    valueDate: "2026-06-25",
    status: "Awaiting Mature"
  },
  {
    id: "PDC-3002",
    issuerName: "Square Pharma PLC",
    chequeNo: "772610",
    bankName: "Eastern Bank Ltd",
    amount: 4200000,
    chequeDate: "2026-06-28",
    valueDate: "2026-06-28",
    status: "Awaiting Mature"
  }
];

const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: "INV-2026-001",
    customerName: "AkiGlow Retailers",
    issueDate: "2026-06-01",
    dueDate: "2026-06-20",
    totalAmount: 1500000,
    collectedAmount: 1000000,
    status: "Partially Paid",
    history: [
      { date: "2026-06-10", amount: 1000000, type: "Partial" }
    ]
  },
  {
    id: "INV-2026-002",
    customerName: "Desh Textiles Ltd",
    issueDate: "2026-06-02",
    dueDate: "2026-06-22",
    totalAmount: 3800000,
    collectedAmount: 0,
    status: "Unpaid",
    history: []
  },
  {
    id: "INV-2026-003",
    customerName: "Unilever BD Distributors",
    issueDate: "2026-06-05",
    dueDate: "2026-06-25",
    totalAmount: 5000000,
    collectedAmount: 5000000,
    status: "Fully Paid",
    history: [
      { date: "2026-06-12", amount: 5000000, type: "Full" }
    ]
  }
];

const INITIAL_SWEEPS: SweepSchedule[] = [
  {
    id: "SWP-101",
    sweepRef: "Operational Sweep ZBA",
    type: "Zero Balance Sweep (ZBA)",
    sourceAccount: "0123100002 — SJIBL Mudaraba",
    targetAccount: "0123100001 — SJIBL Current",
    thresholdAmount: 500000,
    frequency: "Daily EOD",
    status: "Active",
    lastRun: "2026-06-14 17:30"
  },
  {
    id: "SWP-102",
    sweepRef: "Nostro Threshold Sweep",
    type: "Target Balance Sweep",
    sourceAccount: "0123100003 — USD NOSTRO",
    targetAccount: "0123100001 — SJIBL Current",
    thresholdAmount: 100000,
    frequency: "Weekly (Thursday)",
    status: "Paused"
  }
];

const INITIAL_SWEEP_LOGS: SweepExecutionLog[] = [
  {
    id: "SLOG-1001",
    timestamp: "2026-06-14 17:30:00",
    sweepRef: "Operational Sweep ZBA",
    sourceAccount: "0123100002 — SJIBL Mudaraba",
    targetAccount: "0123100001 — SJIBL Current",
    amountSwept: 1850000,
    status: "Success"
  },
  {
    id: "SLOG-1002",
    timestamp: "2026-06-13 17:30:00",
    sweepRef: "Operational Sweep ZBA",
    sourceAccount: "0123100002 — SJIBL Mudaraba",
    targetAccount: "0123100001 — SJIBL Current",
    amountSwept: 2200000,
    status: "Success"
  }
];

const INITIAL_RECON_ITEMS: ReconciliationItem[] = [
  { id: "REC-1", date: "2026-06-14", details: "Apex Footwear COLL-1001 Deposit", amount: 850000, type: "Credit", source: "Bank Statement", status: "Unmatched" },
  { id: "REC-2", date: "2026-06-14", details: "Deposit - Apex Footwear Inv 98210", amount: 850000, type: "Credit", source: "ERP Ledger", status: "Unmatched" },
  { id: "REC-3", date: "2026-06-13", details: "MetLife Premium PO-229100 Settlement", amount: 3200000, type: "Credit", source: "Bank Statement", status: "Unmatched" },
  { id: "REC-4", date: "2026-06-13", details: "MetLife Premium Collection Posting", amount: 3200000, type: "Credit", source: "ERP Ledger", status: "Unmatched" },
  { id: "REC-5", date: "2026-06-12", details: "Sweep Outflow Operational FDR", amount: 1850000, type: "Debit", source: "Bank Statement", status: "Unmatched" },
  { id: "REC-6", date: "2026-06-12", details: "Sweep - Internal Transfer", amount: 1850000, type: "Debit", source: "ERP Ledger", status: "Unmatched" },
  { id: "REC-7", date: "2026-06-11", details: "Unmatched Bank Charge Service Fees", amount: 12500, type: "Debit", source: "Bank Statement", status: "Unmatched" },
];

const STORAGE_KEYS = {
  COLLECTIONS: "sjibl.cash.collections",
  CAMPAIGNS: "sjibl.cash.campaigns",
  PDCS: "sjibl.cash.pdcs",
  INVOICES: "sjibl.cash.invoices",
  SWEEPS: "sjibl.cash.sweeps",
  SWEEP_LOGS: "sjibl.cash.sweep_logs",
  RECON: "sjibl.cash.recon",
  SHADOW_ADJ: "sjibl.cash.shadow_adjustment"
};

// Helper load from localStorage
function getStorage<T>(key: string, def: T): T {
  if (typeof window === "undefined") return def;
  const val = localStorage.getItem(key);
  if (!val) {
    localStorage.setItem(key, JSON.stringify(def));
    return def;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return def;
  }
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// Get shadow balance adjuster (holds real-time pending credits)
export function getShadowAdjustment(): number {
  return getStorage<number>(STORAGE_KEYS.SHADOW_ADJ, 1450000); // initial pending cheque count BDT equivalent
}

export function adjustShadowBalance(amt: number): void {
  const current = getShadowAdjustment();
  setStorage(STORAGE_KEYS.SHADOW_ADJ, current + amt);
}

// Collections API
export function getCollections(): CollectionItem[] {
  return getStorage<CollectionItem[]>(STORAGE_KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
}

export function saveCollection(col: CollectionItem): void {
  const list = getCollections();
  list.unshift(col);
  setStorage(STORAGE_KEYS.COLLECTIONS, list);
  
  // Update shadow balance in real-time
  adjustShadowBalance(col.amount);
}

// Campaigns API
export function getCampaigns(): CampaignItem[] {
  return getStorage<CampaignItem[]>(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
}

export function saveCampaign(camp: CampaignItem): void {
  const list = getCampaigns();
  list.unshift(camp);
  setStorage(STORAGE_KEYS.CAMPAIGNS, list);
}

export function updateCampaignBalance(campId: string, amt: number): void {
  const list = getCampaigns();
  const camp = list.find(c => c.id === campId);
  if (camp) {
    camp.collectedAmount += amt;
    setStorage(STORAGE_KEYS.CAMPAIGNS, list);
  }
}

// PDCs API
export function getPostDatedCheques(): PostDatedCheque[] {
  return getStorage<PostDatedCheque[]>(STORAGE_KEYS.PDCS, INITIAL_PDCS);
}

export function realizePDC(pdcId: string): void {
  const list = getPostDatedCheques();
  const pdc = list.find(p => p.id === pdcId);
  if (pdc) {
    pdc.status = "Realized";
    setStorage(STORAGE_KEYS.PDCS, list);
    // Realizing increments ledger, decrements shadow pending balance float
    adjustShadowBalance(-pdc.amount);
  }
}

export function returnPDC(pdcId: string): void {
  const list = getPostDatedCheques();
  const pdc = list.find(p => p.id === pdcId);
  if (pdc) {
    pdc.status = "Returned";
    setStorage(STORAGE_KEYS.PDCS, list);
    adjustShadowBalance(-pdc.amount);
  }
}

// Invoices API
export function getInvoices(): InvoiceItem[] {
  return getStorage<InvoiceItem[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
}

export function postPartialCollection(invoiceId: string, amount: number, type: "Partial" | "Full" | "Overpayment"): void {
  const list = getInvoices();
  const invoice = list.find(i => i.id === invoiceId);
  if (invoice) {
    invoice.collectedAmount += amount;
    
    // History entry
    invoice.history.unshift({
      date: new Date().toISOString().split("T")[0],
      amount,
      type
    });

    // Recalculate status
    if (invoice.collectedAmount >= invoice.totalAmount) {
      invoice.status = "Fully Paid";
    } else if (invoice.collectedAmount > 0) {
      invoice.status = "Partially Paid";
    } else {
      invoice.status = "Unpaid";
    }

    setStorage(STORAGE_KEYS.INVOICES, list);
    adjustShadowBalance(amount);
  }
}

// Sweeps API
export function getSweepSchedules(): SweepSchedule[] {
  return getStorage<SweepSchedule[]>(STORAGE_KEYS.SWEEPS, INITIAL_SWEEPS);
}

export function saveSweepSchedule(sch: SweepSchedule): void {
  const list = getSweepSchedules();
  list.unshift(sch);
  setStorage(STORAGE_KEYS.SWEEPS, list);
}

export function getSweepLogs(): SweepExecutionLog[] {
  return getStorage<SweepExecutionLog[]>(STORAGE_KEYS.SWEEP_LOGS, INITIAL_SWEEP_LOGS);
}

export function triggerSweepExecution(schId: string, balanceAvailable: number): void {
  const schedules = getSweepSchedules();
  const sch = schedules.find(s => s.id === schId);
  if (!sch) return;

  const sweepAmount = balanceAvailable - sch.thresholdAmount;
  if (sweepAmount <= 0) {
    // Save failed sweep log
    const failedLog: SweepExecutionLog = {
      id: `SLOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      sweepRef: sch.sweepRef,
      sourceAccount: sch.sourceAccount,
      targetAccount: sch.targetAccount,
      amountSwept: 0,
      status: "Failed"
    };
    const logs = getSweepLogs();
    logs.unshift(failedLog);
    setStorage(STORAGE_KEYS.SWEEP_LOGS, logs);
    
    sch.lastRun = failedLog.timestamp + " (Insufficient threshold)";
    setStorage(STORAGE_KEYS.SWEEPS, schedules);
    return;
  }

  // Create log
  const successLog: SweepExecutionLog = {
    id: `SLOG-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
    sweepRef: sch.sweepRef,
    sourceAccount: sch.sourceAccount,
    targetAccount: sch.targetAccount,
    amountSwept: sweepAmount,
    status: "Success"
  };

  const logs = getSweepLogs();
  logs.unshift(successLog);
  setStorage(STORAGE_KEYS.SWEEP_LOGS, logs);

  sch.lastRun = successLog.timestamp;
  setStorage(STORAGE_KEYS.SWEEPS, schedules);

  // Trigger shadow balance update (Sweep transfers money target to source)
  adjustShadowBalance(-sweepAmount);
}

// Reconciliation API
export function getReconcileItems(): ReconciliationItem[] {
  return getStorage<ReconciliationItem[]>(STORAGE_KEYS.RECON, INITIAL_RECON_ITEMS);
}

export function reconcileBatch(statementId: string, erpId: string): void {
  const list = getReconcileItems();
  const st = list.find(r => r.id === statementId);
  const erp = list.find(r => r.id === erpId);
  if (st && erp) {
    st.status = "Matched";
    st.matchedId = erpId;
    erp.status = "Matched";
    erp.matchedId = statementId;
    setStorage(STORAGE_KEYS.RECON, list);
  }
}
