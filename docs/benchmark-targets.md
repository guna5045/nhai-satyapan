# NHAI Satyapan - Benchmark Targets

This document establishes the hardware-performance constraints and model accuracy goals for the **Secure Edge-AI Biometric Verification Engine** on mobile devices.

---

## 📱 Hardware Target Tiers

Performance benchmarks will be tested and reported across three hardware classifications representative of NHAI field tablets:

| Tier | Representative CPU | RAM | Target Device Cost |
| :--- | :--- | :--- | :--- |
| **Tier 1 (Low-End)** | MediaTek Helio G85 | 3 - 4 GB | ₹8,000 - ₹12,000 |
| **Tier 2 (Mid-Range)** | Snapdragon 695 / Dimensity 6080 | 6 - 8 GB | ₹15,000 - ₹22,000 |
| **Tier 3 (High-End)** | Snapdragon 8 Gen 1+ / Dimensity 8200 | 8+ GB | ₹30,000+ |

---

## ⚡ Inference Latency Targets

Biometric feedback must feel instantaneous to keep verification queues moving quickly.

*   **Continuous Frame Rate (Camera HUD Overlay):** Stable 30 FPS.
*   **Face Detection (BlazeFace):** $\le 20 \text{ ms}$ (every 3rd frame).
*   **Liveness Verification (MiniFASNet):** $\le 100 \text{ ms}$ (executed once a stable face is detected).
*   **Feature Embedding Extraction (MobileFaceNet):** $\le 120 \text{ ms}$ on low-end devices.

### Maximum Budget per Verification Loop
```
[Frame Capture] -> [Face Detect: 20ms] -> [Liveness check: 80ms] -> [Embed Extract: 80ms] -> [Cosine Match & DB Log: 15ms]
========================================= Total Budget: <= 195ms =========================================
```

---

## 🧠 Model Metrics & Quantization Targets

To minimize APK size and memory pressure on lower-end devices, all models must undergo INT8 post-training quantization.

| Model Component | Base Size (FP32) | Quantized Size (INT8) | Memory Footprint (RAM) | Execution Hardware |
| :--- | :--- | :--- | :--- | :--- |
| **BlazeFace** | ~2.5 MB | **~600 KB** | ~8 MB | CPU (Arm Neon) |
| **MiniFASNet** | ~18 MB | **~4.5 MB** | ~25 MB | GPU / NNAPI |
| **MobileFaceNet** | ~5.2 MB | **~1.3 MB** | ~12 MB | GPU / NNAPI |
| **Total AI Overhead**| **~25.7 MB** | **~6.4 MB** | **~45 MB** | - |

---

## 🎯 Biometric Accuracy Targets

Biometric thresholds are optimized to prevent unauthorized entry while maintaining high throughput.

*   **False Acceptance Rate (FAR):** $\le 0.01\%$ (1 in 10,000 checks).
*   **False Rejection Rate (FRR):** $\le 1.0\%$ (1 in 100 checks).
*   **Anti-Spoofing Spoof Acceptance Rate (SAR):** $\le 0.5\%$.
*   **Liveness Spoof Rejection Rate (SFM):** $\ge 99.0\%$.

---

## 🔒 Encrypted Database (SQLCipher) Performance

Encryption must not introduce visible database lag during queries.

*   **Database Key Derivation (First Open):** $\le 500 \text{ ms}$ (due to PBKDF2 iterations).
*   **Single User Metadata Read (Indexed):** $\le 5 \text{ ms}$.
*   **Audit Log Insertion (Buffered transaction):** $\le 10 \text{ ms}$.
*   **Batch Local Search (Linear scan of 10,000 workers):** $\le 25 \text{ ms}$ using native vector matching modules.

---

## 🔋 Device Footprint & Network Targets

*   **Battery Drain Rate:** $\le 8\%$ battery consumption per hour of continuous verification.
*   **Thermal Throttling Threshold:** Must sustain operations for 3 consecutive hours in high ambient temperatures (up to 40°C on highway sites) without dropping camera frame rates below 15 FPS.
*   **Payload Size per Sync:** $\le 5 \text{ KB}$ per verification log payload (compressed JSON structure).
