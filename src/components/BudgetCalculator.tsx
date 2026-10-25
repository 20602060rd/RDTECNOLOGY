import React, { useState } from 'react';
import { BudgetQuote, RepairRecord } from '../types';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Copy, 
  Printer, 
  Check, 
  DollarSign, 
  ShieldCheck, 
  Send,
  Save
} from 'lucide-react';

interface BudgetCalculatorProps {
  initialParts?: { description: string; unitPrice: number }[];
  onSaveToHistory?: (record: RepairRecord) => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
  initialParts = [],
  onSaveToHistory
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [brand, setBrand] = useState('Samsung');
  const [model, setModel] = useState('');
  const [failureDescription, setFailureDescription] = useState('La lavadora no desagua ni centrifuga');
  const [technicianName, setTechnicianName] = useState('Servicio Técnico RDTERCNOLOGY');
  const [workshopPhone, setWorkshopPhone] = useState('3106338295');
  
  const [currency, setCurrency] = useState<'COP' | 'USD'>('COP');
  const [warrantyPeriod, setWarrantyPeriod] = useState('90 días de garantía');
  
  // Precios con recargo del +40% aplicado
  const [items, setItems] = useState<{ id: string; description: string; quantity: number; unitPrice: number }[]>(
    initialParts.length > 0
      ? initialParts.map((p, i) => ({ id: `p-${i}`, description: p.description, quantity: 1, unitPrice: p.unitPrice }))
      : [
          { id: '1', description: 'Bomba de desagüe magnética 110V nueva (+40%)', quantity: 1, unitPrice: 63000 },
          { id: '2', description: 'Abrazaderas elásticas de alta presión (+40%)', quantity: 2, unitPrice: 5600 }
        ]
  );

  const [laborCost, setLaborCost] = useState<number>(91000); // 65.000 + 40%
  const [transportCost, setTransportCost] = useState<number>(28000); // 20.000 + 40%
  const [discount, setDiscount] = useState<number>(0);

