# CLAUDE.md

Project guidance for Claude Code working in this Next.js portfolio site.

## Always consult `.agent/` before editing

The files in `.agent/` are the source of truth for how code should be written, structured, and reviewed in this repo. Before writing or modifying code, load the relevant doc(s) into context. When a request seems to conflict with these docs, surface the conflict before editing rather than silently overriding them.

### Project conventions (always-on)

- **[.agent/behavior.md](.agent/behavior.md)** — How to approach any task: think before coding, surface assumptions, prefer simplicity, make surgical changes, allow duplication when divergence is likely. Read this first on every task.
- **[.agent/frontend-fundamentals.md](.agent/frontend-fundamentals.md)** — The 4 principles (readability, predictability, cohesion, coupling) and SOLID-in-React. The decision framework when no mechanical rule applies. Cite rule numbers (e.g., "Rule 1.4") when flagging issues or justifying refactors.
- **[.agent/typescript.md](.agent/typescript.md)** — Strictness rules, `type` vs `interface`, when to use Zod (forms only), import order, discriminated unions over optional grab-bags.

### Code-area conventions (load by area)

- **[.agent/components.md](.agent/components.md)** — Component authoring: placement, props, UI/logic split, composition over configuration, Tailwind + `cn()` rules, typography roles, memoization policy. Consult for any `.tsx` UI work.
- **[.agent/hooks.md](.agent/hooks.md)** — Custom hook design: SRP, naming, scope/placement, mega-hook / god-hook anti-patterns, splitting strategy, return shape, JSDoc rules. Consult when writing or modifying hooks.
- **[.agent/api.md](.agent/api.md)** — API layer: `apis/{domain}/` structure, standalone async functions, query key factories, mutation invalidation, types placement. Consult for any data-fetching or mutation work.

### Framework references (load when touching framework APIs)

- **[.agent/next.md](.agent/next.md)** — Next.js App Router reference (pages, layouts, Server/Client Components, Server Actions, Route Handlers, `next/image`, `next/link`, metadata, proxy/middleware, caching/revalidation).
- **[.agent/react.md](.agent/react.md)** — React 19 hooks and component patterns (`useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback`, `useReducer`, custom hooks, composition).

## How to use them

1. **Identify scope** — what area is the change in? UI, hook, API, framework feature?
2. **Load matching doc(s)** — `behavior.md` + `frontend-fundamentals.md` always; plus the area-specific doc(s).
3. **Apply the rules** — when trade-offs collide, name which principle wins and why (per `frontend-fundamentals.md` §0).
4. **Cite when reviewing** — quote the file and rule number so the reasoning is traceable.
