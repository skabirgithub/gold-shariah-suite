export interface PaymentInstruction {
  id: string;
  referenceNo: string;
  instrumentType: "Pay Order" | "Demand Draft" | "Corporate Cheque";
  fromAccount: string;
  payeeName: string;
  amount: number;
  date: string;
  status: "Pending" | "Printed" | "Dispatched" | "Cancelled";
  printerName?: string;
  designName?: string;
}

export interface InstrumentDesign {
  id: string;
  name: string;
  templateType: "Pay Order" | "Demand Draft" | "Corporate Cheque";
  fontFamily: string;
  borderColor: string;
  logoWatermark: string;
  payeeX: number;
  payeeY: number;
  amountX: number;
  amountY: number;
  dateX: number;
  dateY: number;
  signX: number;
  signY: number;
}

export interface PrinterProfile {
  id: string;
  name: string;
  status: "Online" | "Offline";
  locationType: "Local" | "Remote Branch";
  branchName?: string;
}

const INITIAL_INSTRUCTIONS: PaymentInstruction[] = [
  {
    id: "PAY-1001",
    referenceNo: "PIN-880291",
    instrumentType: "Pay Order",
    fromAccount: "0123100001 — SJIBL Current",
    payeeName: "Bata Shoes BD Ltd",
    amount: 1500000,
    date: "2026-06-14",
    status: "Pending"
  },
  {
    id: "PAY-1002",
    referenceNo: "PIN-880292",
    instrumentType: "Corporate Cheque",
    fromAccount: "0123100002 — SJIBL Mudaraba",
    payeeName: "Apex Footwear Ltd",
    amount: 850000,
    date: "2026-06-13",
    status: "Printed",
    printerName: "Motijheel Branch clearing printer",
    designName: "SJIBL Classic Cheque Design"
  },
  {
    id: "PAY-1003",
    referenceNo: "PIN-880293",
    instrumentType: "Demand Draft",
    fromAccount: "0123100001 — SJIBL Current",
    payeeName: "Square Pharmaceuticals PLC",
    amount: 4200000,
    date: "2026-06-12",
    status: "Dispatched",
    printerName: "HQ Treasury Printer 1",
    designName: "Corporate Ornate DD Template"
  }
];

const DEFAULT_DESIGNS: InstrumentDesign[] = [
  {
    id: "DES-01",
    name: "SJIBL Classic Cheque Design",
    templateType: "Corporate Cheque",
    fontFamily: "font-mono",
    borderColor: "border-gold",
    logoWatermark: "Classic SJIBL Crest",
    payeeX: 45,
    payeeY: 35,
    amountX: 75,
    amountY: 48,
    dateX: 80,
    dateY: 12,
    signX: 70,
    signY: 75
  },
  {
    id: "DES-02",
    name: "Corporate Ornate DD Template",
    templateType: "Demand Draft",
    fontFamily: "font-serif",
    borderColor: "border-navy",
    logoWatermark: "Standard Geometric Tint",
    payeeX: 40,
    payeeY: 40,
    amountX: 70,
    amountY: 52,
    dateX: 82,
    dateY: 15,
    signX: 68,
    signY: 80
  }
];

const PRINTERS: PrinterProfile[] = [
  { id: "PRN-01", name: "HQ Treasury Printer 1", status: "Online", locationType: "Local" },
  { id: "PRN-02", name: "Motijheel Branch clearing printer", status: "Online", locationType: "Remote Branch", branchName: "Motijheel" },
  { id: "PRN-03", name: "Gulshan Islamic Banking printer", status: "Online", locationType: "Remote Branch", branchName: "Gulshan" },
  { id: "PRN-04", name: "Chittagong Main Branch printer", status: "Offline", locationType: "Remote Branch", branchName: "Chittagong" }
];

const STORAGE_KEYS = {
  INSTRUCTIONS: "sjibl.payments.instructions",
  DESIGNS: "sjibl.payments.designs"
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

export function getInstructions(): PaymentInstruction[] {
  return getStorage<PaymentInstruction[]>(STORAGE_KEYS.INSTRUCTIONS, INITIAL_INSTRUCTIONS);
}

export function saveInstruction(inst: PaymentInstruction): void {
  const list = getInstructions();
  list.unshift(inst);
  setStorage(STORAGE_KEYS.INSTRUCTIONS, list);
}

export function updateInstructionStatus(id: string, status: "Pending" | "Printed" | "Dispatched" | "Cancelled", printerName?: string, designName?: string): void {
  const list = getInstructions();
  const inst = list.find(i => i.id === id);
  if (inst) {
    inst.status = status;
    if (printerName) inst.printerName = printerName;
    if (designName) inst.designName = designName;
    setStorage(STORAGE_KEYS.INSTRUCTIONS, list);
  }
}

export function getDesigns(): InstrumentDesign[] {
  return getStorage<InstrumentDesign[]>(STORAGE_KEYS.DESIGNS, DEFAULT_DESIGNS);
}

export function saveDesign(des: InstrumentDesign): void {
  const list = getDesigns();
  const idx = list.findIndex(d => d.id === des.id);
  if (idx !== -1) {
    list[idx] = des;
  } else {
    list.push(des);
  }
  setStorage(STORAGE_KEYS.DESIGNS, list);
}

export function getPrinters(): PrinterProfile[] {
  return PRINTERS;
}
