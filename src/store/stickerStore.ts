import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Sticker } from "@/types/sticker";

interface StickerStore {
  stickers: Sticker[];
  addSticker: (sticker: Omit<Sticker, "id" | "createdAt">) => void;
  updateSticker: (id: string, sticker: Partial<Sticker>) => void;
  deleteSticker: (id: string) => void;
  getSticker: (id: string) => Sticker | undefined;
}

const initialStickers: Sticker[] = [
  {
    id: "1",
    name: "Adhesive Product Labels",
    description: "Durable adhesive labels for retail packs, jars, and cartons with crisp print quality.",
    category: "adhesive-labels",
    imageUrl: "/samples/adhesive label.jpg",
    price: 0,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Custom Logo Stickers",
    description: "Brand-forward logo stickers for giveaways, packaging, and events with strong adhesion.",
    category: "logo-stickers",
    imageUrl: "/samples/WhatsApp Image 2025-12-21 at 10.01.18 AM.jpeg",
    price: 0,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Self Adhesive Stickers",
    description: "Everyday self-adhesive stickers for branding, shipping, and organization.",
    category: "self-adhesive-stickers",
    imageUrl: "/samples/WhatsApp Image 2025-12-21 at 10.01.19 AM.jpeg",
    price: 0,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Foil Stickers",
    description: "Premium metallic foil stickers that elevate packaging with a reflective finish.",
    category: "foil-stickers",
    imageUrl: "/samples/WhatsApp Image 2025-12-21 at 10.01.20 AM.jpeg",
    price: 0,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Barcode Labels",
    description: "Reliable barcode and QR labels for retail compliance and inventory tracking.",
    category: "barcode-labels",
    imageUrl: "/samples/WhatsApp Image 2025-12-21 at 10.01.21 AM.jpeg",
    price: 0,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Thermal Paper Rolls",
    description: "POS-ready thermal paper rolls for billing and receipts with clean prints.",
    category: "thermal-paper-rolls",
    imageUrl: "/samples/WhatsApp Image 2025-12-21 at 10.08.48 AM.jpeg",
    price: 0,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Paper Printing",
    description: "Paper print services for brochures, inserts, and branded collateral.",
    category: "paper-print",
    imageUrl: "/samples/WhatsApp Image 2025-12-21 at 10.08.51 AM.jpeg",
    price: 0,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Metalized Printing",
    description: "Specialized metalized and custom printing services for standout labels and boards.",
    category: "printing-services",
    imageUrl: "/samples/WhatsApp Image 2025-12-21 at 10.08.53 AM.jpeg",
    price: 0,
    featured: false,
    createdAt: new Date().toISOString(),
  },
];

export const useStickerStore = create<StickerStore>()(
  persist(
    (set, get) => ({
      stickers: initialStickers,
      addSticker: (sticker) =>
        set((state) => ({
          stickers: [
            ...state.stickers,
            {
              ...sticker,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateSticker: (id, updates) =>
        set((state) => ({
          stickers: state.stickers.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),
      deleteSticker: (id) =>
        set((state) => ({
          stickers: state.stickers.filter((s) => s.id !== id),
        })),
      getSticker: (id) => get().stickers.find((s) => s.id === id),
    }),
    {
      name: "sticker-store",
    }
  )
);
