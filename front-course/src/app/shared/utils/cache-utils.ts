// Temps du cache en minute
const timeToCacheService: number = 5;

export function cacheValideService(time: number): boolean {
  const millis = Date.now() - time;
  return millis <= (timeToCacheService * 60 * 1000);
}
