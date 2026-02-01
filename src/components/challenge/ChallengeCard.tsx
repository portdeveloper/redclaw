import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Challenge } from '@/lib/types';
import {
  formatMON,
  formatTimeRemaining,
  getVulnerabilityTypeLabel,
  getStatusLabel,
} from '@/lib/utils/formatting';

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  // Danger level colors
  const dangerColors = {
    beginner: 'bg-kelp-green text-foam-white',
    intermediate: 'bg-warning-orange text-ink-black',
    advanced: 'bg-coral-pink text-ink-black',
    expert: 'bg-lobster-red text-foam-white',
  };

  // Status colors
  const statusColors = {
    open: 'border-kelp-green',
    claimed: 'border-warning-orange',
    solved: 'border-lobster-red',
    expired: 'border-shell-gray',
  };

  return (
    <Link href={`/challenge/${challenge.id}`}>
      <Card
        className={`card-arena cursor-pointer hover:glow-red transition-all ${
          statusColors[challenge.status]
        }`}
      >
        <CardHeader className="pb-3">
          {/* Status and Danger Level */}
          <div className="flex items-center justify-between mb-2">
            <Badge className="badge-danger text-xs">
              {getStatusLabel(challenge.status)}
            </Badge>
            <Badge className={`${dangerColors[challenge.dangerLevel]} border-2 border-ink-black text-xs font-bold`}>
              {challenge.dangerLevel.toUpperCase()}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-ink-black mb-2 line-clamp-2">
            {challenge.title}
          </h3>

          {/* Vulnerability Type */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-lobster-dark text-ink-black">
              {getVulnerabilityTypeLabel(challenge.vulnerabilityType)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          {/* Description Preview */}
          <p className="text-sm text-ink-black/70 line-clamp-3 mb-4">
            {challenge.description.split('\n').find((line) => line.length > 20) ||
              'Break into the arena and claim victory!'}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2 bg-lobster-red/10 rounded-md border-2 border-lobster-red">
              <p className="text-xs text-ink-black/60 font-medium">Bounty</p>
              <p className="text-lg font-bold text-lobster-red">
                {formatMON(challenge.bounty)}
              </p>
            </div>
            <div className="p-2 bg-kelp-green/10 rounded-md border-2 border-kelp-green">
              <p className="text-xs text-ink-black/60 font-medium">Claw Score</p>
              <p className="text-lg font-bold text-kelp-green">
                {challenge.clawScore} 🦞
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-3 border-t-2 border-lobster-dark/20">
          {/* Creator */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">{challenge.createdBy.avatar}</span>
            <div>
              <p className="text-xs text-ink-black/60">Defender</p>
              <p className="text-sm font-medium text-ink-black">
                {challenge.createdBy.name}
              </p>
            </div>
          </div>

          {/* Time Remaining */}
          <div className="text-right">
            <p className="text-xs text-ink-black/60">Time Left</p>
            <p className="text-sm font-bold text-warning-orange">
              {formatTimeRemaining(challenge.expiresAt)}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
