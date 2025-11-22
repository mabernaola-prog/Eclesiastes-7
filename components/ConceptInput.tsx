import React from 'react';
import { ImageRequest } from '../types';

interface ConceptInputProps {
  side: 'left' | 'right';
  value: ImageRequest;
  onChange: (value: ImageRequest) => void;
  disabled?: boolean;
}

export const ConceptInput: React.FC<ConceptInputProps> = ({ side, value, onChange, disabled }) => {
  const handleChange = (field: keyof ImageRequest, text: string) => {
    onChange({ ...value, [field]: text });
  };

  const isLeft = side === 'left';
  // High contrast colors: White vs Zinc
  const borderColor = isLeft ? 'border-white' : 'border-white';
  const labelColor = isLeft ? 'text-white' : 'text-white';
  
  return (
    <div className={`flex flex-col gap-5 p-8 rounded-none border-2 bg-zinc-950 ${borderColor} transition-all duration-300 hover:bg-zinc-900`}>
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-2">
        <h3 className={`text-xl font-black uppercase tracking-widest ${labelColor}`}>
          {isLeft ? 'Foto 1' : 'Foto 2'}
        </h3>
        <span className="text-4xl font-black text-zinc-800">0{isLeft ? '1' : '2'}</span>
      </div>

      {/* Concept Title Field */}
      <div className="group">
        <label className="block text-xs text-zinc-400 mb-2 font-bold uppercase tracking-wider">Título de la Foto</label>
        <input
          type="text"
          value={value.title}
          onChange={(e) => handleChange('title', e.target.value)}
          disabled={disabled}
          placeholder={isLeft ? "ej. El Fin de una cosa" : "ej. El Principio de una cosa"}
          className="w-full bg-black border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-700 font-medium"
        />
      </div>

      {/* Core Concept Field */}
      <div className="group">
        <label className="block text-xs text-zinc-400 mb-2 font-bold uppercase tracking-wider">Concepto Principal</label>
        <input
          type="text"
          value={value.concept}
          onChange={(e) => handleChange('concept', e.target.value)}
          disabled={disabled}
          placeholder={isLeft ? "ej. Sabiduría" : "ej. Locura"}
          className="w-full bg-black border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-700 font-medium"
        />
      </div>

      {/* Detailed Description Field */}
      <div className="group flex-grow">
        <label className="block text-xs text-zinc-400 mb-2 font-bold uppercase tracking-wider">Descripción de la Escena</label>
        <textarea
          value={value.description}
          onChange={(e) => handleChange('description', e.target.value)}
          disabled={disabled}
          rows={6}
          placeholder={isLeft 
            ? "Describe el ambiente, la iluminación y los elementos..." 
            : "Describe los elementos en contraste..."}
          className="w-full bg-black border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white resize-none placeholder:text-zinc-700 text-sm leading-relaxed"
        />
      </div>
    </div>
  );
};