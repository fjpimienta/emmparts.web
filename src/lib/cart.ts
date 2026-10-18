import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct } from "@/lib/catalog";

export type CartLine = { slug: string; qty: number };

type CartState = {
  lines: CartLine[];
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (slug, qty = 1) => {
        const lines = [...get().lines];
        const i = lines.findIndex((l) => l.slug === slug);
        if (i >= 0) {
          const current = lines[i];
          if (current) lines[i] = { slug, qty: current.qty + qty };
        } else lines.push({ slug, qty });
        set({ lines });
      },
      setQty: (slug, qty) => {
        if (qty <= 0) set({ lines: get().lines.filter((l) => l.slug !== slug) });
        else
          set({
            lines: get().lines.map((l) => (l.slug === slug ? { slug, qty } : l)),
          });
      },
      remove: (slug) => set({ lines: get().lines.filter((l) => l.slug !== slug) }),
      clear: () => set({ lines: [] }),
    }),
    { name: "pachara-cart" },
  ),
);

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartItems(lines: CartLine[]) {
  return lines
    .map((l) => {
      const product = getProduct(l.slug);
      return product ? { product, qty: l.qty } : null;
    })
    .filter((x): x is { product: NonNullable<ReturnType<typeof getProduct>>; qty: number } =>
      Boolean(x),
    );
}
