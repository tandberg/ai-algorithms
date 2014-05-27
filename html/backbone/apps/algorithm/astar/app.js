/* global App */
App.module('Algorithm.Astar', function(Astar, App, Backbone, Marionette, $, _) {
    'use strict';

    Astar.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '(/)astar': 'astar'
        }
    });

    var API = {
        astar: function(options) {
            var controller = new Astar.Controller(options);
        }
    };

    Astar.addInitializer(function() {
        var overview = new Astar.Router({
            controller: API
        });
    });
});