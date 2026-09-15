# Requirements Document - Budget Tracker

## User Stories

### Story 1: Add an Expense
* **As a** budget-conscious user,
* **I want to** log a new expense with an amount, title, and date,
* **So that** I can keep an accurate track of my spending.
* **Acceptance Criteria:**
  - [ ] Clicking "Add Expense" opens a form with fields for Title, Amount ($), Date, and Category.
  - [ ] Submitting a form with a missing title or negative amount displays an inline validation error.
  - [ ] Upon successful submission, the new expense appears at the top of the transaction list and the total spending balance updates automatically.

### Story 2: Categorize Transactions
* **As a** user organizing personal finances,
* **I want to** assign a category (e.g., Food, Rent, Utilities, Entertainment),
* **So that** I can see where my money goes.
* **Acceptance Criteria:**
  - [ ] A dropdown selector displays a pre-set list of categories (Food, Rent, Utilities, Entertainment, Income).
  - [ ] Each transaction in the expense list displays its assigned category badge.
  - [ ] Users can filter the transaction view by selecting a specific category.

### Story 3: View Total Monthly Summary
* **As a** user tracking my monthly budget,
* **I want to** see a quick summary of total income, total expenses, and remaining balance,
* **So that** I know if I am staying within my financial goals.
* **Acceptance Criteria:**
  - [ ] A summary panel displays three metrics: Total Income, Total Expenses, and Net Balance.
  - [ ] Net Balance is calculated as Total Income minus Total Expenses.
  - [ ] If Net Balance falls below $0.00, the balance indicator changes color to red.

### Story 4: Edit or Delete Entries
* **As a** user who makes accidental typing errors,
* **I want to** edit or delete an existing expense or income entry,
* **So that** my budget history remains accurate.
* **Acceptance Criteria:**
  - [ ] Every entry in the transaction list features an "Edit" and "Delete" action button.
  - [ ] Clicking "Delete" prompts a confirmation dialog.
  - [ ] Confirming deletion removes the entry from the list and immediately updates all calculated totals.

### Story 5: Set a Monthly Spending Limit
* **As a** user trying to save money,
* **I want to** set a monthly spending threshold,
* **So that** I am notified when I am getting close to overspending.
* **Acceptance Criteria:**
  - [ ] Users can enter and save a target dollar amount for monthly spending limits.
  - [ ] A visual progress bar indicates the percentage of the budget used.
  - [ ] When total expenses reach 90%% or more of the limit, a warning alert banner appears on screen.

### Story 6: Local Data Persistence
* **As a** user visiting the app across multiple sessions,
* **I want my** entered transactions to save automatically,
* **So that** I do not lose my data when closing or refreshing the browser.
* **Acceptance Criteria:**
  - [ ] All transaction data persists in browser localStorage upon creation, edit, or deletion.
  - [ ] Closing and reopening the application reloads all previously stored transactions intact.

### Story 7: Export Financial Summary
* **As a** user preparing financial reports,
* **I want to** export my transaction history as a CSV file,
* **So that** I can open my budget data in standard spreadsheet applications.
* **Acceptance Criteria:**
  - [ ] Clicking the "Export CSV" button triggers an immediate browser download of budget_data.csv.
  - [ ] The downloaded CSV includes headers: ID, Date, Title, Amount, Category, Type.

## Non-Functional Requirements (NFRs)

### NFR 1: Performance & Load Speed
* **Requirement:** The application's landing page and initial transaction table must fully render and become interactive in under 1.2 seconds on a standard Broadband connection (evaluated via Chrome DevTools Lighthouse audit score >= 90).

### NFR 2: Unit Test Code Coverage
* **Requirement:** The core budget calculation module (node --test) must achieve at least 85%% statement line coverage across all edge cases (handling zero values, negative numbers, and empty arrays).

### NFR 3: Local Storage Payload Limit
* **Requirement:** The local storage serialization mechanism must restrict stored transaction data size to under 2 megabytes (2 MB), gracefully alerting the user if storage capacity exceeds 90%% of maximum browser allowance.
