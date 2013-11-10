/**
 * Service Class
 * Author: Patricio Ferreira
 **/
 
 var Backbone = require('backbone'),
    _ = require('underscore');
    
/**
 * @Class();
 * @ClassType("service");
 * @ClassDef({ "class": "Service" })
 */ 
var Service = Backbone.Base.extend({
    
    initialize: function(opts) {
        opts || (opts = {});
        
        if(!opts.name) throw new Error('Service requires a \'name\' to be able to be instantiated.');
        this.name = opts.name;
    }
    
}, {
    
    NAME: "Service"
    
});

module.exports = Service;