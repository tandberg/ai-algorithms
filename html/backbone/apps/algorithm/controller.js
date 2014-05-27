/* global App */
App.module('Algorithm', function(Algorithm, App, Backbone, Marionette, $, _) {
    'use strict';

    Algorithm.Controller = App.Controller.Base.extend({
        name: 'Algorithm',
        initialize: function(options) {
            var view = this.getView();
            this.show(view);
        },

        getView: function() {
            return new Algorithm.View();
        }
    });
});