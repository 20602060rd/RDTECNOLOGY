import React, { useState, useEffect } from 'react';
import { TabType, RepairGuide, RepairRecord } from './types';
import { Header } from './components/Header';
import { DiagnosticWizard } from './components/DiagnosticWizard';
import { CategoriesExplorer } from './components/CategoriesExplorer';
import { BrandErrorCodeExplorer } from './components/BrandErrorCodeExplorer';
import { MultimeterTester } from './components/MultimeterTester';
import { PartsCatalog } from './components/PartsCatalog';
import { BudgetCalculator } from './components/BudgetCalculator';
import { RepairHistory } from './components/RepairHistory';
import { RepairGuideModal } from './components/RepairGuideModal';
import { SafetyProtocolModal } from './components/SafetyProtocolModal';
import { REPAIR_GUIDES } from './data/diagnosticData';
import { 
  Wrench, 
  BookOpen, 
  FileText, 
  Activity, 
  Package, 
  Receipt, 
  History 
} from 'lucide-react';

const INITIAL_REPAIR_RECORDS: RepairRecord[] = [
  {
    id: 'rec-1',
    clientName: 'Alejandro Restrepo',
    clientPhone: '314 889 2314',
    address: 'Calle 45 # 12-30, Medellín',
    brand: 'LG',
    model: 'Direct Drive 18 Kg (F1804)',
    symptom: 'Error OE en ciclo de centrifugado, no desagua el agua de la tina',
    diagnosis: 'Bobina de bomba de drenaje abierta con lectura OL en multímetro',
    partsReplaced: ['Bomba magnética universal 110V Askoll', 'Abrazaderas elásticas'],
    laborCost: 65000,
    partsCost: 42000,
    transportCost: 15000,
    totalCost: 122000,
    currency: 'COP',
    warrantyDays: 90,
    status: 'Reparada',
    date: '2026-10-22'
  },
  {
    id: 'rec-2',
    clientName: 'Diana Morales',
    clientPhone: '301 554 9912',
    address: 'Cra 68 # 80-15, Bogotá',
    brand: 'Samsung',
    model: 'EcoBubble 12 Kg (WF1124)',
    symptom: 'Ruido ensordecedor de avión al centrifugar a alta velocidad',
    diagnosis: 'Retén de agua roto con filtración hacia rodamientos oxidados',
    partsReplaced: ['Rodamientos SKF 6205-2RS / 6206-2RS', 'Retén doble labio 37x66', 'Grasa marina'],
    laborCost: 140000,
    partsCost: 75000,
    transportCost: 20000,
    totalCost: 235000,
    currency: 'COP',
    warrantyDays: 180,
    status: 'Entregada con Garantía',
    date: '2026-10-20'
  },
  {
    id: 'rec-3',
    clientName: 'Héctor Fabio Ramírez',
    clientPhone: '316 412 8870',
    address: 'Av. Pasoancho # 56-40, Cali',
    brand: 'Mabe',
    model: 'Aqua Saver Green 19 Kg',
    symptom: 'Agita 3 segundos y se detiene parpadeando todos los leds',
    diagnosis: 'Sensor de peso y velocidad Hall averiado bajo la polea del motor',
    partsReplaced: ['Sensor Hall de velocidad Mabe Kraken', 'Correa de tracción 4PJ'],
    laborCost: 60000,
    partsCost: 48000,
    transportCost: 15000,
    totalCost: 123000,
    currency: 'COP',
    warrantyDays: 90,
    status: 'En Espera de Repuesto',
    date: '2026-10-24'
  }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('diagnostico');
  const [selectedGuide, setSelectedGuide] = useState<RepairGuide | null>(null);
  const [showSafetyModal, setShowSafetyModal] = useState<boolean>(false);
  const [selectedBrandForCodes, setSelectedBrandForCodes] = useState<string>('Todas');

  // Budget state passed across modules
  const [budgetParts, setBudgetParts] = useState<{ description: string; unitPrice: number }[]>([]);

  // Local storage for history records
  const [repairRecords, setRepairRecords] = useState<RepairRecord[]>(() => {
    try {
      const saved = localStorage.getItem('repara_lavadoras_records');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_REPAIR_RECORDS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('repara_lavadoras_records', JSON.stringify(repairRecords));
    } catch {
      // ignore
    }
  }, [repairRecords]);

  const handleAddPartToBudget = (part: { description: string; unitPrice: number }) => {
    setBudgetParts((prev) => [...prev, part]);
  };

  const handleAddRecord = (record: RepairRecord) => {
    setRepairRecords((prev) => [record, ...prev]);
  };

  const handleDeleteRecord = (id: string) => {
    setRepairRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateStatus = (id: string, status: RepairRecord['status']) => {
    setRepairRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const handleSelectGuideById = (guideId: string) => {
    const guide = REPAIR_GUIDES.find((g) => g.id === guideId);
    if (guide) {
      setSelectedGuide(guide);
    }
  };

  const handleBrandSelectForCodes = (brand: string) => {
    setSelectedBrandForCodes(brand);
    setCurrentTab('codigos');
  };

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans text-slate-900 flex flex-col selection:bg-slate-900 selection:text-white">
      
      {/* Top Bar Contract Header */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        onOpenSafety={() => setShowSafetyModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-12">
        {currentTab === 'diagnostico' && (
          <DiagnosticWizard
            onSelectGuide={(guide) => setSelectedGuide(guide)}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onSelectErrorCodeBrand={handleBrandSelectForCodes}
          />
        )}

        {currentTab === 'manuales' && (
          <CategoriesExplorer
            onSelectGuideById={handleSelectGuideById}
            onOpenGuide={(guide) => setSelectedGuide(guide)}
          />
        )}

        {currentTab === 'codigos' && (
          <BrandErrorCodeExplorer initialBrand={selectedBrandForCodes} />
        )}

        {currentTab === 'multimetro' && (
          <MultimeterTester />
        )}

        {currentTab === 'repuestos' && (
          <PartsCatalog onAddPartToBudget={handleAddPartToBudget} />
        )}

        {currentTab === 'presupuestos' && (
          <BudgetCalculator
            initialParts={budgetParts}
            onSaveToHistory={handleAddRecord}
          />
        )}

        {currentTab === 'historial' && (
          <RepairHistory
            records={repairRecords}
            onAddRecord={handleAddRecord}
            onDeleteRecord={handleDeleteRecord}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </main>

      {/* Guide Modal */}
      {selectedGuide && (
        <RepairGuideModal
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
          onAddPartToBudget={handleAddPartToBudget}
        />
      )}

      {/* Safety Protocol Modal */}
      {showSafetyModal && (
        <SafetyProtocolModal onClose={() => setShowSafetyModal(false)} />
      )}

      {/* Mobile Fixed Bottom Navigation Bar (Pattern 1: Thumb Navigation) */}
      <nav 
        aria-label="Navegación móvil"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-5 items-center h-16 px-1"
      >
        <button
          onClick={() => setCurrentTab('diagnostico')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            currentTab === 'diagnostico' ? 'text-slate-900 font-bold' : 'text-slate-500'
          }`}
        >
          <Wrench className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Diagnóstico</span>
        </button>

        <button
          onClick={() => setCurrentTab('manuales')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            currentTab === 'manuales' ? 'text-slate-900 font-bold' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Manuales</span>
        </button>

        <button
          onClick={() => setCurrentTab('codigos')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            currentTab === 'codigos' ? 'text-slate-900 font-bold' : 'text-slate-500'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Códigos</span>
        </button>

        <button
          onClick={() => setCurrentTab('multimetro')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            currentTab === 'multimetro' ? 'text-slate-900 font-bold' : 'text-slate-500'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Multímetro</span>
        </button>

        <button
          onClick={() => setCurrentTab('presupuestos')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            currentTab === 'presupuestos' ? 'text-slate-900 font-bold' : 'text-slate-500'
          }`}
        >
          <Receipt className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Cotizar</span>
        </button>
      </nav>

      {/* Quiet Technical Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_5.05.52_PM_2386b5cd.jpeg"
              alt="Foto de perfil Servicio Técnico RDTERCNOLOGY"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover bg-slate-950 p-0.5 border border-sky-500 shrink-0 shadow-sm"
            />
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight">SERVICIO TÉCNICO RDTERCNOLOGY</span>
              <span className="mx-2 text-slate-300">·</span>
              <span>Manual Técnico & Diagnóstico Profesional de Lavadoras</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <span>Whirlpool · LG · Samsung · Mabe · Haceb · Bosch · Electrolux</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">Modo Offline Habilitado</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
