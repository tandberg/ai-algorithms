/* global App */
App.module('Header', function(Header, App, Backbone, Marionette, $, _) {
    'use strict';

    this.startWithParent = false;

    var API = {
        list: function() {
            var header = new Header.Controller({region: App.headerRegion});
        }
    };

    Header.on('start', function() {
        API.list();
    });
});
