export interface CustomerProfile {
  companyName: string;
  corporateId: string;
  registrationNo: string;
  tinNo: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  operator: string;
  module: string;
  action: string;
  status: "Success" | "Failed";
  ipAddress: string;
}

const INITIAL_PROFILE: CustomerProfile = {
  companyName: "Globex Industries Ltd",
  corporateId: "GLB-8820",
  registrationNo: "TRD-189281-2024",
  tinNo: "1892-1102-1829",
  email: "treasury@globex.bd",
  phone: "+880-2-982881",
  address: "House 42, Road 11, Banani, Dhaka-1213, Bangladesh",
  contactPerson: "Rashed Chowdhury (Treasurer)"
};

const INITIAL_LOGS: ActivityLog[] = [
  {
    id: "LOG-9001",
    timestamp: "2026-06-15T09:24:12Z",
    operator: "rashed.c",
    module: "Fund Transfer",
    action: "RTGS payment FT-1001 of BDT 4,500,000 Checker Authorized",
    status: "Success",
    ipAddress: "192.168.1.45"
  },
  {
    id: "LOG-9002",
    timestamp: "2026-06-15T08:12:05Z",
    operator: "tania.m",
    module: "Bulk Transfer",
    action: "Bulk Transfer batch payroll-aug.csv Maker Uploaded",
    status: "Success",
    ipAddress: "192.168.1.47"
  },
  {
    id: "LOG-9003",
    timestamp: "2026-06-15T07:44:11Z",
    operator: "rashed.c",
    module: "Corporate Admin",
    action: "Entitlement daily limits updated for @tania.m",
    status: "Success",
    ipAddress: "192.168.1.45"
  },
  {
    id: "LOG-9004",
    timestamp: "2026-06-14T15:20:00Z",
    operator: "rashed.c",
    module: "Services",
    action: "Cheque Leaf 100203 stop-payment registered",
    status: "Success",
    ipAddress: "192.168.1.45"
  },
  {
    id: "LOG-9005",
    timestamp: "2026-06-14T11:05:33Z",
    operator: "tania.m",
    module: "Security",
    action: "Sign-in attempt failed: invalid credentials",
    status: "Failed",
    ipAddress: "192.168.1.47"
  }
];

const STORAGE_KEYS = {
  PROFILE: "sjibl.profile.customer",
  LOGS: "sjibl.profile.logs"
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

export function getProfile(): CustomerProfile {
  return getStorage<CustomerProfile>(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
}

export function updateProfileRequest(updated: Partial<CustomerProfile>): void {
  const current = getProfile();
  const next = { ...current, ...updated };
  setStorage(STORAGE_KEYS.PROFILE, next);
}

export function getActivityLogs(): ActivityLog[] {
  return getStorage<ActivityLog[]>(STORAGE_KEYS.LOGS, INITIAL_LOGS);
}

export function logActivity(operator: string, module: string, action: string, status: "Success" | "Failed"): void {
  const list = getActivityLogs();
  const log: ActivityLog = {
    id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString(),
    operator,
    module,
    action,
    status,
    ipAddress: "192.168.1.45"
  };
  list.unshift(log);
  setStorage(STORAGE_KEYS.LOGS, list);
}

export function changePassword(username: string): void {
  // Mock action, log it
  logActivity(username, "Security", "Sign-in password updated successfully", "Success");
}
