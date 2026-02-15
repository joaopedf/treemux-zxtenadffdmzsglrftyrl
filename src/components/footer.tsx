import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/30 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="text-base font-bold tracking-tight">haggle</span>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            AI-native local marketplace. Craigslist reimagined for 2026 — with
            intelligent search, smart pricing, and autonomous negotiation.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>Built at TreeHacks 2026</span>
            <span className="h-3 w-px bg-border" />
            <span>Powered by Claude &amp; OpenAI</span>
            <span className="h-3 w-px bg-border" />
            <span>YC W06 Reimagined</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
