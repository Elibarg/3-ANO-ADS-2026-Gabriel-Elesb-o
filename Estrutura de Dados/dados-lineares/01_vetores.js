// 1. Vetores
// Cria um vetor com 10 números inteiros (exemplo)
let vetor = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// Função de busca linear
function buscar(valor) {
    for (let i = 0; i < vetor.length; i++) {
        if (vetor[i] === valor) return i; // retorna o índice se encontrar
    }
    return -1; // não encontrado
}

// Função para remover elemento de uma posição específica
function remover(posicao) {
    if (posicao < 0 || posicao >= vetor.length) {
        console.log("Posição inválida");
        return null;
    }
    // Remove o elemento e desloca os demais
    let removido = vetor.splice(posicao, 1)[0];
    return removido;
}