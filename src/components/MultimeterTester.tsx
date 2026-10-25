import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, HelpCircle, Zap } from 'lucide-react';

interface ComponentSpec {
  id: string;
  name: string;
  nominalRangeText: string;
  unit: string;
  minNormal: number;
  maxNormal: number;
  shortThreshold: number;
  multimeterMode: string;
  measurementSteps: string[];
  explanation: string;
  sampleImg?: string;
}

const COMPONENT_SPECS: ComponentSpec[] = [
  {
    id: 'bomba-110v',
    name: 'Bomba de desagüe magnética (110V - 127V)',
    nominalRangeText: '15 Ω a 25 Ω',
    unit: 'Ω',
    minNormal: 15,
    maxNormal: 25,
    shortThreshold: 5,
    multimeterMode: 'Resistencia en escala de 200 Ω (Ohmios)',
    measurementSteps: [
      'Desconectar la lavadora del tomacorriente de la pared.',
      'Retirar los 2 cables faston de la bomba de drenaje.',
      'Colocar una punta de prueba en cada terminal de cobre de la bomba.',
      'Leer el valor en pantalla.'
    ],
    explanation: 'Si la bobina marca menos de 5 Ω, tiene espiras en corto y quemará el triac de la placa. Si marca OL / infinito, el hilo de cobre está fundido.'
  },
  {
    id: 'bomba-220v',
    name: 'Bomba de desagüe magnética (220V - 240V)',
    nominalRangeText: '140 Ω a 180 Ω',
    unit: 'Ω',
    minNormal: 140,
    maxNormal: 180,
    shortThreshold: 30,
    multimeterMode: 'Resistencia en escala de 200 Ω o 2kΩ',
    measurementSteps: [
      'Desconectar la máquina de la corriente.',
      'Desconectar terminales eléctricos de la bomba.',
      'Medir entre bornes.'
    ],
    explanation: 'Las bombas europeas y de 220V usan hilo más delgado con más vueltas, por lo que su resistencia nominal ronda los 160 Ω.'
  },
  {
    id: 'electrovalvula-110v',
    name: 'Bobina de electroválvula de agua (110V - 127V)',
    nominalRangeText: '800 Ω a 1.250 Ω (0.8 kΩ a 1.25 kΩ)',
    unit: 'Ω',
    minNormal: 800,
    maxNormal: 1250,
    shortThreshold: 100,
    multimeterMode: 'Resistencia en escala de 2.000 Ω (2 kΩ)',
    measurementSteps: [
      'Desconectar la clavija eléctrica de la lavadora.',
      'Retirar el conector plástico de la bobina solenoide.',
      'Poner las puntas del multímetro sobre las dos patas de la bobina.'
    ],
    explanation: 'Un valor infinito (OL) significa que el solenoide se abrió por sobrecalentamiento. Debe medir aproximadamente 1 kΩ.'
  },
  {
    id: 'electrovalvula-220v',
    name: 'Bobina de electroválvula de agua (220V)',
    nominalRangeText: '3.500 Ω a 4.500 Ω (3.5 kΩ a 4.5 kΩ)',
    unit: 'Ω',
    minNormal: 3500,
    maxNormal: 4500,
    shortThreshold: 400,
    multimeterMode: 'Resistencia en escala de 20 kΩ',
    measurementSteps: [
      'Desconectar máquina y aislar terminales.',
      'Medir en bornes con multímetro en escala de 20kΩ.'
    ],
    explanation: 'Las válvulas de 220V tienen devanados de alta impedancia nominal (~4kΩ).'
  },
  {
    id: 'resistencia-calefactora',
    name: 'Resistencia eléctrica de inmersión (2000W)',
    nominalRangeText: '18 Ω a 28 Ω',
    unit: 'Ω',
    minNormal: 18,
    maxNormal: 28,
    shortThreshold: 5,
    multimeterMode: 'Resistencia en escala de 200 Ω',
    measurementSteps: [
      'Desconectar la lavadora.',
      'Retirar los dos cables principales de la resistencia.',
      'Medir entre los dos terminales (filamento calefactor).',
      'Prueba de derivación: Medir entre cada terminal y el perno de tierra del chasis (debe marcar OL/infinito).'
    ],
    explanation: 'Ley de Ohm: R = V² / P = (120)² / 2000W ≈ 25 Ω (en 120V) o (220)² / 2000W ≈ 24 Ω (en 220V). Si marca continuidad a chasis, disparará el breaker.'
  },
  {
    id: 'ntc-termistor-10k',
    name: 'Sensor de temperatura NTC (10 kΩ / 12 kΩ a 25°C)',
    nominalRangeText: '10.000 Ω a 12.500 Ω (10 kΩ - 12.5 kΩ)',
    unit: 'Ω',
    minNormal: 9000,
    maxNormal: 13000,
    shortThreshold: 500,
    multimeterMode: 'Resistencia en escala de 20 kΩ',
    measurementSteps: [
      'Desconectar arnés del termistor NTC en la tina.',
      'Medir a temperatura ambiente de ~20-25°C.',
      'Prueba dinámica: Sostener la cápsula metálica con los dedos; la resistencia debe comenzar a disminuir suavemente.'
    ],
    explanation: 'NTC = Coeficiente de Temperatura Negativo. Al subir la temperatura, la resistencia baja. Si marca 0 Ω o infinito, arrojará error tE.'
  },
  {
    id: 'motor-inverter-fase',
    name: 'Devanados de motor Inverter Direct Drive (Fases U - V - W)',
    nominalRangeText: '11.0 Ω a 16.5 Ω (Simétricas entre U-V, V-W, U-W)',
    unit: 'Ω',
    minNormal: 11,
    maxNormal: 17,
    shortThreshold: 3,
    multimeterMode: 'Resistencia en escala de 200 Ω',
    measurementSteps: [
      'Desconectar el conector de 3 cables gruesos del motor estator.',
      'Medir Fase U con Fase V.',
      'Medir Fase V con Fase W.',
      'Medir Fase U con Fase W.',
      'Los tres valores deben ser idénticos con diferencia máxima de 0.5 Ω.'
    ],
    explanation: 'Si una de las 3 fases mide diferente o marca circuito abierto, el motor Inverter vibrará unos segundos y se detendrá con error LE o 3E.'
  },
  {
    id: 'actuador-whirlpool',
    name: 'Motor del actuador de cambio Whirlpool Xpert (Shift Actuator)',
    nominalRangeText: '2.000 Ω a 3.500 Ω (2.0 kΩ - 3.5 kΩ)',
    unit: 'Ω',
    minNormal: 2000,
    maxNormal: 3500,
    shortThreshold: 200,
    multimeterMode: 'Resistencia en escala de 20 kΩ',
    measurementSteps: [
      'Desconectar arnés de 6 pines del actuador debajo de la lavadora.',
      'Localizar los pines 2 y 3 correspondientes al micromotor sincrónico.',
      'Medir con puntas finas entre pines 2 y 3.'
    ],
    explanation: 'Si el motor está quemado (OL), el embrague no bajará a la posición de centrifugado produciendo errores F7E1 / F7E5.'
  }
];

