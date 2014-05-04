from random import random
from math import exp, pow

class ExpectationMaximation(object):
	def __init__(self, data):
		self.data = data
		self.em()

	def em(self): # TODO: pass inn number of hyps and do it generic
		hyp1 = random()
		hyp2 = random()

		instances = []

		for point in self.data:
			instances.append(point)

		hyp1old = -1
		hyp2old = -1

		while(hyp1 != hyp1old and hyp2 != hyp2old):
			hyp1old = hyp1
			hyp2old = hyp2

			sum1 = 0
			sum2 = 0

			for instance in instances:
				sum1 += self.expectation(instance.x, hyp1, hyp1, hyp2) * instance.x
				sum2 += self.expectation(instance.x, hyp1, hyp1, hyp2)

			hyp1 = sum1 / sum2

			sum1 = 0
			sum2 = 0

			for instance in instances:
				sum1 += self.expectation(instance.x, hyp2, hyp1, hyp2) * instance.x
				sum2 += self.expectation(instance.x, hyp2, hyp1, hyp2)

			hyp2 = sum1 / sum2

		print 'Done\nHyp1: {0}, Hyp2: {1}'.format(hyp1, hyp2)

	def expectation(self, data, mu, hyp1, hyp2):
		return self.probability(data, mu) / (self.probability(data, hyp1) + self.probability(data, hyp2))

	def probability(self, x, m):
		return exp(-0.5 * pow(x-m, 2))


class Instance(object):
	def __init__(self, x):
		self.x = x
	def __repr__(self):
		return 'instance-{0}'.format(self.x)

def main():
	file = open('data/em_sample_data.txt', 'r')
	line = file.readline()
	data = []

	while(line != ''):
		data.append(Instance(float(line)))
		line = file.readline()

	ExpectationMaximation(data)

if __name__ == '__main__':
	main()