import { BillingItem } from './types';

export const initialBillingItems: BillingItem[] = [
  // --- GENERAL SURGERY ---
  {
    no: 1,
    procedure: "Hernia Repair Under Local Anaesthesia (LA)",
    diagnosis: "Inguinal, Epigastric, Umbilical",
    cost: 7000,
    narrative: "Procedure/anaesthesia fees, Pre-op labs, medications, mesh, detention",
    category: "General Surgery"
  },
  {
    no: 2,
    procedure: "Hernia Repair under Spinal Anaesthesia (SA) or General Anaesthesia (GA)",
    diagnosis: "Large inguinal hernia, Incisional hernia (Small)",
    cost: 15000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, mesh, admission for one day",
    category: "General Surgery"
  },
  {
    no: 3,
    procedure: "Hernia repair",
    diagnosis: "Incisional hernia (large)",
    cost: 25000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, mesh, admission for four days",
    category: "General Surgery"
  },
  {
    no: 4,
    procedure: "Lymph Node biopsy",
    diagnosis: "Lymphadenopathy",
    cost: 6000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention, histopathology",
    category: "General Surgery"
  },
  {
    no: 5,
    procedure: "Incision biopsy or punch biopsy",
    diagnosis: "Ulcerated tumours",
    cost: 5500,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention, histopathology",
    category: "General Surgery"
  },
  {
    no: 6,
    procedure: "Core biopsy",
    diagnosis: "Non-Ulcerated Tumours",
    cost: 5500,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention, histopathology",
    category: "General Surgery"
  },
  {
    no: 7,
    procedure: "Drainage of Abscesses under Regional blocks",
    diagnosis: "Palmar, planter abscesses",
    cost: 7000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "General Surgery"
  },
  {
    no: 8,
    procedure: "Debridement, Desloughing under Regional Blocks",
    diagnosis: "Devitalised tissue, necrotic ulcers",
    cost: 7000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "General Surgery"
  },
  {
    no: 9,
    procedure: "Suturing under LA",
    diagnosis: "Lacerations",
    cost: 3000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "General Surgery"
  },
  {
    no: 10,
    procedure: "Excision",
    diagnosis: "Ingrown toe nail",
    cost: 3000,
    narrative: "Procedure/anaesthesia fees, preop labs, medications, detention",
    category: "General Surgery"
  },
  {
    no: 11,
    procedure: "Excision biopsy (Superficial swellings)",
    diagnosis: "Lipoma & Demoid , Demoid, Sebaceous cysts",
    cost: 6000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention, histopathology",
    category: "General Surgery"
  },
  {
    no: 12,
    procedure: "Excision biopsy (Breast lumps)",
    diagnosis: "Fibroadenoma, Galactocele, Accessory breast/nipple, etc",
    cost: 6000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention, histopathology",
    category: "General Surgery"
  },
  {
    no: 13,
    procedure: "Excision of Cervical cystic swellings under LA",
    diagnosis: "Thyroglossal & Branchial Custs",
    cost: 7000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention, histopathology",
    category: "General Surgery"
  },
  {
    no: 14,
    procedure: "Excision",
    diagnosis: "Corn",
    cost: 3000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "General Surgery"
  },
  {
    no: 15,
    procedure: "Amputation of a digit",
    diagnosis: "Gangrene, mutilated finger or toe",
    cost: 5500,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "General Surgery"
  },
  {
    no: 16,
    procedure: "Excision (Extra-digit)",
    diagnosis: "Child",
    cost: 1700,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "General Surgery"
  },
  {
    no: 17,
    procedure: "Excision (Extra-digit)",
    diagnosis: "Adult",
    cost: 5500,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "General Surgery"
  },
  {
    no: 18,
    procedure: "Frenotomy",
    diagnosis: "Tongue tie in a child",
    cost: 2000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "General Surgery"
  },
  {
    no: 19,
    procedure: "Tendon Sheet Release",
    diagnosis: "Trigger Finger",
    cost: 4500,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "General Surgery"
  },
  {
    no: 20,
    procedure: "Excision biopsy of Bursae",
    diagnosis: "Olecranon Bursa, Baker's Cyst, etc",
    cost: 8000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention, histopathology",
    category: "General Surgery"
  },
  {
    no: 21,
    procedure: "Stripping",
    diagnosis: "Varicose veins",
    cost: 20000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, admission for two nights, Histopathology",
    category: "General Surgery"
  },
  {
    no: 22,
    procedure: "Limb Fractures",
    diagnosis: "Manipulation Under Anaesthesia & POP back slab of full cast",
    cost: 5500,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, Admission for two days",
    category: "General Surgery"
  },
  {
    no: 23,
    procedure: "Primary Suturing",
    diagnosis: "Small Laceration",
    cost: 3500,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications,",
    category: "General Surgery"
  },
  {
    no: 24,
    procedure: "Primary Suturing",
    diagnosis: "Large Laceration",
    cost: 4500,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications,",
    category: "General Surgery"
  },
  {
    no: 25,
    procedure: "Secondary Suturing",
    diagnosis: "Small Wound",
    cost: 5500,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications,",
    category: "General Surgery"
  },
  {
    no: 26,
    procedure: "Secondary Suturing",
    diagnosis: "Large Wounds",
    cost: 6500,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications,",
    category: "General Surgery"
  },

  // --- PROCTOLOGY ---
  {
    no: 27,
    procedure: "Fistulectomy, Fistular repair",
    diagnosis: "Anal Fistula",
    cost: 25000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, admission for up to two nights",
    category: "Proctology"
  },
  {
    no: 28,
    procedure: "Examination Under Anaesthesia",
    diagnosis: "Anal/low rectal Disease",
    cost: 4000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Proctology"
  },
  {
    no: 29,
    procedure: "Examination Under Anaesthesia with biopsy",
    diagnosis: "Anal/low rectal disease",
    cost: 7000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention, histopatholgy",
    category: "Proctology"
  },
  {
    no: 30,
    procedure: "Anal Stenosis",
    diagnosis: "Anoplasty under LA",
    cost: 15000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, admission for up to two nights",
    category: "Proctology"
  },
  {
    no: 31,
    procedure: "Anal Stenosis",
    diagnosis: "Anoplasty under SA",
    cost: 25000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, admission for up to two nights",
    category: "Proctology"
  },
  {
    no: 32,
    procedure: "Haemorrhoidectomy",
    diagnosis: "Haemorrhoids",
    cost: 15000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, devices, admission for up to two nights",
    category: "Proctology"
  },
  {
    no: 33,
    procedure: "Internal Lateral Sphinctorotomy",
    diagnosis: "Anal fissure",
    cost: 15000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, devices, admission for up to two nights",
    category: "Proctology"
  },
  {
    no: 34,
    procedure: "Drainage/ Excision under LA",
    diagnosis: "Peri-anal Abscess/Pilonadal sinus or abscess",
    cost: 15000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, admission for one night",
    category: "Proctology"
  },
  {
    no: 35,
    procedure: "Drainage/Excision Under SA",
    diagnosis: "Peri-anal Abscess/Pilonadal sinus or abscess",
    cost: 25000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, admission for two nights",
    category: "Proctology"
  },

  // --- GYNAECOLOGY ---
  {
    no: 36,
    procedure: "Bilateral Tubal Ligation",
    diagnosis: "Contraception",
    cost: 13000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Gynaecology"
  },
  {
    no: 37,
    procedure: "Diagnostic hysteroscopy only",
    diagnosis: "Infertility, Abnormal uterine bleeding, fibroids",
    cost: 12000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention, Histopathology",
    category: "Gynaecology"
  },
  {
    no: 38,
    procedure: "Diagnostic Hysteroscopy + Biopsy",
    diagnosis: "Infertility, Abnormal Uterine bleeding, fibroids",
    cost: 15000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention, Histopathology",
    category: "Gynaecology"
  },
  {
    no: 39,
    procedure: "Therapeutic Hysteroscopy",
    diagnosis: "Submucosal Fibroid, Abnormal uterine bleeding, etc",
    cost: 25000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, admission for one night, histopathology",
    category: "Gynaecology"
  },
  {
    no: 40,
    procedure: "Diagnostic Laparoscopy",
    diagnosis: "Infertility, etc",
    cost: 22000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, admission for one night",
    category: "Gynaecology"
  },
  {
    no: 41,
    procedure: "Combined diagnostic hysteroscopy & Laparoscopy",
    diagnosis: "Infertility, etc",
    cost: 32000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, admission for up to two nights",
    category: "Gynaecology"
  },
  {
    no: 42,
    procedure: "Colposcopy +Biopsy",
    diagnosis: "Suspicious Pap Smear",
    cost: 8000,
    narrative: "Procedure/anaesthesia fees, medications, detention, Histopathology",
    category: "Gynaecology"
  },
  {
    no: 43,
    procedure: "Pap Smear",
    diagnosis: "Cervical Cancer screening",
    cost: 1500,
    narrative: "Procedure, Kit, histopathology",
    category: "Gynaecology"
  },
  {
    no: 44,
    procedure: "Marsupialization Under LA",
    diagnosis: "Bartholin's Cyst",
    cost: 8000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Gynaecology"
  },
  {
    no: 45,
    procedure: "Normal Delivery",
    diagnosis: "Pregnancy",
    cost: 5000,
    narrative: "Admission, conduction of labour, delivery and medications",
    category: "Gynaecology"
  },
  {
    no: 46,
    procedure: "Evacuation of Uterus",
    diagnosis: "Incomplete abortion",
    cost: 3500,
    narrative: "Procedure/anaesthesia fees, medications, detention",
    category: "Gynaecology"
  },
  {
    no: 47,
    procedure: "Delivery of Placenta",
    diagnosis: "Retained placenta",
    cost: 3500,
    narrative: "Procedure/anaesthesia fees, medications, detention",
    category: "Gynaecology"
  },
  {
    no: 48,
    procedure: "Normal Caesarean Section",
    diagnosis: "Obstructed labour, etc",
    cost: 16000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, admission for up to two nights",
    category: "Gynaecology"
  },
  {
    no: 49,
    procedure: "Caesarean hysterectomy",
    diagnosis: "PPH, Fibroids, ETC",
    cost: 40000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, admission for up to four nights, histopathology",
    category: "Gynaecology"
  },
  {
    no: 50,
    procedure: "Caesarean Section and Myomectomy",
    diagnosis: "Fibroids",
    cost: 35000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, admission for up to four nights, histopathology",
    category: "Gynaecology"
  },

  // --- UROLOGY ---
  {
    no: 51,
    procedure: "Bilateral Total Orchidectomy (BTO)",
    diagnosis: "Prostate Cancer",
    cost: 9000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Urology"
  },
  {
    no: 52,
    procedure: "Uncircumcised penis (Adult)",
    diagnosis: "Adult Circumcision",
    cost: 6000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Urology"
  },
  {
    no: 53,
    procedure: "Uncircumcised penis (Child)",
    diagnosis: "Child Circumcision",
    cost: 700,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Urology"
  },
  {
    no: 54,
    procedure: "Orchidopexcy (Unilateral in a child)",
    diagnosis: "Unilateral Undescended testes",
    cost: 11000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Urology"
  },
  {
    no: 55,
    procedure: "Orchidopexcy (Bilateral in a child)",
    diagnosis: "Bilateral undescended testes",
    cost: 15000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Urology"
  },
  {
    no: 56,
    procedure: "Orchidopexcy (Unilateral in young adult) under LA",
    diagnosis: "Unilateral undescended testes",
    cost: 6000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Urology"
  },
  {
    no: 57,
    procedure: "Orchidopexcy (Bilaterai in young adult)",
    diagnosis: "Bilateral Undescended teates",
    cost: 8000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Urology"
  },
  {
    no: 58,
    procedure: "Stab Suprapubic cystostomy",
    diagnosis: "Urine retention",
    cost: 7500,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Urology"
  },
  {
    no: 59,
    procedure: "Hydrocelectomy",
    diagnosis: "Hydrocele",
    cost: 8000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, devices, , detention",
    category: "Urology"
  },
  {
    no: 60,
    procedure: "Varicocelectomy",
    diagnosis: "Varicocele",
    cost: 7000,
    narrative: "Theatre/anaesthesia fees, pre-op labs, medications, detention",
    category: "Urology"
  },
  {
    no: 61,
    procedure: "Testicular detorsion and orchidopexy",
    diagnosis: "Testicular torsion",
    cost: 7000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Urology"
  },
  {
    no: 62,
    procedure: "Excision Biopsy (Scrotal swellings)",
    diagnosis: "Epididymal cyst, spermatocele",
    cost: 6000,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Urology"
  },
  {
    no: 63,
    procedure: "Dorsal slit",
    diagnosis: "Paraphimosis/Phimosis",
    cost: 5500,
    narrative: "Procedure/anaesthesia fees, pre-op labs, medications, detention",
    category: "Urology"
  },

  // --- DIAGNOSTICS ---
  {
    no: 64,
    procedure: "Gastroscopy only",
    diagnosis: "Any Indication",
    cost: 1200,
    narrative: "Procedure only",
    category: "Diagnostics"
  },
  {
    no: 65,
    procedure: "Gastroscopy with biopsy or snare",
    diagnosis: "Any Indication",
    cost: 3000,
    narrative: "Procedure and histopathology",
    category: "Diagnostics"
  },
  {
    no: 66,
    procedure: "Colonoscopy only",
    diagnosis: "Any Indication",
    cost: 1700,
    narrative: "Procedure only",
    category: "Diagnostics"
  },
  {
    no: 67,
    procedure: "Colonoscopy with Biopsy or snare",
    diagnosis: "Any Indication",
    cost: 3500,
    narrative: "Procedure and histopathology",
    category: "Diagnostics"
  },
  {
    no: 68,
    procedure: "Abdominal Ultrasound",
    diagnosis: "Any Indication",
    cost: 200,
    narrative: "",
    category: "Diagnostics"
  },
  {
    no: 69,
    procedure: "Pelvic Ultrasound",
    diagnosis: "Any Indication",
    cost: 150,
    narrative: "",
    category: "Diagnostics"
  },
  {
    no: 70,
    procedure: "Anomally scan",
    diagnosis: "Any Indication",
    cost: 250,
    narrative: "",
    category: "Diagnostics"
  },
  {
    no: 71,
    procedure: "Abdomen & Pelvic Ultrasound",
    diagnosis: "Any Indication",
    cost: 250,
    narrative: "",
    category: "Diagnostics"
  },
  {
    no: 72,
    procedure: "Obstetric ultrasound",
    diagnosis: "ANC",
    cost: 150,
    narrative: "",
    category: "Diagnostics"
  },
  {
    no: 73,
    procedure: "Fetal CTG",
    diagnosis: "ANC and Labour",
    cost: 150,
    narrative: "",
    category: "Diagnostics"
  },
  {
    no: 74,
    procedure: "ECG",
    diagnosis: "Any Indication",
    cost: 150,
    narrative: "",
    category: "Diagnostics"
  },

  // --- CARDIO-THORACIC / GASTRIC SECTIONS ---
  {
    no: 75,
    procedure: "Open Heller’s Cardiomyotomy",
    diagnosis: "Achalacia Cardia",
    cost: 40000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, and admission for up to 7 days",
    category: "Cardiothoracic & Gastric"
  },
  {
    no: 76,
    procedure: "Laparoscopic Heller’s Cardiomyotomy",
    diagnosis: "Achalacia Cardia",
    cost: 50000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, and admission for up to 5 days",
    category: "Cardiothoracic & Gastric"
  },
  {
    no: 77,
    procedure: "Open Nissen Fundoplication",
    diagnosis: "Hiatus hernia",
    cost: 40000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, and admission for up to 7 days",
    category: "Cardiothoracic & Gastric"
  },
  {
    no: 78,
    procedure: "Laparoscopic Nissen Fundoplication",
    diagnosis: "Haitus hernia",
    cost: 50000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, and admission for up to 5 days",
    category: "Cardiothoracic & Gastric"
  },
  {
    no: 79,
    procedure: "Open Bariatric Surgery",
    diagnosis: "Morbid Obesity",
    cost: 70000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, and admission for up to 7 days",
    category: "Cardiothoracic & Gastric"
  },
  {
    no: 80,
    procedure: "Laparoscopic Bariatric surgery",
    diagnosis: "Morbid Obesity",
    cost: 75000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, and admission for up to 5 days",
    category: "Cardiothoracic & Gastric"
  },
  {
    no: 81,
    procedure: "Panniculus",
    diagnosis: "Panniculectomy",
    cost: 25000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op las, and admission for up to 6 days",
    category: "Cardiothoracic & Gastric"
  },

  // --- OTHER CASES SECTION A ---
  {
    no: 82,
    procedure: "Open Splenectomy",
    diagnosis: "Diseased spleen",
    cost: 40000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, admission for up to 7 and histopathology",
    category: "Other Procedures"
  },
  {
    no: 83,
    procedure: "Laparoscopic Splenectomy",
    diagnosis: "Diseased spleen",
    cost: 45000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, admission for up to 5 and histopatholoy",
    category: "Other Procedures"
  },
  {
    no: 84,
    procedure: "Open Cholecystectomy",
    diagnosis: "Cholecystitis",
    cost: 50000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 85,
    procedure: "Laparoscopic Cholecystectomy",
    diagnosis: "Cholecystitis",
    cost: 45000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post op labs, admission for up to 5, and histopathology",
    category: "Other Procedures"
  },
  {
    no: 86,
    procedure: "Thyroidectomy",
    diagnosis: "Goitre",
    cost: 35000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post op Las, admission for up to 4 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 87,
    procedure: "Thyroglossal Cyst",
    diagnosis: "Sistrunks Operation",
    cost: 25000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, pre-op labs, admission for up to 4 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 88,
    procedure: "Mastectomy",
    diagnosis: "Breast Cancer",
    cost: 45000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 89,
    procedure: "Open, right, left, transverse Hemicolectomy, sigmoid Colectomy",
    diagnosis: "Right, Left, Transverse and sigmoid colon cancer",
    cost: 60000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre & one post-op labs, grouping and cross-matching of two units, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 90,
    procedure: "Laparoscopic, right, left, transverse Hemicolectomy, sigmoid Colectomy",
    diagnosis: "Right, Left, Transverse and sigmoid colon cancer",
    cost: 70000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre- & one post-op laadmission for up to 5 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 91,
    procedure: "Open Anterior resection of Rectum",
    diagnosis: "High Rectal cancer",
    cost: 60000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 92,
    procedure: "Laparoscopic Anterior resection of Rectum",
    diagnosis: "High Rectal Cancer",
    cost: 65000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre, one post-op labs, grouping and cross-macting of two units, admission for up to 5 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 93,
    procedure: "Open Intersphincteric resection of rectum",
    diagnosis: "Low rectal Cancer",
    cost: 70000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping and matching of two units, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 94,
    procedure: "Laparoscopic Intersphincteric resection of rectum",
    diagnosis: "Low rectal cancer",
    cost: 75000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, admission for up to 5 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 95,
    procedure: "Open Abdomino-perineal resection of rectum",
    diagnosis: "Low rectal cancer",
    cost: 70000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op and one post-op labs, grouping & cross-macting of",
    category: "Other Procedures"
  },

  // --- OTHER CASES SECTION B ---
  {
    no: 96,
    procedure: "Laparoscopic Abdomino-perineal resection of rectum",
    diagnosis: "Low rectal cancer",
    cost: 65000,
    narrative: "two units, admission for up to 7 days and histopathology Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, admission for up to 5 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 97,
    procedure: "Open Total Colectomy",
    diagnosis: "Diverticular disease & Others",
    cost: 80000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 98,
    procedure: "Laparoscopic total colectomy",
    diagnosis: "Diverticular disease & Others",
    cost: 75000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, admission for up to 5 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 99,
    procedure: "Open Pan-Proctocolectomy",
    diagnosis: "Ulcerative colitis",
    cost: 80000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post –op labs, grouping & cross-matching of two units, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 100,
    procedure: "Laparoscopic Pan-proctocolectomy",
    diagnosis: "Ulcerative colitis",
    cost: 75000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching, admission for up to 5 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 101,
    procedure: "Limb amputation",
    diagnosis: "Limb gangrene",
    cost: 25000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of oneunit, and admission for up to 7 days",
    category: "Other Procedures"
  },
  {
    no: 102,
    procedure: "Anal Sphincter repair",
    diagnosis: "Anal incontinence from Obstetric tear",
    cost: 30000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, pre-op labs, and admission for up to 4 days",
    category: "Other Procedures"
  },
  {
    no: 103,
    procedure: "Anal Sphincter Repair",
    diagnosis: "Anal Incontinence from non-obstetric causes",
    cost: 35000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, prer-op labs and admission for up to 4 days",
    category: "Other Procedures"
  },
  {
    no: 104,
    procedure: "Recto-vaginal fistula repair",
    diagnosis: "Recto-vaginal fistula",
    cost: 45000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, pre-op labs, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 105,
    procedure: "Open Prostatectomy",
    diagnosis: "Benign Prostate Hyperplasia",
    cost: 55000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 106,
    procedure: "Open Total Abdominal Hysterectomy",
    diagnosis: "Uterine fibroids",
    cost: 60000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op abs, grouping & cross-matching of two units, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 107,
    procedure: "Laparoscopic total abdominal hysterectomy",
    diagnosis: "Uterine fibroids",
    cost: 65000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post op labs, grouping & cross-matching of two units, admission for up to 5 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 108,
    procedure: "Open Myomectomy",
    diagnosis: "Uterine fibroids",
    cost: 60000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping &cross-matching of two units, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },

  // --- OTHER CASES SECTION C ---
  {
    no: 109,
    procedure: "Laparoscopic Myomectomy",
    diagnosis: "Uterine Fibroids",
    cost: 55000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post op labs, grouping & cross-matching of two units, admission for up to 5 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 110,
    procedure: "Total Vaginal Hysterectomy",
    diagnosis: "Uterine prolapse",
    cost: 45000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, and admission for up to 5 day",
    category: "Other Procedures"
  },
  {
    no: 111,
    procedure: "Exploratory laparotomy and removal of tumour",
    diagnosis: "Intra-abdominal tumour of unknown origin",
    cost: 50000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 112,
    procedure: "Colostomy",
    diagnosis: "Large Bowel obstruction",
    cost: 35000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post –op labs, admission for up to 6 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 113,
    procedure: "Reversal of colostomy under LA",
    diagnosis: "Colostomy",
    cost: 16000,
    narrative: "Procedure/anaesthesia fees, one pre-op labs, medications, admission for up to six days",
    category: "Other Procedures"
  },
  {
    no: 114,
    procedure: "Reversal of colosotomy under GA",
    diagnosis: "Colostomy",
    cost: 25000,
    narrative: "Procedure/anaesthesia fees, medications, one-pre-op & one post-op labs, admission for up to 6 days",
    category: "Other Procedures"
  },
  {
    no: 115,
    procedure: "Altemeier's Operation",
    diagnosis: "Rectal Prolapse",
    cost: 30000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, admission for up to 6 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 116,
    procedure: "Open Appendicectomy",
    diagnosis: "Appendicitis",
    cost: 25000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, admission for up to 6 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 117,
    procedure: "Laparoscopic Appendicectomy",
    diagnosis: "Appendicitis",
    cost: 35000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, admission for up to 4 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 118,
    procedure: "Exploratory Laparotomy & closure of perforation",
    diagnosis: "Peritonitis",
    cost: 35000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, and admission for up to 6 days",
    category: "Other Procedures"
  },
  {
    no: 119,
    procedure: "Exploratory Laparotomy & relieve of obstruction",
    diagnosis: "Small bowel obstruction",
    cost: 35000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & one post-op labs, grouping & cross-matching of two units, and admission for up to 6 days",
    category: "Other Procedures"
  },
  {
    no: 120,
    procedure: "Open Ovarian Cystectomy",
    diagnosis: "Ovarian Cyst",
    cost: 45000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one pre-op & post-op labs, grouping & cross-matching of two units, admission for up to 7 days and histopathology",
    category: "Other Procedures"
  },
  {
    no: 121,
    procedure: "Laparoscopic Ovarian Cystectomy",
    diagnosis: "Ovarian Cyst",
    cost: 40000,
    narrative: "Procedure/anaesthesia fees, drugs & medications, special devices, one preOop & one post-op labs, grouping & cross matching of two units, admission for up to 5 days and histopathology",
    category: "Other Procedures"
  }
];
