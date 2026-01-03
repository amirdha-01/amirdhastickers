export interface Sticker {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  featured: boolean;
  createdAt: string;
}

export type StickerCategory = 
  | "adhesive-labels"
  | "logo-stickers"
  | "self-adhesive-stickers"
  | "foil-stickers"
  | "barcode-labels"
  | "thermal-paper-rolls"
  | "paper-print"
  | "visiting-cards"
  | "printing-services";

export const STICKER_CATEGORIES: { value: StickerCategory; label: string }[] = [
  { value: "adhesive-labels", label: "Adhesive Labels" },
  { value: "logo-stickers", label: "Logo Stickers" },
  { value: "self-adhesive-stickers", label: "Self Adhesive Stickers" },
  { value: "foil-stickers", label: "Foil Stickers" },
  { value: "barcode-labels", label: "Barcode Labels" },
  { value: "thermal-paper-rolls", label: "Thermal Paper Rolls" },
  { value: "paper-print", label: "Paper Printing" },
  { value: "visiting-cards", label: "Visiting Cards" },
  { value: "printing-services", label: "Metalized & Custom Printing" },
];
