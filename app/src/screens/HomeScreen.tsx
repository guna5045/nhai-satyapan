import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusPill from '../components/StatusPill';

export default function HomeScreen() {
  const navigation = useNavigation<AppNavigationProp<'Home'>>();
  // Setup language state (defaults to English, can bind to context later)
  const [lang] = useState<'en' | 'hi'>('en');
  const t = TRANSLATIONS[lang];

  // Dummy statistics for demo
  const [stats] = useState({
    pendingSync: 12,
    passRate: '98.4%',
    databaseSize: '1,420 Personnel',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Welcome Section */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>{t.common.appName}</Text>
          <Text style={styles.title}>Highway Site 404 - Corridor C</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <Card style={styles.statsCard}>
            <Text style={styles.statsLabel}>{t.dashboard.pendingSyncCount}</Text>
            <Text style={styles.statsValue}>{stats.pendingSync}</Text>
            <StatusPill 
              label={stats.pendingSync > 0 ? t.common.offline : t.common.online} 
              type={stats.pendingSync > 0 ? 'warning' : 'success'} 
            />
          </Card>
          
          <Card style={styles.statsCard}>
            <Text style={styles.statsLabel}>{t.dashboard.successRate}</Text>
            <Text style={[styles.statsValue, { color: COLORS.success }]}>{stats.passRate}</Text>
            <StatusPill label="Optimal" type="success" />
          </Card>
        </View>

        <Card style={styles.systemCard}>
          <View style={styles.systemDetails}>
            <View>
              <Text style={styles.systemTitle}>Local Encrypted Storage</Text>
              <Text style={styles.systemSubtitle}>{stats.databaseSize}</Text>
            </View>
            <StatusPill label="Encrypted" type="info" />
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Operations</Text>
          
          <Button 
            label={t.dashboard.verificationTitle} 
            variant="primary"
            onPress={() => navigation.navigate('BiometricVerification', {})}
            accessibilityHint="Launches camera for face liveness and matching"
          />
          
          <Button 
            label={t.dashboard.enrollmentTitle} 
            variant="secondary"
            onPress={() => navigation.navigate('Enrollment')}
            accessibilityHint="Opens registration form to enroll new personnel biometric templates"
          />

          <View style={styles.buttonRow}>
            <View style={{ flex: 1, marginRight: SPACING.sm }}>
              <Button 
                label={t.dashboard.syncTitle} 
                variant="outline"
                onPress={() => navigation.navigate('SyncQueue')}
              />
            </View>
            <View style={{ flex: 1, marginLeft: SPACING.sm }}>
              <Button 
                label={t.dashboard.settingsTitle} 
                variant="outline"
                onPress={() => navigation.navigate('Settings')}
              />
            </View>
          </View>
        </View>

        {/* Recent logs activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>{t.dashboard.recentActivity}</Text>
          
          <Card style={styles.logCard}>
            <View style={styles.logHeader}>
              <Text style={styles.logName}>Rajesh Kumar</Text>
              <StatusPill label="Verified" type="success" />
            </View>
            <Text style={styles.logMeta}>ID: NHAI-2026-0812 | 10:42 AM</Text>
          </Card>

          <Card style={styles.logCard}>
            <View style={styles.logHeader}>
              <Text style={styles.logName}>Amit Singh</Text>
              <StatusPill label="Spoof Blocked" type="danger" />
            </View>
            <Text style={styles.logMeta}>ID: Unknown | 09:15 AM</Text>
          </Card>
        </View>

      </ScrollView>
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
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsCard: {
    flex: 1,
    marginHorizontal: SPACING.xs,
    padding: SPACING.md,
  },
  statsLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  statsValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xxl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  systemCard: {
    marginVertical: SPACING.sm,
  },
  systemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  systemTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textPrimary,
  },
  systemSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
  },
  actionsContainer: {
    marginVertical: SPACING.md,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textPrimary,
    marginVertical: SPACING.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    paddingLeft: SPACING.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityContainer: {
    marginTop: SPACING.md,
  },
  logCard: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.xs,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textPrimary,
  },
  logMeta: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
});
