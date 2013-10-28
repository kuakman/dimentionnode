/**
 * Model Class
 * Author: Patricio Ferreira
 **/
 
 var Backbone = require('backbone'),
    _ = require('underscore');

/**
 * @Class();
 * @ClassType("model");
 * @ClassDef({ "class": "Model" });
 */
var Model = Backbone.Base.extend({
    
    validators: new Backbone.Collection(),
    
    /**
     * @Property({ "name": "id", "type": "ObjectID" });
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
     * @Method({ "name": "save" });
     */
    save: function(cb) { },
    
    /**
     * Save or Update the object.
     * @Method({ "name": "saveOrUpdate" });
     */
    saveOrUpdate: function(cb) { },
    
    /**
     * Remove the Object.
     * @Method({ "name": "remove" });
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
    
}, {
    
    /** Static Members **/
    
    NAME: "Model",
    
    /**
    * Find all objects in the collection.
    * @Method({ "name": "findAll", "static": "true" });
    */
    findAll: function(cb) {
        
    },
   
    /**
     * Find object by Id.
     * @Method({ "name": "findById", "static": "false" });
     */
    findById: function(id, cb) {
        
    }
    
});

module.exports = Model;