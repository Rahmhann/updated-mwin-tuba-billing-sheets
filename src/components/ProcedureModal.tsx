import React, { useState, useEffect } from 'react';
import { BillingItem, CategoryType } from '../types';
import { X, Check } from 'lucide-react';

interface ProcedureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<BillingItem, 'no'> & { no?: number }) => void;
  itemToEdit?: BillingItem | null;
  suggestedNo: number;
}

const CATEGORIES: Exclude<CategoryType, 'All'>[] = [
  "General Surgery",
  "Proctology",
  "Gynaecology",
  "Urology",
  "Diagnostics",
  "Cardiothoracic & Gastric",
  "Other Procedures"
];

export default function ProcedureModal({
  isOpen,
  onClose,
  onSave,
  itemToEdit,
  suggestedNo
}: ProcedureModalProps) {
  const [no, setNo] = useState<number>(suggestedNo);
  const [procedure, setProcedure] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [cost, setCost] = useState<number | ''>('');
  const [narrative, setNarrative] = useState('');
  const [category, setCategory] = useState<string>("General Surgery");
  const [error, setError] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setNo(itemToEdit.no);
      setProcedure(itemToEdit.procedure);
      setDiagnosis(itemToEdit.diagnosis);
      setCost(itemToEdit.cost);
      setNarrative(itemToEdit.narrative);
      setCategory(itemToEdit.category);
    } else {
      setNo(suggestedNo);
      setProcedure('');
      setDiagnosis('');
      setCost('');
      setNarrative('');
      setCategory("General Surgery");
    }
    setError('');
  }, [itemToEdit, suggestedNo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!procedure.trim()) {
      setError('Procedure name is required');
      return;
    }
    if (!diagnosis.trim()) {
      setError('Diagnosis is required');
      return;
    }
    if (cost === '' || isNaN(Number(cost)) || Number(cost) < 0) {
      setError('Cost must be a valid non-negative number');
      return;
    }

    onSave({
      no: no || suggestedNo,
      procedure: procedure.trim(),
      diagnosis: diagnosis.trim(),
      cost: Number(cost),
      narrative: narrative.trim(),
      category
    });
    onClose();
  };

  return (
    <div id="modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C28]/40 backdrop-blur-sm">
      <div 
        id="modal-container"
        className="w-full max-w-lg bg-brand-card rounded-2xl shadow-xl border border-brand-border overflow-hidden transform transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-brand-bg border-b border-brand-border">
          <h3 className="text-lg font-serif font-semibold text-brand-text">
            {itemToEdit ? `Edit Entry #${itemToEdit.no}` : 'Add New Medical Procedure'}
          </h3>
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="p-1.5 text-brand-muted hover:text-brand-text hover:bg-brand-hover rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div id="modal-error" className="p-3 text-sm text-brand-red bg-brand-red/10 border border-brand-red/20 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            {/* Number (Readonly or custom) */}
            <div className="col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-1">
                Item No.
              </label>
              <input
                id="field-no"
                type="number"
                value={no}
                onChange={(e) => setNo(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm bg-brand-bg/50 text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
                placeholder="No."
                disabled={!!itemToEdit} // Lock item number during edits to preserve identity
              />
            </div>

            {/* Category */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-1">
                Category
              </label>
              <select
                id="field-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm bg-brand-bg text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Procedure Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-1">
              Procedure Name *
            </label>
            <input
              id="field-procedure"
              type="text"
              value={procedure}
              onChange={(e) => setProcedure(e.target.value)}
              className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm bg-brand-bg text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
              placeholder="e.g. Laparoscopic Appendicectomy"
              required
            />
          </div>

          {/* Diagnosis */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-1">
              Diagnosis / Indication *
            </label>
            <input
              id="field-diagnosis"
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm bg-brand-bg text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
              placeholder="e.g. Acute Appendicitis"
              required
            />
          </div>

          {/* Cost */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-1">
              Cost (Ghana Cedis - GH₵) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-brand-muted text-sm font-medium">GH₵</span>
              <input
                id="field-cost"
                type="number"
                min="0"
                step="any"
                value={cost}
                onChange={(e) => setCost(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-12 pr-3 py-2 border border-brand-border rounded-lg text-sm bg-brand-bg text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-medium font-mono"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Narrative */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-1">
              Narrative & Included Services
            </label>
            <textarea
              id="field-narrative"
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm bg-brand-bg text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green resize-none"
              placeholder="Detail what is included (e.g. Anaesthesia fees, pre-op labs, 2 nights stay, drugs...)"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-brand-border">
            <button
              id="cancel-modal-btn"
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-brand-border text-brand-secondary rounded-lg text-sm font-medium hover:bg-brand-hover transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="submit-modal-btn"
              type="submit"
              className="flex items-center justify-center space-x-2 px-5 py-2 bg-brand-green hover:bg-brand-green-hover text-white rounded-lg text-sm font-medium shadow-sm transition-colors cursor-pointer"
            >
              <Check size={16} />
              <span>{itemToEdit ? 'Save Changes' : 'Create Entry'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
