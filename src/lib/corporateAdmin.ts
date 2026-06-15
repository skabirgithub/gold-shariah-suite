export interface CorporateUser {
  id: string;
  username: string;
  displayName: string;
  role: "Maker" | "Checker" | "Approver" | "Corporate Admin";
  entity: string;
  email: string;
  dailyLimit: number;
  perTxnLimit: number;
  status: "Active" | "Suspended";
}

const INITIAL_USERS: CorporateUser[] = [
  {
    id: "USR-01",
    username: "tania.m",
    displayName: "Tania Mahmud",
    role: "Maker",
    entity: "Globex Industries Ltd",
    email: "tania@globex.bd",
    dailyLimit: 5000000,
    perTxnLimit: 1000000,
    status: "Active"
  },
  {
    id: "USR-02",
    username: "rashed.c",
    displayName: "Rashed Chowdhury",
    role: "Checker",
    entity: "Globex Industries Ltd",
    email: "rashed@globex.bd",
    dailyLimit: 20000000,
    perTxnLimit: 5000000,
    status: "Active"
  },
  {
    id: "USR-03",
    username: "akhtar.h",
    displayName: "Akhtar Hossain",
    role: "Approver",
    entity: "Globex Industries Ltd",
    email: "akhtar@globex.bd",
    dailyLimit: 50000000,
    perTxnLimit: 10000000,
    status: "Active"
  }
];

const STORAGE_KEYS = {
  USERS: "sjibl.admin.users"
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

export function getAdminUsers(): CorporateUser[] {
  return getStorage<CorporateUser[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
}

export function saveAdminUser(user: Partial<CorporateUser>): void {
  const users = getAdminUsers();
  const newUser: CorporateUser = {
    id: `USR-${Date.now().toString().slice(-4)}`,
    username: user.username || "new.user",
    displayName: user.displayName || "New Corporate Operator",
    role: user.role || "Maker",
    entity: "Globex Industries Ltd",
    email: user.email || "",
    dailyLimit: user.dailyLimit || 1000000,
    perTxnLimit: user.perTxnLimit || 200000,
    status: "Active"
  };
  users.push(newUser);
  setStorage(STORAGE_KEYS.USERS, users);
}

export function updateUserStatus(id: string, status: "Active" | "Suspended"): void {
  const users = getAdminUsers();
  const user = users.find(u => u.id === id);
  if (user) {
    user.status = status;
    setStorage(STORAGE_KEYS.USERS, users);
  }
}

export function updateUserLimits(id: string, daily: number, perTxn: number): void {
  const users = getAdminUsers();
  const user = users.find(u => u.id === id);
  if (user) {
    user.dailyLimit = daily;
    user.perTxnLimit = perTxn;
    setStorage(STORAGE_KEYS.USERS, users);
  }
}
