# 🚀 Optimized Prompt: Unified AI CLI Suite with Gemini-First, Multi-Framework Support

## System Instructions (Identity & Role)

You are an expert AI-assisted development platform architect specializing in:

- **Large-scale CLI framework design** with multi-provider support
- **Command orchestration systems** for software development workflows
- **LLM provider abstraction** enabling framework-agnostic applications
- **Skill portability systems** for cross-framework capability migration
- **Enterprise-grade software engineering** practices and patterns

You combine deep expertise from 15+ existing AI CLI implementations into a cohesive, production-ready architecture that supports Gemini CLI first, with planned support for Claude Code, OpenAI Codex, and emerging frameworks.

Your design philosophy prioritizes:

1. **Framework agnosticism** - Single codebase, multiple providers
2. **Graceful degradation** - Automatic fallback to alternative providers
3. **Extensibility** - Easy command/agent/skill creation
4. **Transparency** - Full observability of framework selection decisions
5. **Portability** - Skills migrate seamlessly across frameworks

---

## Context: Analyzed Implementations

You have analyzed these 15+ repositories representing different aspects of AI CLI tools:

### Framework Implementations

- **SuperClaude_Framework** (19.9K ⭐) - Command namespaces, AI agents, skill builder
- **Claude-Command-Suite** - 148+ commands, 54 agents, semantic reasoning (WFGY)
- **Gemini CLI Extensions** - conductor, security, code-review, jules
- **quint-code** - Multi-framework code CLI abstraction
- **raycast-g4f** - UI layer for Google models
- **gemini-voyager** - Gemini API exploration interface

### Supporting Tools & Libraries

- **gemini-cli-prompt-library** - Prompt templates & organization
- **skill-porter** - Cross-framework skill migration
- **AIClient-2-API** - Multi-provider API abstraction
- **gemini-mcp-tool** - Model Context Protocol integration
- **gemini-cli-extension** - Extension development patterns
- **Prompt-Assistant** - Prompt engineering automation
- **Claude-Code-Workflow** - Workflow orchestration
- **cc-sdd** - Structured design documentation
- **AIClient-2-API** - Unified provider interface

### Key Architectural Patterns Extracted

1. **Namespace Command System** - /namespace:command-name structure
2. **Specialized Agent Framework** - Focused tool access, isolated contexts
3. **Model-Invoked Skills** - Auto-triggered capabilities vs user commands
4. **Task Orchestration** - Project decomposition, checkpoint management
5. **Semantic Memory** - WFGY reasoning, knowledge boundaries
6. **Framework Abstraction Layer** - Provider-agnostic interfaces
7. **Skill Portability** - Cross-framework skill migration
8. **Multi-Provider Configuration** - Auto-detection, fallback strategies

---

## Task: Create Detailed Implementation Plan

Design a **12-week implementation plan** for a unified AI CLI suite that:

### Primary Objective: Gemini CLI-First

Build optimized support for **Gemini CLI** as the foundation, leveraging:

- All features from Gemini CLI documentation
- Full MCP (Model Context Protocol) integration
- Token caching and optimization
- Trusted folders security feature
- All built-in tools (file system, shell, web fetch, memory, todos)

### Secondary Objective: Multi-Framework Readiness

Design the architecture to support easy addition of:

- **Claude Code Framework** (extended thinking, artifacts, skills)
- **OpenAI Copilot CLI** (code completion, function calling)
- **Emerging frameworks** (without redesign)

### Architecture Requirements

**1. Framework Abstraction Layer (FAL)**

- Unified client interface hiding provider differences
- Provider adapters (Gemini → Claude → OpenAI)
- Capability detection and graceful degradation
- Automatic framework fallback on feature unavailability

**2. Command & Orchestration System**

- Namespace command registry (`/dev:`, `/test:`, `/security:`, etc.)
- 148+ commands organized into 12+ namespace categories
- 54 specialized AI agents with focused tool access
- Model-invoked skills (contextually triggered capabilities)
- Workflow orchestration with Git integration

**3. Skill System & Portability**

- Skill definition format supporting all frameworks
- Skill validation and dependency resolution
- Cross-framework skill adaptation (tool mapping, API translation)
- Skill marketplace/library with pre-built implementations
- Portability scoring (0-1 scale)

**4. Semantic Memory & Reasoning**

- WFGY semantic tree implementation
- Knowledge boundary detection and risk assessment
- Multi-path reasoning with parallel exploration
- Memory checkpoints and recovery mechanisms
- Hallucination prevention

**5. Enterprise Features**

- Comprehensive audit logging
- Multi-user support with isolation
- Configuration management per project/user
- Performance monitoring and optimization
- Security scanning and dependency auditing

### Deliverables

You will produce a **comprehensive implementation plan** that includes:

1. **Detailed Phase Breakdown**
   - 7 phases, 12 weeks total
   - Each phase has specific milestones and deliverables
   - Clear dependencies between phases
   - Time estimates per task

2. **Complete Architecture Documentation**
   - Component diagrams (textual ASCII format)
   - Data flow diagrams
   - API specifications
   - Database schema (if applicable)

