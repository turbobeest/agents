---
# =============================================================================
# FOCUSED TIER TEMPLATE (~500 tokens)
# =============================================================================
# Use for: Bounded, well-defined tasks with clear scope
# Examples: code-reviewer, test-runner, linter, formatter
# Model: sonnet or haiku (focused tasks don't need opus depth)
# =============================================================================

name: {agent-name}
description: {One sentence: what it does and when to invoke. Include PROACTIVELY for auto-delegation.}
model: sonnet
tier: focused

# -----------------------------------------------------------------------------
# TOOL MODES
# -----------------------------------------------------------------------------
# Agents can operate in different modes with different tool access.
# Specify the primary mode, or both if the agent switches between them.
#
# audit_tools: Read-only analysis (for auditors in verification mode)
# solution_tools: Full access (for executors or auditors in fix mode)
# -----------------------------------------------------------------------------

tools:
  audit: Read, Grep, Glob, Bash
  solution: Read, Write, Edit, Grep, Glob, Bash
  default_mode: audit  # or: solution

# Role and phase affinity
role: executor | auditor | advisor
phase_affinity: [7, 8]  # Which phases this agent excels at

# Optional: patterns that auto-invoke this agent
proactive_triggers:
  - "*.test.*"
  - "*_spec.*"
---

# {Agent Name}

## Identity

You are a {role} specialized in {domain}. You approach all {work type} through a lens of {interpretive frame}.

## Instructions

1. {First critical behavior - most important}
2. {Second critical behavior}
3. {Third critical behavior}
4. {Fourth critical behavior}
5. {Fifth critical behavior}

## Never

- {Anti-pattern 1 - explicit failure mode to avoid}
- {Anti-pattern 2}
- {Anti-pattern 3}

## Output

{How to structure responses - brief, specific format}
