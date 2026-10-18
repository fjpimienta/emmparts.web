import { createFileRoute, Link } from "@tanstack/react-router";
import { company } from "@/lib/company";

export const Route = createFileRoute("/nosotros")({ component: AboutPage });

function AboutPage() {
  return (
    <main>
      <section className="relative min-h-80 overflow-hidden">
        <img
          src="/images/workshop.jpg"
          alt="Taller EMM PARTS"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-bg/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {company.legal}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-5xl font-bold uppercase">
            Piezas que mantienen la obra en marcha.
          </h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2">
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            {company.legal} vende refacciones para maquinaria pesada en construcción y agricultura.
            Atendemos desde Tabasco, Mérida y Campeche a talleres, contratistas y flotillas que no
            pueden dejar el equipo parado.
          </p>
          <p>
            Las líneas de mayor salida son motor, puntas y adaptadores, cuchillas, cucharones,
            turbos, bombas de agua, válvulas, mangueras, sellos, aceites, cilindros y tren de
            rodaje. Trabajamos CTP, Maxiforce, KMP, Hercules, ITR, Bucyrus Blades, LUBER y GONHER,
            además de aplicación para Caterpillar, John Deere, JCB y Kubota.
          </p>
          <p>
            Esta vitrina muestra las familias que más se mueven. El precio y la existencia se
            confirman por WhatsApp con el número de parte o una foto de la pieza.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-6">
          {[
            { k: "Sucursales", v: "3" },
            { k: "Enfoque", v: "Sureste" },
            { k: "Plaza matriz", v: "Tabasco" },
            { k: "Canal", v: "WhatsApp" },
          ].map((s) => (
            <div key={s.k} className="border-t border-primary/40 pt-4">
              <dt className="text-xs uppercase tracking-wider text-muted">{s.k}</dt>
              <dd className="mt-1 font-display text-3xl font-bold uppercase">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 md:flex-row md:items-center">
          <p className="font-display text-3xl font-bold uppercase">Hable con ventas</p>
          <Link
            to="/contacto"
            className="inline-flex h-12 items-center rounded-sm bg-primary px-6 text-sm font-semibold text-primary-fg"
          >
            Contacto
          </Link>
        </div>
      </section>
    </main>
  );
}
