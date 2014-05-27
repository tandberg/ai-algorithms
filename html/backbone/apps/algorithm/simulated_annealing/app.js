/* global App */
App.module('Algorithm.SimulatedAnnlealing', function(SimulatedAnnlealing, App, Backbone, Marionette, $, _) {
    'use strict';

    SimulatedAnnlealing.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '(/)simulated_annlealing': 'simulated_annlealing'
        }
    });

    var API = {
        simulated_annlealing: function(options) {
            var controller = new SimulatedAnnlealing.Controller(options);
        }
    };

    SimulatedAnnlealing.addInitializer(function() {
        var overview = new SimulatedAnnlealing.Router({
            controller: API
        });
    });
});