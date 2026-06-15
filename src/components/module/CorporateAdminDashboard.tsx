import React, { useState, useMemo } from "react";
import {
  Users, Search, Plus, Check, X, Shield, ShieldAlert, ShieldCheck, Mail,
  Activity, Sliders, AlertTriangle, Key, Trash2, Edit2, CheckCircle2,
  SlidersHorizontal
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  getAdminUsers,
  saveAdminUser,
  updateUserStatus,
  updateUserLimits,
  CorporateUser
} from "@/lib/corporateAdmin";

export function CorporateAdminDashboard() {
  const [activeTab, setActiveTab] = useState("entitlements");
  const [updateTick, setUpdateTick] = useState(0);
  const triggerUpdate = () => setUpdateTick(prev => prev + 1);

  // Load admin users
  const users = useMemo(() => getAdminUsers(), [updateTick]);

  // Aggregate stats
  const totalUsers = useMemo(() => users.length, [users]);
  const activeCount = useMemo(() => users.filter(u => u.status === "Active").length, [users]);
  const suspendedCount = useMemo(() => users.filter(u => u.status === "Suspended").length, [users]);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <a href="/app" className="hover:text-navy">Dashboard</a>
        <ChevronDownIcon className="w-3 h-3 -rotate-90 text-muted-foreground" />
        <span className="text-foreground font-semibold">Corporate Admin Panel</span>
      </nav>

      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
        <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Corporate Admin Workspace</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Manage corporate user accounts, activate or suspend credentials, and configure per-transaction and daily clearing limits.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-sm text-navy">
        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0">
            <Users className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Corporate Users</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {totalUsers} Operators
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Total onboarded roles</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 text-success grid place-items-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Active Status</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {activeCount} Active
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Entitlements active</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 text-destructive grid place-items-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Suspended Users</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {suspendedCount} Suspended
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Access tokens disabled</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Policy Entitlements</div>
            <div className="font-display text-base mt-1.5 text-navy font-bold font-sans">
              Maker-Checker Setup
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Dual-authorization mandated</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border w-full justify-start p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="entitlements" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Sliders className="w-3.5 h-3.5" /> User Entitlements & Limits
          </TabsTrigger>
          <TabsTrigger value="onboard" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Plus className="w-3.5 h-3.5" /> Onboard User
          </TabsTrigger>
        </TabsList>

        <TabsContent value="entitlements">
          <UserEntitlementsTab
            users={users}
            onTriggerUpdate={triggerUpdate}
          />
        </TabsContent>

        <TabsContent value="onboard">
          <OnboardUserTab
            onTriggerUpdate={triggerUpdate}
            onGoToEntitlements={() => setActiveTab("entitlements")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* =========================================================================
   TAB 1: USER ENTITLEMENTS & LIMIT CONTROLS
   ========================================================================= */
function UserEntitlementsTab({
  users,
  onTriggerUpdate
}: {
  users: CorporateUser[];
  onTriggerUpdate: () => void;
}) {
  const [search, setSearch] = useState("");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // States to hold currently edited limits
  const [editDaily, setEditDaily] = useState<number>(0);
  const [editPerTxn, setEditPerTxn] = useState<number>(0);

  const filtered = useMemo(() => {
    return users.filter(u =>
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleToggleStatus = (id: string, currentStatus: "Active" | "Suspended") => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
    updateUserStatus(id, nextStatus);
    toast.success(`User access set to ${nextStatus}.`);
    onTriggerUpdate();
  };

  const handleStartEdit = (user: CorporateUser) => {
    setEditingUserId(user.id);
    setEditDaily(user.dailyLimit);
    setEditPerTxn(user.perTxnLimit);
  };

  const handleSaveLimits = (id: string) => {
    if (editPerTxn > editDaily) {
      toast.error("Per-transaction limit cannot exceed daily transaction limit.");
      return;
    }
    updateUserLimits(id, editDaily, editPerTxn);
    toast.success("Operational clearing limits updated successfully.");
    setEditingUserId(null);
    onTriggerUpdate();
  };

  const roleBadge = (r: string) => {
    const map: Record<string, string> = {
      "Maker": "bg-sky-500/10 text-sky-600 border-sky-500/20",
      "Checker": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      "Approver": "bg-purple-500/10 text-purple-600 border-purple-500/20",
      "Corporate Admin": "bg-success/15 text-success border-success/30"
    };
    return <Badge className={`text-[10px] font-semibold ${map[r] || ""}`} variant="outline">{r}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Filtering */}
      <Card className="p-4 bg-card border border-border">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search operator name, role..."
            className="pl-9 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>

      {/* Grid List Table */}
      <Card className="border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Operator Details</TableHead>
              <TableHead>System Username</TableHead>
              <TableHead>Assigned Role</TableHead>
              <TableHead className="text-right">Per-Txn Limit (BDT)</TableHead>
              <TableHead className="text-right">Daily Limit (BDT)</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right pr-4">Entitlements / Limits Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(user => {
              const isEditing = editingUserId === user.id;
              return (
                <TableRow key={user.id} className="hover:bg-muted/10">
                  <TableCell className="pl-4">
                    <div className="font-semibold text-sm">{user.displayName}</div>
                    <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" /> {user.email}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs font-semibold text-navy">@{user.username}</TableCell>
                  <TableCell className="text-xs">{roleBadge(user.role)}</TableCell>

                  <TableCell className="text-right font-mono text-xs">
                    {isEditing ? (
                      <div className="space-y-1.5 inline-block text-left">
                        <Input
                          type="number"
                          className="h-8 text-xs font-mono text-right w-36"
                          value={editPerTxn}
                          onChange={(e) => setEditPerTxn(parseInt(e.target.value) || 0)}
                        />
                        <div className="text-[9px] text-muted-foreground">Adjust per-txn</div>
                      </div>
                    ) : (
                      <span className="font-bold text-navy">৳ {user.perTxnLimit.toLocaleString()}</span>
                    )}
                  </TableCell>

                  <TableCell className="text-right font-mono text-xs">
                    {isEditing ? (
                      <div className="space-y-1.5 inline-block text-left">
                        <Input
                          type="number"
                          className="h-8 text-xs font-mono text-right w-36"
                          value={editDaily}
                          onChange={(e) => setEditDaily(parseInt(e.target.value) || 0)}
                        />
                        <div className="text-[9px] text-muted-foreground">Adjust daily limit</div>
                      </div>
                    ) : (
                      <span className="font-bold text-navy">৳ {user.dailyLimit.toLocaleString()}</span>
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge className={`text-[10px] ${
                      user.status === "Active" ? "bg-success/15 text-success border-success/30" : "bg-destructive/15 text-destructive border-destructive/30"
                    }`} variant="outline">
                      {user.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right pr-4">
                    <div className="flex justify-end gap-1.5">
                      {isEditing ? (
                        <>
                          <Button
                            size="sm"
                            className="h-7 text-[10px] bg-success text-white hover:bg-success/90"
                            onClick={() => handleSaveLimits(user.id)}
                          >
                            Save Limits
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-[10px] text-muted-foreground hover:bg-muted"
                            onClick={() => setEditingUserId(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-[10px] text-navy hover:bg-navy/10 px-2"
                            onClick={() => handleStartEdit(user)}
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5 mr-1" /> Adjust Limits
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`h-7 text-[10px] px-2 ${
                              user.status === "Active" ? "text-destructive hover:bg-destructive/10" : "text-success hover:bg-success/10"
                            }`}
                            onClick={() => handleToggleStatus(user.id, user.status)}
                          >
                            {user.status === "Active" ? "Suspend Account" : "Activate Account"}
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

/* =========================================================================
   TAB 2: ONBOARD NEW USER
   ========================================================================= */
function OnboardUserTab({
  onTriggerUpdate,
  onGoToEntitlements
}: {
  onTriggerUpdate: () => void;
  onGoToEntitlements: () => void;
}) {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"Maker" | "Checker" | "Approver" | "Corporate Admin">("Maker");
  const [dailyLimit, setDailyLimit] = useState("");
  const [perTxnLimit, setPerTxnLimit] = useState("");

  const handleOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !username.trim() || !email.trim() || !dailyLimit || !perTxnLimit) {
      toast.error("Please fill in all onboard credentials.");
      return;
    }

    const daily = parseFloat(dailyLimit);
    const txn = parseFloat(perTxnLimit);
    if (txn > daily) {
      toast.error("Per-transaction limit cannot exceed daily transaction limit.");
      return;
    }

    saveAdminUser({
      displayName,
      username,
      email,
      role,
      dailyLimit: daily,
      perTxnLimit: txn
    });

    toast.success(`User Account successfully established. Verification email dispatched.`);
    onTriggerUpdate();
    onGoToEntitlements();

    // Reset Form
    setDisplayName("");
    setUsername("");
    setEmail("");
    setDailyLimit("");
    setPerTxnLimit("");
  };

  return (
    <Card className="border border-border max-w-xl">
      <CardHeader className="bg-muted/10 border-b border-border py-3">
        <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Onboard Corporate operator</CardTitle>
        <CardDescription className="text-[10px]">Invite and initialize limits for a new corporate user.</CardDescription>
      </CardHeader>
      <form onSubmit={handleOnboard}>
        <CardContent className="pt-4 space-y-4 text-xs text-navy">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="on-name">Full Display Name</Label>
              <Input
                id="on-name"
                placeholder="e.g. Akhtar Hossain"
                className="text-xs"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="on-user">System Username</Label>
              <Input
                id="on-user"
                placeholder="e.g. akhtar.h"
                className="text-xs font-mono"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="on-email">Official Email</Label>
              <Input
                id="on-email"
                type="email"
                placeholder="operator@company.bd"
                className="text-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Assigned Role</Label>
              <Select value={role} onValueChange={(val: any) => setRole(val)}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maker">Maker (Raise requests)</SelectItem>
                  <SelectItem value="Checker">Checker (Verify/Validate)</SelectItem>
                  <SelectItem value="Approver">Approver (Authorize clearing)</SelectItem>
                  <SelectItem value="Corporate Admin">Corporate Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="on-per-txn">Per-Transaction Limit (BDT)</Label>
              <Input
                id="on-per-txn"
                type="number"
                placeholder="e.g. 5000000"
                className="text-xs font-mono"
                value={perTxnLimit}
                onChange={(e) => setPerTxnLimit(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="on-daily">Daily Transaction Limit (BDT)</Label>
              <Input
                id="on-daily"
                type="number"
                placeholder="e.g. 20000000"
                className="text-xs font-mono"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-yellow-500/5 text-yellow-700 border border-yellow-500/20 rounded p-3 text-xs flex gap-2 items-start">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong>Onboarding Policy:</strong> Invited users will receive an activation email with a temporary authorization token. Dual authentication credentials (SMS/OTP) must be linked upon first login.
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/10 border-t py-3 flex justify-end gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onGoToEntitlements} className="text-xs">
            Cancel
          </Button>
          <Button type="submit" size="sm" className="bg-navy text-white hover:bg-navy/90 text-xs">
            Dispatch Invitation & Authorize User
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

/* Helper chevron component */
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
