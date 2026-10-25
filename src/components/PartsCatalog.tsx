import React, { useState, useMemo } from 'react';
import { SparePart } from '../types';
import { SPARE_PARTS } from '../data/partsData';
import { Search, PlusCircle, Wrench, Shield, Check, Info } from 'lucide-react';

interface PartsCatalogProps {
  onAddPartToBudget?: (part: { description: string; unitPrice: number }) => void;
}

export const PartsCatalog: React.FC<PartsCatalogProps> = ({ onAddPartToBudget }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemNotification, setAddedItemNotification] = useState<string | null>(null);

  const categories = ['Todas', 'Agua', 'Motor', 'Eléctrico', 'Mecánica', 'Puerta y Controles'];

  const filteredParts = useMemo(() => {
    return SPARE_PARTS.filter((part) => {
      const matchesCategory = selectedCategory === 'Todas' || part.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        part.name.toLowerCase().includes(query) ||
        part.partNumber.toLowerCase().includes(query) ||
        part.compatibleBrands.some((b) => b.toLowerCase().includes(query)) ||
        part.failureSymptoms.some((s) => s.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAdd = (part: SparePart) => {
    if (onAddPartToBudget) {
      onAddPartToBudget({
        description: `${part.name} (${part.partNumber})`,
        unitPrice: part.avgPriceCOP
      });
      setAddedItemNotification(part.name);
      setTimeout(() => setAddedItemNotification(null), 2500);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <span>Catálogo de Componentes</span>
          <span aria-hidden="true">·</span>
          <span>Repuestos Originales y Compatibles</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Catálogo Técnico de Repuestos
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
          Especificaciones nominales, rangos de medición con multímetro, referencias de partes y precios promedio en el mercado técnico colombiano (COP).
        </p>
      </div>

      {/* Added Notification Toast */}
      {addedItemNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-3">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">Añadido al Presupuesto: {addedItemNotification}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
        
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, código de parte o marca compatible (ej. bomba Askoll, LG, 45uF, rodamiento 6205)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Parts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredParts.map((part) => (
          <div
            key={part.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition-all"
          >
            {/* Image banner */}
            {part.image && (
              <div className="h-44 w-full bg-slate-100 overflow-hidden relative border-b border-slate-100">
                <img
                  src={part.image}
                  alt={part.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-slate-950/80 backdrop-blur-sm text-white text-[11px] font-mono rounded-md font-semibold">
                  {part.partNumber}
                </span>
              </div>
            )}

            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span>Categoría {part.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">Para: {part.compatibleBrands.slice(0, 3).join(', ')}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {part.name}
                  </h3>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <span className="font-semibold text-slate-900 block">Especificaciones Técnicas:</span>
                  <p className="text-slate-600 font-mono text-[11px] leading-relaxed">
                    {part.nominalSpecs}
                  </p>
                </div>

                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-xs space-y-1">
                  <span className="font-semibold text-amber-950 block">Medición con Multímetro:</span>
                  <p className="text-amber-900 text-[11px] leading-relaxed">
                    {part.multimeterRange}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Síntomas de daño común:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {part.failureSymptoms.slice(0, 2).map((sym, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5">
                        <span className="text-slate-400 mt-0.5">•</span>
                        <span className="line-clamp-2">{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Price and Add button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Precio ref. mercado COP
                  </span>
                  <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                    $ {part.avgPriceCOP.toLocaleString('es-CO')} COP
                  </span>
                </div>

                <button
                  onClick={() => handleAdd(part)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Cotizar</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
