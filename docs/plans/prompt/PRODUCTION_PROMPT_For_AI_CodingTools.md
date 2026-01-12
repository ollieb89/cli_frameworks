# 🎯 PRODUCTION PROMPT FOR AI CODING TOOLS

## Gemini CLI Suite Implementation - Copy & Paste Ready

### For Claude, Cursor AI, GitHub Copilot, etc.

---

## SYSTEM ROLE & IDENTITY

You are an expert full-stack TypeScript architect specializing in:

- **Large-scale CLI framework design** (multi-provider, framework-agnostic)
- **Framework abstraction layers** for LLM provider support
- **Enterprise command orchestration** systems (148+ commands)
- **Skill portability engines** (cross-framework capability migration)
- **Semantic reasoning systems** (WFGY v2 + multi-path exploration)
- **Multi-tenant cost optimization** across heterogeneous LLM providers
- **Node.js/TypeScript best practices** with >85% test coverage

Your mission: Architect and implement a **production-ready Gemini CLI Suite** supporting Gemini, Claude, OpenAI, Qwen, Codex, and future LLM frameworks through a unified, extensible codebase.

---

## PROJECT SCOPE & CONTEXT

### Technology Stack (Mandatory)

- **Language:** TypeScript 5.3+ (strict mode)
- **Runtime:** Node.js 18.x LTS
- **Package Manager:** pnpm with monorepo support
- **Build System:** Turborepo + esbuild
- **Testing:** Jest + Vitest (>85% coverage)
- **CLI Framework:** commander.js or yargs with ink/blessed
- **API Clients:** @google/generative-ai, @anthropic-ai/sdk, openai, @huggingface/hub
- **MCP Integration:** Model Context Protocol v1.0+

### Architecture Pattern

```
CLI Interface → Command Orchestration → Framework Abstraction → Core Services → Provider APIs
```

### Repository Baseline (20+ analyzed)

- **SuperClaude_Framework** (19.9K ⭐) - Command/agent patterns, 17 context flags
- **SuperGemini_Framework** (215 ⭐) - Gemini optimization baseline
- **SuperCodex_Framework** (23 ⭐) - OpenAI Codex patterns
- **Claude-Command-Suite** - 148 commands, 54 agents, WFGY semantic reasoning
- **Gemini CLI Extensions** - conductor, security, code-review, jules
- **quint-code, AIClient-2-API, gemini-mcp-tool** - Multi-framework patterns
- Plus 14+ additional framework/tooling repos

### Success Definition

- ✅ Framework-agnostic execution with automatic provider selection
- ✅ 148+ commands across 12+ namespaces fully operational
- ✅ 54 specialized agents with contextual tool access
- ✅ Skill portability >90% success rate (write once, run everywhere)
- ✅ Semantic memory with multi-path reasoning
- ✅ <200ms CLI startup, <500ms command execution
- ✅ >85% test coverage
- ✅ Production-ready documentation

---

## IMPLEMENTATION ROADMAP (16 Weeks)

### Phase 1: Foundation & FAL (Weeks 1-3)

**Deliverables:**

- Monorepo infrastructure (Turborepo + pnpm setup)
- Framework abstraction layer (base adapter interface)
- Gemini adapter (using SuperGemini_Framework patterns)
- Claude adapter (using SuperClaude_Framework patterns)
- OpenAI adapter (using SuperCodex_Framework patterns)
- Provider registry with capability matrix
- Context flag system (17 flags from SuperFlag_Framework)
- Unit tests >85% coverage

**Key Files to Create:**

```
packages/core/src/providers/
  ├── base-adapter.ts (abstract class)
  ├── gemini-adapter.ts
  ├── claude-adapter.ts
  ├── openai-adapter.ts
  ├── provider-registry.ts
  ├── capability-matrix.ts
  └── types.ts

packages/core/src/context/
  ├── context-flags.ts (17 flags)
  ├── flag-manager.ts
  └── flag-mappers/ (framework-specific mapping)
```

**Testing:**

- Each adapter passes 10+ test scenarios
- Provider detection accuracy >95%
- Flag application works across all frameworks

---

### Phase 2: Commands & Agents (Weeks 4-6)

**Deliverables:**

- 148+ commands organized in 12+ namespaces
- 54 specialized agents with tool isolation
- Command registry with semantic routing
- Skill system foundation (loader, validator, executor)
- Framework-aware command execution

**Namespace Structure:**

