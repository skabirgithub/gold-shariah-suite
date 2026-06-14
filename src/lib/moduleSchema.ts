// Per-module form & list field definitions.
// Drives Create / Edit / View / List pages for every module.

export type FieldType =
  | "text" | "number" | "amount" | "date" | "textarea"
  | "select" | "email" | "tel" | "file";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];        // for select
  placeholder?: string;
  span?: 1 | 2;              // grid span
  hint?: string;
};

export type ModuleSchema = {
  /** Singular noun for "New X", "Edit X" */
  singular: string;
  /** Primary key column shown in list table */
  idLabel?: string;
  /** Columns to show in the list table; first field name = title link */
  listColumns: { name: string; label: string; align?: "left" | "right" }[];
  /** Form fields used for create & edit */
  fields: FieldDef[];
  /** Whether records can be created from UI (false → read-only module) */
  canCreate?: boolean;
};

const STATUS = ["Draft", "Pending", "Approved", "Rejected"];
const CURRENCIES = ["BDT", "USD", "EUR", "GBP", "SAR", "AED"];

export const MODULE_SCHEMAS: Record<string, ModuleSchema> = {
  "fund-transfer": {
    singular: "Fund Transfer",
    listColumns: [
      { name: "reference", label: "Reference" },
      { name: "transferType", label: "Type" },
      { name: "fromAccount", label: "From A/C" },
      { name: "beneficiary", label: "Beneficiary" },
      { name: "amount", label: "Amount", align: "right" },
      { name: "valueDate", label: "Value Date" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "transferType", label: "Transfer Type", type: "select", required: true,
        options: ["Own Account", "Within Bank", "EFTN", "RTGS", "NPSB", "Foreign (SWIFT)"] },
      { name: "fromAccount", label: "From Account", type: "select", required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba", "0123100003 — USD NOSTRO"] },
      { name: "beneficiary", label: "Beneficiary Name", type: "text", required: true },
      { name: "beneficiaryAccount", label: "Beneficiary Account", type: "text", required: true },
      { name: "bankName", label: "Bank / Branch", type: "text" },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "amount", label: "Amount", type: "amount", required: true },
      { name: "valueDate", label: "Value Date", type: "date", required: true },
      { name: "purpose", label: "Purpose of Payment", type: "select",
        options: ["Salary", "Supplier Payment", "Tax", "Utility", "Inter-company", "Other"] },
      { name: "remarks", label: "Remarks / Narrative", type: "textarea", span: 2 },
    ],
    canCreate: true,
  },

  "beneficiary": {
    singular: "Beneficiary",
    listColumns: [
      { name: "name", label: "Name" },
      { name: "nickname", label: "Nickname" },
      { name: "bankName", label: "Bank" },
      { name: "account", label: "Account" },
      { name: "currency", label: "Ccy" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "name", label: "Beneficiary Name", type: "text", required: true },
      { name: "nickname", label: "Nickname", type: "text" },
      { name: "type", label: "Type", type: "select", required: true,
        options: ["Within Bank", "Other Bank (EFTN/RTGS/NPSB)", "Foreign (SWIFT)"] },
      { name: "account", label: "Account Number / IBAN", type: "text", required: true },
      { name: "bankName", label: "Bank Name", type: "text", required: true },
      { name: "branch", label: "Branch", type: "text" },
      { name: "swiftCode", label: "SWIFT / Routing", type: "text" },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "address", label: "Address", type: "textarea", span: 2 },
    ],
    canCreate: true,
  },

  "bill-pay": {
    singular: "Bill Payment",
    listColumns: [
      { name: "reference", label: "Reference" },
      { name: "billerCategory", label: "Category" },
      { name: "biller", label: "Biller" },
      { name: "consumerNo", label: "Consumer #" },
      { name: "amount", label: "Amount", align: "right" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "billerCategory", label: "Category", type: "select", required: true,
        options: ["Utility", "Telecom / Recharge", "Credit Card", "Government", "Insurance"] },
      { name: "biller", label: "Biller", type: "select", required: true,
        options: ["DESCO", "WASA", "Titas Gas", "Grameenphone", "Robi", "Banglalink", "SJIBL Credit Card"] },
      { name: "consumerNo", label: "Consumer / Bill Number", type: "text", required: true },
      { name: "fromAccount", label: "Pay From", type: "select", required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"] },
      { name: "amount", label: "Amount (BDT)", type: "amount", required: true },
      { name: "valueDate", label: "Pay Date", type: "date", required: true },
      { name: "remarks", label: "Remarks", type: "textarea", span: 2 },
    ],
    canCreate: true,
  },

  "bulk-transfer": {
    singular: "Bulk File",
    listColumns: [
      { name: "batchRef", label: "Batch Ref" },
      { name: "fileName", label: "File" },
      { name: "fileType", label: "Format" },
      { name: "totalRecords", label: "Records", align: "right" },
      { name: "totalAmount", label: "Total", align: "right" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "batchRef", label: "Batch Reference", type: "text", required: true,
        placeholder: "e.g. PAYROLL-AUG-2025" },
      { name: "fileType", label: "File Format", type: "select", required: true,
        options: ["CSV", "XML", "ISO20022 pain.001"] },
      { name: "fileName", label: "Upload File", type: "file", required: true,
        hint: "Max 10 MB. CSV must follow the SJIBL bulk-payment template." },
      { name: "debitAccount", label: "Debit Account", type: "select", required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"] },
      { name: "totalRecords", label: "Total Records", type: "number", required: true },
      { name: "totalAmount", label: "Total Amount (BDT)", type: "amount", required: true },
      { name: "valueDate", label: "Value Date", type: "date", required: true },
      { name: "remarks", label: "Description", type: "textarea", span: 2 },
    ],
    canCreate: true,
  },

  "lc-initiation": {
    singular: "LC Application",
    listColumns: [
      { name: "lcRef", label: "Application #" },
      { name: "beneficiary", label: "Beneficiary" },
      { name: "country", label: "Country" },
      { name: "amount", label: "Amount", align: "right" },
      { name: "expiryDate", label: "Expiry" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "lcRef", label: "Application Reference", type: "text", required: true },
      { name: "lcType", label: "LC Type", type: "select", required: true,
        options: ["Sight", "Usance", "Standby (SBLC)", "Revolving", "Transferable"] },
      { name: "beneficiary", label: "Beneficiary Name", type: "text", required: true },
      { name: "beneficiaryAddress", label: "Beneficiary Address", type: "textarea", span: 2 },
      { name: "country", label: "Beneficiary Country", type: "text", required: true },
      { name: "advisingBank", label: "Advising Bank (SWIFT BIC)", type: "text" },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "amount", label: "LC Amount", type: "amount", required: true },
      { name: "tolerance", label: "Tolerance (+/- %)", type: "number" },
      { name: "issueDate", label: "Issue Date", type: "date", required: true },
      { name: "expiryDate", label: "Expiry Date", type: "date", required: true },
      { name: "expiryPlace", label: "Place of Expiry", type: "text" },
      { name: "shipmentFrom", label: "Shipment From", type: "text" },
      { name: "shipmentTo", label: "Shipment To", type: "text" },
      { name: "latestShipment", label: "Latest Shipment Date", type: "date" },
      { name: "incoterm", label: "Incoterm", type: "select",
        options: ["FOB", "CFR", "CIF", "EXW", "FCA", "DAP", "DDP"] },
      { name: "goodsDescription", label: "Description of Goods", type: "textarea", span: 2, required: true },
      { name: "documentsRequired", label: "Documents Required", type: "textarea", span: 2 },
      { name: "additionalConditions", label: "Additional Conditions", type: "textarea", span: 2 },
    ],
    canCreate: true,
  },

  "services": {
    singular: "Service Request",
    listColumns: [
      { name: "ticket", label: "Ticket" },
      { name: "serviceType", label: "Service" },
      { name: "account", label: "Account" },
      { name: "raisedOn", label: "Raised" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "serviceType", label: "Service Type", type: "select", required: true,
        options: ["Cheque Book Request", "Stop Payment", "Physical Statement", "Credit Card Request", "Address Change"] },
      { name: "account", label: "Linked Account", type: "select", required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"] },
      { name: "quantity", label: "Quantity / Leaves", type: "number" },
      { name: "deliveryBranch", label: "Delivery Branch", type: "text" },
      { name: "contact", label: "Contact Number", type: "tel" },
      { name: "remarks", label: "Remarks", type: "textarea", span: 2 },
    ],
    canCreate: true,
  },

  "service-request": {
    singular: "Service Ticket",
    listColumns: [
      { name: "ticket", label: "Ticket #" },
      { name: "subject", label: "Subject" },
      { name: "category", label: "Category" },
      { name: "raisedBy", label: "Raised By" },
      { name: "priority", label: "Priority" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "subject", label: "Subject", type: "text", required: true },
      { name: "category", label: "Category", type: "select", required: true,
        options: ["Account", "Transactions", "Trade Finance", "Card", "Access / Login", "Other"] },
      { name: "priority", label: "Priority", type: "select", required: true,
        options: ["Low", "Medium", "High", "Urgent"] },
      { name: "description", label: "Description", type: "textarea", span: 2, required: true },
      { name: "attachment", label: "Attachment", type: "file" },
    ],
    canCreate: true,
  },

  "corporate-admin": {
    singular: "User",
    listColumns: [
      { name: "username", label: "Username" },
      { name: "displayName", label: "Name" },
      { name: "role", label: "Role" },
      { name: "entity", label: "Entity" },
      { name: "email", label: "Email" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "displayName", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "role", label: "Role", type: "select", required: true,
        options: ["Viewer", "Maker", "Checker", "Approver", "Admin"] },
      { name: "entity", label: "Entity / Company", type: "select", required: true,
        options: ["Globex Industries Ltd", "Yangtse Trading", "BRAC Logistics", "SJIBL Internal"] },
      { name: "entitlements", label: "Entitlements (comma-sep)", type: "textarea", span: 2,
        placeholder: "fund-transfer:maker, beneficiary:checker, lc-initiation:viewer" },
      { name: "dailyLimit", label: "Daily Limit (BDT)", type: "amount" },
      { name: "perTxnLimit", label: "Per-Transaction Limit (BDT)", type: "amount" },
    ],
    canCreate: true,
  },

  "invoice": {
    singular: "Invoice",
    listColumns: [
      { name: "invoiceNo", label: "Invoice #" },
      { name: "customer", label: "Customer" },
      { name: "issueDate", label: "Issued" },
      { name: "dueDate", label: "Due" },
      { name: "amount", label: "Amount", align: "right" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "invoiceNo", label: "Invoice Number", type: "text", required: true },
      { name: "customer", label: "Customer", type: "text", required: true },
      { name: "customerEmail", label: "Customer Email", type: "email" },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "amount", label: "Amount", type: "amount", required: true },
      { name: "vatRate", label: "VAT %", type: "number" },
      { name: "issueDate", label: "Issue Date", type: "date", required: true },
      { name: "dueDate", label: "Due Date", type: "date", required: true },
      { name: "virtualAccount", label: "Virtual Collection A/C", type: "text" },
      { name: "description", label: "Description", type: "textarea", span: 2 },
    ],
    canCreate: true,
  },

  "payment-instruction": {
    singular: "Payment Instruction",
    listColumns: [
      { name: "instructionRef", label: "Instruction" },
      { name: "instrumentType", label: "Instrument" },
      { name: "payee", label: "Payee" },
      { name: "amount", label: "Amount", align: "right" },
      { name: "issueDate", label: "Date" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "instructionRef", label: "Instruction Reference", type: "text", required: true },
      { name: "instrumentType", label: "Instrument", type: "select", required: true,
        options: ["Pay Order", "Demand Draft", "Cheque", "MICR Cheque"] },
      { name: "fromAccount", label: "Debit Account", type: "select", required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"] },
      { name: "payee", label: "Payee Name", type: "text", required: true },
      { name: "payeeAccount", label: "Payee A/C (optional)", type: "text" },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "amount", label: "Amount", type: "amount", required: true },
      { name: "issueDate", label: "Issue Date", type: "date", required: true },
      { name: "deliveryBranch", label: "Collection Branch", type: "text" },
      { name: "remarks", label: "Remarks", type: "textarea", span: 2 },
    ],
    canCreate: true,
  },

  "inquiry": {
    singular: "Inquiry",
    listColumns: [
      { name: "ticket", label: "Reference" },
      { name: "inquiryType", label: "Type" },
      { name: "subject", label: "Subject" },
      { name: "raisedOn", label: "Raised" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "inquiryType", label: "Inquiry Type", type: "select", required: true,
        options: ["Exchange Rate", "Profit Rate", "Account Balance", "Statement Copy", "General"] },
      { name: "currencyPair", label: "Currency Pair (if FX)", type: "text",
        placeholder: "e.g. USD/BDT" },
      { name: "subject", label: "Subject", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", span: 2 },
    ],
    canCreate: true,
  },

  "approval": {
    singular: "Approval Task",
    listColumns: [
      { name: "ref", label: "Reference" },
      { name: "moduleTitle", label: "Module" },
      { name: "details", label: "Details" },
      { name: "maker", label: "Maker" },
      { name: "risk", label: "Risk" },
      { name: "amount", label: "Amount", align: "right" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "ref", label: "Transaction Reference", type: "text", required: true },
      { name: "moduleTitle", label: "Source Module", type: "text", required: true },
      { name: "details", label: "Transaction Details", type: "textarea", span: 2, required: true },
      { name: "maker", label: "Requested By (Maker)", type: "text", required: true },
      { name: "risk", label: "Risk Evaluation", type: "select", required: true, options: ["Low", "Medium", "High"] },
      { name: "amount", label: "Amount (BDT/USD)", type: "amount", required: true },
      { name: "remarks", label: "Remarks / Verification Notes", type: "textarea", span: 2 },
    ],
    canCreate: false,
  },

  "accounts": {
    singular: "Account",
    listColumns: [
      { name: "accountNo", label: "Account No" },
      { name: "accountName", label: "Account Name" },
      { name: "accountType", label: "Account Type" },
      { name: "currency", label: "Ccy" },
      { name: "balance", label: "Ledger Balance", align: "right" },
      { name: "availableBalance", label: "Available Bal", align: "right" },
    ],
    fields: [
      { name: "accountNo", label: "Account Number", type: "text", required: true },
      { name: "accountName", label: "Account Name", type: "text", required: true },
      { name: "accountType", label: "Account Type", type: "select", required: true,
        options: ["Al-Wadeeah Current", "Mudaraba Savings", "Mudaraba Term Deposit", "Special Notice Deposit"] },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "balance", label: "Ledger Balance", type: "amount", required: true },
      { name: "availableBalance", label: "Available Balance", type: "amount", required: true },
      { name: "branchName", label: "Branch Name", type: "text" },
      { name: "routingNumber", label: "Routing Number", type: "text" },
      { name: "swiftCode", label: "SWIFT BIC", type: "text" },
    ],
    canCreate: false,
  },

  "investment": {
    singular: "Investment Facility",
    listColumns: [
      { name: "facilityNo", label: "Facility No" },
      { name: "facilityType", label: "Finance Mode" },
      { name: "limitAmount", label: "Approved Limit", align: "right" },
      { name: "outstandingAmount", label: "Outstanding", align: "right" },
      { name: "expiryDate", label: "Expiry Date" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "facilityNo", label: "Facility Number", type: "text", required: true },
      { name: "facilityType", label: "Mode of Finance", type: "select", required: true,
        options: ["Bai-Murabaha", "HPSM (Home/Asset)", "Ijarah", "Musharaka", "L/C Related Finance"] },
      { name: "limitAmount", label: "Approved Limit (BDT)", type: "amount", required: true },
      { name: "outstandingAmount", label: "Outstanding Amount (BDT)", type: "amount", required: true },
      { name: "profitRate", label: "Markup / Profit Rate %", type: "number", required: true },
      { name: "expiryDate", label: "Expiry Date", type: "date", required: true },
      { name: "securityDetails", label: "Security & Collateral Details", type: "textarea", span: 2 },
    ],
    canCreate: false,
  },

  "term-deposit": {
    singular: "Term Deposit",
    listColumns: [
      { name: "receiptNo", label: "FDR Receipt No" },
      { name: "type", label: "Deposit Scheme" },
      { name: "principalAmount", label: "Principal (BDT)", align: "right" },
      { name: "profitRate", label: "Profit Rate %" },
      { name: "openingDate", label: "Opening Date" },
      { name: "maturityDate", label: "Maturity Date" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "receiptNo", label: "FDR Receipt Number", type: "text", required: true },
      { name: "type", label: "Deposit Scheme", type: "select", required: true,
        options: ["Mudaraba Term Deposit (FDR)", "Mudaraba Monthly Profit Scheme"] },
      { name: "principalAmount", label: "Principal Amount (BDT)", type: "amount", required: true },
      { name: "currency", label: "Currency", type: "text" },
      { name: "profitRate", label: "Expected Profit Rate %", type: "number", required: true },
      { name: "profitFrequency", label: "Profit Payment Frequency", type: "select",
        options: ["At Maturity", "Monthly", "Quarterly", "Half-Yearly", "Yearly"] },
      { name: "expectedProfit", label: "Total Expected Profit (BDT)", type: "amount" },
      { name: "tenureMonths", label: "Tenure (Months)", type: "number", required: true },
      { name: "openingDate", label: "Opening Date", type: "date", required: true },
      { name: "maturityDate", label: "Maturity Date", type: "date", required: true },
      { name: "linkedAccount", label: "Linked Payout Account", type: "text" },
      { name: "branchName", label: "Branch", type: "text" },
      { name: "entity", label: "Entity Name", type: "text" },
      { name: "autoRenewal", label: "Auto-Renewal Instruction", type: "text" },
      { name: "remarks", label: "Remarks", type: "textarea" },
    ],
    canCreate: false,
  },

  "import-lc": {
    singular: "Import LC",
    listColumns: [
      { name: "lcNumber", label: "LC Number" },
      { name: "beneficiaryName", label: "Beneficiary" },
      { name: "lcAmount", label: "LC Amount", align: "right" },
      { name: "lcType", label: "LC Type" },
      { name: "expiryDate", label: "Expiry Date" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "lcNumber", label: "LC Number", type: "text", required: true },
      { name: "lcType", label: "LC Type", type: "select", required: true,
        options: ["Sight LC", "Usance LC", "UPAS LC", "Back-to-Back LC"] },
      { name: "beneficiaryName", label: "Beneficiary Name", type: "text", required: true },
      { name: "beneficiaryAddress", label: "Beneficiary Address", type: "textarea", span: 2 },
      { name: "lcAmount", label: "LC Amount", type: "amount", required: true },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "openingDate", label: "Opening Date", type: "date", required: true },
      { name: "expiryDate", label: "Expiry Date", type: "date", required: true },
      { name: "shipmentDate", label: "Latest Shipment Date", type: "date" },
      { name: "goodsDescription", label: "Description of Goods", type: "textarea", span: 2, required: true },
      { name: "swiftReference", label: "SWIFT Reference Number", type: "text" },
    ],
    canCreate: false,
  },

  "import-bill": {
    singular: "Import Bill",
    listColumns: [
      { name: "billNumber", label: "Bill Number" },
      { name: "lcNumber", label: "Linked LC" },
      { name: "billAmount", label: "Bill Amount", align: "right" },
      { name: "discrepancyStatus", label: "Discrepancies" },
      { name: "dueDate", label: "Due Date" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "billNumber", label: "Bill Number", type: "text", required: true },
      { name: "lcNumber", label: "Linked LC Number", type: "text", required: true },
      { name: "billAmount", label: "Bill Amount", type: "amount", required: true },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "discrepancyStatus", label: "Discrepancy Status", type: "select", required: true,
        options: ["Clean / No Discrepancies", "Minor Discrepancy", "Major Discrepancy (Awaiting Consent)"] },
      { name: "discrepancyDetails", label: "Discrepancy Details", type: "textarea", span: 2 },
      { name: "dueDate", label: "Payment Due Date", type: "date", required: true },
      { name: "acceptanceDate", label: "Acceptance Date", type: "date" },
    ],
    canCreate: false,
  },

  "export-lc": {
    singular: "Export LC",
    listColumns: [
      { name: "lcNumber", label: "LC Number" },
      { name: "applicantName", label: "Buyer / Applicant" },
      { name: "lcAmount", label: "LC Amount", align: "right" },
      { name: "issuingBank", label: "Issuing Bank" },
      { name: "expiryDate", label: "Expiry Date" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "lcNumber", label: "LC Number / Reference", type: "text", required: true },
      { name: "applicantName", label: "Buyer / Applicant Name", type: "text", required: true },
      { name: "lcAmount", label: "LC Amount", type: "amount", required: true },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "issuingBank", label: "Issuing Bank Name", type: "text", required: true },
      { name: "advisingRef", label: "Advising Reference Number", type: "text" },
      { name: "openingDate", label: "Opening Date", type: "date", required: true },
      { name: "expiryDate", label: "Expiry Date", type: "date", required: true },
      { name: "shipmentDate", label: "Latest Shipment Date", type: "date" },
      { name: "goodsDescription", label: "Description of Goods", type: "textarea", span: 2 },
    ],
    canCreate: false,
  },

  "export-bill": {
    singular: "Export Bill",
    listColumns: [
      { name: "billNumber", label: "Export Bill Ref" },
      { name: "lcNumber", label: "Linked LC" },
      { name: "billAmount", label: "Bill Amount", align: "right" },
      { name: "negotiatedAmount", label: "Negotiated", align: "right" },
      { name: "realizedAmount", label: "Realized", align: "right" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "billNumber", label: "Export Bill Reference", type: "text", required: true },
      { name: "lcNumber", label: "Linked LC Reference", type: "text", required: true },
      { name: "billAmount", label: "Bill Invoice Amount", type: "amount", required: true },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "negotiatedAmount", label: "Negotiated / Purchase Amount", type: "amount" },
      { name: "realizedAmount", label: "Realized Amount", type: "amount" },
      { name: "realizationDate", label: "Realization Date", type: "date" },
      { name: "buyerName", label: "Buyer / Consignee Name", type: "text" },
      { name: "remarks", label: "Remarks", type: "textarea", span: 2 },
    ],
    canCreate: false,
  },

  "credit-card": {
    singular: "Credit Card",
    listColumns: [
      { name: "cardNumber", label: "Card Number" },
      { name: "cardholderName", label: "Cardholder Name" },
      { name: "cardType", label: "Card Type" },
      { name: "limitAmount", label: "Credit Limit", align: "right" },
      { name: "outstandingAmount", label: "Outstanding", align: "right" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "cardNumber", label: "Card Number (Masked)", type: "text", required: true },
      { name: "cardholderName", label: "Cardholder Name", type: "text", required: true },
      { name: "cardType", label: "Card Type", type: "select", required: true,
        options: ["Visa Corporate Gold", "Mastercard Corporate Platinum"] },
      { name: "limitAmount", label: "Approved Credit Limit (BDT)", type: "amount", required: true },
      { name: "outstandingAmount", label: "Outstanding Balance (BDT)", type: "amount", required: true },
      { name: "availableLimit", label: "Available Limit (BDT)", type: "amount", required: true },
      { name: "dueDate", label: "Payment Due Date", type: "date", required: true },
      { name: "minDue", label: "Minimum Payment Due (BDT)", type: "amount" },
    ],
    canCreate: false,
  },

  "cash-management": {
    singular: "Sweep Setup",
    listColumns: [
      { name: "sweepRef", label: "Sweep Reference" },
      { name: "type", label: "Sweep Type" },
      { name: "sourceAccount", label: "Source Account" },
      { name: "targetAccount", label: "Target Account" },
      { name: "thresholdAmount", label: "Threshold", align: "right" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "sweepRef", label: "Sweep Reference Name", type: "text", required: true },
      { name: "type", label: "Sweep Type", type: "select", required: true,
        options: ["Zero Balance Sweep (ZBA)", "Target Balance Sweep", "Surplus Pool Sweep"] },
      { name: "sourceAccount", label: "Source Subsidiary A/C", type: "select", required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"] },
      { name: "targetAccount", label: "Target Pooling A/C", type: "select", required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"] },
      { name: "thresholdAmount", label: "Trigger Threshold Amount (BDT)", type: "amount", required: true },
      { name: "sweepSchedule", label: "Schedule Frequency", type: "select", required: true,
        options: ["Daily EOD", "Weekly (Thursday)", "Monthly End"] },
    ],
    canCreate: true,
  },

  "profile": {
    singular: "Profile Detail",
    listColumns: [
      { name: "username", label: "Username" },
      { name: "displayName", label: "Full Name" },
      { name: "email", label: "Email" },
      { name: "phone", label: "Phone" },
      { name: "role", label: "Assigned Role" },
    ],
    fields: [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "displayName", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel" },
      { name: "role", label: "Assigned Corporate Role", type: "text", required: true },
      { name: "twoFactorEnabled", label: "Enable 2FA (SMS/OTP)", type: "select", options: ["Enabled", "Disabled"] },
      { name: "notificationPreference", label: "Notification Preference", type: "select",
        options: ["Email Only", "SMS Only", "Both Email and SMS", "None"] },
    ],
    canCreate: false,
  },

  "sukuk": {
    singular: "Sukuk Portfolio",
    listColumns: [
      { name: "certificateNo", label: "Certificate #" },
      { name: "sukukType", label: "Sukuk Type" },
      { name: "faceValue", label: "Face Value", align: "right" },
      { name: "expectedYield", label: "Expected Yield" },
      { name: "maturityDate", label: "Maturity Date" },
      { name: "holdingStatus", label: "Status" },
    ],
    fields: [
      { name: "certificateNo", label: "Certificate Number", type: "text", required: true },
      { name: "sukukType", label: "Sukuk Type", type: "select", required: true,
        options: ["Sukuk Al-Ijarah", "Sukuk Al-Mudarabah", "Sukuk Al-Murabahah", "Sukuk Al-Musharakah"] },
      { name: "faceValue", label: "Face Value (BDT)", type: "amount", required: true },
      { name: "expectedYield", label: "Expected Profit/Yield Rate (%)", type: "number", required: true },
      { name: "maturityDate", label: "Maturity Date", type: "date", required: true },
      { name: "payoutFrequency", label: "Profit Payout Frequency", type: "select", required: true,
        options: ["Monthly", "Quarterly", "Semi-Annually", "At Maturity"] },
      { name: "holdingStatus", label: "Holding Status", type: "select", required: true,
        options: ["Active", "Pledged", "Matured"] },
    ],
    canCreate: false,
  },

  "murabaha": {
    singular: "Murabaha Request",
    listColumns: [
      { name: "reference", label: "Reference" },
      { name: "facilityNo", label: "Facility" },
      { name: "vendorName", label: "Supplier" },
      { name: "orderValue", label: "Order Value", align: "right" },
      { name: "repaymentTenure", label: "Tenure" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "facilityNo", label: "Linked Murabaha Facility", type: "select", required: true,
        options: ["FAC-MUR-8839 — Globex Raw Material Limit"] },
      { name: "vendorName", label: "Supplier / Vendor Name", type: "text", required: true },
      { name: "goodsDescription", label: "Goods Description & Specifications", type: "textarea", span: 2, required: true },
      { name: "orderValue", label: "Purchase Order Value (BDT)", type: "amount", required: true },
      { name: "markupRate", label: "Markup / Profit Rate (%)", type: "number", required: true },
      { name: "repaymentTenure", label: "Repayment Tenure", type: "select", required: true,
        options: ["3 Months", "6 Months", "9 Months", "12 Months"] },
      { name: "proformaInvoice", label: "Proforma Invoice / Quotation File", type: "file", required: true,
        hint: "Max 10 MB. PDF or Image format of supplier proforma invoice." },
      { name: "remarks", label: "Remarks / Delivery Instructions", type: "textarea", span: 2 },
    ],
    canCreate: true,
  },

  "zakat": {
    singular: "Zakat Request",
    listColumns: [
      { name: "reference", label: "Reference" },
      { name: "calcMethod", label: "Calculation Method" },
      { name: "netZakatable", label: "Net Zakatable Wealth", align: "right" },
      { name: "amountToPay", label: "Payment Amount", align: "right" },
      { name: "beneficiaryFund", label: "Zakat Fund" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "calcMethod", label: "Zakat Calculation Method", type: "select", required: true,
        options: ["Asset-Based (2.5%)", "Net Worth-Based (2.5%)"] },
      { name: "totalAssets", label: "Total Zakatable Assets (BDT)", type: "amount", required: true },
      { name: "deductibleLiabilities", label: "Deductible Liabilities (BDT)", type: "amount", required: true },
      { name: "netZakatable", label: "Net Zakatable Wealth (BDT)", type: "amount", required: true },
      { name: "calculatedZakat", label: "Calculated Zakat (2.5% of Net Wealth) (BDT)", type: "amount", required: true },
      { name: "payoutAccount", label: "Debit Account", type: "select", required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"] },
      { name: "beneficiaryFund", label: "Zakat Recipient / Charity Fund", type: "select", required: true,
        options: ["SJIBL Corporate Zakat Fund", "Anjuman Mufidul Islam Zakat Fund", "Ahsania Mission Charity", "JAAGO Foundation"] },
      { name: "amountToPay", label: "Disbursal Amount (BDT)", type: "amount", required: true },
      { name: "remarks", label: "CSR / Remarks", type: "textarea", span: 2 },
    ],
    canCreate: true,
  },
};

/** Default schema used by view-only / placeholder modules. */
export const DEFAULT_SCHEMA: ModuleSchema = {
  singular: "Record",
  listColumns: [
    { name: "reference", label: "Reference" },
    { name: "title", label: "Title" },
    { name: "amount", label: "Amount", align: "right" },
    { name: "date", label: "Date" },
    { name: "status", label: "Status" },
  ],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "reference", label: "Reference", type: "text" },
    { name: "amount", label: "Amount (BDT)", type: "amount" },
    { name: "date", label: "Date", type: "date" },
    { name: "remarks", label: "Remarks", type: "textarea", span: 2 },
  ],
  canCreate: false,
};

export function getSchema(slug: string): ModuleSchema {
  return MODULE_SCHEMAS[slug] ?? DEFAULT_SCHEMA;
}

export { STATUS };
