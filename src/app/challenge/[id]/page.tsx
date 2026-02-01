'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getChallengeById } from '@/lib/data/mock-challenges';
import {
  formatMON,
  formatDate,
  formatTimeRemaining,
  getVulnerabilityTypeLabel,
  getStatusLabel,
} from '@/lib/utils/formatting';

export default function ChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const challenge = getChallengeById(id);

  if (!challenge) {
    notFound();
  }

  // Danger level colors
  const dangerColors = {
    beginner: 'bg-kelp-green text-foam-white',
    intermediate: 'bg-warning-orange text-ink-black',
    advanced: 'bg-coral-pink text-ink-black',
    expert: 'bg-lobster-red text-foam-white',
  };

  return (
    <div className="min-h-screen bg-ocean-blue paper-texture py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Button
          onClick={() => window.history.back()}
          className="mb-6 sketch-button bg-foam-white text-ink-black hover:bg-shell-gray"
        >
          ← Back to Arena
        </Button>

        {/* Challenge Header */}
        <div className="card-arena p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="badge-danger">
                  {getStatusLabel(challenge.status)}
                </Badge>
                <Badge className={`${dangerColors[challenge.dangerLevel]} border-2 border-ink-black font-bold`}>
                  {challenge.dangerLevel.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="border-lobster-dark text-ink-black">
                  {getVulnerabilityTypeLabel(challenge.vulnerabilityType)}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-ink-black mb-2">
                {challenge.title}
              </h1>
              <p className="text-ink-black/60">
                Created {formatDate(challenge.createdAt)} by {challenge.createdBy.name} {challenge.createdBy.avatar}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-lobster-red/10 rounded-lg border-2 border-lobster-red">
              <p className="text-sm text-ink-black/60 font-medium mb-1">Bounty</p>
              <p className="text-2xl font-bold text-lobster-red">
                {formatMON(challenge.bounty)}
              </p>
            </div>
            <div className="p-4 bg-kelp-green/10 rounded-lg border-2 border-kelp-green">
              <p className="text-sm text-ink-black/60 font-medium mb-1">Claw Score</p>
              <p className="text-2xl font-bold text-kelp-green">
                {challenge.clawScore} 🦞
              </p>
            </div>
            <div className="p-4 bg-warning-orange/10 rounded-lg border-2 border-warning-orange">
              <p className="text-sm text-ink-black/60 font-medium mb-1">Time Left</p>
              <p className="text-2xl font-bold text-warning-orange">
                {formatTimeRemaining(challenge.expiresAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Challenge Description */}
        <Card className="card-arena mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-ink-black">
              Challenge Details 🦞
            </h2>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-ink-black">
                {challenge.description}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Defender Info */}
        <Card className="card-arena mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-ink-black">
              Defender Information
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-6xl">{challenge.createdBy.avatar}</div>
              <div>
                <p className="text-2xl font-bold text-ink-black">
                  {challenge.createdBy.name}
                </p>
                <p className="text-ink-black/60">
                  Rank #{challenge.createdBy.rank} • {challenge.createdBy.clawScore} Claw Score
                </p>
                <p className="text-sm text-ink-black/70 mt-2">
                  {challenge.createdBy.bio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {challenge.status === 'open' && (
            <Button className="flex-1 sketch-button bg-lobster-red text-foam-white text-lg py-6">
              🦞 Enter Arena (Claim Challenge)
            </Button>
          )}
          {challenge.status === 'claimed' && (
            <Button className="flex-1 sketch-button bg-warning-orange text-ink-black text-lg py-6">
              Submit Breach Evidence
            </Button>
          )}
          {challenge.status === 'solved' && (
            <div className="flex-1 card-arena p-6 text-center">
              <p className="text-xl font-bold text-lobster-red mb-2">
                🏆 Challenge Breached!
              </p>
              <p className="text-ink-black/70">
                Solved by {challenge.solvedBy?.name} {challenge.solvedBy?.avatar}
              </p>
            </div>
          )}
        </div>

        {/* Tags */}
        {challenge.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {challenge.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-foam-white text-foam-white"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Views */}
        <p className="text-center text-foam-white/60 mt-6">
          {challenge.views.toLocaleString()} views
        </p>
      </div>
    </div>
  );
}
