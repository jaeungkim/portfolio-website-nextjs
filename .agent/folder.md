---
description: Domain-first folder structure guidance for Next.js App Router with route-safe co-location and shared-code promotion.
---

# Domain-First Folder Structure Policy for Next.js App Router

## 1. Principle

Prefer route/domain-first co-location.

- Keep code close to the route segment or feature that owns it.
- Promote to shared/global only after real cross-route reuse.
- Use Next.js file-system conventions intentionally instead of flattening everything into root shared folders.

## 2. Next.js Context

This repo uses the App Router under `src/app`, so route ownership is defined by route segments, not `src/pages`.

- A folder under `src/app` contributes to routing only when it contains a special file such as `page.tsx`, `layout.tsx`, or `route.ts`.
- Non-routing files can be safely colocated inside route segments.
- Route groups such as `src/app/(main)` organize routes without affecting the URL path.
- Private folders such as `_components` or `_lib` are optional and can be used to mark implementation-only code or avoid naming conflicts with special files.
- Keeping the existing `src/` root is valid and aligned with Next.js guidance.

## 3. Definitions

- `Route segment domain`: a route boundary such as `src/app/blog/` or `src/app/(main)/resume/`.
- `Route group`: an organizational folder such as `src/app/(main)/` that does not appear in the URL.
- `Private folder`: a non-routable implementation folder such as `src/app/blog/_components/`.
- `Shared/global folder`: app-level folders like `src/components`, `src/lib`, `src/styles`, `public`, and other root shared folders.

## 4. Placement Rules (`components/lib/data/hooks/types/utils`)

- If code is used by one route segment, keep it inside that route segment.
- If code is used by `2+` route segments, or by both app-shell code and route code, promote it to shared/global.
- Prefer route-local folders like `components`, `lib`, `data`, `hooks`, `types`, and `utils` inside the owning segment.
- Do not place single-route code in root-level shared folders.
- Do not move code to shared/global only because it might be reused later.
- If a file exists only to support one `page.tsx`, `layout.tsx`, or `route.ts`, keep it near that route.
- Route groups are organizational only. They do not justify sharing unrelated internals across sibling routes.
- Private `_folders` are optional. Use them when they improve clarity, hide implementation details, or prevent collisions with Next.js special file names.

## 5. Allowed Route Templates

Use only what the route needs; do not scaffold empty folders.

Common optional shapes:

- `src/app/<segment>/page.tsx`
- `src/app/<segment>/layout.tsx`
- `src/app/<segment>/loading.tsx`
- `src/app/<segment>/error.tsx`
- `src/app/<segment>/not-found.tsx`
- `src/app/<segment>/components`
- `src/app/<segment>/lib`
- `src/app/<segment>/data`
- `src/app/<segment>/hooks`
- `src/app/<segment>/types`
- `src/app/<segment>/utils`
- `src/app/<segment>/_components`
- `src/app/<segment>/_lib`
- `src/app/(group)/<segment>/...`

### `components/` vs `_components/`

Both are acceptable in App Router.

- Use `components/` when the meaning is obvious and the folder sits clearly under a single route domain.
- Use `_components/` when you want to signal "implementation-only" code or avoid future confusion with routing conventions.
- Do not rename stable folders only to add `_`.

### `lib/` vs `src/lib/`

- Use route-local `lib/` when the logic belongs to one route domain.
- Use root `src/lib/` only for genuinely shared logic across multiple route domains.
- The same promotion rule applies to `data`, `hooks`, `types`, and `utils`.

## 6. The `features/` Directory Pattern

For simple route segments, grouping by type (`components`, `lib`, `hooks`, `types`) at the segment root is sufficient.

For complex route segments with multiple distinct sub-features, adopt a route-local `features/` folder.

Example:

```text
src/app/dashboard/
├── page.tsx
├── features/
│   ├── filters/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   └── chart/
│       ├── components/
│       │   └── complex-node/
│       │       ├── ComplexNode.tsx
│       │       └── hooks/
│       └── lib/
├── components/
└── lib/
```

### Exception for Nested Component Logic

If a complex UI component requires its own isolated hooks, utilities, or types that are not shared anywhere else, it is acceptable and encouraged to nest those folders directly adjacent to that component instead of forcing a larger feature extraction.

## 7. Import Boundary Guidance

- A route segment must not depend on another route segment's internal folders.
- Cross-route reuse should flow through shared/global folders, not through sibling route internals.
- If two route segments need the same logic, extract once to `src/components`, `src/lib`, or another shared root folder.
- Route groups do not create a free-for-all import boundary. Shared code should still be explicit.
- App-shell code such as top-level layouts may depend on shared/global folders.

## 8. Next.js Special File Guidance

Reserve Next.js special file names for framework behavior only.

- `page.tsx`
- `layout.tsx`
- `template.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- `default.tsx`
- `route.ts`

Do not create unrelated helper files with these names. Use private folders when you want stronger separation from routing concerns.

## 9. Placement Examples for This Repo

Good:

- `src/app/(main)/blog/components/Article.tsx` (blog-only UI)
- `src/app/(main)/blog/lib/posts.tsx` (blog-only content logic)
- `src/app/gantt-chart/data/sampleTasks.json` (gantt-chart-only sample data)
- `src/components/shared/BlurImage.tsx` (shared across multiple routes/components)
- `src/components/layout/Navbar.tsx` (app-shell/shared layout UI)

Bad:

- `src/components/shared/ResumeSectionItem.tsx` when only `resume` uses it
- `src/lib/blogPosts.ts` when only `blog` uses it
- importing `src/app/(main)/resume/components/*` directly from `blog`
- creating a route segment just to store helpers when no route ownership exists

## 10. Project Organization Strategy

Default to splitting by route/domain first. Introduce route-local `features/` only when a route becomes genuinely complex.

This matches Next.js guidance to organize by route or by feature while keeping route ownership obvious.

## 11. Migration Policy

This policy is guidance, not a forced repo-wide migration.

- No mandatory one-time cleanup.
- No mandatory renaming from `components/` to `_components/`.
- Apply this policy on new work and touched files when practical.
- If an existing structure is stable and untouched, do not refactor only to satisfy this policy.
