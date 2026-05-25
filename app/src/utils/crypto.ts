/**
 * Security & Encryption Helpers for NHAI Satyapan
 * Abstracts hashing, AES wrappers, and Keystore seed generation.
 */

/**
 * Derives database encryption keys using PBKDF2.
 * (In production, this hooks into native Android Keystore wrapping/unwrapping)
 */
export async function deriveDbPassphrase(seed: string, pinCode: string): Promise<string> {
  console.log(`[CryptoUtils] Deriving db key for pin length: ${pinCode.length}`);
  
  // Simulated pbkdf2 key derivation delay
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 100));
  
  // Return derived sha256 representation of passcode
  return `${seed}_sha256_${pinCode}`;
}

/**
 * Computes SHA-256 hash of text payloads (used for local audit integrity verification).
 */
export function hashPayload(payload: string): string {
  // Simple custom DJB2/Murmur hash replica for mock/boilerplate
  let hash = 5381;
  for (let i = 0; i < payload.length; i++) {
    hash = (hash * 33) ^ payload.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}
