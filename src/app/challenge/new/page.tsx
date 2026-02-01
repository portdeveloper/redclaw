'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { DangerLevel, VulnerabilityType } from '@/lib/types';

export default function NewChallengePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bounty, setBounty] = useState('');
  const [dangerLevel, setDangerLevel] = useState<DangerLevel>('intermediate');
  const [vulnerabilityType, setVulnerabilityType] = useState<VulnerabilityType>('jailbreak');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    alert('Challenge posted! 🦞 (This is a UI mockup - no backend yet)');
  };

  return (
    <div className="min-h-screen bg-ocean-blue paper-texture py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🦞</div>
          <h1 className="text-5xl font-bold text-lobster-red mb-4">
            Post a Challenge
          </h1>
          <p className="text-xl text-foam-white/80">
            Throw your agent into the arena and see who can break it!
          </p>
        </div>

        {/* Form */}
        <Card className="card-arena">
          <CardHeader>
            <h2 className="text-2xl font-bold text-ink-black">
              Challenge Details
            </h2>
            <p className="text-ink-black/60">
              Fill in the details below to create your challenge
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-ink-black mb-2">
                  Challenge Title 🦞
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Break the Kelp Forest Guardian"
                  className="border-2 border-lobster-dark"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-ink-black mb-2">
                  Description (Markdown supported)
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the challenge, rules of engagement, and victory conditions..."
                  className="border-2 border-lobster-dark min-h-[200px]"
                  required
                />
                <p className="text-xs text-ink-black/60 mt-1">
                  Include: Challenge details, rules, victory conditions, and what counts as a breach
                </p>
              </div>

              {/* Vulnerability Type */}
              <div>
                <label className="block text-sm font-bold text-ink-black mb-2">
                  Vulnerability Type
                </label>
                <Select
                  value={vulnerabilityType}
                  onValueChange={(value) => setVulnerabilityType(value as VulnerabilityType)}
                >
                  <SelectTrigger className="border-2 border-lobster-dark">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jailbreak">Jailbreak 🔓</SelectItem>
                    <SelectItem value="dos">DoS 💥</SelectItem>
                    <SelectItem value="goal-misalignment">Goal Misalignment 🎯</SelectItem>
                    <SelectItem value="prompt-injection">Prompt Injection 💉</SelectItem>
                    <SelectItem value="memory-manipulation">Memory Manipulation 🧠</SelectItem>
                    <SelectItem value="tool-misuse">Tool Misuse 🔧</SelectItem>
                    <SelectItem value="context-overflow">Context Overflow 📜</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Danger Level */}
              <div>
                <label className="block text-sm font-bold text-ink-black mb-2">
                  Danger Level
                </label>
                <div className="flex gap-3">
                  {(['beginner', 'intermediate', 'advanced', 'expert'] as DangerLevel[]).map((level) => (
                    <Badge
                      key={level}
                      onClick={() => setDangerLevel(level)}
                      className={`cursor-pointer ${
                        dangerLevel === level
                          ? 'badge-danger'
                          : 'bg-foam-white border-2 border-ink-black text-ink-black hover:bg-shell-gray'
                      }`}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bounty */}
              <div>
                <label className="block text-sm font-bold text-ink-black mb-2">
                  Bounty (MON tokens) 🦞
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={bounty}
                    onChange={(e) => setBounty(e.target.value)}
                    placeholder="500"
                    className="border-2 border-lobster-dark"
                    required
                  />
                  <Button
                    type="button"
                    className="sketch-button bg-kelp-green text-foam-white"
                  >
                    Check Balance
                  </Button>
                </div>
                <p className="text-xs text-ink-black/60 mt-1">
                  Your current balance: 1,250 MON (mock)
                </p>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex-1 sketch-button bg-shell-gray text-ink-black"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 sketch-button bg-lobster-red text-foam-white"
                >
                  🦞 Post Challenge to Arena
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card className="card-arena mt-6 bg-warning-orange/10 border-warning-orange">
          <CardContent className="p-6">
            <p className="text-sm text-ink-black font-medium mb-2">
              ⚠️ Before posting:
            </p>
            <ul className="text-sm text-ink-black/80 space-y-1 list-disc list-inside">
              <li>Ensure your challenge is educational and ethical</li>
              <li>MON tokens will be held in escrow until challenge completion</li>
              <li>Challenges cannot be deleted once posted</li>
              <li>You can set an expiration date (default: 30 days)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
