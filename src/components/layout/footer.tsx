import { Link } from "@tanstack/react-router";
import { company } from "@/lib/company";
import { brands, categories } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold tracking-[0.14em]">{company.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {company.legal}. Refacciones para construcción y agricultura en el sureste.
          </p>
          <a
            href={company.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-muted hover:text-primary"
          >
            Instagram {company.instagramHandle}
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Catálogo</p>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link
                  to="/catalogo"
                  search={{ cat: c.id, marca: undefined, q: undefined }}
                  className="text-muted hover:text-fg"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Marcas</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {brands.slice(0, 6).map((b) => (
              <li key={b}>
                <Link
                  to="/catalogo"
                  search={{ marca: b, cat: undefined, q: undefined }}
                  className="hover:text-fg"
                >
                  {b}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contacto</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>{company.address}</li>
            <li>{company.postal}</li>
            <li>
              <a href={`tel:+${company.phoneE164}`} className="hover:text-fg">
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-fg">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {company.legal}</span>
          <span>Precios a cotizar. Confirme existencias y flete.</span>
        </div>
      </div>
    </footer>
  );
}
