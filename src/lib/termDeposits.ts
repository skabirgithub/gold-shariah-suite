// Term Deposit profit schedule and transaction ledger data.
// Provides per-FDR profit payout schedule and ledger history.

export interface TDTransaction {
  id: string;
  date: string;
  type: "Profit Credit" | "Principal Placed" | "Renewal" | "Partial Withdrawal" | "Maturity Payout";
  description: string;
  amount: number;
  balanceAfter: number;
  reference: string;
}

export interface ProfitScheduleEntry {
  period: string;
  dueDate: string;
  profitAmount: number;
  status: "Paid" | "Upcoming" | "Accruing";
  creditAccount: string;
}

export const TD_TRANSACTIONS: Record<string, TDTransaction[]> = {
  "FDR-774811": [
    {
      id: "TDTXN-881001",
      date: "2025-01-15",
      type: "Principal Placed",
      description: "FDR Opening — Principal placement at Dilkusha Branch",
      amount: 50000000,
      balanceAfter: 50000000,
      reference: "FDR-774811-OPEN"
    },
    {
      id: "TDTXN-881002",
      date: "2025-04-15",
      type: "Profit Credit",
      description: "Quarterly provisional profit accrual (Q1 — Jan–Mar 2025)",
      amount: 937500,
      balanceAfter: 50937500,
      reference: "PRF-774811-Q1"
    },
    {
      id: "TDTXN-881003",
      date: "2025-07-15",
      type: "Profit Credit",
      description: "Quarterly provisional profit accrual (Q2 — Apr–Jun 2025)",
      amount: 937500,
      balanceAfter: 51875000,
      reference: "PRF-774811-Q2"
    },
    {
      id: "TDTXN-881004",
      date: "2025-10-15",
      type: "Profit Credit",
      description: "Quarterly provisional profit accrual (Q3 — Jul–Sep 2025)",
      amount: 937500,
      balanceAfter: 52812500,
      reference: "PRF-774811-Q3"
    },
    {
      id: "TDTXN-881005",
      date: "2026-01-15",
      type: "Profit Credit",
      description: "Final profit at maturity — Declared profit rate 7.5% p.a. paid to linked account",
      amount: 937500,
      balanceAfter: 53750000,
      reference: "PRF-774811-MATURITY"
    }
  ],

  "FDR-889022": [
    {
      id: "TDTXN-882001",
      date: "2025-03-20",
      type: "Principal Placed",
      description: "FDR Opening — Principal placement at Dilkusha Branch",
      amount: 25000000,
      balanceAfter: 25000000,
      reference: "FDR-889022-OPEN"
    },
    {
      id: "TDTXN-882002",
      date: "2025-09-20",
      type: "Profit Credit",
      description: "Final profit at maturity — Declared profit rate 7.25% p.a. paid to linked account",
      amount: 906250,
      balanceAfter: 25906250,
      reference: "PRF-889022-MATURITY"
    },
    {
      id: "TDTXN-882003",
      date: "2025-09-20",
      type: "Maturity Payout",
      description: "Maturity — Principal + Profit credited to Operations Current Account",
      amount: 25906250,
      balanceAfter: 0,
      reference: "FDR-889022-MATURE"
    }
  ],

  "FDR-901345": [
    {
      id: "TDTXN-883001",
      date: "2024-06-01",
      type: "Principal Placed",
      description: "FDR Opening — Monthly Profit Scheme placement at Motijheel Branch",
      amount: 10000000,
      balanceAfter: 10000000,
      reference: "FDR-901345-OPEN"
    },
    {
      id: "TDTXN-883002",
      date: "2024-07-01",
      type: "Profit Credit",
      description: "Monthly profit payout — July 2024 (Rate: 6.75% p.a.)",
      amount: 56250,
      balanceAfter: 10056250,
      reference: "PRF-901345-202407"
    },
    {
      id: "TDTXN-883003",
      date: "2024-08-01",
      type: "Profit Credit",
      description: "Monthly profit payout — August 2024",
      amount: 56250,
      balanceAfter: 10112500,
      reference: "PRF-901345-202408"
    },
    {
      id: "TDTXN-883004",
      date: "2024-09-01",
      type: "Profit Credit",
      description: "Monthly profit payout — September 2024",
      amount: 56250,
      balanceAfter: 10168750,
      reference: "PRF-901345-202409"
    },
    {
      id: "TDTXN-883005",
      date: "2024-10-01",
      type: "Profit Credit",
      description: "Monthly profit payout — October 2024",
      amount: 56250,
      balanceAfter: 10225000,
      reference: "PRF-901345-202410"
    },
    {
      id: "TDTXN-883006",
      date: "2024-11-01",
      type: "Profit Credit",
      description: "Monthly profit payout — November 2024",
      amount: 56250,
      balanceAfter: 10281250,
      reference: "PRF-901345-202411"
    },
    {
      id: "TDTXN-883007",
      date: "2024-12-01",
      type: "Profit Credit",
      description: "Monthly profit payout — December 2024",
      amount: 56250,
      balanceAfter: 10337500,
      reference: "PRF-901345-202412"
    },
    {
      id: "TDTXN-883008",
      date: "2025-01-01",
      type: "Profit Credit",
      description: "Monthly profit payout — January 2025",
      amount: 56250,
      balanceAfter: 10393750,
      reference: "PRF-901345-202501"
    },
    {
      id: "TDTXN-883009",
      date: "2025-02-01",
      type: "Profit Credit",
      description: "Monthly profit payout — February 2025",
      amount: 56250,
      balanceAfter: 10450000,
      reference: "PRF-901345-202502"
    },
    {
      id: "TDTXN-883010",
      date: "2025-03-01",
      type: "Profit Credit",
      description: "Monthly profit payout — March 2025",
      amount: 56250,
      balanceAfter: 10506250,
      reference: "PRF-901345-202503"
    },
    {
      id: "TDTXN-883011",
      date: "2025-04-01",
      type: "Profit Credit",
      description: "Monthly profit payout — April 2025",
      amount: 56250,
      balanceAfter: 10562500,
      reference: "PRF-901345-202504"
    },
    {
      id: "TDTXN-883012",
      date: "2025-05-01",
      type: "Profit Credit",
      description: "Monthly profit payout — May 2025",
      amount: 56250,
      balanceAfter: 10618750,
      reference: "PRF-901345-202505"
    },
    {
      id: "TDTXN-883013",
      date: "2025-06-01",
      type: "Profit Credit",
      description: "Monthly profit payout — June 2025",
      amount: 56250,
      balanceAfter: 10675000,
      reference: "PRF-901345-202506"
    },
    {
      id: "TDTXN-883014",
      date: "2025-07-01",
      type: "Profit Credit",
      description: "Monthly profit payout — July 2025",
      amount: 56250,
      balanceAfter: 10731250,
      reference: "PRF-901345-202507"
    },
    {
      id: "TDTXN-883015",
      date: "2025-08-01",
      type: "Profit Credit",
      description: "Monthly profit payout — August 2025",
      amount: 56250,
      balanceAfter: 10787500,
      reference: "PRF-901345-202508"
    },
    {
      id: "TDTXN-883016",
      date: "2025-09-01",
      type: "Profit Credit",
      description: "Monthly profit payout — September 2025",
      amount: 56250,
      balanceAfter: 10843750,
      reference: "PRF-901345-202509"
    },
    {
      id: "TDTXN-883017",
      date: "2025-10-01",
      type: "Profit Credit",
      description: "Monthly profit payout — October 2025",
      amount: 56250,
      balanceAfter: 10900000,
      reference: "PRF-901345-202510"
    },
    {
      id: "TDTXN-883018",
      date: "2025-11-01",
      type: "Profit Credit",
      description: "Monthly profit payout — November 2025",
      amount: 56250,
      balanceAfter: 10956250,
      reference: "PRF-901345-202511"
    },
    {
      id: "TDTXN-883019",
      date: "2025-12-01",
      type: "Profit Credit",
      description: "Monthly profit payout — December 2025",
      amount: 56250,
      balanceAfter: 11012500,
      reference: "PRF-901345-202512"
    },
    {
      id: "TDTXN-883020",
      date: "2026-01-01",
      type: "Profit Credit",
      description: "Monthly profit payout — January 2026",
      amount: 56250,
      balanceAfter: 11068750,
      reference: "PRF-901345-202601"
    },
    {
      id: "TDTXN-883021",
      date: "2026-02-01",
      type: "Profit Credit",
      description: "Monthly profit payout — February 2026",
      amount: 56250,
      balanceAfter: 11125000,
      reference: "PRF-901345-202602"
    },
    {
      id: "TDTXN-883022",
      date: "2026-03-01",
      type: "Profit Credit",
      description: "Monthly profit payout — March 2026",
      amount: 56250,
      balanceAfter: 11181250,
      reference: "PRF-901345-202603"
    },
    {
      id: "TDTXN-883023",
      date: "2026-04-01",
      type: "Profit Credit",
      description: "Monthly profit payout — April 2026",
      amount: 56250,
      balanceAfter: 11237500,
      reference: "PRF-901345-202604"
    },
    {
      id: "TDTXN-883024",
      date: "2026-05-01",
      type: "Profit Credit",
      description: "Monthly profit payout — May 2026",
      amount: 56250,
      balanceAfter: 11293750,
      reference: "PRF-901345-202605"
    },
    {
      id: "TDTXN-883025",
      date: "2026-06-01",
      type: "Profit Credit",
      description: "Monthly profit payout — June 2026",
      amount: 56250,
      balanceAfter: 11350000,
      reference: "PRF-901345-202606"
    }
  ]
};

