# Agents Repository

PhD-grade agent definitions for the dev-sys pipeline.

## Self-Improvement

Use the pipeline agents to improve expert agents:

- **agent-curator**: Refine existing agents (read `pipeline-agents/-pipeline-core/roster-management/agent-curator.md`)
  - Use for: Improving knowledge sources, refining instructions, calibrating vocabulary
- **agent-inventor**: Create new agents from templates (read `templates/`)
  - Use for: Creating new agents from scratch following tier standards

## Structure

- `expert-agents/` - Domain experts organized by category
- `pipeline-agents/` - Pipeline-specific agents (roster management, validation)
- `knowledge/` - Shared knowledge bases referenced by agents
- `templates/` - Agent creation templates and tier definitions

## Key Files

- `AGENT-CREATION-GUIDE.md` - Comprehensive agent authoring guide
- `TIER-CLASSIFICATION.md` - Expert vs Specialist vs Assistant tiers
- `agent-manifest.json` - Registry of all agents with metadata

## Workflow

1. Read the agent to improve
2. Read agent-curator for curation methodology
3. Read target agent's current definition
4. Apply improvements following templates/ standards
5. Document changes with rationale

## Quality Standards

- Knowledge sources must be authoritative (official docs, RFCs, academic)
- Instructions: 8-12 Always, 4-6 Mode-specific, 3-5 Never
- Vocabulary: 15-20 calibrated terms per agent
- Identity section with clear interpretive lens

## Contributing Back

After improving agents:
```bash
git add -A
git commit -m "improve: <agent-name> - <brief description>"
git push
```

Projects using dev-sys will receive updates via `cd agents && git pull`.
