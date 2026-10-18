import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const out = product.stock === "out";
  return (
    <Link
      to="/catalogo/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-surface transition-colors hover:border-primary"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 bg-bg/80 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
          {product.brand}
        </span>
        {out ? (
          <span className="absolute right-2 top-2 bg-danger px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-fg">
            Agotado
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-mono text-xs text-muted">{product.sku}</p>
        <h3 className="font-display text-lg font-semibold leading-tight text-fg">
          {product.name}
        </h3>
        <p className="text-xs text-muted">{product.models.join(" · ")}</p>
        <p className={cn("mt-auto pt-2 text-sm font-medium tabular-nums", out ? "text-muted" : "text-primary")}>
          {product.price == null ? "Cotizar" : formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
