// 7. Contagem de Nós em uma Lista Encadeada (recursiva)
// Implemente uma função recursiva que conte o número de nós em uma lista encadeada.

// Reaproveitando a classe No
class No {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

function contarNos(no) {
    if (!no) return 0; // caso base
    return 1 + contarNos(no.proximo);
}

// Lista de exemplo
let head = new No(1);
head.proximo = new No(2);
head.proximo.proximo = new No(3);

console.log("Número de nós:", contarNos(head)); // 3

// Análise:
// Tempo: O(n) – percorre cada nó uma vez.
// Espaço: O(n) – devido à pilha de recursão (cada chamada ocupa memória).