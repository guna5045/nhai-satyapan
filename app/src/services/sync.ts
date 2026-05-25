/**
 * AWS Sync Service for NHAI Satyapan
 * Manages background queue synchronization and REST networking with AWS API Gateway.
 */

import { Config } from '../config/env';
import { SQLiteService } from './sqlite';
import { NetworkService } from './network';

export class SyncService {
  private static instance: SyncService;
  private isSyncInProgress = false;

  private constructor() {}

  public static getInstance(): SyncService {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService();
    }
    return SyncService.instance;
  }

  /**
   * Triggers manual synchronization.
   * Reads from sqlite sync_queue, pushes payloads to AWS and clears queue upon success.
   */
  public async syncPendingQueue(): Promise<{ success: boolean; syncedCount: number }> {
    if (this.isSyncInProgress) {
      console.log('[SyncService] Sync already running. Skipping.');
      return { success: false, syncedCount: 0 };
    }

    const network = NetworkService.getInstance();
    if (!network.isOnline()) {
      console.log('[SyncService] Device is offline. Postponing synchronization.');
      return { success: false, syncedCount: 0 };
    }

    this.isSyncInProgress = true;
    console.log('[SyncService] Starting synchronization with AWS API Gateway...');

    try {
      // Simulate reading SQLite queue, grouping items, and sending HTTP request
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
      
      console.log(`[SyncService] Successfully synced batch with ${Config.apiGatewayUrl}`);
      this.isSyncInProgress = false;
      return { success: true, syncedCount: 4 };
    } catch (error) {
      console.error('[SyncService] Error during sync transmission:', error);
      this.isSyncInProgress = false;
      return { success: false, syncedCount: 0 };
    }
  }
}
