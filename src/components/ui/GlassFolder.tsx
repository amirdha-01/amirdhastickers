import React from 'react';
import { FileText } from 'lucide-react';

interface GlassFolderProps {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const GlassFolder: React.FC<GlassFolderProps> = ({ 
  children, 
  className = '',
  icon = <FileText className="w-8 h-8 text-yellow-300" />
}) => {
  return (
    <div className={`relative w-32 h-32 perspective ${className}`}>
      {/* Back Layer */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md border border-white/40 shadow-2xl"
        style={{
          transform: 'translateZ(0px) rotateX(0deg) rotateY(0deg)',
        }}
      />

      {/* Middle Layer */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/10 backdrop-blur-md border border-white/30 shadow-lg transition-transform duration-300 hover:translate-y-1"
        style={{
          transform: 'translateY(-8px) translateZ(20px)',
        }}
      />

      {/* Front Layer */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/40 to-purple-500/20 backdrop-blur-md border border-white/50 shadow-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
        style={{
          transform: 'translateY(-16px) translateZ(40px)',
        }}
      >
        <div className="transition-transform duration-300 group-hover:scale-110">
          {children || icon}
        </div>
      </div>
    </div>
  );
};

export default GlassFolder;
