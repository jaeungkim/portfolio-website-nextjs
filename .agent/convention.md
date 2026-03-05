---
description: Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.
---

1. Think Before Coding
   Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

State your assumptions explicitly. If uncertain, ask.
If multiple interpretations exist, present them - don't pick silently.
If a simpler approach exists, say so. Push back when warranted.
If something is unclear, stop. Name what's confusing. Ask. 2. Simplicity First
Minimum code that solves the problem. Nothing speculative.

No features beyond what was asked.
No abstractions for single-use code.
No "flexibility" or "configurability" that wasn't requested.
No error handling for impossible scenarios.
If you write 200 lines and it could be 50, rewrite it.
Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

**Inlining over Declaration**

- For legibility and better "top-to-bottom" DX, prefer inlining 1-3 line variables or simple event handlers directly at the call site (e.g. inside JSX props) rather than declaring them as separate variables at the top of the component.
- Example: Instead of `const isLastVersion = versions?.length === 1;`, just put `isLastVersion={versions?.length === 1}` directly in the prop.
- For short 1-5 line utility wrappers (like `openAttributeListDialog` or `overlay.openAsync` Dialogs), ALWAYS inline them directly at the call site if they are only used in **one place**. Only declare abstraction wrappers if they are reused in 2 or more places to reduce duplication.

3. Surgical Changes
   Touch only what you must. Clean up only your own mess.

When editing existing code:

Don't "improve" adjacent code, comments, or formatting.
Don't refactor things that aren't broken.
Match existing style, even if you'd do it differently.
If you notice unrelated dead code, mention it - don't delete it.
When your changes create orphans:

Remove imports/variables/functions that YOUR changes made unused.
Don't remove pre-existing dead code unless asked.
The test: Every changed line should trace directly to the user's request.

4. Goal-Driven Execution
   Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

"Add validation" → "Write tests for invalid inputs, then make them pass"
"Fix the bug" → "Write a test that reproduces it, then make it pass"
"Refactor X" → "Ensure tests pass before and after"
For multi-step tasks, state a brief plan:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
   Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

4. Declarative Component Handlers (WHAT over HOW)
   Components should be declarative, focused on WHAT happens, not HOW it is implemented.

Abstract away imperative boilerplate into custom hooks or utility functions.