  const [copyFeedback, setCopyFeedback] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  // New item form
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const addItem = () => {
    if (!newItemDesc.trim()) return;
    const price = parseFloat(newItemPrice) || 0;
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        description: newItemDesc.trim(),
        quantity: 1,
        unitPrice: price
      }
    ]);
    setNewItemDesc('');
    setNewItemPrice('');
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const partsTotal = items.reduce((acc, curr) => acc + curr.quantity * curr.unitPrice, 0);
  const subtotal = partsTotal + laborCost + transportCost;
  const grandTotal = Math.max(0, subtotal - discount);

  const formatCurrency = (val: number) => {
    if (currency === 'COP') {
      return `$ ${val.toLocaleString('es-CO')} COP`;
    }
    return `$ ${val.toFixed(2)} USD`;
  };

  const generateWhatsAppText = () => {
    const lines = [
      `🔧 *SERVICIO TÉCNICO RDTERCNOLOGY* 🔧`,
      `*Especialistas en Reparación de Lavadoras*`,
      `📞 *WhatsApp / Atención:* 310 633 8295`,
      `---------------------------------`,
      `*Técnico Responsable:* ${technicianName}`,
      `*Cliente:* ${clientName || 'Particular'}`,
      clientPhone ? `*Teléfono Cliente:* ${clientPhone}` : '',
      `*Equipo:* Lavadora ${brand} ${model ? `(Mod. ${model})` : ''}`,
      `*Diagnóstico:* ${failureDescription}`,
      `---------------------------------`,
      `*DETALLE DE REPUESTOS Y MATERIALES (+40%):*`,
      ...items.map(
        (it) => `• ${it.quantity}x ${it.description}: ${formatCurrency(it.quantity * it.unitPrice)}`
      ),
      `---------------------------------`,
      `*Mano de Obra Calificada:* ${formatCurrency(laborCost)}`,
      transportCost > 0 ? `*Transporte / Visita a Domicilio:* ${formatCurrency(transportCost)}` : '',
      discount > 0 ? `*Descuento Aplicado:* -${formatCurrency(discount)}` : '',
      `*VALOR TOTAL COTIZADO:* ${formatCurrency(grandTotal)}`,
      `---------------------------------`,
      `🛡️ *Garantía:* ${warrantyPeriod}`,
      `✅ Incluye prueba final de estanqueidad, centrifugado y seguridad eléctrica.`,
      `\n_Quedamos atentos a su confirmación para proceder con la reparación._`
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleCopyWhatsApp = () => {
    const text = generateWhatsAppText();
    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  const handleOpenWhatsAppDirect = () => {
    const text = generateWhatsAppText();
    // Default to workshop number 3106338295 or client number
    const targetPhone = workshopPhone.replace(/\D/g, '') || '3106338295';
    const url = `https://wa.me/57${targetPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToHistory = () => {
    if (!onSaveToHistory) return;
    const record: RepairRecord = {
      id: Date.now().toString(),
      clientName: clientName || 'Cliente Particular',
      clientPhone: clientPhone || 'N/A',
      address: clientAddress,
      brand,
      model: model || 'Genérica',
      symptom: failureDescription,
      diagnosis: 'Inspección técnica y reemplazo de componentes',
      partsReplaced: items.map((i) => i.description),
      laborCost,
      partsCost: partsTotal,
      transportCost,
      totalCost: grandTotal,
      currency,
      warrantyDays: warrantyPeriod.includes('90') ? 90 : warrantyPeriod.includes('60') ? 60 : 30,
      status: 'Diagnosticado',
      date: new Date().toLocaleDateString('es-CO')
    };

    onSaveToHistory(record);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2500);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Title */}
      <div className="print:hidden">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <span>Herramienta de Facturación y Cotización</span>
          <span aria-hidden="true">·</span>
          <span>Pesos Colombianos (COP)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Generador de Presupuestos para Clientes
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
          Arma presupuestos detallados con desglose de repuestos, mano de obra, visita a domicilio y póliza de garantía para entregar al cliente o enviar por WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form: Client & Budget Inputs */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm print:hidden">
          
          {/* Client & Machine data */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              1. Datos del Cliente y Electrodoméstico
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Nombre del Cliente:</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej. Carlos Mendoza"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Teléfono / WhatsApp:</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Ej. 312 456 7890"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Marca de Lavadora:</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="Whirlpool">Whirlpool</option>
                  <option value="LG">LG</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Mabe">Mabe</option>
                  <option value="Haceb">Haceb (Colombia)</option>
                  <option value="Electrolux">Electrolux</option>
                  <option value="Bosch">Bosch</option>
                  <option value="Centrales">Centrales</option>
                  <option value="Maytag">Maytag</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Modelo / Capacidad (Kg):</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Ej. WF1104 / 16 Kg Inverter"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="mt-3 text-xs">
              <label className="text-slate-600 font-semibold mb-1 block">Falla Diagnosticada:</label>
              <input
                type="text"
                value={failureDescription}
                onChange={(e) => setFailureDescription(e.target.value)}
                placeholder="Descripción del problema encontrado..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Parts itemized list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. Repuestos y Materiales a Instalar
              </h3>
              <span className="text-xs font-mono font-bold text-slate-800">
                Total Repuestos: {formatCurrency(partsTotal)}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex-1 font-medium text-slate-900">
                    {item.description}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-slate-200 bg-white rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono font-bold text-slate-800 tabular-nums min-w-[70px] text-right">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </span>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Eliminar repuesto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick add item inputs */}
            <div className="flex flex-col sm:flex-row gap-2 text-xs">
              <input
                type="text"
                value={newItemDesc}
                onChange={(e) => setNewItemDesc(e.target.value)}
                placeholder="Descripción del repuesto (ej. Retén 37x66)..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <input
                type="number"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                placeholder="Precio unitario COP"
                className="w-full sm:w-36 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold flex items-center justify-center gap-1 hover:bg-slate-800 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
          </div>

          {/* Labor, Transport and Warranty */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              3. Mano de Obra, Transporte y Garantía
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Mano de Obra Calificada:</label>
                <input
                  type="number"
                  value={laborCost}
                  onChange={(e) => setLaborCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Transporte / Domicilio:</label>
                <input
                  type="number"
                  value={transportCost}
                  onChange={(e) => setTransportCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Póliza de Garantía:</label>
                <select
                  value={warrantyPeriod}
                  onChange={(e) => setWarrantyPeriod(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="30 días de garantía">30 días de garantía</option>
                  <option value="60 días de garantía">60 días de garantía</option>
                  <option value="90 días de garantía">90 días de garantía (Recomendada)</option>
                  <option value="6 meses de garantía">6 meses de garantía</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Live Printable Quote Preview */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quote Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 print:shadow-none print:border-none print:p-0">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_5.05.52_PM_2386b5cd.jpeg"
                  alt="Foto de perfil Servicio Técnico RDTERCNOLOGY"
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover bg-slate-950 p-0.5 border-2 border-sky-500 shrink-0 shadow-md"
                />
                <div>
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block font-mono">
                    COTIZACIÓN OFICIAL
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    SERVICIO TÉCNICO RDTERCNOLOGY
                  </h3>
                  <span className="text-xs text-slate-500">Fecha: {new Date().toLocaleDateString('es-CO')}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-bold text-slate-900 block">
                  ORDEN #{Math.floor(1000 + Math.random() * 9000)}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold">Taller Certificado</span>
              </div>
            </div>

            {/* Client summary */}
            <div className="text-xs text-slate-700 space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Cliente:</span>
                <span className="font-bold text-slate-900">{clientName || 'Particular'}</span>
              </div>
              {clientPhone && (
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Teléfono:</span>
                  <span>{clientPhone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Electrodoméstico:</span>
                <span className="font-bold text-slate-900">Lavadora {brand} {model}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 mt-1">
                <span className="font-semibold text-slate-500">Línea WhatsApp:</span>
                <span className="font-bold text-emerald-700 font-mono">310 633 8295</span>
              </div>
              <div className="pt-0.5 text-[11px] text-slate-600">
                <strong>Motivo:</strong> {failureDescription}
              </div>
            </div>

            {/* Breakdown table */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Conceptos y Costos
                </span>
                <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  +40% margen aplicado
                </span>
              </div>

              {items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-slate-700">
                  <span className="truncate pr-2">
                    {it.quantity}x {it.description}
                  </span>
                  <span className="font-mono tabular-nums text-slate-900 font-medium shrink-0">
                    {formatCurrency(it.quantity * it.unitPrice)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between text-slate-700 pt-1">
                <span>Mano de obra y diagnóstico (+40%)</span>
                <span className="font-mono tabular-nums text-slate-900 font-medium">
                  {formatCurrency(laborCost)}
                </span>
              </div>

              {transportCost > 0 && (
                <div className="flex justify-between text-slate-700">
                  <span>Transporte / Visita técnica (+40%)</span>
                  <span className="font-mono tabular-nums text-slate-900 font-medium">
                    {formatCurrency(transportCost)}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t-2 border-slate-900 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">TOTAL COTIZADO:</span>
                <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>

            {/* Warranty badge */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-950 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{warrantyPeriod} sobre repuestos y mano de obra.</span>
            </div>

            {/* Action buttons (hidden on print) */}
            <div className="space-y-2 pt-2 border-t border-slate-100 print:hidden">
              <button
                onClick={handleOpenWhatsAppDirect}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-md active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Cotización a WhatsApp (310 633 8295)</span>
              </button>

              <button
                onClick={handleCopyWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors border border-slate-200"
              >
                {copyFeedback ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copyFeedback ? '¡Texto Copiado para WhatsApp!' : 'Copiar Texto del Presupuesto'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / PDF</span>
                </button>

                <button
                  onClick={handleSaveToHistory}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{saveFeedback ? '¡Guardado!' : 'Guardar Bitácora'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
