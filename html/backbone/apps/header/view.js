/* global App */
App.module('Header', function(Header, App, Backbone, Marionette, $, _) {
    'use strict';
    
    Header.View = Marionette.ItemView.extend({
        template: JST['backbone/apps/header/templates/header.jst']
    });
});