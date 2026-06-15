export interface CorporateCard {
  id: string;
  cardNumber: string;
  cardholderName: string;
  cardType: "Visa Corporate Gold" | "Mastercard Corporate Platinum";
  limitAmount: number;
  outstandingAmount: number;
  availableLimit: number;
  dueDate: string;
  minDue: number;
  status: "Active" | "Blocked" | "Awaiting Tag";
}

export interface CardTransaction {
  id: string;
  cardNumber: string;
  date: string;
  merchant: string;
  amount: number;
  currency: string;
  status: "Billed" | "Unbilled";
  category: string;
}

const INITIAL_CARDS: CorporateCard[] = [
  {
    id: "CRD-01",
    cardNumber: "4521-XXXX-XXXX-8830",
    cardholderName: "Mohammad Rashed (CEO)",
    cardType: "Visa Corporate Gold",
    limitAmount: 1000000,
    outstandingAmount: 245000,
    availableLimit: 755000,
    dueDate: "2026-06-25",
    minDue: 12250,
    status: "Active"
  },
  {
    id: "CRD-02",
    cardNumber: "4521-XXXX-XXXX-1104",
    cardholderName: "Tania Mahmud (CFO)",
    cardType: "Mastercard Corporate Platinum",
    limitAmount: 1500000,
    outstandingAmount: 485000,
    availableLimit: 1015000,
    dueDate: "2026-06-25",
    minDue: 24250,
    status: "Active"
  }
];

const INITIAL_TRANSACTIONS: CardTransaction[] = [
  // Card 1 Transactions
  {
    id: "TX-CC-901",
    cardNumber: "4521-XXXX-XXXX-8830",
    date: "2026-06-14",
    merchant: "AWS Cloud Services",
    amount: 1250,
    currency: "USD",
    status: "Unbilled",
    category: "Software & SaaS"
  },
  {
    id: "TX-CC-902",
    cardNumber: "4521-XXXX-XXXX-8830",
    date: "2026-06-12",
    merchant: "Radisson Blu Dhaka",
    amount: 45000,
    currency: "BDT",
    status: "Unbilled",
    category: "Travel & Lodging"
  },
  {
    id: "TX-CC-903",
    cardNumber: "4521-XXXX-XXXX-8830",
    date: "2026-06-10",
    merchant: "Chevron Fuel Station",
    amount: 8500,
    currency: "BDT",
    status: "Billed",
    category: "Automotive & Fuel"
  },
  {
    id: "TX-CC-904",
    cardNumber: "4521-XXXX-XXXX-8830",
    date: "2026-06-05",
    merchant: "Biman Bangladesh Airlines",
    amount: 128000,
    currency: "BDT",
    status: "Billed",
    category: "Travel & Lodging"
  },
  {
    id: "TX-CC-905",
    cardNumber: "4521-XXXX-XXXX-8830",
    date: "2026-06-01",
    merchant: "Star Cineplex",
    amount: 3500,
    currency: "BDT",
    status: "Billed",
    category: "Entertainment"
  },

  // Card 2 Transactions
  {
    id: "TX-CC-911",
    cardNumber: "4521-XXXX-XXXX-1104",
    date: "2026-06-15",
    merchant: "Microsoft 365 Licensing",
    amount: 840,
    currency: "USD",
    status: "Unbilled",
    category: "Software & SaaS"
  },
  {
    id: "TX-CC-912",
    cardNumber: "4521-XXXX-XXXX-1104",
    date: "2026-06-14",
    merchant: "Paltan Stationery Depot",
    amount: 14500,
    currency: "BDT",
    status: "Unbilled",
    category: "Office Supplies"
  },
  {
    id: "TX-CC-913",
    cardNumber: "4521-XXXX-XXXX-1104",
    date: "2026-06-11",
    merchant: "Zoom Video Comm",
    amount: 150,
    currency: "USD",
    status: "Billed",
    category: "Software & SaaS"
  },
  {
    id: "TX-CC-914",
    cardNumber: "4521-XXXX-XXXX-1104",
    date: "2026-06-08",
    merchant: "Westin Hotels Dhaka",
    amount: 98000,
    currency: "BDT",
    status: "Billed",
    category: "Travel & Lodging"
  },
  {
    id: "TX-CC-915",
    cardNumber: "4521-XXXX-XXXX-1104",
    date: "2026-06-02",
    merchant: "Uber Bangladesh",
    amount: 4200,
    currency: "BDT",
    status: "Billed",
    category: "Transport"
  }
];

const STORAGE_KEYS = {
  CARDS: "sjibl.cards.corporate",
  TRANSACTIONS: "sjibl.cards.transactions"
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

export function getCards(): CorporateCard[] {
  return getStorage<CorporateCard[]>(STORAGE_KEYS.CARDS, INITIAL_CARDS);
}

export function tagCard(newCard: Partial<CorporateCard>): void {
  const cards = getCards();
  const card: CorporateCard = {
    id: `CRD-${Date.now().toString().slice(-4)}`,
    cardNumber: newCard.cardNumber || "4521-XXXX-XXXX-XXXX",
    cardholderName: newCard.cardholderName || "Unknown Officer",
    cardType: newCard.cardType || "Visa Corporate Gold",
    limitAmount: newCard.limitAmount || 500000,
    outstandingAmount: 0,
    availableLimit: newCard.limitAmount || 500000,
    dueDate: newCard.dueDate || new Date(Date.now() + 15 * 86400000).toISOString().split("T")[0],
    minDue: 0,
    status: "Active"
  };
  cards.push(card);
  setStorage(STORAGE_KEYS.CARDS, cards);
}

export function getTransactions(): CardTransaction[] {
  return getStorage<CardTransaction[]>(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
}

export function getTransactionsForCard(cardNumber: string): CardTransaction[] {
  return getTransactions().filter(t => t.cardNumber === cardNumber);
}

export function getUnbilledTransactions(cardNumber: string): CardTransaction[] {
  return getTransactions().filter(t => t.cardNumber === cardNumber && t.status === "Unbilled");
}

export function payCardBill(cardNumber: string, amount: number): void {
  const cards = getCards();
  const card = cards.find(c => c.cardNumber === cardNumber);
  if (card) {
    card.outstandingAmount = Math.max(0, card.outstandingAmount - amount);
    card.availableLimit = card.limitAmount - card.outstandingAmount;
    card.minDue = Math.max(0, card.minDue - amount);
    setStorage(STORAGE_KEYS.CARDS, cards);

    // Append payment as transaction
    const txs = getTransactions();
    const payTx: CardTransaction = {
      id: `TX-PAY-${Date.now().toString().slice(-4)}`,
      cardNumber: cardNumber,
      date: new Date().toISOString().split("T")[0],
      merchant: "SJIBL Treasury Bill Pay",
      amount: -amount,
      currency: "BDT",
      status: "Unbilled",
      category: "Payment"
    };
    txs.unshift(payTx);
    setStorage(STORAGE_KEYS.TRANSACTIONS, txs);
  }
}
