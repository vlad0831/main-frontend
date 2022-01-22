export interface QuestionnaireQuestion {
  id: string;
  name: string;
  order: number;
  question: string;
  active: boolean;
  options: {
    id: string;
    active: boolean;
    option: string;
    description: string;
  }[];
}

export interface QuestionnaireAnswer {
  questionnaireId: string;
  selectedOptionId: string;
}

export interface AssetClass {
  id: string;
  name: string;
}

export interface InvestmentValue {
  id: string;
  description: string;
}

export type UserAssetClass = Pick<AssetClass, 'id'>;

export type UserInvestmentValue = Pick<InvestmentValue, 'id'>;

export interface PortfolioAllocation {
  id: string;
  asset: string;
  weight: number;
}

export interface UserPlaidLinkedItem {
  accountId: string;
  accountMask: string;
  accountName: string;
  accountSubtype: string;
  accountType: string;
  active: boolean;
  id: string;
  institutionId: string;
  institutionName: string;
}

export interface AccountValues {
  cash: {
    cashAvailableForTrade: number;
    cashAvailableForWithdraw: number;
    cashBalance: number;
  };
  equityPositions: [
    {
      marketValue: number;
      side: string;
      symbol: string;
    },
  ];
  equityValue: number;
}
