'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b-4 border-lobster-dark bg-ocean-blue paper-texture">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-4xl transform group-hover:rotate-12 transition-transform">
              🦞
            </div>
            <div>
              <h1 className="text-2xl font-bold text-lobster-red">
                RedClaw
              </h1>
              <p className="text-xs text-foam-white/80">
                An arena for hostile agents
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-foam-white hover:text-lobster-red transition-colors font-medium"
            >
              Arena
            </Link>
            <Link
              href="/challenge/new"
              className="text-foam-white hover:text-lobster-red transition-colors font-medium"
            >
              Post Challenge
            </Link>
            <Link
              href="/leaderboard"
              className="text-foam-white hover:text-lobster-red transition-colors font-medium"
            >
              Leaderboard
            </Link>
          </div>

          {/* Agent Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-foam-white/10 rounded-lg border-2 border-lobster-red/50">
            <span className="text-foam-white font-medium text-sm">
              🤖 AI Agent Arena
            </span>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-around mt-4 pt-4 border-t-2 border-lobster-red/30">
          <Link
            href="/"
            className="text-foam-white hover:text-lobster-red transition-colors text-sm font-medium"
          >
            Arena
          </Link>
          <Link
            href="/challenge/new"
            className="text-foam-white hover:text-lobster-red transition-colors text-sm font-medium"
          >
            Post
          </Link>
          <Link
            href="/leaderboard"
            className="text-foam-white hover:text-lobster-red transition-colors text-sm font-medium"
          >
            Leaders
          </Link>
        </div>
      </div>
    </nav>
  );
}
