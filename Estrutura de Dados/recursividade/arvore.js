// 3. Travessias em Árvores e Busca em Árvore Binária de Busca (exercício 5)
// Implemente percurso in-order, pre-order, post-order e busca recursiva.

class NoArvore {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

// Inserção para construir uma árvore de exemplo (não faz parte dos exercícios, mas é útil)
function inserir(raiz, valor) {
    if (!raiz) return new NoArvore(valor);
    if (valor < raiz.valor) raiz.esquerda = inserir(raiz.esquerda, valor);
    else if (valor > raiz.valor) raiz.direita = inserir(raiz.direita, valor);
    return raiz;
}

// Percurso in-order (esquerda, raiz, direita)
function inOrder(no) {
    if (no) {
        inOrder(no.esquerda);
        console.log(no.valor);
        inOrder(no.direita);
    }
}

// Percurso pre-order (raiz, esquerda, direita)
function preOrder(no) {
    if (no) {
        console.log(no.valor);
        preOrder(no.esquerda);
        preOrder(no.direita);
    }
}

// Percurso post-order (esquerda, direita, raiz)
function postOrder(no) {
    if (no) {
        postOrder(no.esquerda);
        postOrder(no.direita);
        console.log(no.valor);
    }
}

// 5. Busca em Árvore Binária de Busca (recursiva)
function buscaBST(raiz, valor) {
    if (!raiz) return null;
    if (raiz.valor === valor) return raiz;
    if (valor < raiz.valor) return buscaBST(raiz.esquerda, valor);
    else return buscaBST(raiz.direita, valor);
}

// Construindo uma árvore de exemplo
let raiz = null;
raiz = inserir(raiz, 50);
inserir(raiz, 30);
inserir(raiz, 70);
inserir(raiz, 20);
inserir(raiz, 40);
inserir(raiz, 60);
inserir(raiz, 80);

console.log("Percurso in-order:");
inOrder(raiz); // 20 30 40 50 60 70 80
console.log("Percurso pre-order:");
preOrder(raiz); // 50 30 20 40 70 60 80
console.log("Percurso post-order:");
postOrder(raiz); // 20 40 30 60 80 70 50

let buscado = buscaBST(raiz, 40);
console.log("Busca por 40:", buscado ? "Encontrado" : "Não encontrado");
buscado = buscaBST(raiz, 99);
console.log("Busca por 99:", buscado ? "Encontrado" : "Não encontrado");

// Complexidade da busca em BST: O(h) onde h é a altura da árvore. No pior caso (árvore degenerada) O(n), no melhor caso O(log n).