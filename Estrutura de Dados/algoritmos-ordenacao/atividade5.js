// ================== Heap Sort Estável ==================
// Para garantir estabilidade, usamos um comparador que leva em conta o índice original
function heapSortEstavel(arr) {
    // Adiciona índice original a cada elemento
    const comIndice = arr.map((valor, idx) => ({ valor, idx }));
    const n = comIndice.length;

    // Função de comparação estável: primeiro valor, depois índice
    function comparar(a, b) {
        if (a.valor !== b.valor) return a.valor - b.valor;
        return a.idx - b.idx; // mantém ordem relativa
    }

    // Heapify adaptado: troca se a for maior que b (considerando estabilidade)
    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && comparar(arr[left], arr[largest]) > 0) largest = left;
        if (right < n && comparar(arr[right], arr[largest]) > 0) largest = right;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest);
        }
    }

    // Construir max-heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(comIndice, n, i);

    // Extrair elementos
    for (let i = n - 1; i > 0; i--) {
        [comIndice[0], comIndice[i]] = [comIndice[i], comIndice[0]];
        heapify(comIndice, i, 0);
    }

    // Retorna apenas os valores (já ordenados estavelmente)
    return comIndice.map(item => item.valor);
}

// ================== Selection Sort Estável ==================
// Para ser estável, em vez de trocar, deslocamos os elementos (inserção do mínimo)
function selectionSortEstavel(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        // Encontra o índice do menor elemento a partir de i
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Guarda o menor elemento e remove da posição original
        const menor = arr[minIndex];
        // Desloca todos os elementos entre i e minIndex-1 para a direita
        for (let k = minIndex; k > i; k--) {
            arr[k] = arr[k - 1];
        }
        // Coloca o menor na posição i
        arr[i] = menor;
    }
    return arr;
}

// ================== Testes ==================
const numeros = [64, 25, 12, 22, 11, 25, 34, 12, 8, 45];
console.log('Heap Sort Estável:');
console.log('Original:', numeros);
console.log('Ordenado:', heapSortEstavel([...numeros]));

const dadosEstabilidade = [
    { valor: 5, idx: 0 },
    { valor: 2, idx: 1 },
    { valor: 5, idx: 2 },
    { valor: 1, idx: 3 },
    { valor: 5, idx: 4 },
];
const dadosNumericos = dadosEstabilidade.map(d => d.valor);
console.log('\nSelection Sort Estável (com valores repetidos):');
console.log('Original (valor,idx):', dadosEstabilidade.map(d => `${d.valor}(${d.idx})`).join(' '));
const ordenadoEstavel = selectionSortEstavel(dadosNumericos);
// Para verificar a estabilidade, precisamos mapear de volta: assumindo que os valores são iguais,
// a ordem dos índices deve ser preservada. Como selectionSortEstável apenas desloca,
// a primeira ocorrência de cada valor mantém sua ordem relativa.
console.log('Ordenado (valores):', ordenadoEstavel);
// Reconstituindo os índices (apenas ilustrativo)
const indicesResultado = [];
const copiaOriginal = [...dadosEstabilidade];
ordenadoEstavel.forEach(val => {
    const index = copiaOriginal.findIndex(item => item.valor === val && !indicesResultado.includes(item.idx));
    if (index !== -1) indicesResultado.push(copiaOriginal[index].idx);
});
console.log('Índices após ordenação (devem manter ordem crescente para valores iguais):', indicesResultado);