/**
 * Theme Definition for NHAI Satyapan
 * Adheres to government-grade design principles: High contrast, readability under direct sunlight,
 * clear action feedback, and compliance with accessibility norms.
 */

export const COLORS = {
  // Primary brand colors (NHAI Navy Blue & Saffron)
  primary: '#0B3C5D',       // Navy Blue
  primaryDark: '#07263C',
  primaryLight: '#328CC1',
  secondary: '#D9534F',     // Subtle Indian Saffron / Deep Red
  accent: '#F9A11B',        // Vibrant Saffron / Amber

  // Feedback Colors
  success: '#198754',       // Emerald Green
  warning: '#FFC107',       // Warning Amber
  error: '#DC3545',         // Crimson Red
  info: '#0DCAF0',          // Cyan Blue

  // Neutrals / Interface Colors
  background: '#F8F9FA',    // Ultra-light Grey
  surface: '#FFFFFF',       // Clean White
  surfaceElevated: '#FFFFFF',
  
  // Borders & Dividers
  border: '#DEE2E6',
  borderDark: '#CED4DA',

  // Typography
  textPrimary: '#212529',   // Dark Charcoal
  textSecondary: '#6C757D', // Muted Grey
  textLight: '#ADB5BD',     // Placeholder Grey
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#FFFFFF',

  // Overlay state gradients
  overlayDark: 'rgba(0,0,0,0.6)',
  overlayLight: 'rgba(255,255,255,0.7)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  round: 9999,
};

export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'System', // Outfit / Inter to be linked via Native fonts in future phases
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
  lineHeight: {
    xs: 15,
    sm: 18,
    md: 22,
    lg: 26,
    xl: 30,
    xxl: 38,
  },
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 6,
  },
};
