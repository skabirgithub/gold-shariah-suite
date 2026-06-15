import React, { useState, useMemo } from "react";
import {
  FileText, Search, Filter, Check, X, ChevronDown, ChevronUp, Plus,
  Send, Clock, HelpCircle, Loader2, Sparkles, AlertTriangle, AlertCircle,
  MessageSquare, User, Building, ShieldAlert
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
  getTickets,
  saveTicket,
  resolveTicket,
  closeTicket,
  SupportTicket
} from "@/lib/serviceRequests";

export function ServiceRequestDashboard() {
  const [activeTab, setActiveTab] = useState("directory");
  const [updateTick, setUpdateTick] = useState(0);
  const triggerUpdate = () => setUpdateTick(prev => prev + 1);

  // Active session details
  const session = useMemo(() => getSession(), []);
  const activeUser = session?.username || "rashed.c";

  // Load tickets dataset
  const tickets = useMemo(() => getTickets(), [updateTick]);

  // Aggregate stats
  const totalTickets = useMemo(() => tickets.length, [tickets]);
  const openCount = useMemo(() => tickets.filter(t => t.status === "Open" || t.status === "Processing").length, [tickets]);
  const resolvedCount = useMemo(() => tickets.filter(t => t.status === "Resolved").length, [tickets]);
  const myTicketsCount = useMemo(() => tickets.filter(t => t.raisedBy === activeUser).length, [tickets, activeUser]);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <a href="/app" className="hover:text-navy">Dashboard</a>
        <ChevronDown className="w-3 h-3 -rotate-90" />
        <span className="text-foreground font-semibold">Service Request Portal</span>
      </nav>

      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-widest text-gold font-bold">Shahjalal Islami Bank PLC</div>
        <h1 className="font-display text-3xl font-bold text-navy mt-0.5">Service & Support Tickets</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Submit and track corporate requests including cheque book requests, credit card modifications, trade finance support, and general portal inquiries.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-sm text-navy">
        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0">
            <MessageSquare className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Total Requests</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {totalTickets} Tickets
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">All tickets tracked</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-600 grid place-items-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Active / Open</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {openCount} Tickets
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Awaiting bank processing</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 text-success grid place-items-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Resolved Dues</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {resolvedCount} Resolved
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Marked as resolved</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-sans">My Support Logs</div>
            <div className="font-display text-xl mt-1 text-navy font-bold">
              {myTicketsCount} Requests
            </div>
            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">Tickets raised by you</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border w-full justify-start p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="directory" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <FileText className="w-3.5 h-3.5" /> Support Directory
          </TabsTrigger>
          <TabsTrigger value="new-ticket" className="px-4 py-2 text-xs font-semibold gap-1.5 data-[state=active]:bg-navy data-[state=active]:text-white">
            <Plus className="w-3.5 h-3.5" /> Raise New Ticket
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directory">
          <TicketDirectoryTab
            tickets={tickets}
            activeUser={activeUser}
            onTriggerUpdate={triggerUpdate}
          />
        </TabsContent>

        <TabsContent value="new-ticket">
          <RaiseTicketTab
            activeUser={activeUser}
            onTriggerUpdate={triggerUpdate}
            onGoToDirectory={() => setActiveTab("directory")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* =========================================================================
   TAB 1: TICKET DIRECTORY
   ========================================================================= */
function TicketDirectoryTab({
  tickets,
  activeUser,
  onTriggerUpdate
}: {
  tickets: SupportTicket[];
  activeUser: string;
  onTriggerUpdate: () => void;
}) {
  const [scopeFilter, setScopeFilter] = useState<"Company" | "User">("Company");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [resolveModal, setResolveModal] = useState(false);
  const [resolveId, setResolveId] = useState("");
  const [resolveRemarks, setResolveRemarks] = useState("");

  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchesScope = scopeFilter === "Company" ? true : t.raisedBy === activeUser;
      const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
      const matchesPriority = priorityFilter === "All" || t.priority === priorityFilter;
      const matchesSearch =
        t.subject.toLowerCase().includes(search.toLowerCase()) ||
        t.ticket.toLowerCase().includes(search.toLowerCase()) ||
        t.raisedBy.toLowerCase().includes(search.toLowerCase());
      return matchesScope && matchesCategory && matchesPriority && matchesSearch;
    });
  }, [tickets, scopeFilter, categoryFilter, priorityFilter, search, activeUser]);

  const handleOpenResolve = (id: string) => {
    setResolveId(id);
    setResolveRemarks("");
    setResolveModal(true);
  };

  const handleResolveTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolveId || !resolveRemarks.trim()) {
      toast.error("Please enter resolution notes.");
      return;
    }
    resolveTicket(resolveId, resolveRemarks);
    toast.success(`Support Ticket resolved successfully.`);
    setResolveModal(false);
    onTriggerUpdate();
  };

  const handleCloseTicket = (id: string) => {
    closeTicket(id);
    toast.success(`Ticket closed by owner.`);
    onTriggerUpdate();
  };

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
    <div className="space-y-4">
      {/* Filtering Control Bar */}
      <Card className="p-4 bg-card border border-border flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search reference, subject..."
              className="pl-9 text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40 text-xs h-8">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Account Statement">Account Statements</SelectItem>
                <SelectItem value="Cheque Book">Cheque Books</SelectItem>
                <SelectItem value="Trade LC">Trade Finance LC</SelectItem>
                <SelectItem value="User Limits">Entitlement Limits</SelectItem>
                <SelectItem value="Technical Support">Technical Support</SelectItem>
                <SelectItem value="Other">Other Inquiries</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-36 text-xs h-8">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Priorities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* User Scope Filters */}
        <div className="flex gap-1 bg-muted/30 p-1 rounded-md border">
          <Button
            variant={scopeFilter === "Company" ? "default" : "ghost"}
            size="sm"
            className="text-[10px] h-7 px-2.5"
            onClick={() => setScopeFilter("Company")}
          >
            <Building className="w-3 h-3 mr-1" /> Company Wide
          </Button>
          <Button
            variant={scopeFilter === "User" ? "default" : "ghost"}
            size="sm"
            className="text-[10px] h-7 px-2.5"
            onClick={() => setScopeFilter("User")}
          >
            <User className="w-3 h-3 mr-1" /> Raised by Me
          </Button>
        </div>
      </Card>

      {/* Tickets Grid list */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTickets.length === 0 ? (
          <Card className="p-8 text-center text-xs text-muted-foreground border border-dashed py-12 italic">
            No support requests match your filtering parameters.
          </Card>
        ) : (
          filteredTickets.map(ticket => (
            <Card key={ticket.id} className="border border-border p-4 space-y-4 hover:shadow-md transition-all duration-300">
              <div className="flex flex-wrap items-start justify-between gap-2 border-b pb-3 border-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="font-mono text-[10px] text-gold bg-gold/5 border-gold/30">
                      {ticket.ticket}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-semibold font-mono flex items-center gap-1">
                      <User className="w-3 h-3" /> {ticket.raisedBy}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">Date: {ticket.date}</span>
                  </div>
                  <h4 className="text-navy text-sm font-bold mt-1">{ticket.subject}</h4>
                </div>
                <div className="flex gap-2 items-center">
                  <Badge className="bg-navy/5 text-navy font-semibold text-[10px] border-none">
                    {ticket.category}
                  </Badge>
                  {priorityBadge(ticket.priority)}
                  {statusBadge(ticket.status)}
                </div>
              </div>

              {/* Description body */}
              <div className="text-xs text-navy/80 leading-relaxed font-sans">
                {ticket.description}
              </div>

              {/* Remarks/Resolutions logs */}
              {ticket.remarks && (
                <div className="bg-success/5 text-success border border-success/20 rounded p-3 text-[11px] flex gap-2 items-start font-mono leading-relaxed">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="uppercase font-sans font-bold block mb-0.5">Resolution Notes:</strong>
                    {ticket.remarks}
                  </div>
                </div>
              )}

              {/* Interactive actions for Maker/Checker */}
              {(ticket.status === "Open" || ticket.status === "Processing") && (
                <div className="flex justify-end gap-2 border-t pt-3 border-border">
                  <Button
                    size="sm"
                    className="h-7 text-[10px] bg-navy text-white hover:bg-navy/90"
                    onClick={() => handleOpenResolve(ticket.id)}
                  >
                    <Check className="w-3 h-3 mr-1" /> Resolve Request
                  </Button>
                  {ticket.raisedBy === activeUser && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-[10px] text-destructive hover:bg-destructive/10"
                      onClick={() => handleCloseTicket(ticket.id)}
                    >
                      <X className="w-3 h-3 mr-1" /> Close Ticket
                    </Button>
                  )}
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Resolution Modal */}
      {resolveModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4">
          <Card className="w-full max-w-md border border-border shadow-2xl bg-white">
            <CardHeader className="bg-navy/5 border-b pb-3">
              <CardTitle className="text-navy text-base font-bold flex items-center gap-2">
                <Check className="w-5 h-5 text-success" /> Resolve Support Ticket
              </CardTitle>
              <CardDescription className="text-xs">
                Log resolution details. This will notify the corporate maker.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleResolveTicket}>
              <CardContent className="space-y-4 pt-4 text-xs text-navy">
                <div className="space-y-1">
                  <Label htmlFor="res-remarks">Resolution Remarks</Label>
                  <textarea
                    id="res-remarks"
                    rows={4}
                    placeholder="Provide detailed comments on limits enhanced, cheque books printed, or LC adjustments completed..."
                    className="w-full rounded-md border border-border bg-white p-2.5 text-xs text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                    value={resolveRemarks}
                    onChange={(e) => setResolveRemarks(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/10 border-t py-3 flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setResolveModal(false)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-navy text-white hover:bg-navy/90 text-xs">
                  Post Resolution Logs
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   TAB 2: RAISE SUPPORT REQUEST
   ========================================================================= */
function RaiseTicketTab({
  activeUser,
  onTriggerUpdate,
  onGoToDirectory
}: {
  activeUser: string;
  onTriggerUpdate: () => void;
  onGoToDirectory: () => void;
}) {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<"Account Statement" | "Cheque Book" | "Trade LC" | "User Limits" | "Technical Support" | "Other">("Account Statement");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Critical">("Low");
  const [description, setDescription] = useState("");
  const [scope, setScope] = useState<"Company" | "User">("User");

  const handleRaise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error("Please fill in the subject and description fields.");
      return;
    }

    saveTicket({
      subject,
      category,
      priority,
      description,
      raisedBy: activeUser,
      scope
    });

    toast.success(`Support Ticket raised. Core banking system alerted.`);
    onTriggerUpdate();
    onGoToDirectory();

    // Reset Form
    setSubject("");
    setDescription("");
  };

  return (
    <Card className="border border-border max-w-xl">
      <CardHeader className="bg-muted/10 border-b border-border py-3">
        <CardTitle className="text-navy font-bold text-sm uppercase tracking-wider">Log Support Request Ticket</CardTitle>
        <CardDescription className="text-[10px]">Open support tickets for limits, cheque books, and portal maintenance logs.</CardDescription>
      </CardHeader>
      <form onSubmit={handleRaise}>
        <CardContent className="pt-4 space-y-4 text-xs text-navy">
          <div className="space-y-1">
            <Label htmlFor="req-subject">Ticket Subject / Title</Label>
            <Input
              id="req-subject"
              placeholder="e.g. Current Account Cheque Book replenishment order"
              className="text-xs"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label>Category</Label>
              <Select value={category} onValueChange={(val: any) => setCategory(val)}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Account Statement">Account Statements</SelectItem>
                  <SelectItem value="Cheque Book">Cheque Books</SelectItem>
                  <SelectItem value="Trade LC">Trade Finance LC</SelectItem>
                  <SelectItem value="User Limits">Entitlement Limits</SelectItem>
                  <SelectItem value="Technical Support">Technical Support</SelectItem>
                  <SelectItem value="Other">Other Inquiries</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(val: any) => setPriority(val)}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Ticket Scope</Label>
              <Select value={scope} onValueChange={(val: any) => setScope(val)}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="User">User Ticket (Private)</SelectItem>
                  <SelectItem value="Company">Company Ticket (Shared)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="req-desc">Ticket Description</Label>
            <textarea
              id="req-desc"
              rows={5}
              placeholder="Detail your request or support issue. Specify account numbers or reference dates if relevant..."
              className="w-full rounded-md border border-border bg-white p-2.5 text-xs text-navy focus:outline-none focus:ring-1 focus:ring-navy"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="bg-muted/10 border-t py-3 flex justify-end gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onGoToDirectory} className="text-xs">
            Cancel
          </Button>
          <Button type="submit" size="sm" className="bg-navy text-white hover:bg-navy/90 text-xs">
            Submit Support Request
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
