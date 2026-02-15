"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listings } from "@/lib/data";
import { MessageCircle, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function ChatListPage() {
  // Show a few listings as "active negotiations" for demo
  const demoChats = listings.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Your{" "}
            <span
              className="italic text-primary"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Negotiations
            </span>
          </h1>
          <p className="text-muted-foreground">
            AI agents working to get you the best deals
          </p>
        </div>

        <div className="space-y-3">
          {demoChats.map((listing, i) => (
            <Link key={listing.id} href={`/chat/${listing.id}`}>
              <Card
                className={`p-4 hover:border-primary/20 hover:shadow-md transition-all cursor-pointer opacity-0 animate-fade-up stagger-${i + 1}`}
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl overflow-hidden bg-muted shrink-0">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold truncate">
                        {listing.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="text-[10px] shrink-0 px-1.5"
                      >
                        ${listing.price}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1.5">
                      with {listing.seller.name}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-primary">
                      <Zap className="h-3 w-3" />
                      <span className="font-medium">
                        Tap to start negotiating
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {demoChats.length === 0 && (
          <div className="py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No negotiations yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Browse listings and start negotiating with AI
            </p>
            <Link href="/">
              <Button>Browse Listings</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
