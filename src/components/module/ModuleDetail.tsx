import { Link, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronRight, Pencil, Trash2, Download, Printer, Check, X } from "lucide-react";
import { toast } from "sonner";
import type { ModuleSchema } from "@/lib/moduleSchema";
import { remove, update, type Record as Rec } from "@/lib/moduleStore";
import type { ModuleDef } from "@/lib/modules";

function formatValue(v: unknown, type?: string) {
  if (v === undefined || v === null || v === "") return "—";
  if (type === "amount") {
    const n = Number(v);
    if (!isNaN(n)) return n.toLocaleString("en-US", { minimumFractionDigits: 2 });
  }
  return String(v);
}

function statusBadge(s: string) {
  const map: Record<string, string> = {
    Approved: "border-success text-success",
    Pending: "border-warning text-warning",
    Rejected: "border-destructive text-destructive",
    Draft: "border-muted-foreground text-muted-foreground",
  };
  return <Badge variant="outline" className={map[s] || ""}>{s}</Badge>;
}

export function ModuleDetail({
  mod, schema, record,
}: { mod: ModuleDef; schema: ModuleSchema; record: Rec }) {
  const navigate = useNavigate();

  function onDelete() {
    remove(mod.slug, record.id);
    toast.success(`${schema.singular} deleted`);
    navigate({ to: "/app/$", params: { _splat: mod.slug } });
  }

  function setStatus(status: string) {
    update(mod.slug, record.id, { status });
    toast.success(`Marked as ${status}`);
    navigate({ to: "/app/$", params: { _splat: `${mod.slug}/view/${record.id}` } });
  }

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: mod.slug }} className="hover:text-navy">{mod.title}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-mono">{record.id}</span>
      </nav>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold">{mod.title}</div>
          <h1 className="font-display text-3xl mt-0.5">{schema.singular} details</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-mono text-muted-foreground">{record.id}</span>
            {statusBadge(String(record.status))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm"><Printer className="w-4 h-4" /> Print</Button>
          <Button variant="outline" size="sm"><Download className="w-4 h-4" /> PDF</Button>
          {record.status === "Pending" && (
            <>
              <Button variant="outline" size="sm" className="border-success text-success hover:bg-success/10"
                onClick={() => setStatus("Approved")}>
                <Check className="w-4 h-4" /> Approve
              </Button>
              <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10"
                onClick={() => setStatus("Rejected")}>
                <X className="w-4 h-4" /> Reject
              </Button>
            </>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link to="/app/$" params={{ _splat: `${mod.slug}/edit/${record.id}` }}>
              <Pencil className="w-4 h-4" /> Edit
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this {schema.singular.toLowerCase()}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The record {record.id} will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card className="p-6">
        <h2 className="font-display text-lg mb-4">Information</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {schema.fields.map((f) => (
            <div key={f.name} className={f.span === 2 ? "md:col-span-2" : ""}>
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</dt>
              <dd className={`mt-1 text-sm ${f.type === "amount" ? "font-mono" : ""} ${f.type === "textarea" ? "whitespace-pre-wrap" : ""}`}>
                {formatValue(record[f.name], f.type)}
              </dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card className="p-6">
        <h2 className="font-display text-lg mb-4">Audit trail</h2>
        <ol className="relative border-l border-border pl-5 space-y-4">
          <AuditItem time={String(record.createdAt)} actor="Maker" action={`${schema.singular} created`} />
          {record.updatedAt && record.updatedAt !== record.createdAt && (
            <AuditItem time={String(record.updatedAt)} actor="Maker" action="Record updated" />
          )}
          {record.status === "Approved" && <AuditItem time={String(record.updatedAt)} actor="Approver" action="Approved" />}
          {record.status === "Rejected" && <AuditItem time={String(record.updatedAt)} actor="Approver" action="Rejected" />}
        </ol>
      </Card>
    </div>
  );
}

function AuditItem({ time, actor, action }: { time: string; actor: string; action: string }) {
  return (
    <li>
      <div className="absolute -left-[5px] w-2.5 h-2.5 rounded-full bg-gold" />
      <div className="text-sm">{action}</div>
      <div className="text-xs text-muted-foreground">
        {new Date(time).toLocaleString()} · {actor}
      </div>
    </li>
  );
}
