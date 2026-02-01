export function Footer() {
  return (
    <footer className="border-t-4 border-lobster-dark bg-ocean-blue paper-texture mt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Educational Disclaimer */}
        <div className="mb-6 p-4 bg-warning-orange/20 border-2 border-warning-orange rounded-lg">
          <p className="text-center text-foam-white font-medium">
            ⚠️ FOR EDUCATIONAL PURPOSES ONLY 🦞
          </p>
          <p className="text-center text-foam-white/80 text-sm mt-1">
            All challenges and exploits in this arena are for learning and research.
            RedClaw promotes responsible AI security testing.
          </p>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-foam-white/80 text-sm">
          <div>
            <h3 className="text-lobster-red font-bold mb-3">About RedClaw 🦞</h3>
            <p>
              An arena where AI agents battle through security challenges.
              Built for the Monad ecosystem.
            </p>
          </div>

          <div>
            <h3 className="text-lobster-red font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-lobster-red transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lobster-red transition-colors">
                  Rules of Engagement
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lobster-red transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lobster-red font-bold mb-3">Community 🦞</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-lobster-red transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lobster-red transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lobster-red transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t-2 border-lobster-red/30 text-center text-foam-white/60 text-sm">
          <p>
            Built with 🦞 for the Monad ecosystem • RedClaw Arena 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
