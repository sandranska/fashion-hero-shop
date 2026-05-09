"use client";

import Image from "next/image";
import Link from "next/link";
import { looks } from "@/data/looks";
import { useWishlist } from "@/components/wishlist-provider";
import { HeartIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export default function GetInspiredPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Get Inspired</h1>
        <p className="text-sm text-warm-gray">
          Real looks, real style. Save the ones you love — shop the pieces.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {looks.map((look) => (
          <LookCard key={look.id} look={look} />
        ))}
      </div>
    </main>
  );
}

function LookCard({ look }: { look: (typeof looks)[number] }) {
  const { toggleWishlist, isWishlisted } = useWishlist();

  const allWishlisted = look.productIds.every((id) => isWishlisted(id));

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    look.productIds.forEach((id) => {
      if (!allWishlisted || isWishlisted(id)) {
        toggleWishlist(id);
      }
    });
  }

  return (
    <Link href={`/get-inspired/${look.slug}`} className="group relative block overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden bg-warm-gray/10">
        <Image
          src={look.image}
          alt={`Look by ${look.instagramHandle}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Wishlist heart */}
        <button
          onClick={handleWishlist}
          aria-label="Save look to wishlist"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
        >
          <HeartIcon
            className={cn(
              "h-5 w-5 transition-colors",
              allWishlisted ? "text-red-500 fill-red-500" : "text-white"
            )}
          />
        </button>

        {/* Instagram handle */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white text-sm font-medium">{look.instagramHandle}</p>
          <p className="text-white/70 text-xs mt-0.5">{look.productIds.length} items</p>
        </div>
      </div>
    </Link>
  );
}
