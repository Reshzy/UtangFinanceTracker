# Ledgerly Domain Model

**Version:** 1.0

---

# Purpose

This document defines the core business domain of Ledgerly.

It describes the primary business objects, their responsibilities, relationships, and invariants without referencing any implementation details such as Laravel, databases, APIs, or frontend frameworks.

This document serves as the canonical business language for the project.

---

# Domain Philosophy

Ledgerly is a **Personal Lending & Relationship Ledger**.

The application revolves around **people and financial relationships**, not transactions.

Every financial interaction contributes to a contact's ongoing financial story.

The Timeline is the central representation of that story.

---



# Core Domain

```
User
    │
    ▼
Workspace
    │
    ├──────────────┐
    ▼              ▼
Contact         Wallet
    │
    ▼
Timeline
    │
    ▼
Financial Event
    │
    ├── Loan
    ├── Repayment
    ├── Financial Activity
    ├── Reminder
    └── Note
```

---



# User



## Purpose

Represents the owner of one or more workspaces.

Users authenticate into Ledgerly and manage their own financial records.

## Responsibilities

- Authenticate
- Own workspaces
- Manage profile
- Configure preferences



## Business Rules

- A user owns one or more workspaces.
- Users can only access their own workspaces.

---



# Workspace



## Purpose

Represents an independent financial ledger.

Every business object belongs to exactly one workspace.

Version 1 automatically creates a Personal Workspace for every user.

Future versions may support multiple workspaces.

Examples:

- Personal
- Family
- Business
- Store



## Responsibilities

- Own contacts
- Own wallets
- Own reminders
- Own reports
- Isolate data



## Business Rules

- Every object belongs to exactly one workspace.
- Data never crosses workspace boundaries.

---



# Contact



## Purpose

Represents a person with whom the user has a financial relationship.

A contact remains in the system even when no outstanding balance exists.

## Responsibilities

- Store identity
- Store contact information
- Maintain financial timeline
- Maintain statistics
- Maintain notes



## Business Rules

- Belongs to exactly one workspace.
- Can exist without loans.
- May have zero or many financial events.
- Should be archived instead of permanently deleted whenever historical records exist.

---



# Wallet



## Purpose

Represents the source and destination of money.

Version 1 uses a hidden default Cash Wallet.

Future versions may expose multiple wallets.

Examples:

- Cash
- GCash
- Maya
- Bank



## Responsibilities

- Track money leaving
- Track money returning
- Maintain balance



## Business Rules

- Every loan originates from one wallet.
- Every repayment returns to one wallet.

---



# Timeline



## Purpose

Represents the chronological history of a contact.

The timeline is Ledgerly's primary experience.

Users understand financial relationships through the timeline rather than isolated records.

## Responsibilities

Display all financial events in chronological order.

## Business Rules

Newest events appear first.

---



# Financial Event



## Purpose

Represents any meaningful financial interaction involving a contact.

Every timeline entry is a Financial Event.

## Event Types

- Loan
- Repayment
- Financial Activity
- Reminder
- Note



## Business Rules

Every Financial Event:

- belongs to one Contact
- belongs to one Workspace
- has a timestamp
- appears on the Timeline

---



# Loan



## Purpose

Represents money lent to a contact.

## Responsibilities

- Record lending amount
- Track outstanding balance
- Record optional due date
- Record optional interest



## Business Rules

- Must belong to one Contact.
- Must originate from one Wallet.
- Can receive multiple repayments.
- Outstanding balance cannot become negative.

---



# Repayment



## Purpose

Represents money returned for an existing loan.

## Responsibilities

- Reduce outstanding balance
- Record repayment history



## Business Rules

- Belongs to one Loan.
- Returns money to one Wallet.
- May be partial.
- Cannot exceed the remaining balance.

Repayments never overwrite history.

---



# Financial Activity



## Purpose

Represents optional financial information related to a contact.

Financial Activities provide context but do not automatically affect loan balances.

## Examples

- Gambling
- Salary
- Business
- Investment
- Bonus
- Custom



## Business Rules

Activities are informational only.

---



# Reminder



## Purpose

Represents scheduled follow-up tasks.

## Examples

- Weekly follow-up
- Due reminder
- Manual reminder



## Business Rules

Reminders may reference:

- Contact
- Loan

---



# Note



## Purpose

Represents free-form information attached to a contact.

## Examples

- "Pays after payday."
- "Prefers GCash."
- "Called today."



## Business Rules

Notes appear in the Timeline.

---



# Statistics



## Purpose

Represents calculated information derived from financial records.

Statistics are generated rather than manually entered.

## Examples

- Outstanding Balance
- Total Borrowed
- Total Repaid
- Borrow Count
- Largest Loan
- Average Loan
- Average Repayment Time
- Gambling Profit/Loss

---



# Reports



## Purpose

Provide summarized insights across a workspace.

Reports aggregate information but never modify it.

---



# Notifications



## Purpose

Notify users about reminders and important events.

Examples:

- Weekly reminder
- Upcoming due date
- Overdue loan

---



# Domain Invariants

The following rules must always remain true.

## Workspace

- Every object belongs to exactly one Workspace.



## Contact

- Every Contact belongs to exactly one Workspace.



## Wallet

- Every Loan originates from exactly one Wallet.
- Every Repayment returns to exactly one Wallet.



## Loan

- Outstanding Balance is never negative.
- Loan Amount is always greater than zero.



## Repayment

- Repayment Amount is greater than zero.
- Repayments never exceed remaining balance.



## Timeline

- Every Financial Event appears exactly once.
- Timeline order is chronological.



## Statistics

- Statistics are derived from financial records.
- Statistics are never manually edited.

---



# Future Domain Extensions

The following concepts are intentionally excluded from Version 1 but supported by the architecture.

- Multiple Wallets
- Workspace Switching
- Shared Workspaces
- AI Insights
- QR Payments
- OCR Receipts
- Native Mobile Applications
- Bank Integrations
- Public API

---



# Domain Summary

Ledgerly models **financial relationships** rather than isolated transactions.

Every financial interaction contributes to a Contact's Timeline.

The Timeline serves as the single source of truth for understanding a relationship.

Reports, statistics, balances, and insights are derived from that history, ensuring consistency, traceability, and long-term scalability.