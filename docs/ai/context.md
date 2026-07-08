# Ledgerly AI Context

## Purpose

This document is the primary context file for AI assistants working on Ledgerly.

Every implementation task should begin by reading this document before making code changes.

---

# Project Overview

Ledgerly is a **mobile-first Personal Lending & Relationship Ledger**.

The application focuses on helping users manage financial relationships with people rather than simply recording transactions.

The core philosophy is:

> People → Relationships → Financial Events → Insights

---

# Technology Stack

Backend

- Laravel 13
- PHP 8.5

Frontend

- React
- TypeScript
- Inertia.js

UI

- Tailwind CSS v4
- shadcn/ui
- Lucide Icons

Database

Development

- SQLite

Production

- PostgreSQL (preferred)

Testing

- Pest
- PHPUnit (where required)

Desktop

- Electron (future)

---



# Architecture

Ledgerly follows a Domain-Driven Design inspired modular architecture.

Primary domains:

- Identity
- Workspace
- Contacts
- Loans
- Repayments
- Financial Activities
- Reminders
- Reports
- Shared

Business logic belongs inside domain actions and services—not controllers.

---



# Product Philosophy

Ledgerly is not a debt tracker.

Ledgerly is a Personal Lending & Relationship Ledger.

The application revolves around Contacts.

Everything should reinforce this philosophy.

---



# Core Principles

- Mobile-first
- Documentation-first
- Domain-first
- Feature-first
- Test-first
- Accessibility-first

---



# Financial Rules

- Never use floating-point values for money.
- Store money as integers (smallest currency unit).
- Outstanding balances are derived.
- Statistics are derived.
- Reports are derived.
- Timeline is derived.

Do not duplicate calculated data unless explicitly documented.

---



# Coding Standards

Always:

- Use Form Requests.
- Use Policies.
- Use Enums.
- Use DTOs where appropriate.
- Use eager loading.
- Write Pest tests.
- Keep controllers thin.

Never:

- Put business logic in controllers.
- Duplicate validation.
- Query unrelated domains directly.
- Bypass authorization.
- Ignore documentation.

---



# Development Workflow

Before implementing a feature:

1. Read feature documentation.
2. Read architecture documentation.
3. Read database design.
4. Review the wireframe or Figma design.
5. Implement backend.
6. Implement frontend.
7. Write tests.
8. Update documentation.

---



# Definition of Success

Generated code should be:

- Readable
- Testable
- Maintainable
- Consistent
- Accessible
- Production-ready

Always prefer clarity over cleverness.