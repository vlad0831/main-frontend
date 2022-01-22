import {
  GET_USER_PREFERENCES,
  GET_RECOMMENDED_PORTFOLIO,
  GET_PLAID_LINK_TOKEN,
} from 'graphql/queries';
import {
  QuestionnaireQuestion,
  QuestionnaireAnswer,
  AssetClass,
  InvestmentValue,
  UserAssetClass,
  UserInvestmentValue,
  PortfolioAllocation,
  UserPlaidLinkedItem,
  AccountValues,
} from 'models/onboarding';
import { INVESTMENT_QUESTION_TYPE } from 'utils/constants';
import { ScreenNames } from 'utils/enum';
import {
  SET_USER_INVESTMENT_QUESTIONNAIRE_ANSWER,
  SET_USER_INVESTMENT_VALUE_LIST,
  SET_USER_ASSET_CLASS_LIST,
  SET_USER_PORTFOLIO_PREFERENCES,
  SET_USER_PLAID_LINKED_ITEM,
  DELETE_USER_PLAID_LINKED_ITEM,
} from 'graphql/mutations';
import { query } from './http';
import { InvestmentPerformance } from 'models/dashboard';

export function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function setEquality<T>(setA: Set<T>, setB: Set<T>): boolean {
  const intersectSet = new Set(Array.from(setA).filter((element) => setB.has(element)));
  const unionSet = new Set([...setA, ...setB]);
  return intersectSet.size === unionSet.size;
}

export function getLastOnboardingScreen(
  questionnaire: QuestionnaireQuestion[],
  questionnaireAnswers: QuestionnaireAnswer[],
  portfolio: PortfolioAllocation[],
  bankAccounts: UserPlaidLinkedItem[],
): ScreenNames {
  if (bankAccounts.length > 0) {
    return ScreenNames.FundYourAccount;
  }

  if (portfolio.length === 0) {
    const nextQuestion = questionnaire.find(
      (question) => !questionnaireAnswers?.some((answer) => answer.questionnaireId === question.id),
    );

    if (nextQuestion) {
      const questionnaireName = nextQuestion.name;

      switch (questionnaireName) {
        case INVESTMENT_QUESTION_TYPE.LEVEL:
          return ScreenNames.InvestmentExperience;
        case INVESTMENT_QUESTION_TYPE.GOAL:
          return ScreenNames.InvestmentGoal;
        default:
          return ScreenNames.PassionateValues;
      }
    }
  }

  return ScreenNames.PortfolioAllocation;
}

export async function fetchUserData(
  userId: string,
  monthPeriod: number,
): Promise<{
  questionnaire: QuestionnaireQuestion[];
  questionnaireAnswers: QuestionnaireAnswer[];
  investmentValues: InvestmentValue[];
  userInvestmentValues: UserInvestmentValue[];
  assetClasses: AssetClass[];
  userAssetClasses: UserAssetClass[];
  portfolio: PortfolioAllocation[];
  bankAccounts: UserPlaidLinkedItem[];
  userAccountValue: AccountValues;
  userInvestmentPerformance: InvestmentPerformance[];
}> {
  const data = await query<{
    data: {
      getInvestmentPreferencesSettings: {
        assetClassList: AssetClass[];
        investmentValueList: InvestmentValue[];
      };
      getUserInvestmentPreferences: {
        assetClassList: UserAssetClass[];
        investmentValueList: UserInvestmentValue[];
      };
      getAllQuestionnaire: QuestionnaireQuestion[];
      getUserInvestmentQuestionnaireAnswers: QuestionnaireAnswer[];
      getUserRecommendedPortfolio: PortfolioAllocation[];
      getUserPlaidLinkedItems: UserPlaidLinkedItem[];
      getUserInvestmentProfileSummary: AccountValues;
      getUserInvestmentPerformance: InvestmentPerformance[];
    };
  }>(GET_USER_PREFERENCES, { userId, monthPeriod }, true);

  const equityPositions = data.data?.getUserInvestmentProfileSummary?.equityPositions ?? [];
  const sortedEquityPositions = [...equityPositions]
    .sort((a, b) => Math.round(b.marketValue) - Math.round(a.marketValue))
    .map((position) => ({
      id: position.symbol,
      asset: position.symbol,
      weight: position.marketValue,
    }));

  return {
    questionnaire: data.data?.getAllQuestionnaire,
    questionnaireAnswers: data.data?.getUserInvestmentQuestionnaireAnswers,
    investmentValues: data.data?.getInvestmentPreferencesSettings.investmentValueList,
    userInvestmentValues: data.data?.getUserInvestmentPreferences.investmentValueList,
    assetClasses: data.data?.getInvestmentPreferencesSettings.assetClassList,
    userAssetClasses: data.data?.getUserInvestmentPreferences.assetClassList,
    portfolio: sortedEquityPositions || [],
    bankAccounts: data.data?.getUserPlaidLinkedItems,
    userAccountValue: data.data?.getUserInvestmentProfileSummary,
    userInvestmentPerformance: data.data?.getUserInvestmentPerformance || [],
  };
}

