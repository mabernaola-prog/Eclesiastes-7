import React from 'react';
import { Download } from 'lucide-react';
import { GeneratedImage } from '../types';

interface ResultDisplayProps {
  leftImage?: GeneratedImage;
  rightImage?: GeneratedImage;
}

const ImageCard: React.FC<{ image?: GeneratedImage; side: 'left' | 'right' }> = ({ image, side }) => {
  if (!image) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `eclesiastes-7-${side}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative group bg-black border-2 border-zinc-800 hover:border-white transition-colors duration-500">
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={image.url} 
          alt={image.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <button 
               onClick={handleDownload}
               className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
               title="Descargar Imagen"
             >
               <Download className="w-5 h-5" />
               Descargar
             </button>
        </div>
      </div>
      <div className="p-6 border-t border-zinc-800 bg-zinc-950">
        <h4 className="text-xl font-black text-white mb-2 uppercase">{image.title}</h4>
        <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">{image.prompt}</p>
      </div>
    </div>
  );
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ leftImage, rightImage }) => {
  if (!leftImage || !rightImage) return null;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 relative mt-16">
      
      {/* VS Badge */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 bg-black rounded-full border-4 border-white items-center justify-center">
        <span className="text-2xl font-black text-white italic">VS</span>
      </div>

      <ImageCard image={leftImage} side="left" />
      <ImageCard image={rightImage} side="right" />
    </div>
  );
};