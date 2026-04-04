# MODEL_POLICY.md

## Project goal
This repo is a Vue 3 learning project for job preparation.
Build the app stage by stage from simple to advanced.
Do not skip stages.

## Source of truth
- docs/kuaitao_codex_spec.md
- docs/STAGE_CHECKLIST.md
- docs/DEVLOG.md

## Working style
- Prioritize learning clarity over over-engineering
- Complete one stage at a time
- After each stage, update:
  - docs/STAGE_CHECKLIST.md
  - docs/DEVLOG.md
- Explain:
  - what Vue 3 concepts were used
  - what changed from the previous stage
  - how to verify the result
- Use mock/local data before backend integration
- Keep UI simple but portfolio-ready

## Model selection policy
Use this policy when choosing a model for the current task:

### Default
- Use `GPT-5.4-Mini` for most day-to-day work
- Reasoning: `low`

Use for:
- Stage 1–3 tasks
- single feature work
- small UI updates
- small bug fixes
- docs updates
- clear, well-scoped tasks

### When task scope grows
- Use `GPT-5.4-Mini`
- Reasoning: `medium`

Use for:
- multi-file edits
- component refactors
- composables extraction
- moderate logic changes
- Stage 4–5 work

### For important architecture or harder debugging
- Use `GPT-5.4`
- Reasoning: `medium`

Use for:
- Pinia store design
- Router/page structure
- cross-page state flow
- harder debugging
- feature design with tradeoffs
- Stage 5–8 work

### For very hard problems
- Use `GPT-5.4`
- Reasoning: `high`

Use for:
- difficult bugs that failed before
- larger refactors
- messy state/data-flow issues
- important design decisions before implementation

### For long-running agentic coding tasks
- Use `GPT-5.1-Codex-Max`
- Reasoning: `medium`

Use for:
- reading spec + implementing a whole stage
- making many coordinated file changes
- long-horizon refactors
- repo-wide cleanup
- implementation + docs update + checklist update in one run

### For code review
- Use `GPT-5.3-Codex`
- Reasoning: `low` or `medium`

Use for:
- code review
- implementation critique
- finding technical debt
- checking whether the current stage matches the spec

## Escalation rule
Start with the cheapest model that can reasonably do the task.

Escalate only if:
1. the task spans many files,
2. the task involves architecture decisions,
3. the model misses context repeatedly,
4. the bug survives one or more attempts,
5. the task requires long multi-step execution.

## Stage-specific recommendation
- Stage 1–3:
  - `GPT-5.4-Mini` + `low`
- Stage 4–5:
  - `GPT-5.4-Mini` + `medium`
- Stage 6–8:
  - `GPT-5.4` + `medium`
- Repo-wide stage execution / long runs:
  - `GPT-5.1-Codex-Max` + `medium`
- Review pass after major changes:
  - `GPT-5.3-Codex`

## Output requirement after each stage
Always report:
1. completed work
2. files changed
3. Vue 3 concepts learned
4. difference from previous stage
5. how to run and verify
6. next suggested stage