export interface ChequeBookRequest {
  id: string;
  account: string;
  leavesCount: 20 | 50 | 100;
  branchName: string;
  raisedDate: string;
  status: "Pending Maker" | "Awaiting Dispatch" | "Sent to Branch" | "Delivered";
}

export interface ChequeLeaf {
  leafNo: string;
  status: "Unused" | "Cleared" | "Stopped";
  amount?: number;
  payee?: string;
  dateCleared?: string;
  stopReason?: string;
}

export interface CardApplication {
  id: string;
  cardholderName: string;
  cardType: string;
  requestedLimit: number;
  dateApplied: string;
  status: "Awaiting Checker" | "Pending Bank" | "Approved" | "Rejected";
}

export interface PhysicalStatementRequest {
  id: string;
  account: string;
  startDate: string;
  endDate: string;
  deliveryMode: "Courier" | "Branch Pickup";
  dateRequested: string;
  status: "Pending Print" | "Dispatched" | "Delivered";
}

const INITIAL_CHEQUE_REQUESTS: ChequeBookRequest[] = [
  {
    id: "CHQ-R01",
    account: "0123100001 — SJIBL Current",
    leavesCount: 50,
    branchName: "Dilkusha Branch",
    raisedDate: "2026-06-12",
    status: "Sent to Branch"
  },
  {
    id: "CHQ-R02",
    account: "0123100002 — SJIBL Mudaraba",
    leavesCount: 20,
    branchName: "Dilkusha Branch",
    raisedDate: "2026-06-15",
    status: "Awaiting Dispatch"
  }
];

const INITIAL_CHEQUE_LEAVES: ChequeLeaf[] = [
  { leafNo: "100201", status: "Cleared", amount: 450000, payee: "BRAC Logistics", dateCleared: "2026-06-12" },
  { leafNo: "100202", status: "Cleared", amount: 125000, payee: "Paltan Stationery Depot", dateCleared: "2026-06-14" },
  { leafNo: "100203", status: "Stopped", stopReason: "Lost in transit" },
  { leafNo: "100204", status: "Unused" },
  { leafNo: "100205", status: "Unused" },
  { leafNo: "100206", status: "Unused" }
];

const INITIAL_CARD_APPLICATIONS: CardApplication[] = [
  {
    id: "CRD-A01",
    cardholderName: "Tanvir Hasan (HR Director)",
    cardType: "Visa Corporate Gold",
    requestedLimit: 500000,
    dateApplied: "2026-06-10",
    status: "Approved"
  },
  {
    id: "CRD-A02",
    cardholderName: "Rumana Akhtar (Treasury Manager)",
    cardType: "Mastercard Corporate Platinum",
    requestedLimit: 1200000,
    dateApplied: "2026-06-14",
    status: "Awaiting Checker"
  }
];

const INITIAL_STATEMENT_REQUESTS: PhysicalStatementRequest[] = [
  {
    id: "STM-01",
    account: "0123100001 — SJIBL Current",
    startDate: "2026-05-01",
    endDate: "2026-05-31",
    deliveryMode: "Courier",
    dateRequested: "2026-06-02",
    status: "Delivered"
  },
  {
    id: "STM-02",
    account: "0123100001 — SJIBL Current",
    startDate: "2026-06-01",
    endDate: "2026-06-15",
    deliveryMode: "Branch Pickup",
    dateRequested: "2026-06-15",
    status: "Pending Print"
  }
];

const STORAGE_KEYS = {
  CHQ_REQUESTS: "sjibl.services.chq.req",
  CHQ_LEAVES: "sjibl.services.chq.leaves",
  CARDS: "sjibl.services.card.req",
  STATEMENTS: "sjibl.services.statement.req"
};

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

// Cheque Book Request Helpers
export function getChequeBookRequests(): ChequeBookRequest[] {
  return getStorage<ChequeBookRequest[]>(STORAGE_KEYS.CHQ_REQUESTS, INITIAL_CHEQUE_REQUESTS);
}

export function postChequeBookRequest(account: string, leavesCount: 20 | 50 | 100, branchName: string): void {
  const list = getChequeBookRequests();
  const req: ChequeBookRequest = {
    id: `CHQ-R${Math.floor(100 + Math.random() * 900)}`,
    account,
    leavesCount,
    branchName,
    raisedDate: new Date().toISOString().split("T")[0],
    status: "Awaiting Dispatch"
  };
  list.unshift(req);
  setStorage(STORAGE_KEYS.CHQ_REQUESTS, list);
}

// Cheque Leaf Helpers
export function getChequeLeaves(): ChequeLeaf[] {
  return getStorage<ChequeLeaf[]>(STORAGE_KEYS.CHQ_LEAVES, INITIAL_CHEQUE_LEAVES);
}

export function stopChequeLeaf(leafNo: string, stopReason: string): boolean {
  const list = getChequeLeaves();
  const leaf = list.find(l => l.leafNo === leafNo);
  if (leaf) {
    leaf.status = "Stopped";
    leaf.stopReason = stopReason;
    setStorage(STORAGE_KEYS.CHQ_LEAVES, list);
    return true;
  } else {
    // If not found in mock range, register it as stopped anyway
    list.push({ leafNo, status: "Stopped", stopReason });
    setStorage(STORAGE_KEYS.CHQ_LEAVES, list);
    return true;
  }
}

// Card Request Helpers
export function getCardApplications(): CardApplication[] {
  return getStorage<CardApplication[]>(STORAGE_KEYS.CARDS, INITIAL_CARD_APPLICATIONS);
}

export function postCardApplication(cardholderName: string, cardType: string, requestedLimit: number): void {
  const list = getCardApplications();
  const app: CardApplication = {
    id: `CRD-A${Math.floor(100 + Math.random() * 900)}`,
    cardholderName,
    cardType,
    requestedLimit,
    dateApplied: new Date().toISOString().split("T")[0],
    status: "Awaiting Checker"
  };
  list.unshift(app);
  setStorage(STORAGE_KEYS.CARDS, list);
}

// Statement Helpers
export function getStatementRequests(): PhysicalStatementRequest[] {
  return getStorage<PhysicalStatementRequest[]>(STORAGE_KEYS.STATEMENTS, INITIAL_STATEMENT_REQUESTS);
}

export function postStatementRequest(account: string, startDate: string, endDate: string, deliveryMode: "Courier" | "Branch Pickup"): void {
  const list = getStatementRequests();
  const req: PhysicalStatementRequest = {
    id: `STM-${Math.floor(100 + Math.random() * 900)}`,
    account,
    startDate,
    endDate,
    deliveryMode,
    dateRequested: new Date().toISOString().split("T")[0],
    status: "Pending Print"
  };
  list.unshift(req);
  setStorage(STORAGE_KEYS.STATEMENTS, list);
}
