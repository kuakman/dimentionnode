/**
 * Annotation Class
 * Author: Patricio Ferreira
 */
 
 var Backbone = require('backbone'),
    _ = require('underscore'),
    _s = require('underscore.string'),
    colors = require('colors');
    
var Annotation = Backbone.Base.extend({
    
    /**
     * Constructor
     */
    initialize: function() {
        this.validate();
    },
    
    /**
     * Validate annotation attributes
     */
    validate: function() {
        if(!this.get('data')) throw new Error('ClassAnnotation requires the annotationClass structure to be able to work.');
        if(!this.get('reader')) throw new Error('ClassAnnotation requires a reader to be able to perform a lookup.');
    },
    
    /**
     * Parse Annotation
     */
    parse: function() {
        throw new Error('Annotation.parse have to be overriden in subclasses.');
    },
    
    /**
     * @Override Base.set();
     */
    set: function(key, value, opts) {
        Annotation.__super__.set.apply(this, arguments);
        try {
            var func = this['on' + _s.capitalize(key)];
            if(!_.isUndefined(func) && _.isFunction(func)) func.apply(this, [value]);
        } catch(ex) {
            console.log(ex.message.bold.red);
            process.exit();
        }   
    }
    
}, {
    
    NAME: 'Annotation'
    
});

module.exports = Annotation;