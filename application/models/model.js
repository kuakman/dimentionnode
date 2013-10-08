/**
 * Model Class
 * Author: Patricio Ferreira
 **/
 
 var classUtil = require('../util/class'),
    Backbone = require('backbone'),
    _ = require('underscore');

/**
 * @Class();
 * @ClassName("Model");
 * @ClassType("model");
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
     * Save the object.
     * @Method("save");
     */
    save: function(cb) { },
    
    /**
     * Save or Update the object.
     * @Method("saveOrUpdate");
     */
    saveOrUpdate: function(cb) { },
    
    /**
     * Remove the Object.
     * @Method("remove");
     */
    remove: function(cb) { },
    
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

/**
* Find all objects in the collection.
* @Method("findAll");
* @StaticMethod();
*/
Model.findAll = function(cb) { };
    
/**
 * Find object by Id.
 * @Method("findById");
 * @StaticMethod();
 */
Model.findById = function(id, cb) { };

module.exports = Model;