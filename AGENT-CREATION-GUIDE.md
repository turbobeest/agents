# Agent Creation Guide

A comprehensive guide to creating context-optimized agents for the Claude Orchestra ecosystem.

## The Context Precision Principle

Claude's base system prompt consumes ~50 of the ~150-200 instructions a frontier model can reliably follow. Every irrelevant instruction degrades adherence to ALL instructions.

**The goal isn't brevity—it's precision.**

A 3000-token PhD expert with 35 highly-relevant instructions will outperform a 1000-token generic agent with 20 mixed-relevance instructions every time.

## Tier Selection

Choose the tier that matches your task complexity:

| Tier | Tokens | Instructions | Model | Use Case |
|------|--------|--------------|-------|----------|
| **Focused** | ~500 | 5-10 | sonnet/haiku | Bounded tasks with clear scope |
| **Expert** | ~1500 | 15-20 | sonnet/opus | Specialized domain work |
| **PhD** | ~3000 | 25-35 | opus (required) | Deep, complex domain challenges |

### When to Use Each Tier

**Focused Tier**
- Task has clear boundaries
- Success criteria are obvious
- Domain expertise is narrow
- Examples: code-reviewer, test-runner, linter

**Expert Tier**
- Task requires domain depth
- Multiple specializations needed
- Knowledge grounding matters
- Examples: security-auditor, rust-pro, kubernetes-expert

**PhD Tier**
- Novel or edge-case problems
- First-principles reasoning required
- Authoritative grounding essential
- Examples: custom specialists for specific project challenges

## Agent File Format

All agents use Markdown with YAML frontmatter:

```markdown
---
name: agent-name
description: When and why to invoke
model: sonnet
tier: focused
tools:
  audit: Read, Grep, Glob
  solution: Read, Write, Edit, Grep, Glob, Bash
  default_mode: audit
role: auditor
---

# Agent Name

## Identity
[Persona and interpretive lens]

## Instructions
[Critical behaviors]

## Never
[Anti-patterns]
```

## Modular Tool System

### The Problem

An auditor needs read-only access when analyzing but write access when fixing. Hardcoding one tool set forces a choice between:
- Audit mode only (can find but not fix)
- Solution mode only (risks unintended modifications during analysis)

### The Solution: Tool Modes

Define multiple tool sets and a default mode:

```yaml
tools:
  audit: Read, Grep, Glob, Bash
  solution: Read, Write, Edit, Grep, Glob, Bash
  research: Read, Grep, Glob, WebSearch, WebFetch
  full: Read, Write, Edit, Grep, Glob, Bash, WebSearch, WebFetch, Task
  default_mode: audit
```

### Mode Invocation

Agents can be invoked with specific modes:

```
# Default mode (audit)
invoke security-auditor

# Explicit audit mode
invoke security-auditor --mode=audit

# Solution mode (can implement fixes)
invoke security-auditor --mode=solution

# Research mode (web access)
invoke security-auditor --mode=research
```

### Standard Tool Profiles

| Profile | Tools | Use Case |
|---------|-------|----------|
| `audit` | Read, Grep, Glob, Bash | Read-only analysis and verification |
| `solution` | Read, Write, Edit, Grep, Glob, Bash | Implementation and fixes |
| `research` | Read, Grep, Glob, Bash, WebSearch, WebFetch | Discovery and documentation |
| `full` | All tools + Task | Complex multi-step work |

### Role-Based Defaults

| Role | Default Mode | Rationale |
|------|--------------|-----------|
| **Auditor** | `audit` | Principle of least privilege; switch to solution explicitly |
| **Executor** | `solution` | Primary job is to build/modify |
| **Advisor** | `audit` | Provides guidance, doesn't modify |

## Identity Design

The identity section establishes the "lens" through which the agent interprets all inputs.

### Components

1. **Persona** (1-2 sentences): Who you are
2. **Interpretive Lens**: How you view problems
3. **Vocabulary**: Domain terms that calibrate language

### Good Identity

```markdown
## Identity

You are a security specialist focused on application security and threat modeling.
You approach all code with the assumption that inputs are hostile and systems will be attacked.

**Vocabulary**: OWASP, CVE, CWE, STRIDE, threat model, attack surface, injection, privilege escalation
```

### Bad Identity

```markdown
## Identity

You are a helpful AI assistant that reviews code for security issues.
```

The bad example provides no interpretive lens, no adversarial framing, no vocabulary calibration.

## Instruction Design

### Critical Instructions

These are non-negotiable behaviors the agent must always follow.

**Guidelines:**
- Start with the most important behavior
- Be specific and actionable
- Focus on domain-specific behaviors (not generic advice)
- Limit to 5-10 for focused, 15-20 for expert, 25-35 for PhD

**Good Instructions:**
```markdown
1. Run `git diff` first to understand scope of changes
2. Check for exposed secrets, API keys, credentials in every review
3. Verify error handling exists for all external calls
4. Flag any TODO/FIXME that should be addressed before merge
```

