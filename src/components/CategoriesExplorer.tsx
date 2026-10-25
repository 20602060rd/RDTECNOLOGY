import React, { useState, useMemo } from 'react';
import { FaultCategory, RepairGuide } from '../types';
import { FAULT_CATEGORIES } from '../data/categoriesData';
import { REPAIR_GUIDES } from '../data/diagnosticData';
import { 
  Search, 
  Droplets, 
  Cpu, 
  Zap, 
  Flame, 
  Wrench, 
  ShieldCheck, 
  ShieldAlert, 
  Microchip,
  ChevronRight,
  ExternalLink,
  Info
} from 'lucide-react';

interface CategoriesExplorerProps {
  onSelectGuideById: (guideId: string) => void;
  onOpenGuide: (guide: RepairGuide) => void;
}

export const CategoriesExplorer: React.FC<CategoriesExplorerProps> = ({
  onSelectGuideById,
  onOpenGuide,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('sistema-agua');
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  const activeCategory = useMemo(() => {
    return FAULT_CATEGORIES.find((cat) => cat.id === selectedCategoryId) || FAULT_CATEGORIES[0];
  }, [selectedCategoryId]);

  const filteredFaults = useMemo(() => {
    const query = categorySearchQuery.toLowerCase().trim();
    if (!query) return activeCategory.faults;

    return activeCategory.faults.filter(
      (f) =>
        f.title.toLowerCase().includes(query) ||
        f.symptom.toLowerCase().includes(query) ||
        f.probableCause.toLowerCase().includes(query) ||
        f.recommendedPart.toLowerCase().includes(query)
    );
  }, [activeCategory, categorySearchQuery]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets':
        return <Droplets className="w-4 h-4 text-sky-600" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-indigo-600" />;
      case 'Zap':
        return <Zap className="w-4 h-4 text-amber-600" />;
      case 'Microchip':
        return <Microchip className="w-4 h-4 text-purple-600" />;
      case 'Flame':
        return <Flame className="w-4 h-4 text-orange-600" />;
      case 'Wrench':
        return <Wrench className="w-4 h-4 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-cyan-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Category Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <span>Manual Técnico Especializado</span>
          <span aria-hidden="true">·</span>
          <span>8 Categorías de Sistema</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Biblioteca de Fallas por Sistema
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
          Catálogo estructurado con los 47 tipos de averías técnicas documentadas para agua, motricidad, electrónica, temperatura, estructura y mantenimiento.
        </p>
      </div>

      {/* Category Horizontal Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {FAULT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategoryId(cat.id);
                setCategorySearchQuery('');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {getCategoryIcon(cat.iconName)}
              <span>{cat.name}</span>
              <span className={`text-[11px] font-mono tabular-nums px-1.5 py-0.2 rounded ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.totalFaults}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Category Banner */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">{activeCategory.name}</span>
            <span className="text-xs text-slate-500">· {activeCategory.totalFaults} tipos de falla</span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            {activeCategory.description}
          </p>
        </div>

        {/* Search within category */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={categorySearchQuery}
            onChange={(e) => setCategorySearchQuery(e.target.value)}
            placeholder={`Filtrar en ${activeCategory.name}...`}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Faults List */}
      <div className="space-y-3">
        {filteredFaults.map((fault, index) => {
          const matchingGuide = fault.guideId ? REPAIR_GUIDES.find((g) => g.id === fault.guideId) : null;

          return (
            <div
              key={fault.id}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:border-slate-300 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {fault.title}
                  </h3>
                </div>

                {matchingGuide && (
                  <button
                    onClick={() => onOpenGuide(matchingGuide)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors self-start sm:self-auto shrink-0"
                  >
                    <span>Ficha 5 Pasos</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                
                <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">
                    Síntoma Reportado:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {fault.symptom}
                  </p>
                </div>

                <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">
                    Comprobación Rápida:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {fault.quickCheck}
                  </p>
                </div>

                <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">
                    Causa Raíz Probable:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {fault.probableCause}
                  </p>
                </div>

              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-semibold text-slate-800">Repuesto recomendado:</span>
                  <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {fault.recommendedPart}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredFaults.length === 0 && (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
            <Info className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">
              No se encontraron averías con el filtro "{categorySearchQuery}"
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Prueba con otro término de búsqueda o selecciona otra categoría.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
