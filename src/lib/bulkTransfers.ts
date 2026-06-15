export interface BulkTransferRow {
  beneficiaryName: string;
  beneficiaryAccount: string;
  beneficiaryBank: string;
  routingNo?: string;
  amount: number;
  narration: string;
  status: "Completed" | "Pending" | "Failed";
}

export interface BulkTransferBatch {
  id: string;
  title: string;
  date: string;
  sourceAccount: string;
  transferType: "Within Bank" | "Other Bank" | "1-to-Many" | "Many-to-1";
  totalAmount: number;
  transactionCount: number;
  status: "Completed" | "Pending" | "Processing" | "Rejected";
  rows: BulkTransferRow[];
  remarks?: string;
}

export interface BulkRechargeRow {
  mobileNo: string;
  operator: string;
  connectionType: "Prepaid" | "Postpaid";
  amount: number;
  status: "Completed" | "Pending" | "Failed";
}

export interface BulkRechargeBatch {
  id: string;
  title: string;
  date: string;
  sourceAccount: string;
  totalAmount: number;
  mobileCount: number;
  status: "Completed" | "Pending" | "Processing" | "Rejected";
  rows: BulkRechargeRow[];
}

export interface ExternalUploadLog {
  id: string;
  fileName: string;
  fileType: "ISO 20022" | "SWIFT MT101" | "XML Bulk" | "CSV File";
  uploadedAt: string;
  uploadedBy: string;
  recordCount: number;
  totalAmount: number;
  status: "Success" | "Failed";
  logs: string[];
}

// Initial Mock Data
const INITIAL_TRANSFER_BATCHES: BulkTransferBatch[] = [
  {
    id: "BULK-FT-1001",
    title: "Corporate Payroll June 2026",
    date: "2026-06-12",
    sourceAccount: "0123100001 — SJIBL Current (BDT)",
    transferType: "1-to-Many",
    totalAmount: 4500000,
    transactionCount: 5,
    status: "Completed",
    rows: [
      { beneficiaryName: "Rahim Uddin", beneficiaryAccount: "0124100099", beneficiaryBank: "SJIBL", amount: 1200000, narration: "Salary June 2026", status: "Completed" },
      { beneficiaryName: "Karim Islam", beneficiaryAccount: "9988001122", beneficiaryBank: "Dutch-Bangla Bank", routingNo: "090261139", amount: 950000, narration: "Salary June 2026", status: "Completed" },
      { beneficiaryName: "Sultana Begum", beneficiaryAccount: "5577001188", beneficiaryBank: "BRAC Bank", routingNo: "060261456", amount: 850000, narration: "Salary June 2026", status: "Completed" },
      { beneficiaryName: "Tariqul Anam", beneficiaryAccount: "1110200933", beneficiaryBank: "Mercantile Bank", routingNo: "145261098", amount: 800000, narration: "Salary June 2026", status: "Completed" },
      { beneficiaryName: "Jahanara Alam", beneficiaryAccount: "2200119922", beneficiaryBank: "City Bank", routingNo: "085261022", amount: 700000, narration: "Salary June 2026", status: "Completed" },
    ]
  },
  {
    id: "BULK-FT-1002",
    title: "Vendor Disbursements Q2",
    date: "2026-06-14",
    sourceAccount: "0123100001 — SJIBL Current (BDT)",
    transferType: "Other Bank",
    totalAmount: 12800000,
    transactionCount: 3,
    status: "Pending",
    rows: [
      { beneficiaryName: "Globex Industries", beneficiaryAccount: "9981200022", beneficiaryBank: "Dutch-Bangla Bank", routingNo: "090261139", amount: 5000000, narration: "Invoice settlement Q2", status: "Pending" },
      { beneficiaryName: "Pran-RFL Group", beneficiaryAccount: "2010102889111", beneficiaryBank: "Islami Bank", routingNo: "125261100", amount: 4800000, narration: "Raw materials invoice", status: "Pending" },
      { beneficiaryName: "Energypac Ltd", beneficiaryAccount: "3301002811", beneficiaryBank: "Prime Bank", routingNo: "195261211", amount: 3000000, narration: "Generator setup fee", status: "Pending" },
    ]
  },
  {
    id: "BULK-FT-1003",
    title: "Subsidiary Sweeps (Many-to-1)",
    date: "2026-06-15",
    sourceAccount: "Consolidated A/C: 0123100001 — SJIBL Current (BDT)",
    transferType: "Many-to-1",
    totalAmount: 3200000,
    transactionCount: 2,
    status: "Completed",
    rows: [
      { beneficiaryName: "SJIBL Mudaraba (Source)", beneficiaryAccount: "0123100002", beneficiaryBank: "SJIBL", amount: 2000000, narration: "Sweeping surplus funds", status: "Completed" },
      { beneficiaryName: "USD NOSTRO (Source)", beneficiaryAccount: "0123100003", beneficiaryBank: "SJIBL", amount: 1200000, narration: "Sweeping cash balance", status: "Completed" },
    ]
  }
];

