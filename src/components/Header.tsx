import React from 'react';
import { TabType } from '../types';
import { Wrench, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenSafety: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenSafety,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark with official profile avatar */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onTabChange('diagnostico')}
              className="flex items-center gap-3 text-left cursor-pointer focus:outline-none group"
              title="Perfil Oficial: Servicio Técnico RDTERCNOLOGY"
            >
              <div className="relative">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_5.05.52_PM_2386b5cd.jpeg"
                  alt="Foto de perfil Servicio Técnico RDTERCNOLOGY"
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover bg-slate-950 p-0.5 shadow-md border-2 border-sky-500 group-hover:scale-105 transition-all"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm" title="Taller en Línea" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none whitespace-nowrap">
                  SERVICIO TÉCNICO <span className="text-sky-600 font-extrabold">RDTERCNOLOGY</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-tight mt-1">
                  Taller Especializado en Reparación de Lavadoras
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onTabChange('diagnostico')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 ${
                currentTab === 'diagnostico'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Diagnosticar
            </button>
            <button
              onClick={() => onTabChange('manuales')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 ${
                currentTab === 'manuales'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Manual Técnico
            </button>
            <button
              onClick={() => onTabChange('codigos')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 ${
                currentTab === 'codigos'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Códigos de Error
            </button>
            <button
              onClick={() => onTabChange('multimetro')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 ${
                currentTab === 'multimetro'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Valores de Multímetro
            </button>
            <button
              onClick={() => onTabChange('repuestos')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 ${
                currentTab === 'repuestos'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Repuestos
            </button>
            <button
              onClick={() => onTabChange('presupuestos')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 ${
                currentTab === 'presupuestos'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Presupuestos COP
            </button>
            <button
              onClick={() => onTabChange('historial')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 ${
                currentTab === 'historial'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Bitácora
            </button>
          </nav>

          {/* Zone 3: WhatsApp Contact & Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://wa.me/573106338295"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap shadow-sm"
              title="Contactar al WhatsApp 310 633 8295"
            >
              <span>WhatsApp: 310 633 8295</span>
            </a>

            <button
              onClick={onOpenSafety}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              title="Normas obligatorias de seguridad técnica"
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Seguridad</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subnav for Mobile scrolling */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-100 px-4 py-2 gap-2 text-xs font-medium no-scrollbar">
        <button
          onClick={() => onTabChange('diagnostico')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            currentTab === 'diagnostico'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Diagnóstico
        </button>
        <button
          onClick={() => onTabChange('manuales')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            currentTab === 'manuales'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Manual
        </button>
        <button
          onClick={() => onTabChange('codigos')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            currentTab === 'codigos'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Códigos
        </button>
        <button
          onClick={() => onTabChange('multimetro')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            currentTab === 'multimetro'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Multímetro
        </button>
        <button
          onClick={() => onTabChange('repuestos')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            currentTab === 'repuestos'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Repuestos
        </button>
        <button
          onClick={() => onTabChange('presupuestos')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            currentTab === 'presupuestos'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Presupuesto
        </button>
        <button
          onClick={() => onTabChange('historial')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            currentTab === 'historial'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Bitácora
        </button>
      </div>
    </header>
  );
};
