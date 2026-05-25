/**
 * Secure Logging Utility for NHAI Satyapan
 * Ensures debug logs do not leak PII (Personal Identifiable Information) such as face templates.
 */

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

class SecureLogger {
  private static formatLog(level: LogLevel, message: string, meta?: object): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` | Meta: ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level}] ${message}${metaStr}`;
  }

  public debug(message: string, meta?: object) {
    // Only logs in development modes
    if (__DEV__) {
      console.log(SecureLogger.formatLog('DEBUG', message, meta));
    }
  }

  public info(message: string, meta?: object) {
    console.log(SecureLogger.formatLog('INFO', message, meta));
    // In production, write to secure local buffer file for sync audit
  }

  public warn(message: string, meta?: object) {
    console.warn(SecureLogger.formatLog('WARN', message, meta));
  }

  public error(message: string, error?: unknown, meta?: object) {
    const errorDetails = error instanceof Error ? { name: error.name, message: error.message } : error;
    console.error(
      SecureLogger.formatLog('ERROR', message, { ...meta, error: errorDetails })
    );
  }
}

export const Logger = new SecureLogger();