const INITIAL_RECHARGE_BATCHES: BulkRechargeBatch[] = [
  {
    id: "RECH-1001",
    title: "Factory Staff Eid Allowance",
    date: "2026-06-10",
    sourceAccount: "0123100002 — SJIBL Mudaraba (BDT)",
    totalAmount: 1500,
    mobileCount: 3,
    status: "Completed",
    rows: [
      { mobileNo: "01711223344", operator: "Grameenphone", connectionType: "Prepaid", amount: 500, status: "Completed" },
      { mobileNo: "01822334455", operator: "Robi", connectionType: "Prepaid", amount: 500, status: "Completed" },
      { mobileNo: "01933445566", operator: "Banglalink", connectionType: "Postpaid", amount: 500, status: "Completed" },
    ]
  },
  {
    id: "RECH-1002",
    title: "Sales Reps Airtime Allowance",
    date: "2026-06-15",
    sourceAccount: "0123100001 — SJIBL Current (BDT)",
    totalAmount: 3000,
    mobileCount: 4,
    status: "Pending",
    rows: [
      { mobileNo: "01511223344", operator: "Teletalk", connectionType: "Prepaid", amount: 750, status: "Pending" },
      { mobileNo: "01622334455", operator: "Airtel", connectionType: "Prepaid", amount: 750, status: "Pending" },
      { mobileNo: "01733445566", operator: "Grameenphone", connectionType: "Postpaid", amount: 750, status: "Pending" },
      { mobileNo: "01844556677", operator: "Robi", connectionType: "Postpaid", amount: 750, status: "Pending" },
    ]
  }
];

const INITIAL_UPLOAD_LOGS: ExternalUploadLog[] = [
  {
    id: "LOG-1001",
    fileName: "payroll_pain001_june_2026.xml",
    fileType: "ISO 20022",
    uploadedAt: "2026-06-12 10:15:30",
    uploadedBy: "maker_user_sjibl",
    recordCount: 5,
    totalAmount: 4500000,
    status: "Success",
    logs: [
      "File received: payroll_pain001_june_2026.xml (Size: 45 KB)",
      "Validating XML schema against pain.001.001.08...",
      "Schema validation: SUCCESS",
      "Parsing Group Header <GrpHdr> - MsgId: MSG-20260612-9817",
      "Source Account detected: 0123100001 (SJIBL Current)",
      "Found 5 Credit Transfer Transaction Information (CdtTrfTxInf) tags",
      "Performing Shariah compliance check on beneficiaries...",
      "Beneficiary verification complete: All items approved",
      "Total extracted amount: BDT 4,500,000",
      "Creating bulk batch record under pending approvals."
    ]
  },
  {
    id: "LOG-1002",
    fileName: "swift_mt101_settlement.txt",
    fileType: "SWIFT MT101",
    uploadedAt: "2026-06-13 14:20:45",
    uploadedBy: "maker_user_sjibl",
    recordCount: 2,
    totalAmount: 2200000,
    status: "Success",
    logs: [
      "File received: swift_mt101_settlement.txt (Size: 4 KB)",
      "Validating MT101 message format syntax...",
      "Parsing tag 20 (Sender's Reference) - Ref: SWIFT-100293",
      "Parsing tag 50H (Ordering Customer A/C) - A/C: 0123100001",
      "Found 2 occurrences of tag 32B/57A (Transaction details)",
      "Extracted transfer to SJIBL Mudaraba: BDT 2,000,000",
      "Extracted transfer to USD NOSTRO: BDT 1,200,000",
      "MT101 Validation: SUCCESS",
      "Maker signature verified against bank credentials."
    ]
  },
  {
    id: "LOG-1003",
    fileName: "distributors_payout_june.csv",
    fileType: "CSV File",
    uploadedAt: "2026-06-14 11:05:12",
    uploadedBy: "maker_user_sjibl",
    recordCount: 0,
    totalAmount: 0,
    status: "Failed",
    logs: [
      "File received: distributors_payout_june.csv (Size: 1.2 KB)",
      "Validating headers: Account, Beneficiary, Bank, Branch, Routing, Amount, Narration",
      "Header check: SUCCESS",
      "Parsing row 1: A/C 0124100099, Rahim, SJIBL, Motijheel, --, 1200000, Ok",
      "Parsing row 2: A/C 9988001122, Karim, DBBL, Motijheel, 090261139, 950000, Ok",
      "Parsing row 3: A/C 5577001188, Sultana, BRAC, --, invalid_routing_code, 850000, Error",
      "ERROR: Row 3 contains invalid routing number 'invalid_routing_code' (Must be 9-digit numeric)",
      "Parsing aborted. No records saved to database."
    ]
  }
];

