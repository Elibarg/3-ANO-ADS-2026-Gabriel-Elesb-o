// ================== Bubble Sort otimizado com contagem ==================
function bubbleSortOptimized(arr) {
    let comparacoes = 0;
    let n = arr.length;
    let trocado;
    do {
        trocado = false;
        for (let i = 0; i < n - 1; i++) {
            comparacoes++;
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                trocado = true;
            }
        }
        n--; // último elemento já está no lugar
    } while (trocado);
    return comparacoes;
}

// a) Complexidade para 100 elementos (desordenado vs ordenado)
function analiseBubbleSort() {
    const tamanho = 100;
    const desordenado = Array.from({ length: tamanho }, () => Math.floor(Math.random() * 1000));
    const ordenado = [...desordenado].sort((a, b) => a - b);

    console.log('Análise do Bubble Sort:');
    console.log(`Lista desordenada (${tamanho} elementos):`);
    let comp1 = bubbleSortOptimized([...desordenado]);
    console.log(`Comparações: ${comp1} (esperado ~${tamanho * (tamanho - 1) / 2})`);

    console.log(`Lista já ordenada (${tamanho} elementos):`);
    let comp2 = bubbleSortOptimized([...ordenado]);
    console.log(`Comparações: ${comp2} (com otimização, apenas uma passada: ${tamanho - 1})`);
}
analiseBubbleSort();

// ================== Comparação Selection vs Insertion (10 elementos) ==================
function compararSorts() {
    const dados = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    console.log('\nComparação Selection vs Insertion:');
    console.log('Lista original:', dados);

    // Selection Sort (reaproveitando a função com contadores)
    function selectionCountOnly(arr) {
        let comp = 0;
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let min = i;
            for (let j = i + 1; j < n; j++) {
                comp++;
                if (arr[j] < arr[min]) min = j;
            }
            if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];
        }
        return comp;
    }

    // Insertion Sort com contagem
    function insertionCountOnly(arr) {
        let comp = 0;
        const n = arr.length;
        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;
            while (j >= 0 && (comp++, arr[j] > key)) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
        return comp;
    }

    const compSel = selectionCountOnly([...dados]);
    const compIns = insertionCountOnly([...dados]);
    console.log(`Comparações Selection: ${compSel}`);
    console.log(`Comparações Insertion: ${compIns}`);
}
compararSorts();