export const MultimeterTester: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string>('bomba-110v');
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpenCircuit, setIsOpenCircuit] = useState<boolean>(false);

  const activeSpec = COMPONENT_SPECS.find((s) => s.id === selectedComponentId) || COMPONENT_SPECS[0];

  // Evaluate reading
  const evaluation = React.useMemo(() => {
    if (isOpenCircuit) {
      return {
        status: 'Circuito Abierto (Quemado / Cortado)',
        color: 'text-amber-800 bg-amber-50 border-amber-300',
        detail: 'El multímetro marca OL / Infinito. El hilo interno del bobinado o filamento se rompió. La pieza NO conducirá corriente y debe ser reemplazada.',
        action: 'Reemplazar componente'
      };
    }

    const num = parseFloat(inputValue);
    if (isNaN(num) || inputValue.trim() === '') {
      return null;
    }

    if (num <= activeSpec.shortThreshold) {
      return {
        status: 'Cortocircuito Severo (< Límite Seguro)',
        color: 'text-rose-800 bg-rose-50 border-rose-300',
        detail: `La resistencia de ${num} ${activeSpec.unit} es excesivamente baja. El aislamiento interno de las espiras se quemó. Si conectas esto a la lavadora, quemará el fusible o destruirá el triac/relé de la tarjeta electrónica.`,
        action: '¡No energizar! Reemplazar pieza de inmediato'
      };
    }

    if (num >= activeSpec.minNormal && num <= activeSpec.maxNormal) {
      return {
        status: 'En Rango Nominal Normal (Operativo)',
        color: 'text-emerald-800 bg-emerald-50 border-emerald-300',
        detail: `La medición de ${num} ${activeSpec.unit} coincide con el rango técnico de fábrica (${activeSpec.nominalRangeText}). La parte eléctrica del componente está en perfecto estado.`,
        action: 'Componente eléctrico bueno. Si persiste la falla, verificar obstrucción mecánica o voltaje de alimentación desde la placa.'
      };
    }

    if (num < activeSpec.minNormal) {
      return {
        status: 'Por debajo del rango nominal (Espiras en fuga)',
        color: 'text-orange-800 bg-orange-50 border-orange-300',
        detail: `Marca ${num} ${activeSpec.unit}, valor inferior al mínimo esperado (${activeSpec.minNormal} ${activeSpec.unit}). Posible recalentamiento previo del devanado.`,
        action: 'Reemplazo preventivo recomendado'
      };
    }

    return {
      status: 'Por encima del rango nominal (Resistencia excesiva)',
      color: 'text-amber-800 bg-amber-50 border-amber-300',
      detail: `Marca ${num} ${activeSpec.unit}, por encima de los ${activeSpec.maxNormal} ${activeSpec.unit} de fábrica. Puede haber sulfato en terminales o filamento degradado.`,
      action: 'Limpiar bornes con lija fina y volver a medir; si persiste, sustituir.'
    };
  }, [inputValue, isOpenCircuit, activeSpec]);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <span>Herramienta de Diagnóstico Eléctrico</span>
          <span aria-hidden="true">·</span>
          <span>Calibración de Componentes</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Comprobador de Valores de Multímetro
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
          Verifica con precisión si una bobina, electroválvula, resistencia o sensor está en buen estado, en cortocircuito o abierto antes de instalarlo o descartarlo.
        </p>
      </div>

      {/* Safety Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-1">
          <strong className="font-bold uppercase tracking-wider block">Regla de Oro de Seguridad Eléctrica:</strong>
          <p>
            Todas las mediciones de resistencia (Ohmios Ω) y continuidad deben realizarse con la lavadora <strong>desconectada de la toma de corriente</strong> y los terminales de la pieza desconectados. Medir resistencia en un circuito con tensión dañará permanentemente tu multímetro.
          </p>
        </div>
      </div>

      {/* Main Tester Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Component Picker & Measurement Input */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
          
          {/* Component selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              1. Selecciona el componente a verificar:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COMPONENT_SPECS.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => {
                    setSelectedComponentId(comp.id);
                    setInputValue('');
                    setIsOpenCircuit(false);
                  }}
                  className={`p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                    selectedComponentId === comp.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold">{comp.name}</div>
                  <div className={`text-[11px] mt-0.5 ${selectedComponentId === comp.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    Nominal: {comp.nominalRangeText}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Multimeter Setting Advice */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
            <Activity className="w-5 h-5 text-slate-700 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">Posición del Selector del Multímetro:</span>
              <span className="text-slate-600 font-mono">{activeSpec.multimeterMode}</span>
            </div>
          </div>

          {/* Value Input Section */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              2. Ingresa el valor leído en la pantalla del multímetro:
            </label>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  step="0.1"
                  disabled={isOpenCircuit}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Ejemplo: ${activeSpec.minNormal}`}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white disabled:opacity-40 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500 font-mono">
                  {activeSpec.unit}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsOpenCircuit(!isOpenCircuit);
                  if (!isOpenCircuit) setInputValue('');
                }}
                className={`px-4 py-3 text-xs font-bold rounded-xl border transition-all whitespace-nowrap ${
                  isOpenCircuit
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                Marca OL / Infinito (1.)
              </button>
            </div>
          </div>

          {/* Verdict Box */}
          {evaluation && (
            <div className={`p-4 rounded-xl border ${evaluation.color} space-y-2`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <h4 className="text-sm font-bold tracking-tight">
                  {evaluation.status}
                </h4>
              </div>
              <p className="text-xs leading-relaxed">
                {evaluation.detail}
              </p>
              <div className="pt-2 text-xs font-semibold">
                <strong>Acción técnica recomendada:</strong> {evaluation.action}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Procedure & Explanation */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Procedimiento de Medición Paso a Paso
            </h3>
            
            <div className="space-y-3">
              {activeSpec.measurementSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-800 font-bold font-mono flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
              <strong className="font-bold text-slate-900 block">Principio Físico:</strong>
              <p className="leading-relaxed">{activeSpec.explanation}</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-56">
            <img
              src="/src/assets/images/washer_drain_pump_testing_1792964966986.jpg"
              alt="Comprobación de terminales con multímetro digital"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>

    </div>
  );
};
