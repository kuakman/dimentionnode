/**
 * Model Class
 * Author: Patricio Ferreira
 **/
 
 var classUtil = require('../util/class'),
    Backbone = require('backbone'),
    _ = require('underscore');

/**
 * @Class("Model");
 * @Collection("none");
 * @InheritProperties("true");
 * @InheritMethods("true");
 */
var Model = Backbone.Base.extend({
    
    name: "Model",
    
    validators: new Backbone.Collection(),
    
    /**
     * @Property("id");
     * @type("ObjectID");
     */
    id: "",
    
    /**
     * Constructor
     */
    initialize: function(opts) {
        opts || (opts = {});
        
        if(!opts.name) throw new Error('Model requires a \'name\' to be able to be instantiated.');
        this.name = opts.name;
    },
    
    /**
     * Find all objects in the collection.
     * @Method("findAll");
     * @StaticMethod();
     */ 
    findAll: function(cb) {
        
    },
    
    /**
     * Find object by Id.
     * @Method("findById");
     * @StaticMethod();
     */
    findById: function(id, cb) {
        
    },
    
    /**
     * Save the object.
     * @Method("save");
     */
    save: function(cb) {
        
    },
    
    /**
     * Save or Update the object.
     * @Method("saveOrUpdate");
     */
    saveOrUpdate: function(cb) {
        
    },
    
    /**
     * Remove the Object.
     * @Method("remove");
     */
    remove: function(cb) {
        
    },
    
    /**
     * 
     */
    _serialize: function() {
        console.log('Serialize() Called.');
    },
    
    /**
     * 
     */
    _deserialize: function() {
        console.log('Deserialize() Called.');
    }
    
});

module.exports = Model;