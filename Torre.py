import timeit
from collections import deque

class Torre:
    def __init__(self, state, parent, move, depth, cost):
        self.state = state
        self.parent = parent
        self.move = move
        self.depth = depth
        self.cost = cost

        if self.state:
            self.map = ''.join(str(e) for e in self.state)

    def __eq__(self, other):
        return self.map == other.map

    def __lt__(self, other):
        return self.map < other.map

    def __str__(self):
        return str(self.map)

# Pega os filhos do nó
def subNodes(node, NoExpandido):
    NoExpandido = NoExpandido + 1

    filhos = []
    filhos.append(Torre(verificaMovimento(node.state, 0, 1), node, 1, node.depth + 1, node.cost + 1))
    filhos.append(Torre(verificaMovimento(node.state, 0, 2), node, 2, node.depth + 1, node.cost + 1))
    filhos.append(Torre(verificaMovimento(node.state, 1, 0), node, 3, node.depth + 1, node.cost + 1))
    filhos.append(Torre(verificaMovimento(node.state, 1, 2), node, 4, node.depth + 1, node.cost + 1))
    filhos.append(Torre(verificaMovimento(node.state, 2, 0), node, 5, node.depth + 1, node.cost + 1))
    filhos.append(Torre(verificaMovimento(node.state, 2, 1), node, 6, node.depth + 1, node.cost + 1))

    nodes = []
    for filho in filhos:
        if filho.state:
            nodes.append(filho)
    return nodes, NoExpandido

# A função verifica se o movimento é valido
def verificaMovimento(estado, origem, destino):
    copiaEstado = [peg[:] for peg in estado]

    def get_topo(torre):
        return torre[-1] if torre else 99

    # Pega o topo de cada torre
    topoTorre0 = get_topo(copiaEstado[0])
    topoTorre1 = get_topo(copiaEstado[1])
    topoTorre2 = get_topo(copiaEstado[2])

    # Realiza a verificação com base nas regras
    if origem == 0:
        if destino == 1 and topoTorre1 > topoTorre0:
            copiaEstado[1].append(topoTorre0)
            copiaEstado[0].pop()
        if destino == 2 and topoTorre2 > topoTorre0:
            copiaEstado[2].append(topoTorre0)
            copiaEstado[0].pop()
        return copiaEstado
    if origem == 1:
        if destino == 0 and topoTorre0 > topoTorre1:
            copiaEstado[0].append(topoTorre1)
            copiaEstado[1].pop()
        if destino == 2 and topoTorre2 > topoTorre1:
            copiaEstado[2].append(topoTorre1)
            copiaEstado[1].pop()
        return copiaEstado
    if origem == 2:
        if destino == 0 and topoTorre0 > topoTorre2:
            copiaEstado[0].append(topoTorre2)
            copiaEstado[2].pop()
        if destino == 1 and topoTorre1 > topoTorre2:
            copiaEstado[1].append(topoTorre2)
            copiaEstado[2].pop()
        return copiaEstado
    return None


def bfs(estadoInicial, EstadoFinal, NoFinal, profundidade, NoExpandido):
    NosVisitados = set()
    fila = deque([Torre(estadoInicial, None, None, 0, 0)])

    while fila:
        node = fila.popleft()
        NosVisitados.add(node.map)
        if node.state == EstadoFinal:
            NoFinal = node
            break  
        caminhosPossiveis, NoExpandido = subNodes(node, NoExpandido)

        for caminho in caminhosPossiveis:
            if caminho.map not in NosVisitados:
                fila.append(caminho)
                NosVisitados.add(caminho.map)
                if caminho.depth > profundidade:
                    profundidade = caminho.depth

    return NoFinal, profundidade, NoExpandido

def dfs(estadoInicial, EstadoFinal, NoFinal, profundidade, NoExpandido):
    NosVisitados = set()
    pilha = list([Torre(estadoInicial, None, None, 0, 0)])
    while pilha:
        node = pilha.pop()
        NosVisitados.add(node.map)
        if node.state == EstadoFinal:
            NoFinal = node
            return NoFinal, profundidade, NoExpandido
        #inverte a ordem dos filhos
        caminhosPossiveis, NoExpandido = subNodes(node, NoExpandido)
        caminhosPossiveisInvertido = list(reversed(caminhosPossiveis))
        for caminho in caminhosPossiveisInvertido:
            if caminho.map not in NosVisitados:
                pilha.append(caminho)
                NosVisitados.add(caminho.map)
                if caminho.depth > profundidade:
                    profundidade = 1 + profundidade


def main(metodo):
    EstadoInicial = [[5,4, 3, 2, 1], [], []]
    EstadoFinal = [[], [], [5,4, 3, 2, 1]]
    NoFinal = None
    NoExpandido = 0
    profundidade = 0

    #Tempo de execução
    start = timeit.default_timer()

    if(metodo=='bfs'):
        NoFinal, profundidade, NoExpandido = bfs(EstadoInicial, EstadoFinal, NoFinal, profundidade, NoExpandido)
    if(metodo=='dfs'):
        NoFinal, profundidade, NoExpandido = dfs(EstadoInicial, EstadoFinal, NoFinal, profundidade, NoExpandido)
    
    stop = timeit.default_timer()
    time = stop-start

    moves = []
    while NoFinal:
        if(NoFinal.move == 1):
            moves.insert(0, "Moveu da torre 1 -> 2")
        if(NoFinal.move == 2):
            moves.insert(0, "Moveu da torre 1 -> 3")
        if(NoFinal.move == 3):
            moves.insert(0, "Moveu da torre 2 -> 1")
        if(NoFinal.move == 4):
            moves.insert(0, "Moveu da torre 2 -> 3")
        if(NoFinal.move == 5):
            moves.insert(0, "Moveu da torre 3 -> 1")
        if(NoFinal.move == 6):
            moves.insert(0, "Moveu da torre 3 -> 2")

        NoFinal = NoFinal.parent

    # Resultados
    # for i in moves:
    #     print(i)

    print("Custo: ", len(moves))
    print("Nós expandidos: ", NoExpandido)
    print("Profundidade: ", profundidade)
    print("Tempo de execução: ", format(time, '.4f'))


metodos = ['bfs', 'dfs']
for metodo in metodos:
    print("\n\nExecutando ", metodo)
    main(metodo)
