import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Text, TextButton, Title } from 'components/core';
import { AuthenticationStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import { validateEmail } from 'utils/helper';
import Input from 'components/Input';
import { useTheme } from 'theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Register({
  navigation,
}: StackScreenProps<AuthenticationStackParamList, ScreenNames.Register>): JSX.Element {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = useCallback((email: string) => {
    setEmail(email);
  }, []);

  const handlePasswordChange = useCallback((password: string) => {
    setPassword(password);
  }, []);

  const handleSignUp = useCallback(async () => {
    if (!email || !validateEmail(email) || !password) {
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await Auth.signUp({ username: email, password });
      navigation.navigate(ScreenNames.EmailConfirmation, { email, password });
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [email, navigation, password]);

  const handleLoginClick = useCallback(() => {
    navigation.navigate(ScreenNames.Login);
  }, [navigation]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX={16} alignContent="center" justifyContent="center">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <Input
                textContentType="emailAddress"
                value={email}
                placeholder="Email Address"
                onChangeText={handleEmailChange}
              />
              <Input
                textContentType="password"
                value={password}
                placeholder="Password"
                secureTextEntry
                onChangeText={handlePasswordChange}
              />
              <Button
                color="primary"
                title="Sign Up"
                disabled={!email || !validateEmail(email) || !password || loading}
                onPress={handleSignUp}
              />
              <Box justifyContent="center" alignItems="center" bottom={20}>
                <Box flexDirection="row">
                  {password.length < 10 ? (
                    <Icon
                      name="close"
                      size={25}
                      color="red"
                      style={{ position: 'absolute', bottom: 3, left: -10 }}
                    />
                  ) : (
                    <Icon
                      name="check"
                      size={25}
                      color="green"
                      style={{ position: 'absolute', bottom: 3, left: -10 }}
                    />
                  )}
                  <Title
                    variant="navigation"
                    marginTop={50}
                    marginLeft={5}
                    marginBottom={5}
                    paddingLeft={15}
                    color={password.length < 10 ? 'white' : 'green'}
                  >
                    Minimum password length 10
                  </Title>
                </Box>
              </Box>

              <TextButton onPress={handleLoginClick} marginTop={20}>
                Already have an account? Sign In.
              </TextButton>
              {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
              {!!errorMessage && (
                <Text style={{ color: theme.colors.error }} textAlign="center" marginTop="sm">
                  {errorMessage}
                </Text>
              )}
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Box>
    </LinearGradient>
  );
}

export default Register;
