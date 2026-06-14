# User Demonstration Story: Globex Industries Ltd
## SJIBL Corporate Transaction Banking (CTB) Portal

This document walks through an end-to-end business demonstration story on the portal, showing how corporate users interact with the system.

### Scenario Characters:
* **Tania Mahmud** (CFO / Maker): Responsible for reviewing balances and preparing transfers.
* **Rashed Chowdhury** (CEO / Checker): Responsible for final verification and authorization of high-value payments.

---

## Step 1: Secure Authentication
Tania Mahmud navigates to the SJIBL Corporate Transaction Banking portal. The portal enforces end-to-end TLS encryption and displays the secure login page. Tania inputs her corporate credentials and entity ID (`Globex Industries Ltd`).

![Sign In Screen](/C:/Users/SK/.gemini/antigravity-ide/brain/5ded5073-6185-4b61-bd7f-e65f3c4f40f5/login_page_1781419374376.png)

---

## Step 2: Dashboard Overview & Shariah Notice
Upon successful authentication, Tania is greeted by the home dashboard (`As-salamu alaykum, Tania`). 
* She immediately sees the consolidated balance widgets, weekly liquidity charts, and pending approvals.
* At the bottom, the **Shariah Notice** reminds her that all investment facilities correspond to Islamic financing principles (earning profit rather than interest).

![Dashboard Home](/C:/Users/SK/.gemini/antigravity-ide/brain/5ded5073-6185-4b61-bd7f-e65f3c4f40f5/dashboard_overview_1781421223113.png)

---

## Step 3: Account Balance Audit
Tania clicks on the **Accounts** menu to inspect Globex's current liquid positions. The portal lists the accounts along with their real-time ledger and available balances:
* **Current — Operations**: BDT 124,562,300.00
* **Current — Payroll**: BDT 18,450,000.00
* **USD Operating**: USD 845,200.00

![Accounts Management](/C:/Users/SK/.gemini/antigravity-ide/brain/5ded5073-6185-4b61-bd7f-e65f3c4f40f5/accounts_list_page_1781420652118.png)

---

## Step 4: Initiating a Payment (Maker Action)
Tania needs to pay Globex's manufacturing supplier. She clicks **New Transfer** to launch the fund transfer wizard:
1. She chooses **RTGS** for instant high-value clearance.
2. Selects the **Operations Account** as the debit source.
3. Enters the beneficiary details (**Globex Industries**, account **9981200022**).
4. Inputs the payment amount: **BDT 4,500,000**.
5. Selects **Supplier Payment** as the payment purpose and clicks **Submit**.

This places the transaction in a "Pending" status, awaiting verification in the Checker's queue.

![New Transfer Form](/C:/Users/SK/.gemini/antigravity-ide/brain/5ded5073-6185-4b61-bd7f-e65f3c4f40f5/new_fund_transfer_form_1781421344785.png)

---

## Step 5: Checking User Security Profile
Tania reviews her profile settings by navigating to **Profile Management**. She verifies that her two-factor authentication (2FA) is successfully configured as **Enabled** to comply with bank security mandates.

![Profile Details](/C:/Users/SK/.gemini/antigravity-ide/brain/5ded5073-6185-4b61-bd7f-e65f3c4f40f5/profile_reload_details_1781421014478.png)

---

## Step 6: Authorization Queue (Checker Action)
Rashed Chowdhury (CEO / Checker) logs into the portal. He goes to the **Approval Dashboard** to review pending transactions.
* The system displays the tasks submitted by the Maker team, classified with Maker IDs, transaction reference details, and risk evaluations.
* He identifies Tania's submission: reference `TXN-92841` (RTGS BDT 4,500,000 to Globex Industries).

![Approvals Queue](/C:/Users/SK/.gemini/antigravity-ide/brain/5ded5073-6185-4b61-bd7f-e65f3c4f40f5/approvals_page_1781421398297.png)

---

## Step 7: Final Approval & Real-Time Execution
Rashed clicks on reference `TXN-92841` to open the detail view. He inspects the remarks, invoice validations, and maker identity. Confident in the accuracy of the transaction, Rashed clicks **Approve**.

* The portal updates the transaction status to **Approved** in real-time.
* A secure STP (Straight-Through Processing) message is generated and dispatched to SJIBL's Core Banking System to execute the transfer.
