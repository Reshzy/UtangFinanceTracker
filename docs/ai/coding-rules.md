# Ledgerly Coding Rules

## General

- Target Laravel 13 and PHP 8.5.
- Follow PSR standards and Laravel conventions unless documented otherwise.
- Prefer readability over clever abstractions.
- Every feature must align with the Product Constitution.

---

# Architecture

- Organize code by domain.
- Controllers coordinate; they do not contain business logic.
- Business logic belongs in Actions or Services.
- Authorization belongs in Policies.
- Validation belongs in Form Requests.
- Reusable values belong in Enums.
- Shared logic belongs in Shared.

---

# Database

- Never use floating-point values for money.
- Use integers for all monetary amounts.
- Use foreign key constraints.
- Prefer soft deletes for user-managed data.
- Use database transactions for multi-step financial operations.

---



# Eloquent

- Prevent N+1 queries.
- Prefer eager loading.
- Use route model binding.
- Keep models focused on relationships and simple helpers.

---



# Frontend

- Mobile-first.
- TypeScript only.
- Use shadcn/ui components whenever possible.
- Do not create duplicate UI components.
- Keep pages small by extracting reusable components.

---



# Testing

Every completed feature should include:

- Feature tests
- Authorization tests
- Validation tests
- Happy-path tests~
- Edge-case tests

---



# Documentation

If implementation changes architecture, business rules, or user workflows, update the corresponding documentation before considering the feature complete.

---



# Definition of Done

A feature is complete only when:

- Code is implemented.
- Tests pass.
- UI matches the design.
- Documentation is updated.
- No known critical issues remain.