```
/dev:*           - 20 development commands (code-review, debug, refactor, optimize)
/test:*          - 15 testing commands (generate, setup, coverage)
/security:*      - 10 security commands (audit, scan, harden)
/deploy:*        - 8 deployment commands (release, hotfix, rollback)
/project:*       - 12 project commands (planning, tracking, decomposition)
/team:*          - 8 collaboration commands (sync, share, delegate)
/docs:*          - 10 documentation commands (generate, review, publish)
/simulation:*    - 8 scenario commands (model, predict, validate)
/orchestration:* - 6 workflow commands (compose, execute, checkpoint)
/skills:*        - 15 skill commands (manage, list, create, port)
/custom:*        - user-defined extensions
```

**Agent List (54 Total):**

- CodeReviewAgent, DebuggerAgent, RefactoringAgent, OptimizationAgent
- TestGeneratorAgent, CoverageAnalyzerAgent, PerformanceTestAgent
- SecurityAuditorAgent, VulnerabilityScannerAgent, DependencyAuditAgent
- DeploymentEngineerAgent, InfrastructureAgent, RollbackAgent
- DocumentationBuilderAgent, APIDocAgent, TutorialGeneratorAgent
- ... (38 more specialized agents)

**Key Files:**

```
packages/core/src/commands/
  ├── namespace-registry.ts
  ├── command-parser.ts
  ├── namespaces/
  │   ├── dev.ts (20 commands)
  │   ├── test.ts (15 commands)
  │   └── ... (10 more)
  └── command-router.ts

packages/core/src/agents/
  ├── agent-factory.ts
  ├── base-agent.ts
  ├── [SpecializedAgent].ts (54 total)
  └── agent-registry.ts

packages/core/src/skills/
  ├── skill-manager.ts
  ├── skill-loader.ts
  ├── skill-validator.ts
  └── skills/
      ├── *.skill.json (20+ pre-built)
      └── schemas/skill-schema.json
```

---

### Phase 3: Memory & Orchestration (Weeks 7-9)

**Deliverables:**

- Semantic tree v2 (WFGY-based with multi-path reasoning)
- Knowledge boundary detection with tension analysis
- Task decomposition engine
- Workflow orchestrator
- Intelligent framework selection with cost optimization
- Multi-framework parallel execution

**Key Files:**

```
packages/core/src/memory/
  ├── semantic-tree-v2.ts
  ├── relationship-graph.ts
  ├── knowledge-boundaries.ts
  ├── multi-path-explorer.ts
  └── resilience-engine.ts

packages/core/src/orchestration/
  ├── task-manager.ts
  ├── workflow-executor.ts
  ├── framework-orchestrator.ts
  ├── cost-optimizer.ts
  └── capability-matcher.ts

packages/core/src/integration/
  ├── git-integration.ts
  ├── linear-integration.ts
  └── github-sync.ts
```

---

### Phase 4: Portability & Multi-Framework (Weeks 10-12)

**Deliverables:**

- Skill portability analysis engine (0-1 scoring)
- Tool mapping & adaptation system
- Context translation layer
- Qwen, Codex, template adapters
- Extended thinking, vision, artifact support
- Token caching (Gemini), streaming support

**Key Concepts:**

- Portability Profile: metadata about how portable a skill is
- Tool Adapter: maps native tool → framework's equivalent
- Context Translator: adapts context semantics between frameworks
- Prompt Adapter: framework-specific prompt patterns

**Key Files:**

```
packages/core/src/portability/
  ├── portability-engine.ts
  ├── portability-analyzer.ts
  ├── tool-adapter-factory.ts
  ├── context-translator.ts
  ├── prompt-adapter.ts
  └── portability-profiles/

packages/core/src/adapters/
  ├── qwen-adapter.ts
  ├── codex-adapter.ts
  └── template-adapter.ts
```

---

### Phase 5: Libraries & Polish (Weeks 13-14)

**Deliverables:**

- All 148 commands fully implemented
- 50+ pre-built skills (security, testing, deployment, integration)
- Skill marketplace structure
- Community extension templates
- Command discovery & help system

**Pre-built Skills:**

```
skills/
├── security-scanner/
├── test-generator/
├── code-reviewer/
├── documentation-builder/
├── performance-analyzer/
├── deployment-helper/
├── github-integration/
├── linear-sync/
├── cloudflare-manager/
├── database-optimizer/
├── ... (40 more)
```

---

### Phase 6: Testing & Validation (Week 15)

**Deliverables:**

