// ================== Merge Sort ==================
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// ================== Quick Sort padrão (pivô = último elemento) ==================
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [], right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] <= pivot) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// ================== Quick Sort com mediana de três ==================
function quickSortMedianOfThree(arr) {
    if (arr.length <= 1) return arr;

    // Escolhe a mediana entre primeiro, meio e último
    const first = arr[0];
    const mid = arr[Math.floor(arr.length / 2)];
    const last = arr[arr.length - 1];
    const candidates = [first, mid, last].sort((a, b) => a - b);
    const pivot = candidates[1]; // mediana

    // Remove o pivô do array para particionar
    const arrCopy = [...arr];
    const pivotIndex = arrCopy.indexOf(pivot);
    arrCopy.splice(pivotIndex, 1);

    const left = [], right = [];
    for (let val of arrCopy) {
        if (val <= pivot) left.push(val);
        else right.push(val);
    }
    return [...quickSortMedianOfThree(left), pivot, ...quickSortMedianOfThree(right)];
}

// ================== Teste com 50 números aleatórios ==================
function testarOrdenacao() {
    const tamanho = 50;
    const original = Array.from({ length: tamanho }, () => Math.floor(Math.random() * 1000));
    console.log('Comparação Merge vs Quick (50 elementos)');
    console.log('Amostra original:', original.slice(0, 10), '...');

    // Merge Sort
    console.time('Merge Sort');
    const mergeResult = mergeSort([...original]);
    console.timeEnd('Merge Sort');

    // Quick Sort padrão
    console.time('Quick Sort (padrão)');
    const quickResult = quickSort([...original]);
    console.timeEnd('Quick Sort (padrão)');

    // Quick Sort mediana de três
    console.time('Quick Sort (mediana)');
    const quickMedResult = quickSortMedianOfThree([...original]);
    console.timeEnd('Quick Sort (mediana)');

    // Verificação (opcional)
    const correta = [...original].sort((a, b) => a - b);
    console.log('Merge OK:', JSON.stringify(mergeResult) === JSON.stringify(correta));
    console.log('Quick OK:', JSON.stringify(quickResult) === JSON.stringify(correta));
    console.log('Quick Mediana OK:', JSON.stringify(quickMedResult) === JSON.stringify(correta));
}
testarOrdenacao();