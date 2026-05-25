# NHAI Satyapan
## Secure Edge-AI Biometric Verification Engine

[![Platform Support](https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20(Future)-blue?style=for-the-badge&logo=android)](https://developer.android.com)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20Native%20%7C%20TS%20%7C%20TFLite%20%7C%20SQLCipher-green?style=for-the-badge)](https://reactnative.dev)
[![Architecture](https://img.shields.io/badge/Architecture-Offline--First%20%7C%20Edge%20AI-orange?style=for-the-badge)](docs/architecture-notes.md)

NHAI Satyapan is a high-security, national-level offline-first biometric verification system designed specifically for remote National Highways Authority of India (NHAI) field operations. It enables field officers to authenticate workers and personnel securely at toll plazas, construction sites, and remote project corridors, even under zero-connectivity scenarios.

---

## 💻 Tech Stack & Key Pillars

*   **UI/UX & Core Framework:** React Native CLI, TypeScript, and Native-backed components.
*   **Edge-AI Compute:** TensorFlow Lite (TFLite) with customized C++/Java native integration for real-time inference on the edge.
*   **Biometrics:** Face recognition ([MobileFaceNet](docs/architecture-notes.md#mobilefacenet-face-recognition)) and liveness detection ([MiniFASNet](docs/architecture-notes.md#minifasnet-liveness-detection)).
*   **Media Capture:** React Native Vision Camera v4+ utilizing custom frame processors.
*   **Secured Local Storage:** SQLite backed by **SQLCipher** (AES-256 encryption) to securely store personnel metadata, templates, and audit logs.
*   **Sync & Cloud Engine:** AWS synchronization engine using Amazon S3 (for secure model distribution), API Gateway, Lambda, and DynamoDB.
*   **Device Security:** Hardware-backed cryptographic key generation (Android Keystore / iOS Keychain) for database key derivation.

---

## 📂 Workspace Structure

The project follows a modular, production-ready directory structure designed for scalable React Native integration and extensive edge-AI testing:

```
NHAI Satyapan/
├── app/                  # React Native / TypeScript codebase (future initialization)
├── docs/                 # Systems engineering documents and specs
│   ├── project-roadmap.md
│   ├── daily-progress.md
│   ├── architecture-notes.md
│   └── benchmark-targets.md
├── diagrams/             # Architecture, data-flow, and pipeline diagrams
│   ├── aws-architecture/ # Cloud infrastructure diagram assets
│   ├── mobile-architecture/# React Native system architecture
│   ├── ai-pipeline/      # Vision Camera & TFLite frame processing pipeline
│   └── sync-flow/        # Offline-to-Online AWS synchronization protocol
├── assets/               # Production assets and resources
│   ├── icons/            # App system icons
│   ├── fonts/            # Custom fonts (e.g., Hindi/English optimized)
│   ├── images/           # High-resolution logos and graphic assets
│   └── ui-mockups/       # UI/UX layout specs and mockups
├── models/               # Edge-AI Deep Learning Models
│   ├── mobilefacenet/    # Quantized face feature embedding extractors
│   ├── minifasnet/       # Quantized liveness/face-spoofing detection models
│   ├── quantized/        # Optimized .tflite files
│   └── testing/          # Sample images / test input vectors
├── benchmarks/           # On-device performance measurements
│   ├── latency-tests/    # AI inference and DB query performance logs
│   ├── memory-tests/     # RAM/VRAM footprint metrics
│   ├── model-size/       # Model file storage reports
│   └── screenshots/      # Performance dashboards & profiles
├── presentations/        # Deliverables and pitch materials
│   ├── ppt/              # Hackathon presentation slides
│   ├── pdf/              # System architecture briefs
│   └── demo-script/      # Video narrative and demo guidelines
├── references/           # Technical manuals & scientific resources
│   ├── research-notes/   # Papers on face verification & anti-spoofing
│   ├── aws-guides/       # IAM, Cognito, and DynamoDB synchronization docs
│   ├── react-native-guides/# Custom JNI / Frame Processor tutorials
│   └── ai-model-references/# Tensor structure and pre-processing details
└── backups/              # Encrypted local database dumps & config backups
```

---

## 🛠️ Recommended Setup & Initialization

Before initiating the React Native app development, configure your environment:

1.  **System Prerequisite:**
    Ensure Android SDK, JDK 17, and Node.js (v18+) are installed on your Windows machine.
2.  **Clone and Fetch:**
    ```bash
    git clone https://github.com/guna5045/nhai-satyapan.git
    cd "NHAI Satyapan"
    ```
3.  **Future App Setup:**
    The React Native application will be initialized in the `app/` folder using:
    ```bash
    npx react-native init App --directory app --template react-native-template-typescript
    ```

---

## 🤝 Git Practices & Commit Conventions

To maintain a clean history throughout development, we adopt **Conventional Commits**:

*   `feat: <description>`: For introducing new features (e.g., TFLite Native bridge).
*   `fix: <description>`: For bug fixes (e.g., frame processing leak).
*   `docs: <description>`: Documentation changes.
*   `refactor: <description>`: Restructuring code without changing functionality.
*   `perf: <description>`: Optimization tasks (e.g., model quantization).
*   `ci: <description>`: Continuous Integration pipelines/workflows.

*Branches should be prefixed with their scope:*
*   `feature/ai-pipeline`
*   `feature/offline-sync`
*   `bugfix/sqlcipher-leak`

---

## 📄 Licensing & Security Notice
This software is designed as a secure government biometric tool. Under no circumstances should unencrypted databases, raw face templates, or non-quantized model testing artifacts be committed to public remotes.
