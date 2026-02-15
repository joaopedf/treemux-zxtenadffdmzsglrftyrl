"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star } from "lucide-react";
import { Listing } from "@/lib/types";

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

export function ListingCard({ listing, index = 0 }: { listing: Listing; index?: number }) {
  const savings = listing.originalPrice
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : null;

  return (
    <Link href={`/listing/${listing.id}`}>
      <article
        className={`group relative overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 opacity-0 animate-fade-up stagger-${Math.min(index + 1, 6)}`}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {savings && savings > 20 && (
            <div className="absolute left-3 top-3">
              <Badge className="bg-primary/90 text-primary-foreground border-0 font-bold text-xs backdrop-blur-sm">
                {savings}% off
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="p-3.5">
          <div className="mb-1.5 flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
          </div>

          <div className="mb-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">${listing.price}</span>
            {listing.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${listing.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {listing.distance || listing.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo(listing.createdAt)}
            </span>
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[9px] font-bold">
                {listing.seller.name.charAt(0)}
              </div>
              <span className="text-xs text-muted-foreground">{listing.seller.name.split(" ")[0]}</span>
              {listing.seller.verified && (
                <Star className="h-3 w-3 fill-primary text-primary" />
              )}
            </div>
            <Badge variant="secondary" className="text-[10px] font-medium px-1.5 py-0">
              {listing.condition}
            </Badge>
          </div>
        </div>
      </article>
    </Link>
  );
}
