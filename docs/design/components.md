# Ledgerly UI Components

**Version:** 1.0

## Purpose

This document defines the reusable UI components used throughout Ledgerly.

Whenever possible, components should be built from shadcn/ui primitives and reused across the application.

---

# Navigation

## Bottom Navigation

Primary mobile navigation.

Items:

* Home
* Contacts
* Quick Action
* Reminders
* Settings

---

## Top App Bar

Displays:

* Screen title
* Search
* Contextual actions

---

# Buttons

* Primary Button
* Secondary Button
* Ghost Button
* Outline Button
* Destructive Button
* Icon Button
* Floating Action Button (Quick Action)

---

# Cards

* Contact Summary Card
* Loan Summary Card
* Reminder Card
* Statistic Card
* Activity Card

---

# Forms

* Text Input
* Textarea
* Select
* Combobox
* Date Picker
* Currency Input
* Phone Input
* Toggle
* Checkbox
* Radio Group

---

# Lists

* Contact List
* Timeline List
* Reminder List
* Search Results
* Activity List

---

# Timeline

The Timeline is Ledgerly's signature component.

Supported event types:

* Loan
* Repayment
* Financial Activity
* Reminder
* Note

Each event should include:

* Icon
* Title
* Date
* Amount (when applicable)
* Supporting details

---

# Dialogs

Desktop:

* Dialog

Mobile:

* Bottom Sheet

---

# Search

Global search supports:

* Contacts
* Phone numbers
* Notes
* Financial Activities
* Loans
* Reminders

---

# Charts

Reusable chart components:

* Monthly Lending
* Monthly Repayments
* Outstanding Debt Trend
* Financial Activity Summary
* Contact Ranking

---

# Empty States

Every empty state includes:

* Illustration or icon
* Short explanation
* Primary call-to-action

---

# Feedback

Reusable feedback components:

* Toast
* Alert
* Confirmation Dialog
* Success Banner
* Error Banner
* Loading Skeleton

---

# Layout Components

* Page Container
* Section Header
* Responsive Grid
* Card Group
* Sticky Action Bar

---

# Component Rules

* Prefer composition over duplication.
* Reuse components before creating new ones.
* Keep props simple and predictable.
* Maintain visual consistency across all screens.
* Every new component must have a documented purpose before implementation.

---

# shadcn/ui Mapping (Initial)

| Ledgerly Component | Base Component                   |
| ------------------ | -------------------------------- |
| Primary Button     | Button                           |
| Contact Card       | Card                             |
| Timeline           | Card + Separator + Badge         |
| Quick Action       | Button + Drawer/Sheet            |
| Reminder Card      | Card                             |
| Search             | Input + Command                  |
| Confirmation       | Alert Dialog                     |
| Mobile Forms       | Form + Input + Select + Calendar |
| Statistics         | Card                             |
| Reports            | Card + Chart Library             |
