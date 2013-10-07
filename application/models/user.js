/**
 * User Class
 * Author: Patricio Ferreira
 */
 
 var Model = require('./model'),
    Backbone = require('backbone'),
    _ = require('underscore');

/**
 * @Class("User");
 * @Collection("users");
 * @ExtendClass("Model");
 * @InheritProperties("true");
 * @InheritMethods("true");
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

});