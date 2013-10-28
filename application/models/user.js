/**
 * User Class
 * Author: Patricio Ferreira
 */
 
 var Backbone = require('backbone'),
    _ = require('underscore'),
    Model = require('./model');

/**
 * @Class();
 * @ClassType("model");
 * @ClassDef({ "class": "User", "superclass": "Model", "collection": "users" });
 */ 
var User = Model.extend({
    
    /**
     * @Property({ "name": "username", "type": "string" });
     * @Validator({ "type": "maxlength", "value": "40" });
     */
    username: "",
    
    /**
     * @Property({ "name": "email", "type": "string" });
     * @Validator({ "type": "email" });
     */ 
    email: "",
    
    /**
     * @Property({ "name": "password", "type": "Password" });
     * @OneToOne({ "key": "id" });
     */
    password: null,
    
    /**
     * // TODO: Define: OneToOne - OneToMany - ManyToMany relationships.
     * Property("dreams");
     * type("Dream");
     */ 
    dreams: new Backbone.Collection(),
    
    /**
     * Constructor
     */ 
    initialize: function() {
        User.__super__.initialize.apply(this, arguments);
    }

}, {
    
    /** Static Members **/
    
    NAME: "User"
    
});

module.exports = User;