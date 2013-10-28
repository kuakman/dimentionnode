/**
 * ServiceReader Class
 * Author: Patricio Ferreira
 */
 
 var Reader = require('./reader'),
    Backbone = require('backbone'),
    _ = require('underscore');
    
var ServiceReader = Reader.extend({
    
    initialize: function() {
        ServiceReader.__super__.initialize.apply(this, arguments);
    },
    
    /**
     * @Override parse();
     */
    parse: function() {
        ServiceReader.__super__.parse.apply(this, arguments);
    },
    
    /**
     * @Override classes();
     */
    classes: function() {
        
    },
    
     /**
     * @Override properties();
     */
    properties: function() {
        
    },
    
     /**
     * @Override methods();
     */
    methods: function() {
        
    }
    
});

module.exports = ServiceReader;