// 4. Pilha (Stack)
// Implemente uma pilha e adicione operações para verificar se a pilha está cheia ou vazia.
// Utilize uma pilha para verificar se uma expressão aritmética contém parênteses balanceados.

class Pilha {
    constructor(tamanhoMaximo = 100) {
        this.itens = [];
        this.tamanhoMaximo = tamanhoMaximo;
    }

    push(valor) {
        if (this.cheia()) {
            console.log("Pilha cheia!");
            return;
        }
        this.itens.push(valor);
    }

    pop() {
        if (this.vazia()) return null;
        return this.itens.pop();
    }

    top() {
        if (this.vazia()) return null;
        return this.itens[this.itens.length - 1];
    }

    vazia() {
        return this.itens.length === 0;
    }

    cheia() {
        return this.itens.length >= this.tamanhoMaximo;
    }
}

// Função para verificar parênteses balanceados
function parentesesBalanceados(expressao) {
    let pilha = new Pilha();
    for (let char of expressao) {
        if (char === '(') {
            pilha.push(char);
        } else if (char === ')') {
            if (pilha.vazia()) return false; // fecha sem abrir
            pilha.pop();
        }
    }
    return pilha.vazia(); // se vazia, todos foram fechados
}

// Testes
let expressao1 = "((1+2) * (3/4))";
let expressao2 = "((1+2) * (3/4)";
console.log(`"${expressao1}" balanceado?`, parentesesBalanceados(expressao1)); // true
console.log(`"${expressao2}" balanceado?`, parentesesBalanceados(expressao2)); // false