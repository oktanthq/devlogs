const WORDS_PER_MINUTE = 200;

/**
 * Estimates reading time (in minutes) from the raw markdown body.
 * Returns undefined when the body is not available.
 */
export function readingMinutesFor(body?: string | null): number | undefined {
  if (!body) return undefined;
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}