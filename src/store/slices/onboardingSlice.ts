import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import {
  AssetClass,
  InvestmentValue,
  UserAssetClass,
  UserInvestmentValue,
  QuestionnaireQuestion,
  QuestionnaireAnswer,
  PortfolioAllocation,
  UserPlaidLinkedItem,
  AccountValues,
} from 'models/onboarding';

interface SliceState {
  questionnaire: QuestionnaireQuestion[];
  questionnaireAnswers: QuestionnaireAnswer[];
  investmentValues: InvestmentValue[];
  userInvestmentValues: UserInvestmentValue[];
  assetClasses: AssetClass[];
  userAssetClasses: UserAssetClass[];
  portfolio: PortfolioAllocation[];
  bankAccounts: UserPlaidLinkedItem[];
  userAccountValue: AccountValues;
}

interface OnboardingReduxState {
  onboarding: SliceState;
}

const onboarding = createSlice({
  name: 'onboarding',
  initialState: {
    questionnaire: [],
    questionnaireAnswers: [],
    investmentValues: [],
    userInvestmentValues: [],
    assetClasses: [],
    userAssetClasses: [],
    portfolio: [],
    bankAccounts: [],
    userAccountValue: {
      cash: {
        cashAvailableForWithdraw: 0,
        cashAvailableForTrade: 0,
        cashBalance: 0,
      },
      equityPositions: [
        {
          marketValue: 0,
          side: '',
          symbol: '',
        },
      ],
      equityValue: 0,
    },
  } as SliceState,
  reducers: {
    setQuestionnaire: (state, action: PayloadAction<QuestionnaireQuestion[]>) => {
      state.questionnaire = action.payload;
    },
    setQuestionnaireAnswers: (state, action: PayloadAction<QuestionnaireAnswer[]>) => {
      state.questionnaireAnswers = action.payload;
    },
    setInvestmentValues: (state, action: PayloadAction<InvestmentValue[]>) => {
      state.investmentValues = action.payload;
    },
    setUserInvestmentValues: (state, action: PayloadAction<UserInvestmentValue[]>) => {
      state.userInvestmentValues = action.payload;
    },
    setAssetClasses: (state, action: PayloadAction<AssetClass[]>) => {
      state.assetClasses = action.payload;
    },
    setUserAssetClasses: (state, action: PayloadAction<UserAssetClass[]>) => {
      state.userAssetClasses = action.payload;
    },
    setPortfolio: (state, action: PayloadAction<PortfolioAllocation[]>) => {
      state.portfolio = action.payload;
    },
    setBankAccounts: (state, action: PayloadAction<UserPlaidLinkedItem[]>) => {
      state.bankAccounts = action.payload;
    },
    setAccountValue: (state, action: PayloadAction<AccountValues>) => {
      state.userAccountValue = action.payload;
    },
  },
});

export const {
  setQuestionnaire,
  setQuestionnaireAnswers,
  setInvestmentValues,
  setUserInvestmentValues,
  setAssetClasses,
  setUserAssetClasses,
  setPortfolio,
  setBankAccounts,
  setAccountValue,
} = onboarding.actions;
export default onboarding.reducer;

const onboardingStateSelector = (state: OnboardingReduxState) => state.onboarding;

export const questionnaireSelector = createSelector(
  onboardingStateSelector,
  (state: SliceState) => state.questionnaire,
);

export const questionnaireAnswersSelector = createSelector(
  onboardingStateSelector,
  (state: SliceState) => state.questionnaireAnswers,
);

export const investmentValuesSelector = createSelector(
  onboardingStateSelector,
  (state: SliceState) => state.investmentValues,
);

export const userInvestmentValuesSelector = createSelector(
  onboardingStateSelector,
  (state: SliceState) => state.userInvestmentValues,
);

export const assetClassesSelector = createSelector(
  onboardingStateSelector,
  (state: SliceState) => state.assetClasses,
);

export const userAssetClasssesSelector = createSelector(
  onboardingStateSelector,
  (state: SliceState) => state.userAssetClasses,
);

export const portfolioSelector = createSelector(
  onboardingStateSelector,
  (state: SliceState) => state.portfolio,
);

export const bankAccountsSelector = createSelector(
  onboardingStateSelector,
  (state: SliceState) => state.bankAccounts,
);
export const accountValueSelector = createSelector(
  onboardingStateSelector,
  (state: SliceState) => state.userAccountValue,
);
