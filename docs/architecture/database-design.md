# Ledgerly Database Design

**Version:** 1.0

---

# Purpose

This document defines the database architecture of Ledgerly.

It translates the Domain Model into a relational database design while preserving the business rules defined in `domain-model.md`.

This document is the authoritative reference for:

- Laravel Migrations
- Eloquent Models
- Foreign Keys
- Database Constraints
- Indexes
- Seeders
- Factories
- Validation Rules

---

# Database Philosophy

Ledgerly stores **facts**, not calculations.

The database should contain immutable or authoritative business records.

The application derives summaries from those records.

### Store

- Users
- Workspaces
- Contacts
- Wallets
- Loans
- Repayments
- Financial Activities
- Notes
- Reminders
- Notifications



### Derive

- Outstanding Balance
- Total Borrowed
- Total Repaid
- Timeline
- Dashboard
- Reports
- Rankings
- Statistics

---



# Design Principles



## Single Source of Truth

Every business fact should exist only once.

Avoid duplicated financial data.

---



## Append-Only Financial History

Whenever possible:

Financial history should never be overwritten.

Corrections should create new records or preserve auditability.

---



## Integer Money Storage

All monetary values are stored as integers representing the smallest currency unit.

Examples


| Display   | Stored |
| --------- | ------ |
| ₱500.00   | 50000  |
| ₱99.50    | 9950   |
| ₱1,250.75 | 125075 |


Floating-point columns must never be used for money.

---



## Workspace Isolation

Every business record belongs to exactly one Workspace.

This guarantees future multi-workspace support.

---



# Aggregate Roots

Ledgerly has three aggregate roots.

## Workspace

Owns:

- Contacts
- Wallets
- Reminders
- Notifications

---



## Contact

Owns:

- Loans
- Financial Activities
- Notes

Represents a complete financial relationship.

---



## Loan

Owns:

- Repayments

Repayments cannot exist without a Loan.

---



# Entity Specifications

---



# Users

Purpose

Represents authenticated users.

Relationships

- Has many Workspaces

Core Fields

- id
- name
- email
- password
- email_verified_at
- created_at
- updated_at

---



# Workspaces

Purpose

Represents an independent ledger.

Relationships

- Belongs to User (v1)
- Has many Contacts
- Has many Wallets
- Has many Reminders
- Has many Notifications

Core Fields

- id
- user_id
- name
- currency_code
- timezone
- created_at
- updated_at

Default Values

- name = Personal
- currency_code = PHP

---



# Wallets

Purpose

Represents where money originates and returns.

Version 1

A single hidden Cash Wallet is automatically created.

Relationships

- Belongs to Workspace
- Has many Loans
- Has many Repayments

Core Fields

- id
- workspace_id
- name
- type
- is_default
- created_at
- updated_at

Future Wallet Types

- Cash
- GCash
- Maya
- Bank

---



# Contacts

Purpose

Represents a financial relationship.

Relationships

- Belongs to Workspace
- Has many Loans
- Has many Financial Activities
- Has many Notes
- Has many Reminders

Core Fields

- id
- workspace_id
- full_name
- nickname
- phone
- facebook
- address
- relationship
- birthday
- notes
- photo
- archived_at
- created_at
- updated_at

---



# Loans

Purpose

Represents money lent to a Contact.

Relationships

- Belongs to Contact
- Belongs to Wallet
- Has many Repayments

Core Fields

- id
- contact_id
- wallet_id
- principal_amount
- interest_amount
- due_date
- status
- reason
- notes
- created_at
- updated_at

Status Values

- Active
- Paid
- Overdue
- Cancelled

Business Rules

- Amount > 0
- Outstanding Balance ≥ 0
- Due Date is optional
- Interest is optional

---



# Repayments

Purpose

Represents money returned for a Loan.

Relationships

- Belongs to Loan
- Belongs to Wallet

Core Fields

- id
- loan_id
- wallet_id
- amount
- payment_method
- notes
- created_at
- updated_at

Business Rules

- Amount > 0
- Amount ≤ Remaining Balance

---



# Financial Activities

Purpose

Represents optional financial events.

