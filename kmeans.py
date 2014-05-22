import math
import sys
from random import randint, sample
import collections
import networkx as nx
import matplotlib.pyplot as plt
from copy import deepcopy

COLORPALETTE = {
    0: 'red',
    1: 'blue',
    2: 'green',
    3: 'yellow',
    4: 'purple',
    5: 'orange',
    6: 'pink',
    7: 'teal',
    8: 'darkgreen',
    9: 'greenyellow'
}

def draw_graph(graph, centroids, node_size=150, node_alpha=0.2):
    G = nx.Graph()
    cG = nx.Graph()
    graph_pos = {}
    node_color = []
    centroids_graph_pos = {}
    centroids_node_color = []

    for node in centroids:
        cG.add_edge(node['class'], node['class'])
        centroids_graph_pos[node['class']] = (node['x'], node['y'])
        centroids_node_color.append(COLORPALETTE[node['class']])

    for node in graph:
        G.add_edge(node['index'], node['index'])
        graph_pos[node['index']] = (node['x'], node['y'])
        node_color.append(COLORPALETTE[node['c']['class']])

    nx.draw_networkx_nodes(G, graph_pos, node_size=node_size, alpha=node_alpha, node_color=node_color) # wont plot the right plots...
    nx.draw_networkx_nodes(cG, centroids_graph_pos, node_size=2*node_size, alpha=min(10*node_alpha, 1), node_color=centroids_node_color) # wont plot the right plots...
    plt.show()

def kmeans(data, k):
    centroids = [{'x': randint(0, 800), 'y': randint(0, 800), 'class': c} for c in xrange(k)] # kmeans_initialization(data, k)
    oldarr = []
    arr = map(lambda x: x['c'], data)
    iterations = 0

    while collections.Counter(arr) != collections.Counter(oldarr):
        iterations += 1
        oldarr = arr

        for point in data:
            minima = float('inf')
            for centroid in centroids:
                val = euclid(point, centroid)
                if val < minima:
                    minima = val
                    point['c'] = centroid

        for centroid in centroids:
            buddies = filter(lambda x: x['c'] == centroid, data)
            sumx = 0
            sumy = 0
            for buddie in buddies:
                sumx += buddie['x']
                sumy += buddie['y']

            if(len(buddies) == 0):
                centroid['x'] = randint(0, 1000)
                centroid['y'] = randint(0, 1000)
            else:
                centroid['x'] = sumx / len(buddies)
                centroid['y'] = sumy / len(buddies)
        
        arr = map(lambda x: x['c']['class'], data)

    print 'Iterations {0}'.format(iterations)
    print centroids
    draw_graph(data, centroids)

def euclid(p1, c):
    return math.sqrt(pow(c['x'] - p1['x'], 2) + pow(c['y'] - p1['y'], 2)) 

def main():
    try:
        k = int(sys.argv[2])

        file = open('data/{0}'.format(sys.argv[1]))
        line = file.readline()
        data = []
        i = k
        while(line != ''):
            i += 1
            data.append({'x': int(line.split(',')[0]), 'y': int(line.split(',')[1]), 'index': i, 'c': None})
            line = file.readline()

        kmeans(data, k)
    except:
        print 'Usage:\npython kmeans.py "input_filename" k'

if __name__ == '__main__':
    main()