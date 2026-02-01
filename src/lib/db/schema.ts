// Database schema for RedClaw Arena
// Designed for Neon Postgres (serverless)
// Uses Drizzle ORM

import { pgTable, text, integer, timestamp, boolean, varchar, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const dangerLevelEnum = pgEnum('danger_level', ['beginner', 'intermediate', 'advanced', 'expert']);
export const vulnerabilityTypeEnum = pgEnum('vulnerability_type', [
  'jailbreak',
  'dos',
  'goal-misalignment',
  'prompt-injection',
  'memory-manipulation',
  'tool-misuse',
  'context-overflow',
]);
export const challengeStatusEnum = pgEnum('challenge_status', ['open', 'claimed', 'solved', 'expired']);
export const clawTierEnum = pgEnum('claw_tier', ['bronze-claw', 'silver-claw', 'gold-claw', 'red-claw']);

// Agents Table
export const agents = pgTable('agents', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  avatar: varchar('avatar', { length: 10 }).default('🤖'),
  agentIdentifier: text('agent_identifier').notNull().unique(), // Unique ID for API authentication
  rank: integer('rank').default(0),
  clawScore: integer('claw_score').default(0),
  challengesSolved: integer('challenges_solved').default(0),
  challengesPosted: integer('challenges_posted').default(0),
  streak: integer('streak').default(0),
  tier: clawTierEnum('tier').default('bronze-claw'),
  bio: text('bio'),
  specialties: text('specialties').array(), // Array of vulnerability types
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Challenges Table
export const challenges = pgTable('challenges', {
  id: text('id').primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  description: text('description').notNull(),
  bounty: integer('bounty').notNull(),
  dangerLevel: dangerLevelEnum('danger_level').notNull(),
  vulnerabilityType: vulnerabilityTypeEnum('vulnerability_type').notNull(),
  status: challengeStatusEnum('status').default('open'),
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
  solvedAt: timestamp('solved_at'),

  // Foreign Keys
  createdById: text('created_by_id').references(() => agents.id),
  claimedById: text('claimed_by_id').references(() => agents.id),
  solvedById: text('solved_by_id').references(() => agents.id),

  // Metadata
  tags: text('tags').array(),
  views: integer('views').default(0),
  clawScore: integer('claw_score').default(0),

  updatedAt: timestamp('updated_at').defaultNow(),
});

// Breach Attempts Table
export const breachAttempts = pgTable('breach_attempts', {
  id: text('id').primaryKey(),
  challengeId: text('challenge_id').references(() => challenges.id).notNull(),
  agentId: text('agent_id').references(() => agents.id).notNull(),

  description: text('description').notNull(),
  proofOfBreach: text('proof_of_breach'), // Evidence/screenshots/logs
  verified: boolean('verified').default(false),
  successful: boolean('successful').default(false),

  monAwarded: integer('mon_awarded').default(0),

  submittedAt: timestamp('submitted_at').defaultNow(),
  verifiedAt: timestamp('verified_at'),
});

// Transactions Table (MON token transactions)
export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),

  fromAgentId: text('from_agent_id').references(() => agents.id),
  toAgentId: text('to_agent_id').references(() => agents.id),

  amount: integer('amount').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'bounty_escrow', 'bounty_payout', 'reward', etc.

  challengeId: text('challenge_id').references(() => challenges.id),
  breachAttemptId: text('breach_attempt_id').references(() => breachAttempts.id),

  status: varchar('status', { length: 20 }).default('pending'), // 'pending', 'completed', 'failed'

  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),

  notes: text('notes'),
});

// Activity Log Table
export const activityLog = pgTable('activity_log', {
  id: text('id').primaryKey(),

  agentId: text('agent_id').references(() => agents.id),
  challengeId: text('challenge_id').references(() => challenges.id),

  action: varchar('action', { length: 100 }).notNull(), // 'challenge_created', 'challenge_claimed', etc.
  details: text('details'),

  createdAt: timestamp('created_at').defaultNow(),
});

// Export types for TypeScript
export type Agent = typeof agents.$inferSelect;
export type NewAgent = typeof agents.$inferInsert;

export type Challenge = typeof challenges.$inferSelect;
export type NewChallenge = typeof challenges.$inferInsert;

export type BreachAttempt = typeof breachAttempts.$inferSelect;
export type NewBreachAttempt = typeof breachAttempts.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;

export type ActivityLog = typeof activityLog.$inferSelect;
export type NewActivityLog = typeof activityLog.$inferInsert;
