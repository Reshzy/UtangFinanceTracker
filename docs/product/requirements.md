# Ledgerly — Software Requirements Specification (SRS)

Version: 1.0

---

# Introduction

Ledgerly is a mobile-first Personal Lending & Relationship Ledger designed to help users manage borrowers, loans, repayments, financial activities, reminders, and analytics through a modern and intuitive interface.

The application prioritizes speed, simplicity, and accurate financial record keeping while remaining scalable for future expansion.

---

# Functional Requirements

## FR-001 Authentication

The system shall allow users to:

* Register an account
* Log in securely
* Reset forgotten passwords
* Update profile information
* Change passwords
* Log out securely

---

## FR-002 Borrower Management

The system shall allow users to:

* Create borrowers
* Edit borrowers
* Archive borrowers
* Restore archived borrowers
* Permanently delete borrowers

Each borrower shall support:

Required

* Full name
* Phone number
* Address
* Relationship
* Facebook profile

Optional

* Birthday
* Profile photo
* Notes
* Tags

---

## FR-003 Loan Management

Users shall be able to:

* Record new loans
* Edit loans
* Cancel loans
* Add due dates
* Add optional interest
* Record loan reasons
* Track loan status
* Attach notes

Loan status:

* Active
* Paid
* Overdue
* Archived

---

## FR-004 Repayment Management

The system shall support:

* Partial repayments
* Full repayments
* Multiple repayments
* Repayment history
* Remaining balance calculation

Repayments shall never overwrite historical records.

---

## FR-005 Financial Activities

Users may optionally record financial activities.

Supported information:

* Activity type
* Date
* Amount
* Profit
* Loss
* Notes

Activities do not modify loan balances automatically.

---

## FR-006 Timeline

Each borrower shall have a unified chronological timeline displaying:

* Loans
* Repayments
* Activities
* Notes
* Status updates

The newest events shall appear first.

---

## FR-007 Dashboard

The dashboard shall display:

* Outstanding balance
* Total lent
* Total collected
* Active borrowers
* Recent activity
* Upcoming reminders
* Financial charts

---

## FR-008 Analytics

The system shall generate:

* Monthly lending
* Monthly repayments
* Outstanding balances
* Borrower rankings
* Activity summaries
* Trend charts

---

## FR-009 Search

Users shall search by:

* Name
* Phone
* Relationship
* Notes
* Tags

---

## FR-010 Notifications

The system shall provide:

* Weekly reminders
* Due date reminders
* Overdue reminders

---

## FR-011 Reports

Users shall export:

* PDF
* Excel

Supported reports:

* Borrower summary
* Loan history
* Repayment history
* Analytics

---

## FR-012 Settings

Users shall configure:

* Profile
* Password
* Notifications
* Theme
* Backup preferences

---

# Non-Functional Requirements

## Performance

* Dashboard loads in under two seconds.
* Searches return results instantly for normal-sized datasets.
* Mobile interactions remain smooth.

---

## Security

* Passwords shall be securely hashed.
* CSRF protection shall be enabled.
* Authorization shall protect all user data.
* Users may access only their own records.

---

## Reliability

The application shall maintain accurate financial calculations.

No transaction history shall be lost when editing data.

---

## Scalability

The architecture shall support future features without major redesign.

---

## Usability

The interface shall prioritize:

* Mobile devices
* One-handed use
* Large touch targets
* Minimal typing

---

## Accessibility

The application should support:

* Keyboard navigation
* Screen readers
* High contrast
* Responsive layouts

---

# Assumptions

* Users have internet access for synchronization.
* Offline support may be added in future releases.
* Financial records belong exclusively to the authenticated user.

---

# Constraints

* Version 1 focuses on personal lending.
* Banking integrations are out of scope.
* Native mobile applications are not included in Version 1.
