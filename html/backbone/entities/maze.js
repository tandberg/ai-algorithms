/* global App */
App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    'use strict';

    Entities.Maze = function() {
        var self = this;
        $.ajax({
            url: 'dist/data/small_maze.txt',
            success: function(response) {
                self._parse(response);
            }
        });
    };

    Entities.Maze.prototype._parse = function(raw_maze) {
        this.board = [];
        var rows = raw_maze.split('\n');
        var self = this;

        for (var i = 0; i < rows.length; i++) {

            var column = rows[i].split('');
            self.board.push(column);

            for (var j = 0; j < column.length; j++) {

                var cell = column[j];
                if (cell === 'o') {
                    self.me = {x: i, y: j};
                }

                if (cell === 'x') {
                    self.goal = {x: i, y: j};
                }
            }
        }
    };

    var API = {
        maze: function() {
            var maze = new Entities.Maze();
            return maze;
        }
    };

    App.reqres.setHandler('maze', function() {
        return API.maze();
    });
});
