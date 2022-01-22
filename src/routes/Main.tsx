import React, { memo } from 'react';
import { CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackScreenProps } from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { ScreenNames } from 'utils/enum';
import { MainStackParamList, RootStackParamList } from 'utils/types';
import DashboardScreen from 'screens/main/Dashboard';
import SettingsScreen from 'screens/main/Settings';
import LinkedAccountsScreen from 'screens/main/Settings/LinkedAccounts';
import ChangePasswordScreen from 'screens/main/Settings/ChangePassword';
import TransferMoneyScreen from 'screens/main/TransferMoney';
import CustomizePortfolioScreen from 'screens/main/CustomizePortfolio';
import Sectors from 'screens/main/CustomizePortfolio/Sectors';
import Values from 'screens/main/CustomizePortfolio/Values';
import ReviewPortfolioScreen from 'screens/main/CustomizePortfolio/ReviewPortfolio';
import RoundUpsAndRecurringScreen from 'screens/main/RoundUpsAndRecurring';
import { useTheme } from 'theme';

const MainStack = createStackNavigator<MainStackParamList>();

function MainNavigator({ navigation }: StackScreenProps<RootStackParamList, ScreenNames.Main>) {
  const theme = useTheme();

  return (
    <MainStack.Navigator
      initialRouteName={ScreenNames.Dashboard}
      screenOptions={{
        headerTintColor: theme.colors.white,
        headerStyle: {
          backgroundColor: theme.colors.purple,
          shadowColor: 'transparent',
        },
        headerBackTitleVisible: false,
      }}
    >
      <MainStack.Screen
        name={ScreenNames.Dashboard}
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          headerLeft: () => null,
          headerRight: () => (
            <Icons
              name="menu"
              color={theme.colors.white}
              size={28}
              onPress={() => navigation.dispatch(CommonActions.navigate(ScreenNames.Settings))}
            />
          ),
        }}
      />
      <MainStack.Screen
        name={ScreenNames.Settings}
        component={SettingsScreen}
        options={{ title: 'Menu' }}
      />
      <MainStack.Screen
        name={ScreenNames.LinkedAccounts}
        component={LinkedAccountsScreen}
        options={{ title: 'Linked Accounts' }}
      />
      <MainStack.Screen
        name={ScreenNames.ChangePassword}
        component={ChangePasswordScreen}
        options={{ title: 'Change Password' }}
      />
      <MainStack.Screen
        name={ScreenNames.TransferMoney}
        component={TransferMoneyScreen}
        options={{ title: 'Transfer Money' }}
      />
      <MainStack.Screen
        name={ScreenNames.CustomizePortfolio}
        component={CustomizePortfolioScreen}
        options={{ title: 'Customize Portfolio' }}
      />
      <MainStack.Screen
        name={ScreenNames.Sectors}
        component={Sectors}
        options={{ title: '', headerShown: false }}
      />
      <MainStack.Screen
        name={ScreenNames.Values}
        component={Values}
        options={{ title: '', headerShown: false }}
      />
      <MainStack.Screen
        name={ScreenNames.ReviewPortfolio}
        component={ReviewPortfolioScreen}
        options={{ title: 'Review Portfolio' }}
      />
      <MainStack.Screen
        name={ScreenNames.RoundUpsAndRecurring}
        component={RoundUpsAndRecurringScreen}
        options={{ title: 'Round-ups & recurring' }}
      />
    </MainStack.Navigator>
  );
}

export default memo(MainNavigator);
