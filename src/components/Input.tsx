import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from 'utils/constants';

const Input = React.forwardRef<RNTextInput, RNTextInputProps>((props, forwardedRef) => {
  const { style, ...otherProps } = props;

  return (
    <View style={styles.container}>
      <RNTextInput
        ref={forwardedRef}
        maxLength={props.maxLength}
        multiline={props.multiline || false}
        style={[styles.textInput, style]}
        {...otherProps}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.darkWhite,
    borderRadius: 8,
    marginVertical: 6,
  },
  textInput: {
    fontSize: 16,
    letterSpacing: 0,
    padding: 15,
  },
});

export default Input;
