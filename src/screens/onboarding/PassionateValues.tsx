import React, { memo, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Title } from 'components/core';
import { OnboardingStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import CheckBox from 'components/CheckBox';
import { useAppDispatch, useAppSelector } from 'store/hook';
import {
  investmentValuesSelector,
  userInvestmentValuesSelector,
  questionnaireSelector,
  setUserInvestmentValues,
} from 'store/slices/onboardingSlice';
import { setEquality, saveUserInvestmentValues } from 'utils/helper';
import { INVESTMENT_QUESTION_TYPE } from 'utils/constants';

function PassionateValues({
  navigation,
}: StackScreenProps<OnboardingStackParamList, ScreenNames.PassionateValues>) {
  const dispatch = useAppDispatch();
  const questionnaire = useAppSelector(questionnaireSelector);
  const currentQuestion = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      questionnaire.find((question) => question.name === INVESTMENT_QUESTION_TYPE.PREFERABILITY)!,
    [questionnaire],
  );
  const investmentValues = useAppSelector(investmentValuesSelector);
  const userInvestmentValues = useAppSelector(userInvestmentValuesSelector);
  const [selectedInvestmentValueSet, setSelectedInvestmentValueSet] = useState(
    () => new Set(userInvestmentValues.map(({ id }) => id)),
  );
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((investmentValueId: string) => {
    setSelectedInvestmentValueSet((selectedInvestmentValueSet) => {
      const newSelectedAnswerSet = new Set(selectedInvestmentValueSet);

      if (selectedInvestmentValueSet.has(investmentValueId)) {
        newSelectedAnswerSet.delete(investmentValueId);
      } else {
        newSelectedAnswerSet.add(investmentValueId);
      }

      return newSelectedAnswerSet;
    });
  }, []);

  const handleNext = useCallback(async () => {
    const originalValueSet = new Set(userInvestmentValues.map(({ id }) => id));
    const hasNewSelection = !setEquality(originalValueSet, selectedInvestmentValueSet);

    if (hasNewSelection) {
      try {
        setLoading(true);

        const selectedInvestmentValues = Array.from(selectedInvestmentValueSet);

        await saveUserInvestmentValues(selectedInvestmentValues);

        dispatch(setUserInvestmentValues(selectedInvestmentValues.map((id) => ({ id }))));
      } catch {
        Alert.alert('Failed to save the answer.');
        return;
      } finally {
        setLoading(false);
      }
    }

    navigation.navigate(ScreenNames.PortfolioAllocation, { lastUpdated: Date.now() });
  }, [userInvestmentValues, selectedInvestmentValueSet, navigation, dispatch]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Title variant="section">{currentQuestion.question}</Title>
        <Box flex={1} alignContent="center" justifyContent="center">
          {investmentValues.map((investmentValue) => (
            <CheckBox
              key={investmentValue.id}
              label={investmentValue.description}
              checked={selectedInvestmentValueSet.has(investmentValue.id)}
              onChange={() => handleChange(investmentValue.id)}
            />
          ))}
        </Box>
        <Button
          color="primary"
          title="Next"
          onPress={handleNext}
          disabled={loading || selectedInvestmentValueSet.size === 0}
        />
        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
      </Box>
    </LinearGradient>
  );
}

export default memo(PassionateValues);
