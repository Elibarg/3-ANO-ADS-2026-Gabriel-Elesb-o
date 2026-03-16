// 3. Lista Duplamente Encadeada
// Implemente uma lista duplamente encadeada com as operações de inserir no início e remover do final da lista.
// Crie uma função que percorra a lista em ambas as direções, imprimindo os valores dos nós.

class NoDuplo {
    constructor(valor) {
        this.valor = valor;
        this.anterior = null;
        this.proximo = null;
    }
}

class ListaDupla {
    constructor() {
        this.head = null;
        this.tail = null; // último nó
    }

    // Inserir no início
    inserirInicio(valor) {
        let novo = new NoDuplo(valor);
        if (!this.head) {
            this.head = this.tail = novo;
            return;
        }
        novo.proximo = this.head;
        this.head.anterior = novo;
        this.head = novo;
    }

    // Remover do final
    removerFinal() {
        if (!this.tail) return null;
        let removido = this.tail.valor;
        if (this.head === this.tail) { // apenas um nó
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.anterior;
            this.tail.proximo = null;
        }
        return removido;
    }

    // Percorrer da esquerda para a direita
    percorrerFrente() {
        let valores = [];
        let atual = this.head;
        while (atual) {
            valores.push(atual.valor);
            atual = atual.proximo;
        }
        console.log("Frente:", valores.join(" <-> "));
    }

    // Percorrer da direita para a esquerda
    percorrerTras() {
        let valores = [];
        let atual = this.tail;
        while (atual) {
            valores.push(atual.valor);
            atual = atual.anterior;
        }
        console.log("Trás: ", valores.join(" <-> "));
    }
}

// Testes
let listaDupla = new ListaDupla();
listaDupla.inserirInicio(10);
listaDupla.inserirInicio(5);
listaDupla.inserirInicio(1);
listaDupla.percorrerFrente(); // 1 <-> 5 <-> 10
listaDupla.percorrerTras();    // 10 <-> 5 <-> 1

let removido = listaDupla.removerFinal();
console.log("Removido do final:", removido); // 10
listaDupla.percorrerFrente(); // 1 <-> 5