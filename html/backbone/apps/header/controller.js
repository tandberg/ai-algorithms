/* global App */
App.module('Header', function(Header, App, Backbone, Marionette, $, _) {
    'use strict';

    Header.Controller = App.Controller.Base.extend({
        name: 'header',
        initialize: function(options) {
            var view = this.getView();
            this.show(view);
        },

        getView: function() {
            return new Header.View();
        }
    });
});