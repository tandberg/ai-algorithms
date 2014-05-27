/* global App */
App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {
    'use strict';

    Controller.Base = Marionette.Controller.extend({

        constructor: function(options) {
            this.controller_name = this.name ? this.name + '_controller' : 'controller';
            this.uniqueId = _.uniqueId(this.controller_name);
            options = options || {};

            this.region = options.region || App.request('default:region');

            this._registerInstance();
            console.log('init', this.controller_name);


            Marionette.Controller.prototype.constructor.apply(this, arguments);
        },

        show: function(view, options) {
            options = options || {};
            _.defaults(options, {
                loading: false,
                region: this.region
            });

            this._setMainView(view);
            this._manageView(view, options);
        },
        
        _setMainView: function(view) {
            if (this._mainView === view) {
                return;
            }

            this._mainView = view;
            this.listenTo(view, 'close', this.close);
        },

        _manageView: function(view, options) {
            if(options.loading) {
                App.execute('show:loading', view, options);
            } else {
                options.region.show(view);
            }
        },

        close: function() {
            console.log('close', this.controller_name);

            this._unregisterInstance();

            delete this.region;
            delete this.options;

            var args = Array.prototype.slice.call(arguments);
            Marionette.Controller.prototype.close.apply(this, args);
        },

        _registerInstance: function() {
            App.execute('register:instance', 'controller', this, this.uniqueId);
        },

        _unregisterInstance: function() {
            var name = this.name ? this.name + '_controller' : 'controller';
            App.execute('unregister:instance', 'controller', this, this.uniqueId);
        }
    });
});
