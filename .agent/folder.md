---
description: Domain-first folder structure guidance for co-location and shared-code promotion.
---

# Domain-First Folder Structure Policy

## 1. Principle

Prefer domain-first co-location.

- Keep code close to the domain that owns it.
- Promote to shared/global only after real cross-domain reuse.

## 2. Definitions

- `Domain folder`: a feature/page boundary such as `src/pages/<domain>/`.
- `Shared/global folder`: app-level folders like `src/components`, `src/constants`, `src/hooks`, `src/types`, `src/utils`.

## 3. Placement Rules (`components/constants/hooks/types/utils`)

- If code is used by one domain, keep it inside that domain folder.
- If code is used by `2+` domains, promote it to shared/global.
- Do not place single-domain code in root-level shared folders.

## 4. Allowed Domain Template

Use only what the domain needs; do not scaffold empty folders.

Example optional shape:

- `src/pages/<domain>/components`
- `src/pages/<domain>/features` (Recommended for complex domains to encapsulate feature-specific logic. Do not place hooks/types inside `components/`)
- `src/pages/<domain>/constants`
- `src/pages/<domain>/hooks`
- `src/pages/<domain>/types`
- `src/pages/<domain>/utils`
- `src/pages/<domain>/api`
- `src/pages/<domain>/stores`

### The `features/` Directory Pattern

For simple domains, grouping by type (`components`, `hooks`, `types`) at the domain root is sufficient.
For complex domains with heavy, distinct sub-features, adopt the **Feature-Sliced Design** using a `features/` folder.

**Exception for Nested Component Logic:**
If a complex UI component requires its own isolated hooks, utilities, or types that are **not shared anywhere else**, it is acceptable and encouraged to nest those directories directly adjacent to the component within the `components/` folder, rather than forcing a heavy `features/` extraction.

Example:

```text
src/pages/complex-domain/
├── features/
│   ├── diagram/
│   │   ├── components/
│   │   │   └── complex-node/
│   │   │       ├── ComplexNode.tsx
│   │   │       └── hooks/              <-- Allowed! Only used by complex-node
│   │   ├── hooks/                      <-- Shared across diagram feature
│   │   └── types/
│   └── settings/
├── components/ # Shared UI across features in this domain
├── hooks/      # Shared hooks across features in this domain
```

## 5. Import Boundary Guidance

- Domain code must not depend on another domain's internal folders.
- Cross-domain reuse should flow through shared/global folders.
- If two domains need the same logic, extract once to shared/global.

## 6. Barrel and `index` Files

- Avoid unnecessary `index`/barrel files.
- Add a barrel only when it clearly improves API clarity or import ergonomics.

## 7. Placement Examples

Good:

- `src/pages/dashboard/hooks/useDashboardFilters.ts` (dashboard-only hook)
- `src/pages/context-page/utils/formatContextLabel.ts` (context-page-only util)
- `src/utils/formatDateRange.ts` (used across multiple domains)

Bad:

- `src/components/WidgetX.tsx` when used by only one domain
- `src/utils/contextPageHelpers.ts` when only `context-page` uses it
- `src/pages/a/hooks/useSharedThing.ts` imported directly by `src/pages/b/*`

## 8. Migration Policy

This policy is guidance, not a forced repo-wide migration.

- No mandatory one-time cleanup.
- Apply on new work and touched files when practical.
- If existing structure is stable and untouched, do not refactor only to satisfy this policy.
