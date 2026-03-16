// 5. Fila (Queue)
// Crie uma fila e implemente as operações de enqueue e dequeue.

class Fila {
    constructor() {
        this.itens = [];
    }

    enqueue(valor) {
        this.itens.push(valor);
    }

    dequeue() {
        if (this.vazia()) return null;
        return this.itens.shift(); // O(n) – mas para simplicidade, usamos shift
    }

    vazia() {
        return this.itens.length === 0;
    }

    frente() {
        if (this.vazia()) return null;
        return this.itens[0];
    }
}

// Teste básico
let fila = new Fila();
fila.enqueue(1);
fila.enqueue(2);
fila.enqueue(3);
console.log("Fila:", fila.itens); // [1,2,3]
console.log("Dequeue:", fila.dequeue()); // 1
console.log("Fila após dequeue:", fila.itens); // [2,3]