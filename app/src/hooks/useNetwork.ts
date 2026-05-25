import { useState, useEffect } from 'react';
import { NetworkService } from '../services/network';

export default function useNetwork() {
  const [isOnline, setIsOnline] = useState<boolean>(
    NetworkService.getInstance().isOnline()
  );

  useEffect(() => {
    const network = NetworkService.getInstance();
    
    // Subscribe to connection change updates
    const unsubscribe = network.subscribe((status) => {
      setIsOnline(status);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { isOnline };
}
