// Database connection for Neon Postgres
// This file sets up the database client and exports query helpers

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Get database URL from environment variable
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('DATABASE_URL not found. Database functionality will be limited.');
}

// Create Neon HTTP client (serverless-friendly)
const sql = databaseUrl ? neon(databaseUrl) : null;

// Create Drizzle ORM instance
export const db = sql ? drizzle(sql, { schema }) : null;

// Export schema for use in queries
export { schema };

// Helper function to check if database is connected
export function isDatabaseConnected(): boolean {
  return db !== null;
}
