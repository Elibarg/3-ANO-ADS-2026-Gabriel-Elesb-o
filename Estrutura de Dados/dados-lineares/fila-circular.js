// Fila Circular (implementada com array e ponteiros para evitar deslocamento)

class FilaCircular {
    constructor(tamanho) {
        this.capacidade = tamanho;
        this.itens = new Array(tamanho);
        this.inicio = 0;
        this.fim = 0; // posição onde será inserido o próximo elemento
        this.tamanhoAtual = 0;
    }

    enqueue(valor) {
        if (this.cheia()) {
            console.log("Fila cheia!");
            return;
        }
        this.itens[this.fim] = valor;
        this.fim = (this.fim + 1) % this.capacidade;
        this.tamanhoAtual++;
    }

    dequeue() {
        if (this.vazia()) return null;
        let valor = this.itens[this.inicio];
        this.inicio = (this.inicio + 1) % this.capacidade;
        this.tamanhoAtual--;
        return valor;
    }

    vazia() {
        return this.tamanhoAtual === 0;
    }

    cheia() {
        return this.tamanhoAtual === this.capacidade;
    }

    // Exibir (para testes)
    exibir() {
        let valores = [];
        for (let i = 0; i < this.tamanhoAtual; i++) {
            let indice = (this.inicio + i) % this.capacidade;
            valores.push(this.itens[indice]);
        }
        console.log("Fila circular:", valores.join(" "));
    }
}

// Teste
let filaCirc = new FilaCircular(5);
filaCirc.enqueue(10);
filaCirc.enqueue(20);
filaCirc.enqueue(30);
filaCirc.exibir(); // 10 20 30
console.log("Dequeue:", filaCirc.dequeue()); // 10
filaCirc.enqueue(40);
filaCirc.enqueue(50);
filaCirc.enqueue(60);
filaCirc.exibir(); // 20 30 40 50 60
// Ao tentar inserir mais um, deve dar "Fila cheia!"
filaCirc.enqueue(70);