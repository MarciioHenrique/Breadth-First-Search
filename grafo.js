function main(){
    var grafo = {
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
    var origem = "Oradea"
    var destino = "Rimnicu Vilcea"
    var resultado = buscaEmExtensão(grafo, origem, destino)

    if (resultado == false) {
        console.log("Caminho não encontrado!")
    }
    else {
        console.log(resultado)
    }
}

function buscaEmExtensão(grafo, origem, destino){
    //Define a fila de busca
    var fila = [origem]

    //Define os nós visitados
    var visitados = [origem]

    //Define o caminho a percorrer
    var parentes = {}

    //Enquanto a fila não estiver vazia
    while (fila.length > 0) {
        //pega o primeiro elemento da fila
        var no = fila.shift(0)

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

        //Para cada vizinho do nó
        for (vizinho in grafo[no]){
            //verifica se o nó vizinho está nos nós visitados
            if (!visitados.includes(grafo[no][vizinho])) {
                //Adiciona o nó como visitado
                visitados.push(grafo[no][vizinho])

                //Adiciona na fila
                fila.push(grafo[no][vizinho])

                //Adiciona o pai do vizinho sendo o nó
                parentes[grafo[no][vizinho]] = no
            } 
        }  
    }
    return false
}

main()