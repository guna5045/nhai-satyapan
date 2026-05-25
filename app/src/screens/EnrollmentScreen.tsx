import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import Button from '../components/Button';
import Card from '../components/Card';
import StatusPill from '../components/StatusPill';

export default function EnrollmentScreen() {
  const navigation = useNavigation<AppNavigationProp<'Enrollment'>>();
  const [lang] = useState<'en' | 'hi'>('en');
  const t = TRANSLATIONS[lang];

  // Form states
  const [name, setName] = useState('');
  const [workerId, setWorkerId] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [biometricCaptured, setBiometricCaptured] = useState(false);

  const handleCaptureBiometrics = () => {
    if (!name.trim() || !workerId.trim()) {
      Alert.alert(t.common.error, 'Please fill in Name and Worker ID first.');
      return;
    }
    
    setIsCapturing(true);
    // Simulate camera taking snapshot and generating a 128-d face embedding
    setTimeout(() => {
      setIsCapturing(false);
      setBiometricCaptured(true);
      Alert.alert(t.common.success, 'Simulated Face Biometric Template Generated (128-d Vector)');
    }, 2000);
  };

  const handleRegister = () => {
    if (!biometricCaptured) {
      Alert.alert(t.common.error, 'Please capture face biometrics first.');
      return;
    }

    Alert.alert(
      t.common.success, 
      t.enrollment.successMsg,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.heading}>{t.enrollment.heading}</Text>
          
          <Card>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t.enrollment.nameLabel} *</Text>
              <TextInput 
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t.enrollment.namePlaceholder}
                placeholderTextColor={COLORS.textLight}
                autoCorrect={false}
              />
            </View>

            {/* ID Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t.enrollment.idLabel} *</Text>
              <TextInput 
                style={styles.input}
                value={workerId}
                onChangeText={setWorkerId}
                placeholder={t.enrollment.idPlaceholder}
                placeholderTextColor={COLORS.textLight}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>
          </Card>

          {/* Biometric Status Area */}
          <Card style={styles.biometricCard}>
            <View style={styles.biometricHeader}>
              <Text style={styles.biometricTitle}>Face Biometrics</Text>
              {biometricCaptured ? (
                <StatusPill label="Ready" type="success" />
              ) : (
                <StatusPill label="Not Captured" type="neutral" />
              )}
            </View>
            
            <Text style={styles.biometricDesc}>
              {biometricCaptured 
                ? 'Mock embedding vector: [0.082, -0.192, 0.431, ..., -0.012]'
                : 'Registration requires capturing face structure templates. Please tap below to simulate face capture.'
              }
            </Text>

            <Button 
              label={isCapturing ? t.common.loading : t.enrollment.captureBtn} 
              variant="outline"
              loading={isCapturing}
              onPress={handleCaptureBiometrics}
            />
          </Card>

          {/* Submit Buttons */}
          <View style={styles.btnArea}>
            <Button 
              label="Register Personnel to Secure DB" 
              variant="primary"
              disabled={!biometricCaptured}
              onPress={handleRegister}
            />
            
            <Button 
              label={t.common.cancel} 
              variant="outline" 
              onPress={() => navigation.goBack()} 
              style={styles.cancelBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  heading: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  inputGroup: {
    marginVertical: SPACING.sm,
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textPrimary,
    backgroundColor: '#FAFAFA',
  },
  biometricCard: {
    marginVertical: SPACING.md,
  },
  biometricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  biometricTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textPrimary,
  },
  biometricDesc: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: TYPOGRAPHY.lineHeight.sm,
  },
  btnArea: {
    marginTop: SPACING.lg,
  },
  cancelBtn: {
    borderColor: COLORS.borderDark,
  },
});
