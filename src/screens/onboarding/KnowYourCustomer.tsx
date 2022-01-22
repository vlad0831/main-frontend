import React, { memo, useCallback, useEffect } from 'react';
import InquiryBuilders from 'react-native-persona';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient } from 'components/core';
import { OnboardingStackParamList } from 'utils/types';
import { useAuthenticated } from 'providers/Authenticated';
import { ScreenNames } from 'utils/enum';
import { PERSONA_TEMPLATE, PERSONA_ENVIRONMENT } from '../../../config';

function KnowYourCustomer({
  navigation,
}: StackScreenProps<OnboardingStackParamList, ScreenNames.KnowYourCustomer>) {
  const user = useAuthenticated();
  const templateId = PERSONA_TEMPLATE;

  const handleBeginInquiry = useCallback(() => {
    const inquiry = InquiryBuilders.fromTemplate(templateId)
      .referenceId(user.username)
      .environment(PERSONA_ENVIRONMENT)
      .onComplete((inquiryId, status, fields) => {
        console.log(`Inquiry ${inquiryId} completed with status ${status}`);
        console.log(JSON.stringify(fields));
        navigation.navigate(ScreenNames.SetupBank);
      })
      .onCanceled((inquiryId, sessionToken) => {
        console.log(`Inquiry ${inquiryId ?? ''} canceled with sessionToken ${sessionToken ?? ''}`);
      })
      .onError((errorMessage) => {
        console.error(errorMessage);
      })
      .build();
    inquiry.start();
  }, [templateId, user.username, navigation]);

  useEffect(() => {
    handleBeginInquiry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm" justifyContent="center">
        <Button color="primary" title="Resume KYC!" onPress={handleBeginInquiry} />
      </Box>
    </LinearGradient>
  );
}

export default memo(KnowYourCustomer);
