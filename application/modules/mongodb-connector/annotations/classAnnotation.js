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
        console.log("Data: ", this);
        if(!this.get('data')) throw new Error('ClassAnnotation requires the annotationClass structure to be able to work.');
        if(!this.get('path') || !this.get('reader')) throw new Error('ClassAnnotation requires a path and a reader to be able to perform a lookup.');
        
        this.set('properties', new Backbone.Collection([], { model: PropertyAnnotation })),
        this.set('methods', new Backbone.Collection([], { model: MethodAnnotation })),
        
        this.parse();
    },
    
    parse: function() {
        _.each(this.get('data'), function(c) {
            if(_.contains(ClassAnnotation.annotations, c.key.toLowerCase())) {
                this.set(c.key.toLowerCase(), this["do" + _s.camelize(c.key)](c.value));
            }
        }, this);
    },
    
    /**
     * Process ClassName Attribute.
     */
    doClassName: function(value) {
        var ModelClass = this.get('reader').findClass(value.toLowerCase(), this.get('path'));
        return require(ModelClass);
    },
    
    /**
     * Process ClassType Attribute.
     */
    doClassType: function(value) {
        return value;
    },
    
    /**
     * Process SuperClass Attribute.
     */
    doSuperClass: function(value) {
        var SuperClass = this.get('reader').findClass(value.toLowerCase(), this.get('path'));
        return require(SuperClass);
    },
    
    /**
     * Process Collection Attribute.
     */
    doCollection: function(value) {
        return value;
    }
    
}, {
    
    NAME: 'ClassAnnotation',
    
    annotations: [
       'classname',
       'classtype',
       'superclass',
       'collection'
    ],
    
});

module.exports = ClassAnnotation;