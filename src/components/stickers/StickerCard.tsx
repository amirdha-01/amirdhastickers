import { Sticker, STICKER_CATEGORIES } from "@/types/sticker";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { BorderTrail } from "@/components/ui/border-trail";

interface StickerCardProps {
  sticker: Sticker;
  colorIndex: number;
}

const colorVariants = [
  "bg-blue-50",
  "bg-slate-50",
  "bg-gray-50",
  "bg-neutral-50",
  "bg-stone-50",
];

const StickerCard = ({ sticker, colorIndex }: StickerCardProps) => {
  const categoryLabel = STICKER_CATEGORIES.find(
    (c) => c.value === sticker.category
  )?.label;

  const bgColor = colorVariants[colorIndex % colorVariants.length];

  return (
    <div className="relative bg-white rounded-lg border border-slate-200 overflow-hidden transition-smooth hover-lift hover-glow scale-in shadow-md hover:shadow-xl group h-full flex flex-col">
      <BorderTrail
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
        size={80}
        transition={{
          duration: 5 + colorIndex,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Image Container */}
      <div className={`${bgColor} relative overflow-hidden flex items-center justify-center p-4 md:p-6 lg:p-8 transition-all duration-500 group-hover:scale-105 flex-shrink-0`}>
        {sticker.imageUrl ? (
          <img
            src={sticker.imageUrl}
            alt={sticker.name}
            className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 rounded-lg bg-slate-200 flex items-center justify-center transition-all duration-300 group-hover:bg-slate-300">
            <Sparkles className="w-12 h-12 text-slate-400 pulse-glow" />
          </div>
        )}

        {sticker.featured && (
          <div className="absolute top-4 right-4 scale-in">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 rounded px-2 py-1 animate-pulse text-xs md:text-sm">
              Featured
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 lg:p-5 border-t border-slate-200 transition-all duration-300 flex-grow flex flex-col">
        <h3 className="font-bold text-xs sm:text-sm md:text-base text-slate-900 mb-2 transition-colors duration-300 group-hover:text-blue-600 line-clamp-2">
          {sticker.name}
        </h3>
        <p className="text-slate-600 text-xs md:text-sm mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-slate-700 flex-grow">
          {sticker.description}
        </p>
        <Badge variant="secondary" className="rounded text-xs transition-all duration-300 group-hover:bg-blue-100 group-hover:text-blue-700 inline-block w-fit">
          {categoryLabel}
        </Badge>
      </div>
    </div>
  );
};

export default StickerCard;
