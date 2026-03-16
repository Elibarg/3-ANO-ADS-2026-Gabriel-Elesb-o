// 2. Lista Simplesmente Encadeada
// Implemente uma lista simplesmente encadeada com as operações: inserir no início, inserir no final e remover de uma posição específica.
// Modifique para permitir a busca de um elemento por valor.

class No {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

class ListaSimples {
    constructor() {
        this.head = null; // início da lista
    }

    // Inserir no início
    inserirInicio(valor) {
        let novo = new No(valor);
        novo.proximo = this.head;
        this.head = novo;
    }

    // Inserir no final
    inserirFinal(valor) {
        let novo = new No(valor);
        if (!this.head) {
            this.head = novo;
            return;
        }
        let atual = this.head;
        while (atual.proximo) {
            atual = atual.proximo;
        }
        atual.proximo = novo;
    }

    // Remover de uma posição específica (índice base 0)
    removerPosicao(indice) {
        if (indice < 0 || !this.head) return null;
        if (indice === 0) {
            let removido = this.head;
            this.head = this.head.proximo;
            return removido.valor;
        }
        let atual = this.head;
        let anterior = null;
        let contador = 0;
        while (atual && contador < indice) {
            anterior = atual;
            atual = atual.proximo;
            contador++;
        }
        if (!atual) return null; // índice fora do limite
        anterior.proximo = atual.proximo;
        return atual.valor;
    }

    // Buscar por valor (retorna o índice ou -1)
    buscar(valor) {
        let atual = this.head;
        let indice = 0;
        while (atual) {
            if (atual.valor === valor) return indice;
            atual = atual.proximo;
            indice++;
        }
        return -1;
    }

    // Exibir a lista (para testes)
    exibir() {
        let valores = [];
        let atual = this.head;
        while (atual) {
            valores.push(atual.valor);
            atual = atual.proximo;
        }
        console.log(valores.join(" -> "));
    }
}

// Testes
let lista = new ListaSimples();
lista.inserirInicio(10);
lista.inserirInicio(5);
lista.inserirFinal(20);
lista.inserirFinal(30);
lista.exibir(); // 5 -> 10 -> 20 -> 30

console.log("Buscar 20:", lista.buscar(20)); // 2
console.log("Buscar 99:", lista.buscar(99)); // -1

let removido = lista.removerPosicao(2); // remove o 20
console.log("Removido:", removido);
lista.exibir(); // 5 -> 10 -> 30