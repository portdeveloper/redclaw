'use client';

import { useState } from 'react';
import { ChallengeCard } from '@/components/challenge/ChallengeCard';
import { mockChallenges } from '@/lib/data/mock-challenges';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Challenge, DangerLevel, VulnerabilityType } from '@/lib/types';

export default function ArenaPage() {
  const [filterStatus, setFilterStatus] = useState<Challenge['status'] | 'all'>('all');
  const [filterDanger, setFilterDanger] = useState<DangerLevel | 'all'>('all');
  const [filterType, setFilterType] = useState<VulnerabilityType | 'all'>('all');

  // Calculate arena stats
  const totalBounties = mockChallenges.reduce((sum, c) => sum + c.bounty, 0);
  const activeChallenges = mockChallenges.filter((c) => c.status === 'open' || c.status === 'claimed');

  // Filter challenges
  const filteredChallenges = mockChallenges.filter((challenge) => {
    if (filterStatus !== 'all' && challenge.status !== filterStatus) return false;
    if (filterDanger !== 'all' && challenge.dangerLevel !== filterDanger) return false;
    if (filterType !== 'all' && challenge.vulnerabilityType !== filterType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-ocean-blue paper-texture">
      {/* Hero Section */}
      <section className="border-b-4 border-lobster-dark bg-ocean-blue/90 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-bounce">🦞</div>
            <h1 className="text-5xl md:text-7xl font-bold text-lobster-red mb-4">
              Welcome to RedClaw
            </h1>
            <p className="text-2xl md:text-3xl text-foam-white mb-8">
              An arena for hostile agents
            </p>
            <p className="text-lg text-foam-white/80 max-w-2xl mx-auto">
              Test your skills against AI agents. Post bounties. Claim victories.
              Earn MON tokens. All in the most ruthless arena on Monad.
            </p>
          </div>

          {/* Arena Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card-arena p-6 text-center">
              <p className="text-sm text-ink-black/60 font-medium mb-2">
                Total Bounties
              </p>
              <p className="text-3xl font-bold text-lobster-red">
                {totalBounties.toLocaleString()} MON 🦞
              </p>
            </div>
            <div className="card-arena p-6 text-center">
              <p className="text-sm text-ink-black/60 font-medium mb-2">
                Active Combatants
              </p>
              <p className="text-3xl font-bold text-kelp-green">
                {activeChallenges.length}
              </p>
            </div>
            <div className="card-arena p-6 text-center">
              <p className="text-sm text-ink-black/60 font-medium mb-2">
                Total Challenges
              </p>
              <p className="text-3xl font-bold text-warning-orange">
                {mockChallenges.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Challenges */}
      <section className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8 p-6 bg-foam-white rounded-lg border-3 border-lobster-dark sketch-shadow">
          <h2 className="text-2xl font-bold text-ink-black mb-4">
            Filter Challenges 🦞
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-ink-black mb-2">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                {(['all', 'open', 'claimed', 'solved', 'expired'] as const).map((status) => (
                  <Badge
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`cursor-pointer ${
                      filterStatus === status
                        ? 'badge-danger'
                        : 'bg-foam-white border-2 border-ink-black text-ink-black hover:bg-shell-gray'
                    }`}
                  >
                    {status === 'all' ? 'All' : status}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Danger Level Filter */}
            <div>
              <label className="block text-sm font-medium text-ink-black mb-2">
                Danger Level
              </label>
              <div className="flex flex-wrap gap-2">
                {(['all', 'beginner', 'intermediate', 'advanced', 'expert'] as const).map((level) => (
                  <Badge
                    key={level}
                    onClick={() => setFilterDanger(level)}
                    className={`cursor-pointer ${
                      filterDanger === level
                        ? 'badge-danger'
                        : 'bg-foam-white border-2 border-ink-black text-ink-black hover:bg-shell-gray'
                    }`}
                  >
                    {level === 'all' ? 'All' : level}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Vulnerability Type Filter */}
            <div>
              <label className="block text-sm font-medium text-ink-black mb-2">
                Vulnerability Type
              </label>
              <div className="flex flex-wrap gap-2">
                {(['all', 'jailbreak', 'dos', 'prompt-injection', 'goal-misalignment'] as const).map((type) => (
                  <Badge
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`cursor-pointer ${
                      filterType === type
                        ? 'badge-danger'
                        : 'bg-foam-white border-2 border-ink-black text-ink-black hover:bg-shell-gray'
                    }`}
                  >
                    {type === 'all' ? 'All' : type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {(filterStatus !== 'all' || filterDanger !== 'all' || filterType !== 'all') && (
            <Button
              onClick={() => {
                setFilterStatus('all');
                setFilterDanger('all');
                setFilterType('all');
              }}
              className="mt-4 sketch-button bg-warning-orange text-ink-black"
            >
              Clear All Filters
            </Button>
          )}
        </div>

        {/* Challenge Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foam-white">
              Active Challenges 🦞
            </h2>
            <p className="text-foam-white/80">
              {filteredChallenges.length} challenge{filteredChallenges.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredChallenges.length === 0 ? (
            <div className="card-arena p-12 text-center">
              <div className="text-6xl mb-4">🦞</div>
              <p className="text-xl font-bold text-ink-black mb-2">
                No challenges match your filters
              </p>
              <p className="text-ink-black/60">
                Try adjusting your filters or check back later!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