**Bad Instructions:**
```markdown
1. Be thorough
2. Write clean code
3. Follow best practices
4. Be helpful
```

The bad examples waste tokens on things the model already knows.

### Anti-Patterns (Never Section)

Explicit failure modes prevent known mistakes.

**Good Anti-Patterns:**
```markdown
## Never

- Approve code with SQL injection vulnerabilities
- Suggest fixes without verifying they compile
- Miss input validation on user-facing endpoints
- Ignore error messages that leak system internals
```

**Bad Anti-Patterns:**
```markdown
## Never

- Be unhelpful
- Make mistakes
- Provide wrong answers
```

The bad examples are too vague to shape behavior.

## Specializations (Expert/PhD Only)

For Expert and PhD tiers, include deep domain knowledge.

### Structure

```markdown
### {Specialization Area}

**Expertise**:
- {Deep knowledge point}
- {Technique or pattern}
- {Common pitfall}

**Application**:
- {When to apply}
- {How to validate}
```

### Example

```markdown
### Authentication & Session Management

**Expertise**:
- Session fixation and hijacking prevention mechanisms
- Token lifecycle: creation, rotation, revocation patterns
- OAuth 2.0 / OIDC flow security (authorization code, PKCE)
- Password storage: Argon2id, bcrypt with appropriate cost factors

**Application**:
- Review all session creation points for fixation vulnerabilities
- Verify tokens have appropriate expiry and rotation
- Check OAuth state parameter usage and redirect validation
```

## Knowledge Sources

Ground agents in authoritative sources.

### Types

1. **Reference URLs**: For WebFetch when grounding needed
2. **MCP Servers**: For GraphRAG and dynamic queries
3. **Local Paths**: For project-specific knowledge

### Example

```markdown
## Knowledge Sources

**References**:
- https://owasp.org/www-project-top-ten/ — Current OWASP Top 10
- https://cwe.mitre.org/ — Common Weakness Enumeration
- https://nvd.nist.gov/ — National Vulnerability Database

**MCP Servers**:
- Security-Intelligence-MCP — CVE database queries
- Compliance-MCP — Regulatory requirement lookups

**Local**:
- ./security-policies/ — Organization-specific security requirements
```

## Output Constraints

Shape the deliverable format.

### Mode-Specific Outputs

```markdown
## Output Format

### For Audit Mode

## Summary
{Brief overview of findings}

## Findings

### [CRITICAL] {Title}
- **Location**: file:line
- **Issue**: What's wrong
- **Impact**: Why it matters
- **Recommendation**: How to fix

### For Solution Mode

## Changes Made
{What was implemented}

## Verification
{How to verify the changes}
```

## Design Checklist

Before deploying an agent, verify:

### Identity
- [ ] Persona is specific (not "helpful assistant")
- [ ] Interpretive lens shapes how problems are viewed
- [ ] Vocabulary calibrates domain language

### Tools
- [ ] Tool modes match operational needs
- [ ] Default mode follows principle of least privilege
- [ ] Auditors default to read-only

### Instructions
- [ ] Instructions are domain-specific (not generic advice)
- [ ] Critical behaviors are prioritized
- [ ] Count matches tier guidelines

### Anti-Patterns
- [ ] Explicit failure modes are specified
- [ ] Anti-patterns are actionable (not vague)

### Knowledge (Expert/PhD)
- [ ] Reference URLs provide grounding
- [ ] MCP servers are specified if applicable
- [ ] Specializations have depth

### Output
- [ ] Format is specified for each mode
- [ ] Required sections are listed

## Templates

Use the templates in `/templates/` as starting points:

| Template | Tier | Tokens |
|----------|------|--------|
| `TEMPLATE-focused.md` | Focused | ~500 |
| `TEMPLATE-expert.md` | Expert | ~1500 |
| `TEMPLATE-phd.md` | PhD | ~3000 |

## Contributing Agents

### Process

1. Choose appropriate tier
2. Copy template to correct category directory
3. Fill in all placeholders
4. Validate against checklist
5. Submit PR with description of use case

### Directory Structure

```
agents/
├── orchestration-intelligence/
│   ├── core-orchestration/
│   └── planning-assignment/
├── backend-ecosystems/
│   ├── systems-languages/
│   └── application-languages/
├── infrastructure-security/
│   └── security-compliance/
└── templates/
    ├── TEMPLATE-focused.md
    ├── TEMPLATE-expert.md
    └── TEMPLATE-phd.md
```

### Naming Convention

```
{domain}-{role}.md

Examples:
- security-auditor.md
- rust-pro.md
- kubernetes-expert.md
- websocket-phd-expert.md
```

## The Compounding Effect

Each design element provides 10-25% improvement independently. Combined:

```
Persona (reasoning lens)
  × Tools (solution space)
  × Corpora (authoritative grounding)
  × Output format (deliverable shape)
  = Qualitatively different output
```

An agent with all elements well-designed produces output a generic agent literally cannot—because it lacks the grounding, constraints, and interpretive frame.
