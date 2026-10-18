import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search, ShieldCheck, Truck, Wrench } from "lucide-react";
import { ProductCard } from "@/components/catalog/product-card";
import { brands, categories, featuredProducts } from "@/lib/catalog";
import { company } from "@/lib/company";
import { waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    void navigate({
      to: "/catalogo",
      search: { q: q.trim() || undefined, marca: undefined, cat: undefined },
    });
  }

  return (
    <main>
      <section className="relative min-h-[78vh] overflow-hidden">
        <img
          src="/images/hero-backhoe.jpg"
          alt="Retroexcavadora en obra"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/20" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 py-16 md:justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            Tabasco · Mérida · Campeche
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-bold uppercase leading-[0.95] md:text-7xl">
            La máquina no espera.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-fg/85 md:text-lg">
            Refacciones para construcción y agricultura. Motor, tren de rodaje, hidráulico,
            herramienta de corte y lubricantes. CTP, Maxiforce, KMP, Hercules, ITR y más.
          </p>
          <form onSubmit={onSearch} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Busca por número de parte"
                className="h-12 w-full rounded-sm border border-border bg-bg/80 pl-10 pr-3 text-sm outline-none placeholder:text-muted focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="h-12 rounded-sm bg-primary px-6 text-sm font-semibold text-primary-fg"
            >
              Buscar
            </button>
          </form>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/catalogo"
              className="inline-flex h-11 items-center gap-2 rounded-sm border border-border px-4 text-sm hover:border-primary"
            >
              Ver catálogo <ArrowRight className="size-4" />
            </Link>
            <a
              href={waLink(`Hola ${company.name}, necesito una cotización urgente.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center rounded-sm px-4 text-sm text-muted hover:text-fg"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5">
          {brands.map((b) => (
            <Link
              key={b}
              to="/catalogo"
              search={{ marca: b, cat: undefined, q: undefined }}
              className="font-display text-lg font-semibold tracking-wider text-muted transition-colors hover:text-primary"
            >
              {b}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Inventario
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase">Por sistema</h2>
          </div>
          <Link to="/catalogo" className="hidden text-sm text-muted hover:text-primary sm:block">
            Todo el catálogo
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/catalogo"
              search={{ cat: c.id, marca: undefined, q: undefined }}
              className="rounded-sm border border-border bg-surface px-4 py-5 transition-colors hover:border-primary"
            >
              <p className="font-display text-xl font-semibold uppercase">{c.label}</p>
              <p className="mt-1 text-xs text-muted">Filtrar catálogo</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Destacados
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase">Piezas de alta rotación</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.slice(0, 8).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <img
            src="/images/warehouse.jpg"
            alt="Almacén de refacciones"
            className="h-full min-h-72 w-full object-cover"
          />
          <div className="flex flex-col justify-center px-6 py-12 md:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Operación
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase">
              Número de parte. Respuesta el mismo día.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Trabajamos con OEM y equivalentes certificados. Envíe el número de parte, el modelo
              de máquina y la plaza. Cotizamos por WhatsApp y despachamos a toda la República.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: ShieldCheck, t: "Marcas de línea", d: "CTP, Maxiforce, KMP, Hercules, ITR, Bucyrus, LUBER y GONHER." },
                { icon: Wrench, t: "Lo que más sale", d: "Motor, puntas, cuchillas, turbos, sellos y tren de rodaje." },
                { icon: Truck, t: "Tres plazas", d: "Tabasco, Mérida y Campeche. Envío a obra." },
              ].map((item) => (
                <li key={item.t} className="flex gap-3">
                  <item.icon className="mt-0.5 size-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">{item.t}</p>
                    <p className="text-sm text-muted">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img
          src="/images/workshop.jpg"
          alt="Taller de maquinaria pesada"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-bg/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
          <h2 className="font-display text-4xl font-bold uppercase md:text-5xl">
            ¿No aparece su número de parte?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
            El inventario vivo es más amplio que esta vitrina. Mándenos foto de la placa o el OEM
            y le confirmamos existencia.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/cotizar"
              className="inline-flex h-12 items-center rounded-sm bg-primary px-6 text-sm font-semibold text-primary-fg"
            >
              Solicitar cotización
            </Link>
            <Link
              to="/contacto"
              className="inline-flex h-12 items-center rounded-sm border border-border px-6 text-sm hover:border-primary"
            >
              Sucursales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
