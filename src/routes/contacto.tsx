import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { branches, company } from "@/lib/company";
import { waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/contacto")({ component: ContactPage });

function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Contacto</p>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">
        Tres plazas en el sureste
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Envíe número de parte, modelo de máquina y sucursal. Respondemos por WhatsApp o correo.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            icon: Phone,
            t: "WhatsApp",
            d: company.phoneDisplay,
            href: waLink(`Hola ${company.name}, quiero información.`),
          },
          {
            icon: Mail,
            t: "Correo",
            d: company.email,
            href: `mailto:${company.email}`,
          },
          {
            icon: MapPin,
            t: "Instagram",
            d: company.instagramHandle,
            href: company.instagram,
          },
        ].map((c) => (
          <div key={c.t} className="rounded-sm border border-border bg-surface p-6">
            <c.icon className="size-5 text-primary" />
            <p className="mt-4 text-xs uppercase tracking-wider text-muted">{c.t}</p>
            <a
              href={c.href}
              className="mt-2 block text-sm hover:text-primary"
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {c.d}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {branches.map((b) => (
          <article key={b.city} className="rounded-sm border border-border bg-surface p-5">
            <p className="text-xs uppercase tracking-wider text-primary">{b.city}</p>
            <p className="mt-2 text-sm">{b.detail}</p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">{company.hours}</p>

      <div className="mt-10 overflow-hidden rounded-sm border border-border">
        <img src="/images/warehouse.jpg" alt="Almacén EMM PARTS" className="max-h-80 w-full object-cover" />
      </div>
    </main>
  );
}
