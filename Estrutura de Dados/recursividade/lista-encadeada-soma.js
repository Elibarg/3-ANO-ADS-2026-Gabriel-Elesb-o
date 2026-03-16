// 4. Soma dos Elementos de uma Lista Encadeada (recursiva)
// Crie uma função recursiva que percorra uma lista simplesmente encadeada e retorne a soma de todos os elementos.

// Reaproveitando a classe No do exercício de lista simples
class No {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

// Função recursiva para somar os valores
function somaRecursiva(no) {
    if (!no) return 0; // caso base: lista vazia
    return no.valor + somaRecursiva(no.proximo);
}

// Construindo uma lista de exemplo
let head = new No(5);
head.proximo = new No(10);
head.proximo.proximo = new No(15);
head.proximo.proximo.proximo = new No(20);

console.log("Soma dos elementos:", somaRecursiva(head)); // 5+10+15+20 = 50