export async function fetchUserPortfolio(
  sectors?: string[],
  values?: string[],
): Promise<PortfolioAllocation[]> {
  const data = await query<{
    data: { getUserRecommendedPortfolio: PortfolioAllocation[] };
  }>(
    GET_RECOMMENDED_PORTFOLIO,
    {
      ...(sectors ? { assetClassIdList: sectors } : null),
      ...(values ? { investmentValueIdList: values } : null),
    },
    true,
  );

  return data.data?.getUserRecommendedPortfolio;
}

export function getQuestionAnswers(
  question: QuestionnaireQuestion,
  questionnaireAnswers: QuestionnaireAnswer[],
): QuestionnaireAnswer[] {
  return questionnaireAnswers.filter((answer) => answer.questionnaireId === question.id);
}

export function updateQuestionnaireAnswers(
  questionnaireAnswers: QuestionnaireAnswer[],
  question: QuestionnaireQuestion,
  answerOrAnswers: QuestionnaireAnswer | QuestionnaireAnswer[],
): QuestionnaireAnswer[] {
  return questionnaireAnswers
    .filter((answer) => answer.questionnaireId !== question.id)
    .concat(answerOrAnswers);
}

export function saveQuestionAnswers(
  userId: string,
  questionId: string,
  answerIds: string[],
): Promise<void> {
  return query(
    SET_USER_INVESTMENT_QUESTIONNAIRE_ANSWER,
    {
      userId,
      questionnaireId: questionId,
      selectedOptionIdList: answerIds,
    },
    true,
  );
}

export function saveUserInvestmentValues(investmentValueIds: string[]): Promise<void> {
  return query(
    SET_USER_INVESTMENT_VALUE_LIST,
    {
      investmentValueIdList: investmentValueIds,
    },
    true,
  );
}

export function saveUserAssetClasses(assetClassIds: string[]): Promise<void> {
  return query(
    SET_USER_ASSET_CLASS_LIST,
    {
      assetClassIdList: assetClassIds,
    },
    true,
  );
}

export function savePortfolioPreferences(
  investmentValueIds: string[],
  assetClassIds: string[],
): Promise<void> {
  return query(
    SET_USER_PORTFOLIO_PREFERENCES,
    {
      investmentValueIdList: investmentValueIds,
      assetClassIdList: assetClassIds,
    },
    true,
  );
}

export async function getPlaidLinkToken(): Promise<string> {
  const { data } = await query<{ data: { getPlaidLinkToken: string } }>(
    GET_PLAID_LINK_TOKEN,
    null,
    true,
  );

  return data.getPlaidLinkToken;
}

export async function saveBankAccount(
  plaidLinkToken: string,
  instituteId: string | undefined,
  accountId: string,
): Promise<UserPlaidLinkedItem> {
  const { data } = await query<{ data: { setUserPlaidLinkedItem: UserPlaidLinkedItem[] } }>(
    SET_USER_PLAID_LINKED_ITEM,
    {
      plaidLinkedItemList: [
        {
          plaidPublicToken: plaidLinkToken,
          plaidInstitutionId: instituteId,
          plaidAccountId: accountId,
        },
      ],
    },
    true,
  );

  return data.setUserPlaidLinkedItem[0];
}

export function deleteBankAccount(bankAccountId: string): Promise<void> {
  return query(
    DELETE_USER_PLAID_LINKED_ITEM,
    {
      plaidLinkedItemList: [
        {
          userPlaidLinkedItemId: bankAccountId,
        },
      ],
    },
    true,
  );
}

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

function getFrequencyDays(frequency: Frequency) {
  switch (frequency) {
    case 'daily':
      return 1;
    case 'weekly':
      return 7;
    case 'monthly':
      return 30;
    case 'yearly':
      return 365;
  }
}

