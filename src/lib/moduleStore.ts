// LocalStorage-backed CRUD for per-module records.
// Seeds sample rows so list pages aren't empty on first load.

import { getSchema, MODULE_SCHEMAS } from "./moduleSchema";
import { getSession } from "./session";


export type Record = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  [key: string]: unknown;
};

const KEY = (slug: string) => `sjibl.ctb.v2.${slug}`;

function read(slug: string): Record[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY(slug));
    if (raw) return JSON.parse(raw) as Record[];
  } catch { /* ignore */ }
  const seeded = seed(slug);
  write(slug, seeded);
  return seeded;
}

function write(slug: string, rows: Record[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY(slug), JSON.stringify(rows));
}

export function list(slug: string): Record[] {
  return read(slug).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function get(slug: string, id: string): Record | undefined {
  return read(slug).find((r) => r.id === id);
}

function nextId(slug: string) {
  const prefix = (MODULE_SCHEMAS[slug]?.singular ?? "REC")
    .replace(/[^A-Z]/gi, "").slice(0, 3).toUpperCase() || "REC";
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

export function create(slug: string, data: Partial<Record>): Record {
  const now = new Date().toISOString();
  const rec: Record = {
    id: nextId(slug),
    status: "Pending",
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  const rows = read(slug);
  rows.unshift(rec);
  write(slug, rows);

  // Auto-generate Approval record for creator modules
  if (slug !== "approval" && slug !== "profile") {
    const schema = getSchema(slug);
    if (schema && schema.canCreate) {
      const session = getSession();
      const maker = session?.username || "maker";

      // Calculate amount
      let amt = 0;
      if (typeof rec.amount === "number") amt = rec.amount;
      else if (typeof rec.amount === "string") amt = parseFloat(rec.amount) || 0;
      else if (typeof rec.totalAmount === "number") amt = rec.totalAmount;
      else if (typeof rec.totalAmount === "string") amt = parseFloat(rec.totalAmount) || 0;

      // Calculate risk rating
      let risk = "Low";
      if (amt >= 10000000) risk = "High";
      else if (amt >= 1000000 || slug === "lc-initiation") risk = "Medium";

      // Formulate details string based on module slug
      let details = `New request in ${schema.singular}`;
      if (slug === "fund-transfer") {
        details = `${rec.transferType || "Transfer"} of ${rec.currency || "BDT"} ${amt.toLocaleString()} to ${rec.beneficiary || "Unknown"}`;
      } else if (slug === "bulk-transfer") {
        details = `Bulk Transfer: ${rec.batchRef} (${rec.totalRecords || 0} records, BDT ${amt.toLocaleString()})`;
      } else if (slug === "lc-initiation") {
        details = `${rec.lcType || "Sight"} LC Application for ${rec.currency || "USD"} ${amt.toLocaleString()} to ${rec.beneficiary || "Unknown"}`;
      } else if (slug === "bill-pay") {
        details = `Bill Payment to ${rec.biller} (${rec.consumerNo}, BDT ${amt.toLocaleString()})`;
      } else if (slug === "beneficiary") {
        details = `Add Beneficiary: ${rec.name} (${rec.bankName}, A/C: ${rec.account})`;
      } else if (slug === "payment-instruction") {
        details = `Payment Instruction (${rec.instrumentType}) to ${rec.payee} for BDT ${amt.toLocaleString()}`;
      } else if (slug === "services") {
        details = `Service: ${rec.serviceType} for A/C ${rec.account}`;
      } else if (slug === "service-request") {
        details = `Support Ticket: ${rec.subject} (${rec.priority} priority)`;
      } else if (slug === "murabaha") {
        details = `Murabaha Goods Procurement: BDT ${amt.toLocaleString()} from ${rec.vendorName || "Unknown"}`;
      } else if (slug === "zakat") {
        details = `Zakat & CSR Disbursal: BDT ${amt.toLocaleString()} to ${rec.beneficiaryFund || "Unknown"}`;
      }

      // Create the approval task record
      const appRows = read("approval");
      const appRec: Record = {
        id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
        createdAt: now,
        updatedAt: now,
        status: "Pending",
        ref: rec.id,
        moduleTitle: schema.singular,
        details: details,
        maker: maker,
        risk: risk,
        amount: amt,
        sourceSlug: slug,
        remarks: "Awaiting maker-checker verification."
      };
      appRows.unshift(appRec);
      write("approval", appRows);
    }
  }

  return rec;
}

export function update(slug: string, id: string, data: Partial<Record>): Record | undefined {
  const rows = read(slug);
  const i = rows.findIndex((r) => r.id === id);
  if (i < 0) return undefined;
  
  const oldRec = rows[i];
  const newRec = { ...oldRec, ...data, updatedAt: new Date().toISOString() };
  rows[i] = newRec;
  write(slug, rows);

  // If this is an approval task and the status changed, update the source record!
  if (slug === "approval" && data.status && data.status !== oldRec.status) {
    const sourceSlug = oldRec.sourceSlug as string;
    const originalId = oldRec.ref as string;
    if (sourceSlug && originalId) {
      update(sourceSlug, originalId, { status: data.status });
    }
  }

  // If a source record is updated directly (e.g. fund-transfer status changed to Approved), sync it back to the approval record
  if (slug !== "approval" && data.status && data.status !== oldRec.status) {
    const approvals = read("approval");
    const appIndex = approvals.findIndex((a) => a.sourceSlug === slug && a.ref === id);
    if (appIndex >= 0 && approvals[appIndex].status !== data.status) {
      approvals[appIndex] = {
        ...approvals[appIndex],
        status: data.status,
        updatedAt: new Date().toISOString()
      };
      write("approval", approvals);
    }
  }

  return newRec;
}

export function remove(slug: string, id: string): boolean {
  const rows = read(slug);
  const next = rows.filter((r) => r.id !== id);
  if (next.length === rows.length) return false;
  write(slug, next);

  // If a source record is deleted, delete the corresponding approval task
  if (slug !== "approval") {
    const approvals = read("approval");
    const nextApp = approvals.filter((a) => !(a.sourceSlug === slug && a.ref === id));
    if (nextApp.length !== approvals.length) {
      write("approval", nextApp);
    }
  }

  return true;
}

/* ----------------------------- Seed data ----------------------------- */

function seed(slug: string): Record[] {
  const now = Date.now();
  const day = 86400000;
  const iso = (d: number) => new Date(d).toISOString();
  const dt = (d: number) => new Date(d).toISOString().slice(0, 10);

  const base = (i: number, status: string) => ({
    id: `${slug.toUpperCase().slice(0, 3)}-${(1000 + i).toString()}`,
    createdAt: iso(now - i * day),
    updatedAt: iso(now - i * day),
    status,
  });

  switch (slug) {
    case "fund-transfer":
      return [
        { ...base(1, "Approved"), reference: "FT-1001", transferType: "RTGS",
          fromAccount: "0123100001 — SJIBL Current", toAccount: "", beneficiary: "Globex Industries",
          beneficiaryBank: "Dutch-Bangla Bank", beneficiaryBranch: "Motijheel", routingNo: "090261139",
          beneficiaryAccount: "9981200022", amount: 4500000, currency: "BDT",
          valueDate: dt(now), purpose: "Supplier Payment", narration: "Murabaha goods settlement Q3", remarks: "" },
        { ...base(2, "Pending"), reference: "FT-1002", transferType: "EFTN",
          fromAccount: "0123100002 — SJIBL Mudaraba", toAccount: "", beneficiary: "BRAC Logistics",
          beneficiaryBank: "BRAC Bank", beneficiaryBranch: "Gulshan", routingNo: "060261456",
          beneficiaryAccount: "5577001188", amount: 850000, currency: "BDT",
          valueDate: dt(now - day), purpose: "Salary", narration: "Staff salary disbursement June 2026", remarks: "" },
        { ...base(3, "Approved"), reference: "FT-1003", transferType: "NPSB",
          fromAccount: "0123100001 — SJIBL Current", toAccount: "", beneficiary: "Pran-RFL Group",
          beneficiaryBank: "Islami Bank", beneficiaryBranch: "Paltan", routingNo: "125261100",
          beneficiaryAccount: "2010102889111", amount: 1200000, currency: "BDT",
          valueDate: dt(now - 2 * day), purpose: "Trade Payment", narration: "Raw material procurement", remarks: "" },
        { ...base(4, "Approved"), reference: "FT-1004", transferType: "Own Account",
          fromAccount: "0123100001 — SJIBL Current", toAccount: "0123100002 — SJIBL Mudaraba",
          beneficiary: "Own — SJIBL Mudaraba", beneficiaryBank: "SJIBL", beneficiaryBranch: "Motijheel",
          beneficiaryAccount: "0123100002", amount: 5000000, currency: "BDT",
          valueDate: dt(now - 3 * day), purpose: "Internal Sweep", narration: "Auto-sweep to Mudaraba savings", remarks: "" },
        { ...base(5, "Approved"), reference: "FT-1005", transferType: "Within Bank",
          fromAccount: "0123100001 — SJIBL Current", toAccount: "", beneficiary: "Abul Khair Group",
          beneficiaryBank: "SJIBL", beneficiaryBranch: "Chittagong Main", routingNo: "",
          beneficiaryAccount: "0189100055", amount: 2750000, currency: "BDT",
          valueDate: dt(now - 4 * day), purpose: "Trade Settlement", narration: "Steel import invoice clearance", remarks: "" },
        { ...base(6, "Scheduled"), reference: "FT-1006", transferType: "EFTN",
          fromAccount: "0123100002 — SJIBL Mudaraba", toAccount: "", beneficiary: "Green Delta Insurance",
          beneficiaryBank: "Southeast Bank", beneficiaryBranch: "Dhanmondi", routingNo: "235261312",
          beneficiaryAccount: "7788001299", amount: 425000, currency: "BDT",
          valueDate: dt(now + 7 * day), purpose: "Insurance Premium", narration: "Quarterly insurance premium payment",
          scheduledDate: dt(now + 7 * day), scheduledTime: "10:00", frequency: "Quarterly", remarks: "" },
        { ...base(7, "Rejected"), reference: "FT-1007", transferType: "RTGS",
          fromAccount: "0123100001 — SJIBL Current", toAccount: "", beneficiary: "ACI Logistics",
          beneficiaryBank: "Prime Bank", beneficiaryBranch: "Motijheel", routingNo: "195261211",
          beneficiaryAccount: "3301002811", amount: 8000000, currency: "BDT",
          valueDate: dt(now - 5 * day), purpose: "Goods Payment", narration: "Rejected: daily limit exceeded", remarks: "Checker rejected — exceeds transaction limit" },
        { ...base(8, "Scheduled"), reference: "FT-1008", transferType: "NPSB",
          fromAccount: "0123100001 — SJIBL Current", toAccount: "", beneficiary: "Energypac Ltd",
          beneficiaryBank: "Mercantile Bank", beneficiaryBranch: "Banani", routingNo: "145261098",
          beneficiaryAccount: "1110200933", amount: 300000, currency: "BDT",
          valueDate: dt(now + 14 * day), purpose: "Monthly Utility", narration: "Generator fuel monthly payment",
          scheduledDate: dt(now + 14 * day), scheduledTime: "09:00", frequency: "Monthly", remarks: "" },
      ];
    case "beneficiary":
      return [
        { ...base(1, "Approved"), name: "Globex Industries", nickname: "Globex",
          type: "Other Bank (EFTN/RTGS/NPSB)", account: "9981200022",
          bankName: "Dutch-Bangla Bank", branch: "Motijheel", currency: "BDT" },
        { ...base(2, "Approved"), name: "Yangtse Trading", nickname: "Yangtse-CN",
          type: "Foreign (SWIFT)", account: "CN-77110099", bankName: "Bank of China",
          branch: "Shanghai", swiftCode: "BKCHCNBJ", currency: "USD" },
      ];
    case "bill-pay":
      return [
        { ...base(1, "Approved"), reference: "BP-201", billerCategory: "Utility",
          biller: "DESCO", consumerNo: "ACC-771122", amount: 14200, currency: "BDT" },
        { ...base(2, "Pending"), reference: "BP-202", billerCategory: "Telecom / Recharge",
          biller: "Grameenphone", consumerNo: "01711-000-000", amount: 500, currency: "BDT" },
      ];
    case "bulk-transfer":
      return [
        { ...base(1, "Pending"), batchRef: "PAYROLL-AUG-2025", fileName: "payroll-aug.csv",
          fileType: "CSV", totalRecords: 248, totalAmount: 12840000, currency: "BDT" },
      ];
    case "lc-initiation":
      return [
        { ...base(1, "Pending"), lcRef: "LC-APP-9912", lcType: "Sight",
          beneficiary: "Yangtse Trading", country: "China", currency: "USD",
          amount: 320000, expiryDate: dt(now + 60 * day), issueDate: dt(now) },
      ];
    case "services":
      return [
        { ...base(1, "Approved"), ticket: "SRV-501", serviceType: "Cheque Book Request",
          account: "0123100001 — SJIBL Current", quantity: 50, raisedOn: dt(now - day) },
      ];
    case "service-request":
      return [
        { ...base(1, "Pending"), ticket: "TCK-7741", subject: "Cannot download statement PDF",
          category: "Account", priority: "Medium", raisedBy: "Tania (Maker)" },
      ];
    case "corporate-admin":
      return [
        { ...base(1, "Approved"), username: "tania.m", displayName: "Tania Mahmud",
          role: "Maker", entity: "Globex Industries Ltd", email: "tania@globex.bd",
          dailyLimit: 5000000, perTxnLimit: 1000000 },
        { ...base(2, "Approved"), username: "rashed.c", displayName: "Rashed Chowdhury",
          role: "Checker", entity: "Globex Industries Ltd", email: "rashed@globex.bd",
          dailyLimit: 20000000, perTxnLimit: 5000000 },
      ];
    case "invoice":
      return [
        { ...base(1, "Approved"), invoiceNo: "INV-2025-0411", customer: "Pran Foods Ltd",
          currency: "BDT", amount: 1250000, issueDate: dt(now - 5 * day),
          dueDate: dt(now + 10 * day), virtualAccount: "VA-7711-0001" },
        { ...base(2, "Pending"), invoiceNo: "INV-2025-0412", customer: "Aarong Retail",
          currency: "BDT", amount: 480000, issueDate: dt(now - 2 * day),
          dueDate: dt(now + 13 * day), virtualAccount: "VA-7711-0002" },
      ];
    case "payment-instruction":
      return [
        { ...base(1, "Approved"), instructionRef: "PI-3301", instrumentType: "Pay Order",
          fromAccount: "0123100001 — SJIBL Current", payee: "NBR — Income Tax",
          currency: "BDT", amount: 425000, issueDate: dt(now - day) },
      ];
    case "inquiry":
      return [
        { ...base(1, "Approved"), ticket: "INQ-9001", inquiryType: "Exchange Rate",
          currencyPair: "USD/BDT", subject: "Today's TT clean rate",
          raisedOn: dt(now) },
      ];
    case "approval":
      return [
        { ...base(1, "Pending"), ref: "FT-1002", moduleTitle: "Fund Transfer",
          details: "EFTN BDT 850,000 to BRAC Logistics", maker: "rashed.c",
          risk: "Low", amount: 850000, sourceSlug: "fund-transfer", remarks: "Salary disbursement for dispatch team." },
        { ...base(2, "Pending"), ref: "BP-202", moduleTitle: "Bill Pay",
          details: "Bill Payment to Grameenphone (01711-000-000, BDT 500)", maker: "tania.m",
          risk: "Low", amount: 500, sourceSlug: "bill-pay", remarks: "CFO phone bill replenishment." },
        { ...base(3, "Pending"), ref: "LC-APP-9912", moduleTitle: "LC Initiation",
          details: "Sight LC USD 320,000 to Yangtse Trading", maker: "rashed.c",
          risk: "High", amount: 320000, sourceSlug: "lc-initiation", remarks: "Steel procurement agreement attached." },
        { ...base(4, "Pending"), ref: "MB-2025-0109", moduleTitle: "Murabaha Procurement",
          details: "Murabaha Goods Procurement: BDT 4,500,000 from Chemical-Ind BDT", maker: "tania.m",
          risk: "Medium", amount: 4500000, sourceSlug: "murabaha", remarks: "Chemical invoice verified." },
        { ...base(5, "Pending"), ref: "ZK-2025-0015", moduleTitle: "Zakat Request",
          details: "Zakat & CSR Disbursal: BDT 1,500,000 to Anjuman Mufidul Islam Zakat Fund", maker: "rashed.c",
          risk: "Medium", amount: 1500000, sourceSlug: "zakat", remarks: "Ramadan Zakat donation approval." }
      ];
    case "accounts":
      return [
        { ...base(1, "Approved"), accountNo: "0123100001", accountName: "Globex Industries Ltd — Operations",
          accountType: "Al-Wadeeah Current", currency: "BDT", balance: 124562300,
          availableBalance: 124562300, branchName: "Dilkusha Branch", routingNumber: "185261452",
          swiftCode: "SJIBBDDHDKA" },
        { ...base(2, "Approved"), accountNo: "0123100002", accountName: "Globex Industries Ltd — Payroll Account",
          accountType: "Al-Wadeeah Current", currency: "BDT", balance: 18450000,
          availableBalance: 18450000, branchName: "Dilkusha Branch", routingNumber: "185261452",
          swiftCode: "SJIBBDDHDKA" },
        { ...base(3, "Approved"), accountNo: "0123100003", accountName: "Globex Industries Ltd — USD Operating",
          accountType: "Al-Wadeeah Current", currency: "USD", balance: 845200,
          availableBalance: 840000, branchName: "OBU Branch", routingNumber: "185260000",
          swiftCode: "SJIBBDDHXXX" }
      ];
    case "investment":
      return [
        { ...base(1, "Approved"), facilityNo: "FAC-MUR-8839", facilityType: "Bai-Murabaha",
          limitAmount: 250000000, outstandingAmount: 185400000, profitRate: 9.5,
          expiryDate: "2026-12-31", securityDetails: "Hypothecation of stock and personal guarantee of Directors." },
        { ...base(2, "Approved"), facilityNo: "FAC-HPSM-2201", facilityType: "HPSM (Home/Asset)",
          limitAmount: 100000000, outstandingAmount: 65400000, profitRate: 9.0,
          expiryDate: "2030-06-30", securityDetails: "Registered Mortgage of industrial land and buildings." }
      ];
    case "term-deposit":
      return [
        { ...base(1, "Approved"), receiptNo: "FDR-774811", type: "Mudaraba Term Deposit (FDR)",
          principalAmount: 50000000, profitRate: 7.5, tenureMonths: 12, currency: "BDT",
          openingDate: "2025-01-15", maturityDate: "2026-01-15", linkedAccount: "0123100001 — SJIBL Current",
          branchName: "Dilkusha Branch", entity: "Globex Industries Ltd",
          profitFrequency: "At Maturity", expectedProfit: 3750000,
          autoRenewal: "Yes — Auto-Renew", remarks: "Annual FDR for reserve fund management." },
        { ...base(2, "Approved"), receiptNo: "FDR-889022", type: "Mudaraba Term Deposit (FDR)",
          principalAmount: 25000000, profitRate: 7.25, tenureMonths: 6, currency: "BDT",
          openingDate: "2025-03-20", maturityDate: "2025-09-20", linkedAccount: "0123100001 — SJIBL Current",
          branchName: "Dilkusha Branch", entity: "Globex Industries Ltd",
          profitFrequency: "At Maturity", expectedProfit: 906250,
          autoRenewal: "No — Manual Withdrawal", remarks: "6-month operational liquidity buffer." },
        { ...base(3, "Approved"), receiptNo: "FDR-901345", type: "Mudaraba Monthly Profit Scheme",
          principalAmount: 10000000, profitRate: 6.75, tenureMonths: 24, currency: "BDT",
          openingDate: "2024-06-01", maturityDate: "2026-06-01", linkedAccount: "0123100002 — SJIBL Mudaraba",
          branchName: "Motijheel Branch", entity: "Globex Industries Ltd",
          profitFrequency: "Monthly", expectedProfit: 1350000,
          autoRenewal: "No — Manual Withdrawal", remarks: "Monthly profit scheme for working capital supplement." }
      ];
    case "import-lc":
      return [
        { ...base(1, "Approved"), lcNumber: "LC-IMP-2025-0992", lcType: "Sight LC",
          beneficiaryName: "Yangtse Trading", beneficiaryAddress: "Block B, Industrial Area, Pudong, Shanghai, China",
          lcAmount: 320000, currency: "USD", openingDate: "2025-05-10", expiryDate: dt(now + 60 * day),
          shipmentDate: dt(now + 30 * day), goodsDescription: "Industrial raw machinery and steel structures.",
          swiftReference: "SWF-9928182" },
        { ...base(2, "Approved"), lcNumber: "LC-IMP-2025-0994", lcType: "UPAS LC",
          beneficiaryName: "Global Chemicals GMBH", beneficiaryAddress: "Mainz, Frankfurt, Germany",
          lcAmount: 185000, currency: "EUR", openingDate: "2025-06-01", expiryDate: dt(now + 90 * day),
          shipmentDate: dt(now + 45 * day), goodsDescription: "Chemical grade additives and solvents.",
          swiftReference: "SWF-9928185" }
      ];
    case "import-bill":
      return [
        { ...base(1, "Approved"), billNumber: "BL-IMP-55201", lcNumber: "LC-IMP-2025-0992",
          billAmount: 150000, currency: "USD", discrepancyStatus: "Clean / No Discrepancies",
          discrepancyDetails: "", dueDate: dt(now + 15 * day), acceptanceDate: dt(now - 10 * day) },
        { ...base(2, "Pending"), billNumber: "BL-IMP-55204", lcNumber: "LC-IMP-2025-0994",
          billAmount: 85000, currency: "EUR", discrepancyStatus: "Minor Discrepancy",
          discrepancyDetails: "Late shipment by 2 days; draft amount exceeds invoice.",
          dueDate: dt(now + 25 * day), acceptanceDate: "" }
      ];
    case "export-lc":
      return [
        { ...base(1, "Approved"), lcNumber: "LC-EXP-88912", applicantName: "Walmart Inc",
          lcAmount: 850000, currency: "USD", issuingBank: "Wells Fargo Bank NA",
          advisingRef: "ADV-88291", openingDate: "2025-04-15", expiryDate: dt(now + 45 * day),
          shipmentDate: dt(now + 15 * day), goodsDescription: "Finished readymade garments, cotton t-shirts." }
      ];
    case "export-bill":
      return [
        { ...base(1, "Approved"), billNumber: "BL-EXP-33201", lcNumber: "LC-EXP-88912",
          billAmount: 350000, currency: "USD", negotiatedAmount: 340000, realizedAmount: 350000,
          realizationDate: dt(now - 5 * day), buyerName: "Walmart Inc", remarks: "Fully realized and settled to BDT current account." }
      ];
    case "credit-card":
      return [
        { ...base(1, "Approved"), cardNumber: "4521-XXXX-XXXX-8830", cardholderName: "Mohammad Rashed (CEO)",
          cardType: "Visa Corporate Gold", limitAmount: 1000000, outstandingAmount: 245000,
          availableLimit: 755000, dueDate: dt(now + 10 * day), minDue: 12250 },
        { ...base(2, "Approved"), cardNumber: "4521-XXXX-XXXX-1104", cardholderName: "Tania Mahmud (CFO)",
          cardType: "Mastercard Corporate Platinum", limitAmount: 1500000, outstandingAmount: 485000,
          availableLimit: 1015000, dueDate: dt(now + 10 * day), minDue: 24250 }
      ];
    case "cash-management":
      return [
        { ...base(1, "Approved"), sweepRef: "SWP-OP-MASTER", type: "Target Balance Sweep",
          sourceAccount: "0123100002 — SJIBL Mudaraba", targetAccount: "0123100001 — SJIBL Current",
          thresholdAmount: 5000000, sweepSchedule: "Daily EOD" }
      ];
    case "profile":
      return [
        { ...base(1, "Approved"), username: "rashed.c", displayName: "Rashed Chowdhury",
          email: "rashed@globex.bd", phone: "+880-1711-000000", role: "Checker",
          twoFactorEnabled: "Enabled", notificationPreference: "Both Email and SMS" }
      ];
    case "sukuk":
      return [
        { ...base(1, "Approved"), certificateNo: "SK-2025-0819", sukukType: "Sukuk Al-Ijarah",
          faceValue: 100000000, expectedYield: 8.75, maturityDate: "2030-06-15",
          payoutFrequency: "Semi-Annually", holdingStatus: "Active" },
        { ...base(2, "Approved"), certificateNo: "SK-2025-0904", sukukType: "Sukuk Al-Mudarabah",
          faceValue: 50000000, expectedYield: 9.10, maturityDate: "2028-12-31",
          payoutFrequency: "Quarterly", holdingStatus: "Active" },
      ];
    case "murabaha":
      return [
        { ...base(1, "Approved"), reference: "MB-2025-0104", facilityNo: "FAC-MUR-8839 — Globex Raw Material Limit",
          vendorName: "Steel-Works Bangladesh", orderValue: 12500000, markupRate: 9.5,
          repaymentTenure: "6 Months", goodsDescription: "High-grade industrial steel sheets and rebars.",
          proformaInvoice: "invoice-steel-4910.pdf" },
        { ...base(2, "Pending"), reference: "MB-2025-0109", facilityNo: "FAC-MUR-8839 — Globex Raw Material Limit",
          vendorName: "Chemical-Ind BDT", orderValue: 4500000, markupRate: 9.5,
          repaymentTenure: "3 Months", goodsDescription: "Industrial solvents and binding catalysts.",
          proformaInvoice: "invoice-chem-3392.pdf" },
      ];
    case "zakat":
      return [
        { ...base(1, "Approved"), reference: "ZK-2025-0012", calcMethod: "Asset-Based (2.5%)",
          totalAssets: 400000000, deductibleLiabilities: 150000000, netZakatable: 250000000,
          calculatedZakat: 6250000, payoutAccount: "0123100001 — SJIBL Current",
          beneficiaryFund: "SJIBL Corporate Zakat Fund", amountToPay: 6250000,
          remarks: "Annual corporate Zakat settlement." },
        { ...base(2, "Pending"), reference: "ZK-2025-0015", calcMethod: "Asset-Based (2.5%)",
          totalAssets: 80000000, deductibleLiabilities: 20000000, netZakatable: 60000000,
          calculatedZakat: 1500000, payoutAccount: "0123100001 — SJIBL Current",
          beneficiaryFund: "Anjuman Mufidul Islam Zakat Fund", amountToPay: 1500000,
          remarks: "Special Ramadan CSR disbursement." },
      ];
    default: {
      const schema = getSchema(slug);
      return [1, 2, 3].map((i) => {
        const row: Record = { ...base(i, ["Approved", "Pending", "Rejected"][i % 3]) };
        for (const f of schema.fields) {
          if (f.type === "amount" || f.type === "number") row[f.name] = (i * 12500).toString();
          else if (f.type === "date") row[f.name] = dt(now - i * day);
          else row[f.name] = `${f.label} #${i}`;
        }
        return row;
      });
    }
  }
}
