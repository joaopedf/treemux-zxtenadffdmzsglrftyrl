"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Camera,
  Sparkles,
  Loader2,
  Check,
  DollarSign,
  Tag,
  FileText,
  Zap,
  ArrowRight,
} from "lucide-react";

interface GeneratedListing {
  title: string;
  description: string;
  suggestedPrice: number;
  category: string;
  condition: string;
  tags: string[];
}

export default function SellPage() {
  const [step, setStep] = useState<"describe" | "generating" | "review" | "published">("describe");
  const [itemDescription, setItemDescription] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [generated, setGenerated] = useState<GeneratedListing | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const handleGenerate = async () => {
    if (!itemDescription.trim()) return;

    setStep("generating");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageDescription: itemDescription,
          userNotes: additionalNotes,
        }),
      });
      const data = await res.json();
      setGenerated(data);
      setEditedTitle(data.title);
      setEditedDescription(data.description);
      setEditedPrice(String(data.suggestedPrice));
      setStep("review");
    } catch {
      // Fallback
      const fallback: GeneratedListing = {
        title: `${itemDescription.slice(0, 50)}`,
        description: additionalNotes || "Great item in good condition.",
        suggestedPrice: 100,
        category: "Home",
        condition: "good",
        tags: ["for-sale"],
      };
      setGenerated(fallback);
      setEditedTitle(fallback.title);
      setEditedDescription(fallback.description);
      setEditedPrice(String(fallback.suggestedPrice));
      setStep("review");
    }
  };

  const handlePublish = () => {
    setStep("published");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Sell with{" "}
            <span
              className="italic text-primary"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              AI
            </span>
          </h1>
          <p className="text-muted-foreground">
            Describe your item and let AI create the perfect listing
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 flex items-center gap-2">
          {[
            { label: "Describe", active: step === "describe" || step === "generating", done: step === "review" || step === "published" },
            { label: "AI Generate", active: step === "generating", done: step === "review" || step === "published" },
            { label: "Review & List", active: step === "review", done: step === "published" },
          ].map(({ label, active, done }, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : active
                    ? "bg-primary/10 text-primary border-2 border-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  active || done ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {i < 2 && <div className="h-px flex-1 bg-border" />}
            </div>
          ))}
        </div>

        {/* Step 1: Describe */}
        {step === "describe" && (
          <div className="space-y-6 animate-fade-up">
            {/* Photo upload area */}
            <Card className="border-dashed border-2 border-border hover:border-primary/30 transition-colors">
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <Camera className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1">
                  Photo upload coming soon
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  For now, describe your item below and our AI will generate the
                  perfect listing
                </p>
              </div>
            </Card>

            <div>
              <label className="text-sm font-semibold mb-2 block">
                What are you selling?
              </label>
              <Textarea
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="e.g., Herman Miller Aeron chair, size B, bought 2 years ago from the Stanford bookstore. Lightly used, all adjustments work."
                className="min-h-[120px] text-sm resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">
                Additional notes{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </label>
              <Textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Why are you selling? Any flaws? Accessories included?"
                className="min-h-[80px] text-sm resize-none"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!itemDescription.trim()}
              className="w-full h-12 gap-2 font-semibold rounded-xl text-base"
            >
              <Sparkles className="h-5 w-5" />
              Generate Listing with AI
            </Button>
          </div>
        )}

        {/* Step 2: Generating */}
        {step === "generating" && (
          <div className="py-16 text-center animate-fade-up">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-6">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <h3 className="text-lg font-bold mb-2">
              Crafting your listing...
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              AI is analyzing your item, researching market prices, and writing a
              compelling description
            </p>
            <div className="mt-6 flex items-center justify-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-primary typing-dot" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary typing-dot" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary typing-dot" />
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === "review" && generated && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm text-primary font-medium">
                AI-generated listing — edit anything below
              </span>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                Title
              </label>
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-sm font-medium"
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                Description
              </label>
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="min-h-[100px] text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                    className="pl-7 text-sm font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                  Category
                </label>
                <Input
                  value={generated.category}
                  readOnly
                  className="text-sm bg-secondary"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {generated.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setStep("describe")}
                className="flex-1 rounded-xl"
              >
                Start Over
              </Button>
              <Button
                onClick={handlePublish}
                className="flex-[2] gap-2 font-semibold rounded-xl h-12"
              >
                <Zap className="h-4 w-4" />
                Publish Listing
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Published */}
        {step === "published" && (
          <div className="py-16 text-center animate-fade-up">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-6">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Listed!</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-8">
              Your listing is live. Our AI will help negotiate with interested
              buyers and notify you of offers.
            </p>
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <Button
                onClick={() => {
                  setStep("describe");
                  setItemDescription("");
                  setAdditionalNotes("");
                  setGenerated(null);
                }}
                className="gap-2 rounded-xl"
              >
                List Another Item
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                onClick={() => (window.location.href = "/")}
                className="rounded-xl"
              >
                Back to Browse
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
