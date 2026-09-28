# ADR-001: Storing Budget Data in the Browser (localStorage)

## Status
Accepted

## Context
I needed a simple way to save transactions, categories, and monthly spending limits so user data isn't lost when the browser tab closes. I had to decide how and where to store this data.

## Decision
I decided to use browser `localStorage` to save all app data directly inside the user's web browser. Data is converted to plain text and saved locally on the user's computer.

## Alternatives Considered

### Alternative 1: Setting up a Database Server (Node.js + MongoDB or PostgreSQL)
* **Why I rejected it:** Building a backend database requires paying for server hosting, setting up user logins, and managing passwords and security. Since this is a simple local budget tracker, a database server adds too much setup time and maintenance work.

### Alternative 2: Saving Data to Local Files on the Computer
* **Why I rejected it:** Asking users to manually select and save files on their computer every time they add a single transaction creates extra steps and a clunky user experience.

## Consequences

### What this decision makes easy:
* Data loads instantly with no lag or waiting for servers.
* Total user privacy-financial numbers never leave the user's personal browser.
* Zero server hosting costs and no backend code to maintain.

### What this decision makes hard (Closed Doors):
* **No Sync Across Devices:** A user cannot see their transactions on their phone if they entered them on their laptop.
* **Risk of Data Loss:** If a user clears their browser history, cache, or uses a private browsing window, all saved budget data gets wiped out.
* **Storage Limits:** Browsers only allow a small amount of saved data per site, meaning it can't hold unlimited years of transaction history.

  
## Prompt-and-Diff Log

### AI Usage & Prompts
Gemini was used to help me structure ADR-001 into standard markdown format and execute the Git CLI commands to commit and push the file to GitHub.
* **Prompt Used:** "Provide the Git commands to commit and push ADR-001 to my repository."

### Changes / Diff Summary
* Created new markdown document at `docs/adr/001-use-localstorage-for-data-persistence.md`.
* Committed and pushed to GitHub via Git CLI.