Relationships

- Belongs to Contact

Core Fields

- id
- contact_id
- type
- result
- amount
- event_date
- notes
- created_at
- updated_at

Activity Types

- Gambling
- Salary
- Business
- Investment
- Bonus
- Custom

Result Values

- Profit
- Loss
- Neutral

Business Rules

Financial Activities never change loan balances automatically.

---



# Notes

Purpose

Stores free-form notes.

Relationships

- Belongs to Contact

Core Fields

- id
- contact_id
- content
- pinned
- created_at
- updated_at

---



# Reminders

Purpose

Stores scheduled follow-up tasks.

Relationships

- Belongs to Workspace
- Belongs to Contact
- May reference Loan

Core Fields

- id
- workspace_id
- contact_id
- loan_id
- title
- reminder_at
- completed_at
- recurrence
- created_at
- updated_at

Recurrence

- None
- Daily
- Weekly
- Monthly

---



# Notifications

Purpose

Represents application notifications.

Relationships

- Belongs to Workspace

Core Fields

- id
- workspace_id
- title
- body
- type
- read_at
- created_at

---



# Derived Data

The following values should never be permanently stored.

Instead they are calculated.

Contact Level

- Outstanding Balance
- Total Borrowed
- Total Repaid
- Borrow Count
- Average Loan
- Largest Loan
- Average Repayment Time

Workspace Level

- Total Outstanding
- Total Lent
- Total Collected
- Monthly Lending
- Monthly Repayment
- Dashboard Statistics

Timeline

Generated by merging:

- Loans
- Repayments
- Financial Activities
- Notes
- Reminders

Ordered by event date.

---



# Foreign Key Relationships

Users

↓

Workspaces

↓

Contacts

↓

Loans

↓

Repayments

Wallets connect to:

- Loans
- Repayments

Contacts connect to:

- Financial Activities
- Notes
- Reminders

---



# Deletion Strategy

Financial records should never be hard deleted during normal application use.

Preferred behavior:

Contacts

→ Archive

Loans

→ Cancel

Repayments

→ Preserve

Financial Activities

→ Preserve

Notes

→ Soft Delete

Reminders

→ Soft Delete

Notifications

→ Soft Delete

Hard deletion should be reserved for maintenance tools or administrative cleanup.

---



# Indexing Strategy

Create indexes for:

Users

- email

Workspaces

- user_id

Contacts

- workspace_id
- full_name
- phone
- archived_at

Loans

- contact_id
- wallet_id
- status
- due_date

Repayments

- loan_id
- wallet_id

Financial Activities

- contact_id
- type
- event_date

Reminders

- reminder_at
- completed_at
- contact_id

Notifications

- workspace_id
- read_at

---



# Naming Conventions

Tables

Plural

Examples

- contacts
- loans
- repayments

Primary Keys

id

Foreign Keys

entity_id

Examples

- workspace_id
- contact_id
- wallet_id

Booleans

Use prefixes:

- is_
- has_

Examples

- is_default
- has_interest

Dates

Use descriptive names.

Examples

- due_date
- reminder_at
- completed_at
- archived_at

---



# Data Integrity Rules

The application must enforce:

- Users can only access records in their Workspace.
- Loan amounts must be positive.
- Repayment amounts must not exceed remaining balances.
- Wallets cannot be deleted while referenced by Loans or Repayments.
- Archived Contacts remain searchable when archive filters are enabled.
- Financial Activities never modify balances automatically.

---



# Future Extensions

The schema is intentionally designed to support:

- Multiple Workspaces
- Workspace Members
- Multiple Wallets
- Multiple Currencies
- QR Payments
- AI Insights
- Bank Integrations
- Native Mobile Applications
- Electron Desktop
- Public API
- Audit Logs

No major database redesign should be required to support these future capabilities.

---



# Database Summary

Ledgerly follows a **fact-based relational design**.

Only authoritative business facts are stored.

Everything else—including balances, timelines, reports, rankings, and analytics—is derived from those facts.

This approach minimizes data duplication, preserves historical accuracy, simplifies maintenance, and provides a scalable foundation for future versions of Ledgerly.