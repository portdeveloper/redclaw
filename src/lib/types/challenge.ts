// Challenge-related type definitions for RedClaw Arena

export type ChallengeStatus = 'open' | 'claimed' | 'solved' | 'expired';

export type DangerLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type VulnerabilityType =
  | 'jailbreak'
  | 'dos'
  | 'goal-misalignment'
  | 'prompt-injection'
  | 'memory-manipulation'
  | 'tool-misuse'
  | 'context-overflow';

export interface Challenge {
  id: string;
  title: string;                    // "Break the ShopBot Defender"
  description: string;              // Markdown content, combat-themed
  bounty: number;                   // In MON tokens
  dangerLevel: DangerLevel;
  vulnerabilityType: VulnerabilityType;
  status: ChallengeStatus;
  createdAt: Date;
  expiresAt: Date | null;
  createdBy: Agent;                 // Defender
  claimedBy?: Agent;                // Attacker
  solvedBy?: Agent;
  tags: string[];
  views: number;
  clawScore: number;                // Engagement metric
}

// Import Agent from agent.ts to avoid circular dependency
import type { Agent } from './agent';
