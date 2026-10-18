import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { company } from "@/lib/company";
import { waLink } from "@/lib/whatsapp";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <a
        href={waLink(`Hola ${company.name}, quiero cotizar una refacción.`)}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-sm bg-primary px-4 text-sm font-semibold text-primary-fg shadow-lg sm:hidden"
      >
        Cotizar
      </a>
    </div>
  );
}
