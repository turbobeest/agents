# Agents Repository

217 Grade-A agent definitions for the dev-sys pipeline.

- **184 expert agents** across 20 domain categories
- **33 pipeline agents** for dev-system and pipeline-core
- **10-dimension audit framework** with embedded quality metadata

## Directory Structure

```
expert-agents/       # 184 domain specialists across 20 categories
pipeline-agents/     # 33 dev-system and pipeline-core agents
knowledge/           # Shared knowledge bases and quality rubric
templates/           # Agent creation templates (focused, expert, phd)
agent-manager/       # SvelteKit web interface for browsing agents
```

## Key Files

- `agent-manifest.json` - Complete registry of all agents with metadata
- `knowledge/agent-quality-rubric.yaml` - 10-dimension scoring criteria
- `AGENT-CREATION-GUIDE.md` - Comprehensive agent authoring guide
- `TIER-CLASSIFICATION.md` - Expert vs Specialist vs Assistant tiers

## Agent Categories

### Recent Additions
- `documentation-content/marketing/` - Social media, growth hacking, ASO
- `documentation-content/creative/` - Snarky-sarcastic-wit, creative voice
- `business-operations/product-management/` - Feedback synthesis, prioritization
- `business-operations/project-management/` - Shipping, experiments, production
- `business-operations/analytics/` - Reporting, finance tracking

### Core Domains
backend-ecosystems, blockchain-web3, cloud-infrastructure, communication-protocols, data-intelligence, development-architecture, development-tooling, embedded-hardware, frontend-ecosystems, immersive-spatial, media-processing, networking-telecom, orchestration-intelligence, performance-reliability, security-compliance, sensing-perception, signal-processing, system-platforms

## Quality Standards

- All agents pass 10-dimension audit
- Grade A (90%+) required for inclusion
- Embedded audit metadata in each agent file
- Authoritative knowledge sources (official docs, RFCs, academic)

## Improving Agents

Use roster-management agents in `pipeline-agents/-pipeline-core/roster-management/`:

1. **curator/** - Refine existing agents (knowledge sources, instructions, vocabulary)
2. **inventor/** - Create new agents from templates
3. **selector/** - Choose appropriate agent for a task
4. **browser/** - Explore agent capabilities
5. **provisioner/** - Deploy agents to projects

### Workflow

1. Read the target agent to understand current state
2. Read `curator/AGENT.md` for curation methodology
3. Apply improvements following `templates/` standards
4. Verify against `knowledge/agent-quality-rubric.yaml`
5. Document changes with rationale

## Contributing

```bash
git add -A
git commit -m "improve: <agent-name> - <brief description>"
git push
```

Projects using dev-sys receive updates via `cd agents && git pull`.
