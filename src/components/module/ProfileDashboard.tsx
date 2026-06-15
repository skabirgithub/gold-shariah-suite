import React, { useState, useMemo } from "react";
import {
  User, Search, Plus, Check, X, Shield, Activity, Sliders, Mail,
  Key, AlertTriangle, KeyRound, Building, MapPin, Phone, UserPlus,
  Terminal, ShieldCheck, ShieldAlert
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
import { getSession } from "@/lib/session";
import {
  getProfile,
  updateProfileRequest,
  getActivityLogs,
  logActivity,
  changePassword,
  CustomerProfile,
  ActivityLog
} from "@/lib/profile";
import { getTickets, SupportTicket } from "@/lib/serviceRequests";

export function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("details");
  const [updateTick, setUpdateTick] = useState(0);
  const triggerUpdate = () => setUpdateTick(prev => prev + 1);

  // Active session
  const session = useMemo(() => getSession(), []);
  const activeUser = session?.username || "rashed.c";

  // Load datasets
  const profile = useMemo(() => getProfile(), [updateTick]);
  const logs = useMemo(() => getActivityLogs(), [updateTick]);
  const tickets = useMemo(() => getTickets(), []);

  // Filter technical tickets for Enterprise Issues tab
  const techTickets = useMemo(() => {
    return tickets.filter(t => t.category === "Technical Support");
  }, [tickets]);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <a href="/app" className="hover:text-navy">Dashboard</a>
        <ChevronDownIcon className="w-3 h-3 -rotate-90 text-muted-foreground" />
        <span className="text-foreground font-semibold">User Profile & Audit</span>
      </nav>

      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
        <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Profile & Security Control</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Inspect corporate registration parameters, reset sign-in access keys, track enterprise issues, and audit full treasury log activities.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-sm text-navy">
        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0">
            <Building className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Entity Profile</div>
            <div className="font-display text-base mt-1 text-navy font-bold font-sans">
              Globex Industries
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Corporate Client Profile</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 text-success grid place-items-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Audit Logs</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {logs.length} Actions
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Audit log items generated</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-600 grid place-items-center shrink-0">
            <Terminal className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Tech Issues</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {techTickets.length} Support
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Enterprise issues raised</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Security Key</div>
            <div className="font-display text-sm mt-1.5 text-navy font-bold font-sans">
              MFA OTP Active
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Credential encryption active</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border w-full justify-start p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="details" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Building className="w-3.5 h-3.5" /> Corporate Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <KeyRound className="w-3.5 h-3.5" /> Change Password
          </TabsTrigger>
          <TabsTrigger value="issues" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Terminal className="w-3.5 h-3.5" /> Enterprise Tech Issues
          </TabsTrigger>
          <TabsTrigger value="audit" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Activity className="w-3.5 h-3.5" /> Activity Log Audit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <CustomerProfileTab
            profile={profile}
            onTriggerUpdate={triggerUpdate}
          />
        </TabsContent>

        <TabsContent value="password">
          <ChangePasswordTab activeUser={activeUser} />
        </TabsContent>

        <TabsContent value="issues">
          <EnterpriseIssuesTab techTickets={techTickets} />
        </TabsContent>

        <TabsContent value="audit">
          <AuditLogsTab logs={logs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* =========================================================================
   TAB 1: CUSTOMER PROFILE DETAILS
   ========================================================================= */
function CustomerProfileTab({
  profile,
  onTriggerUpdate
}: {
  profile: CustomerProfile;
  onTriggerUpdate: () => void;
}) {
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [contactPerson, setContactPerson] = useState(profile.contactPerson);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !phone.trim() || !address.trim() || !contactPerson.trim()) {
      toast.error("Please fill in all details update fields.");
      return;
    }

    updateProfileRequest({ email, phone, address, contactPerson });
    toast.success("Profile details update requested. Sent for checker approval.");
    onTriggerUpdate();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Information Cards */}
      <Card className="lg:col-span-5 border border-border">
        <CardHeader className="bg-muted/10 border-b border-border py-3">
          <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Registration Profile</CardTitle>
          <CardDescription className="text-[10px]">Read-only corporate identity details verified by the bank.</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-4 text-xs text-navy">
          <div className="space-y-3">
            <div className="flex gap-2.5 items-start">
              <Building className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] text-muted-foreground uppercase">Registered Entity</span>
                <strong className="text-sm block">{profile.companyName}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
              <div>
                <span className="text-[9px] text-muted-foreground uppercase">Corporate ID</span>
                <span className="font-mono font-bold block">{profile.corporateId}</span>
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground uppercase">TIN Number</span>
                <span className="font-mono font-bold block">{profile.tinNo}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <span className="text-[9px] text-muted-foreground uppercase">Trade License Registration</span>
              <span className="font-mono font-bold block">{profile.registrationNo}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Modification Form */}
      <Card className="lg:col-span-7 border border-border">
        <CardHeader className="bg-muted/10 border-b border-border py-3">
          <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Modify Contact Parameters</CardTitle>
          <CardDescription className="text-[10px]">Modify corporate contact endpoints and physical addresses.</CardDescription>
        </CardHeader>
        <form onSubmit={handleUpdate}>
          <CardContent className="pt-4 space-y-3 text-xs text-navy">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="prof-email">Corporate Email</Label>
                <Input
                  id="prof-email"
                  type="email"
                  className="text-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="prof-phone">Corporate Telephone</Label>
                <Input
                  id="prof-phone"
                  className="text-xs"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="prof-contact">Primary Contact Person</Label>
              <Input
                id="prof-contact"
                className="text-xs"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="prof-address">Corporate Physical Address</Label>
              <Input
                id="prof-address"
                className="text-xs"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/10 border-t py-2.5 flex justify-end">
            <Button type="submit" size="sm" className="bg-navy hover:bg-navy/90 text-xs w-full">
              Post Contact Detail Update Request
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

