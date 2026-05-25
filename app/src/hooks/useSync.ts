import { useState } from 'react';
import { SyncService } from '../services/sync';

export default function useSync() {
  const [syncing, setSyncing] = useState(false);
  const syncService = SyncService.getInstance();

  const runSync = async () => {
    setSyncing(true);
    try {
      const result = await syncService.syncPendingQueue();
      return result;
    } catch (e) {
      console.error('[useSync] Sync failed:', e);
      return { success: false, syncedCount: 0 };
    } finally {
      setSyncing(false);
    }
  };

  return {
    syncing,
    runSync,
  };
}
