import math
from copy import deepcopy

class Astar(object):
    def __init__(self, board, me, goal):
        self.board = board
        self.algorithm(self.board, me, goal)

    def algorithm(self, board, me, goal, open=[], visited=set()):
        open.append(Node(deepcopy(board), 0, me, goal))

        iterations = 0
        while len(open) != 0:

            open = sorted(open, key=lambda node: (node.depth + node.score))
            open.reverse()
            current = open.pop()

            if current.isGoal():
                print 'Goal is reached!\n', current
                break

            neighbours = current.generateNeighbours(visited)
            for n in neighbours:
                if not (n.state in visited):
                    n.parent = current
                    open.append(n)
                    visited.add(n.state)

            visited.add(current.state)
            iterations += 1
        
class Node(object):
    def __init__(self, board, depth, me, goal):
        self.board = board
        self.depth = depth
        self.me = me
        self.goal = goal
        self.parent = None
        self.state = '{0}#{1}'.format(me[0], me[1])

        self.score = self.heurestic()

    def __str__(self):
        printBoard(self.board)
        return 'Score: {0}, Depth: {1}, Pos: {2}\n'.format(self.score, self.depth, self.me)

    def generateNeighbours(self, visited):

        neighbours = []
        for i in range(3):
            for j in range(3):
                if not '{0}#{1}'.format(self.me[0]-(i-1), self.me[1]-(j-1)) in visited:
                    try:
                        b = deepcopy(self.board)
                        b[self.me[0]][self.me[1]] = ' '
                        if b[self.me[0]-(i-1)][self.me[1]-(j-1)] == ' ':
                            b[self.me[0]-(i-1)][self.me[1]-(j-1)] = 'o'
                            neighbours.append(Node(b, self.depth+1, (self.me[0]-(i-1), self.me[1]-(j-1)), self.goal))
                        
                        if b[self.me[0]-(i-1)][self.me[1]-(j-1)] == 'x':
                            b[self.me[0]-(i-1)][self.me[1]-(j-1)] = 'O'

                            neighbours.append(Node(b, self.depth+1, (self.me[0]-(i-1), self.me[1]-(j-1)), self.goal))
                    except Exception:
                        continue

        return neighbours

    def isGoal(self):
        return self.score == 0

    def heurestic(self):
        return abs(self.me[0] - self.goal[0]) + abs(self.me[1] - self.goal[1])

def printBoard(board):
    for row in board:
        print ''.join(str(x) for x in row)

def main():
    file = open('data/big_maze.txt', 'r')
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
