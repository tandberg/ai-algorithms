from random import random, uniform, shuffle
from math import sin, cos, exp

class SimulatedAnnealing(object):
	def __init__(self, search_space, initial_instance):
		self.instance = initial_instance
		self.sa(search_space)

	def sa(self, search_space): 

		T = 10000
		dt = 0.92
		max_iterations = 1000
		newNeighbours = 500
		iterations = 0

		testSet = []

		while(iterations < max_iterations):

			if iterations % 100 == 0:
				print iterations

			evaluation = self.instance.evaluate(search_space)
			neighbours = self.instance.generateSuccessorStates(newNeighbours)

			bestNeighbour = None
			bestNeighbourEvaluation = -float('inf')

			neighbours.append(self.instance)

			for neighbour in neighbours:
				neighbourEvaluation = neighbour.evaluate(search_space)

				if neighbourEvaluation > bestNeighbourEvaluation:
					bestNeighbour = neighbour
					bestNeighbourEvaluation = neighbourEvaluation
			
			try:
				q = (bestNeighbourEvaluation - evaluation) / evaluation
				p = min(1, exp(-q / T))
			except Exception:
				p = 1

			if p < random():
				self.instance = bestNeighbour
				evaluation = bestNeighbourEvaluation
			else:
				shuffle(neighbours)
				self.instance = neighbours[0]
				evaluation = self.instance.evaluate(search_space)


			T *= dt
			iterations += 1
			testSet.append(self.instance.x)
			
		print 'Final'
		print self.instance

class Instance(object):
	def __init__(self, x, y):
		self.x = x
		self.y = y
		self.maxStep = 0.5

	def generateSuccessorStates(self, count):
		neighbours = []
		for i in range(count):
			offsetX = uniform(-self.maxStep, self.maxStep)
			offsetY = uniform(-self.maxStep, self.maxStep)
			neighbours.append(Instance(self.x + offsetX, self.y + offsetY))

		return neighbours

	def evaluate(self, search_space):
		self.evaluation = round(search_space(self.x, self.y), 2)
		return round(search_space(self.x, self.y), 2)

	def __str__(self):
		return 'x: {0}, eval: {1}'.format(round(self.x, 2), self.evaluation)

	def __repr__(self):
		return 'x: {0}, eval: {1}'.format(self.x, self.evaluation)

def main():
	search_space = lambda x, y: x * y * exp(-x**2 -y**2) #-pow(x, 2) + 3*x
	SimulatedAnnealing(search_space, Instance(random(), random()))

if __name__ == '__main__':
	main()