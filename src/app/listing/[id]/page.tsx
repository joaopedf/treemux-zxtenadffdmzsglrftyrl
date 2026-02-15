"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getListingById } from "@/lib/data";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Shield,
  MessageCircle,
  TrendingDown,
  Zap,
  Share2,
  Heart,
} from "lucide-react";
import Link from "next/link";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHrs < 1) return "Just now";
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays}d ago`;
}

export default function ListingPage() {
  const params = useParams();
  const router = useRouter();
  const listing = getListingById(params.id as string);

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
          <Button onClick={() => router.push("/")}>Back to Browse</Button>
        </div>
      </div>
    );
  }

  const savings = listing.originalPrice
    ? listing.originalPrice - listing.price
    : null;
  const savingsPercent = listing.originalPrice
    ? Math.round(
        ((listing.originalPrice - listing.price) / listing.originalPrice) * 100
      )
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Back */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 -ml-2 text-muted-foreground"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Image */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[4/3]">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="h-full w-full object-cover"
              />
              {savingsPercent && savingsPercent > 20 && (
                <Badge className="absolute left-4 top-4 bg-primary/90 text-primary-foreground border-0 text-sm font-bold backdrop-blur-sm">
                  Save {savingsPercent}%
                </Badge>
              )}
              <div className="absolute right-4 top-4 flex gap-2">
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-foreground/70 hover:text-foreground transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-foreground/70 hover:text-red-500 transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <Badge variant="secondary" className="mb-3 font-medium text-xs">
                {listing.category} &middot; {listing.condition}
              </Badge>

              <h1 className="text-2xl font-bold tracking-tight mb-3 leading-tight">
                {listing.title}
              </h1>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">
                  ${listing.price}
                </span>
                {listing.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${listing.originalPrice}
                  </span>
                )}
              </div>

              {savings && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2">
                  <TrendingDown className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    You save ${savings} ({savingsPercent}% below retail)
                  </span>
                </div>
              )}

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {listing.description}
              </p>

              <Separator className="mb-4" />

              {/* Seller */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold">
                  {listing.seller.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {listing.seller.name}
                    </span>
                    {listing.seller.verified && (
                      <Shield className="h-3.5 w-3.5 text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {listing.seller.rating}
                    <span>&middot;</span>
                    Responds {listing.seller.responseTime}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {listing.location}
                  {listing.distance && ` (${listing.distance})`}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Listed {timeAgo(listing.createdAt)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {listing.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator className="mb-6" />

              {/* Actions */}
              <div className="space-y-3">
                <Link href={`/chat/${listing.id}`} className="block">
                  <Button className="w-full gap-2 font-semibold h-12 rounded-xl text-base">
                    <MessageCircle className="h-5 w-5" />
                    Negotiate with AI
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  <span>
                    AI will negotiate the best price on your behalf
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
