/**
 * React Navigation Type Definitions for NHAI Satyapan
 */

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  BiometricVerification: {
    targetPersonnelId?: string; // Optional: verify a specific worker, or scan general group
  };
  Enrollment: undefined;
  Settings: undefined;
  SyncQueue: undefined;
};

export type AppNavigationProp<RouteName extends keyof RootStackParamList> = 
  NativeStackNavigationProp<RootStackParamList, RouteName>;

export type AppRouteProp<RouteName extends keyof RootStackParamList> = 
  RouteProp<RootStackParamList, RouteName>;
