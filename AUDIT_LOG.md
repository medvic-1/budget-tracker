# AI Elicitation Audit Log - Budget Tracker

## 1. Context & Prompting
* **Prompt Used:** *"I am building a web-based budget tracker app for an individual user. Can you act as a systems analyst and elicit a full list of user stories and non-functional requirements for this project?"*
* **Target Application:** A simple, single-user budget app that runs in the browser.

## 2. Omissions (What the AI Missed)
* **Saving Data Locally:** The AI forgot to explain how saved budget entries stay on the user's computer when they close or refresh the page.
* **Exporting Data:** It completely missed adding a simple button to download budget entries as a CSV file for Excel.
* **Budget Limit Warnings:** It didn't think to add a visual alert (like a red warning banner) when a user gets close to going over their monthly spending limit.

## 3. Inventions (What the AI Added That I Didn't Want)
* **User Accounts & Passwords:** The AI created complex stories for signing up, logging in, and resetting passwords, which is unnecessary for a simple solo app.
* **Connecting to Real Bank Accounts:** It tried to add automatic bank syncing, which is way too complicated for a basic beginner project.
* **Multiple Currencies:** It added tools to convert different world currencies, adding extra confusion when I only need standard dollar tracking.

## 4. Insights (What the AI Got Right)
* **Category Filters:** The AI rightly suggested letting users filter their expenses by category (like Food or Rent), which helped improve Story 2.
* **Delete Warnings:** It correctly noted that the app should ask "Are you sure?" before deleting an entry so users don't lose data by mistake.

## 5. Final Judgment
The AI gave a helpful starting list, but it tried to build a massive commercial app instead of sticking to what I actually needed. It added unnecessary features like user logins and bank syncing, while missing basic everyday features like saving data in the browser and exporting files.

Conclusion: AI tools are great for brainstorming initial ideas, but a human developer still needs to review the list to remove useless features and make sure the real project goals are met.
