import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { f as useParams, L as Link, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { g as getModule, a as MODULES } from "./router-BjipO9dc.mjs";
import { g as get, a as getSchema, B as Badge, l as list, c as create, u as update$1, r as remove } from "./badge-BIVg79D5.mjs";
import { C as Card, B as Button, b as buttonVariants } from "./card-D8uTml63.mjs";
import { I as Input, g as getSession } from "./input-YVcJYwBl.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { R as Root2$1, V as Value, T as Trigger$1, I as Icon, P as Portal, C as Content2, a as Viewport, b as Item, c as ItemIndicator, d as ItemText, S as ScrollUpButton, e as ScrollDownButton, L as Label$1, f as Separator } from "../_libs/radix-ui__react-select.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Root2$2, T as Trigger2, P as Portal2, C as Content2$1, a as Title2, D as Description2, b as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter, f as DialogTrigger } from "./dialog--up_DbYf.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { v as ChevronRight, V as ArrowLeft, X, w as Check, Y as Info, j as Search, Z as CircleCheck, _ as Download, f as FileText, $ as ArrowDownLeft, I as ArrowUpRight, a0 as Coins, W as Wallet, a1 as DollarSign, a2 as Sparkles, m as FileSpreadsheet, E as Plus, e as Upload, a3 as Calendar, a4 as Save, n as Printer, a5 as Pencil, a6 as Trash2, a7 as Funnel, a8 as Eye, o as ChevronDown, a9 as ChevronUp } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Select = Root2$1;
const SelectValue = Value;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger$1,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = Trigger$1.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Content2,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = Content2.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = Label$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
    ]
  }
));
SelectItem.displayName = Item.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = Separator.displayName;
function ModuleForm({ mod, schema, mode, initial, recordId }) {
  const navigate = useNavigate();
  const [values, setValues] = reactExports.useState(initial ?? {});
  const [errors, setErrors] = reactExports.useState({});
  function setField(name, v) {
    setValues((s) => ({ ...s, [name]: v }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  }
  function validate() {
    const next = {};
    for (const f of schema.fields) {
      const v = values[f.name];
      if (f.required && (v === void 0 || v === null || String(v).trim() === "")) {
        next[f.name] = `${f.label} is required`;
      }
      if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v))) {
        next[f.name] = "Invalid email";
      }
      if ((f.type === "amount" || f.type === "number") && v !== void 0 && v !== "" && isNaN(Number(v))) {
        next[f.name] = "Must be a number";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }
  function onSubmit(e, draft = false) {
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
      update$1(mod.slug, recordId, payload);
      toast.success(`${schema.singular} updated`);
      navigate({ to: "/app/$", params: { _splat: `${mod.slug}/view/${recordId}` } });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "hover:text-navy", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/$", params: { _splat: mod.slug }, className: "hover:text-navy", children: mod.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: mode === "create" ? "New" : "Edit" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: mod.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl mt-0.5", children: mode === "create" ? `New ${schema.singular}` : `Edit ${schema.singular}` }),
      mode === "edit" && recordId && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono mt-1", children: recordId })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => onSubmit(e, false), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5", children: schema.fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          field: f,
          value: values[f.name],
          onChange: (v) => setField(f.name, v),
          error: errors[f.name]
        },
        f.name
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 p-4 rounded-md bg-gold/[0.06] border border-gold/30 text-xs text-muted-foreground", children: "This transaction is subject to the Maker–Checker–Approver workflow. After submission it will appear in the Approval Dashboard and an audit-log entry will be created." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", onClick: () => navigate({ to: "/app/$", params: { _splat: mod.slug } }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
          " Cancel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: (e) => onSubmit(e, true), children: "Save Draft" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "bg-navy text-navy-foreground hover:bg-navy/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
          " ",
          mode === "create" ? "Submit for Approval" : "Save Changes"
        ] })
      ] })
    ] })
  ] });
}
function Field({
  field,
  value,
  onChange,
  error
}) {
  const id = `f-${field.name}`;
  const v = value === void 0 || value === null ? "" : String(value);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: field.span === 2 ? "md:col-span-2" : "", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: id, className: "text-xs uppercase tracking-wider text-muted-foreground", children: [
      field.label,
      " ",
      field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children: field.type === "textarea" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        id,
        value: v,
        placeholder: field.placeholder,
        onChange: (e) => onChange(e.target.value),
        rows: 3,
        "aria-invalid": !!error
      }
    ) : field.type === "select" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: v, onValueChange: onChange, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id, "aria-invalid": !!error, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: `Select ${field.label.toLowerCase()}` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: field.options?.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o, children: o }, o)) })
    ] }) : field.type === "file" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        htmlFor: id,
        className: "flex items-center gap-2 px-3 py-2 rounded-md border border-dashed border-input hover:border-gold cursor-pointer text-sm text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: v || "Choose file…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id,
              type: "file",
              className: "hidden",
              onChange: (e) => onChange(e.target.files?.[0]?.name ?? "")
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id,
        type: field.type === "amount" || field.type === "number" ? "number" : field.type === "date" ? "date" : field.type === "email" ? "email" : field.type === "tel" ? "tel" : "text",
        inputMode: field.type === "amount" ? "decimal" : void 0,
        step: field.type === "amount" ? "0.01" : void 0,
        value: v,
        placeholder: field.placeholder,
        onChange: (e) => onChange(e.target.value),
        "aria-invalid": !!error
      }
    ) }),
    field.hint && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: field.hint }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-destructive mt-1", children: error })
  ] });
}
const AlertDialog = Root2$2;
const AlertDialogTrigger = Trigger2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2$1.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
function formatValue(v, type) {
  if (v === void 0 || v === null || v === "") return "—";
  if (type === "amount") {
    const n = Number(v);
    if (!isNaN(n)) return n.toLocaleString("en-US", { minimumFractionDigits: 2 });
  }
  return String(v);
}
function statusBadge$1(s) {
  const map = {
    Approved: "border-success text-success",
    Pending: "border-warning text-warning",
    Rejected: "border-destructive text-destructive",
    Draft: "border-muted-foreground text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: map[s] || "", children: s });
}
function ModuleDetail({
  mod,
  schema,
  record
}) {
  const navigate = useNavigate();
  function onDelete() {
    remove(mod.slug, record.id);
    toast.success(`${schema.singular} deleted`);
    navigate({ to: "/app/$", params: { _splat: mod.slug } });
  }
  function setStatus(status) {
    update$1(mod.slug, record.id, { status });
    toast.success(`Marked as ${status}`);
    navigate({ to: "/app/$", params: { _splat: `${mod.slug}/view/${record.id}` } });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "hover:text-navy", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/$", params: { _splat: mod.slug }, className: "hover:text-navy", children: mod.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono", children: record.id })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: mod.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl mt-0.5", children: [
          schema.singular,
          " details"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: record.id }),
          statusBadge$1(String(record.status))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
          " Print"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
          " PDF"
        ] }),
        record.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "border-success text-success hover:bg-success/10",
              onClick: () => setStatus("Approved"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                " Approve"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "border-destructive text-destructive hover:bg-destructive/10",
              onClick: () => setStatus("Rejected"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                " Reject"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/$", params: { _splat: `${mod.slug}/edit/${record.id}` }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }),
          " Edit"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "border-destructive text-destructive hover:bg-destructive/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
            " Delete"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
                "Delete this ",
                schema.singular.toLowerCase(),
                "?"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                "This action cannot be undone. The record ",
                record.id,
                " will be permanently removed."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: onDelete, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Delete" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg mb-4", children: "Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4", children: schema.fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: f.span === 2 ? "md:col-span-2" : "", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: f.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: `mt-1 text-sm ${f.type === "amount" ? "font-mono" : ""} ${f.type === "textarea" ? "whitespace-pre-wrap" : ""}`, children: formatValue(record[f.name], f.type) })
      ] }, f.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg mb-4", children: "Audit trail" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "relative border-l border-border pl-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AuditItem, { time: String(record.createdAt), actor: "Maker", action: `${schema.singular} created` }),
        record.updatedAt && record.updatedAt !== record.createdAt && /* @__PURE__ */ jsxRuntimeExports.jsx(AuditItem, { time: String(record.updatedAt), actor: "Maker", action: "Record updated" }),
        record.status === "Approved" && /* @__PURE__ */ jsxRuntimeExports.jsx(AuditItem, { time: String(record.updatedAt), actor: "Approver", action: "Approved" }),
        record.status === "Rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx(AuditItem, { time: String(record.updatedAt), actor: "Approver", action: "Rejected" })
      ] })
    ] })
  ] });
}
function AuditItem({ time, actor, action }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-[5px] w-2.5 h-2.5 rounded-full bg-gold" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: action }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
      new Date(time).toLocaleString(),
      " · ",
      actor
    ] })
  ] });
}
const Table = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props }));
TableBody.displayName = "TableBody";
const TableFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tfoot",
  {
    ref,
    className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props }));
