/* global App */
App.module('Algorithm.SimulatedAnnlealing', function(SimulatedAnnlealing, App, Backbone, Marionette, $, _) {
    'use strict';

    SimulatedAnnlealing.PlotView = Marionette.ItemView.extend({
        template: JST['backbone/apps/algorithm/simulated_annealing/templates/plot.jst'],
        
        initialize: function(options) {
            this.f = options.f;
        },

        onShow: function(options) {

            this.data = [];
            for (var i = -8; i < 12; i+= 0.1) {
                this.data.push([i, this.f(i)]);
            }

            $.plot($('#graph'), [{data: this.data, lines: {show: true}}]);
        },

        showArrow: function(pos) {
            var self = this;
            $.plot($('#graph'), [
                {data: self.data, lines: {show: true}},
                {data: [[pos, self.f(pos)]], points: {show: true}, color: 'magenta'}
            ]);

        }
    });

    SimulatedAnnlealing.OutputView = Marionette.ItemView.extend({
        template: JST['backbone/apps/algorithm/simulated_annealing/templates/output.jst'],

        ui: {
            'msg': '#msg'
        },

        append: function(msg) {
            this.ui.msg.append('<br>'+msg);
        },

        setMsg: function(msg) {
            this.ui.msg.html(msg);
        }
    });

    SimulatedAnnlealing.InputView = Marionette.ItemView.extend({
        template: JST['backbone/apps/algorithm/simulated_annealing/templates/input.jst'],

        triggers: {
            'click button': 'start:algorithm'
        }
    });

    SimulatedAnnlealing.Layout = Marionette.Layout.extend({
        template: JST['backbone/apps/algorithm/simulated_annealing/templates/layout.jst'],

        regions: {
            plotRegion: '#plot',
            inputRegion: '#input',
            outputRegion: '#output'
        }
    });
});