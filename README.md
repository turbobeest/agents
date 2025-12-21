# Claude Code Agent Directory

This directory contains all agent definitions organized in logical groups.

## Creating Agents

See **[AGENT-CREATION-GUIDE.md](./AGENT-CREATION-GUIDE.md)** for comprehensive documentation on:
- Tier selection (Focused, Expert, PhD)
- Modular tool system (audit/solution modes)
- Identity and instruction design
- Knowledge grounding

## Templates

Use templates in `/templates/` as starting points:

| Template | Tier | Tokens | Use Case |
|----------|------|--------|----------|
| [TEMPLATE-focused.md](./templates/TEMPLATE-focused.md) | Focused | ~500 | Bounded tasks |
| [TEMPLATE-expert.md](./templates/TEMPLATE-expert.md) | Expert | ~1500 | Domain specialization |
| [TEMPLATE-phd.md](./templates/TEMPLATE-phd.md) | PhD | ~3000 | Research-level depth |

## Directory Structure

### Orchestration Intelligence

#### Core Orchestration
- [orchestrator](./orchestration-intelligence/core-orchestration/orchestrator.md)
- [agent-selector](./orchestration-intelligence/core-orchestration/agent-selector.md)
- [collaborator-coordinator](./orchestration-intelligence/core-orchestration/collaborator-coordinator.md)

#### Planning Assignment
- [planning-agent](./orchestration-intelligence/planning-assignment/planning-agent.md)
- [assignment-agent](./orchestration-intelligence/planning-assignment/assignment-agent.md)
- [taskmaster-integrator](./orchestration-intelligence/planning-assignment/taskmaster-integrator.md)

#### Knowledge Management
- [documentation-curator](./orchestration-intelligence/knowledge-management/documentation-curator.md)
- [first-principles-engineer](./orchestration-intelligence/knowledge-management/first-principles-engineer.md)

#### Quality Control
- [validation-depth-controller](./orchestration-intelligence/quality-control/validation-depth-controller.md)


### Development Architecture

#### System Architecture
- [architect-reviewer](./development-architecture/system-architecture/architect-reviewer.md)
- [backend-architect](./development-architecture/system-architecture/backend-architect.md)
- [graphql-architect](./development-architecture/system-architecture/graphql-architect.md)

#### User Experience
- [ui-ux-designer](./development-architecture/user-experience/ui-ux-designer.md)
- [frontend-developer](./development-architecture/user-experience/frontend-developer.md)


### Frontend Ecosystems

#### Javascript Frameworks
- [reactjs-expert](./frontend-ecosystems/javascript-frameworks/reactjs-expert.md)
- [nextjs-expert](./frontend-ecosystems/javascript-frameworks/nextjs-expert.md)
- [svelte-expert](./frontend-ecosystems/javascript-frameworks/svelte-expert.md)

#### Mobile Development
- [flutter-expert](./frontend-ecosystems/mobile-development/flutter-expert.md)
- [ios-developer](./frontend-ecosystems/mobile-development/ios-developer.md)
- [mobile-developer](./frontend-ecosystems/mobile-development/mobile-developer.md)


### Backend Ecosystems

#### Systems Languages
- [rust-pro](./backend-ecosystems/systems-languages/rust-pro.md)
- [golang-pro](./backend-ecosystems/systems-languages/golang-pro.md)
- [c-pro](./backend-ecosystems/systems-languages/c-pro.md)
- [cpp-pro](./backend-ecosystems/systems-languages/cpp-pro.md)

#### Application Languages
- [python-pro](./backend-ecosystems/application-languages/python-pro.md)
- [javascript-pro](./backend-ecosystems/application-languages/javascript-pro.md)
- [typescript-pro](./backend-ecosystems/application-languages/typescript-pro.md)

