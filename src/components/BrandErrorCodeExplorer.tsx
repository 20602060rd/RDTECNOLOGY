import React, { useState, useMemo } from 'react';
import { ErrorCodeItem } from '../types';
import { ERROR_CODES } from '../data/errorCodesData';
import { Search, Tag, RotateCcw, Activity, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface BrandErrorCodeExplorerProps {
  initialBrand?: string;
}

export const BrandErrorCodeExplorer: React.FC<BrandErrorCodeExplorerProps> = ({
  initialBrand = 'Todas'
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModelType, setSelectedModelType] = useState<string>('Todos');

  const brands = ['Todas', 'Whirlpool', 'LG', 'Samsung', 'Mabe', 'Haceb', 'Bosch', 'Electrolux'];
  const modelTypes = ['Todos', 'Universal', 'Inverter', 'Carga Superior', 'Carga Frontal'];

  const filteredCodes = useMemo(() => {
    return ERROR_CODES.filter((item) => {
      const matchesBrand = selectedBrand === 'Todas' || item.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchesType = selectedModelType === 'Todos' || item.modelType === selectedModelType;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        item.code.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.probableCauses.some((c) => c.toLowerCase().includes(query)) ||
        item.brand.toLowerCase().includes(query);

      return matchesBrand && matchesType && matchesSearch;
    });
  }, [selectedBrand, selectedModelType, searchQuery]);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <span>Manual de Servicio Técnico</span>
          <span aria-hidden="true">·</span>
          <span>Códigos de Falla Alfanuméricos</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Buscador de Códigos de Error por Marca
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
          Ingresa el código que muestra la lavadora en su display (ej. OE, IE, 5E, dE, F02, E1) para obtener su significado técnico, cómo medir el componente y cómo resetear la máquina.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
        
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar código o síntoma: ej. OE, 5E, UE, dE, F7E1, presostato, puerta..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>

        {/* Brand buttons */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
            Filtrar por Marca Fabricante:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedBrand === b
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Machine type buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-500 whitespace-nowrap">Tipo de Tecnología:</span>
          {modelTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedModelType(type)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                selectedModelType === type
                  ? 'bg-slate-200 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

      </div>

      {/* Code Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>{filteredCodes.length} códigos encontrados</span>
          <span>Mostrando: {selectedBrand} · {selectedModelType}</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredCodes.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-all space-y-4 shadow-sm"
            >
              {/* Header card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-slate-900 text-white rounded-lg font-mono text-base font-bold tracking-wider">
                    {item.code}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.description}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="font-semibold text-slate-800">{item.brand}</span>
                      <span aria-hidden="true">·</span>
                      <span>Tecnología {item.modelType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Causes & Solutions 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Causes */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Causas Frecuentes
                  </span>
                  <ul className="space-y-1.5 text-slate-700">
                    {item.probableCauses.map((cause, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">•</span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Pasos de Reparación
                  </span>
                  <ul className="space-y-1.5 text-slate-700">
                    {item.solutionSteps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="text-slate-400 font-mono mt-0.5">{sIdx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Multimeter spec if available */}
              {item.multimeterTest && (
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-950 font-bold uppercase tracking-wider text-[11px]">
                    <Activity className="w-3.5 h-3.5 text-amber-700" />
                    <span>Prueba con Multímetro Documentada</span>
                  </div>
                  <p className="text-amber-900 font-mono">
                    {item.multimeterTest}
                  </p>
                </div>
              )}

              {/* Reset sequence if available */}
              {item.resetProcedure && (
                <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <RotateCcw className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-semibold mr-1">Secuencia de Reset:</strong>
                    <span>{item.resetProcedure}</span>
                  </div>
                </div>
              )}

            </div>
          ))}

          {filteredCodes.length === 0 && (
            <div className="p-10 text-center bg-white rounded-xl border border-slate-200">
              <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-800">
                No se encontró el código "{searchQuery}"
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Verifica la ortografía o cambia el filtro de marca. Algunos modelos sin display numérico indican el error mediante el parpadeo de leds de lavado y centrifugado.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
