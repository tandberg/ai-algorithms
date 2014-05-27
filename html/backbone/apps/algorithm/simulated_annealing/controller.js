/* global App */
App.module('Algorithm.SimulatedAnnlealing', function(SimulatedAnnlealing, App, Backbone, Marionette, $, _) {
    'use strict';

    SimulatedAnnlealing.Controller = App.Controller.Base.extend({
        name: 'Simulated_annlealing',
        
        initialize: function(options) {
            var layout = this.getLayout();
            var input = new SimulatedAnnlealing.InputView();
            var output = new SimulatedAnnlealing.OutputView();
            var plot = new SimulatedAnnlealing.PlotView({f: function(x, y) { return -Math.pow(x, 4) + 5*Math.pow(x, 3) + 60*Math.pow(x, 2) + 100;}});


            layout.on('show', function() {
                layout.inputRegion.show(input);
                layout.outputRegion.show(output);
                layout.plotRegion.show(plot);
            });

            input.on('start:algorithm', function() {
                SimulatedAnnlealing.Algorithm(undefined, {x:0, y:0});
            });

            SimulatedAnnlealing.on('update', function(instance, variables) {
                output.setMsg(JSON.stringify(variables));

                setTimeout(function() {
                    plot.showArrow(instance.x);
                }, 100);
            });

            SimulatedAnnlealing.on('finished', function(instance) {
                output.append('Finished: '+JSON.stringify(instance));
            });

            this.show(layout);
        },

        getLayout: function() {
            return new SimulatedAnnlealing.Layout();
        }
    });

    SimulatedAnnlealing.Algorithm = function(search_space, initial_instance) {
        search_space = search_space || function(x, y) { return -Math.pow(x, 4) + 5*Math.pow(x, 3) + 60*Math.pow(x, 2) + 100; } || function(x, y) { return x*y*Math.exp(-Math.pow(x, 2) - Math.pow(y, 2));};
        var T = 1000;
        var dt = 0.95;
        var max_iterations = 1000;
        var newNeighbours = 500;
        var iterations = 0;

        var instance = initial_instance;

        var heurestic = function(instance) {
            return search_space(instance.x, instance.y);
        };

        var generateSuccessorStates = function(instance) {
            var neighbors = [];
            for (var i = 0; i < newNeighbours; i++) {
                neighbors.push({x: instance.x + (-Math.random() + 0.5), y: instance.y + Math.random()});
            }
            return neighbors;
        };

        var handleNeighbor = function(neighbor) {
            var neighbourHeurestic = heurestic(neighbor);

            if (neighbourHeurestic > bestNeighborHeurestic) {
                bestNeighbor = neighbor;
                bestNeighborHeurestic = neighbourHeurestic;
            }
        };

        while(T.toPrecision(2) > 0.01) { // iterations < max_iterations || 

            var evaluation = heurestic(instance);
            var neighbors = generateSuccessorStates(instance);

            var bestNeighbor = neighbors[0];
            var bestNeighborHeurestic = -Infinity;

            neighbors.push(instance);

            
            neighbors.forEach(handleNeighbor);

            var q = (bestNeighborHeurestic - evaluation) / evaluation;
            var p = Math.min(1, Math.exp(-q/T));

            if (p < Math.random()) {
                instance = {x: bestNeighbor.x, y: bestNeighbor.y};
            } else {
                _.shuffle(neighbors);
                instance = {x: neighbors[0].x, y: neighbors[0].y};
                evaluation = heurestic(instance);
            }

            T *= dt;
            iterations++;

            SimulatedAnnlealing.trigger('update', instance, {T: T.toPrecision(2), iterations: iterations});
        }
        SimulatedAnnlealing.trigger('finished', instance);
        return {i: instance, heurestic: heurestic(instance)};
    };
});