/**
 * ClassAnnotation Class
 * Author: Patricio Ferreira
 */
 
 var mongo = require('mongoskin'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    _s = require('underscore.string');
    
var PropertyAnnotation = require('./propertyAnnotation'),
    MethodAnnotation = require('./methodAnnotation');
    
var ClassAnnotation = Backbone.Base.extend({
    
    /**
     * Constructor
     */
    initialize: function() {
        if(!this.get('data')) throw new Error('ClassAnnotation requires the annotationClass structure to be able to work.');
        if(!this.get('path') || !this.get('reader')) throw new Error('ClassAnnotation requires a path and a reader to be able to perform a lookup.');
        
        this.set('properties', new Backbone.Collection([], { model: PropertyAnnotation })),
        this.set('methods', new Backbone.Collection([], { model: MethodAnnotation })),
        
        this.parse();
    },
    
    parse: function() {
        _.each(this.get('data'), function(c) {
            var key = _s.capitalize(c.key.toLowerCase());
            if(_.contains(ClassAnnotation.annotations, key)) {
                this.set(c.key.toLowerCase(), this["set" + key](c.value));
            }
        }, this);
    },
    
    /**
     * Process ClassName Attribute.
     */
    setClassname: function(value) {
        var ModelClass = this.get('reader').findClass(value.toLowerCase(), this.get('path'));
        return require(ModelClass);
    },
    
    /**
     * Process ClassType Attribute.
     */
    setClasstype: function(value) { return value; },
    
    /**
     * Process SuperClass Attribute.
     */
    setSuperclass: function(value) {
        var SuperClass = this.get('reader').findClass(value.toLowerCase(), this.get('path'));
        return require(SuperClass);
    },
    
    /**
     * Process Collection Attribute.
     */
    setCollection: function(value) { return value; }
    
}, {
    
    NAME: 'ClassAnnotation',
    
    annotations: [
       'Classname',
       'Classtype',
       'Superclass',
       'Collection'
    ],
    
});

module.exports = ClassAnnotation;