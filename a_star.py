import math
from copy import deepcopy
import heapq

def Astar(board, me, goal, open=[], visited=set()):
    heapq.heappush(open, Node(deepcopy(board), 0, me, goal))
    while len(open) != 0:
        current = heapq.heappop(open)

        if current.isGoal():
            print 'Goal is reached!\n', current
            return

        neighbours = current.generateNeighbours(visited)
        for n in neighbours:
            n.parent = current
            heapq.heappush(open, n)
            visited.add(n.state)

        visited.add(current.state)
    print 'No solution found'

class Node(object):
    def __init__(self, board, depth, me, goal, traces=[]):
        self.board = board
        self.depth = depth
        self.me = me
        self.goal = goal
        self.parent = None
        self.state = '{0}#{1}'.format(me[0], me[1])
        self.traces = traces + [me]
        self.score = self.heurestic()

    def __str__(self):
        printBoard(self.board, self.traces)
        return 'Score: {0}, Depth: {1}, sum: {2}\n'.format(self.score, self.depth, (self.score+self.depth))

    def __cmp__(self, other):
        return (self.depth + self.score) - (other.depth + other.score)

    def generateNeighbours(self, visited):
        neighbours = []
        for i in [-1, 1]:

            if not '{0}#{1}'.format(self.me[0]+i, self.me[1]) in visited:
                if self.board[self.me[0]+i][self.me[1]] == ' ' or self.board[self.me[0]+i][self.me[1]] == 'x':
                    neighbour = Node(self.board, self.depth+1, (self.me[0]+i, self.me[1]), self.goal, self.traces)
                    neighbours.append(neighbour)

            if not '{0}#{1}'.format(self.me[0], self.me[1]+i) in visited:
                if self.board[self.me[0]][self.me[1]+i] == ' ' or self.board[self.me[0]][self.me[1]+i] == 'x':
                    neighbour = Node(self.board, self.depth+1, (self.me[0], self.me[1]+i), self.goal, self.traces)
                    neighbours.append(neighbour)

        return neighbours

    def isGoal(self):
        return self.score == 0

    def heurestic(self):
        return math.sqrt(pow(self.me[0] - self.goal[0], 2) + pow(self.me[1] - self.goal[1], 2))

def printBoard(board, traces):
    for i in range(len(board)):
        col = ''
        for j in range(len(board[i])):
            if (i, j) in traces:
                col += '\033[91m'+'@'+'\033[0m'
            else:
                col += board[i][j]
        print col

def main():
    file = open('data/big_complex_maze.txt', 'r')
    board = []
    me = ()
    goal = ()

    line = file.readline()
    while line != '':
        board.append(filter(lambda x: x != '\n', map(lambda x: x, line)))
        line = file.readline()

    for i in range(len(board)):
        for j in range(len(board[i])):
            if board[i][j] == 'o':
                me = (i, j)

            if board[i][j] == 'x':
                goal = (i, j)

    Astar(board, me, goal)

if __name__ == '__main__':
    main()
