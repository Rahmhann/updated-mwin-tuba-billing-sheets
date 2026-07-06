import React, { useState, useMemo, useEffect } from 'react';
import { initialBillingItems } from './data';
import { BillingItem, CategoryType } from './types';
import ProcedureModal from './components/ProcedureModal';
import StatsBanner from './components/StatsBanner';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  RotateCcw, 
  Download, 
  Upload, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  FileSpreadsheet, 
  Info,
  SlidersHorizontal,
  X,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Sun,
  Moon,
  Copy
} from 'lucide-react';

export default function App() {
  // --- Persistent State ---
  const [items, setItems] = useState<BillingItem[]>(() => {
    const saved = localStorage.getItem('clinical_procedures');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    return initialBillingItems;
  });

  const saveItems = (newItems: BillingItem[]) => {
    setItems(newItems);
    localStorage.setItem('clinical_procedures', JSON.stringify(newItems));
  };

  // --- Light & Dark Theme State ---
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // --- Search & Filtering States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [minCost, setMinCost] = useState<string>('');
  const [maxCost, setMaxCost] = useState<string>('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // --- Sorting States ---
  const [sortBy, setSortBy] = useState<keyof BillingItem>('no');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // --- Selection / Quotation States ---
  const [viewingItem, setViewingItem] = useState<BillingItem | null>(() => {
    const saved = localStorage.getItem('clinical_procedures');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0];
        }
      } catch (e) {}
    }
    return initialBillingItems[0] || null;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BillingItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<BillingItem | null>(null);

  // --- Notification Toast State ---
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  // --- Derived Statistics and Filter List ---
  // Suggested Next Number for new items
  const suggestedNextNo = useMemo(() => {
    if (items.length === 0) return 1;
    return Math.max(...items.map(item => item.no)) + 1;
  }, [items]);

  // Categories counts mapping
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  // Handle Sort Toggle
  const handleSort = (field: keyof BillingItem) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMinCost('');
    setMaxCost('');
    showToast("Filters successfully cleared", "info");
  };

  // Apply Search and Filtering
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Search text match (case-insensitive)
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        item.procedure.toLowerCase().includes(q) ||
        item.diagnosis.toLowerCase().includes(q) ||
        item.narrative.toLowerCase().includes(q) ||
        item.no.toString() === q;

      // Category match
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;

      // Cost range match
      const costVal = item.cost;
      const minVal = minCost !== '' ? parseFloat(minCost) : null;
      const maxVal = maxCost !== '' ? parseFloat(maxCost) : null;

      const matchMinCost = minVal === null || isNaN(minVal) || costVal >= minVal;
      const matchMaxCost = maxVal === null || isNaN(maxVal) || costVal <= maxVal;

      return matchSearch && matchCategory && matchMinCost && matchMaxCost;
    });
  }, [items, searchQuery, selectedCategory, minCost, maxCost]);

  // Sort filtered items
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [filteredItems, sortBy, sortOrder]);

  // Pagination logic
  const paginatedItems = useMemo(() => {
    if (itemsPerPage === -1) return sortedItems; // "All" selected
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedItems.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedItems, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    if (itemsPerPage === -1) return 1;
    return Math.max(1, Math.ceil(sortedItems.length / itemsPerPage));
  }, [sortedItems, itemsPerPage]);

  // Adjust page number if out of bounds
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, minCost, maxCost, itemsPerPage]);

  // --- CRUD Event Handlers ---
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: BillingItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (formData: Omit<BillingItem, 'no'> & { no?: number }) => {
    if (editingItem) {
      // Editing Mode
      const updated = items.map(item => 
        item.no === editingItem.no 
          ? { ...item, ...formData, no: editingItem.no } 
          : item
      );
      saveItems(updated);
      // Synchronize currently viewed item if it's the edited one
      if (viewingItem && viewingItem.no === editingItem.no) {
        setViewingItem({ ...viewingItem, ...formData, no: editingItem.no });
      }
      showToast(`Updated entry #${editingItem.no} successfully.`, 'success');
    } else {
      // Creation Mode
      const customNo = formData.no && !items.some(i => i.no === formData.no)
        ? formData.no
        : suggestedNextNo;

      const newItem: BillingItem = {
        ...formData,
        no: customNo
      };
      
      const updated = [...items, newItem].sort((a, b) => a.no - b.no);
      saveItems(updated);
      setViewingItem(newItem);
      showToast(`Created entry #${customNo} successfully.`, 'success');
    }
  };

  const initiateDelete = (item: BillingItem) => {
    setItemToDelete(item);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const updated = items.filter(i => i.no !== itemToDelete.no);
      saveItems(updated);
      
      // If the currently viewed item is being deleted, set it to the first remaining item
      if (viewingItem?.no === itemToDelete.no) {
        setViewingItem(updated[0] || null);
      }
      
      showToast(`Entry #${itemToDelete.no} successfully deleted.`, 'success');
      setItemToDelete(null);
    }
  };

  const handleResetToStandard = () => {
    if (window.confirm("Are you sure you want to restore the entire original directory of 121 medical procedures? All custom edits and new additions will be replaced.")) {
      saveItems(initialBillingItems);
      setViewingItem(initialBillingItems[0] || null);
      showToast("Directory restored to the standard 121 billing sheet items.", "info");
    }
  };

  // --- JSON/CSV Import & Export Handlers ---
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `clinical_billing_procedures_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Exported JSON clinical database successfully.", "success");
  };

  const handleExportCSV = () => {
    const headers = ["no", "category", "procedure", "diagnosis", "cost", "narrative"];
    const csvRows = [
      headers.join(','), // Header row
      ...items.map(item => {
        return [
          item.no,
          `"${item.category.replace(/"/g, '""')}"`,
          `"${item.procedure.replace(/"/g, '""')}"`,
          `"${item.diagnosis.replace(/"/g, '""')}"`,
          item.cost,
          `"${item.narrative.replace(/"/g, '""')}"`
        ].join(',');
      })
    ];

    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csvRows.join('\n'));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", csvContent);
    downloadAnchor.setAttribute("download", `clinical_procedures_sheet_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Exported Excel-compatible CSV file successfully.", "success");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          // Validate structure
          const isValid = parsed.every(i => 
            typeof i.no === 'number' && 
            typeof i.procedure === 'string' &&
            typeof i.diagnosis === 'string' &&
            typeof i.cost === 'number' &&
            typeof i.narrative === 'string'
          );

          if (isValid) {
            const formatted = parsed.map(item => ({
              ...item,
              category: item.category || "Other Procedures"
            }));
            saveItems(formatted);
            showToast(`Successfully imported ${formatted.length} procedures from backup!`, "success");
          } else {
            showToast("Import failed: JSON structure is missing required procedure properties.", "error");
          }
        } else {
          showToast("Import failed: Backup file must be a JSON array of items.", "error");
        }
      } catch (err) {
        showToast("Import failed: Invalid JSON file format.", "error");
      }
    };
    fileReader.readAsText(files[0]);
    // Clear input so same file can be loaded again
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark transition-all duration-300 pb-16" id="app-root-container">
      
      {/* Header Banner */}
      <header className="bg-brand-card border-b border-brand-border sticky top-0 z-40 shadow-sm" id="main-app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="px-3 py-2 bg-brand-green rounded-xl text-white font-mono font-black text-base shadow-sm tracking-wider flex items-center justify-center leading-none">
              MTH
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-serif font-bold text-brand-text tracking-tight">Mwin Tuba Hospital</h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold bg-brand-green/10 text-brand-green border border-brand-green/20">
                  v2.0 Stable
                </span>
              </div>
              <p className="text-xs text-brand-secondary">Clinical Procedure Directory & Quotation Planner</p>
            </div>
          </div>

          {/* Quick Global Database Actions */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Import JSON button & hidden file input */}
            <label 
              id="import-btn-label"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-brand-card border border-brand-border hover:bg-brand-hover rounded-xl text-xs font-semibold text-brand-secondary cursor-pointer transition-all shadow-xs"
              title="Import procedures from a JSON backup file"
            >
              <Upload size={14} className="text-brand-green" />
              <span>Import backup</span>
              <input 
                id="import-file-input"
                type="file" 
                accept=".json" 
                onChange={handleImportJSON} 
                className="hidden" 
              />
            </label>

            {/* Export Dropdown / Action Row */}
            <button
              id="export-csv-btn"
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-brand-card border border-brand-border hover:bg-brand-hover rounded-xl text-xs font-semibold text-brand-secondary transition-all shadow-xs cursor-pointer"
              title="Download directory as Microsoft Excel compatible CSV file"
            >
              <FileSpreadsheet size={14} className="text-brand-green" />
              <span>Export CSV</span>
            </button>

            <button
              id="export-json-btn"
              onClick={handleExportJSON}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-brand-card border border-brand-border hover:bg-brand-hover rounded-xl text-xs font-semibold text-brand-secondary transition-all shadow-xs cursor-pointer"
              title="Download standard database backup file"
            >
              <Download size={14} className="text-brand-secondary" />
              <span>Export JSON</span>
            </button>

            {/* Reset Defaults */}
            <button
              id="reset-db-btn"
              onClick={handleResetToStandard}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-brand-card border border-brand-red/20 hover:border-brand-red/40 hover:bg-brand-red/5 rounded-xl text-xs font-semibold text-brand-red transition-all shadow-xs cursor-pointer"
              title="Revert all changes back to standard medical sheet"
            >
              <RotateCcw size={14} />
              <span>Reset Standard List</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={() => {
                const nextTheme = theme === 'light' ? 'dark' : 'light';
                setTheme(nextTheme);
                showToast(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} Mode`, 'info');
              }}
              className="flex items-center justify-center p-1.5 bg-brand-card border border-brand-border hover:bg-brand-hover rounded-xl text-brand-secondary transition-all shadow-xs cursor-pointer h-[30px] w-[34px]"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} className="text-amber-500" />}
            </button>

            {/* Create Button */}
            <button
              id="add-procedure-btn"
              onClick={handleOpenAddModal}
              className="flex items-center space-x-1.5 px-4 py-1.5 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
            >
              <Plus size={15} />
              <span>Add Procedure</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6" id="app-main-body">
        
        {/* Realtime Stats Banner */}
        <StatsBanner items={items} />

        {/* Dynamic Custom Alert Toast Notification */}
        {toast && (
          <div 
            id="toast-notification"
            className={`flex items-center space-x-2.5 p-3.5 rounded-xl border shadow-xs max-w-xl mx-auto animate-fade-in transition-all ${
              toast.type === 'success' 
                ? 'bg-brand-green/10 border-brand-green/20 text-brand-green' 
                : toast.type === 'error'
                  ? 'bg-brand-red/10 border-brand-red/20 text-brand-red'
                  : 'bg-brand-bg border-brand-border text-brand-text'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={18} className="text-brand-green" />
            ) : toast.type === 'error' ? (
              <AlertCircle size={18} className="text-brand-red" />
            ) : (
              <Info size={18} className="text-brand-secondary" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        )}

        {/* Dashboard workspace grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" id="dashboard-grid">
          
          {/* LEFT/CENTER PANEL: Searches, Category filters, Procedures Grid / Table */}
          <div className="lg:col-span-3 space-y-4" id="main-directory-panel">
            
            {/* Control bar: Search + filter triggers */}
            <div className="bg-brand-card p-4 rounded-2xl border border-brand-border shadow-xs space-y-3" id="filters-container">
              <div className="flex flex-col sm:flex-row gap-3">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-brand-muted">
                    <Search size={16} />
                  </span>
                  <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by procedure name, diagnosis, narrative, or number..."
                    className="w-full pl-9 pr-8 py-2 text-sm bg-brand-bg border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-brand-dark placeholder-brand-muted"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-brand-muted hover:text-brand-text cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Filter & Reset Buttons */}
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    id="toggle-advanced-filters-btn"
                    onClick={() => setShowAdvancedFilters(prev => !prev)}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 border rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      showAdvancedFilters || minCost || maxCost
                        ? 'bg-brand-green/10 border-brand-green/30 text-brand-green'
                        : 'bg-brand-card border-brand-border text-brand-secondary hover:bg-brand-hover'
                    }`}
                  >
                    <SlidersHorizontal size={14} />
                    <span>Price Filters</span>
                    {(minCost || maxCost) && (
                      <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse"></span>
                    )}
                  </button>

                  {(searchQuery || selectedCategory !== 'All' || minCost || maxCost) && (
                    <button
                      id="clear-all-filters-btn"
                      onClick={handleClearFilters}
                      className="px-3.5 py-2 text-xs font-semibold text-brand-secondary hover:text-brand-text hover:bg-brand-hover rounded-xl transition-all border border-transparent cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Collapsible Advanced Price Filter Panel */}
              {showAdvancedFilters && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-brand-bg/60 rounded-xl border border-brand-border animate-fade-in" id="price-filters-panel">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-secondary mb-1">
                      Minimum Price (GH₵)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-brand-muted text-xs">GH₵</span>
                      <input
                        id="filter-min-cost"
                        type="number"
                        placeholder="0"
                        value={minCost}
                        onChange={(e) => setMinCost(e.target.value)}
                        className="w-full pl-11 pr-3 py-1.5 text-xs bg-brand-card border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-brand-dark"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-secondary mb-1">
                      Maximum Price (GH₵)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-brand-muted text-xs">GH₵</span>
                      <input
                        id="filter-max-cost"
                        type="number"
                        placeholder="Max limit"
                        value={maxCost}
                        onChange={(e) => setMaxCost(e.target.value)}
                        className="w-full pl-11 pr-3 py-1.5 text-xs bg-brand-card border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-brand-dark"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Medical Category Pill Filters */}
              <div className="border-t border-brand-border pt-3" id="categories-filter-row">
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary mb-2">Filter by Medical Speciality</p>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1 custom-scrollbar">
                  {[
                    "All",
                    "General Surgery",
                    "Proctology",
                    "Gynaecology",
                    "Urology",
                    "Diagnostics",
                    "Cardiothoracic & Gastric",
                    "Other Procedures"
                  ].map((category) => {
                    const count = category === 'All' 
                      ? items.length 
                      : categoryCounts[category] || 0;
                    const isActive = selectedCategory === category;
                    
                    return (
                      <button
                        key={category}
                        id={`category-pill-${category.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => setSelectedCategory(category as CategoryType)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
                          isActive 
                            ? 'bg-brand-green text-white shadow-xs' 
                            : 'bg-brand-bg hover:bg-brand-hover text-brand-secondary border border-brand-border/40'
                        }`}
                      >
                        <span>{category}</span>
                        <span className={`text-[10px] px-1.5 py-0.25 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-brand-card text-brand-muted border border-brand-border/40'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* List Table Content */}
            <div className="bg-brand-card rounded-2xl border border-brand-border shadow-xs overflow-hidden" id="directory-table-container">
              
              {/* Table header indicators */}
              <div className="p-4 bg-brand-bg border-b border-brand-border flex items-center justify-between text-xs text-brand-secondary font-serif">
                <div className="font-semibold" id="results-count">
                  Showing {sortedItems.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage === -1 ? sortedItems.length : currentPage * itemsPerPage, sortedItems.length)} of {sortedItems.length} matching procedures
                </div>
                {sortedItems.length > 0 && (
                  <div className="flex items-center space-x-1.5">
                    <span className="font-medium text-brand-muted">Sort:</span>
                    <span className="font-semibold text-brand-text capitalize">{sortBy} ({sortOrder})</span>
                  </div>
                )}
              </div>

              {/* Table Body */}
              {sortedItems.length === 0 ? (
                <div className="text-center py-16 px-4 space-y-3" id="no-results-view">
                  <div className="mx-auto w-12 h-12 bg-brand-bg text-brand-muted rounded-full flex items-center justify-center">
                    <Search size={22} />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-semibold text-brand-text">No procedures found</h4>
                    <p className="text-xs text-brand-secondary mt-1 max-w-sm mx-auto">
                      No medical procedures matched your filter settings. Try relaxing your keyword or budget limits.
                    </p>
                  </div>
                  <button 
                    id="no-results-clear-filters-btn"
                    onClick={handleClearFilters}
                    className="px-4 py-1.5 bg-brand-green/10 text-brand-green font-semibold text-xs rounded-lg hover:bg-brand-green/20 transition-colors cursor-pointer"
                  >
                    Clear Filter Parameters
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse" id="procedures-data-table">
                    <thead>
                      <tr className="bg-brand-bg/50 border-b border-brand-border text-brand-secondary text-[10px] font-bold uppercase tracking-wider">
                        <th 
                          id="th-no"
                          onClick={() => handleSort('no')} 
                          className="px-4 py-3 cursor-pointer hover:bg-brand-hover hover:text-brand-text transition-colors"
                        >
                          <div className="flex items-center space-x-1 font-mono">
                            <span>No.</span>
                            <ArrowUpDown size={12} className="text-brand-muted" />
                          </div>
                        </th>
                        <th 
                          id="th-procedure"
                          onClick={() => handleSort('procedure')} 
                          className="px-5 py-3 cursor-pointer hover:bg-brand-hover hover:text-brand-text transition-colors w-1/3"
                        >
                          <div className="flex items-center space-x-1">
                            <span>Procedure</span>
                            <ArrowUpDown size={12} className="text-brand-muted" />
                          </div>
                        </th>
                        <th 
                          id="th-diagnosis"
                          onClick={() => handleSort('diagnosis')} 
                          className="px-4 py-3 cursor-pointer hover:bg-brand-hover hover:text-brand-text transition-colors w-1/5"
                        >
                          <div className="flex items-center space-x-1">
                            <span>Diagnosis</span>
                            <ArrowUpDown size={12} className="text-brand-muted" />
                          </div>
                        </th>
                        <th 
                          id="th-cost"
                          onClick={() => handleSort('cost')} 
                          className="px-4 py-3 cursor-pointer hover:bg-brand-hover hover:text-brand-text transition-colors"
                        >
                          <div className="flex items-center space-x-1">
                            <span>Cost</span>
                            <ArrowUpDown size={12} className="text-brand-muted" />
                          </div>
                        </th>
                        <th 
                          id="th-narrative"
                          className="px-4 py-3 hidden md:table-cell w-1/4"
                        >
                          Narrative / Coverage
                        </th>
                        <th id="th-actions" className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border text-sm">
                      {paginatedItems.map((item) => {
                        const isSelected = viewingItem?.no === item.no;
                        return (
                          <tr 
                            key={item.no} 
                            id={`row-item-${item.no}`}
                            className={`transition-all align-top relative border-l-2 ${
                              isSelected 
                                ? 'bg-brand-green/5 dark:bg-brand-green/10 border-brand-green' 
                                : 'border-transparent hover:bg-brand-bg/40'
                            }`}
                          >
                            {/* No */}
                            <td 
                              onClick={() => setViewingItem(item)}
                              className={`px-4 py-3.5 font-mono font-semibold cursor-pointer transition-colors ${
                                isSelected ? 'text-brand-green' : 'text-brand-secondary hover:text-brand-green'
                              }`}
                              title="Click to view details in sidebar"
                            >
                              #{item.no}
                            </td>
                            
                            {/* Procedure & Speciality Tag */}
                            <td 
                              onClick={() => setViewingItem(item)}
                              className="px-5 py-3.5 cursor-pointer"
                              title="Click to view details in sidebar"
                            >
                              <div className={`font-serif font-semibold line-clamp-2 transition-colors ${
                                isSelected ? 'text-brand-green font-bold' : 'text-brand-text hover:text-brand-green'
                              }`}>
                                {item.procedure}
                              </div>
                              <div className="mt-1 flex items-center space-x-1.5">
                                <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full border font-medium capitalize transition-colors ${
                                  isSelected 
                                    ? 'bg-brand-green/10 text-brand-green border-brand-green/20' 
                                    : 'bg-brand-bg text-brand-secondary border-brand-border'
                                }`}>
                                  {item.category}
                                </span>
                              </div>
                            </td>

                            {/* Diagnosis */}
                            <td 
                              onClick={() => setViewingItem(item)}
                              className={`px-4 py-3.5 font-medium cursor-pointer transition-colors ${
                                isSelected ? 'text-brand-text' : 'text-brand-secondary hover:text-brand-green'
                              }`}
                              title="Click to view details in sidebar"
                            >
                              {item.diagnosis}
                            </td>

                            {/* Cost */}
                            <td 
                              onClick={() => setViewingItem(item)}
                              className="px-4 py-3.5 font-mono text-brand-green font-bold text-base whitespace-nowrap cursor-pointer hover:scale-105 origin-left transition-transform"
                              title="Click to view details in sidebar"
                            >
                              {new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS', maximumFractionDigits: 0 }).format(item.cost)}
                            </td>

                            {/* Narrative */}
                            <td 
                              onClick={() => setViewingItem(item)}
                              className="px-4 py-3.5 text-xs hidden md:table-cell font-normal leading-relaxed cursor-pointer transition-colors"
                              title="Click to view details in sidebar"
                            >
                              <div className={`line-clamp-3 ${isSelected ? 'text-brand-text' : 'text-brand-muted hover:text-brand-text'}`}>
                                {item.narrative || <span className="text-brand-muted italic">No custom narrative text</span>}
                              </div>
                            </td>

                            {/* Quick Actions */}
                            <td className="px-4 py-3.5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end space-x-1 opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                
                                {/* View details (Read) */}
                                <button
                                  id={`row-view-details-${item.no}`}
                                  onClick={() => setViewingItem(item)}
                                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                    isSelected 
                                      ? 'bg-brand-green/10 text-brand-green' 
                                      : 'text-brand-secondary hover:text-brand-text hover:bg-brand-hover'
                                  }`}
                                  title="Inspect entry details"
                                >
                                  <Eye size={15} />
                                </button>

                                {/* Edit details (Update) */}
                                <button
                                  id={`row-edit-${item.no}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenEditModal(item);
                                  }}
                                  className="p-1.5 text-brand-green hover:bg-brand-green/10 rounded-lg transition-colors cursor-pointer"
                                  title="Edit entry"
                                >
                                  <Edit size={14} />
                                </button>

                                {/* Delete (Delete) */}
                                <button
                                  id={`row-delete-${item.no}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    initiateDelete(item);
                                  }}
                                  className="p-1.5 text-brand-red hover:bg-brand-red/10 rounded-lg transition-colors cursor-pointer"
                                  title="Delete entry"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination Controls */}
              {sortedItems.length > 0 && (
                <div className="p-4 bg-brand-bg/60 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-brand-secondary" id="pagination-controls">
                  
                  {/* Page Size Changer */}
                  <div className="flex items-center space-x-2">
                    <span>Show:</span>
                    <select
                      id="pagination-size-select"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-2.5 py-1 border border-brand-border bg-brand-card rounded-lg focus:outline-none focus:border-brand-green cursor-pointer text-brand-secondary"
                    >
                      <option value={10}>10 items</option>
                      <option value={25}>25 items</option>
                      <option value={50}>50 items</option>
                      <option value={100}>100 items</option>
                      <option value={-1}>All items</option>
                    </select>
                  </div>

                  {/* Buttons */}
                  {itemsPerPage !== -1 && totalPages > 1 && (
                    <div className="flex items-center space-x-1.5">
                      <button
                        id="pagination-prev-btn"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg border border-brand-border bg-brand-card text-brand-secondary hover:bg-brand-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <ChevronLeft size={14} />
                      </button>

                      {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        // Pagination windowing if many pages
                        if (totalPages > 6 && Math.abs(currentPage - pageNum) > 1 && pageNum !== 1 && pageNum !== totalPages) {
                          if (pageNum === 2 || pageNum === totalPages - 1) {
                            return <span key={pageNum} className="px-1 text-brand-muted select-none">...</span>;
                          }
                          return null;
                        }

                        return (
                          <button
                            key={pageNum}
                            id={`pagination-page-${pageNum}`}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-7 h-7 rounded-lg text-center transition-colors cursor-pointer ${
                              currentPage === pageNum
                                ? 'bg-brand-green text-white font-bold shadow-xs'
                                : 'border border-brand-border bg-brand-card text-brand-secondary hover:bg-brand-hover'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        id="pagination-next-btn"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-lg border border-brand-border bg-brand-card text-brand-secondary hover:bg-brand-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )}

                  <div className="text-[11px] text-brand-muted font-medium">
                    Total {sortedItems.length} matching entries
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Procedure Details sidebar */}
          <div className="space-y-4" id="sidebar-panel">
            
            {/* Real patient quote calculation container replaced with Procedure Details */}
            <div className="bg-brand-card rounded-2xl p-5 border border-brand-border shadow-xs space-y-5" id="procedure-details-panel">
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 bg-brand-green/15 text-brand-green rounded-xl">
                    <Eye size={16} />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-text">Procedure Details</h4>
                </div>
                {viewingItem && (
                  <span className="font-mono text-xs text-brand-secondary font-bold bg-brand-bg px-2 py-0.5 rounded-lg border border-brand-border/40">
                    #{viewingItem.no}
                  </span>
                )}
              </div>

              {!viewingItem ? (
                <div className="text-center py-10 px-4">
                  <p className="font-medium text-brand-secondary text-sm">No procedure selected.</p>
                  <p className="text-xs mt-1.5 text-brand-muted leading-relaxed">
                    Click on any entry in the directory table to inspect its full clinical details, indication, and narrative coverage.
                  </p>
                </div>
              ) : (
                <div className="space-y-4.5 animate-fade-in">
                  
                  {/* Category Badge & Code */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-block text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
                      {viewingItem.category}
                    </span>
                    <span className="font-mono text-brand-muted">Item Code: M-{viewingItem.no}</span>
                  </div>

                  {/* Indication / Diagnosis as block element (First) */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-secondary">
                      Indication / Diagnosis
                    </label>
                    <p className="text-brand-text text-sm font-semibold leading-relaxed">
                      {viewingItem.diagnosis}
                    </p>
                  </div>

                  {/* Name (Second) */}
                  <div className="space-y-1.5 border-t border-brand-border/40 pt-4">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-secondary">
                      Full Procedure Name
                    </label>
                    <h2 className="text-brand-text text-base font-serif font-semibold leading-relaxed">
                      {viewingItem.procedure}
                    </h2>
                  </div>

                  {/* Price (Procedure Cost) as block element (Third) */}
                  <div className="space-y-1.5 border-t border-brand-border/40 pt-4">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-secondary">
                      Procedure Cost
                    </label>
                    <p className="text-brand-green font-bold font-mono text-xl">
                      {new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS', maximumFractionDigits: 0 }).format(viewingItem.cost)}
                    </p>
                  </div>

                  {/* Narrative/Description as block element (Fourth) */}
                  <div className="space-y-2 border-t border-brand-border/40 pt-4">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-secondary">
                      Clinical Narrative & Included Services
                    </label>
                    <div className="bg-brand-bg/80 p-4 rounded-xl text-xs text-brand-secondary leading-relaxed border border-brand-border/40 max-h-[220px] overflow-y-auto custom-scrollbar">
                      {viewingItem.narrative ? (
                        <p className="whitespace-pre-line">{viewingItem.narrative}</p>
                      ) : (
                        <span className="italic text-brand-muted">
                          No custom narrative description recorded. Standard outpatient diagnostic guidelines and clinical post-operative review sheets apply.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick Sidebar Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-border">
                    <button
                      onClick={() => {
                        const summaryText = `
=========================================
          MWIN TUBA HOSPITAL             
     CLINICAL PROCEDURE DETAILS          
=========================================
Item Number:   #${viewingItem.no}
Category:      ${viewingItem.category}
Procedure:     ${viewingItem.procedure}
Diagnosis:     ${viewingItem.diagnosis}
Estimated Cost: ${new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS', maximumFractionDigits: 0 }).format(viewingItem.cost)}
-----------------------------------------
NARRATIVE & INCLUDED SERVICES:
${viewingItem.narrative || 'Standard pre-op labs & post-op clinical recovery logs apply.'}
=========================================
Generated via Mwin Tuba Hospital Procedure Directory
`;
                        navigator.clipboard.writeText(summaryText.trim());
                        showToast("Procedure details copied to clipboard!", "success");
                      }}
                      className="flex items-center justify-center space-x-2 py-2.5 bg-transparent hover:bg-brand-bg/40 text-brand-text rounded-xl text-xs font-semibold border border-brand-border transition-all cursor-pointer"
                    >
                      <Copy size={13} className="text-brand-secondary" />
                      <span>Copy Details</span>
                    </button>

                    <button
                      onClick={() => handleOpenEditModal(viewingItem)}
                      className="flex items-center justify-center space-x-2 py-2.5 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
                    >
                      <Edit size={13} />
                      <span>Edit Entry</span>
                    </button>
                  </div>

                </div>
              )}
            </div>

            {/* Help / Information Card */}
            <div className="bg-brand-card rounded-2xl p-4 border border-brand-border shadow-xs" id="information-banner">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-brand-bg text-brand-secondary rounded-xl shrink-0 mt-0.5">
                  <Info size={16} />
                </div>
                <div>
                  <h5 className="font-sans font-bold text-sm text-brand-text mb-1">Quick Reference Guide</h5>
                  <p className="text-xs text-brand-secondary leading-relaxed">
                    All updates you perform on procedures are persisted in your web browser's Local Storage. 
                    You can safe-keep your custom clinical directories by clicking <b>Export JSON</b>.
                  </p>
                  <p className="text-xs text-brand-secondary leading-relaxed mt-2.5">
                    If you delete or modify items and want to restore the clean baseline standard list, use the<b>Reset Standard List</b> action.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-card border-t border-brand-border py-6 mt-12 text-center text-brand-muted text-xs" id="main-app-footer">
        <p className="font-serif">© 2026 Mwin Tuba Hospital. Clinical Billing & Procedure Directory.</p>
        <p className="mt-1 text-[10px] text-brand-muted/70">Clinician workspace authenticated via LocalStorage persistence.</p>
      </footer>

      {/* UNIFIED MODAL FOR ADDING AND EDITING ITEMS */}
      <ProcedureModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        itemToEdit={editingItem}
        suggestedNo={suggestedNextNo}
      />



      {/* CONFIRM DELETE DIALOG MODAL */}
      {itemToDelete && (
        <div id="delete-confirm-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C28]/40 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-brand-card rounded-2xl shadow-xl border border-brand-border overflow-hidden" id="delete-confirm-container">
            <div className="p-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center">
                <Trash2 size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-serif font-bold text-brand-text">Delete Clinical Procedure?</h4>
                <div className="text-xs text-brand-secondary leading-relaxed px-4">
                  Are you absolutely sure you want to remove procedure <b>#{itemToDelete.no}</b>:
                  <span className="block italic mt-1 text-brand-text font-serif font-semibold">"{itemToDelete.procedure}"</span>
                  This operation cannot be undone.
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2.5 pt-2">
                <button
                  id="delete-cancel-btn"
                  onClick={() => setItemToDelete(null)}
                  className="px-4 py-2 border border-brand-border text-brand-secondary font-semibold text-xs rounded-lg hover:bg-brand-hover transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="delete-confirm-btn"
                  onClick={confirmDelete}
                  className="px-5 py-2 bg-brand-red hover:bg-brand-red-hover text-white font-semibold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
