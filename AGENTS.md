# AGENTS.md

## Goal
This repo is a Vue 3 learning project for job preparation.
Build the app stage by stage from simple to advanced.
Do not skip stages.

## Source of truth
- docs/kuaitao_codex_spec.md
- docs/STAGE_CHECKLIST.md
- docs/DEVLOG.md

## Rules
- Prioritize learning clarity over over-engineering
- Complete one stage at a time
- After each stage, update STAGE_CHECKLIST and DEVLOG
- Explain what Vue 3 concepts were used
- Explain what changed from previous stage
- Use mock data before backend integration
- Keep UI simple but portfolio-ready

## Model policy
- Default: GPT-5.4-Mini + low
- Multi-file or moderate refactor: GPT-5.4-Mini + medium
- Architecture or harder debugging: GPT-5.4 + medium
- Long-running repo-wide agent tasks: GPT-5.1-Codex-Max + medium
- Code review: GPT-5.3-Codex

After finishing each stage, always update:
- docs/STAGE_CHECKLIST.md
- docs/DEVLOG.md

Do not skip the documentation update.
Keep the wording clear enough for future review and interview preparation.