/**
 * Store Connector
 * Author: Patricio Ferreira
 */
 
 var Backbone = require('backbone'),
    _ = require('underscore'),
    path = require('path'),
    colors = require('colors');
    
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
        if(this.config.dbconnector.driver) {
            var DriverClass = require(path.resolve(this.basePath + this.config.dbconnector.driver));
            if(this.config.dbconnector.scanPaths && this.config.dbconnector.scanPaths.length > 0) {
                var driver = new DriverClass({ callback: _.bind(this.onComplete, this) });
                driver.scan(this.config.dbconnector.scanPaths);
            } else {
                console.log('ScanPaths was not specified for driver [' + this.config.dbconnector.driver + '] - Ignoring...'.red);
                this.callback();
            }
        } else {
            console.log('Driver not found in config file - Ignoring...'.red);
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