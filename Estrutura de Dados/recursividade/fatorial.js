// 1. Fatorial Recursivo
// Implemente uma função recursiva para calcular o fatorial de um número inteiro n.
// Determine a complexidade de tempo do algoritmo.

function fatorial(n) {
    if (n < 0) return undefined; // fatorial de negativo não definido
    if (n === 0 || n === 1) return 1; // caso base
    return n * fatorial(n - 1); // chamada recursiva
}

// Teste
console.log("Fatorial de 5:", fatorial(5)); // 120

// Complexidade de tempo: O(n) – cada chamada reduz n em 1 até o caso base.