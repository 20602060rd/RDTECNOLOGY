import React, { useState, useMemo } from 'react';
import { RepairGuide, TabType } from '../types';
import { REPAIR_GUIDES } from '../data/diagnosticData';
import { 
  Search, 
  HelpCircle, 
  ArrowRight, 
  Wrench, 
  Droplet, 
  Volume2, 
  Zap, 
  RotateCw, 
  AlertCircle, 
  SlidersHorizontal,
  CheckCircle,
  Clock,
  Gauge
} from 'lucide-react';

interface DiagnosticWizardProps {
  onSelectGuide: (guide: RepairGuide) => void;
  onNavigateTab: (tab: TabType) => void;
  onSelectErrorCodeBrand?: (brand: string) => void;
}

export const DiagnosticWizard: React.FC<DiagnosticWizardProps> = ({
  onSelectGuide,
  onNavigateTab,
  onSelectErrorCodeBrand
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas');
  const [selectedType, setSelectedType] = useState<string>('Todos');

  // Interactive diagnostic wizard states
  const [wizardSymptom, setWizardSymptom] = useState<string>('');
  const [wizardAnswerWaterInTub, setWizardAnswerWaterInTub] = useState<string | null>(null);
  const [wizardAnswerPumpHum, setWizardAnswerPumpHum] = useState<string | null>(null);
  const [wizardAnswerErrorCode, setWizardAnswerErrorCode] = useState<string | null>(null);

  const brands = ['Todas', 'Whirlpool', 'LG', 'Samsung', 'Mabe', 'Haceb', 'Electrolux', 'Bosch'];
  const machineTypes = ['Todos', 'Carga Superior', 'Carga Frontal', 'Inverter'];

  // Filter guides
  const filteredGuides = useMemo(() => {
    return REPAIR_GUIDES.filter((guide) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        guide.title.toLowerCase().includes(query) ||
        guide.summary.toLowerCase().includes(query) ||
        guide.commonSymptoms.some((s) => s.toLowerCase().includes(query));

      return matchesSearch;
    });
  }, [searchQuery]);

  // Compute diagnosis verdict from wizard answers
  const diagnosticVerdict = useMemo(() => {
    if (!wizardSymptom) return null;

    if (wizardSymptom === 'no-desagua') {
      if (wizardAnswerWaterInTub === 'si' && wizardAnswerPumpHum === 'si') {
        return {
          finding: 'Bomba trabada mecánicamente con objeto extraño o aspas atascadas',
          action: 'Limpiar el filtro atrapamotas inferior y revisar turbina con linterna. Si gira forzada, extraer cuerpo extraño.',
          guideId: 'no-desagua',
          urgency: 'Alta'
        };
      }
      if (wizardAnswerWaterInTub === 'si' && wizardAnswerPumpHum === 'no') {
        return {
          finding: 'Bobina de bomba de drenaje abierta (quemada) o triac sin alimentación en placa',
          action: 'Desconectar bomba y medir con multímetro en ohmios (debe medir 15-25 Ω a 110V). Si marca OL, cambiar bomba.',
          guideId: 'no-desagua',
          urgency: 'Crítica'
        };
      }
      return {
        finding: 'Posible obstrucción en manguera exterior o altura de desagüe incorrecta',
        action: 'Verificar que la manguera esté a 85-100 cm del piso y sin estrangulamientos.',
        guideId: 'no-desagua',
        urgency: 'Media'
      };
    }

    if (wizardSymptom === 'no-centrifuga') {
      if (wizardAnswerErrorCode === 'si') {
        return {
          finding: 'Interrupción por sensor de balance o seguro de tapa enclavado',
          action: 'Revisar switch de puerta y varillas de amortiguación.',
          guideId: 'no-centrifuga',
          urgency: 'Alta'
        };
      }
      return {
        finding: 'Falla en actuador de cambio / embrague o condensador de motor',
        action: 'Comprobar leva del embrague y medir actuador o condensador.',
        guideId: 'no-centrifuga',
        urgency: 'Alta'
      };
    }

    if (wizardSymptom === 'ruidos') {
      return {
        finding: 'Desgaste severo de rodamientos o cruceta de tambor fracturada',
        action: 'Comprobar holgura manual empujando el tambor hacia arriba. Si oscila más de 2 mm, sustituir balineras y retén.',
        guideId: 'ruidos-vibra-demasiado',
        urgency: 'Alta'
      };
    }

    return null;
  }, [wizardSymptom, wizardAnswerWaterInTub, wizardAnswerPumpHum, wizardAnswerErrorCode]);

  const resetWizard = () => {
    setWizardSymptom('');
    setWizardAnswerWaterInTub(null);
    setWizardAnswerPumpHum(null);
    setWizardAnswerErrorCode(null);
  };

  const getProblemIcon = (id: string) => {
    switch (id) {
      case 'no-desagua':
        return <Droplet className="w-5 h-5 text-sky-600" />;
      case 'no-llena-agua':
        return <Droplet className="w-5 h-5 text-cyan-600" />;
      case 'no-enciende':
        return <Zap className="w-5 h-5 text-amber-600" />;
      case 'no-centrifuga':
        return <RotateCw className="w-5 h-5 text-indigo-600" />;
      case 'no-lava-o-no-agita':
        return <Wrench className="w-5 h-5 text-emerald-600" />;
      case 'ruidos-vibra-demasiado':
        return <Volume2 className="w-5 h-5 text-rose-600" />;
      case 'presenta-fugas-agua':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      case 'muestra-codigos-error':
        return <HelpCircle className="w-5 h-5 text-purple-600" />;
      default:
        return <Wrench className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Technical Banner */}
      <section className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_5.05.52_PM_2386b5cd.jpeg"
                  alt="Foto de perfil Servicio Técnico RDTERCNOLOGY"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover bg-slate-950 p-0.5 shadow-xl border-2 border-sky-400 shrink-0"
                />
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 block">
                    RDTERCNOLOGY
                  </span>
                  <span className="text-sm font-semibold text-slate-300">
                    Servicio Técnico Especializado de Lavadoras
                  </span>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance leading-tight">
                Manual Técnico y Diagnóstico Profesional
              </h1>
              
              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Diagnóstico guiado por síntomas, comprobaciones con multímetro, despiece de partes y códigos de error oficiales para marcas Whirlpool, LG, Samsung, Mabe, Haceb, Bosch y Electrolux.
              </p>
            </div>

            {/* Smart Search Bar */}
            <div className="space-y-3">
              <label htmlFor="trouble-search" className="sr-only">
                Buscar problema o código
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="trouble-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Escribe el síntoma o código de error: ej. no desagua, vibra, OE, 5E, zumbido..."
                  className="w-full pl-11 pr-4 py-3 bg-white/10 text-white placeholder-slate-400 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm backdrop-blur-sm transition-all"
                />
              </div>

              {/* Brand Shortcuts */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                <span className="text-xs text-slate-400 whitespace-nowrap mr-1">Marcas:</span>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSelectedBrand(brand);
                      if (brand !== 'Todas' && onSelectErrorCodeBrand) {
                        onSelectErrorCodeBrand(brand);
                      }
                    }}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap ${
                      selectedBrand === brand
                        ? 'bg-white text-slate-950 font-bold'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-full">
            <img
              src="/src/assets/images/washer_tech_inspection_1792964965813.jpg"
              alt="Técnico realizando inspección de lavadora con multímetro digital"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:to-transparent" />
          </div>

        </div>
      </section>

      {/* Interactive Guided Diagnostic Flow: Question by question */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Asistente de Diagnóstico por Descarte
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Responde las preguntas paso a paso para aislar la causa raíz sin cambiar piezas innecesariamente.
            </p>
          </div>
          {wizardSymptom && (
            <button
              onClick={resetWizard}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors self-start sm:self-auto"
            >
              Reiniciar Diagnóstico
            </button>
          )}
        </div>

        {/* Question 1: Pick primary symptom */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
            Paso 1: ¿Cuál es la manifestación principal de la avería?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {[
              { id: 'no-desagua', label: 'No desagua / Retiene agua' },
              { id: 'no-centrifuga', label: 'No centrifuga / Ropa mojada' },
              { id: 'no-llena-agua', label: 'No llena / Llenado lento' },
              { id: 'no-enciende', label: 'Completamente muerta' },
              { id: 'no-lava-o-no-agita', label: 'No lava ni agita' },
              { id: 'ruidos', label: 'Ruido excesivo o vibración' },
              { id: 'fugas', label: 'Fugas / Bota agua' },
              { id: 'codigos', label: 'Código de error en display' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setWizardSymptom(item.id);
                  setWizardAnswerWaterInTub(null);
                  setWizardAnswerPumpHum(null);
                  setWizardAnswerErrorCode(null);
                }}
                className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all ${
                  wizardSymptom === item.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question 2 & 3: Contextual follow-up questions */}
        {wizardSymptom === 'no-desagua' && (
          <div className="space-y-4 p-4 bg-white rounded-xl border border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Paso 2: Comprobaciones específicas de desagüe
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-slate-700 mb-2">
                  ¿Queda agua acumulada dentro del tambor de ropa?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setWizardAnswerWaterInTub('si')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border ${
                      wizardAnswerWaterInTub === 'si'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Sí, hay agua en la tina
                  </button>
                  <button
                    onClick={() => setWizardAnswerWaterInTub('no')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border ${
                      wizardAnswerWaterInTub === 'no'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    No, el agua sale pero tarda mucho
                  </button>
                </div>
              </div>

              {wizardAnswerWaterInTub && (
                <div>
                  <p className="text-xs font-medium text-slate-700 mb-2">
                    ¿Se escucha un zumbido eléctrico en la base o hay silencio absoluto?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWizardAnswerPumpHum('si')}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg border ${
                        wizardAnswerPumpHum === 'si'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Sí, zumba pero no saca el agua
                    </button>
                    <button
                      onClick={() => setWizardAnswerPumpHum('no')}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg border ${
                        wizardAnswerPumpHum === 'no'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Silencio absoluto, no zumba
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {wizardSymptom === 'no-centrifuga' && (
          <div className="space-y-4 p-4 bg-white rounded-xl border border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Paso 2: Comprobaciones de centrifugado
            </h3>
            <div>
              <p className="text-xs font-medium text-slate-700 mb-2">
                ¿Aparece algún código como UE, dE o uL en el display?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setWizardAnswerErrorCode('si')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border ${
                    wizardAnswerErrorCode === 'si'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Sí, marca código en pantalla
                </button>
                <button
                  onClick={() => setWizardAnswerErrorCode('no')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border ${
                    wizardAnswerErrorCode === 'no'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  No, simplemente no gira
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Diagnosis Verdict Result Card */}
        {diagnosticVerdict && (
          <div className="p-5 bg-white rounded-xl border border-slate-300 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Diagnóstico Técnico Preliminar
              </span>
              <span className="text-xs font-semibold text-slate-600">
                Urgencia: {diagnosticVerdict.urgency}
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-950">
                {diagnosticVerdict.finding}
              </h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                <strong>Procedimiento inmediato:</strong> {diagnosticVerdict.action}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              {diagnosticVerdict.guideId && (
                <button
                  onClick={() => {
                    const guide = REPAIR_GUIDES.find((g) => g.id === diagnosticVerdict.guideId);
                    if (guide) onSelectGuide(guide);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <span>Abrir Manual Completo Paso a Paso</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onNavigateTab('multimetro')}
                className="px-3.5 py-2 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors"
              >
                Comprobar con Multímetro
              </button>
            </div>
          </div>
        )}

      </section>

      {/* 8 Core Diagnostic Failures Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Las 8 Averías Más Frecuentes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Selecciona una falla para abrir la ficha técnica completa con los 5 apartados de reparación.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {filteredGuides.length} guías documentadas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-slate-100">
                    {getProblemIcon(guide.id)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{guide.estimatedTime}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-3 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Síntomas típicos:
                  </span>
                  <p className="text-xs text-slate-700 line-clamp-2">
                    {guide.commonSymptoms[0]}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2">
                <button
                  onClick={() => onSelectGuide(guide)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <span>Ver Ficha Técnica</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Technical Tools Bento Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div 
          onClick={() => onNavigateTab('codigos')}
          className="bg-slate-50 border border-slate-200 rounded-xl p-5 cursor-pointer hover:bg-slate-100/70 transition-colors flex flex-col justify-between space-y-3"
        >
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Manual de Códigos
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Códigos de Error por Marca
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Consulta significados, pruebas y rutinas de reseteo para LG (OE, IE, LE), Samsung (4E, 5E, 3E), Whirlpool (F02, LD), Mabe y Haceb.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
            <span>Explorar Códigos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('multimetro')}
          className="bg-slate-50 border border-slate-200 rounded-xl p-5 cursor-pointer hover:bg-slate-100/70 transition-colors flex flex-col justify-between space-y-3"
        >
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Comprobador Digital
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Valores de Multímetro (Ω / V)
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Ingresa la lectura en Ohmios o Voltios de la bomba, electroválvula o termistor para saber de inmediato si la pieza está en buen estado.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
            <span>Probar Medición</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('presupuestos')}
          className="bg-slate-50 border border-slate-200 rounded-xl p-5 cursor-pointer hover:bg-slate-100/70 transition-colors flex flex-col justify-between space-y-3"
        >
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Herramienta de Campo
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Presupuestos en Pesos (COP)
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Genera cotizaciones profesionales con mano de obra, repuestos y garantía. Copia directa para enviar por WhatsApp al cliente.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
            <span>Crear Presupuesto</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </section>

    </div>
  );
};
