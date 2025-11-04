export interface CSVRow {
  'First Name': string;
  'Last Name': string;
  Email: string;
  'Email Address'?: string;
  State: string;
  'Entry Date': string;
  'User IP': string;
  [key: string]: any;
}

export interface DashboardMetrics {
  submissionsPerDay: { date: string; count: number }[];
  submissionsPerMonth: { month: string; count: number }[];
  topIPs: { ip: string; count: number }[];
  topStates: { state: string; count: number }[];
  topEmails: { email: string; count: number }[];
  topNames: { name: string; count: number }[];
  totalSubmissions: number;
}

export interface CSVFile {
  name: string;
  filename: string;
  displayName: string;
  description: string;
}

export const CSV_FILES: CSVFile[] = [
  {
    name: 'consumer-privacy-rights',
    filename: 'consumer-privacy-rights-request-form-2025-11-04.csv',
    displayName: 'Consumer Privacy Rights Requests',
    description: 'Comprehensive privacy rights requests including data deletion, portability, disclosure, and correction requests'
  },
  {
    name: 'opt-out-profiling',
    filename: 'opt-out-from-profiling-form-2025-11-04.csv',
    displayName: 'Opt-out from Profiling',
    description: 'Requests to opt-out from personal information profiling and predictive analysis'
  },
  {
    name: 'opt-out-targeted-advertising',
    filename: 'opt-out-from-targeted-advertising-2025-11-04.csv',
    displayName: 'Opt-out from Targeted Advertising',
    description: 'Requests to opt-out from targeted advertising based on personal information'
  },
  {
    name: 'opt-out-sale-sharing',
    filename: 'opt-out-from-the-sale-andor-sharing-of-your-personal-information-2025-11-04.csv',
    displayName: 'Opt-out from Sale/Sharing',
    description: 'Requests to opt-out from the sale and/or sharing of personal information with third parties'
  },
  {
    name: 'opt-out-sensitive-info',
    filename: 'opt-out-from-the-use-andor-sharing-of-your-sensitive-personal-information-2025-11-04.csv',
    displayName: 'Opt-out from Sensitive Info Use/Sharing',
    description: 'Requests to opt-out from the use and/or sharing of sensitive personal information'
  }
];
