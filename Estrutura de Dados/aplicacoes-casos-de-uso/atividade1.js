// atividade2.js - Problema do Caixeiro Viajante (TSP)

// ==================== Força Bruta (permutações) ====================
function tspForcaBruta(distancias) {
    const n = distancias.length;
    const cidades = Array.from({ length: n }, (_, i) => i);
    let menorCaminho = null;
    menorDistancia = Infinity;

    // Função para gerar permutações (algoritmo de Heap)
    function permutar(array, tamanho) {
        if (tamanho === 1) {
            // calcula distância total para essa permutação (fechando o ciclo)
            let dist = 0;
            for (let i = 0; i < n - 1; i++) {
                dist += distancias[array[i]][array[i + 1]];
            }
            dist += distancias[array[n - 1]][array[0]]; // volta à origem
            if (dist < menorDistancia) {
                menorDistancia = dist;
                menorCaminho = [...array];
            }
            return;
        }

        for (let i = 0; i < tamanho; i++) {
            permutar(array, tamanho - 1);
            if (tamanho % 2 === 0) {
                [array[i], array[tamanho - 1]] = [array[tamanho - 1], array[i]];
            } else {
                [array[0], array[tamanho - 1]] = [array[tamanho - 1], array[0]];
            }
        }
    }

    permutar(cidades, n);
    return { caminho: menorCaminho, distancia: menorDistancia };
}

// ==================== Algoritmo do Vizinho Mais Próximo ====================
function tspVizinhoMaisProximo(distancias, cidadeInicial = 0) {
    const n = distancias.length;
    const visitadas = new Array(n).fill(false);
    const caminho = [cidadeInicial];
    visitadas[cidadeInicial] = true;
    let distanciaTotal = 0;
    let atual = cidadeInicial;

    for (let passo = 1; passo < n; passo++) {
        let proxima = -1;
        let menorDist = Infinity;
        for (let i = 0; i < n; i++) {
            if (!visitadas[i] && distancias[atual][i] < menorDist) {
                menorDist = distancias[atual][i];
                proxima = i;
            }
        }
        caminho.push(proxima);
        visitadas[proxima] = true;
        distanciaTotal += menorDist;
        atual = proxima;
    }
    // volta à cidade inicial
    distanciaTotal += distancias[atual][cidadeInicial];
    return { caminho, distancia: distanciaTotal };
}

// ==================== Testes ====================
// Matriz de distâncias simétrica para 5 cidades (exemplo)
const dist5 = [
    [0, 2, 9, 10, 7],
    [2, 0, 6, 4, 3],
    [9, 6, 0, 8, 5],
    [10, 4, 8, 0, 6],
    [7, 3, 5, 6, 0]
];

console.log("=== TSP Força Bruta (5 cidades) ===");
const resultadoExato = tspForcaBruta(dist5);
console.log("Melhor caminho:", resultadoExato.caminho);
console.log("Distância mínima:", resultadoExato.distancia);

console.log("\n=== TSP Vizinho Mais Próximo (5 cidades) ===");
const resultadoVMP = tspVizinhoMaisProximo(dist5);
console.log("Caminho encontrado:", resultadoVMP.caminho);
console.log("Distância:", resultadoVMP.distancia);

// Comparação para 10 cidades (gerando matriz aleatória)
console.log("\n=== Comparação para 10 cidades (aleatório) ===");
const n = 10;
const dist10 = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 20) + 1)
);
// garantir simetria e zero na diagonal
for (let i = 0; i < n; i++) {
    dist10[i][i] = 0;
    for (let j = i + 1; j < n; j++) {
        dist10[j][i] = dist10[i][j];
    }
}

console.log("Força bruta (pode demorar)...");
console.time("Força Bruta 10");
const exato10 = tspForcaBruta(dist10); // cuidado: 10! = 3.6M permutações, pode ser lento
console.timeEnd("Força Bruta 10");

console.log("Vizinho Mais Próximo:");
console.time("VMP 10");
const vmp10 = tspVizinhoMaisProximo(dist10);
console.timeEnd("VMP 10");

console.log("Distância exata:", exato10.distancia);
console.log("Distância VMP:", vmp10.distancia);
console.log("Diferença:", vmp10.distancia - exato10.distancia);