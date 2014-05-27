/* global App */
App.module('Algorithm', function(Algorithm, App, Backbone, Marionette, $, _) {
    'use strict';

    Algorithm.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'list',
            '(/)': 'list'
        }
    });

    var API = {
        list: function() {
            var controller = new Algorithm.Controller();
        }
    };

    Algorithm.addInitializer(function() {
        var overview = new Algorithm.Router({
            controller: API
        });
    });
});