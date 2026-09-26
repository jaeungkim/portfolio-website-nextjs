# CLAUDE.md

Personal portfolio and travel blog at https://jaeungkim.com, deployed on Vercel.

## Stack

- Next.js 16 App Router with Turbopack and `cacheComponents`, React 19, TypeScript
- Tailwind CSS v4 through `@tailwindcss/postcss`, tokens in `src/styles/globals.css`
- MDX posts through `@next/mdx`, 3D model through React Three Fiber and drei
- pnpm, version pinned by `packageManager` in `package.json`

## Commands

- `pnpm dev`: local dev server on port 3000
- `pnpm build`: generates blur placeholders, type-checks, then runs `next build`
- `pnpm type-check`: `next typegen` then `tsc --noEmit`
- `pnpm lint`: `eslint .`
- `pnpm test`: `tsx --test` over `src/**/*.test.ts`
- `pnpm format`: prettier then `eslint --fix`

## Layout

- `src/app/[lang]/`: every route is localized (`ko` default, `en`). `src/proxy.ts` redirects unprefixed requests to the negotiated locale.
- `src/i18n/`: locale config and the `en.json` / `ko.json` dictionaries holding UI and resume copy.
- `src/app/[lang]/(main)/blog/posts/<slug>.mdx`: posts, one English file served under both locales. `gray-matter` reads frontmatter. `scripts/generate-blur-placeholders.ts` writes `blog/data/placeholders.json`.
- `src/components/`: layout and shared UI. Compose classes with `cn()` from `@/src/lib/cn`.

## Working rules

- Follow official docs. The Next.js docs in `node_modules/next/dist/docs` match the installed version. Use Context7 for other libraries.
- Keep changes small and plain. No new dependencies or abstractions without a concrete need.
- Keep user-facing copy in the dictionaries. Edit `en.json` and `ko.json` together.
