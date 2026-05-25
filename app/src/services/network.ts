/**
 * Connection Monitor Service for NHAI Satyapan
 * Monitors Wi-Fi and Cellular states to direct offline queue operations.
 */

export type ConnectionListener = (online: boolean) => void;

export class NetworkService {
  private static instance: NetworkService;
  private onlineStatus = true; // Defaults to online in simulation
  private listeners: Set<ConnectionListener> = new Set();

  private constructor() {}

  public static getInstance(): NetworkService {
    if (!NetworkService.instance) {
      NetworkService.instance = new NetworkService();
    }
    return NetworkService.instance;
  }

  public isOnline(): boolean {
    return this.onlineStatus;
  }

  /**
   * Subscribes a listener to connectivity changes.
   */
  public subscribe(listener: ConnectionListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Simulates network toggles.
   */
  public setMockConnectivity(online: boolean) {
    if (this.onlineStatus !== online) {
      this.onlineStatus = online;
      console.log(`[NetworkService] Connection state changed: ${online ? 'ONLINE' : 'OFFLINE'}`);
      this.listeners.forEach((listener) => listener(online));
    }
  }
}
