/**
 * Bilingual Translation Dictionary for NHAI Satyapan
 * Currently supports English and Hindi (Primary government standards for field tablets).
 */

export type LanguageType = 'en' | 'hi';

export interface TranslationSchema {
  common: {
    appName: string;
    back: string;
    cancel: string;
    save: string;
    loading: string;
    success: string;
    error: string;
    retry: string;
    online: string;
    offline: string;
  };
  dashboard: {
    verificationTitle: string;
    enrollmentTitle: string;
    syncTitle: string;
    settingsTitle: string;
    syncStatusLabel: string;
    pendingSyncCount: string;
    successRate: string;
    recentActivity: string;
  };
  camera: {
    alignFace: string;
    dontBlink: string;
    lookingGood: string;
    processing: string;
    livenessPassed: string;
    livenessFailed: string;
    verificationFailed: string;
    verificationSuccess: string;
    moveCloser: string;
    tooManyFaces: string;
    keepStill: string;
  };
  enrollment: {
    heading: string;
    nameLabel: string;
    namePlaceholder: string;
    idLabel: string;
    idPlaceholder: string;
    captureBtn: string;
    enrolling: string;
    successMsg: string;
    errorMsg: string;
  };
  settings: {
    heading: string;
    langSelect: string;
    thresholdLabel: string;
    livenessThresholdLabel: string;
    modelUpdateBtn: string;
    clearDbBtn: string;
    developerMode: string;
  };
  sync: {
    heading: string;
    totalRecords: string;
    pendingRecords: string;
    syncBtn: string;
    lastSynced: string;
    noPending: string;
  };
}

export const TRANSLATIONS: Record<LanguageType, TranslationSchema> = {
  en: {
    common: {
      appName: 'NHAI Satyapan',
      back: 'Back',
      cancel: 'Cancel',
      save: 'Save',
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
      retry: 'Retry',
      online: 'Online',
      offline: 'Offline',
    },
    dashboard: {
      verificationTitle: 'Start Verification',
      enrollmentTitle: 'Enrol Worker',
      syncTitle: 'Sync Queue',
      settingsTitle: 'Settings',
      syncStatusLabel: 'Sync Status',
      pendingSyncCount: 'Pending Uploads',
      successRate: 'Today\'s Pass Rate',
      recentActivity: 'Recent Verification Log',
    },
    camera: {
      alignFace: 'Align your face inside the circle',
      dontBlink: 'Blink slowly to check liveness',
      lookingGood: 'Hold steady...',
      processing: 'Performing inference...',
      livenessPassed: 'Liveness Check Verified',
      livenessFailed: 'Spoof Attempt Blocked',
      verificationFailed: 'Biometric Match Failed',
      verificationSuccess: 'Verification Successful',
      moveCloser: 'Move device closer to face',
      tooManyFaces: 'Multiple faces detected',
      keepStill: 'Keep still',
    },
    enrollment: {
      heading: 'Register New personnel',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter name as per Aadhaar',
      idLabel: 'Contractor/Worker ID',
      idPlaceholder: 'e.g. NHAI-2026-88',
      captureBtn: 'Capture Biometrics',
      enrolling: 'Registering embedding...',
      successMsg: 'Personnel enrolled successfully in secure DB',
      errorMsg: 'Registration failed. Try again.',
    },
    settings: {
      heading: 'System Configuration',
      langSelect: 'Application Language',
      thresholdLabel: 'Biometric Cosine Similarity',
      livenessThresholdLabel: 'Liveness Security Threshold',
      modelUpdateBtn: 'Check for Model Updates',
      clearDbBtn: 'Clear Encrypted Database',
      developerMode: 'Developer Diagnostics',
    },
    sync: {
      heading: 'Offline Sync Console',
      totalRecords: 'Total Cached Records',
      pendingRecords: 'Pending AWS Uploads',
      syncBtn: 'Trigger Manual Upload',
      lastSynced: 'Last Sync',
      noPending: 'All operations synchronized with AWS',
    },
  },
  hi: {
    common: {
      appName: 'एनएचएआई सत्यापन',
      back: 'पीछे जाएं',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      loading: 'लोड हो रहा है...',
      success: 'सफलता',
      error: 'त्रुटि',
      retry: 'पुनः प्रयास करें',
      online: 'ऑनलाइन',
      offline: 'ऑफ़लाइन',
    },
    dashboard: {
      verificationTitle: 'सत्यापन शुरू करें',
      enrollmentTitle: 'नया पंजीकरण',
      syncTitle: 'सिंक कतार',
      settingsTitle: 'सेटअप / सेटिंग्स',
      syncStatusLabel: 'सिंक स्थिति',
      pendingSyncCount: 'लंबित अपलोड',
      successRate: 'आज का सफलता दर',
      recentActivity: 'हालिया सत्यापन रिकॉर्ड',
    },
    camera: {
      alignFace: 'अपना चेहरा घेरे में लाएं',
      dontBlink: 'जीवंतता जांचने के लिए पलकें झपकाएं',
      lookingGood: 'स्थिर रहें...',
      processing: 'मशीन लर्निंग गणना जारी...',
      livenessPassed: 'जीवंतता सत्यापन सफल',
      livenessFailed: 'कृत्रिम चेहरा पकड़ा गया',
      verificationFailed: 'बायोमेट्रिक मिलान विफल',
      verificationSuccess: 'सत्यापन पूरी तरह सफल',
      moveCloser: 'चेहरे को कैमरे के पास लाएं',
      tooManyFaces: 'एक से अधिक चेहरे दिखे',
      keepStill: 'स्थिर रहें',
    },
    enrollment: {
      heading: 'नया कर्मचारी पंजीकरण',
      nameLabel: 'पूरा नाम',
      namePlaceholder: 'आधार के अनुसार नाम लिखें',
      idLabel: 'ठेकेदार / कर्मचारी आईडी',
      idPlaceholder: 'जैसे NHAI-2026-88',
      captureBtn: 'बायोमेट्रिक कैप्चर',
      enrolling: 'सुरक्षित एम्बेडिंग तैयार हो रही है...',
      successMsg: 'सुरक्षित डेटाबेस में पंजीकरण हो गया',
      errorMsg: 'पंजीकरण विफल। पुनः प्रयास करें।',
    },
    settings: {
      heading: 'सिस्टम कॉन्फ़िगरेशन',
      langSelect: 'एप्लिकेशन भाषा',
      thresholdLabel: 'बायोमेट्रिक कोसाइन समानता',
      livenessThresholdLabel: 'जीवंतता सुरक्षा सीमा',
      modelUpdateBtn: 'मॉडल अपडेट की जांच करें',
      clearDbBtn: 'एन्क्रिप्टेड डेटाबेस साफ करें',
      developerMode: 'डेवलपर नैदानिक मोड',
    },
    sync: {
      heading: 'ऑफ़लाइन सिंक कंसोल',
      totalRecords: 'कुल स्थानीय रिकॉर्ड',
      pendingRecords: 'लंबित एडब्ल्यूएस अपलोड',
      syncBtn: 'मैन्युअल अपलोड शुरू करें',
      lastSynced: 'अंतिम सिंक',
      noPending: 'सभी डेटा एडब्ल्यूएस के साथ सिंक है',
    },
  },
};