// LocalStorage Keys
const STORAGE_KEYS = {
  TRANSFERS: "sjibl.bulk.transfers",
  RECHARGES: "sjibl.bulk.recharges",
  LOGS: "sjibl.bulk.logs"
};

// Helper to load from localStorage or fall back
function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  const item = localStorage.getItem(key);
  if (!item) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error parsing localStorage key ${key}`, e);
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// Export functions to interact with store
export function getBulkTransferBatches(): BulkTransferBatch[] {
  return getStorageItem<BulkTransferBatch[]>(STORAGE_KEYS.TRANSFERS, INITIAL_TRANSFER_BATCHES);
}

export function saveBulkTransferBatch(batch: BulkTransferBatch): void {
  const batches = getBulkTransferBatches();
  batches.unshift(batch);
  setStorageItem(STORAGE_KEYS.TRANSFERS, batches);
}

export function updateBulkTransferBatch(updatedBatch: BulkTransferBatch): void {
  const batches = getBulkTransferBatches();
  const index = batches.findIndex(b => b.id === updatedBatch.id);
  if (index !== -1) {
    batches[index] = updatedBatch;
    setStorageItem(STORAGE_KEYS.TRANSFERS, batches);
  }
}

export function approveBulkTransferBatch(batchId: string): void {
  const batches = getBulkTransferBatches();
  const batch = batches.find(b => b.id === batchId);
  if (batch) {
    batch.status = "Completed";
    batch.rows = batch.rows.map(r => ({ ...r, status: "Completed" }));
    updateBulkTransferBatch(batch);
  }
}

export function rejectBulkTransferBatch(batchId: string, remarks: string): void {
  const batches = getBulkTransferBatches();
  const batch = batches.find(b => b.id === batchId);
  if (batch) {
    batch.status = "Rejected";
    batch.remarks = remarks;
    batch.rows = batch.rows.map(r => ({ ...r, status: "Failed" }));
    updateBulkTransferBatch(batch);
  }
}

export function getBulkRechargeBatches(): BulkRechargeBatch[] {
  return getStorageItem<BulkRechargeBatch[]>(STORAGE_KEYS.RECHARGES, INITIAL_RECHARGE_BATCHES);
}

export function saveBulkRechargeBatch(batch: BulkRechargeBatch): void {
  const batches = getBulkRechargeBatches();
  batches.unshift(batch);
  setStorageItem(STORAGE_KEYS.RECHARGES, batches);
}

export function getExternalLogs(): ExternalUploadLog[] {
  return getStorageItem<ExternalUploadLog[]>(STORAGE_KEYS.LOGS, INITIAL_UPLOAD_LOGS);
}

export function saveExternalLog(log: ExternalUploadLog): void {
  const logs = getExternalLogs();
  logs.unshift(log);
  setStorageItem(STORAGE_KEYS.LOGS, logs);
}
