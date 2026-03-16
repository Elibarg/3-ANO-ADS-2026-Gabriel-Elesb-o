// Simulação de atendimento bancário utilizando uma fila simples

class FilaBanco {
    constructor() {
        this.clientes = [];
    }

    chegada(cliente) {
        this.clientes.push(cliente);
        console.log(`Cliente ${cliente} entrou na fila.`);
    }

    atendimento() {
        if (this.clientes.length === 0) {
            console.log("Nenhum cliente na fila.");
            return null;
        }
        let cliente = this.clientes.shift();
        console.log(`Atendendo cliente ${cliente}...`);
        return cliente;
    }

    exibirFila() {
        console.log("Fila atual:", this.clientes.join(" <- "));
    }
}

// Simulação simples
let banco = new FilaBanco();
banco.chegada("João");
banco.chegada("Maria");
banco.chegada("José");
banco.exibirFila(); // João <- Maria <- José
banco.atendimento(); // Atende João
banco.exibirFila(); // Maria <- José
banco.atendimento(); // Atende Maria
banco.atendimento(); // Atende José
banco.atendimento(); // Nenhum cliente