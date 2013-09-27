/**
 * Model Class
 * Author: Patricio Ferreira
 **/
 
 var classUtil = require('../util/class'),
    Backbone = require('backbone'),
    _ = require('underscore');
    
var Model = Backbone.Base.extend({
    
    name: "Model",
    
    initialize: function(opts) {
        opts || (opts = {});
        
        if(!opts.name) throw new Error('Model requires a \'name\' to be able to be instantiated.');
        this.name = opts.name;
    }
    
});

module.exports = Model;