# Ledgerly Entity Relationship Diagram (ERD)

**Version:** 1.0

---

# Purpose

This document defines the entity relationships within Ledgerly.

It complements `domain-model.md` and `database-design.md` by providing a visual representation of ownership, cardinality, and foreign-key relationships.

The ERD serves as the primary reference when creating:

* Laravel Migrations
* Eloquent Relationships
* Model Factories
* Seeders
* Database Constraints

---

# Database Philosophy

Ledgerly follows a **fact-based relational model**.

The database stores business facts.

Timelines, dashboards, statistics, balances, and reports are derived from those facts.

---

# Aggregate Ownership

Workspace is the root aggregate.

Workspace owns:

* Contacts
* Wallets
* Reminders
* Notifications

Contact owns:

* Loans
* Financial Activities
* Notes

Loan owns:

* Repayments

---

# Cardinality

| Relationship                 | Cardinality |
| ---------------------------- | ----------- |
| User → Workspace             | One-to-Many |
| Workspace → Wallet           | One-to-Many |
| Workspace → Contact          | One-to-Many |
| Workspace → Reminder         | One-to-Many |
| Workspace → Notification     | One-to-Many |
| Contact → Loan               | One-to-Many |
| Contact → Financial Activity | One-to-Many |
| Contact → Note               | One-to-Many |
| Contact → Reminder           | One-to-Many |
| Wallet → Loan                | One-to-Many |
| Wallet → Repayment           | One-to-Many |
| Loan → Repayment             | One-to-Many |

---

# Notes

Version 1 creates one Personal Workspace and one hidden Cash Wallet automatically.

The schema intentionally supports future Workspace sharing and multiple wallets without requiring structural changes.

Timeline, Statistics, Dashboard, and Reports are **derived projections** and therefore are not represented as database tables.
