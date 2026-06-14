// Sample transactions used when the app first loads.
export const initialTransactions = [
  { id: "TXN1001", department: "Receipt Check", amount: 52000, riskScore: 82 },
  { id: "TXN1002", department: "Ledger Matching", amount: 18500, riskScore: 34 },
  { id: "TXN1003", department: "Tax Calculation", amount: 74000, riskScore: 91 },
  { id: "TXN1004", department: "Receipt Check", amount: 9600, riskScore: 22 },
  { id: "TXN1005", department: "Ledger Matching", amount: 41000, riskScore: 68 }
];

export const auditCheckpoints = [
  "Receipt Check",
  "Voucher Verification",
  "Ledger Matching",
  "Tax Calculation"
];

export const approvalRules = [
  {
    transferBand: "Up to ₹10,000",
    requiredSignatures: "Branch Teller",
    departments: "Receipt Check",
    riskLevel: "Low"
  },
  {
    transferBand: "₹10,001 - ₹50,000",
    requiredSignatures: "Branch Manager + Compliance Officer",
    departments: "Receipt Check, Voucher Verification",
    riskLevel: "Medium"
  },
  {
    transferBand: "₹50,001 - ₹1,00,000",
    requiredSignatures: "Regional Manager + Compliance Officer + Audit Lead",
    departments: "Receipt Check, Voucher Verification, Ledger Matching",
    riskLevel: "High"
  },
  {
    transferBand: "Above ₹1,00,000",
    requiredSignatures: "Director Approval + Audit Lead + Tax Reviewer",
    departments: "Receipt Check, Voucher Verification, Ledger Matching, Tax Calculation",
    riskLevel: "Critical"
  }
];

// Verification graph used by BFS to trace the shortest route to an accounting error.
export const auditCheckpointGraph = {
  "Receipt Check": ["Voucher Verification", "Invoice Amount Review"],
  "Voucher Verification": ["Receipt Check", "Ledger Matching"],
  "Invoice Amount Review": ["Receipt Check", "Approval Limit Review"],
  "Ledger Matching": [
    "Voucher Verification",
    "Bank Reconciliation",
    "Tax Calculation"
  ],
  "Approval Limit Review": ["Invoice Amount Review", "Exception Review"],
  "Bank Reconciliation": ["Ledger Matching", "Exception Review"],
  "Tax Calculation": ["Ledger Matching", "Exception Review"],
  "Exception Review": [
    "Approval Limit Review",
    "Bank Reconciliation",
    "Tax Calculation",
    "Accounting Error Located"
  ],
  "Accounting Error Located": ["Exception Review"]
};

export const complianceOfficers = [
  { id: "CO-01", name: "Aarav Mehta", specialization: "High-value transfers", maxBranches: 3 },
  { id: "CO-02", name: "Riya Nair", specialization: "KYC and onboarding", maxBranches: 3 },
  { id: "CO-03", name: "Kabir Singh", specialization: "Branch operations", maxBranches: 2 },
  { id: "CO-04", name: "Meera Rao", specialization: "Tax calculation escalation", maxBranches: 2 }
];

export const branchAuditTasks = [
  { id: "BR-101", name: "Andheri Branch", riskScore: 91, region: "West", assignedOfficerId: "CO-01" },
  { id: "BR-102", name: "Bandra Branch", riskScore: 72, region: "West", assignedOfficerId: "CO-02" },
  { id: "BR-201", name: "Pune Branch", riskScore: 64, region: "West", assignedOfficerId: "CO-03" },
  { id: "BR-301", name: "Delhi Branch", riskScore: 88, region: "North", assignedOfficerId: "" },
  { id: "BR-401", name: "Bengaluru Branch", riskScore: 57, region: "South", assignedOfficerId: "" }
];
