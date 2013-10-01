/**
 * Live Edit Module
 * Author: Patricio Ferreira
 **/
 
 var Backbone = require('backbone'),
    _ = require('underscore'),
    socketio = require('socket.io'),
    watch = require('node-watch'),
    colors = require('colors');
    
var LiveEdit = Backbone.Base.extend({
    
    sockets: null,
    
    io: null,
    
    watchDirs: ['public', 'application'],
    
    initialize: function(config) {
        config || (config = {});
        
        if(!config.server) throw new Error('LiveEdit module requires a reference to the Node Server in which it will be running.');
        
        this.server = config.server;
        
        this.sockets = new Backbone.Collection();
        this.sockets.on('add', _.bind(this.onSocketConnected, this));
        this.sockets.on('remove', _.bind(this.onSocketDisconnected, this));
    },
    
    start: function() {
        this.io = socketio.listen(this.server, { log: false });
        this.io.configure(_.bind(function() {
            this.io.set('transports', ['websocket', 'xhr-polling', 'flashsocket']);
        }, this));
        this.io.sockets.on('connection', _.bind(this.onSocketIOConnected, this));
        
        watch(this.watchDirs, this.filter(/(\.js|\.css|\.jade)$/, _.bind(function() {
            this.doReload();
        }, this)));
    },
    
    stop: function() {
        _.each(this.io.sockets, function(s) { s.disconnect(); });
        this.sockets.reset();
    },
    
    doReload: function() {
        this.sockets.each(function(s) {
            s.emit('reload');
        }, this);
    },
    
    filter: function(pattern, callback) {
        return function(filename) {
            if (pattern.test(filename)) {
                callback(filename);
            }
        }
    },
    
    /** Socket State Handlers **/
    
    onSocketIOConnected: function(s) {
        var socket = this.sockets.findWhere({ id: s.id });
        if(!socket) {
            s.on('disconnect', _.bind(this.onSocketIODisconnected, this));
            this.sockets.add(s);
        }
    },
    
    onSocketIODisconnected: function(s) {
        var socket = this.sockets.findWhere({ id: s.id });
        if(socket) this.sockets.remove(socket); 
    },
        
    onSocketConnected: function(s) {
        console.log('Socket [' + s.id + '] Connected'.cyan);
    },
    
    onSocketDisconnected: function(s) {
        console.log('Socket [' + s.id + '] Disconnected'.cyan);
    }
    
});

/** Static initialization **/

LiveEdit.launch = function(opts) {
    var liveedit = new LiveEdit({ server: opts.server });
    liveedit.start();
}

module.exports = LiveEdit;