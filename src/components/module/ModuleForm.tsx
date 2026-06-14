import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ChevronRight, Save, X, Upload } from "lucide-react";
import type { FieldDef, ModuleSchema } from "@/lib/moduleSchema";
import { create, update } from "@/lib/moduleStore";
import type { ModuleDef } from "@/lib/modules";

type Props = {
  mod: ModuleDef;
  schema: ModuleSchema;
  mode: "create" | "edit";
  initial?: Record<string, unknown>;
  recordId?: string;
};

export function ModuleForm({ mod, schema, mode, initial, recordId }: Props) {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, unknown>>(initial ?? {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  function setField(name: string, v: unknown) {
    setValues((s) => ({ ...s, [name]: v }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  }

  function validate() {
    const next: Record<string, string> = {};
    for (const f of schema.fields) {
      const v = values[f.name];
      if (f.required && (v === undefined || v === null || String(v).trim() === "")) {
        next[f.name] = `${f.label} is required`;
      }
      if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v))) {
        next[f.name] = "Invalid email";
      }
      if ((f.type === "amount" || f.type === "number") && v !== undefined && v !== "" && isNaN(Number(v))) {
        next[f.name] = "Must be a number";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: FormEvent, draft = false) {
    e.preventDefault();
    if (!draft && !validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    const payload = { ...values, status: draft ? "Draft" : "Pending" };
    if (mode === "create") {
      const rec = create(mod.slug, payload);
      toast.success(`${schema.singular} ${draft ? "saved as draft" : "submitted for approval"}`);
      navigate({ to: "/app/$", params: { _splat: `${mod.slug}/view/${rec.id}` } });
    } else if (recordId) {
      update(mod.slug, recordId, payload);
      toast.success(`${schema.singular} updated`);
      navigate({ to: "/app/$", params: { _splat: `${mod.slug}/view/${recordId}` } });
    }
  }

  return (
    <div className="space-y-6">
      <nav className="text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/app" className="hover:text-navy">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/app/$" params={{ _splat: mod.slug }} className="hover:text-navy">{mod.title}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{mode === "create" ? "New" : "Edit"}</span>
      </nav>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold">{mod.title}</div>
          <h1 className="font-display text-3xl mt-0.5">
            {mode === "create" ? `New ${schema.singular}` : `Edit ${schema.singular}`}
          </h1>
          {mode === "edit" && recordId && (
            <p className="text-xs text-muted-foreground font-mono mt-1">{recordId}</p>
          )}
        </div>
      </div>

      <form onSubmit={(e) => onSubmit(e, false)}>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {schema.fields.map((f) => (
              <Field
                key={f.name}
                field={f}
                value={values[f.name]}
                onChange={(v) => setField(f.name, v)}
                error={errors[f.name]}
              />
            ))}
          </div>
        </Card>

        <div className="mt-5 p-4 rounded-md bg-gold/[0.06] border border-gold/30 text-xs text-muted-foreground">
          This transaction is subject to the Maker–Checker–Approver workflow. After submission it
          will appear in the Approval Dashboard and an audit-log entry will be created.
        </div>

        <div className="mt-5 flex flex-wrap gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate({ to: "/app/$", params: { _splat: mod.slug } })}>
            <X className="w-4 h-4" /> Cancel
          </Button>
          <Button type="button" variant="outline" onClick={(e) => onSubmit(e, true)}>
            Save Draft
          </Button>
          <Button type="submit" className="bg-navy text-navy-foreground hover:bg-navy/90">
            <Save className="w-4 h-4" /> {mode === "create" ? "Submit for Approval" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  field, value, onChange, error,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
  error?: string;
}) {
  const id = `f-${field.name}`;
  const v = value === undefined || value === null ? "" : String(value);
  return (
    <div className={field.span === 2 ? "md:col-span-2" : ""}>
      <Label htmlFor={id} className="text-xs uppercase tracking-wider text-muted-foreground">
        {field.label} {field.required && <span className="text-destructive">*</span>}
      </Label>
      <div className="mt-1.5">
        {field.type === "textarea" ? (
          <Textarea id={id} value={v} placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)} rows={3}
            aria-invalid={!!error} />
        ) : field.type === "select" ? (
          <Select value={v} onValueChange={onChange}>
            <SelectTrigger id={id} aria-invalid={!!error}>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : field.type === "file" ? (
          <label htmlFor={id}
            className="flex items-center gap-2 px-3 py-2 rounded-md border border-dashed border-input hover:border-gold cursor-pointer text-sm text-muted-foreground">
            <Upload className="w-4 h-4" />
            <span>{v || "Choose file…"}</span>
            <input id={id} type="file" className="hidden"
              onChange={(e) => onChange(e.target.files?.[0]?.name ?? "")} />
          </label>
        ) : (
          <Input
            id={id}
            type={field.type === "amount" || field.type === "number" ? "number" :
                  field.type === "date" ? "date" :
                  field.type === "email" ? "email" :
                  field.type === "tel" ? "tel" : "text"}
            inputMode={field.type === "amount" ? "decimal" : undefined}
            step={field.type === "amount" ? "0.01" : undefined}
            value={v}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!error}
          />
        )}
      </div>
      {field.hint && !error && (
        <p className="text-[11px] text-muted-foreground mt-1">{field.hint}</p>
      )}
      {error && <p className="text-[11px] text-destructive mt-1">{error}</p>}
    </div>
  );
}
