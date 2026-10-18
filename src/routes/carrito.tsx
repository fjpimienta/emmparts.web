import { createFileRoute, Link } from "@tanstack/react-router";
import { cartItems, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { waLink, waQuoteMessage } from "@/lib/whatsapp";

export const Route = createFileRoute("/carrito")({ component: CartPage });

function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const items = cartItems(lines);
  const total = items.reduce(
    (n, i) => n + (i.product.price ?? 0) * i.qty,
    0,
  );
  const quote = waQuoteMessage(
    items.map(
      (i) =>
        `• ${i.qty} × ${i.product.name} (${i.product.sku}) ${i.product.price != null ? formatPrice(i.product.price) : "cotizar"}`,
    ),
  );

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Cotización</p>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase">Su lista</h1>
      <p className="mt-3 text-sm text-muted">
        El carrito arma la cotización. El pedido se confirma por WhatsApp con existencias y flete.
      </p>

      {items.length === 0 ? (
        <div className="mt-12 rounded-sm border border-border bg-surface p-8 text-center">
          <p className="text-sm text-muted">Aún no hay piezas en la lista.</p>
          <Link
            to="/catalogo"
            className="mt-6 inline-flex h-11 items-center rounded-sm bg-primary px-5 text-sm font-semibold text-primary-fg"
          >
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map(({ product, qty }) => (
            <div
              key={product.slug}
              className="flex flex-col gap-4 rounded-sm border border-border bg-surface p-4 sm:flex-row sm:items-center"
            >
              <img
                src={product.image}
                alt=""
                className="h-24 w-24 shrink-0 rounded-sm object-cover"
              />
              <div className="min-w-0 flex-1">
                <Link
                  to="/catalogo/$slug"
                  params={{ slug: product.slug }}
                  className="font-display text-lg font-semibold uppercase hover:text-primary"
                >
                  {product.name}
                </Link>
                <p className="font-mono text-xs text-muted">{product.sku}</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(product.slug, Number(e.target.value))}
                  className="h-10 w-16 rounded-sm border border-border bg-bg px-2 text-sm tabular-nums"
                />
                <p className="w-28 text-right text-sm tabular-nums">
                  {product.price == null ? "—" : formatPrice(product.price * qty)}
                </p>
                <button
                  type="button"
                  onClick={() => remove(product.slug)}
                  className="text-xs text-muted hover:text-danger"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-border pt-6">
            <span className="text-sm text-muted">Referencia (sin flete)</span>
            <span className="font-display text-2xl tabular-nums text-primary">
              {formatPrice(total)}
            </span>
          </div>
          <a
            href={waLink(quote)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center rounded-sm bg-primary px-6 text-sm font-semibold text-primary-fg"
          >
            Enviar cotización por WhatsApp
          </a>
        </div>
      )}
    </main>
  );
}
