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
    initialize: function() { },
    
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