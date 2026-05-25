/**
 * Biometric Vector Matching Utilities
 * Implements Cosine Similarity and Euclidean Distance algorithms for 128-d face embeddings.
 */

/**
 * Computes Cosine Similarity between vector A and vector B.
 * Formula: (A . B) / (||A|| * ||B||)
 * Value ranges from -1.0 to 1.0. A score >= 0.72 is matching standard.
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error(`Vector lengths do not match: A(${vecA.length}) vs B(${vecB.length})`);
  }

  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) {
    return 0.0; // Avoid division by zero
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Computes L2 (Euclidean) Distance between vector A and vector B.
 * Value ranges from 0.0 upwards (Lower values indicate high similarity).
 */
export function euclideanDistance(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vector dimensions must be identical');
  }

  let sum = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    const diff = vecA[i] - vecB[i];
    sum += diff * diff;
  }

  return Math.sqrt(sum);
}