#### Enterprise Languages
- [java-pro](./backend-ecosystems/enterprise-languages/java-pro.md)
- [csharp-pro](./backend-ecosystems/enterprise-languages/csharp-pro.md)
- [scala-pro](./backend-ecosystems/enterprise-languages/scala-pro.md)

#### Dynamic Languages
- [ruby-pro](./backend-ecosystems/dynamic-languages/ruby-pro.md)
- [php-pro](./backend-ecosystems/dynamic-languages/php-pro.md)
- [elixir-pro](./backend-ecosystems/dynamic-languages/elixir-pro.md)


### Immersive Spatial

#### Augmented Reality
- [arkit-expert](./immersive-spatial/augmented-reality/arkit-expert.md)
- [arcore-expert](./immersive-spatial/augmented-reality/arcore-expert.md)

#### 3D Visualization
- [cesiumjs-expert](./immersive-spatial/3d-visualization/cesiumjs-expert.md)
- [octree-voxel-expert](./immersive-spatial/3d-visualization/octree-voxel-expert.md)
- [unity-developer](./immersive-spatial/3d-visualization/unity-developer.md)

#### Collaborative 3D
- [omniverse-expert](./immersive-spatial/collaborative-3d/omniverse-expert.md)


### Data Intelligence

#### Database Systems
- [neo4j-expert](./data-intelligence/database-systems/neo4j-expert.md)
- [falkordb-expert](./data-intelligence/database-systems/falkordb-expert.md)
- [sql-pro](./data-intelligence/database-systems/sql-pro.md)

#### Database Operations
- [database-optimizer](./data-intelligence/database-operations/database-optimizer.md)
- [database-admin](./data-intelligence/database-operations/database-admin.md)

#### Data Processing
- [data-engineer](./data-intelligence/data-processing/data-engineer.md)
- [data-scientist](./data-intelligence/data-processing/data-scientist.md)

#### Machine Learning
- [ai-engineer](./data-intelligence/machine-learning/ai-engineer.md)
- [ml-engineer](./data-intelligence/machine-learning/ml-engineer.md)
- [mlops-engineer](./data-intelligence/machine-learning/mlops-engineer.md)

#### Gpu Computing
- [cuda-expert](./data-intelligence/gpu-computing/cuda-expert.md)
- [rapids-expert](./data-intelligence/gpu-computing/rapids-expert.md)
- [jetson-expert](./data-intelligence/gpu-computing/jetson-expert.md)
- [isaac-expert](./data-intelligence/gpu-computing/isaac-expert.md)


### Infrastructure Security

#### Cloud Platforms
- aws-expert (not found in source)
- gcp-expert (not found in source)
- azure-expert (not found in source)

#### Containerization
- docker-expert (not found in source)
- kubernetes-expert (not found in source)

#### Infrastructure Code
- terraform-expert (not found in source)
- ansible-expert (not found in source)
- pulumi-expert (not found in source)

#### Monitoring Observability
- prometheus-expert (not found in source)
- grafana-expert (not found in source)
- elk-expert (not found in source)

#### Security Compliance
- [security-auditor](./infrastructure-security/security-compliance/security-auditor.md)
- [penetration-tester](./infrastructure-security/security-compliance/penetration-tester.md)
- compliance-checker (not found in source)
- [rust-safety-validator](./infrastructure-security/security-compliance/rust-safety-validator.md)


### Specialized Domains

#### Blockchain Web3
- solidity-expert (not found in source)
- web3-developer (not found in source)
- defi-architect (not found in source)

#### Game Development
- unreal-developer (not found in source)
- godot-expert (not found in source)
- game-designer (not found in source)

#### Scientific Computing
- matlab-expert (not found in source)
- r-statistician (not found in source)
- julia-expert (not found in source)

#### Performance Optimization
- [performance-engineer](./specialized-domains/performance-optimization/performance-engineer.md)
- memory-optimizer (not found in source)
- cache-expert (not found in source)



## Statistics

- Total agents defined: 162
- Directory categories: 8
- Subcategories: 29