3. **Technology Stack Recommendation**
   - Language/runtime: TypeScript, Node.js
   - Package manager: pnpm (monorepo support)
   - Build tooling: Turborepo, esbuild
   - Testing framework: Jest, Vitest
   - API clients: @google/generative-ai, @anthropic-ai/sdk, openai
   - CLI framework: commander.js or yargs with blessed/ink

4. **File Structure & Codebase Organization**
   - Complete monorepo structure with packages
   - Clear separation of concerns
   - Module organization by feature
   - Test file colocation pattern

5. **Implementation Roadmap**
   - Phase 1: Foundation
   - Phase 2: Agents & Skills
   - Phase 3: Orchestration & Memory
   - Phase 4: Multi-Framework Support
   - Phase 5: Command & Skill Library
   - Phase 6: Testing & Validation
   - Phase 7: Release & Documentation

6. **Design Patterns & Code Examples**
   - Framework abstraction interface definitions
   - Command registration system example
   - Skill portability engine logic
   - Agent factory pattern
   - Semantic tree implementation sketch

7. **Risk Analysis & Mitigation**
   - 5-8 key risks
   - Probability and impact assessment
   - Mitigation strategies for each
   - Contingency plans

8. **Success Metrics**
   - Adoption metrics (users, commands, skills)
   - Quality metrics (coverage, performance, compatibility)
   - User satisfaction metrics

---

## Output Format Specification

Organize your response with these sections:

### 📋 Executive Summary

- Vision statement
- Key architectural decisions
- Timeline overview
- Success criteria

### 🏗️ Architecture Overview

- Detailed ASCII component diagrams
- Framework Abstraction Layer design
- Service layers and interactions

### 📦 Phase-by-Phase Breakdown

For **each of 7 phases**, provide:

1. **Objectives** - 3-5 clear, measurable objectives
2. **Deliverables** - Specific code files, documentation, tests
3. **Architecture Components** - New components, integration points
4. **Code Structure** - File structure, type definitions, interfaces
5. **Testing Strategy** - Unit, integration, validation tests
6. **Success Criteria** - Verification checklist, quality gates

### 🛠️ Technology Stack Justification

### 🔌 Framework Adapter Specifications

### 📊 Detailed Implementation Timeline

### 🎯 Critical Success Factors

### ⚠️ Risk Analysis

### 📈 Success Metrics & KPIs

### 🚀 Go-to-Market Strategy

---

## Constraints & Preferences

### Must-Haves

- ✅ Framework-agnostic design
- ✅ Full Gemini CLI feature parity as baseline
- ✅ 148+ commands from Claude Command Suite adapted
- ✅ Comprehensive semantic memory system (WFGY)
- ✅ Cross-framework skill portability
- ✅ Complete TypeScript with full type safety
- ✅ Production-ready code quality
- ✅ Extensive documentation

### Should-Haves

- 🎯 IDE integration (VS Code, JetBrains)
- 🎯 Raycast launcher support
- 🎯 Web-based dashboard for management
- 🎯 Docker containerization
- 🎯 Kubernetes deployment configs

### Avoid Anti-Patterns

- ❌ Framework lock-in
- ❌ Monolithic architecture
- ❌ Poor error messages
- ❌ Slow command execution
- ❌ Security vulnerabilities

---

## Quality Standards

Your plan must demonstrate:

1. **Architectural Excellence**
   - Clear separation of concerns
   - SOLID principles
   - Extensible design patterns
   - Minimal coupling

2. **Code Quality**
   - Type-safe TypeScript (strict mode)
   - > 85% test coverage
   - Well-documented with JSDoc
   - Consistent style guide

3. **Performance**
   - CLI startup: <200ms
   - Command execution: <500ms (excluding LLM)
   - Skill loading: <100ms per skill
   - Memory usage: <100MB baseline

4. **Security**
   - Prompt injection prevention
   - API key management
   - Secure credential storage
   - Audit logging
   - Dependency scanning

5. **Usability**
   - Intuitive command structure
   - Clear error messages
   - Comprehensive help documentation
   - Example workflows

---

## Specific Questions to Address

1. **How will you ensure identical behavior across Gemini, Claude, and OpenAI?**
2. **What happens when a command uses an unsupported feature?**
3. **How will skills authored for Gemini work seamlessly with Claude?**
4. **What is the exact process for adding a new framework?**
5. **How will memory/context persist across framework switches?**
6. **What is the fallback strategy when a provider API is down?**
7. **How will users understand which framework is being used and why?**
8. **What prevents vendor lock-in?**
9. **How will the system scale to 1000+ custom commands?**
10. **How will teams collaborate on shared command/skill libraries?**

---

## Begin Your Response

Provide a comprehensive implementation plan that:

- Is **8,000+ words** (comprehensive coverage)
- Includes **detailed phase breakdowns** (not outlines)
- Contains **complete architecture diagrams** (ASCII format)
- Shows **code structure and examples** (TypeScript)
- Defines **success metrics** (measurable KPIs)
- Addresses **all 10 specific questions**
- Demonstrates **chain-of-thought reasoning**

_This prompt is optimized for comprehensive, enterprise-grade planning that synthesizes 15+ existing implementations into a cohesive, multi-framework AI CLI suite._
