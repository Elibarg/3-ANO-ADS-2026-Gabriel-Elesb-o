// ================== Heap Sort ==================
function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// ================== Função para gerar arrays aleatórios ==================
function gerarArray(tamanho) {
    return Array.from({ length: tamanho }, () => Math.floor(Math.random() * 10000));
}

// ================== Medição de desempenho ==================
function compararDesempenho() {
    const tamanhos = [100, 1000, 10000];
    console.log('Comparação de Desempenho (tempo em ms)');
    console.log('Tamanho\tMerge Sort\tQuick Sort\tHeap Sort');

    for (let tam of tamanhos) {
        const arr = gerarArray(tam);
        const arr1 = [...arr];
        const arr2 = [...arr];
        const arr3 = [...arr];

        // Merge Sort (implementação acima)
        const t0 = performance.now();
        mergeSort(arr1); // função do atividade3.js (deve estar disponível)
        const t1 = performance.now();

        // Quick Sort (padrão)
        const t2 = performance.now();
        quickSort(arr2);
        const t3 = performance.now();

        // Heap Sort
        const t4 = performance.now();
        heapSort(arr3);
        const t5 = performance.now();

        console.log(`${tam}\t${(t1 - t0).toFixed(2)}\t\t${(t3 - t2).toFixed(2)}\t\t${(t5 - t4).toFixed(2)}`);
    }
}
// Nota: As funções mergeSort e quickSort precisam estar definidas (copie do atividade3.js ou importe)
// Para executar isoladamente, inclua-as aqui ou use um ambiente que as tenha.

// ================== Teste de Estabilidade ==================
function testarEstabilidade() {
    // Criar array de objetos com valor e índice original
    const dados = [
        { valor: 5, idx: 0 },
        { valor: 2, idx: 1 },
        { valor: 5, idx: 2 },
        { valor: 1, idx: 3 },
        { valor: 5, idx: 4 },
    ];

    // Estável: Merge Sort
    function mergeSortEstavel(arr) {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const left = mergeSortEstavel(arr.slice(0, mid));
        const right = mergeSortEstavel(arr.slice(mid));
        return mergeEstavel(left, right);
    }
    function mergeEstavel(left, right) {
        let result = [], i = 0, j = 0;
        while (i < left.length && j < right.length) {
            // Critério de desempate: índice original mantém ordem relativa
            if (left[i].valor < right[j].valor ||
                (left[i].valor === right[j].valor && left[i].idx < right[j].idx)) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }
        return result.concat(left.slice(i)).concat(right.slice(j));
    }

    // Não estável: Quick Sort (versão simples)
    function quickSortNaoEstavel(arr) {
        if (arr.length <= 1) return arr;
        const pivot = arr[arr.length - 1];
        const left = [], right = [];
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i].valor <= pivot.valor) left.push(arr[i]);
            else right.push(arr[i]);
        }
        return [...quickSortNaoEstavel(left), pivot, ...quickSortNaoEstavel(right)];
    }

    const dadosCopia1 = dados.map(e => ({ ...e }));
    const dadosCopia2 = dados.map(e => ({ ...e }));

    const ordenadoEstavel = mergeSortEstavel(dadosCopia1);
    const ordenadoNaoEstavel = quickSortNaoEstavel(dadosCopia2);

    console.log('\nTeste de Estabilidade (valores iguais devem manter idx original crescente):');
    console.log('Original:', dados.map(e => `${e.valor}(${e.idx})`).join(' '));
    console.log('Merge Sort (estável):', ordenadoEstavel.map(e => `${e.valor}(${e.idx})`).join(' '));
    console.log('Quick Sort (não estável):', ordenadoNaoEstavel.map(e => `${e.valor}(${e.idx})`).join(' '));
}

// Executar
compararDesempenho();
testarEstabilidade();