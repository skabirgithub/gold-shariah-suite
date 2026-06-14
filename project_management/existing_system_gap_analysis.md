# Existing System Gap Analysis: Prototype vs. Production CTB
### Shahjalal Islami Bank PLC (SJIBL)

This document presents a detailed audit of the functional, technical, and architectural gaps in the current system (the ~95% complete front-end prototype) relative to the final production-grade Corporate Transaction Banking (CTB) Solution.

---

## 1. Architectural & Technical Gaps

The primary gap is that the current system is a client-only prototype with mock processing, requiring transition to a secure, enterprise-grade architecture.

| Feature / Domain | Prototype State (Current) | Production Staging Requirements | Gap Description & Action Items |
| :--- | :--- | :--- | :--- |
| **Data Persistence** | LocalStorage-backed via [moduleStore.ts](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/lib/moduleStore.ts). | Relational database (e.g., PostgreSQL/Oracle) with connection pooling. | **High:** Current CRUD operations are volatile and client-side. Need to implement a secure REST API backend (e.g., Java Spring Boot, Node.js) with Hibernate/Prisma ORM. |
| **Core Integration** | Accounts, Investment, and TD modules are read-only mock lists seeded client-side. | Enterprise Service Bus (ESB) / Middleware connection to Core Banking System (CBS). | **Critical:** No live connection to pull balances or post entries. Requires integration with systems like Temenos T24 or Finacle via SOAP/REST endpoints. |
| **Transaction Signing** | Status transitions directly to `Approved` or `Rejected` on button clicks. | Dynamic signature generation backed by a Hardware Security Module (HSM). | **Critical:** Lacks cryptographic non-repudiation. Requires PKCS#11 integration with HSM to verify digital signatures (from USB tokens/PKI cards). |
| **Sandbox System** | Toggle switch dynamically toggles UI header state only. | Separate network environments (Sandbox, UAT, Staging, Production). | **Medium:** Current Sandbox is cosmetic. Requires real network isolation and mock API routing for the test mode. |
| **Session Tracking** | Local countdown timer (`15 * 60` seconds) inside React layout. | Secure session management with server-side token expiry (JWT/OAuth2). | **High:** Front-end countdown can be bypassed. Requires HttpOnly cookies, session sliding, and server-side revocation on logout. |

---

## 2. Core Functional Gaps by Module

While all 23 modules have tailored schemas defined in [moduleSchema.ts](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/lib/moduleSchema.ts), they lack the underlying processing logic.

### 2.1. Payments & Transfers
* **Fund Transfer Routing:** The [fund-transfer](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/lib/moduleSchema.ts#L36) module mocks Own-Account, EFTN, RTGS, and NPSB paths. In production, this requires formatting transactions into specific clearing formats (e.g., ISO 20022 messages for RTGS/BEFTN, BACPS formats for cheques) and processing via Bangladesh Bank gateways.
* **Bulk File Parser:** The [bulk-transfer](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/lib/moduleSchema.ts#L117) module allows file uploads but does not parse them. Production requires an asynchronous batch processing pipeline (using worker queues like RabbitMQ/Celery) to validate headers, verify beneficiary account numbers against national routing tables, and check for duplicates across history.
* **MFA for Approval:** The [approval](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/lib/moduleSchema.ts#L323) module processes status changes instantly. In production, approving any transaction must trigger an SMS OTP or hardware-token validation step before submitting the transaction payload.

### 2.2. Trade Finance
* **SWIFT Format Compliance:** The [lc-initiation](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/lib/moduleSchema.ts#L144) module uses a standard form. In production, inputs must map directly to SWIFT MT700 message fields (e.g., Field 31D for Expiry, Field 45A for Description of Goods) with strict length validations.
* **Discrepancy Approvals:** The [import-bill](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/lib/moduleSchema.ts#L446) module shows a list of discrepancies. A production system must include a digital "Consent & Acceptance" workflow where the corporate client signs off on minor discrepancies to authorize payment release.

### 2.3. Cash & Liquidity Management
* **Sweeping Calculations:** The [cash-management](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/lib/moduleSchema.ts#L542) module stores sweep configurations but does not run them. Production requires an automated scheduler (EOD batch jobs) to pull balances from child accounts, calculate amounts exceeding thresholds, and execute transfer entries via the Core Banking System.
* **Invoice Reconciliation:** The [invoice](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/lib/moduleSchema.ts#L251) module is a simple list. Production requires a reconciliation matching engine that scans incoming deposits to virtual accounts, automatically flags matching invoices as "Paid", and raises alerts for under/over-payments.

---

## 3. Compliance & Security Gaps

Islamic banking and national regulations impose security and compliance rules that must be strictly enforced.

1. **AML / Sanctions Screening:**
   * *Gap:* Current payments and trade applications are submitted directly without screening checks.
   * *Production Requirement:* Every beneficiary name and transaction details must run through an AML API (e.g., World-Check, Dow Jones) to filter out sanctioned entities and politically exposed persons (PEPs) before entering the approval queue.
2. **Halal Industry Filters:**
   * *Gap:* The current trade forms accept any input description.
   * *Production Requirement:* Natural language processing (NLP) or keyword lists must search fields like `goodsDescription` in LC applications to block keywords related to prohibited industries (alcohol, pork, gambling, weapons).
3. **Tamper-Proof Audit Logging:**
   * *Gap:* Audit history in [ModuleDetail.tsx](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/components/module/ModuleDetail.tsx#L129) is compiled on-the-fly from basic creation/updated fields.
   * *Production Requirement:* A secure audit log database must store non-modifiable records of all activities (IP addresses, specific field edits, approval overrides, and failed actions) compliant with ISO 27001 and PCI-DSS.

---

## 4. RAD (Rapid Application Development) Engine Gaps

The RFP requires a built-in RAD platform for quick configurations, but the current prototype's RAD is simulated.

* **Dynamic Forms:** The schemas in [moduleSchema.ts](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/lib/moduleSchema.ts) are hard-coded in TypeScript code. A production RAD engine must provide a form-builder UI for bank-office administrators to define fields, validation scripts, and API pathways without writing code.
* **Dynamic Workflows:** The Maker-Checker approval flow is hard-coded into the buttons. In production, the RAD engine must integrate a visual workflow designer (e.g., using BPMN standards) to construct dynamic approval matrices (e.g., transactions < BDT 1M require 1 Checker; > BDT 10M require 2 Checkers + 1 Board Approver).
* **API Generator:** Generating custom schemas currently requires modifying client-side files. A production RAD framework must support dynamic API endpoint configuration so that new products configured in the UI are automatically exposed as REST endpoints on the server.

---

## 5. Summary Gap Scorecard

```mermaid
radar
  title System Gap Scorecard
  "UI / UX Design": 95
  "Role-Based Access Control": 80
  "Data Persistence & APIs": 15
  "Core Banking Integration": 0
  "Security & HSM Signing": 5
  "Compliance (AML/Shariah Filters)": 10
  "RAD Engine & Workflows": 20
```