export function getTDTransactions(receiptNo: string): TDTransaction[] {
  return (TD_TRANSACTIONS[receiptNo] || []).sort((a, b) => b.date.localeCompare(a.date));
}

export function getProfitSchedule(receiptNo: string, profitRate: number, principalAmount: number, openingDate: string, maturityDate: string, profitFrequency: string): ProfitScheduleEntry[] {
  const schedule: ProfitScheduleEntry[] = [];
  const today = new Date().toISOString().slice(0, 10);

  if (profitFrequency === "At Maturity") {
    const totalProfit = (principalAmount * profitRate) / 100 * (
      (new Date(maturityDate).getTime() - new Date(openingDate).getTime()) / (365 * 24 * 60 * 60 * 1000)
    );
    schedule.push({
      period: "Full Tenure",
      dueDate: maturityDate,
      profitAmount: Math.round(totalProfit),
      status: maturityDate <= today ? "Paid" : "Upcoming",
      creditAccount: "Linked payout account on maturity"
    });
  } else {
    // Monthly profit schedule
    const monthlyRate = profitRate / 12 / 100;
    const monthlyProfit = principalAmount * monthlyRate;
    const startDate = new Date(openingDate);
    const endDate = new Date(maturityDate);
    let current = new Date(startDate);
    current.setMonth(current.getMonth() + 1);
    let idx = 1;
    while (current <= endDate) {
      const dueStr = current.toISOString().slice(0, 10);
      const monthStr = current.toLocaleString("en-BD", { month: "long", year: "numeric" });
      schedule.push({
        period: `Month ${idx} — ${monthStr}`,
        dueDate: dueStr,
        profitAmount: Math.round(monthlyProfit),
        status: dueStr < today ? "Paid" : dueStr === today ? "Paid" : "Upcoming",
        creditAccount: "Monthly credit to linked account"
      });
      current.setMonth(current.getMonth() + 1);
      idx++;
    }
  }
  return schedule;
}
