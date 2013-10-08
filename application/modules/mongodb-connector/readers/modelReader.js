/**
 * ModelReader Class
 * Author: Patricio Ferreira
 */
 
 var Reader = require('./reader'),
    Backbone = require('backbone'),
    _ = require('underscore');
    
var ModelReader = Reader.extend({
    
    initialize: function() {
        ModelReader.__super__.initialize.apply(this, arguments);
    },
    
    /**
     * @Override parse();
     */
    parse: function() {
        ModelReader.__super__.parse.apply(this, arguments);
    },
    
    /**
     * @Override classes();
     */
    classes: function() {
        var cs = this.getAnnotation('class');
    },
    
     /**
     * @Override properties();
     */
    properties: function() {
        var ps = this.getAnnotation('properties');
    },
    
     /**
     * @Override methods();
     */
    methods: function() {
        var ms = this.getAnnotation('methods');
    }
    
});

module.exports = ModelReader;