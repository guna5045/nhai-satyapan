import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
  elevated?: boolean;
}

export default function Card({
  children,
  style,
  noPadding = false,
  elevated = true,
}: CardProps) {
  return (
    <View 
      style={[
        styles.card,
        elevated ? SHADOWS.md : styles.flatBorder,
        noPadding ? styles.noPadding : styles.padding,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    marginVertical: SPACING.sm,
    overflow: 'hidden',
  },
  flatBorder: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  padding: {
    padding: SPACING.lg,
  },
  noPadding: {
    padding: 0,
  },
});
