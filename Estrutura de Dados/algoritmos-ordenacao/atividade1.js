// ================== Selection Sort com contagem ==================
function selectionSortWithCount(arr) {
    let comparacoes = 0;
    let trocas = 0;
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            comparacoes++;
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            trocas++;
        }
    }
    return { sorted: arr, comparacoes, trocas };
}

// Teste com 10 números inteiros
const numeros = [64, 25, 12, 22, 11, 90, 34, 17, 8, 45];
const result = selectionSortWithCount([...numeros]);
console.log('Selection Sort - 10 números:');
console.log('Original:', numeros);
console.log('Ordenado:', result.sorted);
console.log('Comparações:', result.comparacoes);
console.log('Trocas:', result.trocas);

// ================== Insertion Sort para strings ==================
function insertionSortStrings(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j].localeCompare(key) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

const palavras = ['laranja', 'abacaxi', 'uva', 'banana', 'maçã'];
console.log('\nInsertion Sort com strings:');
console.log('Original:', palavras);
console.log('Ordenado:', insertionSortStrings([...palavras]));