/**
 * Environment Configuration for NHAI Satyapan
 * Provides typed, validated access to system configurations, API gateways, and edge-AI parameters.
 */

export interface AppConfig {
  env: 'development' | 'staging' | 'production';
  apiGatewayUrl: string;
  authDomain: string;
  cognitoClientId: string;
  cognitoUserPoolId: string;
  
  // Edge-AI Configurations
  faceMatchingThreshold: number; // Cosine similarity threshold (0.0 to 1.0)
  livenessThreshold: number;      // MiniFASNet real probability score threshold (0.0 to 1.0)
  frameProcessorSkipCount: number; // Process every Nth frame (performance optimization)
  
  // Storage Configurations
  sqliteDatabaseName: string;
  sqlitePragmaKeySeed: string;    // Seed used in conjunction with Keystore for SQLCipher
  
  // Offline sync settings
  syncIntervalMs: number;
  syncBatchSize: number;
}

const DEV_CONFIG: AppConfig = {
  env: 'development',
  apiGatewayUrl: 'https://api-dev.nhai-satyapan.gov.in/v1',
  authDomain: 'auth-dev.nhai-satyapan.gov.in',
  cognitoClientId: 'dev-client-id-placeholder-12345',
  cognitoUserPoolId: 'ap-south-1_devUserPoolId',
  
  faceMatchingThreshold: 0.72,
  livenessThreshold: 0.85,
  frameProcessorSkipCount: 3,
  
  sqliteDatabaseName: 'nhai_satyapan_dev.db',
  sqlitePragmaKeySeed: 'NHAI-DEV-SQLCIPHER-SEED-9988',
  
  syncIntervalMs: 30000, // 30 seconds
  syncBatchSize: 20,
};

const PROD_CONFIG: AppConfig = {
  env: 'production',
  apiGatewayUrl: 'https://api.nhai-satyapan.gov.in/v1',
  authDomain: 'auth.nhai-satyapan.gov.in',
  cognitoClientId: 'prod-client-id-placeholder-67890',
  cognitoUserPoolId: 'ap-south-1_prodUserPoolId',
  
  faceMatchingThreshold: 0.72, // Configured for 10^-4 False Acceptance Rate
  livenessThreshold: 0.85,
  frameProcessorSkipCount: 3,
  
  sqliteDatabaseName: 'nhai_satyapan_secure.db',
  sqlitePragmaKeySeed: 'NHAI-PROD-SQLCIPHER-SEED-7722',
  
  syncIntervalMs: 60000, // 60 seconds
  syncBatchSize: 50,
};

// Toggle manually during development or inject via build-time bundlers
const IS_PROD = false;

export const Config: AppConfig = IS_PROD ? PROD_CONFIG : DEV_CONFIG;
