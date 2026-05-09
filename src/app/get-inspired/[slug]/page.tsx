"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { use, useState } from "react";
import { getLookBySlug } from "@/data/looks";
import { products } from "@/data/products";
import type { Product, ProductColor } from "@/types";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";

const APPAREL_SIZE_LABELS: Record<number, string> = { 1: "XS", 2: "S", 3: "M", 4: "L" };

export default function LookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const look = getLookBySlug(slug);

  if (!look) notFound();

  const lookProducts = look.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: look image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-warm-gray/10 sticky top-20">
          <Image
            src={look.image}
            alt={`Look by ${look.instagramHandle}`}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white font-medium">{look.instagramHandle}</p>
          </div>
        </div>

        {/* Right: products */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1">Get The Look</h1>
          <p className="text-sm text-warm-gray mb-8">
            {lookProducts.length} items from this look — add them to your cart.
          </p>

          <div className="space-y-6">
            {lookProducts.map((product) => (
              <LookProductRow key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function LookProductRow({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [error, setError] = useState(false);

  const isApparel = product.productCategory === "apparel";

  function handleAddToCart() {
    if (!selectedSize) {
      setError(true);
      return;
    }
    setError(false);
    addItem(product, selectedColor, selectedSize);
  }

  return (
    <div className="flex gap-4 border border-black/8 p-4">
      {/* Product image */}
      <div className="relative w-24 h-28 flex-shrink-0 overflow-hidden bg-warm-gray/10">
        <Image
          src={selectedColor.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info + controls */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium uppercase tracking-[0.5px] truncate">{product.name}</p>
        <p className="text-[12px] text-warm-gray mb-3">{product.price} zl</p>

        {/* Color selector */}
        <div className="flex gap-1.5 mb-3">
          {product.colors.map((color) => (
            <button
              key={color.hex}
              aria-label={color.name}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "w-4 h-4 rounded-full border-2 transition-all",
                selectedColor.hex === color.hex ? "border-charcoal scale-110" : "border-transparent"
              )}
              style={{ backgroundColor: color.hex, outline: "1px solid rgba(0,0,0,0.15)" }}
            />
          ))}
        </div>

        {/* Size selector */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => { setSelectedSize(size); setError(false); }}
              className={cn(
                "text-[11px] px-2 py-1 border transition-colors",
                selectedSize === size
                  ? "bg-charcoal text-white border-charcoal"
                  : "border-black/20 hover:border-charcoal"
              )}
            >
              {isApparel ? (APPAREL_SIZE_LABELS[size] ?? size) : size}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-[11px] text-red-500 mb-2">Please select a size</p>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full bg-charcoal text-white text-[11px] font-medium uppercase tracking-wider py-2 hover:bg-charcoal/80 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
