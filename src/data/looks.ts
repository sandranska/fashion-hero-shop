export interface Look {
  id: string;
  slug: string;
  instagramHandle: string;
  image: string;
  productIds: string[];
}

export const looks: Look[] = [
  {
    id: "l1",
    slug: "urban-dark-fit",
    instagramHandle: "@karolina.edits",
    image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&h=800&fit=crop&q=80",
    productIds: ["1", "36", "37"],
  },
  {
    id: "l2",
    slug: "trail-ready-look",
    instagramHandle: "@bartek.outdoor",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=600&h=800&fit=crop&q=80",
    productIds: ["3", "39", "27"],
  },
  {
    id: "l3",
    slug: "street-sport-vibes",
    instagramHandle: "@marta.streetstyle",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80",
    productIds: ["9", "25", "37"],
  },
  {
    id: "l4",
    slug: "clean-minimal-set",
    instagramHandle: "@ania.minimalist",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop&q=80",
    productIds: ["35", "36", "27"],
  },
  {
    id: "l5",
    slug: "city-runner-look",
    instagramHandle: "@piotrek.moves",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&q=80",
    productIds: ["38", "25", "29"],
  },
  {
    id: "l6",
    slug: "utility-earth-tones",
    instagramHandle: "@zosia.fits",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop&q=80",
    productIds: ["39", "3", "40"],
  },
];

export function getLookBySlug(slug: string): Look | undefined {
  return looks.find((l) => l.slug === slug);
}