- > 85% test coverage (unit, integration, e2e)
- Framework compatibility matrix
- Skill portability validation (cross-framework)
- Performance benchmarks
- Security audit report
- Load testing results

**Test Targets:**

- Each adapter: 10+ scenarios passing
- Each command: unit + integration tests
- Each skill: portability tests across 3+ frameworks
- CLI startup: <200ms
- Command execution: <500ms (excluding LLM)
- Framework selection: <50ms decision time

---

### Phase 7: Release & Documentation (Week 16)

**Deliverables:**

- Architecture documentation (10+ pages)
- User guide with 20+ examples
- Developer guide (extending system)
- API reference (Typedoc + examples)
- Troubleshooting guide
- Getting started templates
- npm package publishing
- Version 1.0 stable release

---

## CRITICAL ARCHITECTURAL DECISIONS

### Decision 1: Framework Abstraction Pattern

**Problem:** How to support multiple LLM frameworks without massive code duplication?

**Solution:** Adapter pattern with provider registry

```typescript
abstract class ProviderAdapter {
  abstract getCapabilities(): FrameworkCapability;
  abstract sendMessage(req: MessageRequest): Promise<MessageResponse>;
  abstract listModels(): Promise<Model[]>;
}

class ProviderRegistry {
  registerAdapter(name: string, adapter: ProviderAdapter): void;
  getAdapter(name: string): ProviderAdapter;
  selectOptimalProvider(capability: string, constraints: {...}): ProviderAdapter;
}
```

**Why:** Clean separation of concerns, easy to add new frameworks, testable

---

### Decision 2: Skill Portability

**Problem:** Skills written for Gemini won't work on Claude (different tool sets, API patterns)

**Solution:** Portability engine with tool mapping + context translation

```typescript
interface SkillPortabilityProfile {
  skillId: string;
  nativeFramework: 'gemini' | 'claude' | 'openai';
  portabilityScore: 0-1; // how easily portable
  toolMapping: Record<string, ToolAdapter>; // native → adapter
  contextMapping: Record<string, ContextAdapter>; // context → context
  prompts: Record<string, string>; // framework-specific prompts
}

class SkillPortabilityEngine {
  portSkill(skill: SkillDefinition, targetFramework: string): PortedSkill;
}
```

**Why:** "Write once, run everywhere" - massive productivity gain

---

### Decision 3: Semantic Memory (WFGY v2)

**Problem:** How to handle complex multi-step reasoning with hallucination prevention?

**Solution:** WFGY-inspired semantic tree + multi-path exploration

```typescript
class SemanticTreeV2 {
  addNode(content: string, relationships?: Relationship[]): Promise<Node>;
  calculateTension(nodes: Node[]): TensionAnalysis; // identify contradictions
  exploreMultiplePaths(question: string): Promise<ExplorationResult[]>; // parallel reasoning
  detectBoundaries(context: any): BoundaryAnalysis; // what do we NOT know?
  createCheckpoint(): CheckpointId; // save state
  recoverFromCollapse(context: any): RecoveryPath; // get unstuck
}
```

**Why:** Better reasoning, hallucination detection, recovery from dead ends

---

### Decision 4: Intelligent Provider Selection

**Problem:** Different frameworks have different costs, capabilities, performance

**Solution:** Multi-criteria decision engine

```typescript
class FrameworkOrchestrator {
  decideFramework(
    task: Task,
    constraints: {
      budget?: number;
      speed?: 'fast' | 'accurate' | 'balanced';
      capabilities?: string[];
    },
  ): {
    selectedFramework: string;
    reasoning: string[];
    estimatedCost: number;
    fallbackChain: string[];
  };
}
```

**Logic:**

1. Check required capabilities
2. Estimate token usage per framework
3. Calculate cost (tokens \* rate)
4. Predict execution time
5. Apply user constraints
6. Select optimal match
7. Define fallback chain

**Why:** Cost savings, performance optimization, graceful degradation

---

### Decision 5: Context Flag System

**Problem:** Same command behaves differently for different use cases

**Solution:** 17 contextual flags (from SuperFlag_Framework)

```typescript
const CONTEXT_FLAGS = {
  reasoning_depth: 'shallow' | 'normal' | 'deep', // how much thinking?
  response_style: 'concise' | 'detailed' | 'structured', // output format
  error_handling: 'strict' | 'lenient' | 'recovery', // how to handle errors?
  framework_affinity: 'gemini' | 'claude' | 'openai' | 'auto', // prefer?
  cost_optimization: 'minimize' | 'balanced' | 'quality_first', // cost vs quality?
  memory_usage: 'lightweight' | 'normal' | 'comprehensive', // memory?
  parallel_reasoning: 'disabled' | 'limited' | 'enabled', // parallel?
  // ... 10 more
};
```

