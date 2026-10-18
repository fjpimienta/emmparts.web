import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/catalog/product-card";
import { brands, categories, searchProducts } from "@/lib/catalog";

type CatalogSearch = {
  q?: string;
  marca?: string;
  cat?: string;
};

export const Route = createFileRoute("/catalogo/")({
  validateSearch: (s: Record<string, unknown>): CatalogSearch => ({
    q: typeof s.q === "string" ? s.q : undefined,
    marca: typeof s.marca === "string" ? s.marca : undefined,
    cat: typeof s.cat === "string" ? s.cat : undefined,
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const { q, marca, cat } = Route.useSearch();
  const navigate = Route.useNavigate();
  const list = searchProducts({ q, brand: marca, category: cat });

  function setFilter(patch: CatalogSearch) {
    void navigate({
      search: {
        q: patch.q !== undefined ? patch.q || undefined : q,
        marca: patch.marca !== undefined ? patch.marca || undefined : marca,
        cat: patch.cat !== undefined ? patch.cat || undefined : cat,
      },
    });
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Catálogo</p>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">
        Refacciones por número de parte
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Líneas de mayor salida. El precio se confirma al cotizar.
      </p>

      <div className="mt-8 flex flex-col gap-3 md:flex-row">
        <input
          value={q ?? ""}
          onChange={(e) => setFilter({ q: e.target.value })}
          placeholder="Buscar SKU, modelo o nombre"
          className="h-11 flex-1 rounded-sm border border-border bg-surface px-3 text-sm outline-none placeholder:text-muted focus:border-primary"
        />
        <select
          value={marca ?? "all"}
          onChange={(e) => setFilter({ marca: e.target.value === "all" ? "" : e.target.value })}
          className="h-11 rounded-sm border border-border bg-surface px-3 text-sm outline-none"
        >
          <option value="all">Todas las marcas</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select
          value={cat ?? "all"}
          onChange={(e) => setFilter({ cat: e.target.value === "all" ? "" : e.target.value })}
          className="h-11 rounded-sm border border-border bg-surface px-3 text-sm outline-none"
        >
          <option value="all">Todos los sistemas</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-6 text-xs uppercase tracking-wider text-muted">{list.length} piezas</p>
      {list.length === 0 ? (
        <p className="mt-10 text-sm text-muted">
          Sin coincidencias. Pruebe el número de parte o solicite una cotización.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
