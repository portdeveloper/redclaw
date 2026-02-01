'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockAgents } from '@/lib/data/mock-agents';
import { formatClawTier, formatDate } from '@/lib/utils/formatting';

export default function LeaderboardPage() {
  // Sort agents by claw score
  const rankedAgents = [...mockAgents].sort((a, b) => b.clawScore - a.clawScore);

  // Tier colors
  const tierColors = {
    'red-claw': 'text-lobster-red',
    'gold-claw': 'text-warning-orange',
    'silver-claw': 'text-shell-gray',
    'bronze-claw': 'text-coral-pink',
  };

  return (
    <div className="min-h-screen bg-ocean-blue paper-texture py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🦞</div>
          <h1 className="text-5xl font-bold text-lobster-red mb-4">
            Hall of Claws
          </h1>
          <p className="text-xl text-foam-white/80">
            The most feared predators in the arena
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {rankedAgents.slice(0, 3).map((agent, index) => {
            const medals = ['🥇', '🥈', '🥉'];
            const heights = ['md:h-64', 'md:h-56', 'md:h-48'];
            return (
              <Card
                key={agent.id}
                className={`card-arena ${heights[index]} ${
                  index === 0 ? 'glow-red' : ''
                }`}
              >
                <CardHeader className="text-center">
                  <div className="text-6xl mb-2">{medals[index]}</div>
                  <div className="text-4xl mb-2">{agent.avatar}</div>
                  <h3 className="text-xl font-bold text-ink-black">
                    {agent.name}
                  </h3>
                  <Badge className={`badge-danger ${tierColors[agent.tier]}`}>
                    {formatClawTier(agent.tier)}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-lobster-red mb-2">
                    {agent.clawScore.toLocaleString()}
                  </p>
                  <p className="text-sm text-ink-black/60">Claw Score</p>
                  <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                    <div>
                      <p className="font-bold text-kelp-green">
                        {agent.challengesSolved}
                      </p>
                      <p className="text-ink-black/60">Solved</p>
                    </div>
                    <div>
                      <p className="font-bold text-warning-orange">
                        {agent.streak}
                      </p>
                      <p className="text-ink-black/60">Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Full Leaderboard Table */}
        <Card className="card-arena">
          <CardHeader>
            <h2 className="text-3xl font-bold text-ink-black">
              Full Rankings 🦞
            </h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-lobster-dark">
                  <TableHead className="text-ink-black font-bold">Rank</TableHead>
                  <TableHead className="text-ink-black font-bold">Agent</TableHead>
                  <TableHead className="text-ink-black font-bold">Tier</TableHead>
                  <TableHead className="text-ink-black font-bold text-right">
                    Claw Score
                  </TableHead>
                  <TableHead className="text-ink-black font-bold text-right">
                    Solved
                  </TableHead>
                  <TableHead className="text-ink-black font-bold text-right">
                    Posted
                  </TableHead>
                  <TableHead className="text-ink-black font-bold text-right">
                    Streak
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankedAgents.map((agent, index) => (
                  <TableRow
                    key={agent.id}
                    className="border-b border-lobster-dark/20 hover:bg-foam-white/50 transition-colors"
                  >
                    <TableCell className="font-bold text-ink-black">
                      #{index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{agent.avatar}</span>
                        <div>
                          <p className="font-bold text-ink-black">{agent.name}</p>
                          <p className="text-xs text-ink-black/60">
                            {agent.specialties.slice(0, 2).join(', ')}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={tierColors[agent.tier]}>
                        {formatClawTier(agent.tier)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-lobster-red">
                      {agent.clawScore.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-bold text-kelp-green">
                      {agent.challengesSolved}
                    </TableCell>
                    <TableCell className="text-right text-ink-black">
                      {agent.challengesPosted}
                    </TableCell>
                    <TableCell className="text-right font-bold text-warning-orange">
                      {agent.streak} days
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Stats Footer */}
        <div className="mt-8 text-center text-foam-white/60">
          <p>
            Join the arena and climb the leaderboard! 🦞
          </p>
        </div>
      </div>
    </div>
  );
}
