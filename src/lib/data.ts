import { Listing, Seller } from "./types";

const sellers: Seller[] = [
  {
    id: "s1",
    name: "Maya Chen",
    avatar: "",
    rating: 4.9,
    responseTime: "< 1 hour",
    verified: true,
  },
  {
    id: "s2",
    name: "Jordan Rivera",
    avatar: "",
    rating: 4.7,
    responseTime: "< 30 min",
    verified: true,
  },
  {
    id: "s3",
    name: "Alex Kim",
    avatar: "",
    rating: 4.8,
    responseTime: "< 2 hours",
    verified: false,
  },
  {
    id: "s4",
    name: "Sam Patel",
    avatar: "",
    rating: 4.6,
    responseTime: "< 1 hour",
    verified: true,
  },
  {
    id: "s5",
    name: "Riley O'Connor",
    avatar: "",
    rating: 5.0,
    responseTime: "< 15 min",
    verified: true,
  },
  {
    id: "s6",
    name: "Taylor Brooks",
    avatar: "",
    rating: 4.4,
    responseTime: "< 3 hours",
    verified: false,
  },
];

export const listings: Listing[] = [
  {
    id: "1",
    title: "Herman Miller Aeron Chair — Size B",
    description:
      "Lightly used Herman Miller Aeron, size B. All adjustments work perfectly. Slight wear on armrests but the mesh is pristine. Originally $1,400 from the Stanford bookstore. Selling because I'm graduating and moving cross-country.",
    price: 480,
    originalPrice: 1400,
    category: "Furniture",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1589364256195-1d14c44e1052?w=600&h=400&fit=crop",
    ],
    seller: sellers[0],
    location: "Palo Alto, CA",
    distance: "0.8 mi",
    createdAt: "2026-02-14T10:30:00Z",
    tags: ["office", "ergonomic", "premium", "chair"],
  },
  {
    id: "2",
    title: 'MacBook Pro 16" M3 Max — 36GB RAM',
    description:
      "2024 MacBook Pro 16-inch, M3 Max chip, 36GB unified memory, 1TB SSD. Space Black. AppleCare+ until March 2027. Includes original box, charger, and a Twelve South stand. Battery cycle count: 47. Selling to upgrade to M5.",
    price: 2200,
    originalPrice: 3499,
    category: "Electronics",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
    ],
    seller: sellers[1],
    location: "Mountain View, CA",
    distance: "3.2 mi",
    createdAt: "2026-02-13T15:00:00Z",
    tags: ["laptop", "apple", "M3", "developer"],
  },
  {
    id: "3",
    title: "Vintage Fender Stratocaster — 1997 MIM",
    description:
      "Made in Mexico Fender Stratocaster from 1997. Sunburst finish with rosewood fretboard. Plays beautifully with low action. Some belt rash on the back but the front is clean. Comes with a hardshell case and new strings.",
    price: 650,
    category: "Music",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=600&h=400&fit=crop",
    ],
    seller: sellers[2],
    location: "San Jose, CA",
    distance: "12 mi",
    createdAt: "2026-02-12T09:00:00Z",
    tags: ["guitar", "fender", "vintage", "music"],
  },
  {
    id: "4",
    title: "Trek Domane SL5 Road Bike — 56cm",
    description:
      "2024 Trek Domane SL5, Shimano 105 Di2 groupset, carbon frame, size 56cm. Under 500 miles. Includes Garmin mount, bottle cages, and spare tube kit. Perfect for long rides around the Bay. No crashes, no scratches.",
    price: 2800,
    originalPrice: 4200,
    category: "Sports",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=400&fit=crop",
    ],
    seller: sellers[3],
    location: "Stanford, CA",
    distance: "0.3 mi",
    createdAt: "2026-02-14T08:00:00Z",
    tags: ["bike", "carbon", "road", "cycling"],
  },
  {
    id: "5",
    title: "Sony A7 IV Mirrorless Camera + 24-70mm f/2.8",
    description:
      "Sony A7 IV body with Tamron 28-75mm f/2.8 Di III lens. 12,000 shutter actuations. Includes two batteries, SD card, and a Peak Design camera strap. Screen protector applied since day one. Downsizing my kit.",
    price: 1900,
    originalPrice: 2900,
    category: "Electronics",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
    ],
    seller: sellers[4],
    location: "Menlo Park, CA",
    distance: "1.5 mi",
    createdAt: "2026-02-11T14:00:00Z",
    tags: ["camera", "sony", "photography", "mirrorless"],
  },
  {
    id: "6",
    title: "IKEA Kallax Shelf Unit 4x4 — White",
    description:
      "IKEA Kallax 4x4 cube shelf in white. In great condition, very minor scuffs. Includes 4 Drona fabric boxes. Disassembled and ready for pickup. Perfect for dorm or apartment. Originally $180 with inserts.",
    price: 55,
    originalPrice: 180,
    category: "Furniture",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=400&fit=crop",
    ],
    seller: sellers[5],
    location: "Sunnyvale, CA",
    distance: "5.1 mi",
    createdAt: "2026-02-14T12:00:00Z",
    tags: ["shelf", "storage", "ikea", "dorm"],
  },
  {
    id: "7",
    title: "Nintendo Switch OLED — White, w/ 6 Games",
    description:
      "Nintendo Switch OLED model in white. Includes dock, Joy-Cons, and 6 physical games: Zelda TOTK, Mario Odyssey, Smash Bros, Mario Kart, Animal Crossing, and Splatoon 3. Screen protector installed. All original accessories included.",
    price: 320,
    originalPrice: 550,
    category: "Electronics",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600&h=400&fit=crop",
    ],
    seller: sellers[0],
    location: "Palo Alto, CA",
    distance: "0.9 mi",
    createdAt: "2026-02-13T11:00:00Z",
    tags: ["gaming", "nintendo", "switch", "console"],
  },
  {
    id: "8",
    title: "Mid-Century Modern Coffee Table — Walnut",
    description:
      "Solid walnut mid-century modern coffee table. Handmade by a local woodworker. 48\"L x 24\"W x 16\"H. Beautiful grain pattern with a matte finish. Minor ring mark on one corner (shown in photos). Very sturdy.",
    price: 275,
    category: "Furniture",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&h=400&fit=crop",
    ],
    seller: sellers[3],
    location: "Stanford, CA",
    distance: "0.5 mi",
    createdAt: "2026-02-10T16:00:00Z",
    tags: ["table", "walnut", "mid-century", "handmade"],
  },
  {
    id: "9",
    title: "Bose QuietComfort Ultra Headphones",
    description:
      "Bose QC Ultra over-ear headphones in Black. Outstanding noise cancellation. Includes case, USB-C cable, and aux cable. Battery still lasts 20+ hours. Selling because I got AirPods Max as a gift.",
    price: 230,
    originalPrice: 430,
    category: "Electronics",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
    ],
    seller: sellers[2],
    location: "Santa Clara, CA",
    distance: "8 mi",
    createdAt: "2026-02-14T07:00:00Z",
    tags: ["headphones", "bose", "noise-cancelling", "audio"],
  },
  {
    id: "10",
    title: "Patagonia Better Sweater — Men's L, Navy",
    description:
      "Patagonia Better Sweater fleece jacket, men's size Large in New Navy. Worn maybe 5 times. No pilling, no stains. Just doesn't fit my style anymore. Still has that soft fleece feel.",
    price: 65,
    originalPrice: 139,
    category: "Clothing",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop",
    ],
    seller: sellers[4],
    location: "Menlo Park, CA",
    distance: "1.8 mi",
    createdAt: "2026-02-13T09:00:00Z",
    tags: ["jacket", "patagonia", "fleece", "outdoor"],
  },
  {
    id: "11",
    title: "Standing Desk — Electric, 60\" x 30\"",
    description:
      "Electric standing desk with programmable height presets. 60\" x 30\" bamboo top. Goes from 25\" to 50\" height. Dual motor, very stable. Includes cable management tray. Minor scratch on bottom (not visible when standing). Moving and can't bring it.",
    price: 340,
    originalPrice: 600,
    category: "Furniture",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=400&fit=crop",
    ],
    seller: sellers[1],
    location: "Mountain View, CA",
    distance: "4 mi",
    createdAt: "2026-02-12T13:00:00Z",
    tags: ["desk", "standing", "electric", "office"],
  },
  {
    id: "12",
    title: "Dyson V15 Detect Vacuum",
    description:
      "Dyson V15 Detect cordless vacuum. Laser dust detection head, LCD screen showing particle counts. All attachments included. Battery holds about 50 minutes on low. Bought in 2024, works perfectly.",
    price: 380,
    originalPrice: 750,
    category: "Home",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    ],
    seller: sellers[5],
    location: "Cupertino, CA",
    distance: "10 mi",
    createdAt: "2026-02-14T14:00:00Z",
    tags: ["vacuum", "dyson", "cordless", "cleaning"],
  },
];

export const categories = [
  "All",
  "Electronics",
  "Furniture",
  "Clothing",
  "Sports",
  "Music",
  "Home",
  "Books",
  "Automotive",
  "Free",
];

export function getListingById(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export function searchListings(query: string, filters?: { category?: string; minPrice?: number; maxPrice?: number; condition?: string; sortBy?: string }): Listing[] {
  let results = [...listings];

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.tags.some((t) => t.toLowerCase().includes(q)) ||
        l.category.toLowerCase().includes(q)
    );
  }

  if (filters?.category && filters.category !== "All") {
    results = results.filter((l) => l.category === filters.category);
  }

  if (filters?.minPrice !== undefined) {
    results = results.filter((l) => l.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    results = results.filter((l) => l.price <= filters.maxPrice!);
  }

  if (filters?.condition) {
    results = results.filter((l) => l.condition === filters.condition);
  }

  if (filters?.sortBy === "price-low") {
    results.sort((a, b) => a.price - b.price);
  } else if (filters?.sortBy === "price-high") {
    results.sort((a, b) => b.price - a.price);
  } else if (filters?.sortBy === "newest") {
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return results;
}
