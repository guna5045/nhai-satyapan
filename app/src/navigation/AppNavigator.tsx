/**
 * App Navigation Configuration for NHAI Satyapan
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { COLORS, TYPOGRAPHY } from '../constants/theme';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import VerificationScreen from '../screens/VerificationScreen';
import EnrollmentScreen from '../screens/EnrollmentScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SyncQueueScreen from '../screens/SyncQueueScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.textOnPrimary,
        headerTitleStyle: {
          fontFamily: TYPOGRAPHY.fontFamily.bold,
          fontSize: TYPOGRAPHY.fontSize.lg,
        },
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'NHAI Satyapan Dashboard' }}
      />
      <Stack.Screen 
        name="BiometricVerification" 
        component={VerificationScreen}
        options={{ title: 'Secure Verification' }}
      />
      <Stack.Screen 
        name="Enrollment" 
        component={EnrollmentScreen}
        options={{ title: 'Personnel Enrollment' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'System Settings' }}
      />
      <Stack.Screen 
        name="SyncQueue" 
        component={SyncQueueScreen}
        options={{ title: 'Offline Sync Queue' }}
      />
    </Stack.Navigator>
  );
}
