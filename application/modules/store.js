/**
 * Store Connector
 * Author: Patricio Ferreira
 */
 
 var Backbone = require('backbone'),
    _ = require('underscore'),
    path = require('path'),
    colors = require('colors'),
    Nodebernate = require('./nodebernate');
    
var Store = Backbone.Base.extend({
    
    basePath: process.cwd() + '/',
    
    paths: [],
    
    initialize: function(opts) {
        opts || (opts = {});
        
        if(!opts.callback) throw new Error('Store requires a callback to be able to run.');
        if(!opts.config && opts.config.dbconnector) throw new Error('Store requires a config -> dbconnector object to be able to run.');
        this.callback = opts.callback;
        this.config = opts.config;
        
        if(opts.basePath) this.basePath = opts.basePath;
        
        this.configure();
    },
    
    /**
     * Set Up DBConnector
     */
    configure: function() {
        if(this.config.dbconnector) {
            if(this.config.dbconnector.scanPaths && this.config.dbconnector.scanPaths.length > 0) {
                var driver = new Nodebernate({ config: this.config, callback: _.bind(this.onComplete, this) });
                driver.scan(this.config.dbconnector.scanPaths);
            } else {
                console.log('ScanPaths were not specified for Nodebernate - Ignoring...'.red);
                this.callback();
            }
        } else {
            console.log('DBConnector not found - Ignoring...'.red);
            this.callback();
        }
    },
    
    onComplete: function() {
        console.log('Store Configuration Completed.\n'.cyan);
        this.callback();   
    }
    
});

exports.initialize = function(config, basePath, callback) {
    console.log('Initializing Store...'.cyan);
    return new Store({ config: config, basePath: basePath, callback: callback }); 
}