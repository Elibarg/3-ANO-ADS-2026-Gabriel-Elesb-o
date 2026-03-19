// atividade4.js - Sistema de Arquivos Simples com Árvore B+ (ordem 3)

// Implementação simplificada de uma árvore B+ apenas para nomes de arquivos (strings)
// A árvore armazena chaves (nomes) e não lida com valores associados.
// As folhas contêm as chaves em ordem.
// Para simplicidade, usamos ordem 3 (máximo 2 chaves por nó, mínimo 1 chave por nó não-raiz).

class NoBPlus {
    constructor(isFolha = false) {
        this.isFolha = isFolha;
        this.chaves = [];
        this.filhos = []; // para nós internos: referências para filhos; para folhas: próximo ponteiro (opcional)
        this.proximo = null; // apenas para folhas (lista encadeada de folhas)
    }
}

class ArvoreBPlus {
    constructor(ordem = 3) {
        this.ordem = ordem;
        this.raiz = new NoBPlus(true);
    }

    // Busca por uma chave (retorna true se existir)
    buscar(chave) {
        return this._buscar(this.raiz, chave);
    }

    _buscar(no, chave) {
        if (no.isFolha) {
            return no.chaves.includes(chave);
        }
        // encontra filho apropriado
        let i = 0;
        while (i < no.chaves.length && chave >= no.chaves[i]) {
            i++;
        }
        return this._buscar(no.filhos[i], chave);
    }

    // Inserir uma chave
    inserir(chave) {
        const resultado = this._inserir(this.raiz, chave);
        if (resultado && resultado.no) {
            // a raiz foi dividida, criar nova raiz
            const novaRaiz = new NoBPlus(false);
            novaRaiz.chaves = [resultado.chave];
            novaRaiz.filhos = [resultado.no, resultado.novoNo];
            this.raiz = novaRaiz;
        }
    }

    _inserir(no, chave) {
        if (no.isFolha) {
            // inserir na folha ordenadamente
            let pos = 0;
            while (pos < no.chaves.length && chave > no.chaves[pos]) pos++;
            if (no.chaves[pos] === chave) return; // chave já existe (ignorar)
            no.chaves.splice(pos, 0, chave);

            // verificar se precisa dividir
            if (no.chaves.length <= this.ordem - 1) return null;
            // dividir folha
            const meio = Math.floor(no.chaves.length / 2);
            const novoNo = new NoBPlus(true);
            novoNo.chaves = no.chaves.splice(meio);
            // ajustar ponteiro próximo
            novoNo.proximo = no.proximo;
            no.proximo = novoNo;
            return {
                chave: novoNo.chaves[0], // chave promovida (menor da nova folha)
                no: no,
                novoNo: novoNo
            };
        } else {
            // nó interno
            let i = 0;
            while (i < no.chaves.length && chave >= no.chaves[i]) i++;
            const resultado = this._inserir(no.filhos[i], chave);
            if (!resultado) return null;

            // inserir a chave promovida e o novo filho neste nó
            const chavePromovida = resultado.chave;
            const filhoEsq = resultado.no;
            const filhoDir = resultado.novoNo;

            let pos = 0;
            while (pos < no.chaves.length && chavePromovida > no.chaves[pos]) pos++;
            no.chaves.splice(pos, 0, chavePromovida);
            no.filhos.splice(pos + 1, 0, filhoDir);

            if (no.chaves.length <= this.ordem - 1) return null;
            // dividir nó interno
            const meio = Math.floor(no.chaves.length / 2);
            const chaveSubir = no.chaves[meio];
            const novoNo = new NoBPlus(false);
            novoNo.chaves = no.chaves.splice(meio + 1); // remove após o meio
            novoNo.filhos = no.filhos.splice(meio + 1);
            // o nó atual mantém as chaves antes do meio e os filhos correspondentes
            return {
                chave: chaveSubir,
                no: no,
                novoNo: novoNo
            };
        }
    }

    // Remover (simplificado: apenas marca como removido, não rebalanceia)
    remover(chave) {
        return this._remover(this.raiz, chave);
    }

    _remover(no, chave) {
        if (no.isFolha) {
            const index = no.chaves.indexOf(chave);
            if (index !== -1) {
                no.chaves.splice(index, 1);
                return true;
            }
            return false;
        } else {
            let i = 0;
            while (i < no.chaves.length && chave >= no.chaves[i]) i++;
            return this._remover(no.filhos[i], chave);
        }
    }

    // Listar todos os arquivos em ordem (percorrendo as folhas)
    listar() {
        const arquivos = [];
        let no = this.raiz;
        // encontrar a folha mais à esquerda
        while (!no.isFolha) {
            no = no.filhos[0];
        }
        // percorrer folhas
        while (no) {
            arquivos.push(...no.chaves);
            no = no.proximo;
        }
        return arquivos;
    }
}

// ==================== Simulação ====================
const fs = new ArvoreBPlus(3); // ordem 3

console.log("=== Sistema de Arquivos com Árvore B+ ===");

// Inserir arquivos
console.log("\nInserindo arquivos...");
fs.inserir("documento.txt");
fs.inserir("foto.jpg");
fs.inserir("musica.mp3");
fs.inserir("video.mp4");
fs.inserir("planilha.xlsx");
fs.inserir("apresentacao.pptx");
fs.inserir("codigo.js");

console.log("Arquivos atuais:", fs.listar().join(", "));

// Buscas
console.log("\nBuscando 'musica.mp3':", fs.buscar("musica.mp3"));
console.log("Buscando 'inexistente.pdf':", fs.buscar("inexistente.pdf"));

// Remover
console.log("\nRemovendo 'foto.jpg'...");
fs.remover("foto.jpg");
console.log("Arquivos após remoção:", fs.listar().join(", "));

// Medir tempo de busca após inserções
console.log("\nMedindo tempo de busca...");
console.time("Busca por 'video.mp4'");
fs.buscar("video.mp4");
console.timeEnd("Busca por 'video.mp4'");

// Inserir muitos arquivos para medir impacto
console.log("\nInserindo 1000 arquivos...");
console.time("Inserção de 1000");
for (let i = 0; i < 1000; i++) {
    fs.inserir(`arquivo_${i}.tmp`);
}
console.timeEnd("Inserção de 1000");

console.time("Busca por 'arquivo_999.tmp'");
fs.buscar(`arquivo_999.tmp`);
console.timeEnd("Busca por 'arquivo_999.tmp'");