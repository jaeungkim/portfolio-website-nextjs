---
description: Dual-Agent Code Review Workflow
---

When the user triggers this workflow (e.g. by asking to "review a file", "run review workflow", or using `/review`), follow these exact steps:

1. **Independent Review Phase (Antigravity):** Analyze the target file(s) for bugs, performance issues, missing edge cases, and architectural improvements. Keep your findings strictly internal for now.
2. **Independent Review Phase (Codex):** Immediately use the `mcp_codex_codex` tool to send the target file(s) contents to the Codex agent. Ask Codex to perform a strict code review looking for bugs, hallucinated logic, and React anti-patterns.
3. **Cross-Examination:** Once Codex returns its review, compare your internal findings with Codex's findings.
   - If you found something Codex disagrees with or points out as a hallucination, drop it or investigate further.
   - If Codex found an edge case you missed, include it.
   - Highlight any issues that both you and Codex independently identified as high priority.
4. **Final Unified Report:** Present a single, unified review to the user. Explicitly mention which agent caught which issue (e.g. "Antigravity found X," "Codex flagged Y," "Both agreed on Z"), so the user can see the dual-agent validation in action.
