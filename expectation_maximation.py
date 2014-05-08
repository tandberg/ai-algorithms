from random import random
from copy import copy
import math
import sys


class ExpectationMaximation(object):
	def __init__(self, data, hyps=1):
		self.MAX_ITERATIONS = 1000
		self.em(data, hyps)

	def em(self, instances, count): # TODO: Prettify python code

		hyps = [random()] * count
		hypsOld = [-1] * count

		def condition(hyps, oldHyps, accumulator):
			if len(hyps) == 0:
				return accumulator
			return condition(hyps[1:], oldHyps[1:], accumulator and hyps[0] != oldHyps[0])

		iterations = 0
		while condition(hyps, hypsOld, True) or iterations > self.MAX_ITERATIONS:
			iterations += 1
			hypsOld = copy(hyps)

			for i in range(count):
				sum1 = 0
				sum2 = 0

				for instance in instances:
					sum1 += self.expectation(instance.x, hyps[i], hyps) * instance.x
					sum2 += self.expectation(instance.x, hyps[i], hyps)

				hyps[i] = sum1 / sum2

		print '\nConverged at {0} iterations.\nResult: {1}'.format(iterations, hyps)

	def expectation(self, data, mu, hyps):
		denominator = sum(map(lambda x: self.probability(data, x), hyps))
		return self.probability(data, mu) / denominator

	def probability(self, x, m):
		return math.exp(-0.5 * math.pow(x-m, 2))


class Instance(object):
	def __init__(self, x):
		self.x = x
	def __repr__(self):
		return 'Instance-{0}'.format(self.x)

def main():
	file = open('data/em_sample_data.txt', 'r')
	line = file.readline()
	data = []

	while(line != ''):
		data.append(Instance(float(line)))
		line = file.readline()

	if len(sys.argv) > 1:
		ExpectationMaximation(data, int(sys.argv[1]))
	else:
		ExpectationMaximation(data)

if __name__ == '__main__':
	main()
