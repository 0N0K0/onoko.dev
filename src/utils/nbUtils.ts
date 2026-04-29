/**
 * Vérifie si un nombre est premier.
 * @param {number} num Le nombre à vérifier.
 * @returns {boolean} true si le nombre est premier, sinon false.
 */
function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Calcule les facteurs d'un nombre, en ajustant pour les nombres premiers > 3.
 * @param {number} n Le nombre pour lequel calculer les facteurs.
 * @param {number} max Le facteur maximum à considérer.
 * @returns {[number, number][]} Un tableau de paires de facteurs.
 */
export function getFactors(n: number, max: number): [number, number][] {
  let nFact = n;
  if (n > 3 && isPrime(n)) {
    nFact = n + 1;
  }

  const factors: [number, number][] = [];
  for (let i = 1; i <= Math.min(nFact, max); i++) {
    if (nFact % i === 0) {
      factors.push([i, nFact / i]);
    }
  }
  return factors.length
    ? factors
    : [[Math.min(nFact, max), Math.ceil(nFact / Math.min(nFact, max))]];
}
