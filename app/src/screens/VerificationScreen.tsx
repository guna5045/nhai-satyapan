import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import Button from '../components/Button';
import StatusPill from '../components/StatusPill';

export default function VerificationScreen() {
  const navigation = useNavigation<AppNavigationProp<'BiometricVerification'>>();
  const [lang] = useState<'en' | 'hi'>('en');
  const t = TRANSLATIONS[lang];

  // Simulation states
  const [status, setStatus] = useState<'scanning' | 'processing' | 'success' | 'failed' | 'spoof'>('scanning');
  const [feedbackText, setFeedbackText] = useState<string>(t.camera.alignFace);

  const triggerSimulation = (simType: 'success' | 'failed' | 'spoof') => {
    setStatus('processing');
    setFeedbackText(t.camera.processing);

    setTimeout(() => {
      if (simType === 'success') {
        setStatus('success');
        setFeedbackText(t.camera.verificationSuccess);
      } else if (simType === 'failed') {
        setStatus('failed');
        setFeedbackText(t.camera.verificationFailed);
      } else {
        setStatus('spoof');
        setFeedbackText(t.camera.livenessFailed);
      }
    }, 1500);
  };

  const resetScanner = () => {
    setStatus('scanning');
    setFeedbackText(t.camera.alignFace);
  };

  // Compute status pill properties for the overlay HUD
  const getHudOverlayConfig = () => {
    switch (status) {
      case 'processing':
        return { color: COLORS.warning, pillType: 'warning' as const, pillLabel: t.common.loading };
      case 'success':
        return { color: COLORS.success, pillType: 'success' as const, pillLabel: 'VERIFIED' };
      case 'failed':
        return { color: COLORS.error, pillType: 'danger' as const, pillLabel: 'MATCH FAILED' };
      case 'spoof':
        return { color: COLORS.error, pillType: 'danger' as const, pillLabel: 'SPOOF BLOCKED' };
      default:
        return { color: COLORS.accent, pillType: 'info' as const, pillLabel: 'SCANNING' };
    }
  };

  const hud = getHudOverlayConfig();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Simulation HUD Overlay */}
      <View style={styles.cameraPlaceholder}>
        {/* Simulating a dark camera view finder */}
        <View style={styles.viewFinderBackdrop}>
          
          {/* Target Alignment Circle */}
          <View style={[styles.alignmentCircle, { borderColor: hud.color }]}>
            {status === 'scanning' && <Text style={styles.blinkText}>{t.camera.dontBlink}</Text>}
          </View>

          {/* Top Status Header */}
          <View style={styles.hudHeader}>
            <StatusPill label={hud.pillLabel} type={hud.pillType} />
            <Text style={styles.fpsText}>30 FPS | Device Tier: 2</Text>
          </View>

          {/* Bottom Prompt Banner */}
          <View style={[styles.promptBanner, { borderLeftColor: hud.color }]}>
            <Text style={styles.promptText}>{feedbackText}</Text>
          </View>
        </View>
      </View>

      {/* Simulator Control Panel (Only visible for development/hackathon demo) */}
      <View style={styles.controlPanel}>
        <Text style={styles.panelTitle}>Simulation Controls (Demo Mode)</Text>
        
        {status === 'scanning' ? (
          <View style={styles.simButtonsContainer}>
            <TouchableOpacity 
              style={[styles.simBtn, { backgroundColor: COLORS.success }]} 
              onPress={() => triggerSimulation('success')}
            >
              <Text style={styles.simBtnText}>Match Success</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.simBtn, { backgroundColor: COLORS.secondary }]} 
              onPress={() => triggerSimulation('failed')}
            >
              <Text style={styles.simBtnText}>Match Fail</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.simBtn, { backgroundColor: COLORS.error }]} 
              onPress={() => triggerSimulation('spoof')}
            >
              <Text style={styles.simBtnText}>Spoof (Fail)</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Button 
            label="Reset Verification Scanner" 
            variant="outline" 
            onPress={resetScanner} 
          />
        )}
        
        <Button 
          label={t.common.back} 
          variant="outline" 
          onPress={() => navigation.goBack()} 
          style={styles.backBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Black base for immersive camera feel
  },
  cameraPlaceholder: {
    flex: 1.6,
    backgroundColor: '#1E1E1E',
    position: 'relative',
  },
  viewFinderBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  alignmentCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 3,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  blinkText: {
    color: '#FFFFFF',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  hudHeader: {
    position: 'absolute',
    top: SPACING.lg,
    left: SPACING.lg,
    right: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fpsText: {
    color: COLORS.textLight,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.xs,
  },
  promptBanner: {
    position: 'absolute',
    bottom: SPACING.lg,
    left: SPACING.lg,
    right: SPACING.lg,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderLeftWidth: 4,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
  },
  promptText: {
    color: '#FFFFFF',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.md,
  },
  controlPanel: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  panelTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  simButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.sm,
  },
  simBtn: {
    flex: 1,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.xs,
  },
  simBtnText: {
    color: '#FFFFFF',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  backBtn: {
    marginTop: SPACING.sm,
    borderColor: COLORS.borderDark,
  },
});
