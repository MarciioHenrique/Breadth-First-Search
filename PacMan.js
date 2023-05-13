function main() {
    //linha.coluna
    var grafo = {
        1.01: [1.02, 2.01],
        1.02: [1.01, 1.03],
        1.03: [1.02, 1.04],
        1.04: [1.03, 2.04],
        1.06: [1.07, 2.06],
        1.07: [1.06, 1.08],
        1.08: [1.07, 1.09],
        1.09: [1.08, 1.10],
        1.10: [1.09, 1.11],
        1.11: [1.10, 1.12],
        1.12: [1.11, 1.13],
        1.13: [1.12, 2.13],
        1.15: [1.16, 2.15],
        1.16: [1.15, 1.17],
        1.17: [1.16, 1.18],
        1.18: [1.17, 2.18],
        2.01: [1.01, 3.01],
        2.04: [1.04, 3.04],
        2.06: [1.06, 3.06],
        2.13: [1.13, 3.13],
        2.15: [1.15, 3.15],
        2.18: [1.18, 3.18],
        3.01: [2.01, 4.01],
        3.03: [3.04, 4.03],
        3.04: [3.03, 2.04, 3.05],
        3.05: [3.04, 3.06],
        3.06: [3.05, 2.06, 3.07, 4.06],
        3.07: [3.06, 3.08],
        3.08: [3.07, 3.09],
        3.09: [3.08, 3.10],
        3.10: [3.09, 3.11],
        3.11: [3.10, 3.12],
        3.12: [3.11, 3.13],
        3.13: [3.12, 2.13, 3.14, 4.13],
        3.14: [3.13, 3.15],
        3.15: [3.14, 2.15, 3.16],
        3.16: [3.15, 4.16],
        3.18: [2.18, 4.18],
        4.01: [3.01, 5.01],
        4.03: [3.03, 5.03],
        4.06: [3.06, 5.06],
        4.13: [3.13, 5.13],
        4.16: [3.16, 5.16],
        4.18: [3.18, 5.18],
        5.01: [4.01, 5.02, 6.01],
        5.02: [5.01, 5.03],
        5.03: [5.02, 4.03, 5.04, 6.03],
        5.04: [5.03, 5.05],
        5.05: [5.04, 5.06],
        5.06: [5.05, 4.06, 6.06],
        5.13: [4.13, 5.14, 6.13],
        5.14: [5.13, 5.15],
        5.15: [5.14, 5.16],
        6.16: [5.15, 4.16, 5.17, 6.16],
        5.17: [5.16, 5.18],
        5.18: [5.17, 4.18, 6.18],
        6.01: [5.01, 7.01],
        6.03: [5.03, 7.03],
        6.06: [5.06, 7.06],
        6.13: [5.13, 7.13],
        6.16: [5.16, 7.16],
        6.18: [5.18, 7.18],
        7.01: [6.01, 8.01],
        7.03: [6.04, 7.04],
        7.04: [7.03, 7.05, 8.04],
        7.05: [7.04, 7.06],
        7.06: [7.05, 6.06, 7.07, 8.06],
        7.07: [7.06, 7.08],
        7.08: [7.07, 7.09],
        7.09: [7.08, 7.10],
        7.10: [7.09, 7.11],
        7.11: [7.10, 7.12],
        7.12: [7.11, 7.13],
        7.13: [7.12, 6.13, 7.14, 8.13],
        7.14: [7.13, 7.15],
        7.15: [7.14, 7.16, 8.15],
        7.16: [7.15, 6.16],
        7.18: [6.18, 8.18],
        8.01: [7.01, 9.01],
        8.04: [7.04, 9.04],
        8.06: [7.06, 9.06],
        8.13: [7.13, 9.13],
        8.15: [7.15, 9.15],
        8.18: [7.18, 9.18],
        9.01: [8.01, 9.02],
        9.02: [9.01, 9.03],
        9.03: [9.02, 9.04],
        9.04: [9.03, 8.04],
        9.06: [8.06, 9.07],
        9.07: [9.06, 9.08],
        9.08: [9.07, 9.09],
        9.09: [9.08, 9.10],
        9.10: [9.09, 9.11],
        9.11: [9.10, 9.12],
        9.12: [9.11, 9.13],
        9.13: [9.12, 8.13],
        9.15: [8.15, 9.16],
        9.16: [9.15, 9.17],
        9.17: [9.16, 9.18],
        9.18: [9.17, 8.18],
    }

    const origem = 7.11
    const destino = 1.01

    if (origem == destino) {
        console.log("Você já está no ponto de destino")
        return 
    }

    const resultado = buscaEmExtensão(grafo, origem, destino)

    if (resultado == false) {
        console.log("Caminho não encontrado")
    }
    else {
        console.log("Ponto atual: " + origem)
        console.log("Ponto destino: " + destino)
        console.log("Caminho: " + resultado)
    }
}

function buscaEmExtensão(grafo, origem, destino){
    var fila = [origem] //Define a fila de busca
    var visitados = [origem] //Define os nós visitados
    var parentes = {} //Define o caminho a percorrer quando encontrar o destino

    //Enquanto a fila não estiver vazia
    while (fila.length > 0) {
        //console.log(fila)
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

        //Para cada vizinho do nó atual
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