function getCompoundInterest(dailyInterest: number, days: number): number {
  return (1 + dailyInterest) ** days - 1;
}

export function getProjectedValue({
  estimatedMonthlyRoundUps,
  initialAmount,
  recurringContribution,
  recurringFrequency,
  period = 365,
  dailyInterest = 0.000261,
}: {
  initialAmount: number;
  estimatedMonthlyRoundUps: number;
  recurringContribution: number;
  recurringFrequency: Frequency;
  dailyInterest: number;
  period: number;
}): number {
  const roundUpsInterest = getCompoundInterest(dailyInterest, getFrequencyDays('monthly'));
  const recurringContributionInterest = getCompoundInterest(
    dailyInterest,
    getFrequencyDays(recurringFrequency),
  );

  return (
    initialAmount * (1 + dailyInterest) ** period +
    (estimatedMonthlyRoundUps *
      ((1 + roundUpsInterest) ** (period / getFrequencyDays('monthly')) - 1)) /
      roundUpsInterest +
    (recurringContribution *
      ((1 + recurringContributionInterest) ** (period / getFrequencyDays(recurringFrequency)) -
        1)) /
      recurringContributionInterest
  );
}

export function numberWithCommas(x: number | string): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** Temporary, we should move this to the backend eventually. */
const tickerAssetClassMap = new Map(
  [
    { ticker: 'VLUE', assetClass: 'factor' },
    { ticker: 'BIL', assetClass: 'cash' },
    { ticker: 'VTI', assetClass: 'equity' },
    { ticker: 'VEA', assetClass: 'equity' },
    { ticker: 'VWO', assetClass: 'equity' },
    { ticker: 'VGSH', assetClass: 'fixed income' },
    { ticker: 'VGIT', assetClass: 'fixed income' },
    { ticker: 'VGLT', assetClass: 'fixed income' },
    { ticker: 'LQD', assetClass: 'fixed income' },
    { ticker: 'HYG', assetClass: 'fixed income' },
    { ticker: 'VWOB', assetClass: 'fixed income' },
    { ticker: 'TIP', assetClass: 'fixed income' },
    { ticker: 'GLD', assetClass: 'gold' },
    { ticker: 'PDBC', assetClass: 'commodity' },
    { ticker: 'VNQ', assetClass: 'real estate' },
    { ticker: 'QVAL', assetClass: 'factor' },
    { ticker: 'QMOM', assetClass: 'factor' },
    { ticker: 'VIG', assetClass: 'factor' },
    { ticker: 'BLOK', assetClass: 'blockchain' },
    { ticker: 'QQQ', assetClass: 'innovation' },
    { ticker: 'QQQJ', assetClass: 'innovation' },
    { ticker: 'ARKK', assetClass: 'innovation' },
    { ticker: 'IBB', assetClass: 'innovation' },
    { ticker: 'NACP', assetClass: 'values' },
    { ticker: 'SHE', assetClass: 'values' },
    { ticker: 'ICLN', assetClass: 'values' },
    { ticker: 'PHO', assetClass: 'values' },
    { ticker: 'BIBL', assetClass: 'values' },
  ].map(({ ticker, assetClass }) => [ticker, assetClass]),
);

export function convertInstrumentsToAssetClasses(portfolio: PortfolioAllocation[]): {
  id: string;
  asset: string;
  weight: number;
}[] {
  const assetClassSet = new Set(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    portfolio.map((allocation) => tickerAssetClassMap.get(allocation.asset)!),
  );

  const assetClassPortfolio = portfolio.reduce((portfolio, allocation) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const assetClass = tickerAssetClassMap.get(allocation.asset)!;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    portfolio.set(assetClass, portfolio.get(assetClass)! + allocation.weight);

    return portfolio;
  }, new Map(Array.from(assetClassSet).map((assetClass) => [assetClass, 0])));

  return Array.from(assetClassPortfolio).map(([assetClass, weight]) => ({
    id: assetClass,
    asset: capitalise(assetClass),
    weight,
  }));
}

export function capitalise(text: string): string {
  return text
    .toLowerCase()
    .replace(
      /([^a-z])([a-z])(?=[a-z]{2})|^([a-z])/g,
      (_, g1: string | undefined, g2: string, g3: string) => {
        return typeof g1 === 'undefined' ? g3.toUpperCase() : g1 + g2.toUpperCase();
      },
    );
}

export function getPercentage(partialValue: number, totalValue: number) {
  return (100 * partialValue) / totalValue;
}
