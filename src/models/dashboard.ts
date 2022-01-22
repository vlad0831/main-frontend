export enum FundingMethod {
  OneTime = 'OneTime',
  Recurring = 'Recurring',
  RoundUp = 'RoundUp',
}

export enum RecurringFundingFrequency {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Biweekly = 'Biweekly',
  Monthly = 'Monthly',
}

export interface Transaction {
  id: string;
  active: boolean;
  amount: number;
  attribute: JSON;
  createdAt: string;
  currency: string;
  executionDate: string;
  fromAccountTable: string;
  note: string;
  statusNumber: number;
  toAccountId: string;
  toAccountTable: string;
  fundingMethod: {
    id: string;
    active: boolean;
    method: FundingMethod;
    recurringFundingSetting: {
      id: string;
      active: boolean;
      amount: number;
      currency: string;
      day: number;
      frequency: RecurringFundingFrequency;
      nextExecutionDate: number;
    };
  };
}

export enum PlaidLinkedItemVerificationStatus {
  AutomaticallyVerified = 'automatically_verified',
  PendingAutomaticVerification = 'pending_automatic_verification',
  PendingManualVerification = 'pending_manual_verification',
  ManuallyVerified = 'manually_verified',
  VerificationExpired = 'verification_expired',
  VerificationFailed = 'verification_failed',
}

export interface InvestmentPerformance {
  date: string;
  cash: number;
  deposits: number;
  cumRealizedPL: number;
  equity: number;
  fees: number;
  unrealizedDayPL: number;
  realizedDayPL: number;
  withdrawals: number;
}
