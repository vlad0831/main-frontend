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
    fontSize: 24,
    textTransform: 'capitalize',
  },
  description: {
    color: Colors.white,
    fontSize: FontSize.medium,
    lineHeight: 20,
    marginTop: 15,
  },
  radioWrapper: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 9,
  },
  radio: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
});

interface RadioSelectProps {
  selected: boolean;
  label: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onChange: () => void;
}

const RadioSelect: React.FC<RadioSelectProps> = ({
  selected,
  label,
  description,
  style,
  labelStyle,
  onChange,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onChange}>
      <View style={[styles.container, style]}>
        <View style={styles.textWrapper}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View
          style={{
            ...styles.radioWrapper,
            borderColor: selected ? Colors.white : Colors.darkWhite,
          }}
        >
          <View
            style={{
              ...styles.radio,
              backgroundColor: selected ? Colors.white : 'transparent',
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RadioSelect;
