// Lightweight client-side "session" for demo only — no real auth.
const KEY = "sjibl_ctb_session";

export type SessionUser = {
  username: string;
  displayName: string;
  role: "Maker" | "Checker" | "Approver" | "Admin" | "Viewer";
  entity: string;
  loggedInAt: number;
};

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch { return null; }
}

export function setSession(s: SessionUser) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function clearSession() {
  localStorage.removeItem(KEY);
}
