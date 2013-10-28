/**
 * ClassAnnotation Class
 * Author: Patricio Ferreira
 */
 
 var Annotation = require('./annotation'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    _s = require('underscore.string');
    
var PropertyAnnotation = require('./propertyAnnotation'),
    MethodAnnotation = require('./methodAnnotation');
    
var ClassAnnotation = Annotation.extend({
    
    /**
     * Constructor
     */
    initialize: function() {
        ClassAnnotation.__super__.initialize.apply(this, arguments);
        
        if(!this.get('data')) throw new Error('ClassAnnotation requires the annotationClass structure to be able to work.');
        if(!this.get('path') || !this.get('reader')) throw new Error('ClassAnnotation requires a path and a reader to be able to perform a lookup.');
        
        this.set('properties', new Backbone.Collection([], { model: PropertyAnnotation })),
        this.set('methods', new Backbone.Collection([], { model: MethodAnnotation })),
        
        this.parse();
    },
    
    parse: function() {
        _.each(this.get('data'), function(c) {
            var key = c.key.toLowerCase();
            if(_.contains(ClassAnnotation.annotations, key)) {
                this.set(key, c.value);
            }
        }, this);
    },
    
    /**
     * Process ClassDef Attribute.
     */
    onClassdef: function(annotation) {
        if(annotation.superclass) this.onSuperClass(annotation.superclass);
        if(annotation.class) this.onClass(annotation.class);
        if(annotation.collection) this.onCollection(annotation.collection);
    },
    
    /**
     * SuperClass Definition
     */
    onSuperClass: function(superclass) {
        this.attributes['superclass'] = require(this.get('reader').findClass(superclass.toLowerCase(), this.get('path')));
    },
    
    /**
     * Class Definition
     */
    onClass: function(clazz) {
        this.attributes['class'] = require(this.get('reader').findClass(clazz.toLowerCase(), this.get('path')));
    },
    
    /**
     * Collection Definition
     */
    onCollection: function(collection) {
        this.attributes['collection'] = collection;
    }
    
}, {
    
    NAME: 'ClassAnnotation',
    
    annotations: [
        'classdef'
    ],
    
});

module.exports = ClassAnnotation;