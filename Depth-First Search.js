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
    const [origem, destino] = process.argv.splice(2)

    if (origem == destino) {
        console.log("Você já está na cidade de destino")
        return 
    }

    const resultado = buscaEmProfundidade(grafo, origem, destino)

    if (resultado == false) {
        console.log("Caminho não encontrado")
    }
    else {
        console.log("Cidade atual: " + origem)
        console.log("Cidade destino: " + destino)
        console.log("Caminho: " + resultado)
    }
} 

function buscaEmProfundidade(grafo, origem, destino){
    var fila = [origem] //Define a fila de busca
    var visitados = [origem] //Define os nós visitados
    var parentes = {} //Define o caminho a percorrer quando encontrar o destino

    //Enquanto a fila não estiver vazia
    while (fila.length > 0) {
        console.log(fila)
        //pega o ultimo elemento da fila
        var no = fila.shift(0)
        var vizinhos = grafo[no].reverse()

        //verifica se o nó é o destino
        if (no == destino) {
            var caminho = [destino]
            //faz o caminho inverso
            while (destino != origem){
                caminho.push(parentes[destino])
                destino = parentes[destino]
            }
            return caminho.reverse()
        }

        //Para cada vizinho do nó atual
        for (vizinho in grafo[no]){
            //verifica se o nó vizinho está nos nós visitados
            if (!visitados.includes(grafo[no][vizinho])) {
                //Adiciona o nó como visitado
                visitados.push(grafo[no][vizinho])

                //Adiciona na fila
                fila.unshift(grafo[no][vizinho])

                //Adiciona o pai do vizinho sendo o nó
                parentes[grafo[no][vizinho]] = no
            } 
        }  
    }
    return false
}

main()