export interface Transaction {
  id: string;
  date: string;
  type: "Debit" | "Credit";
  description: string;
  amount: number;
  balanceAfter: number;
  category: "Transfer" | "Payroll" | "Trade" | "Fees" | "Profit" | "Collection" | "Other";
  reference: string;
}

export const ACCOUNT_TRANSACTIONS: Record<string, Transaction[]> = {
  "0123100001": [
    {
      id: "TXN-881928",
      date: "2026-06-14",
      type: "Debit",
      description: "RTGS Fund Transfer to Globex Industries (Supplier Settlement)",
      amount: 4500000,
      balanceAfter: 124562300,
      category: "Transfer",
      reference: "FT-1001"
    },
    {
      id: "TXN-881920",
      date: "2026-06-12",
      type: "Credit",
      description: "EFTN Invoice realization — Pran Foods Ltd",
      amount: 1250000,
      balanceAfter: 129062300,
      category: "Collection",
      reference: "INV-2025-0411"
    },
    {
      id: "TXN-881912",
      date: "2026-06-10",
      type: "Debit",
      description: "Utility Bill Payout — DESCO Electricity",
      amount: 14200,
      balanceAfter: 127812300,
      category: "Other",
      reference: "BP-201"
    },
    {
      id: "TXN-881900",
      date: "2026-06-08",
      type: "Debit",
      description: "Pay Order Issued — NBR Corporate Income Tax",
      amount: 425000,
      balanceAfter: 127826500,
      category: "Transfer",
      reference: "PI-3301"
    },
    {
      id: "TXN-881881",
      date: "2026-06-05",
      type: "Credit",
      description: "Auto-Sweep Pool Inflow from Mudaraba Savings",
      amount: 5000000,
      balanceAfter: 128251500,
      category: "Profit",
      reference: "SWP-OP-MASTER"
    },
    {
      id: "TXN-881870",
      date: "2026-06-01",
      type: "Credit",
      description: "Export Bill Realization — Walmart Inc (Garments Shipment)",
      amount: 350000,
      balanceAfter: 123251500,
      category: "Trade",
      reference: "BL-EXP-33201"
    },
    {
      id: "TXN-881840",
      date: "2026-05-28",
      type: "Debit",
      description: "Bulk Payroll Payout — Salaries for Aug '25",
      amount: 12840000,
      balanceAfter: 122901500,
      category: "Payroll",
      reference: "PAYROLL-AUG-2025"
    },
    {
      id: "TXN-881812",
      date: "2026-05-20",
      type: "Credit",
      description: "Cash / Internal Transfer Replenishment",
      amount: 25000000,
      balanceAfter: 135741500,
      category: "Transfer",
      reference: "TR-88291"
    }
  ],
  "0123100002": [
    {
      id: "TXN-772819",
      date: "2026-06-13",
      type: "Debit",
      description: "EFTN Salary Payout — BRAC Logistics Dispatch Team",
      amount: 850000,
      balanceAfter: 18450000,
      category: "Payroll",
      reference: "FT-1002"
    },
    {
      id: "TXN-772810",
      date: "2026-06-06",
      type: "Credit",
      description: "Internal Fund Transfer from Operations Account",
      amount: 12840000,
      balanceAfter: 19300000,
      category: "Transfer",
      reference: "TX-99028"
    },
    {
      id: "TXN-772800",
      date: "2026-06-02",
      type: "Debit",
      description: "Bulk Payroll Salary Disbursement",
      amount: 12840000,
      balanceAfter: 6460000,
      category: "Payroll",
      reference: "PAYROLL-AUG-2025"
    },
    {
      id: "TXN-772781",
      date: "2026-05-25",
      type: "Credit",
      description: "Corporate Account Replenishment Payout Fund",
      amount: 15000000,
      balanceAfter: 19300000,
      category: "Transfer",
      reference: "TX-98273"
    }
  ],
  "0123100003": [
    {
      id: "TXN-991204",
      date: "2026-06-12",
      type: "Debit",
      description: "Outward SWIFT Transfer to Yangtse Trading (LC settlement)",
      amount: 320000,
      balanceAfter: 845200,
      category: "Trade",
      reference: "FT-1003"
    },
    {
      id: "TXN-991192",
      date: "2026-06-09",
      type: "Debit",
      description: "Import Bill Acceptance under LC-IMP-2025-0994",
      amount: 150000,
      balanceAfter: 1165200,
      category: "Trade",
      reference: "BL-IMP-55201"
    },
    {
      id: "TXN-991180",
      date: "2026-06-04",
      type: "Credit",
      description: "Inward Trade Remittance / Export LC Walmart Realization",
      amount: 350000,
      balanceAfter: 1315200,
      category: "Trade",
      reference: "BL-EXP-33201"
    },
    {
      id: "TXN-991168",
      date: "2026-05-30",
      type: "Debit",
      description: "LC margin payment fee for LC-IMP-2025-0992",
      amount: 320000,
      balanceAfter: 965200,
      category: "Fees",
      reference: "LC-APP-9912"
    },
    {
      id: "TXN-991150",
      date: "2026-05-15",
      type: "Credit",
      description: "Inward Foreign Remittance from Trade Partner",
      amount: 600000,
      balanceAfter: 1285200,
      category: "Collection",
      reference: "TR-FX-88192"
    }
  ]
};

export function getTransactionsForAccount(accountNo: string): Transaction[] {
  return ACCOUNT_TRANSACTIONS[accountNo] || [];
}
