import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, FontSize } from 'utils/constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  textWrapper: {
    maxWidth: '90%',
  },
  label: {
    color: Colors.white,
    fontSize: FontSize.large,
    lineHeight: 20,
  },
  checkBoxWrapper: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  check: {
    width: 8,
    height: 8,
    backgroundColor: 'transparent',
  },
});

interface CheckBoxProps {
  checked: boolean;
  label: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onChange: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, label, style, labelStyle, onChange }) => {
  return (
    <TouchableWithoutFeedback onPress={onChange}>
      <View style={[styles.container, style]}>
        <View style={styles.textWrapper}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>
        <View
          style={{
            ...styles.checkBoxWrapper,
            borderColor: checked ? Colors.white : Colors.darkWhite,
          }}
        >
          <View
            style={{
              ...styles.check,
              backgroundColor: checked ? Colors.white : 'transparent',
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CheckBox;
