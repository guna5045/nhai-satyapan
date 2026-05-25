import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle, 
  StyleProp 
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, SHADOWS } from '../constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  labelStyle,
  accessibilityLabel,
  accessibilityHint,
}: ButtonProps) {
  
  const getButtonStyles = (): StyleProp<ViewStyle> => {
    const base: ViewStyle = styles.baseButton;
    let variantStyle: ViewStyle = {};
    
    switch (variant) {
      case 'primary':
        variantStyle = {
          backgroundColor: disabled ? COLORS.borderDark : COLORS.primary,
          borderWidth: 0,
        };
        break;
      case 'secondary':
        variantStyle = {
          backgroundColor: disabled ? COLORS.borderDark : COLORS.accent,
          borderWidth: 0,
        };
        break;
      case 'danger':
        variantStyle = {
          backgroundColor: disabled ? COLORS.borderDark : COLORS.error,
          borderWidth: 0,
        };
        break;
      case 'outline':
        variantStyle = {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: disabled ? COLORS.border : COLORS.primary,
        };
        break;
    }
    
    return [
      base, 
      variantStyle, 
      variant !== 'outline' && !disabled && SHADOWS.sm, 
      style
    ] as StyleProp<ViewStyle>;
  };

  const getLabelStyles = (): StyleProp<TextStyle> => {
    let color = COLORS.textOnPrimary;
    
    if (variant === 'outline') {
      color = disabled ? COLORS.textLight : COLORS.primary;
    } else if (disabled) {
      color = COLORS.textSecondary;
    }
    
    return [
      styles.baseLabel, 
      { color }, 
      labelStyle
    ] as StyleProp<TextStyle>;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={getButtonStyles()}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? COLORS.primary : COLORS.textOnPrimary} 
          style={styles.loader}
        />
      ) : (
        <Text style={getLabelStyles()}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
  },
  baseLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.md,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  loader: {
    marginRight: 0,
  },
});
