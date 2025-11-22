import React, { useState } from 'react';
import { Sparkles, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react';
import { Header } from './components/Header';
import { ConceptInput } from './components/ConceptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { ImageRequest, GenerationState, AppStatus } from './types';
import { generateContrastPair } from './services/gemini';

const INITIAL_STATE: GenerationState = {
  status: AppStatus.IDLE,
};

const INITIAL_INPUT: ImageRequest = {
  title: '',
  concept: '',
  description: '',
};

export default function App() {
  const [leftRequest, setLeftRequest] = useState<ImageRequest>({ ...INITIAL_INPUT });
  const [rightRequest, setRightRequest] = useState<ImageRequest>({ ...INITIAL_INPUT });
  const [sharedStyle, setSharedStyle] = useState<string>('Fotorealista, iluminación cinematográfica, alta resolución 8k');
  const [state, setState] = useState<GenerationState>(INITIAL_STATE);

  const handleGenerate = async () => {
    if (!process.env.API_KEY) {
      setState({
        status: AppStatus.ERROR,
        error: "Falta la clave API. Por favor verifica tu configuración."
      });
      return;
    }

    if (!leftRequest.description || !rightRequest.description) {
      setState({
         status: AppStatus.ERROR,
         error: "Por favor proporciona una descripción detallada para ambas imágenes."
      });
      return;
    }

    setState({ status: AppStatus.GENERATING });

    try {
      const [leftImg, rightImg] = await generateContrastPair(
        { description: leftRequest.description, title: leftRequest.title || 'Foto 1' },
        { description: rightRequest.description, title: rightRequest.title || 'Foto 2' },
        sharedStyle
      );

      setState({
        status: AppStatus.SUCCESS,
        leftImage: leftImg,
        rightImage: rightImg
      });
    } catch (err) {
      setState({
        status: AppStatus.ERROR,
        error: err instanceof Error ? err.message : "Ocurrió un error inesperado durante la generación."
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
            Visualiza el <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-700">
              Contraste
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-xl font-light">
            Mejor es el fin del negocio que su principio. Genera dos imágenes que ilustren conceptos opuestos con un estilo visual cohesivo.
          </p>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          
          <ConceptInput 
            side="left" 
            value={leftRequest} 
            onChange={setLeftRequest} 
            disabled={state.status === AppStatus.GENERATING}
          />
          
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 items-center justify-center">
             <ArrowRight className="w-8 h-8 text-zinc-700" />
          </div>

          <ConceptInput 
            side="right" 
            value={rightRequest} 
            onChange={setRightRequest} 
            disabled={state.status === AppStatus.GENERATING}
          />
        </div>

        {/* Global Settings */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col sm:flex-row gap-6 items-end">
            <div className="flex-grow w-full">
              <label className="block text-xs text-zinc-400 mb-2 font-bold uppercase tracking-wider">Estilo Visual Compartido</label>
              <input 
                type="text"
                value={sharedStyle}
                onChange={(e) => setSharedStyle(e.target.value)}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-all placeholder:text-zinc-600"
                placeholder="ej. Pintura al óleo, Cyberpunk, Blanco y Negro..."
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={state.status === AppStatus.GENERATING}
              className={`
                w-full sm:w-auto px-10 py-3 font-bold text-white text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 border
                ${state.status === AppStatus.GENERATING 
                  ? 'bg-zinc-800 border-zinc-800 cursor-not-allowed text-zinc-500' 
                  : 'bg-white text-black border-white hover:bg-zinc-200 hover:scale-105'}
              `}
            >
              {state.status === AppStatus.GENERATING ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Creando...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {state.status === AppStatus.ERROR && (
          <div className="mt-12 p-4 bg-red-900/20 border border-red-900 text-red-200 flex items-center gap-3 max-w-2xl mx-auto">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{state.error}</p>
          </div>
        )}

        {/* Results */}
        {state.status === AppStatus.SUCCESS && (
           <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             <ResultDisplay leftImage={state.leftImage} rightImage={state.rightImage} />
           </div>
        )}

      </main>
    </div>
  );
}