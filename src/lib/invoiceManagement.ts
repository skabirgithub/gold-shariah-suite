export interface CollectionInstrument {
  type: "Cash" | "Cheque" | "Pay Order" | "Demand Draft" | "Online Transfer";
  referenceNo: string;
  amount: number;
  bankName?: string;
  date: string;
}

export interface InvoicePayment {
  date: string;
  amount: number;
  instrumentType: string;
  instrumentRef: string;
}

export interface Invoice {
  id: string;
  customerName: string;
  customerEmail?: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  collectedAmount: number;
  status: "Fully Paid" | "Partially Paid" | "Unpaid";
  payments: InvoicePayment[];
}

const INITIAL_INVOICES: Invoice[] = [
  {
    id: "INV-2026-901",
    customerName: "Bata Shoes BD Ltd",
    customerEmail: "finance@batabd.com",
    issueDate: "2026-06-01",
    dueDate: "2026-06-20",
    totalAmount: 1500000,
    collectedAmount: 0,
    status: "Unpaid",
    payments: []
  },
  {
    id: "INV-2026-902",
    customerName: "Square Pharmaceuticals PLC",
    customerEmail: "accounts@squarepharma.com",
    issueDate: "2026-06-03",
    dueDate: "2026-06-25",
    totalAmount: 8000000,
    collectedAmount: 2500000,
    status: "Partially Paid",
    payments: [
      { date: "2026-06-10", amount: 2500000, instrumentType: "Cheque", instrumentRef: "CHQ-10029" }
    ]
  },
  {
    id: "INV-2026-903",
    customerName: "Abul Khair Steel Ltd",
    customerEmail: "billing@abulkhair.com",
    issueDate: "2026-06-05",
    dueDate: "2026-06-28",
    totalAmount: 12000000,
    collectedAmount: 12000000,
    status: "Fully Paid",
    payments: [
      { date: "2026-06-12", amount: 12000000, instrumentType: "Online Transfer", instrumentRef: "FT-99231" }
    ]
  },
  {
    id: "INV-2026-904",
    customerName: "ACI Logistics (Shwapno)",
    customerEmail: "treasury@shwapno.com",
    issueDate: "2026-06-07",
    dueDate: "2026-06-28",
    totalAmount: 4500000,
    collectedAmount: 0,
    status: "Unpaid",
    payments: []
  },
  {
    id: "INV-2026-905",
    customerName: "Karnaphuli Fertilizer Co.",
    customerEmail: "accounts@kafco.org",
    issueDate: "2026-06-08",
    dueDate: "2026-06-30",
    totalAmount: 6500000,
    collectedAmount: 0,
    status: "Unpaid",
    payments: []
  }
];

const STORAGE_KEYS = {
  INVOICES: "sjibl.invoice.data"
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

export function getInvoices(): Invoice[] {
  return getStorage<Invoice[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
}

export function saveInvoice(inv: Invoice): void {
  const list = getInvoices();
  list.unshift(inv);
  setStorage(STORAGE_KEYS.INVOICES, list);
}

// Case A: Pay a single invoice with multiple instruments
export function postSingleInvoiceMultiInstruments(invoiceId: string, instruments: CollectionInstrument[]): void {
  const invoices = getInvoices();
  const invoice = invoices.find(i => i.id === invoiceId);
  if (!invoice) return;

  instruments.forEach(inst => {
    invoice.collectedAmount += inst.amount;
    invoice.payments.unshift({
      date: inst.date || new Date().toISOString().split("T")[0],
      amount: inst.amount,
      instrumentType: inst.type,
      instrumentRef: inst.referenceNo
    });
  });

  if (invoice.collectedAmount >= invoice.totalAmount) {
    invoice.status = "Fully Paid";
  } else if (invoice.collectedAmount > 0) {
    invoice.status = "Partially Paid";
  }

  setStorage(STORAGE_KEYS.INVOICES, invoices);

  // Update real-time shadow adjustments in cashManagement
  const totalPaid = instruments.reduce((sum, inst) => sum + inst.amount, 0);
  const { adjustShadowBalance } = require("./cashManagement") as typeof import("./cashManagement");
  adjustShadowBalance(totalPaid);
}

// Case B: Distribute a single large instrument across multiple invoices
export function postMultiInvoicesSingleInstrument(allocations: { invoiceId: string; amountAllocated: number }[], instrument: CollectionInstrument): void {
  const invoices = getInvoices();

  allocations.forEach(alloc => {
    const invoice = invoices.find(i => i.id === alloc.invoiceId);
    if (!invoice) return;

    invoice.collectedAmount += alloc.amountAllocated;
    invoice.payments.unshift({
      date: instrument.date || new Date().toISOString().split("T")[0],
      amount: alloc.amountAllocated,
      instrumentType: instrument.type,
      instrumentRef: `${instrument.referenceNo} (Allocated)`
    });

    if (invoice.collectedAmount >= invoice.totalAmount) {
      invoice.status = "Fully Paid";
    } else if (invoice.collectedAmount > 0) {
      invoice.status = "Partially Paid";
    }
  });

  setStorage(STORAGE_KEYS.INVOICES, invoices);

  // Update shadow balances in cashManagement
  const { adjustShadowBalance } = require("./cashManagement") as typeof import("./cashManagement");
  adjustShadowBalance(instrument.amount);
}
