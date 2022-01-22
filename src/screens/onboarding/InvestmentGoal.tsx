import React, { memo, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Title } from 'components/core';
import { OnboardingStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import RadioSelect from 'components/RadioSelect';
import { useAppDispatch, useAppSelector } from 'store/hook';
import {
  questionnaireAnswersSelector,
  questionnaireSelector,
  setQuestionnaireAnswers,
} from 'store/slices/onboardingSlice';
import { getQuestionAnswers, updateQuestionnaireAnswers, saveQuestionAnswers } from 'utils/helper';
import { INVESTMENT_QUESTION_TYPE } from 'utils/constants';
import { useAuthenticated } from 'providers/Authenticated';

function InvestmentGoal({
  navigation,
}: StackScreenProps<OnboardingStackParamList, ScreenNames.InvestmentGoal>) {
  const dispatch = useAppDispatch();
  const user = useAuthenticated();
  const questionnaire = useAppSelector(questionnaireSelector);
  const questionnaireAnswers = useAppSelector(questionnaireAnswersSelector);
  const currentQuestion = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => questionnaire.find((question) => question.name === INVESTMENT_QUESTION_TYPE.GOAL)!,
    [questionnaire],
  );
  const [selectedAnswer, setSelectedAnswer] = useState(() => {
    const [questionAnswer] = getQuestionAnswers(currentQuestion, questionnaireAnswers);
    return questionAnswer?.selectedOptionId;
  });
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((answer: string) => {
    setSelectedAnswer(answer);
  }, []);

  const handleNext = useCallback(async () => {
    if (!selectedAnswer) {
      return;
    }

    const [originalAnswer] = getQuestionAnswers(currentQuestion, questionnaireAnswers);

    if (selectedAnswer !== originalAnswer?.selectedOptionId) {
      try {
        setLoading(true);

        const newAnswers = updateQuestionnaireAnswers(questionnaireAnswers, currentQuestion, {
          questionnaireId: currentQuestion.id,
          selectedOptionId: selectedAnswer,
        });

        await saveQuestionAnswers(user.username, currentQuestion.id, [selectedAnswer]);

        dispatch(setQuestionnaireAnswers(newAnswers));
      } catch {
        Alert.alert('Failed to save the answer.');
        return;
      } finally {
        setLoading(false);
      }
    }

    navigation.navigate(ScreenNames.InvestmentAutonomy);
  }, [selectedAnswer, currentQuestion, questionnaireAnswers, navigation, user.username, dispatch]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Title variant="section">{currentQuestion?.question}</Title>
        <Box flex={1} alignContent="center" justifyContent="center">
          {currentQuestion.options.map((option) => (
            <RadioSelect
              key={option.id}
              label={option.option}
              description={option.description}
              selected={option.id === selectedAnswer}
              onChange={() => handleChange(option.id)}
            />
          ))}
        </Box>
        <Button
          color="primary"
          title="Next"
          onPress={handleNext}
          disabled={loading || !selectedAnswer}
        />
        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
      </Box>
    </LinearGradient>
  );
}

export default memo(InvestmentGoal);
