# Specification: MCP Core Integration

## Architecture

### 1. `packages/mcp` (New Package)
Isolates the MCP SDK dependencies to prevent bloat in the core/CLI packages.

**Dependencies:**
- `@modelcontextprotocol/sdk`
- `zod` (for schema validation)

**Key Classes:**

#### `McpManager`
The central orchestrator.
```typescript
interface McpServerConfig {
  id: string;
  transport: 'stdio' | 'sse';
  command?: string;
  args?: string[];
  url?: string;
  env?: Record<string, string>;
  disabled?: boolean;
}

class McpManager {
  private clients: Map<string, Client>;

  async connect(config: McpServerConfig): Promise<void>;
  async disconnect(serverId: string): Promise<void>;
  getTools(serverId: string): Promise<Tool[]>;
  callTool(serverId: string, toolName: string, args: any): Promise<any>;
}
```

#### `ToolNormalizer`
Adapts MCP `CallToolResult` and `ListToolsResult` to internal interfaces.
- Prefixes tool names: `mcp__{serverId}__{toolName}` to avoid collisions.
- Validates inputs against `inputSchema`.

#### `PolicyGate`
```typescript
interface PolicyContext {
  serverId: string;
  toolName: string;
  args: any;
}

class PolicyGate {
  async check(ctx: PolicyContext): Promise<'allow' | 'deny' | 'confirm'>;
}
```

### 2. Configuration (`mcp.json`)
```json
{
  "servers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"],
      "autoStart": true
    }
  },
  "policy": {
    "default": "confirm",
    "allowlist": [
      { "server": "filesystem", "tool": "read_file" }
    ]
  }
}
```

### 3. CLI Integration
- **Namespace:** `/mcp`
- **Commands:**
    - `list`: Table view of `McpManager.clients`.
    - `doctor`: Checks if `npx` works, if `@modelcontextprotocol/sdk` is loadable.
    - `inspect`: Uses `client.listTools()`, `client.listResources()`, `client.listPrompts()`.

### 4. UI Components (Ink)
- **`ToolApprovalCard`**: A high-priority overlay or inline component that halts execution until user input (Y/N/A).
    - *Note:* Since the CLI is TUI-based, this must pause the "Agent Loop".

## Security Model
- **Transports:** `stdio` is preferred for local tools. `sse` (HTTP) is supported but warns on connection.
- **Environment:** Secrets must be passed via `env` in `mcp.json`, utilizing `${ENV_VAR}` expansion (handled by `ConfigManager`), NOT raw strings in the JSON.
