/**
 * Service Class
 * Author: Patricio Ferreira
 **/
 
 var Backbone = require('backbone'), 
    classUtil = require('../util/class'),
    _ = require('underscore');
    
var Service = Backbone.Base.extend({
    
    name: "Service",
    
    initialize: function(opts) {
        opts || (opts = {});
        
        if(!opts.name) throw new Error('Service requires a \'name\' to be able to be instantiated.');
        this.name = opts.name;
    }
    
});

module.exports = Service;