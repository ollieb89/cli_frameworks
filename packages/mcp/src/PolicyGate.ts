export interface PolicyEntry {
  server: string;
  tool: string;
}

export interface McpPolicy {
  default: 'allow' | 'deny' | 'confirm';
  allowlist?: PolicyEntry[];
  denylist?: PolicyEntry[];
}

export interface PolicyContext {
  serverId: string;
  toolName: string;
  args: any;
}

export type PolicyDecision = 'allow' | 'deny' | 'confirm';

export class PolicyGate {
  constructor(private policy: McpPolicy) {}

  public async check(ctx: PolicyContext): Promise<PolicyDecision> {
    // Check denylist first
    if (this.policy.denylist?.some(e => e.server === ctx.serverId && (e.tool === '*' || e.tool === ctx.toolName))) {
      return 'deny';
    }

    // Check allowlist
    if (this.policy.allowlist?.some(e => e.server === ctx.serverId && (e.tool === '*' || e.tool === ctx.toolName))) {
      return 'allow';
    }

    return this.policy.default;
  }
}
