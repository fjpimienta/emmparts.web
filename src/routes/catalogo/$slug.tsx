import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categoryLabel, getProduct, products } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { waLink, waQuoteMessage } from "@/lib/whatsapp";
import { ProductCard } from "@/components/catalog/product-card";

export const Route = createFileRoute("/catalogo/$slug")({
  component: ProductPage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="font-display text-3xl font-bold uppercase">Pieza no encontrada</h1>
      <Link to="/catalogo" className="mt-4 inline-block text-sm text-primary">
        Volver al catálogo
      </Link>
    </main>
  ),
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  const add = useCart((s) => s.add);

  if (!product) throw notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);
  const out = product.stock === "out";
  const quote = waQuoteMessage([
    `• ${product.name}`,
    `  SKU ${product.sku} · ${product.brand}`,
    `  Modelos: ${product.models.join(", ")}`,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs text-muted">
        <Link to="/catalogo" className="hover:text-primary">
          Catálogo
        </Link>{" "}
        / {product.brand}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-sm border border-border bg-surface-2">
          <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {product.brand}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase">{product.name}</h1>
          <p className="mt-3 font-mono text-sm text-muted">{product.sku}</p>
          <p className="mt-6 font-display text-3xl tabular-nums text-primary">
            {product.price == null ? "Precio a cotizar" : formatPrice(product.price)}
          </p>
          <p className="mt-2 text-sm text-muted">
            {out ? "Agotado en vitrina — pregunte reposición." : "Disponible. Confirme existencias al cotizar."}
          </p>

          <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-muted">Sistema</dt>
              <dd>{categoryLabel(product.category)}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-muted">Aplicación</dt>
              <dd className="text-right">{product.models.join(", ")}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-muted">Origen</dt>
              <dd>{product.oem ? "OEM" : product.origin ?? "Equivalente / línea"}</dd>
            </div>
            {product.note ? (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Notas</dt>
                <dd className="max-w-xs text-right">{product.note}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={out}
              onClick={() => add(product.slug)}
              className="h-12 rounded-sm bg-primary px-6 text-sm font-semibold text-primary-fg disabled:opacity-40"
            >
              Agregar a cotización
            </button>
            <a
              href={waLink(quote)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-border px-6 text-sm hover:border-primary"
            >
              WhatsApp
            </a>
          </div>
          <Link to="/cotizar" className="mt-4 inline-block text-xs text-muted hover:text-primary">
            Pedir esta línea por cotización →
          </Link>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-3xl font-bold uppercase">Relacionadas</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
