// atividade3.js - Busca de Padrões em Textos

// ==================== Força Bruta ====================
function buscaForcaBruta(texto, padrao) {
    const n = texto.length;
    const m = padrao.length;
    const ocorrencias = [];

    for (let i = 0; i <= n - m; i++) {
        let j = 0;
        while (j < m && texto[i + j] === padrao[j]) {
            j++;
        }
        if (j === m) {
            ocorrencias.push(i);
        }
    }
    return ocorrencias;
}

// ==================== KMP ====================
function construirTabelaFalha(padrao) {
    const m = padrao.length;
    const falha = new Array(m).fill(0);
    let j = 0;
    for (let i = 1; i < m; i++) {
        while (j > 0 && padrao[i] !== padrao[j]) {
            j = falha[j - 1];
        }
        if (padrao[i] === padrao[j]) {
            j++;
        }
        falha[i] = j;
    }
    return falha;
}

function buscaKMP(texto, padrao) {
    const n = texto.length;
    const m = padrao.length;
    if (m === 0) return [];
    const falha = construirTabelaFalha(padrao);
    const ocorrencias = [];
    let j = 0; // índice no padrão

    for (let i = 0; i < n; i++) {
        while (j > 0 && texto[i] !== padrao[j]) {
            j = falha[j - 1];
        }
        if (texto[i] === padrao[j]) {
            j++;
        }
        if (j === m) {
            ocorrencias.push(i - m + 1);
            j = falha[j - 1]; // continua procurando
        }
    }
    return ocorrencias;
}

// ==================== Testes e Comparação ====================
const texto = "ABABDABACDABABCABABABABDABACDABABCABAB";
const padrao = "ABABCABAB";

console.log("Texto:", texto);
console.log("Padrão:", padrao);

console.log("\n=== Força Bruta ===");
console.time("Força Bruta");
const fb = buscaForcaBruta(texto, padrao);
console.timeEnd("Força Bruta");
console.log("Ocorrências:", fb);

console.log("\n=== KMP ===");
console.time("KMP");
const kmp = buscaKMP(texto, padrao);
console.timeEnd("KMP");
console.log("Ocorrências:", kmp);

// Teste com texto maior (gerado aleatoriamente)
console.log("\n=== Comparação com texto grande (100k caracteres) ===");
const letras = "ABCD";
const textoGrande = Array.from({ length: 100000 }, () => letras[Math.floor(Math.random() * 4)]).join('');
const padraoGrande = "ABAB"; // padrão pequeno

console.time("Força Bruta (grande)");
buscaForcaBruta(textoGrande, padraoGrande);
console.timeEnd("Força Bruta (grande)");

console.time("KMP (grande)");
buscaKMP(textoGrande, padraoGrande);
console.timeEnd("KMP (grande)");