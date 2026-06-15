export interface SupportTicket {
  id: string;
  ticket: string;
  category: "Account Statement" | "Cheque Book" | "Trade LC" | "User Limits" | "Technical Support" | "Other";
  subject: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Pending Approval" | "Open" | "Processing" | "Resolved" | "Closed";
  raisedBy: string;
  date: string;
  scope: "Company" | "User";
  remarks?: string;
}

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: "TCK-01",
    ticket: "TCK-7741",
    category: "Account Statement",
    subject: "Cannot download statement PDF",
    description: "Exporting Paltan Branch Current Account statements to PDF times out. CSV works fine.",
    priority: "Medium",
    status: "Processing",
    raisedBy: "tania.m",
    date: "2026-06-14",
    scope: "User"
  },
  {
    id: "TCK-02",
    ticket: "TCK-7742",
    category: "Cheque Book",
    subject: "Cheque Book Request - 50 Leaves",
    description: "Urgent physical current account cheque book replenishment for Motijheel branch operations.",
    priority: "High",
    status: "Open",
    raisedBy: "rashed.c",
    date: "2026-06-13",
    scope: "Company",
    remarks: "Maker submitted. Awaiting checker verification."
  },
  {
    id: "TCK-03",
    ticket: "TCK-7743",
    category: "User Limits",
    subject: "Temporary Daily limit enhancement request",
    description: "Enhancement of daily fund transfer limit to BDT 100,000,000 for import payment settlements.",
    priority: "Critical",
    status: "Resolved",
    raisedBy: "rashed.c",
    date: "2026-06-10",
    scope: "Company",
    remarks: "Limit temporarily enhanced for 72 hours by treasury branch admin."
  }
];

const STORAGE_KEYS = {
  TICKETS: "sjibl.services.tickets"
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

export function getTickets(): SupportTicket[] {
  return getStorage<SupportTicket[]>(STORAGE_KEYS.TICKETS, INITIAL_TICKETS);
}

export function saveTicket(ticket: Partial<SupportTicket>): void {
  const tickets = getTickets();
  const newTicket: SupportTicket = {
    id: `TCK-${Date.now().toString().slice(-4)}`,
    ticket: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
    category: ticket.category || "Other",
    subject: ticket.subject || "General Support Request",
    description: ticket.description || "",
    priority: ticket.priority || "Low",
    status: "Open",
    raisedBy: ticket.raisedBy || "tania.m",
    date: new Date().toISOString().split("T")[0],
    scope: ticket.scope || "User"
  };
  tickets.unshift(newTicket);
  setStorage(STORAGE_KEYS.TICKETS, tickets);
}

export function resolveTicket(id: string, adminRemarks?: string): void {
  const tickets = getTickets();
  const ticket = tickets.find(t => t.id === id);
  if (ticket) {
    ticket.status = "Resolved";
    if (adminRemarks) ticket.remarks = adminRemarks;
    setStorage(STORAGE_KEYS.TICKETS, tickets);
  }
}

export function closeTicket(id: string): void {
  const tickets = getTickets();
  const ticket = tickets.find(t => t.id === id);
  if (ticket) {
    ticket.status = "Closed";
    setStorage(STORAGE_KEYS.TICKETS, tickets);
  }
}
