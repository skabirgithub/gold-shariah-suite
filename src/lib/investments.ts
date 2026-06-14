export interface InvestmentTransaction {
  id: string;
  date: string;
  type: "Disbursement" | "Repayment";
  description: string;
  amount: number;
  balanceAfter: number;
  reference: string;
}

export const INVESTMENT_LEDGER: Record<string, InvestmentTransaction[]> = {
  "FAC-MUR-8839": [
    {
      id: "MUR-TR-4402",
      date: "2026-06-04",
      type: "Repayment",
      description: "Principal installment repayment — Operations A/C debit",
      amount: 20000000,
      balanceAfter: 185400000,
      reference: "RP-8819"
    },
    {
      id: "MUR-TR-4390",
      date: "2026-05-20",
      type: "Disbursement",
      description: "Supplier payout — Steel-Works Bangladesh (Quotation Q-882)",
      amount: 45000000,
      balanceAfter: 205400000,
      reference: "DB-9912"
    },
    {
      id: "MUR-TR-4351",
      date: "2026-05-05",
      type: "Repayment",
      description: "Corporate principal repayment — Operation account sweep",
      amount: 15000000,
      balanceAfter: 160400000,
      reference: "RP-8701"
    },
    {
      id: "MUR-TR-4320",
      date: "2026-04-15",
      type: "Disbursement",
      description: "Supplier payout — Apex Materials PLC (Ref Proforma INV-492)",
      amount: 80000000,
      balanceAfter: 175400000,
      reference: "DB-9880"
    },
    {
      id: "MUR-TR-4301",
      date: "2026-04-01",
      type: "Disbursement",
      description: "Supplier payout — Globex Trading HK (Import raw materials)",
      amount: 95400000,
      balanceAfter: 95400000,
      reference: "DB-9801"
    }
  ],
  "FAC-HPSM-2201": [
    {
      id: "HPS-TR-1022",
      date: "2026-06-01",
      type: "Repayment",
      description: "Monthly lease rental payment — Machine Line A",
      amount: 4600000,
      balanceAfter: 65400000,
      reference: "RP-7740"
    },
    {
      id: "HPS-TR-1011",
      date: "2026-05-01",
      type: "Repayment",
      description: "Monthly lease rental payment — Machine Line A",
      amount: 4600000,
      balanceAfter: 70000000,
      reference: "RP-7721"
    },
    {
      id: "HPS-TR-1002",
      date: "2026-04-01",
      type: "Repayment",
      description: "Monthly lease rental payment — Machine Line A",
      amount: 4600000,
      balanceAfter: 74600000,
      reference: "RP-7704"
    },
    {
      id: "HPS-TR-990",
      date: "2026-03-10",
      type: "Disbursement",
      description: "Drawdown payout — Industrial Machinery Supplier Ltd",
      amount: 79200000,
      balanceAfter: 79200000,
      reference: "DB-5510"
    }
  ]
};

export function getInvestmentTransactions(facilityNo: string): InvestmentTransaction[] {
  return INVESTMENT_LEDGER[facilityNo] || [];
}
