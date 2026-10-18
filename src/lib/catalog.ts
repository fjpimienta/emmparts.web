export const brands = [
  "CTP",
  "Maxiforce",
  "KMP",
  "Hercules",
  "ITR",
  "Bucyrus",
  "LUBER",
  "GONHER",
  "Caterpillar",
  "John Deere",
  "JCB",
  "Kubota",
] as const;

export type Brand = (typeof brands)[number];

export const categories = [
  { id: "motor", label: "Motor" },
  { id: "corte", label: "Corte y desgaste" },
  { id: "hidraulico", label: "Hidráulico" },
  { id: "tren", label: "Tren de rodaje" },
  { id: "sellos", label: "Sellos y empaques" },
  { id: "aceites", label: "Aceites" },
  { id: "turbos", label: "Turbos" },
  { id: "bombas", label: "Bombas" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type Product = {
  slug: string;
  name: string;
  sku: string;
  brand: Brand;
  category: CategoryId;
  models: string[];
  price: number | null;
  stock: "in" | "out";
  oem?: boolean;
  origin?: string;
  note?: string;
  featured?: boolean;
  image: string;
};

export const products: Product[] = [
  {
    slug: "repuestos-motor-ctp",
    name: "Repuestos de motor",
    sku: "Línea motor",
    brand: "CTP",
    category: "motor",
    models: ["Caterpillar", "Cummins"],
    price: null,
    stock: "in",
    featured: true,
    image: "/images/part-piston.jpg",
    note: "Pistones, anillos, camisas y kits de motor.",
  },
  {
    slug: "cabezas-motor",
    name: "Cabezas para motor",
    sku: "Cabeza",
    brand: "KMP",
    category: "motor",
    models: ["Diésel pesado"],
    price: null,
    stock: "in",
    featured: true,
    image: "/images/part-piston.jpg",
  },
  {
    slug: "valvulas-motor",
    name: "Válvulas",
    sku: "Válvulas",
    brand: "Maxiforce",
    category: "motor",
    models: ["John Deere", "Motor diésel"],
    price: null,
    stock: "in",
    image: "/images/part-piston.jpg",
  },
  {
    slug: "puntas-adaptadores",
    name: "Puntas y adaptadores",
    sku: "Corte",
    brand: "ITR",
    category: "corte",
    models: ["Excavadora", "Cargador"],
    price: null,
    stock: "in",
    featured: true,
    image: "/images/part-gear.jpg",
  },
  {
    slug: "cuchillas-bucyrus",
    name: "Cuchillas",
    sku: "Cuchilla",
    brand: "Bucyrus",
    category: "corte",
    models: ["Motoniveladora", "Cargador"],
    price: null,
    stock: "in",
    featured: true,
    image: "/images/part-yoke.jpg",
  },
  {
    slug: "gavilanes",
    name: "Gavilanes",
    sku: "Gavilán",
    brand: "ITR",
    category: "corte",
    models: ["Cucharón"],
    price: null,
    stock: "in",
    image: "/images/part-gear.jpg",
  },
  {
    slug: "cucharones",
    name: "Cucharones",
    sku: "Cucharón",
    brand: "ITR",
    category: "corte",
    models: ["Excavadora", "Retroexcavadora"],
    price: null,
    stock: "in",
    image: "/images/part-yoke.jpg",
  },
  {
    slug: "cilindros-hidraulicos",
    name: "Cilindros hidráulicos",
    sku: "Cilindro",
    brand: "Hercules",
    category: "hidraulico",
    models: ["Brazo", "Estabilizador"],
    price: null,
    stock: "in",
    featured: true,
    image: "/images/part-hyd-pump.jpg",
  },
  {
    slug: "motores-hidraulicos",
    name: "Motores hidráulicos",
    sku: "Motor hidráulico",
    brand: "Hercules",
    category: "hidraulico",
    models: ["Rotación", "Traslación"],
    price: null,
    stock: "in",
    image: "/images/part-hyd-pump.jpg",
  },
  {
    slug: "mangueras",
    name: "Mangueras",
    sku: "Manguera",
    brand: "Hercules",
    category: "hidraulico",
    models: ["Alta presión"],
    price: null,
    stock: "in",
    image: "/images/part-hyd-pump.jpg",
  },
  {
    slug: "tren-cadenas",
    name: "Cadenas y tren de rodaje",
    sku: "Tren",
    brand: "ITR",
    category: "tren",
    models: ["Excavadora", "Bulldozer"],
    price: null,
    stock: "in",
    featured: true,
    image: "/images/part-gear.jpg",
  },
  {
    slug: "ruedas-guia",
    name: "Ruedas de guía",
    sku: "Rueda guía",
    brand: "ITR",
    category: "tren",
    models: ["Oruga"],
    price: null,
    stock: "in",
    image: "/images/part-gear.jpg",
  },
  {
    slug: "llantas",
    name: "Llantas",
    sku: "Llanta",
    brand: "GONHER",
    category: "tren",
    models: ["Retroexcavadora", "Cargador"],
    price: null,
    stock: "in",
    image: "/images/part-filter.jpg",
  },
  {
    slug: "sellos-empaques",
    name: "Sellos y empaques",
    sku: "Sellos",
    brand: "Hercules",
    category: "sellos",
    models: ["Cilindro", "Motor"],
    price: null,
    stock: "in",
    featured: true,
    image: "/images/part-friction-disc.jpg",
    note: "Kits de sello y empaques de motor.",
  },
  {
    slug: "aceites-luber",
    name: "Aceites y lubricantes",
    sku: "Aceite",
    brand: "LUBER",
    category: "aceites",
    models: ["Motor", "Hidráulico", "Transmisión"],
    price: null,
    stock: "in",
    featured: true,
    image: "/images/part-filter.jpg",
  },
  {
    slug: "turbos",
    name: "Turbos",
    sku: "Turbo",
    brand: "KMP",
    category: "turbos",
    models: ["Motor diésel"],
    price: null,
    stock: "in",
    image: "/images/part-trans-pump.jpg",
  },
  {
    slug: "bomba-agua",
    name: "Bomba de agua",
    sku: "Bomba de agua",
    brand: "CTP",
    category: "bombas",
    models: ["Motor diésel"],
    price: null,
    stock: "in",
    featured: true,
    image: "/images/part-hyd-pump.jpg",
  },
  {
    slug: "linea-john-deere",
    name: "Línea John Deere",
    sku: "Maxiforce",
    brand: "John Deere",
    category: "motor",
    models: ["Agrícola", "Construcción"],
    price: null,
    stock: "in",
    image: "/images/part-piston.jpg",
    note: "Reemplazo Maxiforce.",
  },
  {
    slug: "linea-kubota",
    name: "Línea Kubota",
    sku: "Kubota",
    brand: "Kubota",
    category: "motor",
    models: ["Compacto", "Agrícola"],
    price: null,
    stock: "in",
    image: "/images/part-piston.jpg",
  },
  {
    slug: "linea-jcb",
    name: "Línea JCB",
    sku: "JCB",
    brand: "JCB",
    category: "hidraulico",
    models: ["Retroexcavadora"],
    price: null,
    stock: "in",
    image: "/images/part-hyd-pump.jpg",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function categoryLabel(id: CategoryId) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export function searchProducts(opts: {
  q?: string;
  brand?: string;
  category?: string;
}) {
  const q = opts.q?.trim().toLowerCase() ?? "";
  return products.filter((p) => {
    if (opts.brand && opts.brand !== "all" && p.brand !== opts.brand) return false;
    if (opts.category && opts.category !== "all" && p.category !== opts.category)
      return false;
    if (!q) return true;
    const hay = [p.name, p.sku, p.brand, p.note ?? "", ...p.models].join(" ").toLowerCase();
    return hay.includes(q);
  });
}

export const featuredProducts = products.filter((p) => p.featured);
