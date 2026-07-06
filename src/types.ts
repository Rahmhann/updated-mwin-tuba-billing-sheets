export interface BillingItem {
  no: number;
  procedure: string;
  diagnosis: string;
  cost: number;
  narrative: string;
  category: string;
}

export type CategoryType = 
  | "All"
  | "General Surgery"
  | "Proctology"
  | "Gynaecology"
  | "Urology"
  | "Diagnostics"
  | "Cardiothoracic & Gastric"
  | "Other Procedures";
