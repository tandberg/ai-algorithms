/* global App */
App.module('Algorithm', function(Algorithm, App, Backbone, Marionette, $, _) {
    'use strict';

    Algorithm.View = Marionette.ItemView.extend({
        template: JST['backbone/apps/algorithm/templates/list.jst']
    });
});