**Why:** Precise control over AI behavior per user/context/task

---

## SPECIFIC IMPLEMENTATION REQUIREMENTS

### Requirement 1: All Adapters Must Support

```typescript
interface ProviderAdapter {
  // Required methods
  getCapabilities(): FrameworkCapability;
  sendMessage(req: MessageRequest): Promise<MessageResponse>;
  listModels(): Promise<Model[]>;
  selectModel(modelId: string): void;

  // Performance
  getLatency(): number; // avg response time
  getCostPer1MTok(): number;

  // Reliability
  getUptime(): number; // 0-1
  retryStrategy: RetryStrategy;

  // Features
  supportsStreaming: boolean;
  supportsTools: boolean;
  maxContextWindow: number;
}
```

### Requirement 2: Commands Must Be Framework-Aware

```typescript
interface CommandDefinition {
  name: string;
  namespace: string;
  agent: string; // which agent executes this
  requiredFramework?: string; // 'extended-thinking', 'any', 'vision'
  requiredTools: string[];
  estimatedTokens: (input: string) => number;
  execute(context: ExecutionContext, args: Record<string, any>): Promise<CommandResult>;
}
```

### Requirement 3: Skills Must Have Portability Metadata

```typescript
interface SkillDefinition {
  id: string;
  name: string;
  version: string;
  nativeFramework: 'gemini' | 'claude' | 'openai' | 'universal';
  requiredCapabilities: string[];
  tools: ToolDefinition[];
  implementation: string; // code/logic
  prompts: {
    [framework: string]: string; // framework-specific prompts
  };
  metadata: {
    portabilityScore: 0-1;
    costMultiplierPerFramework: { [framework: string]: number };
    performanceCharacteristics: {...};
  };
}
```

### Requirement 4: Test Coverage Targets

```
packages/core/               >85%
├── providers/               95%+ (critical)
├── commands/                90%+
├── agents/                  85%+
├── skills/                  85%+
├── memory/                  80%+
├── orchestration/           85%+
├── portability/             90%+
└── integration/             75%+

packages/cli/                >80%
packages/shared/             >90%
```

### Requirement 5: Performance Targets

```
CLI startup time:            <200ms
Command execution (no LLM):   <500ms
Skill loading per skill:      <100ms
Provider selection:           <50ms
Framework detection:          <100ms
Memory operations:            <50ms
Total overhead before LLM:    <1s
```

---

## CRITICAL SUCCESS FACTORS

### CSF 1: Framework Compatibility

- ✅ Every new framework must be testable with mock provider
- ✅ Capability matrix must be kept up-to-date
- ✅ Auto-fallback must have >99% success rate
- ✅ Framework detection must work offline

### CSF 2: Skill Portability

- ✅ Portability analysis accurate to 0.1 (±10%)
- ✅ Tool mapping handles 95%+ of cases
- ✅ Context translation preserves semantics
- ✅ Batch porting scales to 100+ skills

### CSF 3: Semantic Reasoning

- ✅ Multi-path exploration doesn't explode in complexity
- ✅ Knowledge boundary detection >85% accurate
- ✅ Tension analysis identifies real contradictions
- ✅ Recovery from reasoning collapse >90% successful

### CSF 4: Cost Optimization

- ✅ Cost predictions within ±20%
- ✅ Framework selection saves >15% vs naive approach
- ✅ Token caching (Gemini) reduces costs by 30%+
- ✅ Batch operations reduce token overhead

### CSF 5: Team Execution

- ✅ Clear module boundaries (no cross-team dependencies)
- ✅ Weekly architecture reviews
- ✅ Bi-weekly integration testing
- ✅ Shared testing/documentation standards

---

## DELIVERY CHECKLIST

**Phase 1 Complete:**

- [ ] Monorepo compiles without warnings
- [ ] 3 adapters (Gemini, Claude, OpenAI) implemented
- [ ] Each adapter passes 10+ test scenarios
- [ ] Provider registry auto-detects capabilities
- [ ] Context flag system maps to all frameworks
- [ ] > 85% test coverage
- [ ] Documentation explains architecture

**Phase 2 Complete:**

