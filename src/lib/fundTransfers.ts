// Static fund transfer history data for the Fund Transfer module.

export interface FundTransferRecord {
  id: string;
  reference: string;
  date: string;
  transferType: "Own Account" | "Within Bank" | "EFTN" | "RTGS" | "NPSB";
  fromAccount: string;
  toAccount?: string;
  beneficiary: string;
  beneficiaryBank: string;
  beneficiaryBranch?: string;
  beneficiaryAccount: string;
  routingNo?: string;
  amount: number;
  currency: string;
  purpose: string;
  narration: string;
  status: "Completed" | "Pending" | "Scheduled" | "Rejected" | "Processing";
  valueDate: string;
  scheduledDate?: string;
  scheduledTime?: string;
  frequency?: string;
  remarks?: string;
}

export const FUND_TRANSFER_HISTORY: FundTransferRecord[] = [
  {
    id: "FT-1001",
    reference: "FT-1001",
    date: "2026-06-13",
    transferType: "RTGS",
    fromAccount: "0123100001 — SJIBL Current",
    beneficiary: "Globex Industries",
    beneficiaryBank: "Dutch-Bangla Bank",
    beneficiaryBranch: "Motijheel",
    beneficiaryAccount: "9981200022",
    routingNo: "090261139",
    amount: 4500000,
    currency: "BDT",
    purpose: "Supplier Payment",
    narration: "Murabaha goods settlement Q3",
    status: "Completed",
    valueDate: "2026-06-13",
  },
  {
    id: "FT-1002",
    reference: "FT-1002",
    date: "2026-06-12",
    transferType: "EFTN",
    fromAccount: "0123100002 — SJIBL Mudaraba",
    beneficiary: "BRAC Logistics",
    beneficiaryBank: "BRAC Bank",
    beneficiaryBranch: "Gulshan",
    beneficiaryAccount: "5577001188",
    routingNo: "060261456",
    amount: 850000,
    currency: "BDT",
    purpose: "Salary",
    narration: "Staff salary disbursement June 2026",
    status: "Pending",
    valueDate: "2026-06-12",
  },
  {
    id: "FT-1003",
    reference: "FT-1003",
    date: "2026-06-11",
    transferType: "NPSB",
    fromAccount: "0123100001 — SJIBL Current",
    beneficiary: "Pran-RFL Group",
    beneficiaryBank: "Islami Bank",
    beneficiaryBranch: "Paltan",
    beneficiaryAccount: "2010102889111",
    routingNo: "125261100",
    amount: 1200000,
    currency: "BDT",
    purpose: "Trade Payment",
    narration: "Raw material procurement",
    status: "Completed",
    valueDate: "2026-06-11",
  },
  {
    id: "FT-1004",
    reference: "FT-1004",
    date: "2026-06-10",
    transferType: "Own Account",
    fromAccount: "0123100001 — SJIBL Current",
    toAccount: "0123100002 — SJIBL Mudaraba",
    beneficiary: "Own — SJIBL Mudaraba",
    beneficiaryBank: "SJIBL",
    beneficiaryBranch: "Motijheel",
    beneficiaryAccount: "0123100002",
    amount: 5000000,
    currency: "BDT",
    purpose: "Internal Sweep",
    narration: "Auto-sweep to Mudaraba savings",
    status: "Completed",
    valueDate: "2026-06-10",
  },
  {
    id: "FT-1005",
    reference: "FT-1005",
    date: "2026-06-09",
    transferType: "Within Bank",
    fromAccount: "0123100001 — SJIBL Current",
    beneficiary: "Abul Khair Group",
    beneficiaryBank: "SJIBL",
    beneficiaryBranch: "Chittagong Main",
    beneficiaryAccount: "0189100055",
    amount: 2750000,
    currency: "BDT",
    purpose: "Trade Settlement",
    narration: "Steel import invoice clearance",
    status: "Completed",
    valueDate: "2026-06-09",
  },
  {
    id: "FT-1006",
    reference: "FT-1006",
    date: "2026-06-20",
    transferType: "EFTN",
    fromAccount: "0123100002 — SJIBL Mudaraba",
    beneficiary: "Green Delta Insurance",
    beneficiaryBank: "Southeast Bank",
    beneficiaryBranch: "Dhanmondi",
    beneficiaryAccount: "7788001299",
    routingNo: "235261312",
    amount: 425000,
    currency: "BDT",
    purpose: "Insurance Premium",
    narration: "Quarterly insurance premium payment",
    status: "Scheduled",
    valueDate: "2026-06-20",
    scheduledDate: "2026-06-20",
    scheduledTime: "10:00",
    frequency: "Quarterly",
  },
  {
    id: "FT-1007",
    reference: "FT-1007",
    date: "2026-06-08",
    transferType: "RTGS",
    fromAccount: "0123100001 — SJIBL Current",
    beneficiary: "ACI Logistics",
    beneficiaryBank: "Prime Bank",
    beneficiaryBranch: "Motijheel",
    beneficiaryAccount: "3301002811",
    routingNo: "195261211",
    amount: 8000000,
    currency: "BDT",
    purpose: "Goods Payment",
    narration: "Rejected: daily limit exceeded",
    status: "Rejected",
    valueDate: "2026-06-08",
    remarks: "Checker rejected — exceeds transaction limit",
  },
  {
    id: "FT-1008",
    reference: "FT-1008",
    date: "2026-06-27",
    transferType: "NPSB",
    fromAccount: "0123100001 — SJIBL Current",
    beneficiary: "Energypac Ltd",
    beneficiaryBank: "Mercantile Bank",
    beneficiaryBranch: "Banani",
    beneficiaryAccount: "1110200933",
    routingNo: "145261098",
    amount: 300000,
    currency: "BDT",
    purpose: "Monthly Utility",
    narration: "Generator fuel monthly payment",
    status: "Scheduled",
    valueDate: "2026-06-27",
    scheduledDate: "2026-06-27",
    scheduledTime: "09:00",
    frequency: "Monthly",
  },
  {
    id: "FT-1009",
    reference: "FT-1009",
    date: "2026-06-05",
    transferType: "EFTN",
    fromAccount: "0123100001 — SJIBL Current",
    beneficiary: "Square Pharmaceuticals",
    beneficiaryBank: "Eastern Bank",
    beneficiaryBranch: "Gulshan",
    beneficiaryAccount: "8812009933",
    routingNo: "095261220",
    amount: 1650000,
    currency: "BDT",
    purpose: "Trade Payment",
    narration: "Medicine procurement — Waqf Health Fund",
    status: "Completed",
    valueDate: "2026-06-05",
  },
  {
    id: "FT-1010",
    reference: "FT-1010",
    date: "2026-06-03",
    transferType: "Own Account",
    fromAccount: "0123100002 — SJIBL Mudaraba",
    toAccount: "0123100001 — SJIBL Current",
    beneficiary: "Own — SJIBL Current",
    beneficiaryBank: "SJIBL",
    beneficiaryBranch: "Motijheel",
    beneficiaryAccount: "0123100001",
    amount: 10000000,
    currency: "BDT",
    purpose: "Internal Transfer",
    narration: "Repatriation to current account for settlement",
    status: "Completed",
    valueDate: "2026-06-03",
  },
];

