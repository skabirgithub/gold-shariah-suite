import { g as getSession } from "./input-YVcJYwBl.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
const CURRENCIES = ["BDT", "USD", "EUR", "GBP", "SAR", "AED"];
const MODULE_SCHEMAS = {
  "fund-transfer": {
    singular: "Fund Transfer",
    listColumns: [
      { name: "reference", label: "Reference" },
      { name: "transferType", label: "Type" },
      { name: "fromAccount", label: "From A/C" },
      { name: "beneficiary", label: "Beneficiary" },
      { name: "amount", label: "Amount", align: "right" },
      { name: "valueDate", label: "Value Date" },
      { name: "status", label: "Status" }
    ],
    fields: [
      {
        name: "transferType",
        label: "Transfer Type",
        type: "select",
        required: true,
        options: ["Own Account", "Within Bank", "EFTN", "RTGS", "NPSB", "Foreign (SWIFT)"]
      },
      {
        name: "fromAccount",
        label: "From Account",
        type: "select",
        required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba", "0123100003 — USD NOSTRO"]
      },
      { name: "beneficiary", label: "Beneficiary Name", type: "text", required: true },
      { name: "beneficiaryAccount", label: "Beneficiary Account", type: "text", required: true },
      { name: "bankName", label: "Bank / Branch", type: "text" },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "amount", label: "Amount", type: "amount", required: true },
      { name: "valueDate", label: "Value Date", type: "date", required: true },
      {
        name: "purpose",
        label: "Purpose of Payment",
        type: "select",
        options: ["Salary", "Supplier Payment", "Tax", "Utility", "Inter-company", "Other"]
      },
      { name: "remarks", label: "Remarks / Narrative", type: "textarea", span: 2 }
    ],
    canCreate: true
  },
  "beneficiary": {
    singular: "Beneficiary",
    listColumns: [
      { name: "name", label: "Name" },
      { name: "nickname", label: "Nickname" },
      { name: "bankName", label: "Bank" },
      { name: "account", label: "Account" },
      { name: "currency", label: "Ccy" },
      { name: "status", label: "Status" }
    ],
    fields: [
      { name: "name", label: "Beneficiary Name", type: "text", required: true },
      { name: "nickname", label: "Nickname", type: "text" },
      {
        name: "type",
        label: "Type",
        type: "select",
        required: true,
        options: ["Within Bank", "Other Bank (EFTN/RTGS/NPSB)", "Foreign (SWIFT)"]
      },
      { name: "account", label: "Account Number / IBAN", type: "text", required: true },
      { name: "bankName", label: "Bank Name", type: "text", required: true },
      { name: "branch", label: "Branch", type: "text" },
      { name: "swiftCode", label: "SWIFT / Routing", type: "text" },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "address", label: "Address", type: "textarea", span: 2 }
    ],
    canCreate: true
  },
  "bill-pay": {
    singular: "Bill Payment",
    listColumns: [
      { name: "reference", label: "Reference" },
      { name: "billerCategory", label: "Category" },
      { name: "biller", label: "Biller" },
      { name: "consumerNo", label: "Consumer #" },
      { name: "amount", label: "Amount", align: "right" },
      { name: "status", label: "Status" }
    ],
    fields: [
      {
        name: "billerCategory",
        label: "Category",
        type: "select",
        required: true,
        options: ["Utility", "Telecom / Recharge", "Credit Card", "Government", "Insurance"]
      },
      {
        name: "biller",
        label: "Biller",
        type: "select",
        required: true,
        options: ["DESCO", "WASA", "Titas Gas", "Grameenphone", "Robi", "Banglalink", "SJIBL Credit Card"]
      },
      { name: "consumerNo", label: "Consumer / Bill Number", type: "text", required: true },
      {
        name: "fromAccount",
        label: "Pay From",
        type: "select",
        required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"]
      },
      { name: "amount", label: "Amount (BDT)", type: "amount", required: true },
      { name: "valueDate", label: "Pay Date", type: "date", required: true },
      { name: "remarks", label: "Remarks", type: "textarea", span: 2 }
    ],
    canCreate: true
  },
  "bulk-transfer": {
    singular: "Bulk File",
    listColumns: [
      { name: "batchRef", label: "Batch Ref" },
      { name: "fileName", label: "File" },
      { name: "fileType", label: "Format" },
      { name: "totalRecords", label: "Records", align: "right" },
      { name: "totalAmount", label: "Total", align: "right" },
      { name: "status", label: "Status" }
    ],
    fields: [
      {
        name: "batchRef",
        label: "Batch Reference",
        type: "text",
        required: true,
        placeholder: "e.g. PAYROLL-AUG-2025"
      },
      {
        name: "fileType",
        label: "File Format",
        type: "select",
        required: true,
        options: ["CSV", "XML", "ISO20022 pain.001"]
      },
      {
        name: "fileName",
        label: "Upload File",
        type: "file",
        required: true,
        hint: "Max 10 MB. CSV must follow the SJIBL bulk-payment template."
      },
      {
        name: "debitAccount",
        label: "Debit Account",
        type: "select",
        required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"]
      },
      { name: "totalRecords", label: "Total Records", type: "number", required: true },
      { name: "totalAmount", label: "Total Amount (BDT)", type: "amount", required: true },
      { name: "valueDate", label: "Value Date", type: "date", required: true },
      { name: "remarks", label: "Description", type: "textarea", span: 2 }
    ],
    canCreate: true
  },
  "lc-initiation": {
    singular: "LC Application",
    listColumns: [
      { name: "lcRef", label: "Application #" },
      { name: "beneficiary", label: "Beneficiary" },
      { name: "country", label: "Country" },
      { name: "amount", label: "Amount", align: "right" },
      { name: "expiryDate", label: "Expiry" },
      { name: "status", label: "Status" }
    ],
    fields: [
      { name: "lcRef", label: "Application Reference", type: "text", required: true },
      {
        name: "lcType",
        label: "LC Type",
        type: "select",
        required: true,
        options: ["Sight", "Usance", "Standby (SBLC)", "Revolving", "Transferable"]
      },
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
      {
        name: "incoterm",
        label: "Incoterm",
        type: "select",
        options: ["FOB", "CFR", "CIF", "EXW", "FCA", "DAP", "DDP"]
      },
      { name: "goodsDescription", label: "Description of Goods", type: "textarea", span: 2, required: true },
      { name: "documentsRequired", label: "Documents Required", type: "textarea", span: 2 },
      { name: "additionalConditions", label: "Additional Conditions", type: "textarea", span: 2 }
    ],
    canCreate: true
  },
  "services": {
    singular: "Service Request",
    listColumns: [
      { name: "ticket", label: "Ticket" },
      { name: "serviceType", label: "Service" },
      { name: "account", label: "Account" },
      { name: "raisedOn", label: "Raised" },
      { name: "status", label: "Status" }
    ],
    fields: [
      {
        name: "serviceType",
        label: "Service Type",
        type: "select",
        required: true,
        options: ["Cheque Book Request", "Stop Payment", "Physical Statement", "Credit Card Request", "Address Change"]
      },
      {
        name: "account",
        label: "Linked Account",
        type: "select",
        required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"]
      },
      { name: "quantity", label: "Quantity / Leaves", type: "number" },
      { name: "deliveryBranch", label: "Delivery Branch", type: "text" },
      { name: "contact", label: "Contact Number", type: "tel" },
      { name: "remarks", label: "Remarks", type: "textarea", span: 2 }
    ],
    canCreate: true
  },
  "service-request": {
    singular: "Service Ticket",
    listColumns: [
      { name: "ticket", label: "Ticket #" },
      { name: "subject", label: "Subject" },
      { name: "category", label: "Category" },
      { name: "raisedBy", label: "Raised By" },
      { name: "priority", label: "Priority" },
      { name: "status", label: "Status" }
    ],
    fields: [
      { name: "subject", label: "Subject", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: ["Account", "Transactions", "Trade Finance", "Card", "Access / Login", "Other"]
      },
      {
        name: "priority",
        label: "Priority",
        type: "select",
        required: true,
        options: ["Low", "Medium", "High", "Urgent"]
      },
      { name: "description", label: "Description", type: "textarea", span: 2, required: true },
      { name: "attachment", label: "Attachment", type: "file" }
    ],
    canCreate: true
  },
  "corporate-admin": {
    singular: "User",
    listColumns: [
      { name: "username", label: "Username" },
      { name: "displayName", label: "Name" },
      { name: "role", label: "Role" },
      { name: "entity", label: "Entity" },
      { name: "email", label: "Email" },
      { name: "status", label: "Status" }
    ],
    fields: [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "displayName", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel" },
      {
        name: "role",
        label: "Role",
        type: "select",
        required: true,
        options: ["Viewer", "Maker", "Checker", "Approver", "Admin"]
      },
      {
        name: "entity",
        label: "Entity / Company",
        type: "select",
        required: true,
        options: ["Globex Industries Ltd", "Yangtse Trading", "BRAC Logistics", "SJIBL Internal"]
      },
      {
        name: "entitlements",
        label: "Entitlements (comma-sep)",
        type: "textarea",
        span: 2,
        placeholder: "fund-transfer:maker, beneficiary:checker, lc-initiation:viewer"
      },
      { name: "dailyLimit", label: "Daily Limit (BDT)", type: "amount" },
      { name: "perTxnLimit", label: "Per-Transaction Limit (BDT)", type: "amount" }
    ],
    canCreate: true
  },
  "invoice": {
    singular: "Invoice",
    listColumns: [
      { name: "invoiceNo", label: "Invoice #" },
      { name: "customer", label: "Customer" },
      { name: "issueDate", label: "Issued" },
      { name: "dueDate", label: "Due" },
      { name: "amount", label: "Amount", align: "right" },
      { name: "status", label: "Status" }
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
      { name: "description", label: "Description", type: "textarea", span: 2 }
    ],
    canCreate: true
  },
  "payment-instruction": {
    singular: "Payment Instruction",
    listColumns: [
      { name: "instructionRef", label: "Instruction" },
      { name: "instrumentType", label: "Instrument" },
      { name: "payee", label: "Payee" },
      { name: "amount", label: "Amount", align: "right" },
      { name: "issueDate", label: "Date" },
      { name: "status", label: "Status" }
    ],
    fields: [
      { name: "instructionRef", label: "Instruction Reference", type: "text", required: true },
      {
        name: "instrumentType",
        label: "Instrument",
        type: "select",
        required: true,
        options: ["Pay Order", "Demand Draft", "Cheque", "MICR Cheque"]
      },
      {
        name: "fromAccount",
        label: "Debit Account",
        type: "select",
        required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"]
      },
      { name: "payee", label: "Payee Name", type: "text", required: true },
      { name: "payeeAccount", label: "Payee A/C (optional)", type: "text" },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "amount", label: "Amount", type: "amount", required: true },
      { name: "issueDate", label: "Issue Date", type: "date", required: true },
      { name: "deliveryBranch", label: "Collection Branch", type: "text" },
      { name: "remarks", label: "Remarks", type: "textarea", span: 2 }
    ],
    canCreate: true
  },
  "inquiry": {
    singular: "Inquiry",
    listColumns: [
      { name: "ticket", label: "Reference" },
      { name: "inquiryType", label: "Type" },
      { name: "subject", label: "Subject" },
      { name: "raisedOn", label: "Raised" },
      { name: "status", label: "Status" }
    ],
    fields: [
      {
        name: "inquiryType",
        label: "Inquiry Type",
        type: "select",
        required: true,
        options: ["Exchange Rate", "Profit Rate", "Account Balance", "Statement Copy", "General"]
      },
      {
        name: "currencyPair",
        label: "Currency Pair (if FX)",
        type: "text",
        placeholder: "e.g. USD/BDT"
      },
      { name: "subject", label: "Subject", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", span: 2 }
    ],
    canCreate: true
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
      { name: "status", label: "Status" }
    ],
    fields: [
      { name: "ref", label: "Transaction Reference", type: "text", required: true },
      { name: "moduleTitle", label: "Source Module", type: "text", required: true },
      { name: "details", label: "Transaction Details", type: "textarea", span: 2, required: true },
      { name: "maker", label: "Requested By (Maker)", type: "text", required: true },
      { name: "risk", label: "Risk Evaluation", type: "select", required: true, options: ["Low", "Medium", "High"] },
      { name: "amount", label: "Amount (BDT/USD)", type: "amount", required: true },
      { name: "remarks", label: "Remarks / Verification Notes", type: "textarea", span: 2 }
    ],
    canCreate: false
  },
  "accounts": {
    singular: "Account",
    listColumns: [
      { name: "accountNo", label: "Account No" },
      { name: "accountName", label: "Account Name" },
      { name: "accountType", label: "Account Type" },
      { name: "currency", label: "Ccy" },
      { name: "balance", label: "Ledger Balance", align: "right" },
      { name: "availableBalance", label: "Available Bal", align: "right" }
    ],
    fields: [
      { name: "accountNo", label: "Account Number", type: "text", required: true },
      { name: "accountName", label: "Account Name", type: "text", required: true },
      {
        name: "accountType",
        label: "Account Type",
        type: "select",
        required: true,
        options: ["Al-Wadeeah Current", "Mudaraba Savings", "Mudaraba Term Deposit", "Special Notice Deposit"]
      },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "balance", label: "Ledger Balance", type: "amount", required: true },
      { name: "availableBalance", label: "Available Balance", type: "amount", required: true },
      { name: "branchName", label: "Branch Name", type: "text" },
      { name: "routingNumber", label: "Routing Number", type: "text" },
      { name: "swiftCode", label: "SWIFT BIC", type: "text" }
    ],
    canCreate: false
  },
  "investment": {
    singular: "Investment Facility",
    listColumns: [
      { name: "facilityNo", label: "Facility No" },
      { name: "facilityType", label: "Finance Mode" },
      { name: "limitAmount", label: "Approved Limit", align: "right" },
      { name: "outstandingAmount", label: "Outstanding", align: "right" },
      { name: "expiryDate", label: "Expiry Date" },
      { name: "status", label: "Status" }
    ],
    fields: [
      { name: "facilityNo", label: "Facility Number", type: "text", required: true },
      {
        name: "facilityType",
        label: "Mode of Finance",
        type: "select",
        required: true,
        options: ["Bai-Murabaha", "HPSM (Home/Asset)", "Ijarah", "Musharaka", "L/C Related Finance"]
      },
      { name: "limitAmount", label: "Approved Limit (BDT)", type: "amount", required: true },
      { name: "outstandingAmount", label: "Outstanding Amount (BDT)", type: "amount", required: true },
      { name: "profitRate", label: "Markup / Profit Rate %", type: "number", required: true },
      { name: "expiryDate", label: "Expiry Date", type: "date", required: true },
      { name: "securityDetails", label: "Security & Collateral Details", type: "textarea", span: 2 }
    ],
    canCreate: false
  },
  "term-deposit": {
    singular: "Term Deposit",
    listColumns: [
      { name: "receiptNo", label: "Receipt No" },
      { name: "type", label: "Deposit Scheme" },
      { name: "principalAmount", label: "Principal", align: "right" },
      { name: "profitRate", label: "Expected Profit %" },
      { name: "maturityDate", label: "Maturity Date" },
      { name: "status", label: "Status" }
    ],
    fields: [
      { name: "receiptNo", label: "FDR Receipt Number", type: "text", required: true },
      {
        name: "type",
        label: "Deposit Scheme",
        type: "select",
        required: true,
        options: ["Mudaraba Term Deposit (FDR)", "Mudaraba Monthly Profit Scheme"]
      },
      { name: "principalAmount", label: "Principal Amount (BDT)", type: "amount", required: true },
      { name: "profitRate", label: "Expected Profit Rate %", type: "number", required: true },
      { name: "tenureMonths", label: "Tenure (Months)", type: "number", required: true },
      { name: "openingDate", label: "Opening Date", type: "date", required: true },
      { name: "maturityDate", label: "Maturity Date", type: "date", required: true },
      { name: "linkedAccount", label: "Linked Payout Account", type: "text" }
    ],
    canCreate: false
  },
  "import-lc": {
    singular: "Import LC",
    listColumns: [
      { name: "lcNumber", label: "LC Number" },
      { name: "beneficiaryName", label: "Beneficiary" },
      { name: "lcAmount", label: "LC Amount", align: "right" },
      { name: "lcType", label: "LC Type" },
      { name: "expiryDate", label: "Expiry Date" },
      { name: "status", label: "Status" }
    ],
    fields: [
      { name: "lcNumber", label: "LC Number", type: "text", required: true },
      {
        name: "lcType",
        label: "LC Type",
        type: "select",
        required: true,
        options: ["Sight LC", "Usance LC", "UPAS LC", "Back-to-Back LC"]
      },
      { name: "beneficiaryName", label: "Beneficiary Name", type: "text", required: true },
      { name: "beneficiaryAddress", label: "Beneficiary Address", type: "textarea", span: 2 },
      { name: "lcAmount", label: "LC Amount", type: "amount", required: true },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      { name: "openingDate", label: "Opening Date", type: "date", required: true },
      { name: "expiryDate", label: "Expiry Date", type: "date", required: true },
      { name: "shipmentDate", label: "Latest Shipment Date", type: "date" },
      { name: "goodsDescription", label: "Description of Goods", type: "textarea", span: 2, required: true },
      { name: "swiftReference", label: "SWIFT Reference Number", type: "text" }
    ],
    canCreate: false
  },
  "import-bill": {
    singular: "Import Bill",
    listColumns: [
      { name: "billNumber", label: "Bill Number" },
      { name: "lcNumber", label: "Linked LC" },
      { name: "billAmount", label: "Bill Amount", align: "right" },
      { name: "discrepancyStatus", label: "Discrepancies" },
      { name: "dueDate", label: "Due Date" },
      { name: "status", label: "Status" }
    ],
    fields: [
      { name: "billNumber", label: "Bill Number", type: "text", required: true },
      { name: "lcNumber", label: "Linked LC Number", type: "text", required: true },
      { name: "billAmount", label: "Bill Amount", type: "amount", required: true },
      { name: "currency", label: "Currency", type: "select", required: true, options: CURRENCIES },
      {
        name: "discrepancyStatus",
        label: "Discrepancy Status",
        type: "select",
        required: true,
        options: ["Clean / No Discrepancies", "Minor Discrepancy", "Major Discrepancy (Awaiting Consent)"]
      },
      { name: "discrepancyDetails", label: "Discrepancy Details", type: "textarea", span: 2 },
      { name: "dueDate", label: "Payment Due Date", type: "date", required: true },
      { name: "acceptanceDate", label: "Acceptance Date", type: "date" }
    ],
    canCreate: false
  },
  "export-lc": {
    singular: "Export LC",
    listColumns: [
      { name: "lcNumber", label: "LC Number" },
      { name: "applicantName", label: "Buyer / Applicant" },
      { name: "lcAmount", label: "LC Amount", align: "right" },
      { name: "issuingBank", label: "Issuing Bank" },
      { name: "expiryDate", label: "Expiry Date" },
      { name: "status", label: "Status" }
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
      { name: "goodsDescription", label: "Description of Goods", type: "textarea", span: 2 }
    ],
    canCreate: false
  },
  "export-bill": {
    singular: "Export Bill",
    listColumns: [
      { name: "billNumber", label: "Export Bill Ref" },
      { name: "lcNumber", label: "Linked LC" },
      { name: "billAmount", label: "Bill Amount", align: "right" },
      { name: "negotiatedAmount", label: "Negotiated", align: "right" },
      { name: "realizedAmount", label: "Realized", align: "right" },
      { name: "status", label: "Status" }
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
      { name: "remarks", label: "Remarks", type: "textarea", span: 2 }
    ],
    canCreate: false
  },
  "credit-card": {
    singular: "Credit Card",
    listColumns: [
      { name: "cardNumber", label: "Card Number" },
      { name: "cardholderName", label: "Cardholder Name" },
      { name: "cardType", label: "Card Type" },
      { name: "limitAmount", label: "Credit Limit", align: "right" },
      { name: "outstandingAmount", label: "Outstanding", align: "right" },
      { name: "status", label: "Status" }
    ],
    fields: [
      { name: "cardNumber", label: "Card Number (Masked)", type: "text", required: true },
      { name: "cardholderName", label: "Cardholder Name", type: "text", required: true },
      {
        name: "cardType",
        label: "Card Type",
        type: "select",
        required: true,
        options: ["Visa Corporate Gold", "Mastercard Corporate Platinum"]
      },
      { name: "limitAmount", label: "Approved Credit Limit (BDT)", type: "amount", required: true },
      { name: "outstandingAmount", label: "Outstanding Balance (BDT)", type: "amount", required: true },
      { name: "availableLimit", label: "Available Limit (BDT)", type: "amount", required: true },
      { name: "dueDate", label: "Payment Due Date", type: "date", required: true },
      { name: "minDue", label: "Minimum Payment Due (BDT)", type: "amount" }
    ],
    canCreate: false
  },
  "cash-management": {
    singular: "Sweep Setup",
    listColumns: [
      { name: "sweepRef", label: "Sweep Reference" },
      { name: "type", label: "Sweep Type" },
      { name: "sourceAccount", label: "Source Account" },
      { name: "targetAccount", label: "Target Account" },
      { name: "thresholdAmount", label: "Threshold", align: "right" },
      { name: "status", label: "Status" }
    ],
    fields: [
      { name: "sweepRef", label: "Sweep Reference Name", type: "text", required: true },
      {
        name: "type",
        label: "Sweep Type",
        type: "select",
        required: true,
        options: ["Zero Balance Sweep (ZBA)", "Target Balance Sweep", "Surplus Pool Sweep"]
      },
      {
        name: "sourceAccount",
        label: "Source Subsidiary A/C",
        type: "select",
        required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"]
      },
      {
        name: "targetAccount",
        label: "Target Pooling A/C",
        type: "select",
        required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"]
      },
      { name: "thresholdAmount", label: "Trigger Threshold Amount (BDT)", type: "amount", required: true },
      {
        name: "sweepSchedule",
        label: "Schedule Frequency",
        type: "select",
        required: true,
        options: ["Daily EOD", "Weekly (Thursday)", "Monthly End"]
      }
    ],
    canCreate: true
  },
  "profile": {
    singular: "Profile Detail",
    listColumns: [
      { name: "username", label: "Username" },
      { name: "displayName", label: "Full Name" },
      { name: "email", label: "Email" },
      { name: "phone", label: "Phone" },
      { name: "role", label: "Assigned Role" }
    ],
    fields: [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "displayName", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel" },
      { name: "role", label: "Assigned Corporate Role", type: "text", required: true },
      { name: "twoFactorEnabled", label: "Enable 2FA (SMS/OTP)", type: "select", options: ["Enabled", "Disabled"] },
      {
        name: "notificationPreference",
        label: "Notification Preference",
        type: "select",
        options: ["Email Only", "SMS Only", "Both Email and SMS", "None"]
      }
    ],
    canCreate: false
  },
  "sukuk": {
    singular: "Sukuk Portfolio",
    listColumns: [
      { name: "certificateNo", label: "Certificate #" },
      { name: "sukukType", label: "Sukuk Type" },
      { name: "faceValue", label: "Face Value", align: "right" },
      { name: "expectedYield", label: "Expected Yield" },
      { name: "maturityDate", label: "Maturity Date" },
      { name: "holdingStatus", label: "Status" }
    ],
    fields: [
      { name: "certificateNo", label: "Certificate Number", type: "text", required: true },
      {
        name: "sukukType",
        label: "Sukuk Type",
        type: "select",
        required: true,
        options: ["Sukuk Al-Ijarah", "Sukuk Al-Mudarabah", "Sukuk Al-Murabahah", "Sukuk Al-Musharakah"]
      },
      { name: "faceValue", label: "Face Value (BDT)", type: "amount", required: true },
      { name: "expectedYield", label: "Expected Profit/Yield Rate (%)", type: "number", required: true },
      { name: "maturityDate", label: "Maturity Date", type: "date", required: true },
      {
        name: "payoutFrequency",
        label: "Profit Payout Frequency",
        type: "select",
        required: true,
        options: ["Monthly", "Quarterly", "Semi-Annually", "At Maturity"]
      },
      {
        name: "holdingStatus",
        label: "Holding Status",
        type: "select",
        required: true,
        options: ["Active", "Pledged", "Matured"]
      }
    ],
    canCreate: false
  },
  "murabaha": {
    singular: "Murabaha Request",
    listColumns: [
      { name: "reference", label: "Reference" },
      { name: "facilityNo", label: "Facility" },
      { name: "vendorName", label: "Supplier" },
      { name: "orderValue", label: "Order Value", align: "right" },
      { name: "repaymentTenure", label: "Tenure" },
      { name: "status", label: "Status" }
    ],
    fields: [
      {
        name: "facilityNo",
        label: "Linked Murabaha Facility",
        type: "select",
        required: true,
        options: ["FAC-MUR-8839 — Globex Raw Material Limit"]
      },
      { name: "vendorName", label: "Supplier / Vendor Name", type: "text", required: true },
      { name: "goodsDescription", label: "Goods Description & Specifications", type: "textarea", span: 2, required: true },
      { name: "orderValue", label: "Purchase Order Value (BDT)", type: "amount", required: true },
      { name: "markupRate", label: "Markup / Profit Rate (%)", type: "number", required: true },
      {
        name: "repaymentTenure",
        label: "Repayment Tenure",
        type: "select",
        required: true,
        options: ["3 Months", "6 Months", "9 Months", "12 Months"]
      },
      {
        name: "proformaInvoice",
        label: "Proforma Invoice / Quotation File",
        type: "file",
        required: true,
        hint: "Max 10 MB. PDF or Image format of supplier proforma invoice."
      },
      { name: "remarks", label: "Remarks / Delivery Instructions", type: "textarea", span: 2 }
    ],
    canCreate: true
  },
  "zakat": {
    singular: "Zakat Request",
    listColumns: [
      { name: "reference", label: "Reference" },
      { name: "calcMethod", label: "Calculation Method" },
      { name: "netZakatable", label: "Net Zakatable Wealth", align: "right" },
      { name: "amountToPay", label: "Payment Amount", align: "right" },
      { name: "beneficiaryFund", label: "Zakat Fund" },
      { name: "status", label: "Status" }
    ],
    fields: [
      {
        name: "calcMethod",
        label: "Zakat Calculation Method",
        type: "select",
        required: true,
        options: ["Asset-Based (2.5%)", "Net Worth-Based (2.5%)"]
      },
      { name: "totalAssets", label: "Total Zakatable Assets (BDT)", type: "amount", required: true },
      { name: "deductibleLiabilities", label: "Deductible Liabilities (BDT)", type: "amount", required: true },
      { name: "netZakatable", label: "Net Zakatable Wealth (BDT)", type: "amount", required: true },
      { name: "calculatedZakat", label: "Calculated Zakat (2.5% of Net Wealth) (BDT)", type: "amount", required: true },
      {
        name: "payoutAccount",
        label: "Debit Account",
        type: "select",
        required: true,
        options: ["0123100001 — SJIBL Current", "0123100002 — SJIBL Mudaraba"]
      },
      {
        name: "beneficiaryFund",
        label: "Zakat Recipient / Charity Fund",
        type: "select",
        required: true,
        options: ["SJIBL Corporate Zakat Fund", "Anjuman Mufidul Islam Zakat Fund", "Ahsania Mission Charity", "JAAGO Foundation"]
      },
      { name: "amountToPay", label: "Disbursal Amount (BDT)", type: "amount", required: true },
      { name: "remarks", label: "CSR / Remarks", type: "textarea", span: 2 }
    ],
    canCreate: true
  }
};
const DEFAULT_SCHEMA = {
  singular: "Record",
  listColumns: [
    { name: "reference", label: "Reference" },
    { name: "title", label: "Title" },
    { name: "amount", label: "Amount", align: "right" },
    { name: "date", label: "Date" },
    { name: "status", label: "Status" }
  ],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "reference", label: "Reference", type: "text" },
    { name: "amount", label: "Amount (BDT)", type: "amount" },
    { name: "date", label: "Date", type: "date" },
    { name: "remarks", label: "Remarks", type: "textarea", span: 2 }
  ],
  canCreate: false
};
function getSchema(slug) {
  return MODULE_SCHEMAS[slug] ?? DEFAULT_SCHEMA;
}
const KEY = (slug) => `sjibl.ctb.v2.${slug}`;
function read(slug) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY(slug));
    if (raw) return JSON.parse(raw);
  } catch {
  }
  const seeded = seed(slug);
  write(slug, seeded);
  return seeded;
}
function write(slug, rows) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY(slug), JSON.stringify(rows));
}
function list(slug) {
  return read(slug).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
}
function get(slug, id) {
  return read(slug).find((r) => r.id === id);
}
function nextId(slug) {
  const prefix = (MODULE_SCHEMAS[slug]?.singular ?? "REC").replace(/[^A-Z]/gi, "").slice(0, 3).toUpperCase() || "REC";
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}
function create(slug, data) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const rec = {
    id: nextId(slug),
    status: "Pending",
    ...data,
    createdAt: now,
    updatedAt: now
  };
  const rows = read(slug);
  rows.unshift(rec);
  write(slug, rows);
  if (slug !== "approval" && slug !== "profile") {
    const schema = getSchema(slug);
    if (schema && schema.canCreate) {
      const session = getSession();
      const maker = session?.username || "maker";
      let amt = 0;
      if (typeof rec.amount === "number") amt = rec.amount;
      else if (typeof rec.amount === "string") amt = parseFloat(rec.amount) || 0;
      else if (typeof rec.totalAmount === "number") amt = rec.totalAmount;
      else if (typeof rec.totalAmount === "string") amt = parseFloat(rec.totalAmount) || 0;
      let risk = "Low";
      if (amt >= 1e7) risk = "High";
      else if (amt >= 1e6 || slug === "lc-initiation") risk = "Medium";
      let details = `New request in ${schema.singular}`;
      if (slug === "fund-transfer") {
        details = `${rec.transferType || "Transfer"} of ${rec.currency || "BDT"} ${amt.toLocaleString()} to ${rec.beneficiary || "Unknown"}`;
      } else if (slug === "bulk-transfer") {
        details = `Bulk Transfer: ${rec.batchRef} (${rec.totalRecords || 0} records, BDT ${amt.toLocaleString()})`;
      } else if (slug === "lc-initiation") {
        details = `${rec.lcType || "Sight"} LC Application for ${rec.currency || "USD"} ${amt.toLocaleString()} to ${rec.beneficiary || "Unknown"}`;
      } else if (slug === "bill-pay") {
        details = `Bill Payment to ${rec.biller} (${rec.consumerNo}, BDT ${amt.toLocaleString()})`;
      } else if (slug === "beneficiary") {
        details = `Add Beneficiary: ${rec.name} (${rec.bankName}, A/C: ${rec.account})`;
      } else if (slug === "payment-instruction") {
        details = `Payment Instruction (${rec.instrumentType}) to ${rec.payee} for BDT ${amt.toLocaleString()}`;
      } else if (slug === "services") {
        details = `Service: ${rec.serviceType} for A/C ${rec.account}`;
      } else if (slug === "service-request") {
        details = `Support Ticket: ${rec.subject} (${rec.priority} priority)`;
      } else if (slug === "murabaha") {
        details = `Murabaha Goods Procurement: BDT ${amt.toLocaleString()} from ${rec.vendorName || "Unknown"}`;
      } else if (slug === "zakat") {
        details = `Zakat & CSR Disbursal: BDT ${amt.toLocaleString()} to ${rec.beneficiaryFund || "Unknown"}`;
      }
      const appRows = read("approval");
      const appRec = {
        id: `TXN-${Math.floor(1e4 + Math.random() * 9e4)}`,
        createdAt: now,
        updatedAt: now,
        status: "Pending",
        ref: rec.id,
        moduleTitle: schema.singular,
        details,
        maker,
        risk,
        amount: amt,
        sourceSlug: slug,
        remarks: "Awaiting maker-checker verification."
      };
      appRows.unshift(appRec);
      write("approval", appRows);
    }
  }
  return rec;
}
function update(slug, id, data) {
  const rows = read(slug);
  const i = rows.findIndex((r) => r.id === id);
  if (i < 0) return void 0;
  const oldRec = rows[i];
  const newRec = { ...oldRec, ...data, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  rows[i] = newRec;
  write(slug, rows);
  if (slug === "approval" && data.status && data.status !== oldRec.status) {
    const sourceSlug = oldRec.sourceSlug;
    const originalId = oldRec.ref;
    if (sourceSlug && originalId) {
      update(sourceSlug, originalId, { status: data.status });
    }
  }
  if (slug !== "approval" && data.status && data.status !== oldRec.status) {
    const approvals = read("approval");
    const appIndex = approvals.findIndex((a) => a.sourceSlug === slug && a.ref === id);
    if (appIndex >= 0 && approvals[appIndex].status !== data.status) {
      approvals[appIndex] = {
        ...approvals[appIndex],
        status: data.status,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      write("approval", approvals);
    }
  }
  return newRec;
}
function remove(slug, id) {
  const rows = read(slug);
  const next = rows.filter((r) => r.id !== id);
  if (next.length === rows.length) return false;
  write(slug, next);
  if (slug !== "approval") {
    const approvals = read("approval");
    const nextApp = approvals.filter((a) => !(a.sourceSlug === slug && a.ref === id));
    if (nextApp.length !== approvals.length) {
      write("approval", nextApp);
    }
  }
  return true;
}
function seed(slug) {
  const now = Date.now();
  const day = 864e5;
  const iso = (d) => new Date(d).toISOString();
  const dt = (d) => new Date(d).toISOString().slice(0, 10);
  const base = (i, status) => ({
    id: `${slug.toUpperCase().slice(0, 3)}-${(1e3 + i).toString()}`,
    createdAt: iso(now - i * day),
    updatedAt: iso(now - i * day),
    status
  });
  switch (slug) {
    case "fund-transfer":
      return [
        {
          ...base(1, "Approved"),
          reference: "FT-1001",
          transferType: "RTGS",
          fromAccount: "0123100001 — SJIBL Current",
          beneficiary: "Globex Industries",
          beneficiaryAccount: "9981200022",
          amount: 45e5,
          currency: "BDT",
          valueDate: dt(now),
          purpose: "Supplier Payment"
        },
        {
          ...base(2, "Pending"),
          reference: "FT-1002",
          transferType: "EFTN",
          fromAccount: "0123100002 — SJIBL Mudaraba",
          beneficiary: "BRAC Logistics",
          beneficiaryAccount: "5577001188",
          amount: 85e4,
          currency: "BDT",
          valueDate: dt(now - day),
          purpose: "Salary"
        },
        {
          ...base(3, "Approved"),
          reference: "FT-1003",
          transferType: "Foreign (SWIFT)",
          fromAccount: "0123100003 — USD NOSTRO",
          beneficiary: "Yangtse Trading",
          beneficiaryAccount: "CN-77110099",
          amount: 32e4,
          currency: "USD",
          valueDate: dt(now - 2 * day),
          purpose: "Inter-company"
        }
      ];
    case "beneficiary":
      return [
        {
          ...base(1, "Approved"),
          name: "Globex Industries",
          nickname: "Globex",
          type: "Other Bank (EFTN/RTGS/NPSB)",
          account: "9981200022",
          bankName: "Dutch-Bangla Bank",
          branch: "Motijheel",
          currency: "BDT"
        },
        {
          ...base(2, "Approved"),
          name: "Yangtse Trading",
          nickname: "Yangtse-CN",
          type: "Foreign (SWIFT)",
          account: "CN-77110099",
          bankName: "Bank of China",
          branch: "Shanghai",
          swiftCode: "BKCHCNBJ",
          currency: "USD"
        }
      ];
    case "bill-pay":
      return [
        {
          ...base(1, "Approved"),
          reference: "BP-201",
          billerCategory: "Utility",
          biller: "DESCO",
          consumerNo: "ACC-771122",
          amount: 14200,
          currency: "BDT"
        },
        {
          ...base(2, "Pending"),
          reference: "BP-202",
          billerCategory: "Telecom / Recharge",
          biller: "Grameenphone",
          consumerNo: "01711-000-000",
          amount: 500,
          currency: "BDT"
        }
      ];
    case "bulk-transfer":
      return [
        {
          ...base(1, "Pending"),
          batchRef: "PAYROLL-AUG-2025",
          fileName: "payroll-aug.csv",
          fileType: "CSV",
          totalRecords: 248,
          totalAmount: 1284e4,
          currency: "BDT"
        }
      ];
    case "lc-initiation":
      return [
        {
          ...base(1, "Pending"),
          lcRef: "LC-APP-9912",
          lcType: "Sight",
          beneficiary: "Yangtse Trading",
          country: "China",
          currency: "USD",
          amount: 32e4,
          expiryDate: dt(now + 60 * day),
          issueDate: dt(now)
        }
      ];
    case "services":
      return [
        {
          ...base(1, "Approved"),
          ticket: "SRV-501",
          serviceType: "Cheque Book Request",
          account: "0123100001 — SJIBL Current",
          quantity: 50,
          raisedOn: dt(now - day)
        }
      ];
    case "service-request":
      return [
        {
          ...base(1, "Pending"),
          ticket: "TCK-7741",
          subject: "Cannot download statement PDF",
          category: "Account",
          priority: "Medium",
          raisedBy: "Tania (Maker)"
        }
      ];
    case "corporate-admin":
      return [
        {
          ...base(1, "Approved"),
          username: "tania.m",
          displayName: "Tania Mahmud",
          role: "Maker",
          entity: "Globex Industries Ltd",
          email: "tania@globex.bd",
          dailyLimit: 5e6,
          perTxnLimit: 1e6
        },
        {
          ...base(2, "Approved"),
          username: "rashed.c",
          displayName: "Rashed Chowdhury",
          role: "Checker",
          entity: "Globex Industries Ltd",
          email: "rashed@globex.bd",
          dailyLimit: 2e7,
          perTxnLimit: 5e6
        }
      ];
    case "invoice":
      return [
        {
          ...base(1, "Approved"),
          invoiceNo: "INV-2025-0411",
          customer: "Pran Foods Ltd",
          currency: "BDT",
          amount: 125e4,
          issueDate: dt(now - 5 * day),
          dueDate: dt(now + 10 * day),
          virtualAccount: "VA-7711-0001"
        },
        {
          ...base(2, "Pending"),
          invoiceNo: "INV-2025-0412",
          customer: "Aarong Retail",
          currency: "BDT",
          amount: 48e4,
          issueDate: dt(now - 2 * day),
          dueDate: dt(now + 13 * day),
          virtualAccount: "VA-7711-0002"
        }
      ];
    case "payment-instruction":
      return [
        {
          ...base(1, "Approved"),
          instructionRef: "PI-3301",
          instrumentType: "Pay Order",
          fromAccount: "0123100001 — SJIBL Current",
          payee: "NBR — Income Tax",
          currency: "BDT",
          amount: 425e3,
          issueDate: dt(now - day)
        }
      ];
    case "inquiry":
      return [
        {
          ...base(1, "Approved"),
          ticket: "INQ-9001",
          inquiryType: "Exchange Rate",
          currencyPair: "USD/BDT",
          subject: "Today's TT clean rate",
          raisedOn: dt(now)
        }
      ];
    case "approval":
      return [
        {
          ...base(1, "Pending"),
          ref: "FT-1002",
          moduleTitle: "Fund Transfer",
          details: "EFTN BDT 850,000 to BRAC Logistics",
          maker: "rashed.c",
          risk: "Low",
          amount: 85e4,
          sourceSlug: "fund-transfer",
          remarks: "Salary disbursement for dispatch team."
        },
        {
          ...base(2, "Pending"),
          ref: "BP-202",
          moduleTitle: "Bill Pay",
          details: "Bill Payment to Grameenphone (01711-000-000, BDT 500)",
          maker: "tania.m",
          risk: "Low",
          amount: 500,
          sourceSlug: "bill-pay",
          remarks: "CFO phone bill replenishment."
        },
        {
          ...base(3, "Pending"),
          ref: "LC-APP-9912",
          moduleTitle: "LC Initiation",
          details: "Sight LC USD 320,000 to Yangtse Trading",
          maker: "rashed.c",
          risk: "High",
          amount: 32e4,
          sourceSlug: "lc-initiation",
          remarks: "Steel procurement agreement attached."
        },
        {
          ...base(4, "Pending"),
          ref: "MB-2025-0109",
          moduleTitle: "Murabaha Procurement",
          details: "Murabaha Goods Procurement: BDT 4,500,000 from Chemical-Ind BDT",
          maker: "tania.m",
          risk: "Medium",
          amount: 45e5,
          sourceSlug: "murabaha",
          remarks: "Chemical invoice verified."
        },
        {
          ...base(5, "Pending"),
          ref: "ZK-2025-0015",
          moduleTitle: "Zakat Request",
          details: "Zakat & CSR Disbursal: BDT 1,500,000 to Anjuman Mufidul Islam Zakat Fund",
          maker: "rashed.c",
          risk: "Medium",
          amount: 15e5,
          sourceSlug: "zakat",
          remarks: "Ramadan Zakat donation approval."
        }
      ];
    case "accounts":
      return [
        {
          ...base(1, "Approved"),
          accountNo: "0123100001",
          accountName: "Globex Industries Ltd — Operations",
          accountType: "Al-Wadeeah Current",
          currency: "BDT",
          balance: 124562300,
          availableBalance: 124562300,
          branchName: "Dilkusha Branch",
          routingNumber: "185261452",
          swiftCode: "SJIBBDDHDKA"
        },
        {
          ...base(2, "Approved"),
          accountNo: "0123100002",
          accountName: "Globex Industries Ltd — Payroll Account",
          accountType: "Al-Wadeeah Current",
          currency: "BDT",
          balance: 1845e4,
          availableBalance: 1845e4,
          branchName: "Dilkusha Branch",
          routingNumber: "185261452",
          swiftCode: "SJIBBDDHDKA"
        },
        {
          ...base(3, "Approved"),
          accountNo: "0123100003",
          accountName: "Globex Industries Ltd — USD Operating",
          accountType: "Al-Wadeeah Current",
          currency: "USD",
          balance: 845200,
          availableBalance: 84e4,
          branchName: "OBU Branch",
          routingNumber: "185260000",
          swiftCode: "SJIBBDDHXXX"
        }
      ];
    case "investment":
      return [
        {
          ...base(1, "Approved"),
          facilityNo: "FAC-MUR-8839",
          facilityType: "Bai-Murabaha",
          limitAmount: 25e7,
          outstandingAmount: 1854e5,
          profitRate: 9.5,
          expiryDate: "2026-12-31",
          securityDetails: "Hypothecation of stock and personal guarantee of Directors."
        },
        {
          ...base(2, "Approved"),
          facilityNo: "FAC-HPSM-2201",
          facilityType: "HPSM (Home/Asset)",
          limitAmount: 1e8,
          outstandingAmount: 654e5,
          profitRate: 9,
          expiryDate: "2030-06-30",
          securityDetails: "Registered Mortgage of industrial land and buildings."
        }
      ];
    case "term-deposit":
      return [
        {
          ...base(1, "Approved"),
          receiptNo: "FDR-774811",
          type: "Mudaraba Term Deposit (FDR)",
          principalAmount: 5e7,
          profitRate: 7.5,
          tenureMonths: 12,
          openingDate: "2025-01-15",
          maturityDate: "2026-01-15",
          linkedAccount: "0123100001"
        },
        {
          ...base(2, "Approved"),
          receiptNo: "FDR-889022",
          type: "Mudaraba Term Deposit (FDR)",
          principalAmount: 25e6,
          profitRate: 7.25,
          tenureMonths: 6,
          openingDate: "2025-03-20",
          maturityDate: "2025-09-20",
          linkedAccount: "0123100001"
        }
      ];
    case "import-lc":
      return [
        {
          ...base(1, "Approved"),
          lcNumber: "LC-IMP-2025-0992",
          lcType: "Sight LC",
          beneficiaryName: "Yangtse Trading",
          beneficiaryAddress: "Block B, Industrial Area, Pudong, Shanghai, China",
          lcAmount: 32e4,
          currency: "USD",
          openingDate: "2025-05-10",
          expiryDate: dt(now + 60 * day),
          shipmentDate: dt(now + 30 * day),
          goodsDescription: "Industrial raw machinery and steel structures.",
          swiftReference: "SWF-9928182"
        },
        {
          ...base(2, "Approved"),
          lcNumber: "LC-IMP-2025-0994",
          lcType: "UPAS LC",
          beneficiaryName: "Global Chemicals GMBH",
          beneficiaryAddress: "Mainz, Frankfurt, Germany",
          lcAmount: 185e3,
          currency: "EUR",
          openingDate: "2025-06-01",
          expiryDate: dt(now + 90 * day),
          shipmentDate: dt(now + 45 * day),
          goodsDescription: "Chemical grade additives and solvents.",
          swiftReference: "SWF-9928185"
        }
      ];
    case "import-bill":
      return [
        {
          ...base(1, "Approved"),
          billNumber: "BL-IMP-55201",
          lcNumber: "LC-IMP-2025-0992",
          billAmount: 15e4,
          currency: "USD",
          discrepancyStatus: "Clean / No Discrepancies",
          discrepancyDetails: "",
          dueDate: dt(now + 15 * day),
          acceptanceDate: dt(now - 10 * day)
        },
        {
          ...base(2, "Pending"),
          billNumber: "BL-IMP-55204",
          lcNumber: "LC-IMP-2025-0994",
          billAmount: 85e3,
          currency: "EUR",
          discrepancyStatus: "Minor Discrepancy",
          discrepancyDetails: "Late shipment by 2 days; draft amount exceeds invoice.",
          dueDate: dt(now + 25 * day),
          acceptanceDate: ""
        }
      ];
    case "export-lc":
      return [
        {
          ...base(1, "Approved"),
          lcNumber: "LC-EXP-88912",
          applicantName: "Walmart Inc",
          lcAmount: 85e4,
          currency: "USD",
          issuingBank: "Wells Fargo Bank NA",
          advisingRef: "ADV-88291",
          openingDate: "2025-04-15",
          expiryDate: dt(now + 45 * day),
          shipmentDate: dt(now + 15 * day),
          goodsDescription: "Finished readymade garments, cotton t-shirts."
        }
      ];
    case "export-bill":
      return [
        {
          ...base(1, "Approved"),
          billNumber: "BL-EXP-33201",
          lcNumber: "LC-EXP-88912",
          billAmount: 35e4,
          currency: "USD",
          negotiatedAmount: 34e4,
          realizedAmount: 35e4,
          realizationDate: dt(now - 5 * day),
          buyerName: "Walmart Inc",
          remarks: "Fully realized and settled to BDT current account."
        }
      ];
    case "credit-card":
      return [
        {
          ...base(1, "Approved"),
          cardNumber: "4521-XXXX-XXXX-8830",
          cardholderName: "Mohammad Rashed (CEO)",
          cardType: "Visa Corporate Gold",
          limitAmount: 1e6,
          outstandingAmount: 245e3,
          availableLimit: 755e3,
          dueDate: dt(now + 10 * day),
          minDue: 12250
        },
        {
          ...base(2, "Approved"),
          cardNumber: "4521-XXXX-XXXX-1104",
          cardholderName: "Tania Mahmud (CFO)",
          cardType: "Mastercard Corporate Platinum",
          limitAmount: 15e5,
          outstandingAmount: 485e3,
          availableLimit: 1015e3,
          dueDate: dt(now + 10 * day),
          minDue: 24250
        }
      ];
    case "cash-management":
      return [
        {
          ...base(1, "Approved"),
          sweepRef: "SWP-OP-MASTER",
          type: "Target Balance Sweep",
          sourceAccount: "0123100002 — SJIBL Mudaraba",
          targetAccount: "0123100001 — SJIBL Current",
          thresholdAmount: 5e6,
          sweepSchedule: "Daily EOD"
        }
      ];
    case "profile":
      return [
        {
          ...base(1, "Approved"),
          username: "rashed.c",
          displayName: "Rashed Chowdhury",
          email: "rashed@globex.bd",
          phone: "+880-1711-000000",
          role: "Checker",
          twoFactorEnabled: "Enabled",
          notificationPreference: "Both Email and SMS"
        }
      ];
    case "sukuk":
      return [
        {
          ...base(1, "Approved"),
          certificateNo: "SK-2025-0819",
          sukukType: "Sukuk Al-Ijarah",
          faceValue: 1e8,
          expectedYield: 8.75,
          maturityDate: "2030-06-15",
          payoutFrequency: "Semi-Annually",
          holdingStatus: "Active"
        },
        {
          ...base(2, "Approved"),
          certificateNo: "SK-2025-0904",
          sukukType: "Sukuk Al-Mudarabah",
          faceValue: 5e7,
          expectedYield: 9.1,
          maturityDate: "2028-12-31",
          payoutFrequency: "Quarterly",
          holdingStatus: "Active"
        }
      ];
    case "murabaha":
      return [
        {
          ...base(1, "Approved"),
          reference: "MB-2025-0104",
          facilityNo: "FAC-MUR-8839 — Globex Raw Material Limit",
          vendorName: "Steel-Works Bangladesh",
          orderValue: 125e5,
          markupRate: 9.5,
          repaymentTenure: "6 Months",
          goodsDescription: "High-grade industrial steel sheets and rebars.",
          proformaInvoice: "invoice-steel-4910.pdf"
        },
        {
          ...base(2, "Pending"),
          reference: "MB-2025-0109",
          facilityNo: "FAC-MUR-8839 — Globex Raw Material Limit",
          vendorName: "Chemical-Ind BDT",
          orderValue: 45e5,
          markupRate: 9.5,
          repaymentTenure: "3 Months",
          goodsDescription: "Industrial solvents and binding catalysts.",
          proformaInvoice: "invoice-chem-3392.pdf"
        }
      ];
    case "zakat":
      return [
        {
          ...base(1, "Approved"),
          reference: "ZK-2025-0012",
          calcMethod: "Asset-Based (2.5%)",
          totalAssets: 4e8,
          deductibleLiabilities: 15e7,
          netZakatable: 25e7,
          calculatedZakat: 625e4,
          payoutAccount: "0123100001 — SJIBL Current",
          beneficiaryFund: "SJIBL Corporate Zakat Fund",
          amountToPay: 625e4,
          remarks: "Annual corporate Zakat settlement."
        },
        {
          ...base(2, "Pending"),
          reference: "ZK-2025-0015",
          calcMethod: "Asset-Based (2.5%)",
          totalAssets: 8e7,
          deductibleLiabilities: 2e7,
          netZakatable: 6e7,
          calculatedZakat: 15e5,
          payoutAccount: "0123100001 — SJIBL Current",
          beneficiaryFund: "Anjuman Mufidul Islam Zakat Fund",
          amountToPay: 15e5,
          remarks: "Special Ramadan CSR disbursement."
        }
      ];
    default: {
      const schema = getSchema(slug);
      return [1, 2, 3].map((i) => {
        const row = { ...base(i, ["Approved", "Pending", "Rejected"][i % 3]) };
        for (const f of schema.fields) {
          if (f.type === "amount" || f.type === "number") row[f.name] = (i * 12500).toString();
          else if (f.type === "date") row[f.name] = dt(now - i * day);
          else row[f.name] = `${f.label} #${i}`;
        }
        return row;
      });
    }
  }
}
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
export {
  Badge as B,
  getSchema as a,
  create as c,
  get as g,
  list as l,
  remove as r,
  update as u
};
