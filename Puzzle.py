import timeit
from collections import deque

class PuzzleState:
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

def bfs(estadoInicial, EstadoFinal, NoFinal, NoExpandido):
    NosVisitados= set()
    fila = deque([PuzzleState(estadoInicial, None, None, 0, 0)])

    while fila:
        node = fila.popleft()
        NosVisitados.add(node.map)
        if node.state == EstadoFinal:
            NoFinal = node
            return NoFinal, NoExpandido
        caminhosPossiveis, NoExpandido = subNodes(node, NoExpandido)

        for caminho in caminhosPossiveis:
            if caminho.map not in NosVisitados:
                fila.append(caminho)
                NosVisitados.add(caminho.map)
            
def dfs(estadoInicial, EstadoFinal, NoFinal, NoExpandido):
    NosVisitados = set()
    pilha = list([PuzzleState(estadoInicial, None, None, 0, 0)])
    while pilha:
        node = pilha.pop()
        NosVisitados.add(node.map)
        if node.state == EstadoFinal:
            NoFinal = node
            return NoFinal, NoExpandido
        #inverte a ordem dos filhos
        caminhosPossiveis, NoExpandido = subNodes(node, NoExpandido)
        caminhosPossiveisInvertido = list(reversed(caminhosPossiveis))
        for caminho in caminhosPossiveisInvertido:
            if caminho.map not in NosVisitados:
                pilha.append(caminho)
                NosVisitados.add(caminho.map)

def subNodes(node, NoExpandido):
    NoExpandido = NoExpandido + 1

    filhos = []
    filhos.append(PuzzleState(verificaMovimento(node.state, 1), node, 1, node.depth + 1, node.cost + 1))
    filhos.append(PuzzleState(verificaMovimento(node.state, 2), node, 2, node.depth + 1, node.cost + 1))
    filhos.append(PuzzleState(verificaMovimento(node.state, 3), node, 3, node.depth + 1, node.cost + 1))
    filhos.append(PuzzleState(verificaMovimento(node.state, 4), node, 4, node.depth + 1, node.cost + 1))
    nodes=[]
    for filho in filhos:
        if(filho.state!=None):
            nodes.append(filho)
    return nodes, NoExpandido

