# Incident Response Runbook: Budget Tracker

## Incident: LocalStorage Persistence & Data Corruption Failure

### 1. Observable Symptom
* **Symptom:** A user reports that upon refreshing the budget tracker page or navigating back to it, all recorded transactions have vanished, and the **Total Balance** displays `$0.00` despite previous entries. 
* **Severity:** Medium (Client-side data visibility loss for affected users).

### 2. Diagnosis & Confirmation
To confirm whether the issue is caused by corrupted JSON data in the browser's storage:
1. Open the affected user's browser Developer Tools (`F12` or right-click -> **Inspect**).
2. Navigate to the **Console** tab and look for uncaught `SyntaxError` exceptions thrown during initialization, such as:
   ```text
   SyntaxError: Unexpected token in JSON at position 0
