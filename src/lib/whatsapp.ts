import { company } from "@/lib/company";

export function waLink(message: string) {
  return `https://wa.me/${company.phoneE164}?text=${encodeURIComponent(message)}`;
}

export function waQuoteMessage(lines: string[]) {
  return [
    `Hola ${company.name}, quiero cotizar:`,
    "",
    ...lines,
    "",
    "¿Me confirman disponibilidad y tiempo de entrega?",
  ].join("\n");
}
