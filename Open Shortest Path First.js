function main(){
    const grafo = {
        "192.168.0.1": {
            "192.168.0.2": 2,
            "192.168.0.3": 4,
            "192.168.0.4": 5
        },
        "192.168.0.2": {
            "192.168.0.1": 3,
            "192.168.0.5": 6,
            "192.168.0.6": 8,
            "192.168.0.7": 10
        },
        "192.168.0.3": {
            "192.168.0.1": 2,
            "192.168.0.8": 7,
            "192.168.0.9": 9
        },
        "192.168.0.4": {
            "192.168.0.1": 4,
            "192.168.0.10": 6
        },
        "192.168.0.5": {
            "192.168.0.2": 5,
            "192.168.0.11": 3,
            "192.168.0.12": 9,
            "192.168.0.13": 12
        },
        "192.168.0.6": {
            "192.168.0.2": 4,
            "192.168.0.14": 5,
            "192.168.0.15": 8
        },
        "192.168.0.7": {
            "192.168.0.2": 6,
            "192.168.0.16": 9,
            "192.168.0.17": 12,
            "192.168.0.18": 15
        },
        "192.168.0.8": {
            "192.168.0.3": 3,
            "192.168.0.19": 6,
            "192.168.0.20": 9
        },
        "192.168.0.9": {
            "192.168.0.3": 5,
            "192.168.0.21": 7,
            "192.168.0.22": 10,
            "192.168.0.23": 13
        },
        "192.168.0.10": {
            "192.168.0.4": 3,
            "192.168.0.24": 6,
            "192.168.0.25": 9
        },
        "192.168.0.11": {
            "192.168.0.5": 4,
            "192.168.0.26": 7,
            "192.168.0.27": 10
        },
        "192.168.0.12": {
            "192.168.0.5": 6,
            "192.168.0.28": 9,
            "192.168.0.29": 12
        },
        "192.168.0.13": {
            "192.168.0.5": 5,
            "192.168.0.30": 11,
            "192.168.0.17": 9
        },
        "192.168.0.14": {
            "192.168.0.6": 4,
            "192.168.0.15": 2,
            "192.168.0.18": 3
        },
        "192.168.0.15": {
            "192.168.0.6": 5,
            "192.168.0.14": 2,
            "192.168.0.17": 6,
        },
        "192.168.0.16": {
            "192.168.0.7": 6,
            "192.168.0.30": 11,
            "192.168.0.29": 2,
        },
        "192.168.0.17": {
            "192.168.0.7": 7,
            "192.168.0.15": 6,
            "192.168.0.13": 9,
        },
        "192.168.0.18": {
            "192.168.0.7": 8,
        },
        "192.168.0.19": {
            "192.168.0.8": 6,
        },
        "192.168.0.20": {
            "192.168.0.8": 5,
        },
        "192.168.0.21": {
            "192.168.0.9": 4,
        },
        "192.168.0.22": {
            "192.168.0.9": 3,
        },
        "192.168.0.23": {
            "192.168.0.9": 5,
        },
        "192.168.0.24": {
            "192.168.0.10": 4,
        },
        "192.168.0.25": {
            "192.168.0.10": 3,
        },
        "192.168.0.26": {
            "192.168.0.11": 5,
        },
        "192.168.0.27": {
            "192.168.0.11": 6,
        },
        "192.168.0.28": {
            "192.168.0.12": 5,
        },
        "192.168.0.29": {
            "192.168.0.12": 6,
        },
        "192.168.0.30": {
            "192.168.0.12": 7,
        }
    } 
    const [origem, destino] = process.argv.splice(2)

    if (origem == destino) {
        console.log("Você já está no IP de destino")
        return 
    }

    const resultado = buscaDeCustoUniforme(grafo, origem, destino)

    if (resultado == false) {
        console.log("Caminho não encontrado")
    }
    else {
        console.log("IP atual: " + origem)
        console.log("IP destino: " + destino)
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