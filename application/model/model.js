/**
 * Model Class
 * Author: Patricio Ferreira
 * 
 * Note: Evaluate if it's worth to use node-annotations
 * to map simple POJOs to collections (Schemaless style).
 **/
 
 var classUtil = require('../util/class'),
    Backbone = require('backbone'),
    _ = require('underscore');

/**
 * @Class();
 */
var Model = Backbone.Base.extend({
    
    name: "Model",
    
    /**
     * @Property("id");
     * @value("string");
     */
    id: "1",
    
    /**
     * @Method("initialize");
     */
    initialize: function(opts) {
        opts || (opts = {});
        
        if(!opts.name) throw new Error('Model requires a \'name\' to be able to be instantiated.');
        this.name = opts.name;
        
        this._validators = new Backbone.Collection( { model: this }); // FIXME: Change to interface Strategy
    }
    
});

module.exports = Model;