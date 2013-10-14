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
     * @PropertyType("String");
     * @Validator({ "type": "maxlength", "value": "40" });
     */
    username: "",
    
    /**
     * @Property("email");
     * @PropertyType("String");
     * @Validator({ "type": "email" });
     */ 
    email: "",
    
    /**
     * @Property("password");
     * @PropertyType("Password");
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