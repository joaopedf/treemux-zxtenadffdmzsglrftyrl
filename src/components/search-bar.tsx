"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, ArrowRight } from "lucide-react";

const suggestions = [
  "MacBook under $2000",
  "furniture for my apartment",
  "road bike near campus",
  "headphones noise cancelling",
  "gaming console with games",
  "standing desk for home office",
];

export function SearchBar({ initialQuery = "", compact = false }: { initialQuery?: string; compact?: boolean }) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (compact) return;
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % suggestions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [compact]);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (compact) {
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search anything..."
          className="h-10 pl-9 pr-10 text-sm rounded-lg"
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSearch}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className={`relative rounded-2xl border-2 transition-all duration-300 ${
          isFocused
            ? "border-primary/40 shadow-lg shadow-primary/10"
            : "border-border hover:border-border/80"
        } bg-card`}
      >
        <div className="flex items-center px-4 py-1">
          <Sparkles className="h-5 w-5 text-primary/70 mr-3 shrink-0" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={`Try: "${suggestions[placeholderIdx]}"`}
            className="border-0 bg-transparent text-base placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:outline-none h-12 px-0"
          />
          <Button
            onClick={handleSearch}
            size="sm"
            className="shrink-0 rounded-xl font-semibold gap-1.5"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground/70 mt-2.5">
        Describe what you&apos;re looking for in natural language — our AI understands context, budgets, and preferences
      </p>
    </div>
  );
}