export function getFundTransferHistory(): FundTransferRecord[] {
  return FUND_TRANSFER_HISTORY;
}

export function getFundTransfersByType(type: string): FundTransferRecord[] {
  if (type === "all") return FUND_TRANSFER_HISTORY;
  return FUND_TRANSFER_HISTORY.filter(t => t.transferType === type);
}

export const OWN_ACCOUNTS = [
  { id: "0123100001", label: "0123100001 — SJIBL Current (BDT)", currency: "BDT", balance: 124562300 },
  { id: "0123100002", label: "0123100002 — SJIBL Mudaraba (BDT)", currency: "BDT", balance: 18450000 },
  { id: "0123100003", label: "0123100003 — USD NOSTRO (USD)", currency: "USD", balance: 845200 },
];

export const BANGLADESH_BANKS = [
  "Sonali Bank",
  "Janata Bank",
  "Agrani Bank",
  "Rupali Bank",
  "Dutch-Bangla Bank",
  "BRAC Bank",
  "Islami Bank Bangladesh",
  "Prime Bank",
  "Southeast Bank",
  "Mercantile Bank",
  "Eastern Bank",
  "Standard Bank",
  "IFIC Bank",
  "Al-Arafah Islami Bank",
  "Social Islami Bank",
  "Export Import Bank",
  "Mutual Trust Bank",
  "National Bank",
  "One Bank",
  "Dhaka Bank",
  "City Bank",
  "UCB",
  "AB Bank",
  "Pubali Bank",
  "Uttara Bank",
  "BASIC Bank",
  "Bangladesh Commerce Bank",
  "NRB Bank",
  "Midland Bank",
  "Modhumoti Bank",
];

export const TRANSFER_PURPOSES = [
  "Supplier Payment",
  "Salary Disbursement",
  "Trade Settlement",
  "Insurance Premium",
  "Tax Payment",
  "Dividend Payment",
  "Loan Repayment",
  "Import Bill Settlement",
  "Export Proceeds",
  "Utility Bill",
  "Raw Material Procurement",
  "Internal Fund Sweep",
  "Investment",
  "Service Charges",
  "Other",
];
