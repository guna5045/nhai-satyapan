import { useState, useEffect } from 'react';
import { SQLiteService, WorkerRecord } from '../services/sqlite';

export default function useDatabase() {
  const [dbReady, setDbReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const sqlite = SQLiteService.getInstance();

  const initDb = async (passphrase: string) => {
    setLoading(true);
    try {
      const success = await sqlite.initializeDatabase(passphrase);
      setDbReady(success);
    } catch (e) {
      console.error('[useDatabase] DB init failed:', e);
      setDbReady(false);
    } finally {
      setLoading(false);
    }
  };

  const getWorkerProfile = async (workerId: string): Promise<WorkerRecord | null> => {
    return sqlite.getWorker(workerId);
  };

  const registerWorker = async (worker: WorkerRecord): Promise<boolean> => {
    return sqlite.saveWorker(worker);
  };

  return {
    dbReady,
    loading,
    initDb,
    getWorkerProfile,
    registerWorker,
  };
}
