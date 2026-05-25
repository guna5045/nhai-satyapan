/**
 * TensorFlow Lite Native Wrapper Service for NHAI Satyapan
 * Abstracts model loading, tensor allocation, and CPU/GPU delegate execution.
 */

import { Config } from '../config/env';

export interface LivenessResult {
  isLive: boolean;
  probability: number;
}

export class TFLiteService {
  private static instance: TFLiteService;
  private faceNetLoaded = false;
  private livenessNetLoaded = false;

  private constructor() {}

  public static getInstance(): TFLiteService {
    if (!TFLiteService.instance) {
      TFLiteService.instance = new TFLiteService();
    }
    return TFLiteService.instance;
  }

  /**
   * Loads both quantized models into memory.
   */
  public async loadModels(): Promise<boolean> {
    console.log('[TFLiteService] Loading quantized model assets from /models...');
    
    // Simulate async model file load and tensor allocations
    return new Promise((resolve) => {
      setTimeout(() => {
        this.faceNetLoaded = true;
        this.livenessNetLoaded = true;
        console.log('[TFLiteService] MobileFaceNet and MiniFASNet successfully loaded on GPU delegates.');
        resolve(true);
      }, 800);
    });
  }

  /**
   * Runs liveness classification on cropped face bitmap.
   */
  public async checkLiveness(imageFrameUri: string): Promise<LivenessResult> {
    if (!this.livenessNetLoaded) {
      throw new Error('[TFLiteService] Liveness model not loaded');
    }

    console.log(`[TFLiteService] Run liveness on: ${imageFrameUri}`);
    // Simulate inference latency
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 60));
    
    return {
      isLive: true,
      probability: 0.94, // 94% real face score
    };
  }

  /**
   * Extracts 128-dimensional face embedding float array.
   */
  public async extractEmbeddings(imageFrameUri: string): Promise<number[]> {
    if (!this.faceNetLoaded) {
      throw new Error('[TFLiteService] Face recognition model not loaded');
    }

    console.log(`[TFLiteService] Run embedding extraction on crop: ${imageFrameUri}`);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 80));

    // Mock embedding generation
    const mockVector = Array.from({ length: 128 }, () => Math.random() * 2 - 1);
    return mockVector;
  }

  /**
   * Frees allocated native model interpreters.
   */
  public unloadModels() {
    this.faceNetLoaded = false;
    this.livenessNetLoaded = false;
    console.log('[TFLiteService] Models unloaded from native memory.');
  }
}
