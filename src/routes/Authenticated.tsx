import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from 'utils/enum';
import { useAuthenticated } from 'providers/Authenticated';
import SplashScreen from 'screens/Splash';
import OnboardingNavigator from './Onboarding';
import MainNavigator from './Main';

/** Temporary Code */
import { useEffect, useState } from 'react';
import { CommonActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'utils/types';
import { useAppDispatch, useAppSelector } from 'store/hook';
import {
  questionnaireSelector,
  questionnaireAnswersSelector,
  portfolioSelector,
  bankAccountsSelector,
  setQuestionnaire,
  setQuestionnaireAnswers,
  setInvestmentValues,
  setUserInvestmentValues,
  setAssetClasses,
  setUserAssetClasses,
  setPortfolio,
  setBankAccounts,
  setAccountValue,
} from 'store/slices/onboardingSlice';
import { getLastOnboardingScreen, fetchUserData } from 'utils/helper';
import { setInvestmentPerformance } from 'store/slices/dashboardSlice';
/** End of temporary code */

const AuthenticatedStack = createStackNavigator();

function AuthenticatedNavigator({
  navigation,
}: StackScreenProps<RootStackParamList, ScreenNames.Authenticated>) {
  const user = useAuthenticated();
  const dispatch = useAppDispatch();

  const questionnaire = useAppSelector(questionnaireSelector);
  const questionnaireAnswers = useAppSelector(questionnaireAnswersSelector);
  const portfolio = useAppSelector(portfolioSelector);
  const bankAccounts = useAppSelector(bankAccountsSelector);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const {
          questionnaire,
          questionnaireAnswers,
          investmentValues,
          userInvestmentValues,
          assetClasses,
          userAssetClasses,
          portfolio,
          bankAccounts,
          userAccountValue,
          userInvestmentPerformance,
        } = await fetchUserData(user.username, 12);
        dispatch(setQuestionnaire(questionnaire));
        dispatch(setQuestionnaireAnswers(questionnaireAnswers));
        dispatch(setInvestmentValues(investmentValues));
        dispatch(setUserInvestmentValues(userInvestmentValues));
        dispatch(setAssetClasses(assetClasses));
        dispatch(setUserAssetClasses(userAssetClasses));
        dispatch(setPortfolio(portfolio));
        dispatch(setBankAccounts(bankAccounts));
        if (userAccountValue) {
          dispatch(setAccountValue(userAccountValue));
        }
        dispatch(setInvestmentPerformance(userInvestmentPerformance));
      } catch (error) {
        console.log('error', error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading || error) {
      return;
    }

    // TODO: Handle error case.

    const lastScreenName = getLastOnboardingScreen(
      questionnaire,
      questionnaireAnswers,
      portfolio,
      bankAccounts,
    );

    const onboardingRoutes = [
      { name: ScreenNames.Onboarding, params: { screen: ScreenNames.InvestmentExperience } },
      { name: ScreenNames.Onboarding, params: { screen: ScreenNames.InvestmentGoal } },
      { name: ScreenNames.Onboarding, params: { screen: ScreenNames.InvestmentAutonomy } },
      { name: ScreenNames.Onboarding, params: { screen: ScreenNames.PassionateValues } },
      {
        name: ScreenNames.Onboarding,
        params: { screen: ScreenNames.PortfolioAllocation, params: { lastUpdated: Date.now() } },
      },
      { name: ScreenNames.Onboarding, params: { screen: ScreenNames.SetupBank } },
      { name: ScreenNames.Onboarding, params: { screen: ScreenNames.FundYourAccount } },
    ];

    console.log('lastScreenName', lastScreenName);

    const index = Math.max(
      0,
      onboardingRoutes.findIndex((route) => route.params.screen === lastScreenName),
    );

    navigation.dispatch(CommonActions.reset({ routes: onboardingRoutes.slice(0, index + 1) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, error]);

  return (
    <AuthenticatedStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticatedStack.Screen name={ScreenNames.Splash} component={SplashScreen} />
      <AuthenticatedStack.Screen name={ScreenNames.Onboarding} component={OnboardingNavigator} />
      <AuthenticatedStack.Screen name={ScreenNames.Main} component={MainNavigator} />
    </AuthenticatedStack.Navigator>
  );
}

export default memo(AuthenticatedNavigator);
