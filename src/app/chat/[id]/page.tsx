"use client";

import { useParams, useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getListingById } from "@/lib/data";
import {
  ArrowLeft,
  Send,
  Zap,
  DollarSign,
  TrendingDown,
  Shield,
  MapPin,
  Sparkles,
  Bot,
  User,
} from "lucide-react";

const quickActions = [
  { label: "What's a fair price?", icon: DollarSign },
  { label: "I'd like to offer $PRICE", icon: TrendingDown },
  { label: "Is the price negotiable?", icon: Sparkles },
  { label: "Can I pick up today?", icon: MapPin },
];

export default function NegotiationChat() {
  const params = useParams();
  const router = useRouter();
  const listing = getListingById(params.id as string);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const listingBody = listing
    ? {
        title: listing.title,
        price: listing.price,
        originalPrice: listing.originalPrice,
        condition: listing.condition,
        description: listing.description,
        seller: {
          name: listing.seller.name,
          rating: listing.seller.rating,
        },
      }
    : {};

  const transport = useMemo(
    () =>
      new TextStreamChatTransport({
        api: "/api/chat",
        body: { listing: listingBody },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.id]
  );

  const { messages, sendMessage, status } = useChat({
    transport,
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

  const handleQuickAction = (action: string) => {
    const processed = action.replace(
      "$PRICE",
      String(Math.round(listing.price * 0.8))
    );
    setHasStarted(true);
    sendMessage({ text: processed });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setHasStarted(true);
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  const savings = listing.originalPrice
    ? Math.round(
        ((listing.originalPrice - listing.price) / listing.originalPrice) * 100
      )
    : null;

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Compact Header */}
      <div className="border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-3 px-4">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 text-muted-foreground"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="h-10 w-10 rounded-lg overflow-hidden bg-muted shrink-0">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold truncate">{listing.title}</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-bold text-primary">${listing.price}</span>
              {listing.originalPrice && (
                <span className="line-through">${listing.originalPrice}</span>
              )}
              <span>&middot;</span>
              <span>{listing.seller.name}</span>
            </div>
          </div>

          {savings && savings > 15 && (
            <Badge
              variant="secondary"
              className="text-xs shrink-0 text-primary font-semibold"
            >
              {savings}% below retail
            </Badge>
          )}
        </div>
      </div>

      {/* Price tracker bar */}
      {hasStarted && (
        <div className="border-b border-border/40 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
          <div className="mx-auto max-w-3xl px-4 py-2.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-muted-foreground">Listed:</span>{" "}
                  <span className="font-bold">${listing.price}</span>
                </div>
                {listing.originalPrice && (
                  <div>
                    <span className="text-muted-foreground">Retail:</span>{" "}
                    <span className="font-medium text-muted-foreground line-through">
                      ${listing.originalPrice}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-20 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${Math.min(100, (messages.length / 8) * 100)}%` }}
                  />
                </div>
                <span className="text-muted-foreground">
                  {messages.length < 4
                    ? "Opening"
                    : messages.length < 8
                    ? "Negotiating"
                    : "Closing"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="mx-auto max-w-3xl px-4 py-6">
            {/* Welcome state */}
            {!hasStarted && messages.length === 0 && (
              <div className="animate-fade-up">
                <Card className="p-6 mb-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold mb-1">
                        AI Negotiation Agent
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        I&apos;ll help you negotiate the best price for the{" "}
                        <strong>{listing.title}</strong>. Tell me your budget or
                        ask me anything about this item. I&apos;ll communicate
                        with the seller&apos;s agent on your behalf.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Item summary */}
                <Card className="p-4 mb-6">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 rounded-xl overflow-hidden bg-muted shrink-0">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">
                        {listing.title}
                      </h4>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-lg font-bold text-primary">
                          ${listing.price}
                        </span>
                        {listing.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ${listing.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-[10px]">
                          {listing.condition}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          {listing.seller.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Quick actions */}
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map(({ label, icon: Icon }) => (
                    <Button
                      key={label}
                      variant="secondary"
                      className="h-auto py-3 px-4 text-left justify-start gap-2 text-xs font-medium rounded-xl"
                      onClick={() => handleQuickAction(label)}
                    >
                      <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">
                        {label.replace(
                          "$PRICE",
                          String(Math.round(listing.price * 0.8))
                        )}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 mb-4 animate-fade-up ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0 mt-0.5">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary rounded-bl-md"
                  }`}
                >
                  {message.parts?.map((part, i) => {
                    if (part.type === "text") return <span key={i}>{part.text}</span>;
                    return null;
                  })}
                </div>
                {message.role === "user" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary shrink-0 mt-0.5">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3 mb-4 animate-fade-up">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-2xl rounded-bl-md bg-secondary px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary typing-dot" />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary typing-dot" />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary typing-dot" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="border-t border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <form onSubmit={onSubmit} className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message or make an offer..."
              className="flex-1 rounded-xl border-border/60 h-11 text-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="sm"
              disabled={isLoading || !inputValue.trim()}
              className="h-11 w-11 rounded-xl p-0 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-muted-foreground/60">
            <Zap className="h-2.5 w-2.5" />
            Powered by AI negotiation
          </div>
        </div>
      </div>
    </div>
  );
}
