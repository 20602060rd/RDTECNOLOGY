import React, { useState } from 'react';
import { RepairRecord } from '../types';
import { 
  History, 
  Search, 
  Plus, 
  Download, 
  Trash2, 
  Calendar, 
  Phone, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';

interface RepairHistoryProps {
  records: RepairRecord[];
  onAddRecord: (record: RepairRecord) => void;
  onDeleteRecord: (id: string) => void;
  onUpdateStatus: (id: string, status: RepairRecord['status']) => void;
}

export const RepairHistory: React.FC<RepairHistoryProps> = ({
  records,
  onAddRecord,
  onDeleteRecord,
  onUpdateStatus
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [showAddModal, setShowAddModal] = useState(false);

  // New record form states
  const [newClient, setNewClient] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newBrand, setNewBrand] = useState('Whirlpool');
  const [newModel, setNewModel] = useState('');
  const [newSymptom, setNewSymptom] = useState('');
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const [newParts, setNewParts] = useState('');
  const [newTotal, setNewTotal] = useState('');
  const [newWarranty, setNewWarranty] = useState('90');

  const statuses = ['Todos', 'Diagnosticado', 'En Espera de Repuesto', 'En Reparación', 'Reparada', 'Entregada con Garantía'];

  const filteredRecords = records.filter((rec) => {
    const matchesStatus = statusFilter === 'Todos' || rec.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      rec.clientName.toLowerCase().includes(query) ||
      rec.brand.toLowerCase().includes(query) ||
      rec.symptom.toLowerCase().includes(query) ||
      rec.clientPhone.includes(query);

    return matchesStatus && matchesSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.trim()) return;

    const record: RepairRecord = {
      id: Date.now().toString(),
      clientName: newClient.trim(),
      clientPhone: newPhone.trim(),
      brand: newBrand,
      model: newModel.trim() || 'No especificado',
      symptom: newSymptom.trim() || 'Revisión técnica',
      diagnosis: newDiagnosis.trim() || 'Diagnóstico general',
      partsReplaced: newParts ? newParts.split(',').map((p) => p.trim()) : [],
      laborCost: 60000,
      partsCost: parseFloat(newTotal) ? parseFloat(newTotal) - 60000 : 0,
      transportCost: 0,
      totalCost: parseFloat(newTotal) || 60000,
      currency: 'COP',
      warrantyDays: parseInt(newWarranty, 10) || 90,
      status: 'Diagnosticado',
      date: new Date().toLocaleDateString('es-CO')
    };

    onAddRecord(record);
    setShowAddModal(false);
    setNewClient('');
    setNewPhone('');
    setNewModel('');
    setNewSymptom('');
    setNewDiagnosis('');
    setNewParts('');
    setNewTotal('');
  };

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bitacora_reparaciones_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getStatusBadge = (status: RepairRecord['status']) => {
    switch (status) {
      case 'Reparada':
      case 'Entregada con Garantía':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'En Reparación':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'En Espera de Repuesto':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Gestión de Servicios Técnicos</span>
            <span aria-hidden="true">·</span>
            <span>Almacenamiento Local Seguro</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Bitácora e Historial de Reparaciones
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mt-1 leading-relaxed">
            Lleva el registro de clientes, síntomas, repuestos instalados, cobro total y vigencia de garantías. Funciona 100% offline.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={exportJSON}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            title="Descargar copia de seguridad"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Reparación</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
        
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por cliente, marca, teléfono o síntoma..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Records List */}
      <div className="space-y-3">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-all space-y-3 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {record.clientName}
                  </h3>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getStatusBadge(record.status)}`}>
                    {record.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {record.clientPhone || 'Sin teléfono'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {record.date}
                  </span>
                </div>
              </div>

              <div className="text-right flex items-center gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Cobrado</span>
                  <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                    $ {record.totalCost.toLocaleString('es-CO')} COP
                  </span>
                </div>
                <button
                  onClick={() => onDeleteRecord(record.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                  title="Eliminar registro"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-900 block mb-0.5">Equipo:</span>
                <p className="text-slate-700">Lavadora {record.brand} ({record.model})</p>
                <p className="text-slate-500 mt-1"><strong>Falla:</strong> {record.symptom}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-900 block mb-0.5">Repuestos Instalados:</span>
                <p className="text-slate-700">
                  {record.partsReplaced && record.partsReplaced.length > 0
                    ? record.partsReplaced.join(', ')
                    : 'Sin piezas sustituidas (Mantenimiento / Ajuste)'}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Garantía Otorgada:</span>
                  <p className="text-slate-700 font-semibold">{record.warrantyDays} días de cobertura técnica</p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-2">
                  <span className="text-[11px] text-slate-500">Cambiar estado:</span>
                  <select
                    value={record.status}
                    onChange={(e) => onUpdateStatus(record.id, e.target.value as RepairRecord['status'])}
                    className="text-[11px] bg-white border border-slate-200 rounded px-2 py-0.5"
                  >
                    <option value="Diagnosticado">Diagnosticado</option>
                    <option value="En Espera de Repuesto">En Espera</option>
                    <option value="En Reparación">En Reparación</option>
                    <option value="Reparada">Reparada</option>
                    <option value="Entregada con Garantía">Entregada</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredRecords.length === 0 && (
          <div className="p-10 text-center bg-white rounded-xl border border-slate-200">
            <History className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800">
              No hay servicios registrados con este criterio
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Guarda tus presupuestos o haz clic en "Nueva Reparación" para registrar un servicio técnico.
            </p>
          </div>
        )}
      </div>

      {/* Modal Add Manual Record */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Registrar Nuevo Servicio Técnico
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nombre del Cliente *</label>
                <input
                  type="text"
                  required
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  placeholder="Ej. María Gómez"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="300 123 4567"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Marca</label>
                  <select
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="Whirlpool">Whirlpool</option>
                    <option value="LG">LG</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Mabe">Mabe</option>
                    <option value="Haceb">Haceb</option>
                    <option value="Electrolux">Electrolux</option>
                    <option value="Bosch">Bosch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Síntoma reportado</label>
                <input
                  type="text"
                  value={newSymptom}
                  onChange={(e) => setNewSymptom(e.target.value)}
                  placeholder="Ej. No desagua, suena feo al centrifugar..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Repuestos utilizados (separados por coma)</label>
                <input
                  type="text"
                  value={newParts}
                  onChange={(e) => setNewParts(e.target.value)}
                  placeholder="Ej. Bomba Askoll, Retén 37x66, Grasa marina"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Total Cobrado COP</label>
                  <input
                    type="number"
                    value={newTotal}
                    onChange={(e) => setNewTotal(e.target.value)}
                    placeholder="Ej. 135000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Garantía (días)</label>
                  <select
                    value={newWarranty}
                    onChange={(e) => setNewWarranty(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="30">30 días</option>
                    <option value="60">60 días</option>
                    <option value="90">90 días</option>
                    <option value="180">180 días (6 meses)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-semibold"
                >
                  Guardar Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
