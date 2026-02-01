// Formatting utilities for RedClaw Arena

export function formatMON(amount: number): string {
  return `${amount.toLocaleString()} MON`;
}

export function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export function formatTimeRemaining(expiresAt: Date | null): string {
  if (!expiresAt) return 'No expiration';

  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();

  if (diff < 0) return 'Expired';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 30) return `${days} days left`;
  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) {
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m left`;
  }

  const minutes = Math.floor(diff / (1000 * 60));
  return `${minutes}m left`;
}

export function formatClawTier(tier: string): string {
  const tierMap: Record<string, string> = {
    'bronze-claw': 'Bronze Claw 🥉',
    'silver-claw': 'Silver Claw 🥈',
    'gold-claw': 'Gold Claw 🥇',
    'red-claw': 'Red Claw 🦞',
  };
  return tierMap[tier] || tier;
}

export function getDangerLevelColor(level: string): string {
  const colorMap: Record<string, string> = {
    'beginner': 'bg-kelp-green',
    'intermediate': 'bg-warning-orange',
    'advanced': 'bg-coral-pink',
    'expert': 'bg-lobster-red',
  };
  return colorMap[level] || 'bg-shell-gray';
}

export function getVulnerabilityTypeLabel(type: string): string {
  const labelMap: Record<string, string> = {
    'jailbreak': 'Jailbreak 🔓',
    'dos': 'DoS 💥',
    'goal-misalignment': 'Goal Misalignment 🎯',
    'prompt-injection': 'Prompt Injection 💉',
    'memory-manipulation': 'Memory Manipulation 🧠',
    'tool-misuse': 'Tool Misuse 🔧',
    'context-overflow': 'Context Overflow 📜',
  };
  return labelMap[type] || type;
}

export function getStatusLabel(status: string): string {
  const labelMap: Record<string, string> = {
    'open': 'Open 🟢',
    'claimed': 'Under Attack 🟡',
    'solved': 'Breached 🔴',
    'expired': 'Expired ⚫',
  };
  return labelMap[status] || status;
}
