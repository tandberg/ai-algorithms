/* global Backbone, Marionette, $ */
var App = window.App = (function() {
    'use strict';

    var App = new Marionette.Application();

    App.addRegions({
        headerRegion: '#header-region',
        mainRegion: '#main-region'
    });

    App.addInitializer(function() {
        App.module('Header').start();
    });

    App.on('initialize:after', function() {
        Backbone.history.start();
    });

    App.reqres.setHandler('default:region', function() {
        return App.mainRegion;
    });

    return App;
})();

$(function() {
    'use strict';

    window.App.start();
});