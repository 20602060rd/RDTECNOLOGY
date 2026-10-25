import React from 'react';
import { X, ShieldAlert, Zap, Droplets, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface SafetyProtocolModalProps {
  onClose: () => void;
}

export const SafetyProtocolModal: React.FC<SafetyProtocolModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl overflow-hidden">
        
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Protocolo de Seguridad Técnica Obligatoria
              </h2>
              <span className="text-xs text-slate-500">
                Normas de protección para técnicos de línea blanca
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-950 uppercase tracking-wider text-xs">
              <Zap className="w-4 h-4 text-rose-600" />
              <span>1. Desconexión de Red Eléctrica (110V / 220V)</span>
            </div>
            <p className="text-rose-900">
              Antes de aflojar cualquier tornillo de la tapa trasera, panel de control o motor, <strong>desconecta la clavija de la toma de corriente</strong>. Nunca intervengas componentes con la lavadora energizada. Las pruebas con multímetro de resistencia (Ω) y continuidad siempre se realizan sin energía.
            </p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-950 uppercase tracking-wider text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>2. Descarga de Condensadores de Alta Capacidad</span>
            </div>
            <p className="text-amber-900">
              Las tarjetas electrónicas Inverter y los motores con condensador retienen tensiones de hasta <strong>350 VDC</strong> incluso varios minutos después de desconectar la máquina. Descarga siempre los condensadores con una resistencia cerámica de 1 kΩ 10W o bombilla incandescente antes de tocar pistas o bornes.
            </p>
          </div>

          <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-sky-950 uppercase tracking-wider text-xs">
              <Droplets className="w-4 h-4 text-sky-600" />
              <span>3. Control Hidráulico e Inundaciones</span>
            </div>
            <p className="text-sky-900">
              Cierra las llaves de suministro de agua fría y caliente antes de desenroscar mangueras. Al retirar la bomba de drenaje o el filtro de motas, coloca siempre una bandeja plana y toallas secas para evitar que el agua residual penetre el motor o cableados inferiores.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>4. Elementos de Protección Personal (EPP)</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Guantes de nitrilo o protección dieléctrica contra cantos afilados del gabinete de chapa metálica.</li>
              <li>Gafas de seguridad al extraer resortes de amortiguación o martillar rodamientos.</li>
              <li>Calzado con suela de goma dieléctrica antiestática.</li>
            </ul>
          </div>

        </div>

        <div className="flex justify-end pt-2 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            Entendido, Proceder con Precaución
          </button>
        </div>

      </div>
    </div>
  );
};