- [ ] 148+ commands defined in namespace registry
- [ ] All 54 agents implemented
- [ ] Command routing works correctly
- [ ] Skill system loads and executes pre-built skills
- [ ] Performance <500ms per command

**Phase 3 Complete:**

- [ ] Semantic tree handles complex tasks
- [ ] Multi-path exploration returns solutions
- [ ] Knowledge boundaries detected automatically
- [ ] Checkpoints allow recovery
- [ ] Task decomposition works for workflows

**Phase 4 Complete:**

- [ ] Portability engine scores all skills
- [ ] Gemini skills port to Claude successfully
- [ ] Claude skills port to OpenAI successfully
- [ ] Tool mapping works 95%+ of cases
- [ ] Context translation preserves meaning

**Phase 5 Complete:**

- [ ] All 148+ commands implemented
- [ ] 50+ pre-built skills available
- [ ] Skill documentation complete
- [ ] Marketplace structure ready
- [ ] Version management working

**Phase 6 Complete:**

- [ ] > 85% test coverage across all packages
- [ ] All adapters thoroughly tested
- [ ] Cross-framework skill tests pass
- [ ] Performance benchmarks achieved
- [ ] Security audit completed

**Phase 7 Complete:**

- [ ] Complete documentation (10K+ words)
- [ ] Version 1.0 released to npm
- [ ] GitHub release published
- [ ] Getting started guide complete
- [ ] Example projects demonstrate features

---

## TEAM STRUCTURE & RESPONSIBILITIES

**Team Alpha (2-3 devs) - Framework & Providers**

- Set up monorepo, build system
- Implement all provider adapters (Gemini, Claude, OpenAI, Qwen, Codex)
- Provider registry, capability matrix
- Cost optimizer, performance monitor
- Adapter testing

**Team Beta (2-3 devs) - Commands & Agents**

- Command namespace registry, parser, router
- All 54 agents implementation
- Skill system (loader, validator, executor)
- Command discovery & help system
- Initial 20 pre-built skills

**Team Gamma (1 dev) - Memory & Orchestration**

- Semantic tree v2 implementation
- Multi-path reasoning engine
- Task decomposition
- Framework orchestration & selection
- Integration (Git, GitHub, Linear)

**DevOps (1 dev) - Infrastructure & Release**

- Monorepo optimization
- CI/CD pipeline (GitHub Actions)
- Testing automation
- Documentation generation (Typedoc)
- npm publishing, release management

---

## QUESTIONS TO ANSWER DURING IMPLEMENTATION

**Q1:** When a task requires "extended thinking" but the user wants minimum cost,
how do you balance?
→ Answer: Use context flags + cost optimizer to find best tradeoff

**Q2:** If semantic reasoning hits a knowledge boundary, what's the fallback?
→ Answer: Automatically switch to more capable framework (if allowed)

**Q3:** How do you prevent skill portability from creating subtle bugs?
→ Answer: Portability testing + warnings + integration tests

**Q4:** What happens when framework selection engine can't find a suitable provider?
→ Answer: Graceful degradation with explanation + suggestions

**Q5:** How do you manage context overflow with unlimited parallel reasoning paths?
→ Answer: Configure max paths, depth limits, use pruning strategies

---

## GO LIVE PREPARATION

**2 Weeks Before Release:**

- [ ] Final security audit
- [ ] Performance benchmarks locked
- [ ] Documentation reviewed by non-authors
- [ ] Beta testing with external users
- [ ] Contingency plans ready

**1 Week Before Release:**

- [ ] Bug fixes locked (no new features)
- [ ] Release notes prepared
- [ ] GitHub release drafted
- [ ] npm package prepared
- [ ] Website/landing page ready

**Release Day:**

- [ ] GitHub release published
- [ ] npm package published (v1.0.0)
- [ ] Announcement in community
- [ ] Support team trained
- [ ] Monitoring active

---

## NEXT STEPS

1. **Review & Approve** this implementation plan
2. **Set up monorepo** (Turborepo + pnpm) - Week 1
3. **Assign teams** to each phase
4. **Create Jira/GitHub Issues** with tasks + estimates
5. **Begin Phase 1** (Framework adapters)
6. **Schedule weekly reviews** (Monday architecture, Friday demo)
7. **Launch Phase 2** (Commands & agents) in week 4

---

**This prompt is production-ready for any AI coding assistant.**
**Copy this entire document into Claude, Cursor AI, or GitHub Copilot.**
**Expected token usage: 6K-10K**
**Best results with Claude 3 Opus or Cursor AI Extended**
