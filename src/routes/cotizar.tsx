import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/cotizar")({ component: QuotePage });

function QuotePage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [machine, setMachine] = useState("");
  const [parts, setParts] = useState("");

  const message = [
    "Hola EMM PARTS, quiero cotizar.",
    name ? `Nombre: ${name}` : null,
    city ? `Plaza: ${city}` : null,
    machine ? `Máquina: ${machine}` : null,
    parts ? `Partes:\n${parts}` : "Partes: (pendiente)",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Cotizar</p>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase">Número de parte, y listo</h1>
      <p className="mt-3 text-sm text-muted">
        Complete lo que tenga. Lo enviamos a WhatsApp de ventas para confirmar existencias y
        tiempo de entrega.
      </p>
      <form
        className="mt-10 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          window.open(waLink(message), "_blank", "noopener,noreferrer");
        }}
      >
        <label className="block text-sm">
          Nombre
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 h-11 w-full rounded-sm border border-border bg-surface px-3 outline-none focus:border-primary"
          />
        </label>
        <label className="block text-sm">
          Ciudad / plaza
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 h-11 w-full rounded-sm border border-border bg-surface px-3 outline-none focus:border-primary"
          />
        </label>
        <label className="block text-sm">
          Máquina (marca y modelo)
          <input
            value={machine}
            onChange={(e) => setMachine(e.target.value)}
            placeholder="Ej. CASE 580N, John Deere 310G"
            className="mt-1 h-11 w-full rounded-sm border border-border bg-surface px-3 outline-none placeholder:text-muted focus:border-primary"
          />
        </label>
        <label className="block text-sm">
          Números de parte
          <textarea
            value={parts}
            onChange={(e) => setParts(e.target.value)}
            rows={5}
            placeholder="Uno por línea"
            className="mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 outline-none placeholder:text-muted focus:border-primary"
          />
        </label>
        <button
          type="submit"
          className="h-12 w-full rounded-sm bg-primary text-sm font-semibold text-primary-fg"
        >
          Abrir WhatsApp
        </button>
      </form>
    </main>
  );
}
