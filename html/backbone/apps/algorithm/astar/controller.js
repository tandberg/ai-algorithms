/* global App, console */
App.module('Algorithm.Astar', function(Astar, App, Backbone, Marionette, $, _) {
    'use strict';

    Astar.Controller = App.Controller.Base.extend({
        name: 'Astar',
        
        initialize: function(options) {
            var maze = window.maze = App.request('maze');

            var layout = this.getLayout();
            var input = new Astar.InputView();
            var output = new Astar.OutputView();
            var plot = new Astar.PlotView({maze: maze});

            var queue = [];

            layout.on('show', function() {
                layout.inputRegion.show(input);
                layout.outputRegion.show(output);
                setTimeout(function() {
                    layout.plotRegion.show(plot);
                }, 50);
            });

            input.on('start:algorithm', function() {
                plot.path = undefined;
                Astar.Algorithm(maze.board, maze.me, maze.goal);
            });

            Astar.on('update', function(options) {
                var visited = $.extend(true, {}, options.visited);
                if(Math.random() > 0) {
                    queue.unshift(visited);
                } // piss
            });

            Astar.on('finished', function(instance) {
                var interval = setInterval(function() {
                    var visited = queue.pop();
                    if (!!visited) {
                        plot.update(visited);
                    } else {
                        plot.update(undefined, instance);
                        clearInterval(interval);
                    }
                }, 10);
                // plot.update(null, instance);

            });

            this.show(layout);
        },

        getLayout: function() {
            return new Astar.Layout();
        }
    });

    Astar.Algorithm = function(board, me, goal) {

        var isGoal = function(node) {
            return node.x === goal.x && node.y === goal.y;
        };

        var generateNeighbors = function(node, visited) {
            var neighbors = [];
            [-1, 1].forEach(function(i) {
                if (!visited[(node.x+i) + '#' +(node.y)]) {
                    if (board[node.x+i][node.y] === ' ' || board[node.x+i][node.y] === 'x') {
                        neighbors.push({x: node.x+i, y: node.y, h: (function() {
                            return Math.sqrt(Math.pow(node.x+i - goal.x, 2) + Math.pow(node.y - goal.y, 2));
                        })()});
                    }
                }

                if (!visited[(node.x) + '#' +(node.y+i)]) {
                    if (board[node.x][node.y+i] === ' ' || board[node.x][node.y+i] === 'x') {
                        neighbors.push({x: node.x, y: node.y+i, h: (function() {
                            return Math.sqrt(Math.pow(node.x - goal.x, 2) + Math.pow(node.y+i - goal.y, 2));
                        })()});
                        neighbors.traces = node.traces;
                    }
                }
            });
            return neighbors;
        };

        var handleNeighbor = function(neighbor) {
            neighbor.parent = current;
            open.push(neighbor);
            visited[neighbor.x+'#'+neighbor.y] = true;
        };

        var compare = function(a, b) {
            return b.h - a.h;
        };

        var open = [];
        var visited = {};

        open.push({x: me.x, y: me.y, parent: undefined, h: (function() {
            return Math.sqrt(Math.pow(me.x - goal.x, 2) + Math.pow(me.y - goal.y, 2));
        })()});

        var iterations = 0;
        while(open.length !== 0) {
            console.log('running...');

            // sort open
            open.sort(compare);

            var current = open.pop();

            if (isGoal(current)) {

                console.log('iterations', iterations);
                Astar.trigger('finished', {node: current});
                return {reached: true, node: current};
            }

            var neighbors = generateNeighbors(current, visited);
            neighbors.forEach(handleNeighbor);

            visited[current.x+'#'+current.y] = true;
            Astar.trigger('update', {visited: visited});
            iterations++;
        }

        console.log('iterations: ', iterations);
        Astar.trigger('finished');


        return {reached: false};
    };
});