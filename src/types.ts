export interface SolutionSection {
  id: 'sensors' | 'analysis' | 'electrotherapy';
  title: string;
  shortDesc: string;
  details: string[];
  specs: { label: string; value: string }[];
}

export interface MedicalSpec {
  category: string;
  parameters: { name: string; value: string; standard: string }[];
}

export interface PatientIntake {
  fullName: string;
  email: string;
  role: 'physician' | 'patient' | 'trial_investigator' | 'distributor';
  severity: 'mild' | 'moderate' | 'severe';
  symptoms: string[];
  consent: boolean;
}
