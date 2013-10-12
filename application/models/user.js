/**
 * User Class
 * Author: Patricio Ferreira
 */
 
 var Backbone = require('backbone'),
    _ = require('underscore'),
    Model = require('./model');

/**
 * @Class();
 * @ClassName("User");
 * @ClassType("model");
 * @SuperClass("Model");
 * @Collection("users");
 */ 
var User = Model.extend({
    
    /**
     * @Property("username");
     * @type("String");
     * @validator({ "type": "maxlength", "value": "40" });
     */
    username: "",
    
    /**
     * @Property("email");
     * @type("String");
     * @validator({ "type": "email" });
     */ 
    email: "",
    
    /**
     * @Property("password");
     * @type("Password");
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