// atividade5.js - Rede Social com Grafo e BFS

class GrafoRedeSocial {
    constructor() {
        this.adj = new Map(); // mapa: usuário -> lista de amigos
    }

    adicionarUsuario(usuario) {
        if (!this.adj.has(usuario)) {
            this.adj.set(usuario, []);
        }
    }

    adicionarAmizade(usuario1, usuario2) {
        this.adicionarUsuario(usuario1);
        this.adicionarUsuario(usuario2);
        this.adj.get(usuario1).push(usuario2);
        this.adj.get(usuario2).push(usuario1);
    }

    // Retorna a menor distância (número de arestas) entre usuario1 e usuario2 usando BFS
    distanciaMinima(usuario1, usuario2) {
        if (!this.adj.has(usuario1) || !this.adj.has(usuario2)) {
            return -1; // um dos usuários não existe
        }
        if (usuario1 === usuario2) return 0;

        const visitados = new Set();
        const fila = [[usuario1, 0]]; // [usuário, distância]
        visitados.add(usuario1);

        while (fila.length > 0) {
            const [atual, dist] = fila.shift();
            for (const amigo of this.adj.get(atual)) {
                if (amigo === usuario2) {
                    return dist + 1;
                }
                if (!visitados.has(amigo)) {
                    visitados.add(amigo);
                    fila.push([amigo, dist + 1]);
                }
            }
        }
        return -1; // não conectado
    }

    exibirRede() {
        console.log("Rede Social:");
        for (const [usuario, amigos] of this.adj.entries()) {
            console.log(`  ${usuario} -> ${amigos.join(", ")}`);
        }
    }
}

// ==================== Simulação ====================
const rede = new GrafoRedeSocial();

// Adicionar usuários e amizades
rede.adicionarAmizade("Alice", "Bob");
rede.adicionarAmizade("Alice", "Carol");
rede.adicionarAmizade("Bob", "David");
rede.adicionarAmizade("Carol", "David");
rede.adicionarAmizade("David", "Eve");
rede.adicionarAmizade("Eve", "Frank");
rede.adicionarAmizade("Frank", "Grace");
rede.adicionarAmizade("Grace", "Heidi");

rede.exibirRede();

// Testar distâncias
console.log("\n=== Distâncias ===");
console.log("Alice -> Bob:", rede.distanciaMinima("Alice", "Bob")); // 1
console.log("Alice -> David:", rede.distanciaMinima("Alice", "David")); // 2 (Alice-Bob-David ou Alice-Carol-David)
console.log("Alice -> Eve:", rede.distanciaMinima("Alice", "Eve")); // 3
console.log("Alice -> Heidi:", rede.distanciaMinima("Alice", "Heidi")); // 4
console.log("Alice -> Carlos (inexistente):", rede.distanciaMinima("Alice", "Carlos")); // -1
console.log("Bob -> Bob:", rede.distanciaMinima("Bob", "Bob")); // 0