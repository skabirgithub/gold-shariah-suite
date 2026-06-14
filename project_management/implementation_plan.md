# Implementation Plan: Maker-Checker Pipeline & Interactive Guided Journeys

This plan outlines the implementation of key functional features in the Corporate Transaction Banking (CTB) prototype to bring it to 100% functional completeness. We will implement the dynamic **Maker-Checker Pipeline** and the **Interactive Guided Journey Modal**.

---

## User Review Required

> [!IMPORTANT]
> **Dynamic State Alignment:**
> The Maker-Checker implementation will use client-side `localStorage` to synchronize record state updates. Creating a transaction (e.g., Fund Transfer) will automatically append a corresponding item to the Approval Dashboard. Approving or rejecting an item in the Approval Dashboard will dynamically update the source transaction's status.

> [!TIP]
> **Dashboard Guided Journeys:**
> We will add an interactive modal wizard to the Dashboard for the **Salary Payroll** journey. It will allow users to upload a mock file, view simulated system validation checks, trigger an approval creation, authorize the transaction, and view execution success in real time, simulating the entire end-to-end journey in one flow.

---

## Open Questions

There are no open questions. We will use the existing UI components and icons (from `lucide-react`) to maintain 100% styling and structural consistency.

---

## Proposed Changes

### Core Store & Logic

#### [MODIFY] [moduleStore.ts](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/lib/moduleStore.ts)
* Add a session retrieval import to identify the active Maker username.
* Update `create()`: If the created record is from a creator module (where `schema.canCreate` is true and slug is not `"approval"`), automatically generate a corresponding `approval` record with:
  * `ref` pointing to the new record's ID.
  * A detailed `details` string describing the transaction (amount, currency, beneficiary, category, etc.).
  * Dynamic risk level assignment based on thresholds (amounts >= BDT 10M → High; >= BDT 1M → Medium; others → Low).
  * `sourceSlug` to track which store/module is the origin.
* Update `update()`:
  * If an `"approval"` record is updated (e.g., status changed to `Approved` or `Rejected`), find the original transaction via `sourceSlug` and `ref` and update its status.
  * If a transaction record is updated directly, synchronize the status back to its corresponding `"approval"` task (if exists).
* Update `remove()`:
  * If a transaction is deleted, automatically remove the corresponding approval task to maintain database integrity.

---

### Dashboard & UI Components

#### [MODIFY] [app.index.tsx](file:///d:/Development/Website/gold-shariah-suite-main/gold-shariah-suite-main/src/routes/app.index.tsx)
* Import `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription` from `@/components/ui/dialog`.
* Add states:
  * `activeJourney`: tracks which of the 5 guided journeys is selected.
  * `currentStepIndex`: tracks progress within the journey steps.
  * `simulatedFile`: holds file name state for the Salary Payroll journey.
  * `validationStatus`: tracks payroll parser validation state (idle, loading, success).
  * `journeyStatus`: tracks overall completion states.
* Implement step layouts in the modal:
  * **Step 1 (Upload):** Drag-and-drop simulated area. Clicking it uploads a mock `payroll-employees-aug2025.csv`.
  * **Step 2 (Validation):** Shows a progress bar scanning the file for errors, then displays verified counts (248 records, BDT 12,840,000, 0 validation errors).
  * **Step 3 (Maker Submit):** A confirmation button that, when clicked, calls `create("bulk-transfer", ...)` to insert a real record into the database, generating an approval task.
  * **Step 4 (Checker Authorization):** Displays the Checker's authorization dashboard preview and lets the user click "Authorize Release" which updates the record.
  * **Step 5 (Clearing/Processing):** A progress animation showing connections to the Core Banking System and RTGS/BEFTN gateways.
  * **Step 6 (Report):** A final screen providing download access to the execution receipt.
* Design static diagram views for the other 4 journeys (Distributor Collection, VAM, ERP Integration, and Liquidity Management) allowing stakeholders to step through sequence flows with descriptive illustrations.

---

## Verification Plan

### Automated Verification
* Run standard builder validation to ensure there are no compilation errors:
  ```bash
  bun run build
  ```

### Manual Verification
1. Open the CTB application dashboard.
2. In **Quick Actions**, click **Transfer** and create a new BDT transfer. Verify it submits successfully and redirect to details page.
3. Navigate to the **Approval Dashboard** and verify that a new approval task exists with the transfer reference, maker name, risk, amount, and custom transaction details.
4. Click **Approve** on the task, and verify that both the approval task status and the original fund-transfer status update to `Approved` simultaneously.
5. Go back to the dashboard, click the **Salary Payroll** guided journey.
6. Step through the interactive modal: upload the file, watch the validation run, submit the batch, authorize it, watch the CBS simulation, and complete the journey.
7. Verify that a new record `PAYROLL-AUG-2025` is listed under the **Bulk Transfer** list and marked as approved.
