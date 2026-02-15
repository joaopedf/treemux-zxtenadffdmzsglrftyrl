"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Search, MessageCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight">haggle</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-foreground",
                pathname === "/" && "text-foreground bg-secondary"
              )}
            >
              <Search className="mr-1.5 h-3.5 w-3.5" />
              Browse
            </Button>
          </Link>
          <Link href="/sell">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-foreground",
                pathname === "/sell" && "text-foreground bg-secondary"
              )}
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Sell
            </Button>
          </Link>
          <Link href="/chat">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-foreground",
                pathname?.startsWith("/chat") && "text-foreground bg-secondary"
              )}
            >
              <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
              Negotiations
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/sell">
            <Button size="sm" className="hidden sm:flex gap-1.5 font-semibold">
              <Plus className="h-4 w-4" />
              List Item
            </Button>
          </Link>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            J
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="flex items-center justify-around border-t border-border/40 py-2 md:hidden">
        <Link href="/">
          <Button variant="ghost" size="sm" className={cn("flex-col gap-0.5 h-auto py-1.5", pathname === "/" && "text-primary")}>
            <Search className="h-4 w-4" />
            <span className="text-[10px]">Browse</span>
          </Button>
        </Link>
        <Link href="/sell">
          <Button variant="ghost" size="sm" className={cn("flex-col gap-0.5 h-auto py-1.5", pathname === "/sell" && "text-primary")}>
            <Plus className="h-4 w-4" />
            <span className="text-[10px]">Sell</span>
          </Button>
        </Link>
        <Link href="/chat">
          <Button variant="ghost" size="sm" className={cn("flex-col gap-0.5 h-auto py-1.5", pathname?.startsWith("/chat") && "text-primary")}>
            <MessageCircle className="h-4 w-4" />
            <span className="text-[10px]">Chats</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
