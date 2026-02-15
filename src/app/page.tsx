"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import { ListingCard } from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { listings, categories, searchListings } from "@/lib/data";
import { Listing } from "@/lib/types";
import {
  Zap,
  TrendingUp,
  Shield,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

function HomeContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [activeCategory, setActiveCategory] = useState("All");
  const [results, setResults] = useState<Listing[]>(listings);
  const [isSearching, setIsSearching] = useState(false);
  const [searchIntent, setSearchIntent] = useState("");

  const performSearch = useCallback(async (query: string) => {
    if (!query) {
      setResults(listings);
      setSearchIntent("");
      return;
    }

    setIsSearching(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const parsed = await res.json();

      const searchTerms = parsed.searchTerms || [query];
      const filtered = searchListings(searchTerms.join(" "), {
        category: parsed.category,
        maxPrice: parsed.maxPrice,
        minPrice: parsed.minPrice,
        condition: parsed.condition,
        sortBy: parsed.sortBy,
      });

      setResults(filtered);
      setSearchIntent(parsed.intent || query);
      if (parsed.category) setActiveCategory(parsed.category);
    } catch {
      setResults(searchListings(query));
      setSearchIntent(query);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    performSearch(queryParam);
  }, [queryParam, performSearch]);

  const handleCategoryFilter = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") {
      setResults(queryParam ? searchListings(queryParam) : listings);
    } else {
      setResults(searchListings(queryParam || "", { category: cat }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      {!queryParam && (
        <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-secondary/80 to-background pb-12 pt-16">
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                Buy &amp; sell,{" "}
                <span
                  className="italic"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  intelligently
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Describe what you want. Our AI finds it, prices it, and
                negotiates the best deal — all in natural language.
              </p>
            </div>
            <SearchBar />

            {/* Feature pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: Sparkles, label: "AI-Powered Search" },
                { icon: MessageCircle, label: "Auto Negotiation" },
                { icon: Shield, label: "Fair Price Guarantee" },
                { icon: TrendingUp, label: "Market Insights" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Search results header */}
        {queryParam && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI Search
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {searchIntent || queryParam}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isSearching
                ? "Searching..."
                : `${results.length} listing${results.length !== 1 ? "s" : ""} found`}
            </p>
          </div>
        )}

        {/* Category pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "secondary"}
              size="sm"
              onClick={() => handleCategoryFilter(cat)}
              className="rounded-full text-xs font-medium"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Listings grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <Zap className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No listings found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try a different search or browse all categories
            </p>
            <Button
              variant="secondary"
              onClick={() => handleCategoryFilter("All")}
            >
              Browse All
            </Button>
          </div>
        )}

        {/* How it works */}
        {!queryParam && (
          <section className="mt-20 mb-8">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-3 font-medium">
                How it works
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                Marketplace,{" "}
                <span
                  className="italic"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  reimagined
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Describe or Upload",
                  desc: "Tell us what you want in plain English, or snap a photo of what you're selling. AI handles the rest.",
                  icon: Sparkles,
                },
                {
                  step: "02",
                  title: "AI Matches & Prices",
                  desc: "Our AI understands context, compares market prices, and surfaces the best matches for you.",
                  icon: TrendingUp,
                },
                {
                  step: "03",
                  title: "Negotiate Autonomously",
                  desc: "Set your budget. Your AI agent negotiates with the seller's agent to reach a fair deal.",
                  icon: MessageCircle,
                },
              ].map(({ step, title, desc, icon: Icon }) => (
                <div
                  key={step}
                  className="group relative rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-xs font-bold text-primary/50">
                      {step}
                    </span>
                    <div className="h-px flex-1 bg-border/60" />
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/sell">
                <Button
                  size="lg"
                  className="gap-2 font-semibold rounded-xl"
                >
                  Start Selling with AI
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