def verificaMovimento(estado, direcao):
    novoEstado = estado[:]
    
    #encontra o index do 0
    index = novoEstado.index(0)
    
    #Direção 1 = Cima, 2 = Baixo, 3 = Esquerda, 4 = Direita
    if(index == 0):
        if(direcao == 1):
            return None
        if(direcao == 2):
            aux = novoEstado[0]
            novoEstado[0] = novoEstado[3]
            novoEstado[3] = aux 
        if(direcao == 3):
            return None
        if(direcao == 4):
            aux = novoEstado[0]
            novoEstado[0] = novoEstado[1]
            novoEstado[1] = aux 
        return novoEstado      
    if(index == 1):
        if(direcao == 1):
            return None
        if(direcao == 2):
            aux = novoEstado[1]
            novoEstado[1] = novoEstado[4]
            novoEstado[4] = aux 
        if(direcao == 3):
            aux = novoEstado[1]
            novoEstado[1] = novoEstado[0]
            novoEstado[0] = aux 
        if(direcao == 4):
            aux = novoEstado[1]
            novoEstado[1] = novoEstado[2]
            novoEstado[2] = aux 
        return novoEstado    
    if(index == 2):
        if(direcao == 1):
            return None
        if(direcao == 2):
            aux = novoEstado[2]
            novoEstado[2] = novoEstado[5]
            novoEstado[5] = aux 
        if(direcao == 3):
            aux = novoEstado[2]
            novoEstado[2] = novoEstado[1]
            novoEstado[1] = aux 
        if(direcao == 4):
            return None
        return novoEstado
    if(index == 3):
        if(direcao == 1):
            aux = novoEstado[3]
            novoEstado[3] = novoEstado[0]
            novoEstado[0] = aux 
        if(direcao == 2):
            aux = novoEstado[3]
            novoEstado[3] = novoEstado[6]
            novoEstado[6] = aux 
        if(direcao == 3):
            return None
        if(direcao == 4):
            aux = novoEstado[3]
            novoEstado[3] = novoEstado[4]
            novoEstado[4] = aux 
        return novoEstado
    if(index == 4):
        if(direcao == 1):
            aux = novoEstado[4]
            novoEstado[4] = novoEstado[1]
            novoEstado[1] = aux 
        if(direcao == 2):
            aux = novoEstado[4]
            novoEstado[4] = novoEstado[7]
            novoEstado[7] = aux 
        if(direcao == 3):
            aux = novoEstado[4]
            novoEstado[4] = novoEstado[3]
            novoEstado[3] = aux 
        if(direcao == 4):
            aux = novoEstado[4]
            novoEstado[4] = novoEstado[5]
            novoEstado[5] = aux 
        return novoEstado
    if(index == 5):
        if(direcao == 1):
            aux = novoEstado[5]
            novoEstado[5] = novoEstado[2]
            novoEstado[2] = aux 
        if(direcao == 2):
            aux = novoEstado[5]
            novoEstado[5] = novoEstado[8]
            novoEstado[8] = aux 
        if(direcao == 3):
            aux = novoEstado[5]
            novoEstado[5] = novoEstado[4]
            novoEstado[4] = aux 
        if(direcao == 4):
            return None
        return novoEstado
    if(index == 6):
        if(direcao == 1):
            aux = novoEstado[6]
            novoEstado[6] = novoEstado[3]
            novoEstado[3] = aux 
        if(direcao == 2):
            return None
        if(direcao == 3):
            return None
        if(direcao == 4):
            aux = novoEstado[6]
            novoEstado[6] = novoEstado[7]
            novoEstado[7] = aux 
        return novoEstado
    if(index == 7):
        if(direcao == 1):
            aux = novoEstado[7]
            novoEstado[7] = novoEstado[4]
            novoEstado[4] = aux 
        if(direcao == 2):
            return None
        if(direcao == 3):
            aux = novoEstado[7]
            novoEstado[7] = novoEstado[6]
            novoEstado[6] = aux 
        if(direcao == 4):
            aux = novoEstado[7]
            novoEstado[7] =novoEstado[8]
            novoEstado[8] = aux 
        return novoEstado
    if(index == 8):
        if(direcao == 1):
            aux = novoEstado[8]
            novoEstado[8] = novoEstado[5]
            novoEstado[5] = aux 
        if(direcao == 2):
            return None
        if(direcao == 3):
            aux =novoEstado[8]
            novoEstado[8] = novoEstado[7]
            novoEstado[7] = aux 
        if(direcao == 4):
            return None
        return novoEstado

def main(data, metodo):
    EstadoInicial = data
    EstadoFinal = [1, 2, 3, 4, 5, 6, 7, 8, 0]
    NoFinal = None 
    NoExpandido = 0 

    #Tempo de execução
    start = timeit.default_timer()

    if(metodo == 'bfs'):
        NoFinal, NoExpandido = bfs(EstadoInicial, EstadoFinal, NoFinal, NoExpandido)
    if(metodo == 'dfs'):
        NoFinal, NoExpandido = dfs(EstadoInicial, EstadoFinal, NoFinal, NoExpandido)

    stop = timeit.default_timer()
    time = stop-start

    moves = []
    while EstadoInicial != NoFinal.state:
        if NoFinal.move == 1:
            path = 'Cima'
        if NoFinal.move == 2:
            path = 'Baixo'
        if NoFinal.move == 3:
            path = 'Esquerda'
        if NoFinal.move == 4:
            path = 'Direita'
        moves.insert(0, path)
        NoFinal = NoFinal.parent

    
    #Resultados
    print("\ncaminho: ", moves)
    print("custo: ",len(moves))
    print("nós expandidos: ",str(NoExpandido))
    print("Tempo(s): ",format(time, '.4f'))
   
data = [4,0,5,8,7,3,2,1,6]
metodos = ['bfs', 'dfs']
for metodo in metodos:
    print("\n\nExecutando ", metodo)
    main(data, metodo)