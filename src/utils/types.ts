import { PortfolioAllocation } from 'models/onboarding';

export type RootStackParamList = {
  Splash: undefined;
  Authentication: undefined;
  Authenticated: undefined;
  Onboarding: undefined;
  Main: undefined;
};

export type AuthenticationStackParamList = {
  GetStarted: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string };
  Register: undefined;
  EmailConfirmation: { email: string; password: string };
};

export type OnboardingStackParamList = {
  InvestmentExperience: undefined;
  InvestmentGoal: undefined;
  InvestmentAutonomy: undefined;
  PassionateValues: undefined;
  PortfolioAllocation: { lastUpdated: number };
  SelectAssetClasses: undefined;
  SelectSecurities: undefined;
  ReviewSecurities: undefined;
  WeightSecurities: undefined;
  KnowYourCustomer: undefined;
  SetupBank: undefined;
  FundYourAccount: undefined;
  AddSelfDirected: undefined;
};

export type MainStackParamList = {
  Dashboard: undefined;
  Settings: undefined;
  LinkedAccounts: undefined;
  ChangePassword: undefined;
  TransferMoney: undefined;
  CustomizePortfolio: undefined;
  Sectors: undefined;
  Values: undefined;
  ReviewPortfolio: {
    values: string[];
    sectors: string[];
    portfolio: PortfolioAllocation[];
    changed: boolean;
  };
  RoundUpsAndRecurring: undefined;
};
