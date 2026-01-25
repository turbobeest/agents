# Audit Results

This directory contains output from the agent quality audit framework.

## Directory Structure

```
audit-results/
├── sample/                    # Calibration audit (20-30 agents)
│   ├── structural-scores.json # agent-linter output
│   ├── tier-alignment.json    # Tier validation results
│   ├── frontmatter-compliance.json
│   ├── quality-assessments/   # agent-quality-auditor output
│   │   └── {agent-name}.md
│   └── calibration-report.md  # Calibration summary
│
└── full/                      # Full audit (all agents)
    ├── structural-scores.json
    ├── tier-alignment.json
    ├── frontmatter-compliance.json
    ├── quality-assessments/
    │   └── {agent-name}.md
    └── agent-audit-report.md  # Master audit report
```

## Workflow

1. **Calibration (Phase 3)**: Run linter and auditor on sample agents
2. **Calibrate Rubric**: Adjust weights based on sample results
3. **Full Audit (Phase 4)**: Run calibrated tools on all agents
4. **Remediation (Phase 5)**: Fix agents based on priorities

## Agents Used

- `pipeline-agents/-pipeline-core/validation/agent-linter.md` - Structural checks
- `pipeline-agents/-pipeline-core/validation/agent-quality-auditor.md` - Qualitative assessment
- `pipeline-agents/-pipeline-core/validation/audit-report-generator.md` - Report aggregation

## Rubric

All scoring criteria are defined in `knowledge/agent-quality-rubric.yaml`.
