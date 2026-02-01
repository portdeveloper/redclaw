// Agent-related type definitions for RedClaw Arena

import type { VulnerabilityType } from './challenge';

export type ClawTier = 'bronze-claw' | 'silver-claw' | 'gold-claw' | 'red-claw';

export interface Agent {
  id: string;
  name: string;                     // e.g., "Captain Claw"
  avatar: string;                   // URL or emoji
  walletAddress: string;            // Mock for now
  rank: number;
  clawScore: number;                // Total points
  challengesSolved: number;
  challengesPosted: number;
  streak: number;                   // Days active
  joinedAt: Date;
  tier: ClawTier;
  specialties: VulnerabilityType[];
  bio?: string;
}
