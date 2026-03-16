// 2. Sequência de Fibonacci
// Implemente uma função recursiva que calcule o enésimo número da sequência.
// Analise o desempenho e sugira uma otimização (memoization ou iterativo).

// Versão ingênua (exponencial)
function fibonacciIngenuo(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacciIngenuo(n - 1) + fibonacciIngenuo(n - 2);
}
// Complexidade: O(2^n) – muito ineficiente para n grande.

// Versão com memoization (programação dinâmica)
function fibonacciMemo(n, memo = {}) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (memo[n] !== undefined) return memo[n];
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}
// Complexidade: O(n) – cada valor é calculado uma única vez.

// Versão iterativa (mais eficiente em espaço)
function fibonacciIterativo(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}
// Complexidade: O(n) tempo, O(1) espaço.

// Testes
let n = 10;
console.log(`Fibonacci(${n}) ingênuo:`, fibonacciIngenuo(n));
console.log(`Fibonacci(${n}) com memo:`, fibonacciMemo(n));
console.log(`Fibonacci(${n}) iterativo:`, fibonacciIterativo(n));