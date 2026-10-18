import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { company } from "@/lib/company";
import { cartCount, useCart } from "@/lib/cart";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/catalogo", label: "Catálogo" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/cotizar", label: "Cotizar" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const count = useCart((s) => cartCount(s.lines));

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    void navigate({ to: "/catalogo", search: { q: query || undefined, marca: undefined, cat: undefined } });
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/92 backdrop-blur-md">
      <div className="hidden border-b border-border bg-surface text-muted md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-xs tracking-wide">
          <span>
            {company.city} · {company.hours}
          </span>
          <a href={`tel:+${company.phoneE164}`} className="text-fg hover:text-primary">
            {company.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl font-bold tracking-[0.14em] text-fg">
            {company.name}
          </span>
          <span className="mt-0.5 block text-[0.65rem] uppercase tracking-[0.22em] text-primary">
            Del Sureste
          </span>
        </Link>

        <form onSubmit={onSearch} className="relative hidden min-w-0 flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Número de parte, modelo o marca"
            className="h-11 w-full rounded-sm border border-border bg-surface pl-10 pr-4 text-sm text-fg outline-none placeholder:text-muted focus:border-primary"
          />
        </form>

        <nav className="hidden items-center gap-5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted transition-colors hover:text-fg"
              activeProps={{ className: "text-fg" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <a
            href={waLink(`Hola ${company.name}, necesito una cotización.`)}
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 items-center rounded-sm bg-primary px-4 text-sm font-semibold text-primary-fg sm:inline-flex"
          >
            WhatsApp
          </a>
          <Link
            to="/carrito"
            className="relative inline-flex size-11 items-center justify-center rounded-sm border border-border text-fg hover:border-primary"
            aria-label="Carrito"
          >
            <ShoppingBag className="size-5" />
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-semibold text-primary-fg">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-sm border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div className={cn("border-t border-border bg-surface lg:hidden", open ? "block" : "hidden")}>
        <form onSubmit={onSearch} className="relative px-4 pt-3 md:hidden">
          <Search className="pointer-events-none absolute top-6 left-7 size-4 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar número de parte"
            className="h-11 w-full rounded-sm border border-border bg-bg pl-10 pr-3 text-sm outline-none placeholder:text-muted"
          />
        </form>
        <nav className="flex flex-col px-2 py-2">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-3 text-sm text-fg"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
