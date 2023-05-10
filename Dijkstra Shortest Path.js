function main(){
    var grafo = {
        "Oradea": {"Zerind": 71, "Sibiu": 151},
        "Zerind": {"Oradea": 71, "Arad": 75},
        "Arad": {"Zerind": 75, "Sibiu": 140, "Timisoara": 118},
        "Timisoara": {"Arad": 118, "Lugoj": 111},
        "Lugoj": {"Timisoara": 111, "Mehadia": 70},
        "Mehadia": {"Lugoj": 70, "Dobreta": 75},
        "Dobreta": {"Mehadia": 75, "Craiova": 120},
        "Craiova": {"Dobreta": 120, "Rimnicu Vilcea": 146, "Pitesti": 138},
        "Sibiu": {"Oradea": 151, "Arad": 140, "Fagaras": 99, "Rimnicu Vilcea": 80},
        "Rimnicu Vilcea": {"Sibiu": 80, "Craiova": 146, "Pitesti": 97},
        "Fagaras": {"Sibiu": 99, "Bucharest": 211},
        "Pitesti": {"Rimnicu Vilcea": 97, "Craiova": 138, "Bucharest": 101},
        "Bucharest": {"Fagaras": 211, "Pitesti": 101, "Giurgiu": 90, "Urziceni": 85},
        "Giurgiu": {"Bucharest": 90},
        "Urziceni": {"Bucharest": 85, "Hirsova": 98, "Vaslui": 142},
        "Hirsova": {"Urziceni": 98, "Eforie": 86},
        "Eforie": {"Hirsova": 86},
        "Vaslui": {"Urziceni": 142, "Iasi": 92},
        "Iasi": {"Vaslui": 92, "Neamt": 87},
        "Neamt": {"Iasi": 87}
    }  
    const [origem, destino] = process.argv.splice(2)

    if (origem == destino) {
        console.log("Você já está na cidade de destino")
        return 
    }

    const resultado = buscaDeCustoUniforme(grafo, origem, destino)

    if (resultado == false) {
        console.log("Caminho não encontrado")
    }
    else {
        console.log("Cidade atual: " + origem)
        console.log("Cidade destino: " + destino)
        console.log("Caminho: " + resultado[0])
        console.log("Valor: " + resultado[1])
    }
}

function buscaDeCustoUniforme(grafo, origem, destino){
    var custo = {[origem]: 0} //Define o custo para se chegar a alguma cidade
    var fila = [origem] //Define a fila de busca
    var visitados = [] //Define os nós visitados
    var caminho = {[origem]: origem} //Define o caminho a percorrer para se chegar a alguma cidade

    //Enquanto a fila não estiver vazia
    while (fila.length > 0) {

        //pega o primeiro elemento da fila
        var no = fila.shift(0)

        //verifica se o nó já foi visitado
        if (!visitados.includes(no)) {
            if (no == destino){
                //console.log(Object.keys(caminho))
                //console.log(Object.values(caminho))
                return [caminho[no], custo[no]]
            }
               
            //Marca o nó atual como visitado
            visitados.push(no)

            //Verifica todos os vizinhos do nó atual
            for (vizinho in grafo[no]){
                //Verifica se o custo já existe ou se ele precisa ser atualizado por um menor
                if ( !(vizinho in custo) || (custo[vizinho] > custo[no] + grafo[no][vizinho])){
                    //Atualiza o custo
                    custo[vizinho] = custo[no] + grafo[no][vizinho]
                    //Atualiza o caminho
                    caminho[vizinho] = caminho[no] + " - " + [vizinho]
                    //Adiciona o vizinho na fila
                    fila.push(vizinho)
                }
                    
                //Ordena a fila pelo custo
                fila.sort((a, b) => custo[a] - custo[b]);
            }      
        }
    }
    return false
}

main()