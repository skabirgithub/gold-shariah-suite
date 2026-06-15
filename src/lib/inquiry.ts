export interface ExchangeRate {
  pair: string;
  baseCcy: string;
  quoteCcy: string;
  buyingRate: number;
  sellingRate: number;
  change: string;
}

export interface QuotedRateRequest {
  id: string;
  pair: string;
  amount: number;
  side: "Buy" | "Sell";
  requestedRate: number;
  offeredRate?: number;
  status: "Pending Quote" | "Quoted" | "Accepted" | "Expired";
  date: string;
}

const INITIAL_RATES: ExchangeRate[] = [
  { pair: "USD/BDT", baseCcy: "USD", quoteCcy: "BDT", buyingRate: 117.50, sellingRate: 118.90, change: "+0.15%" },
  { pair: "EUR/BDT", baseCcy: "EUR", quoteCcy: "BDT", buyingRate: 126.30, sellingRate: 127.80, change: "-0.22%" },
  { pair: "GBP/BDT", baseCcy: "GBP", quoteCcy: "BDT", buyingRate: 148.90, sellingRate: 150.50, change: "+0.45%" },
  { pair: "SAR/BDT", baseCcy: "SAR", quoteCcy: "BDT", buyingRate: 31.30, sellingRate: 31.90, change: "0.00%" },
  { pair: "AED/BDT", baseCcy: "AED", quoteCcy: "BDT", buyingRate: 31.95, sellingRate: 32.50, change: "+0.05%" }
];

const INITIAL_QUOTES: QuotedRateRequest[] = [
  {
    id: "RFQ-1020",
    pair: "USD/BDT",
    amount: 150000,
    side: "Buy",
    requestedRate: 117.20,
    offeredRate: 117.45,
    status: "Accepted",
    date: "2026-06-14"
  },
  {
    id: "RFQ-1021",
    pair: "EUR/BDT",
    amount: 80000,
    side: "Buy",
    requestedRate: 126.10,
    offeredRate: 126.25,
    status: "Quoted",
    date: "2026-06-15"
  },
  {
    id: "RFQ-1022",
    pair: "USD/BDT",
    amount: 500000,
    side: "Buy",
    requestedRate: 117.00,
    status: "Pending Quote",
    date: "2026-06-15"
  }
];

const STORAGE_KEYS = {
  RATES: "sjibl.inquiry.rates",
  QUOTES: "sjibl.inquiry.quotes"
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

export function getExchangeRates(): ExchangeRate[] {
  return getStorage<ExchangeRate[]>(STORAGE_KEYS.RATES, INITIAL_RATES);
}

export function getQuotedRequests(): QuotedRateRequest[] {
  return getStorage<QuotedRateRequest[]>(STORAGE_KEYS.QUOTES, INITIAL_QUOTES);
}

export function postQuoteRequest(pair: string, amount: number, side: "Buy" | "Sell", requestedRate: number): void {
  const list = getQuotedRequests();
  const req: QuotedRateRequest = {
    id: `RFQ-${Math.floor(1000 + Math.random() * 9000)}`,
    pair,
    amount,
    side,
    requestedRate,
    status: "Pending Quote",
    date: new Date().toISOString().split("T")[0]
  };
  list.unshift(req);
  setStorage(STORAGE_KEYS.QUOTES, list);
}

export function updateQuoteStatus(id: string, status: "Accepted" | "Expired", offeredRate?: number): void {
  const list = getQuotedRequests();
  const req = list.find(r => r.id === id);
  if (req) {
    req.status = status;
    if (offeredRate) req.offeredRate = offeredRate;
    setStorage(STORAGE_KEYS.QUOTES, list);
  }
}
