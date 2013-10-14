/**
 * Build Process
 * Author: Patricio Ferreira
 **/
 
 var Backbone = require('backbone'),
    _ = require('underscore'),
    path = require('path'),
    colors = require("colors");
 
 var Build = Backbone.Base.extend({
    
    initialize: function(opts) {
        opts || (opts = {});
        
        if(!opts.callback) throw new Error('Build requires a callback to be able to run.');
        this.callback = opts.callback;
        
        this.build();
    },
    
    /**
     * 1) Run Sass preprocesor
     * 2) Build bundles for JS
     * 3) Ofuscation on JS bundles
     * 4) Minification on JS Bundles and CSS
     **/
    build: function() {
        this.onBuildComplete();
    },
    
    onBuildComplete: function() {
        this.callback();
    }
    
});
 
 exports.run = function(callback) {
    return new Build({ callback: callback });
 };