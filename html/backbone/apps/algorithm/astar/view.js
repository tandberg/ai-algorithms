/* global App */
App.module('Algorithm.Astar', function(Astar, App, Backbone, Marionette, $, _) {
    'use strict';

    Astar.PlotView = Marionette.ItemView.extend({
        template: JST['backbone/apps/algorithm/astar/templates/plot.jst'],
        className: 'astar',

        initialize: function(options) {
            this.maze = options.maze || {};
        },

        serializeData: function() {
            var board = this.maze.board || [];
            var visited = this.visited || {};

            return {
                board: board,
                winner: this.winner,
                visited: visited,
                goal: this.maze.goal,
                path: this.path
            };
        },

        update: function(visited, instance) {
            if (visited) {
                this.visited = visited;
            } else if(instance && !visited) {
                var node = instance.node;
                var path = {};
                
                while ((node = node.parent) !== undefined) {
                    path[node.x+'#'+node.y] = true;
                }

                this.path = path;
            }
            

            this.render();
        }
    });
    
    Astar.InputView = Marionette.ItemView.extend({
        template: JST['backbone/apps/algorithm/astar/templates/input.jst'],

        triggers: {
            'click button': 'start:algorithm'
        }
    });

    Astar.OutputView = Marionette.ItemView.extend({
        template: JST['backbone/apps/algorithm/astar/templates/output.jst']
    });

    Astar.Layout = Marionette.Layout.extend({
        template: JST['backbone/apps/algorithm/astar/templates/layout.jst'],

        regions: {
            plotRegion: '#plot',
            inputRegion: '#input',
            outputRegion: '#output'
        }
    });
});