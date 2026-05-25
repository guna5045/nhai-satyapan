import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, TYPOGRAPHY } from '../constants/theme';

export type StatusType = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusPillProps {
  label: string;
  type?: StatusType;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export default function StatusPill({
  label,
  type = 'neutral',
  style,
  labelStyle,
}: StatusPillProps) {
  
  const getContainerStyle = (): StyleProp<ViewStyle> => {
    let backgroundColor = '#E9ECEF';
    let borderColor = '#DEE2E6';

    switch (type) {
      case 'success':
        backgroundColor = '#D1E7DD'; // Light Emerald
        borderColor = '#A3CFBB';
        break;
      case 'warning':
        backgroundColor = '#FFF3CD'; // Light Amber
        borderColor = '#FFE69C';
        break;
      case 'danger':
        backgroundColor = '#F8D7DA'; // Light Red
        borderColor = '#F5C2C7';
        break;
      case 'info':
        backgroundColor = '#CFF4FC'; // Light Cyan
        borderColor = '#9EEAF9';
        break;
    }

    return [styles.container, { backgroundColor, borderColor }, style] as StyleProp<ViewStyle>;
  };

  const getTextStyle = (): StyleProp<TextStyle> => {
    let color = COLORS.textSecondary;

    switch (type) {
      case 'success':
        color = COLORS.success;
        break;
      case 'warning':
        color = '#8F6B00'; // Darker amber for contrast
        break;
      case 'danger':
        color = COLORS.error;
        break;
      case 'info':
        color = '#087990'; // Darker cyan for contrast
        break;
    }

    return [styles.text, { color }, labelStyle] as StyleProp<TextStyle>;
  };

  return (
    <View style={getContainerStyle()}>
      <Text style={getTextStyle()}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    letterSpacing: 0.25,
    textTransform: 'uppercase',
  },
});
