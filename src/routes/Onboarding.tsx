import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from 'utils/enum';
import InvestmentExperience from 'screens/onboarding/InvestmentExperience';
import InvestmentGoal from 'screens/onboarding/InvestmentGoal';
import InvestmentAutonomy from 'screens/onboarding/InvestmentAutonomy';
import PassionateValues from 'screens/onboarding/PassionateValues';
import SelectAssetClasses from 'screens/onboarding/SelectAssetClasses';
import SelectSecurities from 'screens/onboarding/SelectSecurities';
import ReviewSecurities from 'screens/onboarding/ReviewSecurities';
import WeightSecurities from 'screens/onboarding/WeightSecurities';
import PortfolioAllocation from 'screens/onboarding/PortfolioAllocation';
import KnowYourCustomer from 'screens/onboarding/KnowYourCustomer';
import SetupBank from 'screens/onboarding/SetupBank';
import FundYourAccount from 'screens/onboarding/FundYourAccount';
import AddSelfDirected from 'screens/onboarding/AddSelfDirected';
import { useTheme } from 'theme';

const OnboardingStack = createStackNavigator();

function OnboardingNavigator() {
  const theme = useTheme();

  return (
    <OnboardingStack.Navigator
      initialRouteName={ScreenNames.GetStarted}
      screenOptions={{
        headerTintColor: theme.colors.white,
        headerStyle: {
          backgroundColor: theme.colors.purple,
          shadowColor: 'transparent',
        },
        headerBackTitleVisible: false,
      }}
    >
      <OnboardingStack.Screen
        name={ScreenNames.InvestmentExperience}
        component={InvestmentExperience}
        options={{ title: 'Investment Experience', headerLeft: () => null }}
      />
      <OnboardingStack.Screen
        name={ScreenNames.InvestmentGoal}
        component={InvestmentGoal}
        options={{ title: 'Investment Goal' }}
      />
      <OnboardingStack.Screen
        name={ScreenNames.InvestmentAutonomy}
        component={InvestmentAutonomy}
        options={{ title: 'Investment Autonomy' }}
      />
      <OnboardingStack.Screen
        name={ScreenNames.PassionateValues}
        component={PassionateValues}
        options={{ title: 'Passionate Values' }}
      />
      <OnboardingStack.Screen
        name={ScreenNames.PortfolioAllocation}
        component={PortfolioAllocation}
        options={{ title: 'Portfolio Allocation' }}
      />
      <OnboardingStack.Screen
        name={ScreenNames.SelectAssetClasses}
        component={SelectAssetClasses}
        options={{ title: 'Adjust Portfolio' }}
      />
      <OnboardingStack.Screen
        name={ScreenNames.SelectSecurities}
        component={SelectSecurities}
        options={{ title: 'Create Your portfolio' }}
      />
      <OnboardingStack.Screen
        name={ScreenNames.ReviewSecurities}
        component={ReviewSecurities}
        options={{ title: 'Review Your portfolio' }}
      />
      <OnboardingStack.Screen
        name={ScreenNames.WeightSecurities}
        component={WeightSecurities}
        options={{ title: 'Choose Weights' }}
      />
      <OnboardingStack.Screen
        name={ScreenNames.AddSelfDirected}
        component={AddSelfDirected}
        options={{ title: 'Add self directed' }}
      />
      <OnboardingStack.Screen
        name={ScreenNames.KnowYourCustomer}
        component={KnowYourCustomer}
        options={{ title: 'KYC' }}
      />
      <OnboardingStack.Screen
        name={ScreenNames.SetupBank}
        component={SetupBank}
        options={{ title: 'Link your bank' }}
      />
      <OnboardingStack.Screen
        name={ScreenNames.FundYourAccount}
        component={FundYourAccount}
        options={{ title: 'Fund your account' }}
      />
    </OnboardingStack.Navigator>
  );
}

export default memo(OnboardingNavigator);
