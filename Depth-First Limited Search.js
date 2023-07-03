function main(){
    const grafo = {
        "Oradea": ["Zerind", "Sibiu"],
        "Zerind": ["Oradea", "Arad"],
        "Arad": ["Zerind", "Sibiu", "Timisoara"],
        "Timisoara": ["Arad", "Lugoj"],
        "Lugoj": ["Timisoara", "Mehadia"],
        "Mehadia": ["Lugoj", "Dobreta"],
        "Dobreta": ["Mehadia", "Craiova"],
        "Craiova": ["Dobreta", "Rimnicu Vilcea", "Pitesti"],
        "Sibiu": ["Oradea", "Arad", "Fagaras", "Rimnicu Vilcea"],
        "Rimnicu Vilcea": ["Sibiu", "Craiova", "Pitesti"],
        "Fagaras": ["Sibiu", "Bucharest"],
        "Pitesti": ["Rimnicu Vilcea", "Craiova", "Bucharest"],
        "Bucharest": ["Fagaras", "Pitesti", "Giurgiu", "Urziceni"],
        "Giurgiu": ["Bucharest"],
        "Urziceni": ["Bucharest", "Hirsova", "Vaslui"],
        "Hirsova": ["Urziceni", "Eforie"],
        "Eforie": ["Hirsova"],
        "Vaslui": ["Urziceni", "Iasi"],
        "Iasi": ["Vaslui", "Neamt"],
        "Neamt": ["Iasi"]
    }  
    const [origem, destino, profundidadeLimite] = process.argv.splice(2)
    const profundidadeAtual = 1

    if (origem == destino) {
        console.log("Você já está na cidade de destino")
        return 
    }

    const resultado = buscaEmProfundidadeLimitada(grafo, profundidadeAtual, parseInt(profundidadeLimite), origem, destino)

    if (resultado == true) {
        console.log("Resultado encontrado dentro do limite")
    }
    else {
        console.log("Resultado não encontrado dentro do limite")
    }
} 

function buscaEmProfundidadeLimitada(grafo, profundidadeAtual, profundidadeLimite, noAtual, destino){
    if (noAtual == destino) {
        return true
    }

    if (profundidadeAtual > profundidadeLimite) {
        return false
    }
    
    var vizinhos = grafo[noAtual]
    for (let i = 0; i < vizinhos.length; i++) {
        var vizinho = vizinhos[i]

        if (buscaEmProfundidadeLimitada(grafo, profundidadeAtual+1, profundidadeLimite, vizinho, destino)) {
            return true
        }
    }

    return false
}

main()