TableCaption.displayName = "TableCaption";
const ACCOUNT_TRANSACTIONS = {
  "0123100001": [
    {
      id: "TXN-881928",
      date: "2026-06-14",
      type: "Debit",
      description: "RTGS Fund Transfer to Globex Industries (Supplier Settlement)",
      amount: 45e5,
      balanceAfter: 124562300,
      category: "Transfer",
      reference: "FT-1001"
    },
    {
      id: "TXN-881920",
      date: "2026-06-12",
      type: "Credit",
      description: "EFTN Invoice realization — Pran Foods Ltd",
      amount: 125e4,
      balanceAfter: 129062300,
      category: "Collection",
      reference: "INV-2025-0411"
    },
    {
      id: "TXN-881912",
      date: "2026-06-10",
      type: "Debit",
      description: "Utility Bill Payout — DESCO Electricity",
      amount: 14200,
      balanceAfter: 127812300,
      category: "Other",
      reference: "BP-201"
    },
    {
      id: "TXN-881900",
      date: "2026-06-08",
      type: "Debit",
      description: "Pay Order Issued — NBR Corporate Income Tax",
      amount: 425e3,
      balanceAfter: 127826500,
      category: "Transfer",
      reference: "PI-3301"
    },
    {
      id: "TXN-881881",
      date: "2026-06-05",
      type: "Credit",
      description: "Auto-Sweep Pool Inflow from Mudaraba Savings",
      amount: 5e6,
      balanceAfter: 128251500,
      category: "Profit",
      reference: "SWP-OP-MASTER"
    },
    {
      id: "TXN-881870",
      date: "2026-06-01",
      type: "Credit",
      description: "Export Bill Realization — Walmart Inc (Garments Shipment)",
      amount: 35e4,
      balanceAfter: 123251500,
      category: "Trade",
      reference: "BL-EXP-33201"
    },
    {
      id: "TXN-881840",
      date: "2026-05-28",
      type: "Debit",
      description: "Bulk Payroll Payout — Salaries for Aug '25",
      amount: 1284e4,
      balanceAfter: 122901500,
      category: "Payroll",
      reference: "PAYROLL-AUG-2025"
    },
    {
      id: "TXN-881812",
      date: "2026-05-20",
      type: "Credit",
      description: "Cash / Internal Transfer Replenishment",
      amount: 25e6,
      balanceAfter: 135741500,
      category: "Transfer",
      reference: "TR-88291"
    }
  ],
  "0123100002": [
    {
      id: "TXN-772819",
      date: "2026-06-13",
      type: "Debit",
      description: "EFTN Salary Payout — BRAC Logistics Dispatch Team",
      amount: 85e4,
      balanceAfter: 1845e4,
      category: "Payroll",
      reference: "FT-1002"
    },
    {
      id: "TXN-772810",
      date: "2026-06-06",
      type: "Credit",
      description: "Internal Fund Transfer from Operations Account",
      amount: 1284e4,
      balanceAfter: 193e5,
      category: "Transfer",
      reference: "TX-99028"
    },
    {
      id: "TXN-772800",
      date: "2026-06-02",
      type: "Debit",
      description: "Bulk Payroll Salary Disbursement",
      amount: 1284e4,
      balanceAfter: 646e4,
      category: "Payroll",
      reference: "PAYROLL-AUG-2025"
    },
    {
      id: "TXN-772781",
      date: "2026-05-25",
      type: "Credit",
      description: "Corporate Account Replenishment Payout Fund",
      amount: 15e6,
      balanceAfter: 193e5,
      category: "Transfer",
      reference: "TX-98273"
    }
  ],
  "0123100003": [
    {
      id: "TXN-991204",
      date: "2026-06-12",
      type: "Debit",
      description: "Outward SWIFT Transfer to Yangtse Trading (LC settlement)",
      amount: 32e4,
      balanceAfter: 845200,
      category: "Trade",
      reference: "FT-1003"
    },
    {
      id: "TXN-991192",
      date: "2026-06-09",
      type: "Debit",
      description: "Import Bill Acceptance under LC-IMP-2025-0994",
      amount: 15e4,
      balanceAfter: 1165200,
      category: "Trade",
      reference: "BL-IMP-55201"
    },
    {
      id: "TXN-991180",
      date: "2026-06-04",
      type: "Credit",
      description: "Inward Trade Remittance / Export LC Walmart Realization",
      amount: 35e4,
      balanceAfter: 1315200,
      category: "Trade",
      reference: "BL-EXP-33201"
    },
    {
      id: "TXN-991168",
      date: "2026-05-30",
      type: "Debit",
      description: "LC margin payment fee for LC-IMP-2025-0992",
      amount: 32e4,
      balanceAfter: 965200,
      category: "Fees",
      reference: "LC-APP-9912"
    },
    {
      id: "TXN-991150",
      date: "2026-05-15",
      type: "Credit",
      description: "Inward Foreign Remittance from Trade Partner",
      amount: 6e5,
      balanceAfter: 1285200,
      category: "Collection",
      reference: "TR-FX-88192"
    }
  ]
};
function getTransactionsForAccount(accountNo) {
  return ACCOUNT_TRANSACTIONS[accountNo] || [];
}
const INVESTMENT_LEDGER = {
  "FAC-MUR-8839": [
    {
      id: "MUR-TR-4402",
      date: "2026-06-04",
      type: "Repayment",
      description: "Principal installment repayment — Operations A/C debit",
      amount: 2e7,
      balanceAfter: 1854e5,
      reference: "RP-8819"
    },
    {
      id: "MUR-TR-4390",
      date: "2026-05-20",
      type: "Disbursement",
      description: "Supplier payout — Steel-Works Bangladesh (Quotation Q-882)",
      amount: 45e6,
      balanceAfter: 2054e5,
      reference: "DB-9912"
    },
    {
      id: "MUR-TR-4351",
      date: "2026-05-05",
      type: "Repayment",
      description: "Corporate principal repayment — Operation account sweep",
      amount: 15e6,
      balanceAfter: 1604e5,
      reference: "RP-8701"
    },
    {
      id: "MUR-TR-4320",
      date: "2026-04-15",
      type: "Disbursement",
      description: "Supplier payout — Apex Materials PLC (Ref Proforma INV-492)",
      amount: 8e7,
      balanceAfter: 1754e5,
      reference: "DB-9880"
    },
    {
      id: "MUR-TR-4301",
      date: "2026-04-01",
      type: "Disbursement",
      description: "Supplier payout — Globex Trading HK (Import raw materials)",
      amount: 954e5,
      balanceAfter: 954e5,
      reference: "DB-9801"
    }
  ],
  "FAC-HPSM-2201": [
    {
      id: "HPS-TR-1022",
      date: "2026-06-01",
      type: "Repayment",
      description: "Monthly lease rental payment — Machine Line A",
      amount: 46e5,
      balanceAfter: 654e5,
      reference: "RP-7740"
    },
    {
      id: "HPS-TR-1011",
      date: "2026-05-01",
      type: "Repayment",
      description: "Monthly lease rental payment — Machine Line A",
      amount: 46e5,
      balanceAfter: 7e7,
      reference: "RP-7721"
    },
    {
      id: "HPS-TR-1002",
      date: "2026-04-01",
      type: "Repayment",
      description: "Monthly lease rental payment — Machine Line A",
      amount: 46e5,
      balanceAfter: 746e5,
      reference: "RP-7704"
    },
    {
      id: "HPS-TR-990",
      date: "2026-03-10",
      type: "Disbursement",
      description: "Drawdown payout — Industrial Machinery Supplier Ltd",
      amount: 792e5,
      balanceAfter: 792e5,
      reference: "DB-5510"
    }
  ]
};
function getInvestmentTransactions(facilityNo) {
  return INVESTMENT_LEDGER[facilityNo] || [];
}
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
function ModuleRouter() {
  const params = useParams({
    from: "/app/$"
  });
  const segments = (params._splat || "").split("/").filter(Boolean);
  const [slug, action, id] = segments;
  const mod = getModule(slug);
  const schema = getSchema(slug);
  if (slug === "approval") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return /* @__PURE__ */ jsxRuntimeExports.jsx(RecordMissing, { slug });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ApprovalDetailView, { record });
    }
    if (!action) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ApprovalDashboardView, {});
    }
  }
  if (slug === "accounts") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return /* @__PURE__ */ jsxRuntimeExports.jsx(RecordMissing, { slug });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AccountStatementView, { record });
    }
    if (!action) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AccountDashboardView, {});
    }
  }
  if (slug === "investment") {
    if (action === "view" && id) {
      const record = get(slug, id);
      if (!record) return /* @__PURE__ */ jsxRuntimeExports.jsx(RecordMissing, { slug });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(InvestmentFacilityView, { record });
    }
    if (!action) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(InvestmentDashboardView, {});
    }
  }
  if (action === "new") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleForm, { mod, schema, mode: "create" });
  }
  if (action === "view" && id) {
    const record = get(slug, id);
    if (!record) return /* @__PURE__ */ jsxRuntimeExports.jsx(RecordMissing, { slug });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleDetail, { mod, schema, record });
  }
  if (action === "edit" && id) {
    const record = get(slug, id);
    if (!record) return /* @__PURE__ */ jsxRuntimeExports.jsx(RecordMissing, { slug });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleForm, { mod, schema, mode: "edit", recordId: id, initial: record });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleListPage, {});
}
function RecordMissing({
  slug
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Record not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "It may have been deleted or moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/$", params: {
      _splat: slug
    }, children: "Back to list" }) })
  ] });
}
function statusBadge(s) {
  const map = {
    Approved: "border-success text-success",
    Pending: "border-warning text-warning",
    Rejected: "border-destructive text-destructive",
    Draft: "border-muted-foreground text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: map[s] || "", children: s });
}
function ModuleListPage() {
  const params = useParams({
    from: "/app/$"
  });
  const slug = (params._splat || "").split("/")[0];
  const mod = getModule(slug);
  const schema = getSchema(slug);
  const Icon2 = mod.icon;
  const [query, setQuery] = reactExports.useState("");
  const rows = reactExports.useMemo(() => {
    const all = list(slug);
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter((r) => Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(q)));
  }, [slug, query]);
  const related = MODULES.filter((m) => m.group === mod.group && m.slug !== mod.slug).slice(0, 4);
  const formatCell = (v, colName) => {
    if (v === void 0 || v === null || v === "") return "—";
    const field = schema.fields.find((f) => f.name === colName);
    if (field?.type === "amount") {
      const n = Number(v);
      if (!isNaN(n)) return n.toLocaleString("en-US", {
        minimumFractionDigits: 2
      });
    }
    return String(v);
  };
  const totalAmount = rows.reduce((acc, r) => {
    const amt = Number(r.amount ?? r.totalAmount ?? 0);
    return isNaN(amt) ? acc : acc + amt;
  }, 0);
  const pending = rows.filter((r) => r.status === "Pending").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "hover:text-navy", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: mod.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg navy-gradient text-navy-foreground grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "w-6 h-6 text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: mod.group }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl mt-0.5", children: mod.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-2xl", children: mod.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
          "Export"
        ] }),
        schema.canCreate && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "bg-navy text-navy-foreground hover:bg-navy/90", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/$", params: {
          _splat: `${slug}/new`
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          "New ",
          schema.singular
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total records", value: rows.length.toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Pending action", value: pending.toString(), accent: pending > 0 ? "warning" : void 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total value", value: totalAmount > 0 ? `BDT ${totalAmount.toLocaleString()}` : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Last updated", value: rows[0]?.updatedAt ? new Date(String(rows[0].updatedAt)).toLocaleDateString() : "—" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: `Search in ${mod.short}…`, className: "max-w-sm", value: query, onChange: (e) => setQuery(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4" }),
        "Filters"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
          "PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
          "Excel"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "ID" }),
        schema.listColumns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: c.align === "right" ? "text-right" : "", children: c.label }, c.name)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { colSpan: schema.listColumns.length + 2, className: "text-center text-sm text-muted-foreground py-10", children: [
        "No records found.",
        " ",
        schema.canCreate && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/$", params: {
          _splat: `${slug}/new`
        }, className: "text-gold hover:underline", children: [
          "Create the first ",
          schema.singular.toLowerCase()
        ] })
      ] }) }) : rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/$", params: {
          _splat: `${slug}/view/${r.id}`
        }, className: "hover:text-gold", children: r.id }) }),
        schema.listColumns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: `text-sm ${c.align === "right" ? "text-right font-mono" : ""}`, children: c.name === "status" ? statusBadge(String(r[c.name] ?? "")) : formatCell(r[c.name], c.name) }, c.name)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/$", params: {
            _splat: `${slug}/view/${r.id}`
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
            " View"
          ] }) }),
          schema.canCreate && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/$", params: {
            _splat: `${slug}/edit/${r.id}`
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }) }) })
        ] }) })
      ] }, r.id)) })
    ] }) }),
    !schema.canCreate && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5 bg-gold/[0.06] border-gold/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-gold shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Read-only module" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          mod.title,
          " entries are sourced from the core banking system. Records can be viewed and exported here, but cannot be created from the portal."
        ] })
      ] })
    ] }) }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-3", children: "Related modules" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: related.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/$", params: {
        _splat: r.slug
      }, className: "p-4 rounded-md border border-border hover:border-gold hover:bg-muted/40 transition-colors flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(r.icon, { className: "w-4 h-4 text-navy shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: r.short }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground line-clamp-2", children: r.description })
        ] })
      ] }, r.slug)) })
    ] })
  ] });
}
function Stat({
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display text-2xl mt-2 ${accent === "warning" ? "text-warning" : ""}`, children: value })
  ] });
}
function AccountDashboardView() {
  const accounts = list("accounts");
  const [tab, setTab] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => {
    if (tab === "all") return accounts;
    if (tab === "current") return accounts.filter((a) => a.accountType === "Al-Wadeeah Current");
    if (tab === "savings") return accounts.filter((a) => a.accountType !== "Al-Wadeeah Current");
    return accounts;
  }, [accounts, tab]);
  const totalBDT = reactExports.useMemo(() => {
    return accounts.filter((a) => a.currency === "BDT").reduce((acc, a) => acc + Number(a.balance || 0), 0);
  }, [accounts]);
  const totalUSD = reactExports.useMemo(() => {
    return accounts.filter((a) => a.currency === "USD").reduce((acc, a) => acc + Number(a.balance || 0), 0);
  }, [accounts]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "hover:text-navy", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Accounts & Investments" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-start justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold font-bold", children: "Shahjalal Islami Bank PLC" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-navy mt-0.5", children: "Account Management & Statements" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-2xl", children: "Real-time balance inquiry, transaction history ledger, and SWIFT-compliant bank statement downloads." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5 text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Total Local Currency Bal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl mt-2 text-navy font-bold", children: [
            "BDT ",
            totalBDT.toLocaleString("en-US", {
              minimumFractionDigits: 2
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: "Across BDT Accounts" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-navy/10 text-navy grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-5 h-5 text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Total FCY Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl mt-2 text-navy font-bold", children: [
            "USD ",
            totalUSD.toLocaleString("en-US", {
              minimumFractionDigits: 2
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: "Across OBU Accounts" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 flex items-start gap-4 col-span-1 sm:col-span-2 lg:col-span-1 bg-gold/[0.04] border-gold/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-gold/10 text-gold grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Shariah-Compliance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg mt-2 text-foreground font-semibold", children: "Al-Wadeeah & Mudaraba" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1 leading-normal", children: "Accounts strictly adhere to Islamic profit-sharing ratios and non-interest pooling." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: tab, onValueChange: setTab, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 bg-card p-3 rounded-lg border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "all", children: [
            "All Accounts (",
            accounts.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "current", children: "Current Accounts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "savings", children: "Savings & SND" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 mr-2" }),
            " Profit Rates"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Mudaraba Weightages & Profit Rates" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Shahjalal Islami Bank PLC declared provisional profit sharing ratios for the current month." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Account Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gold", children: "Weightage / Ratio" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mudaraba Savings (Corporate)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "45% (Customer) : 55% (Bank)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Special Notice Deposit (SND)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "30% (Customer) : 70% (Bank)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mudaraba Term Deposit (1 Month)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1.10 weightage" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mudaraba Term Deposit (12 Month)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1.35 weightage" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "w-full", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", onClick: (e) => {
              e.preventDefault();
              toast.success("Weightages brochure downloaded.");
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
              " Download Brochure (PDF)"
            ] }) }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((acc) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 flex flex-col justify-between hover:border-gold/50 transition-colors border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold tracking-wider text-muted-foreground", children: acc.accountType }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-navy line-clamp-1 mt-0.5", children: acc.accountName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: acc.currency === "BDT" ? "bg-navy/5 text-navy border-navy/20" : "bg-gold/5 text-gold border-gold/20", children: acc.currency })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
                "A/C: ",
                acc.accountNo
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-2xl font-display font-bold text-foreground", children: [
                acc.currency,
                " ",
                Number(acc.balance).toLocaleString("en-US", {
                  minimumFractionDigits: 2
                })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground mt-1 flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Available:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  acc.currency,
                  " ",
                  Number(acc.availableBalance).toLocaleString("en-US", {
                    minimumFractionDigits: 2
                  })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-4 border-t border-border flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: acc.branchName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "text-gold hover:text-gold/80 hover:bg-gold/5 text-xs gap-1.5 p-0 h-auto", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/$", params: {
              _splat: `accounts/view/${acc.id}`
            }, children: [
              "View Statement ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ] }) })
          ] })
        ] }, acc.id);
      }) })
    ] })
  ] });
}
function AccountStatementView({
  record
}) {
  const navigate = useNavigate();
  const [query, setQuery] = reactExports.useState("");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [dateRange, setDateRange] = reactExports.useState("all");
  const [showCertDialog, setShowCertDialog] = reactExports.useState(false);
  const [certPurpose, setCertPurpose] = reactExports.useState("");
  const [certBranch, setCertBranch] = reactExports.useState("");
  const [showDownloadDialog, setShowDownloadDialog] = reactExports.useState(false);
  const [downloadFormat, setDownloadFormat] = reactExports.useState("PDF");
  const [downloadPeriod, setDownloadPeriod] = reactExports.useState("30days");
  const allTransactions = reactExports.useMemo(() => {
    return getTransactionsForAccount(record.accountNo);
  }, [record.accountNo]);
  const transactions = reactExports.useMemo(() => {
    let list2 = [...allTransactions];
    if (typeFilter === "credit") {
      list2 = list2.filter((t) => t.type === "Credit");
    } else if (typeFilter === "debit") {
      list2 = list2.filter((t) => t.type === "Debit");
    }
    if (dateRange === "7days") {
      const boundary = /* @__PURE__ */ new Date("2026-06-08T00:00:00Z");
      list2 = list2.filter((t) => new Date(t.date) >= boundary);
    } else if (dateRange === "30days") {
      const boundary = /* @__PURE__ */ new Date("2026-05-16T00:00:00Z");
      list2 = list2.filter((t) => new Date(t.date) >= boundary);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list2 = list2.filter((t) => t.description.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || t.reference.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    return list2;
  }, [allTransactions, query, typeFilter, dateRange]);
  const stats = reactExports.useMemo(() => {
    let inflow = 0;
    let outflow = 0;
    transactions.forEach((t) => {
      if (t.type === "Credit") inflow += t.amount;
      else outflow += t.amount;
    });
    return {
      inflow,
      outflow,
      net: inflow - outflow
    };
  }, [transactions]);
  function handleRequestCertificate(e) {
    e.preventDefault();
    if (!certPurpose || !certBranch) {
      toast.error("Please fill in all details");
      return;
    }
    const session = getSession();
    const maker = session?.username || "maker";
    const appRows = JSON.parse(localStorage.getItem(`sjibl.ctb.v2.approval`) || "[]");
    const newApproval = {
      id: `TXN-${Math.floor(1e4 + Math.random() * 9e4)}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "Pending",
      ref: record.id,
      moduleTitle: "Accounts & Investments",
      details: `Request Balance Certificate for A/C ${record.accountNo} (Purpose: ${certPurpose}, Delivery: ${certBranch})`,
      maker,
      risk: "Low",
      amount: 0,
      sourceSlug: "accounts",
      remarks: "Awaiting Checker verification for signature and issuance."
    };
    appRows.unshift(newApproval);
    localStorage.setItem(`sjibl.ctb.v2.approval`, JSON.stringify(appRows));
    toast.success("Balance Certificate request submitted to Approval Queue!");
    setShowCertDialog(false);
    setCertPurpose("");
    setCertBranch("");
  }
  function handleDownloadStatement() {
    let filteredTxs = [...allTransactions];
    if (downloadPeriod === "7days") {
      const boundary = /* @__PURE__ */ new Date("2026-06-08T00:00:00Z");
      filteredTxs = filteredTxs.filter((t) => new Date(t.date) >= boundary);
    } else if (downloadPeriod === "30days") {
      const boundary = /* @__PURE__ */ new Date("2026-05-16T00:00:00Z");
      filteredTxs = filteredTxs.filter((t) => new Date(t.date) >= boundary);
    }
    if (downloadFormat === "CSV") {
      downloadCSV(record.accountNo, filteredTxs);
    } else if (downloadFormat === "MT940") {
      downloadMT940(record.accountNo, filteredTxs);
    } else {
      downloadPDF(record.accountNo, record.accountName, record.accountType, record.balance, filteredTxs);
    }
    toast.success(`Bank Statement downloaded successfully in ${downloadFormat} format!`);
    setShowDownloadDialog(false);
  }
  const isMudaraba = record.accountType.includes("Mudaraba") || record.accountType.includes("Deposit") || record.accountType.includes("Notice");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "hover:text-navy", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/$", params: {
        _splat: "accounts"
      }, className: "hover:text-navy", children: "Accounts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono", children: record.accountNo })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => navigate({
          to: "/app/$",
          params: {
            _splat: "accounts"
          }
        }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold font-bold", children: record.accountType }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-navy mt-0.5", children: record.accountName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground mt-1", children: [
            "Account No: ",
            record.accountNo,
            " · Branch: ",
            record.branchName
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: showDownloadDialog, onOpenChange: setShowDownloadDialog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-navy text-navy-foreground hover:bg-navy/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
            " Download Statement"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Generate Bank Statement" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Configure date range and export format. Sourced securely from core ledger." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "period", children: "Statement Period" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: downloadPeriod, onValueChange: setDownloadPeriod, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "period", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select Period" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "7days", children: "Last 7 Days (Jun 08 - Present)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "30days", children: "Last 30 Days (May 16 - Present)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Full History" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "format", children: "File Format" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: downloadFormat, onValueChange: setDownloadFormat, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "format", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select Format" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "PDF", children: "PDF Ledger Report (.txt)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "CSV", children: "Excel CSV Spreadsheet (.csv)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "MT940", children: "MT940 SWIFT Statement (.sta)" })
                  ] })
                ] }),
                downloadFormat === "MT940" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground bg-muted p-2 rounded leading-relaxed", children: "MT940 statements follow SWIFT MT940 specifications, matching account, sequence numbers, field :60F, :61, :86, and :62F for ERP reconciliation." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowDownloadDialog(false), children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleDownloadStatement, className: "bg-gold text-gold-foreground hover:bg-gold/90", children: "Generate & Download" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: showCertDialog, onOpenChange: setShowCertDialog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 mr-2" }),
            " Request Balance Certificate"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRequestCertificate, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Request Balance Certificate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Submit a request to issue an official balance certificate signed by branch managers." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "purpose", children: "Purpose of Certificate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: certPurpose, onValueChange: setCertPurpose, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "purpose", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select Purpose" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Audit Verification", children: "Corporate Audit Verification" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Visa / Embassy", children: "Embassy / Visa Application" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Credit Facilities", children: "Credit Rating / Facilities" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "General Reference", children: "General Reference" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "branch", children: "Delivery Branch" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: certBranch, onValueChange: setCertBranch, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "branch", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select Collection Branch" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Dilkusha Branch", children: "Dilkusha Branch (Dhaka)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Motijheel Branch", children: "Motijheel Corporate Branch" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Gulshan Branch", children: "Gulshan Branch" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Uttara Branch", children: "Uttara Branch" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setShowCertDialog(false), children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "bg-navy text-navy-foreground hover:bg-navy/90", children: "Submit Request" })
            ] })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Ledger Balance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold font-mono mt-1 text-navy", children: [
              record.currency,
              " ",
              Number(record.balance).toLocaleString("en-US", {
                minimumFractionDigits: 2
              })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Available Balance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold font-mono mt-1 text-foreground", children: [
              record.currency,
              " ",
              Number(record.availableBalance).toLocaleString("en-US", {
                minimumFractionDigits: 2
              })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Branch & BIC" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold mt-1 truncate", children: record.branchName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground", children: [
              "BIC: ",
              record.swiftCode
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4", children: "Statement Statistics (Filtered View)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-r border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total Inflows" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm sm:text-base md:text-lg font-bold font-mono text-success flex justify-center items-center gap-1 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-4 h-4 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  record.currency,
                  " ",
                  stats.inflow.toLocaleString("en-US", {
                    minimumFractionDigits: 2
                  })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-r border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total Outflows" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm sm:text-base md:text-lg font-bold font-mono text-destructive flex justify-center items-center gap-1 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  record.currency,
                  " ",
                  stats.outflow.toLocaleString("en-US", {
                    minimumFractionDigits: 2
                  })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Net Ledger Change" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-sm sm:text-base md:text-lg font-bold font-mono flex justify-center items-center gap-1 mt-1 ${stats.net >= 0 ? "text-navy" : "text-destructive"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                stats.net >= 0 ? "+" : "",
                record.currency,
                " ",
                stats.net.toLocaleString("en-US", {
                  minimumFractionDigits: 2
                })
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xs flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search ledger...", value: query, onChange: (e) => setQuery(e.target.value), className: "pl-9" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: typeFilter, onValueChange: setTypeFilter, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-28 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Txns" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Txns" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "credit", children: "Credits (In)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "debit", children: "Debits (Out)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: dateRange, onValueChange: setDateRange, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-32 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Period" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All History" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "7days", children: "Last 7 Days" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "30days", children: "Last 30 Days" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-md overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Reference ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Narration / Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Balance" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: transactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center text-sm text-muted-foreground py-10", children: "No transactions found matching filters." }) }) : transactions.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs whitespace-nowrap", children: t.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-muted-foreground whitespace-nowrap", children: t.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm font-medium", children: t.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] uppercase font-semibold", children: t.category }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: `text-right font-mono font-semibold whitespace-nowrap ${t.type === "Credit" ? "text-success" : "text-destructive"}`, children: [
                t.type === "Credit" ? "+" : "-",
                Number(t.amount).toLocaleString("en-US", {
                  minimumFractionDigits: 2
                })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono text-xs whitespace-nowrap", children: Number(t.balanceAfter).toLocaleString("en-US", {
                minimumFractionDigits: 2
              }) })
            ] }, t.id)) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-navy", children: "Account Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Routing Number:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: record.routingNumber })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "SWIFT BIC Code:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: record.swiftCode })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-1.5 font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-sans", children: "IBAN Number:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold truncate max-w-[150px]", title: `BD99SJIB000${record.accountNo}`, children: [
                "BD99SJIB000",
                record.accountNo
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Account Status:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-success flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                " Active"
              ] })
            ] })
          ] })
        ] }),
        isMudaraba ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 border-gold bg-gold/[0.04] space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-5 h-5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-navy", children: "Mudaraba Account Details" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-normal", children: "This account operates under the Mudaraba principle, where the customer acts as a capital provider (Sahib-al-Maal) and the bank acts as a manager (Mudarib)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs space-y-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-gold/20 pb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Profit sharing ratio:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "45% Customer : 55% Bank" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-gold/20 pb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Declared weightage:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "0.45 weightage" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-gold/20 pb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Distribution frequency:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Monthly Payout" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Next payout:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gold", children: "July 01, 2026" })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 border-navy/30 bg-navy/[0.02] space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-navy", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 shrink-0 text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg", children: "Al-Wadeeah Current" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-normal font-light", children: "This account is based on the Al-Wadeeah contract, acting as a safe custodianship. The bank guarantees the principal balance, and no profit is shared or distributed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs space-y-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Principal guarantee:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-success", children: "100% Guaranteed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Profit/Interest rate:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "0.00% (Interest-Free)" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function downloadCSV(accountNo, txs) {
  const headers = "Date,Transaction ID,Description,Category,Type,Amount,Running Balance,Reference\n";
  const rows = txs.map((t) => `"${t.date}","${t.id}","${t.description.replace(/"/g, '""')}","${t.category}","${t.type}",${t.amount},${t.balanceAfter},"${t.reference}"`).join("\n");
  const blob = new Blob([headers + rows], {
    type: "text/csv;charset=utf-8;"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `statement_${accountNo}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function downloadMT940(accountNo, txs) {
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().slice(2, 10).replace(/-/g, "");
  const balance = txs[0] ? txs[0].balanceAfter : 0;
  const initialBalance = txs[txs.length - 1] ? txs[txs.length - 1].balanceAfter + (txs[txs.length - 1].type === "Debit" ? txs[txs.length - 1].amount : -txs[txs.length - 1].amount) : 0;
  let mt940 = `:20:START
:25:${accountNo}
:28C:00001
:60F:C${todayStr}BDT${initialBalance.toFixed(2).replace(".", ",")}
`;
  txs.forEach((t) => {
    const txnDate = t.date.slice(2, 10).replace(/-/g, "");
    const entryDate = txnDate.slice(2);
    const typeIndicator = t.type === "Credit" ? "C" : "D";
    const amtStr = t.amount.toFixed(2).replace(".", ",");
    mt940 += `:61:${txnDate}${entryDate}${typeIndicator}${amtStr}FTRF${t.reference}//${t.id}
:86:${t.description.toUpperCase()}
`;
  });
  mt940 += `:62F:C${todayStr}BDT${balance.toFixed(2).replace(".", ",")}
`;
  const blob = new Blob([mt940], {
    type: "text/plain;charset=utf-8;"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `MT940_${accountNo}_${todayStr}.sta`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function downloadPDF(accountNo, accountName, type, balance, txs) {
  let text = `SHAHJALAL ISLAMI BANK PLC
CORPORATE TRANSACTION BANKING STATEMENT
`;
  text += `========================================================================
`;
  text += `Account Name: ${accountName}
`;
  text += `Account Number: ${accountNo}
`;
  text += `Account Type: ${type}
`;
  text += `Current Balance: BDT ${balance.toLocaleString()}
`;
  text += `Statement Date: ${(/* @__PURE__ */ new Date()).toLocaleString()}
`;
  text += `========================================================================

`;
  text += `DATE        TXN ID      TYPE     AMOUNT            BALANCE           NARRATION
`;
  text += `------------------------------------------------------------------------
`;
  txs.forEach((t) => {
    const amt = (t.type === "Credit" ? "+" : "-") + t.amount.toLocaleString().padStart(12);
    const bal = t.balanceAfter.toLocaleString().padStart(12);
    text += `${t.date}  ${t.id.padEnd(10)}  ${t.type.padEnd(6)}  ${amt.padEnd(16)}  ${bal.padEnd(16)}  ${t.description.slice(0, 40)}
`;
  });
  const blob = new Blob([text], {
    type: "text/plain;charset=utf-8;"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `statement_${accountNo}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.txt`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function InvestmentDashboardView() {
  const facilities = list("investment");
  const [tab, setTab] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => {
    if (tab === "all") return facilities;
    if (tab === "murabaha") return facilities.filter((f) => f.facilityType === "Bai-Murabaha");
    if (tab === "hpsm") return facilities.filter((f) => f.facilityType.includes("HPSM"));
    return facilities;
  }, [facilities, tab]);
  const stats = reactExports.useMemo(() => {
    let limit = 0;
    let outstanding = 0;
    facilities.forEach((f) => {
      limit += Number(f.limitAmount || 0);
      outstanding += Number(f.outstandingAmount || 0);
    });
    return {
      limit,
      outstanding,
      available: limit - outstanding
    };
  }, [facilities]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "hover:text-navy", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Investments" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-start justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold font-bold", children: "Shahjalal Islami Bank PLC" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-navy mt-0.5", children: "Corporate Investment Facilities" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-2xl", children: "Monitor approved funded and non-funded Islamic credit limits, trace outstanding drawdowns, and request vendor disbursements." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Total Approved limits" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold font-mono text-navy mt-2", children: [
          "BDT ",
          stats.limit.toLocaleString("en-US", {
            minimumFractionDigits: 2
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: "Funded & Non-Funded limits" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Total Outstanding" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold font-mono text-destructive mt-2", children: [
          "BDT ",
          stats.outstanding.toLocaleString("en-US", {
            minimumFractionDigits: 2
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground mt-1", children: [
          stats.limit > 0 ? (stats.outstanding / stats.limit * 100).toFixed(1) : 0,
          "% Limit Utilization"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Total Available limit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold font-mono text-success mt-2", children: [
          "BDT ",
          stats.available.toLocaleString("en-US", {
            minimumFractionDigits: 2
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: "Available for Payout Drawdown" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground font-bold", children: "Facility Limit Utilization" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 text-xs", children: facilities.map((f) => {
        const pct = Math.min(100, Math.round(Number(f.outstandingAmount) / Number(f.limitAmount) * 100));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              f.facilityNo,
              " (",
              f.facilityType,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              pct,
              "% Utilized (",
              Number(f.outstandingAmount).toLocaleString(),
              " / ",
              Number(f.limitAmount).toLocaleString(),
              " BDT)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 rounded bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded transition-all duration-300 ${pct > 80 ? "bg-destructive" : pct > 50 ? "bg-gold" : "bg-navy"}`, style: {
            width: `${pct}%`
          } }) })
        ] }, f.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: tab, onValueChange: setTab, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "all", children: [
          "All Limits (",
          facilities.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "murabaha", children: "Murabaha Limits" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "hpsm", children: "HPSM Limits" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: filtered.map((fac) => {
        const avail = Number(fac.limitAmount) - Number(fac.outstandingAmount);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 flex flex-col justify-between hover:border-gold/50 transition-colors border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold tracking-wider text-gold font-bold", children: fac.facilityType }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-navy mt-0.5", children: fac.facilityNo })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: fac.status === "Approved" ? "bg-success/5 text-success border-success/20" : "bg-warning/5 text-warning border-warning/20", children: fac.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Approved Limit:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold font-mono text-sm mt-0.5", children: [
                  "BDT ",
                  Number(fac.limitAmount).toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Outstanding:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold font-mono text-sm mt-0.5 text-destructive", children: [
                  "BDT ",
                  Number(fac.outstandingAmount).toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Available Room:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold font-mono text-sm mt-0.5 text-success", children: [
                  "BDT ",
                  avail.toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Markup Profit:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold font-mono text-sm mt-0.5", children: [
                  fac.profitRate,
                  "% p.a."
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-4 border-t border-border flex justify-between items-center text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "Expires: ",
              fac.expiryDate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "text-gold hover:text-gold/80 hover:bg-gold/5 text-xs gap-1.5 p-0 h-auto font-semibold", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/$", params: {
              _splat: `investment/view/${fac.id}`
            }, children: [
              "View Facility Statement ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ] }) })
          ] })
        ] }, fac.id);
      }) })
    ] })
  ] });
}
function InvestmentFacilityView({
  record
}) {
  const navigate = useNavigate();
  const [query, setQuery] = reactExports.useState("");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [showRequestDialog, setShowRequestDialog] = reactExports.useState(false);
  const [reqVendor, setReqVendor] = reactExports.useState("");
  const [reqInvoice, setReqInvoice] = reactExports.useState("");
  const [reqAmount, setReqAmount] = reactExports.useState("");
  const [reqRemarks, setReqRemarks] = reactExports.useState("");
  const ledger = reactExports.useMemo(() => {
    return getInvestmentTransactions(record.facilityNo);
  }, [record.facilityNo]);
  const transactions = reactExports.useMemo(() => {
    let list2 = [...ledger];
    if (typeFilter === "disbursement") {
      list2 = list2.filter((t) => t.type === "Disbursement");
    } else if (typeFilter === "repayment") {
      list2 = list2.filter((t) => t.type === "Repayment");
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list2 = list2.filter((t) => t.description.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || t.reference.toLowerCase().includes(q));
    }
    return list2;
  }, [ledger, query, typeFilter]);
  reactExports.useMemo(() => {
    let disbursements = 0;
    let repayments = 0;
    transactions.forEach((t) => {
      if (t.type === "Disbursement") disbursements += t.amount;
      else repayments += t.amount;
    });
    return {
      disbursements,
      repayments
    };
  }, [transactions]);
  function handleRequestDisbursement(e) {
    e.preventDefault();
    if (!reqVendor || !reqAmount) {
      toast.error("Please fill in Vendor and Amount");
      return;
    }
    const amtNum = parseFloat(reqAmount);
    if (isNaN(amtNum) || amtNum <= 0) {
      toast.error("Invalid amount");
      return;
    }
    const avail = Number(record.limitAmount) - Number(record.outstandingAmount);
    if (amtNum > avail) {
      toast.error("Disbursement amount exceeds available headroom");
      return;
    }
    const session = getSession();
    const maker = session?.username || "maker";
    const appRows = JSON.parse(localStorage.getItem(`sjibl.ctb.v2.approval`) || "[]");
    const newApproval = {
      id: `TXN-${Math.floor(1e4 + Math.random() * 9e4)}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "Pending",
      ref: record.id,
      moduleTitle: "Investment (Finance/Credit)",
      details: `Request Disbursement BDT ${amtNum.toLocaleString()} to ${reqVendor} (Limit: ${record.facilityNo}, Ref: ${reqInvoice || "N/A"})`,
      maker,
      risk: amtNum >= 1e7 ? "High" : amtNum >= 1e6 ? "Medium" : "Low",
      amount: amtNum,
      sourceSlug: "investment",
      remarks: "Awaiting Checker verification of supplier proforma invoice and delivery receipt."
    };
    appRows.unshift(newApproval);
    localStorage.setItem(`sjibl.ctb.v2.approval`, JSON.stringify(appRows));
    toast.success("Disbursement request queued for Maker-Checker approval!");
    setShowRequestDialog(false);
    setReqVendor("");
    setReqInvoice("");
    setReqAmount("");
    setReqRemarks("");
  }
  function handleDownloadStatement(format) {
    if (format === "CSV") {
      downloadInvestmentCSV(record.facilityNo, ledger);
    } else {
      downloadInvestmentPDF(record.facilityNo, record.facilityType, Number(record.limitAmount), Number(record.outstandingAmount), ledger);
    }
    toast.success(`Facility Statement downloaded successfully in ${format} format!`);
  }
  const isMurabaha = record.facilityType === "Bai-Murabaha";
  const available = Number(record.limitAmount) - Number(record.outstandingAmount);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "hover:text-navy", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/$", params: {
        _splat: "investment"
      }, className: "hover:text-navy", children: "Investments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono", children: record.facilityNo })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => navigate({
          to: "/app/$",
          params: {
            _splat: "investment"
          }
        }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold font-bold", children: record.facilityType }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-navy mt-0.5", children: record.facilityNo }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Approved limit: BDT ",
            Number(record.limitAmount).toLocaleString(),
            " · Markup rate: ",
            record.profitRate,
            "% p.a."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
            " Download Statement"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-sm font-bold", children: "Export Statement" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-xs", children: "Choose formatting for statement download." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleDownloadStatement("PDF"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 mr-2 text-destructive" }),
                " PDF Format (.txt)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleDownloadStatement("CSV"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "w-4 h-4 mr-2 text-success" }),
                " Excel CSV (.csv)"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: showRequestDialog, onOpenChange: setShowRequestDialog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-navy text-navy-foreground hover:bg-navy/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            " ",
            isMurabaha ? "Request Procurement" : "Request Drawdown"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRequestDisbursement, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: isMurabaha ? "Request Murabaha Procurement Payout" : "Request Lease Drawdown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Submit supplier proforma invoice to disburse funds from the approved headroom." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vendor", children: "Supplier / Vendor Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "vendor", placeholder: "e.g. Steel-Works Bangladesh", value: reqVendor, onChange: (e) => setReqVendor(e.target.value), required: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "invoice", children: "Invoice / Quotation Ref" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "invoice", placeholder: "e.g. PI-9902", value: reqInvoice, onChange: (e) => setReqInvoice(e.target.value) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", children: "Disbursement BDT" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "amount", type: "number", placeholder: "Amount", value: reqAmount, onChange: (e) => setReqAmount(e.target.value), required: true })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Upload Proforma Quotation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center border border-dashed border-input hover:border-gold rounded-md p-4 cursor-pointer text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 mr-2" }),
                  " Upload proforma_invoice.pdf"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "remarks", children: "Remarks / Delivery specifications" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "remarks", placeholder: "Goods description, delivery terms", value: reqRemarks, onChange: (e) => setReqRemarks(e.target.value) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setShowRequestDialog(false), children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "bg-navy text-navy-foreground hover:bg-navy/90", children: "Submit to Checker" })
            ] })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Approved limit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold font-mono text-navy mt-1", children: [
          "BDT ",
          Number(record.limitAmount).toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Outstanding principal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold font-mono text-destructive mt-1", children: [
          "BDT ",
          Number(record.outstandingAmount).toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Available headroom" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold font-mono text-success mt-1", children: [
          "BDT ",
          available.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Facility Expiry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold mt-1.5 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-gold shrink-0" }),
          " ",
          record.expiryDate
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-navy font-bold", children: "Facility Statement Ledger" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 text-xs flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search ref...", value: query, onChange: (e) => setQuery(e.target.value), className: "pl-8 h-8 text-xs w-40" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: typeFilter, onValueChange: setTypeFilter, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-28 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All types" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All transactions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "disbursement", children: "Disbursements" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "repayment", children: "Repayments" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-md overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Reference" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Narration / Vendor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Outstanding Bal" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: transactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center text-sm text-muted-foreground py-10", children: "No transactions found." }) }) : transactions.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs whitespace-nowrap", children: t.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-muted-foreground", children: t.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm font-medium", children: t.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `text-[10px] uppercase font-semibold ${t.type === "Disbursement" ? "border-destructive text-destructive" : "border-success text-success"}`, children: t.type }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right font-mono font-semibold", children: [
              "BDT ",
              t.amount.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right font-mono text-xs", children: [
              "BDT ",
              t.balanceAfter.toLocaleString()
            ] })
          ] }, t.id)) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-navy", children: "Security & Collateral" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: record.securityDetails || "Security hypothecation of current assets and personal guarantees." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Facility Status:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-success flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                  " Active"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Insurance Cover:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Takaful covered (110%)" })
              ] })
            ] })
          ] })
        ] }),
        isMurabaha ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 border-gold bg-gold/[0.04] space-y-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-5 h-5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-navy", children: "Murabaha Principles" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Bai-Murabaha is a cost-plus sale contract. The bank purchases goods from supplier at customer's request and sells them to the customer at cost + specified markup." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 pt-2 border-t border-gold/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Markup profit rate:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                record.profitRate,
                "% p.a."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Repayment model:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Deferred lumpsum / EMI" })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 border-navy/30 bg-navy/[0.02] space-y-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-navy", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 shrink-0 text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg", children: "HPSM Principles" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Hire Purchase under Shirkatul Melk (HPSM) is a lease-to-own facility. The bank and customer jointly purchase an asset. The bank leases its share to the customer for rental, which is paid along with ownership purchase installments." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Rental rate:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                record.profitRate,
                "% p.a."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ownership transfer:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Gradual on lease end" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function downloadInvestmentCSV(facilityNo, txs) {
  const headers = "Date,Transaction ID,Description,Type,Amount,Outstanding Balance,Reference\n";
  const rows = txs.map((t) => `"${t.date}","${t.id}","${t.description.replace(/"/g, '""')}","${t.type}",${t.amount},${t.balanceAfter},"${t.reference}"`).join("\n");
  const blob = new Blob([headers + rows], {
    type: "text/csv;charset=utf-8;"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `facility_${facilityNo}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function downloadInvestmentPDF(facilityNo, type, limit, outstanding, txs) {
  let text = `SHAHJALAL ISLAMI BANK PLC
INVESTMENT FACILITY STATEMENT
`;
  text += `========================================================================
`;
  text += `Facility Number: ${facilityNo}
`;
  text += `Mode of Finance: ${type}
`;
  text += `Approved Limit: BDT ${limit.toLocaleString()}
`;
  text += `Outstanding Balance: BDT ${outstanding.toLocaleString()}
`;
  text += `Available Headroom: BDT ${(limit - outstanding).toLocaleString()}
`;
  text += `Statement Date: ${(/* @__PURE__ */ new Date()).toLocaleString()}
`;
  text += `========================================================================

`;
  text += `DATE        TXN ID      TYPE          AMOUNT            OUTSTANDING       NARRATION
`;
  text += `------------------------------------------------------------------------
`;
  txs.forEach((t) => {
    const amt = (t.type === "Disbursement" ? "+" : "-") + t.amount.toLocaleString().padStart(12);
    const bal = t.balanceAfter.toLocaleString().padStart(12);
    text += `${t.date}  ${t.id.padEnd(10)}  ${t.type.padEnd(12)}  ${amt.padEnd(16)}  ${bal.padEnd(16)}  ${t.description.slice(0, 40)}
`;
  });
  const blob = new Blob([text], {
    type: "text/plain;charset=utf-8;"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `facility_${facilityNo}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.txt`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function getEmailLogs() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("sjibl.ctb.v2.email_log");
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}
function addEmailLog(to, subject, body) {
  if (typeof window === "undefined") return;
  const logs = getEmailLogs();
  logs.unshift({
    id: `MSG-${Math.floor(1e3 + Math.random() * 9e3)}`,
    time: (/* @__PURE__ */ new Date()).toISOString(),
    to,
    subject,
    body
  });
  localStorage.setItem("sjibl.ctb.v2.email_log", JSON.stringify(logs));
}
function ApprovalDashboardView() {
  useNavigate();
  const approvals = list("approval");
  const [tab, setTab] = reactExports.useState("Pending");
  const [catFilter, setCatFilter] = reactExports.useState("all");
  const [query, setQuery] = reactExports.useState("");
  const pendingCount = reactExports.useMemo(() => approvals.filter((a) => a.status === "Pending").length, [approvals]);
  const approvedCount = reactExports.useMemo(() => approvals.filter((a) => a.status === "Approved").length, [approvals]);
  const rejectedCount = reactExports.useMemo(() => approvals.filter((a) => a.status === "Rejected").length, [approvals]);
  const totalPendingBDT = reactExports.useMemo(() => {
    return approvals.filter((a) => a.status === "Pending").reduce((acc, a) => acc + Number(a.amount || 0), 0);
  }, [approvals]);
  const highRiskCount = reactExports.useMemo(() => {
    return approvals.filter((a) => a.status === "Pending" && a.risk === "High").length;
  }, [approvals]);
  const catTransfers = reactExports.useMemo(() => {
    return approvals.filter((a) => a.status === "Pending" && (a.sourceSlug === "fund-transfer" || a.sourceSlug === "bulk-transfer" || a.sourceSlug === "bill-pay"));
  }, [approvals]);
  const catTrade = reactExports.useMemo(() => {
    return approvals.filter((a) => a.status === "Pending" && (a.sourceSlug === "lc-initiation" || a.sourceSlug === "import-bill" || a.sourceSlug === "murabaha"));
  }, [approvals]);
  const catZakat = reactExports.useMemo(() => {
    return approvals.filter((a) => a.status === "Pending" && a.sourceSlug === "zakat");
  }, [approvals]);
  const catOther = reactExports.useMemo(() => {
    return approvals.filter((a) => a.status === "Pending" && !["fund-transfer", "bulk-transfer", "bill-pay", "lc-initiation", "import-bill", "murabaha", "zakat"].includes(String(a.sourceSlug)));
  }, [approvals]);
  const filtered = reactExports.useMemo(() => {
    let list2 = approvals.filter((a) => a.status === tab);
    if (tab === "Pending") {
      if (catFilter === "transfers") {
        list2 = catTransfers;
      } else if (catFilter === "trade") {
        list2 = catTrade;
      } else if (catFilter === "zakat") {
        list2 = catZakat;
      } else if (catFilter === "other") {
        list2 = catOther;
      }
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list2 = list2.filter((a) => String(a.ref || "").toLowerCase().includes(q) || String(a.details || "").toLowerCase().includes(q) || String(a.maker || "").toLowerCase().includes(q) || String(a.moduleTitle || "").toLowerCase().includes(q));
    }
    return list2;
  }, [approvals, tab, catFilter, query, catTransfers, catTrade, catZakat, catOther]);
  const emailLogs = getEmailLogs().slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "hover:text-navy", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Approvals" })
    ] }),
    pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: "Pending Authorizations Required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-1 text-destructive/80 leading-normal", children: [
          "You have ",
          pendingCount,
          " transaction requests awaiting Maker-Checker authorization. Failure to authorize in time may cancel the value date rate lock."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-start justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold font-bold font-bold", children: "Checker Workspace" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-navy mt-0.5", children: "Corporate Approval Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-2xl", children: "Review and sign pending payouts, trade transactions, and corporate requests using multi-factor OTP validation." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Pending Requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold font-mono text-navy mt-2", children: pendingCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: "Awaiting checker action" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Total Pending Value" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl sm:text-3xl font-bold font-mono text-foreground mt-2 truncate", children: [
          "BDT ",
          totalPendingBDT.toLocaleString("en-US", {
            minimumFractionDigits: 2
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: "Sum of pending transfers/L/Cs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 border-destructive bg-destructive/[0.02]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "High Risk Alerts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold font-mono text-destructive mt-2", children: highRiskCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: "Requests over BDT 10,000,000 / L/Cs" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground font-bold", children: "Payment Type-Wise Summaries" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `p-4 cursor-pointer hover:border-gold/50 transition-colors ${catFilter === "transfers" ? "border-gold bg-gold/[0.02]" : "border-border"}`, onClick: () => setCatFilter(catFilter === "transfers" ? "all" : "transfers"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-navy", children: "Transfers & Bill Pay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-navy/10 text-navy hover:bg-navy/10", children: catTransfers.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-base lg:text-lg font-bold font-mono truncate", children: [
            "BDT ",
            catTransfers.reduce((acc, a) => acc + Number(a.amount || 0), 0).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "Fund transfers, Bulk files, Utility" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `p-4 cursor-pointer hover:border-gold/50 transition-colors ${catFilter === "trade" ? "border-gold bg-gold/[0.02]" : "border-border"}`, onClick: () => setCatFilter(catFilter === "trade" ? "all" : "trade"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-navy", children: "Trade & Murabaha" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gold/10 text-gold hover:bg-gold/10", children: catTrade.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-base lg:text-lg font-bold font-mono truncate", children: [
            "BDT ",
            catTrade.reduce((acc, a) => acc + Number(a.amount || 0), 0).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "LC application, Murabaha, Import bills" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `p-4 cursor-pointer hover:border-gold/50 transition-colors ${catFilter === "zakat" ? "border-gold bg-gold/[0.02]" : "border-border"}`, onClick: () => setCatFilter(catFilter === "zakat" ? "all" : "zakat"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-navy", children: "Zakat & CSR Port" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-navy/10 text-navy hover:bg-navy/10", children: catZakat.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-base lg:text-lg font-bold font-mono truncate", children: [
            "BDT ",
            catZakat.reduce((acc, a) => acc + Number(a.amount || 0), 0).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "Islamic charity, CSR payouts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `p-4 cursor-pointer hover:border-gold/50 transition-colors ${catFilter === "other" ? "border-gold bg-gold/[0.02]" : "border-border"}`, onClick: () => setCatFilter(catFilter === "other" ? "all" : "other"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-navy", children: "Other Requests" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-muted-foreground/10 text-muted-foreground hover:bg-muted-foreground/10", children: catOther.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-base lg:text-lg font-bold font-mono truncate", children: [
            "BDT ",
            catOther.reduce((acc, a) => acc + Number(a.amount || 0), 0).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "Certificates, Beneficiary Maker, Admin" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: tab, onValueChange: (t) => {
      setTab(t);
      setCatFilter("all");
    }, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 bg-card p-3 rounded-lg border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "Pending", children: [
            "Pending Action (",
            pendingCount,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "Approved", children: [
            "Approved Requests (",
            approvedCount,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "Rejected", children: [
            "Rejected Requests (",
            rejectedCount,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xs flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search approvals...", value: query, onChange: (e) => setQuery(e.target.value), className: "pl-9 h-9" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-md overflow-hidden bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Reference" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Submission" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Module" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Description / details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Maker" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Risk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 8, className: "text-center text-sm text-muted-foreground py-10", children: "No approval requests found matching filters." }) }) : filtered.map((app) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-navy font-semibold", children: app.ref }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs whitespace-nowrap", children: new Date(app.createdAt).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs font-medium", children: app.moduleTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm font-semibold max-w-sm truncate", children: app.details }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: app.maker }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: app.risk === "High" ? "border-destructive text-destructive" : app.risk === "Medium" ? "border-warning text-warning" : "border-muted-foreground text-muted-foreground", children: app.risk }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono font-semibold", children: app.amount > 0 ? `BDT ${app.amount.toLocaleString()}` : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "text-gold hover:text-gold/80 hover:bg-gold/5 font-semibold", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/$", params: {
              _splat: `approval/view/${app.id}`
            }, children: tab === "Pending" ? "Review & Sign" : "View Details" }) }) })
          ] }, app.id);
        }) })
      ] }) })
    ] }),
    emailLogs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground font-bold", children: "Notification Alert Log (Checker Dispatch)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gold text-gold-foreground font-semibold", children: "Live SMTP Alerts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 text-xs font-mono", children: emailLogs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted rounded border border-border space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground border-b border-border pb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "ID: ",
            log.id,
            " · ",
            new Date(log.time).toLocaleTimeString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-success font-semibold flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
            " Emailed to Maker"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-navy font-sans", children: "To:" }),
          " ",
          log.to
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-navy font-sans", children: "Subject:" }),
          " ",
          log.subject
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground mt-1 text-xs pt-1 leading-normal font-sans italic bg-card p-2 rounded", children: log.body })
      ] }, log.id)) })
    ] })
  ] });
}
function ApprovalDetailView({
  record
}) {
  const navigate = useNavigate();
  const [showOtpDialog, setShowOtpDialog] = reactExports.useState(false);
  const [otpCode, setOtpCode] = reactExports.useState("");
  const [actionType, setActionType] = reactExports.useState("Approve");
  const sourceRecord = reactExports.useMemo(() => {
    if (record.sourceSlug && record.ref) {
      return get(record.sourceSlug, record.ref);
    }
    return null;
  }, [record.sourceSlug, record.ref]);
  const sourceSchema = reactExports.useMemo(() => {
    if (record.sourceSlug) {
      return getSchema(record.sourceSlug);
    }
    return null;
  }, [record.sourceSlug]);
  function handleActionSubmit(e) {
    e.preventDefault();
    if (otpCode !== "123456") {
      toast.error("Invalid OTP Code. Please use test code 123456.");
      return;
    }
    const finalStatus = actionType === "Approve" ? "Approved" : "Rejected";
    update("approval", record.id, {
      status: finalStatus
    });
    const mailTo = `${record.maker || "maker"}@globex.bd`;
    const mailSubject = `Corporate Transaction Action Alert: ${finalStatus} Reference ${record.ref}`;
    const mailBody = `Dear Maker, 

Your submitted transaction of BDT ${record.amount.toLocaleString()} (Reference Ref: ${record.ref}) under the ${record.moduleTitle} module has been ${finalStatus.toUpperCase()} by rashed.c (Checker) on ${(/* @__PURE__ */ new Date()).toLocaleString()}.

Remarks: Checked and validated.

Shahjalal Islami Bank PLC.`;
    addEmailLog(mailTo, mailSubject, mailBody);
    toast.success(`Transaction successfully ${finalStatus.toLowerCase()} and Maker notified via email!`);
    setShowOtpDialog(false);
    setOtpCode("");
    navigate({
      to: "/app/$",
      params: {
        _splat: "approval"
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "hover:text-navy", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/$", params: {
        _splat: "approval"
      }, className: "hover:text-navy", children: "Approvals" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono", children: record.ref })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => navigate({
          to: "/app/$",
          params: {
            _splat: "approval"
          }
        }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold font-bold", children: record.moduleTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-navy mt-0.5", children: "Authorize Request" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
              "ID: ",
              record.ref
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: record.risk === "High" ? "border-destructive text-destructive" : record.risk === "Medium" ? "border-warning text-warning" : "border-muted-foreground text-muted-foreground", children: [
              record.risk,
              " Risk"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: record.status === "Approved" ? "border-success text-success" : record.status === "Rejected" ? "border-destructive text-destructive" : "border-warning text-warning", children: record.status })
          ] })
        ] })
      ] }),
      record.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "border-destructive text-destructive hover:bg-destructive/10", onClick: () => {
          setActionType("Reject");
          setShowOtpDialog(true);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-2" }),
          " Reject Payout"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-navy text-navy-foreground hover:bg-navy/90", onClick: () => {
          setActionType("Approve");
          setShowOtpDialog(true);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }),
          " Approve & Sign"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showOtpDialog, onOpenChange: setShowOtpDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleActionSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: actionType === "Approve" ? "Approve Transaction Request" : "Reject Transaction Request" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-xs", children: "To confirm the checker action, please enter the One-Time Passcode sent to rashed.c (Checker) verified email." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 py-3 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "otp", children: "Enter 6-Digit Passcode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "otp", type: "password", placeholder: "e.g. 123456", maxLength: 6, className: "text-center font-mono text-xl tracking-[0.2em] font-semibold h-11", value: otpCode, onChange: (e) => setOtpCode(e.target.value), required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground text-center bg-muted py-1 rounded font-mono", children: "Demo bypass helper: Use passcode 123456" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setShowOtpDialog(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: actionType === "Approve" ? "bg-success text-success-foreground hover:bg-success/90" : "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: [
          "Confirm ",
          actionType
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-navy", children: "Review Summary details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-muted/40 rounded-lg text-sm leading-relaxed text-foreground", children: record.details }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-4 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground uppercase tracking-wider text-[10px]", children: "Requested By (Maker)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-semibold text-sm mt-0.5", children: record.maker })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground uppercase tracking-wider text-[10px]", children: "Submission Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-semibold text-sm mt-0.5", children: new Date(record.createdAt).toLocaleString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground uppercase tracking-wider text-[10px]", children: "Maker Remarks" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-semibold text-sm mt-0.5 bg-muted/20 p-2.5 rounded border leading-relaxed", children: record.remarks || "No supplementary maker remarks provided." })
            ] })
          ] })
        ] }),
        sourceRecord && sourceSchema && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-navy mb-4", children: "Underlying Record Metadata" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs", children: sourceSchema.fields.map((f) => {
            const val = sourceRecord[f.name];
            if (val === void 0 || val === null || val === "") return null;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: f.span === 2 ? "sm:col-span-2" : "", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: f.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: `mt-1 font-semibold text-sm ${f.type === "amount" ? "font-mono" : ""} ${f.type === "textarea" ? "whitespace-pre-wrap leading-relaxed" : ""}`, children: f.type === "amount" ? `BDT ${Number(val).toLocaleString()}` : String(val) })
            ] }, f.name);
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-navy", children: "Checker Policy ENT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs space-y-3 text-muted-foreground leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "In compliance with bank Shariah Maker-Checker dual authorization protocols, high-risk requests (Trade and transactions BDT > 1,000,000) require approval signatures." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Checker entitlements are verified against Entitlement List upon OTP signing." })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ModuleRouter as component
};
