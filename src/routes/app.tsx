import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MODULES, MODULE_GROUPS } from "@/lib/modules";
import { clearSession, getSession, type SessionUser } from "@/lib/session";
import { list } from "@/lib/moduleStore";
import {
  Bell, Search, LogOut, ChevronDown, Menu, Shield, FlaskConical,
  ChevronLeft, Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  component: AppShell,
});

function AppShell() {
  const navigate = useNavigate();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sandbox, setSandbox] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(MODULE_GROUPS.map(g => [g.id, true])),
  );
  const [seconds, setSeconds] = useState(15 * 60);
  const [pendingCount, setPendingCount] = useState(0);

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const updateCount = () => {
      try {
        const approvals = list("approval");
        const count = approvals.filter((a) => a.status === "Pending").length;
        setPendingCount(count);
      } catch { /* ignore */ }
    };
    updateCount();
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const s = getSession();
    if (!s) { navigate({ to: "/" }); return; }
    setUser(s);
  }, [navigate]);

  useEffect(() => {
    const t = setInterval(() => setSeconds((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  function signOut() {
    clearSession();
    navigate({ to: "/" });
  }

  if (!user) return null;

  const mm = Math.floor(seconds / 60).toString().padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "bg-sidebar text-sidebar-foreground flex-col border-r border-sidebar-border transition-all duration-200",
        "fixed lg:static inset-y-0 left-0 z-40",
        mobileOpen ? "flex" : "hidden lg:flex",
        collapsed ? "w-16" : "w-72",
      )}>
        <div className="h-16 flex items-center gap-3 px-4 border-b border-sidebar-border shrink-0">
          <div className="w-9 h-9 rounded-md gold-gradient grid place-items-center text-navy font-display font-bold shrink-0">S</div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-display text-sm leading-tight truncate">SJIBL CTB Portal</div>
              <div className="text-[10px] uppercase tracking-widest text-gold">Corporate Banking</div>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {MODULE_GROUPS.map((group) => {
            const items = MODULES.filter((m) => m.group === group.id);
            if (items.length === 0) return null;
            const open = openGroups[group.id];
            return (
              <div key={group.id}>
                {!collapsed && (
                  <button
                    onClick={() => setOpenGroups((s) => ({ ...s, [group.id]: !s[group.id] }))}
                    className="w-full px-3 py-1 flex items-center justify-between text-[10px] uppercase tracking-widest text-sidebar-foreground/50 hover:text-sidebar-foreground"
                  >
                    {group.label}
                    <ChevronDown className={cn("w-3 h-3 transition-transform", !open && "-rotate-90")} />
                  </button>
                )}
                {(open || collapsed) && (
                  <div className="mt-1 space-y-0.5">
                    {items.map((m) => {
                      const to = m.slug === "dashboard" ? "/app" : `/app/${m.slug}`;
                      const active = pathname === to || (m.slug !== "dashboard" && pathname.startsWith(to));
                      return (
                        <Link
                          key={m.slug}
                          to={to}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            active && "bg-sidebar-accent text-sidebar-primary border-l-2 border-sidebar-primary pl-[10px]",
                            collapsed && "justify-center px-2",
                          )}
                          title={collapsed ? m.title : undefined}
                        >
                          <m.icon className="w-4 h-4 shrink-0" />
                          {!collapsed && <span className="truncate flex-1">{m.short}</span>}
                          {!collapsed && m.slug === "approval" && pendingCount > 0 && (
                            <span className="ml-auto min-w-[18px] h-[18px] rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold grid place-items-center px-1">
                              {pendingCount}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {!collapsed && pendingCount > 0 && (
          <Link
            to="/app/approval"
            className="mx-2 mb-2 flex items-start gap-2 rounded-md bg-destructive/10 border border-destructive/20 p-3 text-xs hover:bg-destructive/15 transition-colors"
          >
            <Bell className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="font-semibold text-destructive leading-tight">{pendingCount} Pending Authorization{pendingCount > 1 ? "s" : ""}</div>
              <div className="text-sidebar-foreground/60 text-[10px] mt-0.5 leading-normal">Click to review and sign</div>
            </div>
          </Link>
        )}

        <div className="px-2 py-3 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="hidden lg:flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-xs text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <ChevronLeft className={cn("w-3.5 h-3.5 transition-transform", collapsed && "rotate-180")} />
            {!collapsed && "Collapse"}
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-card border-b border-border flex items-center gap-3 px-4 lg:px-6 sticky top-0 z-20">
          <button className="lg:hidden p-2 -ml-2" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative flex-1 max-w-xl hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search accounts, beneficiaries, transactions…" className="pl-9 bg-muted/40 border-transparent focus-visible:bg-card" />
          </div>

          <div className="flex-1 md:hidden" />

          {sandbox && (
            <Badge variant="outline" className="hidden sm:flex border-warning text-warning gap-1">
              <FlaskConical className="w-3 h-3" /> Sandbox
            </Badge>
          )}

          <button onClick={() => setSandbox(v => !v)} className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded">
            <FlaskConical className="w-3.5 h-3.5" /> {sandbox ? "Live" : "Test"}
          </button>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground px-2 py-1 rounded bg-muted/50">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono">{mm}:{ss}</span>
          </div>

          <button className="relative p-2 rounded hover:bg-muted" onClick={() => navigate({ to: "/app/approval" })}>
            <Bell className="w-5 h-5" />
            {pendingCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] grid place-items-center">
                {pendingCount}
              </span>
            )}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-md hover:bg-muted">
                <div className="w-8 h-8 rounded-full navy-gradient grid place-items-center text-navy-foreground text-xs font-semibold">
                  {user.displayName.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-medium leading-tight">{user.displayName}</div>
                  <div className="text-[10px] text-muted-foreground">{user.role} · {user.entity}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="text-xs">Signed in as</div>
                <div className="text-sm font-medium">{user.username}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/app/profile">Profile management</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/app/approval">Pending approvals</Link></DropdownMenuItem>
              <DropdownMenuItem><Shield className="w-4 h-4 mr-2" />Activity log</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-4 lg:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>

        <footer className="px-6 py-4 text-xs text-muted-foreground border-t border-border flex flex-wrap items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Shahjalal Islami Bank PLC · Shariah-compliant corporate banking</div>
          <div className="flex items-center gap-2"><Shield className="w-3 h-3 text-success" /> All transactions encrypted end-to-end</div>
        </footer>
      </div>
    </div>
  );
}