/* =========================================================================
   TAB 2: CHANGE PASSWORD
   ========================================================================= */
function ChangePasswordTab({ activeUser }: { activeUser: string }) {
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!current.trim() || !password.trim() || !confirm.trim()) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (password !== confirm) {
      toast.error("New password and confirm password fields do not match.");
      return;
    }

    changePassword(activeUser);
    toast.success("Security login password changed successfully.");
    setCurrent("");
    setPassword("");
    setConfirm("");
  };

  return (
    <Card className="border border-border max-w-md">
      <CardHeader className="bg-muted/10 border-b border-border py-3">
        <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Reset Login Password</CardTitle>
        <CardDescription className="text-[10px]">Change your operational portal login password safely.</CardDescription>
      </CardHeader>
      <form onSubmit={handleReset}>
        <CardContent className="pt-4 space-y-3 text-xs text-navy">
          <div className="space-y-1">
            <Label htmlFor="pwd-curr">Current Password</Label>
            <Input
              id="pwd-curr"
              type="password"
              className="text-xs"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pwd-new">New Password</Label>
            <Input
              id="pwd-new"
              type="password"
              className="text-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pwd-conf">Confirm New Password</Label>
            <Input
              id="pwd-conf"
              type="password"
              className="text-xs"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="bg-muted/10 border-t py-2.5">
          <Button type="submit" size="sm" className="bg-navy hover:bg-navy/90 text-xs w-full">
            Update Security Key
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

/* =========================================================================
   TAB 3: ENTERPRISE TECH ISSUES
   ========================================================================= */
function EnterpriseIssuesTab({ techTickets }: { techTickets: SupportTicket[] }) {
  const priorityBadge = (p: string) => {
    const map: Record<string, string> = {
      "Low": "bg-slate-500/10 text-slate-600 border-slate-500/20",
      "Medium": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      "High": "bg-orange-500/10 text-orange-600 border-orange-500/20",
      "Critical": "bg-destructive/10 text-destructive border-destructive/20"
    };
    return <Badge className={`text-[10px] font-semibold ${map[p] || ""}`} variant="outline">{p}</Badge>;
  };

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      "Open": "bg-sky-500/10 text-sky-600 border-sky-500/20",
      "Processing": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      "Resolved": "bg-success/15 text-success border-success/30",
      "Closed": "bg-slate-500/15 text-slate-500 border-slate-500/20"
    };
    return <Badge className={`text-[10px] font-semibold ${map[s] || ""}`} variant="outline">{s}</Badge>;
  };

  return (
    <Card className="border border-border">
      <CardHeader className="bg-muted/10 border-b border-border py-3">
        <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Enterprise Technical Support Logs</CardTitle>
        <CardDescription className="text-[10px]">Track technical portal glitches or integration tickets raised by Globex admins.</CardDescription>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Ticket Ref</TableHead>
            <TableHead>Issue Subject</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Raised By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Priority</TableHead>
            <TableHead className="text-center pr-4">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {techTickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-xs text-muted-foreground italic">
                No technical integration issues logged.
              </TableCell>
            </TableRow>
          ) : (
            techTickets.map(t => (
              <TableRow key={t.id}>
                <TableCell className="pl-4 font-mono text-xs font-semibold text-navy">{t.ticket}</TableCell>
                <TableCell className="text-xs font-semibold">{t.subject}</TableCell>
                <TableCell className="text-[11px] text-muted-foreground max-w-xs truncate">{t.description}</TableCell>
                <TableCell className="text-xs font-mono">{t.raisedBy}</TableCell>
                <TableCell className="text-xs font-mono">{t.date}</TableCell>
                <TableCell className="text-center">{priorityBadge(t.priority)}</TableCell>
                <TableCell className="text-center pr-4">{statusBadge(t.status)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

/* =========================================================================
   TAB 4: ACTIVITY LOG AUDIT
   ========================================================================= */
function AuditLogsTab({ logs }: { logs: ActivityLog[] }) {
  const [search, setSearch] = useState("");

  const filteredLogs = useMemo(() => {
    return logs.filter(l =>
      l.operator.toLowerCase().includes(search.toLowerCase()) ||
      l.module.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase())
    );
  }, [logs, search]);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card className="p-4 bg-card border border-border">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search action logs, operators, modules..."
            className="pl-9 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>

      {/* Audit table */}
      <Card className="border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Timestamp</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Action Log Details</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right pr-4">Source IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map(log => (
              <TableRow key={log.id} className="hover:bg-muted/10">
                <TableCell className="pl-4 font-mono text-[11px] whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString("en-US")}
                </TableCell>
                <TableCell className="font-mono text-xs font-semibold text-navy">@{log.operator}</TableCell>
                <TableCell className="text-xs">
                  <Badge variant="secondary" className="bg-navy/5 text-navy font-semibold text-[10px]">
                    {log.module}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs leading-relaxed text-navy/80">{log.action}</TableCell>
                <TableCell className="text-center">
                  <Badge className={`text-[10px] ${
                    log.status === "Success" ? "bg-success/15 text-success border-success/30" : "bg-destructive/15 text-destructive border-destructive/30"
                  }`} variant="outline">
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground pr-4">{log.ipAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
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
