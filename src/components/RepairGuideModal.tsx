import React, { useState } from 'react';
import { RepairGuide, SparePart } from '../types';
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Gauge, 
  Wrench, 
  ChevronRight, 
  HelpCircle, 
  ListChecks, 
  FileText,
  PlusCircle
} from 'lucide-react';

interface RepairGuideModalProps {
  guide: RepairGuide;
  onClose: () => void;
  onAddPartToBudget?: (part: { description: string; unitPrice: number }) => void;
}

export const RepairGuideModal: React.FC<RepairGuideModalProps> = ({
  guide,
  onClose,
  onAddPartToBudget
}) => {
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [completedChecks, setCompletedChecks] = useState<Record<string, boolean>>({});
  const [addedPartFeedback, setAddedPartFeedback] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setCompletedChecks((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddPart = (part: { name: string; avgPriceCOP: number }) => {
    if (onAddPartToBudget) {
      onAddPartToBudget({
        description: part.name,
        unitPrice: part.avgPriceCOP
      });
      setAddedPartFeedback(`Añadido: ${part.name}`);
      setTimeout(() => setAddedPartFeedback(null), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>{guide.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {guide.estimatedTime}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-slate-400" />
                Dificultad {guide.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {guide.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Cerrar ficha"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-slate-100 border-b border-slate-200 overflow-x-auto no-scrollbar">
          {[
            { step: 1, label: '1. Identificar' },
            { step: 2, label: '2. Revisiones' },
            { step: 3, label: '3. Causa Raíz' },
            { step: 4, label: '4. Reparación' },
            { step: 5, label: '5. Verificación' },
            { step: 6, label: 'Repuestos & Multímetro' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStepTab(item.step)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeStepTab === item.step
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Added part feedback badge */}
        {addedPartFeedback && (
          <div className="bg-emerald-600 text-white px-6 py-1.5 text-xs font-medium flex items-center justify-between">
            <span>{addedPartFeedback}</span>
            <span className="text-emerald-100 text-[11px]">Guardado en Presupuestos</span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* STEP 1: IDENTIFICAR */}
          {activeStepTab === 1 && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
                  <HelpCircle className="w-4 h-4 text-sky-600" />
                  <span>Pregunta clave de diagnóstico:</span>
                </div>
                <p className="text-base text-slate-700 font-medium">
                  {guide.step1Identify.question}
                </p>
              </div>

              {guide.imagePath && (
                <div className="rounded-xl overflow-hidden border border-slate-200 max-h-64">
                  <img
                    src={guide.imagePath}
                    alt={guide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Síntomas y comprobaciones iniciales del usuario
                </h3>
                <div className="space-y-2.5">
                  {guide.step1Identify.checklist.map((item, idx) => {
                    const checkId = `step1-${idx}`;
                    const isChecked = !!completedChecks[checkId];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCheck(checkId)}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-5 h-5 shrink-0 mt-0.5 ${
                            isChecked ? 'text-emerald-600' : 'text-slate-300'
                          }`}
                        />
                        <span className="text-sm">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveStepTab(2)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <span>Continuar a Revisiones Iniciales</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: REVISIONES INICIALES */}
          {activeStepTab === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {guide.step2InitialChecks.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Descarta causas externas sencillas antes de intervenir componentes o desarmar la lavadora.
                </p>

                <div className="space-y-3">
                  {guide.step2InitialChecks.items.map((check, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {check}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety warning box */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Advertencia de Seguridad</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-amber-900">
                  {guide.safetyWarnings.map((warn, idx) => (
                    <li key={idx}>{warn}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveStepTab(1)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setActiveStepTab(3)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <span>Determinar Causa Raíz</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DETERMINAR LA CAUSA */}
          {activeStepTab === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {guide.step3RootCause.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Diferencia entre fallas mecánicas, bobinas quemadas y problemas de tarjeta electrónica.
                </p>

                <div className="space-y-4">
                  {guide.step3RootCause.probableCauses.map((cause, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">
                          {cause.cause}
                        </span>
                        <span className="text-xs font-semibold text-slate-600">
                          Probabilidad: {cause.probability}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        <strong className="text-slate-800">Cómo confirmar:</strong> {cause.howToConfirm}
                      </p>
                      {cause.multimeterCheck && (
                        <div className="mt-2 p-2.5 bg-slate-50 rounded-lg text-xs font-mono text-slate-700 border border-slate-100">
                          <strong className="font-sans font-semibold text-slate-900 block mb-0.5">
                            Prueba con Multímetro:
                          </strong>
                          {cause.multimeterCheck}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveStepTab(2)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setActiveStepTab(4)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <span>Procedimiento de Reparación</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REPARACIÓN */}
          {activeStepTab === 4 && (
            <div className="space-y-6">
              {/* Tools needed */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  <Wrench className="w-4 h-4 text-slate-700" />
                  <span>Herramientas requeridas para esta reparación</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {guide.toolsNeeded.map((tool, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disassembly */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  Secuencia de Desmontaje
                </h4>
                <div className="space-y-2.5">
                  {guide.step4RepairProcedure.disassemblySteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                      <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Replacement */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  Instalación y Montaje de Piezas
                </h4>
                <div className="space-y-2.5">
                  {guide.step4RepairProcedure.replacementSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                      <span className="w-5 h-5 rounded-md bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              {guide.step4RepairProcedure.tips.length > 0 && (
                <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
                  <span className="text-xs font-bold text-sky-900 block mb-1">
                    Consejo Técnico de Campo:
                  </span>
                  {guide.step4RepairProcedure.tips.map((tip, idx) => (
                    <p key={idx} className="text-xs text-sky-800">{tip}</p>
                  ))}
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveStepTab(3)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setActiveStepTab(5)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <span>Prueba Final & Verificación</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: VERIFICACIÓN FINAL */}
          {activeStepTab === 5 && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <h4 className="text-sm font-bold text-emerald-950 mb-1">
                  Ciclo de prueba recomendado
                </h4>
                <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                  {guide.step5FinalVerification.testCycle}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  Lista de comprobación de seguridad y estanqueidad
                </h4>
                <div className="space-y-2.5">
                  {guide.step5FinalVerification.safetyChecks.map((check, idx) => {
                    const checkId = `step5-${idx}`;
                    const isChecked = !!completedChecks[checkId];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCheck(checkId)}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-5 h-5 shrink-0 mt-0.5 ${
                            isChecked ? 'text-emerald-600' : 'text-slate-300'
                          }`}
                        />
                        <span className="text-xs font-medium">{check}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-900 block mb-1">
                  Criterio de Entrega Técnica:
                </span>
                <p className="text-xs text-slate-600">
                  {guide.step5FinalVerification.acceptanceCriteria}
                </p>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveStepTab(4)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setActiveStepTab(6)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <span>Ver Repuestos y Multímetro</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: REPUESTOS Y TABLA DE MULTÍMETRO */}
          {activeStepTab === 6 && (
            <div className="space-y-6">
              {/* Multimeter table */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Valores de Prueba con Multímetro Documentados
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Componente</th>
                        <th className="p-3">Rango Nominal</th>
                        <th className="p-3">Cortocircuito</th>
                        <th className="p-3">Circuito Abierto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {guide.testValues.map((val, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 font-mono text-slate-800">
                          <td className="p-3 font-sans font-medium text-slate-900">{val.component}</td>
                          <td className="p-3 text-emerald-700 font-semibold">{val.nominal}</td>
                          <td className="p-3 text-rose-700">{val.shortCircuit}</td>
                          <td className="p-3 text-amber-700">{val.openCircuit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Compatible parts list */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Repuestos Compatibles Sugeridos (Precios ref. Colombia)
                </h4>
                <div className="space-y-3">
                  {guide.compatibleParts.map((part, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900">{part.name}</div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>Ref: {part.reference}</span>
                          <span aria-hidden="true">·</span>
                          <span>{part.specs}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                          $ {part.avgPriceCOP.toLocaleString('es-CO')} COP
                        </span>
                        {onAddPartToBudget && (
                          <button
                            onClick={() => handleAddPart(part)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
                            title="Agregar al presupuesto del cliente"
                          >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>Agregar</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveStepTab(5)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Volver a Verificación
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Cerrar Ficha
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
