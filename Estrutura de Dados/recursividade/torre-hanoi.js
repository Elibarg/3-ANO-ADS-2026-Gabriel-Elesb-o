// 6. Torre de Hanói
// Implemente o algoritmo recursivo para resolver o problema da Torre de Hanói,
// movendo n discos de uma haste para outra.
// Determine o número de movimentos e a complexidade.

function torreHanoi(n, origem, destino, auxiliar) {
    if (n === 1) {
        console.log(`Mover disco 1 de ${origem} para ${destino}`);
        return 1; // conta o movimento
    }
    let movimentos = 0;
    // Mover n-1 discos da origem para o auxiliar
    movimentos += torreHanoi(n - 1, origem, auxiliar, destino);
    // Mover o disco maior da origem para o destino
    console.log(`Mover disco ${n} de ${origem} para ${destino}`);
    movimentos += 1;
    // Mover n-1 discos do auxiliar para o destino
    movimentos += torreHanoi(n - 1, auxiliar, destino, origem);
    return movimentos;
}

// Teste com 3 discos
let total = torreHanoi(3, 'A', 'C', 'B');
console.log(`Total de movimentos: ${total}`); // 7 movimentos

// Número de movimentos: 2^n - 1
// Complexidade de tempo: O(2^n) – exponencial.