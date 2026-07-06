import React from 'react';
import { BillingItem } from '../types';
import { Activity, Coins, TrendingUp, Award } from 'lucide-react';

interface StatsBannerProps {
  items: BillingItem[];
}

export default function StatsBanner({ items }: StatsBannerProps) {
  // Calculations
  const totalCount = items.length;
  
  const averageCost = totalCount > 0 
    ? Math.round(items.reduce((sum, item) => sum + item.cost, 0) / totalCount)
    : 0;

  const maxCostItem = items.reduce((max, current) => 
    (current.cost > (max?.cost || 0)) ? current : max, 
    null as BillingItem | null
  );

  const minCostItem = items.reduce((min, current) => {
    if (!min) return current;
    return current.cost < min.cost ? current : min;
  }, null as BillingItem | null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" id="stats-banner-container">
      {/* Metric 1: Total Procedures */}
      <div 
        id="stat-card-total" 
        className="bg-brand-card p-5 rounded-2xl border border-brand-border shadow-sm flex items-center space-x-4 transition-all hover:shadow-md"
      >
        <div className="p-3 rounded-xl bg-brand-green/10 text-brand-green">
          <Activity size={24} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Total Procedures</p>
          <h4 className="text-2xl font-serif font-semibold text-brand-text mt-1">{totalCount}</h4>
          <p className="text-xs text-brand-secondary mt-0.5">Active directory entries</p>
        </div>
      </div>

      {/* Metric 2: Average Procedure Cost */}
      <div 
        id="stat-card-avg" 
        className="bg-brand-card p-5 rounded-2xl border border-brand-border shadow-sm flex items-center space-x-4 transition-all hover:shadow-md"
      >
        <div className="p-3 rounded-xl bg-brand-green/10 text-brand-green">
          <Coins size={24} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Average Cost</p>
          <h4 className="text-2xl font-serif font-semibold text-brand-text mt-1">{formatCurrency(averageCost)}</h4>
          <p className="text-xs text-brand-secondary mt-0.5">Mean cost per procedure</p>
        </div>
      </div>

      {/* Metric 3: Most Expensive Procedure */}
      <div 
        id="stat-card-highest" 
        className="bg-brand-card p-5 rounded-2xl border border-brand-border shadow-sm flex items-center space-x-4 transition-all hover:shadow-md col-span-1"
      >
        <div className="p-3 rounded-xl bg-brand-red/10 text-brand-red">
          <TrendingUp size={24} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Peak Procedure Cost</p>
          <h4 className="text-2xl font-serif font-semibold text-brand-text mt-1 truncate">
            {maxCostItem ? formatCurrency(maxCostItem.cost) : "GH₵0"}
          </h4>
          <p className="text-xs text-brand-secondary mt-0.5 truncate" title={maxCostItem?.procedure}>
            {maxCostItem ? `#${maxCostItem.no}: ${maxCostItem.procedure}` : "N/A"}
          </p>
        </div>
      </div>

      {/* Metric 4: Least Expensive Procedure */}
      <div 
        id="stat-card-lowest" 
        className="bg-brand-card p-5 rounded-2xl border border-brand-border shadow-sm flex items-center space-x-4 transition-all hover:shadow-md col-span-1"
      >
        <div className="p-3 rounded-xl bg-brand-secondary/10 text-brand-secondary">
          <Award size={24} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Base Entry Cost</p>
          <h4 className="text-2xl font-serif font-semibold text-brand-text mt-1 truncate">
            {minCostItem ? formatCurrency(minCostItem.cost) : "GH₵0"}
          </h4>
          <p className="text-xs text-brand-secondary mt-0.5 truncate" title={minCostItem?.procedure}>
            {minCostItem ? `#${minCostItem.no}: ${minCostItem.procedure}` : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
