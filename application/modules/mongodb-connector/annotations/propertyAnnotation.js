/**
 * PropertyAnnotation Class
 * Author: Patricio Ferreira
 */
 
 var Backbone = require('backbone'),
    _ = require('underscore'),
    _s = require('underscore.string');
    
var PropertyAnnotation = Backbone.Base.extend({
    
    initialize: function() {
        if(!this.get('data')) throw new Error('ClassAnnotation requires the annotationClass structure to be able to work.');
        if(!this.get('reader')) throw new Error('ClassAnnotation requires a reader to be able to perform a lookup.');
        
        this.parse();
    },
    
    parse: function() {
        _.each(this.get('data'), function(c) {
            var key = _s.capitalize(c.key.toLowerCase());
            if(_.contains(PropertyAnnotation.annotations, key)) {
                this.set(c.key.toLowerCase(), this["set" + key](c.value));
            }
        }, this);
    },
    
    setPropertytype: function(v) {
        // TODO: Implement
        return v;
    },
    
    setValidator: function(v) {
        // TODO: Implement
        return v;
    },
    
    /** Relationships **/
    
    setOnetoone: function(v) {
        // TODO: Implement
        return v;
    },
    
    setOnetomany: function(v) {
        // TODO: Implement
        return v;
    },
    
    setManytomany: function(v) {
        // TODO: Implement
        return v;
    }
    
}, {
    
    NAME: 'PropertyAnnotation',
    
    annotations: [
        'Property',
        'Propertytype',
        'Validator',
        /** Relationships **/
        'Onetoone',
        'Onetomany',
        'Manytomany'
    ]
    
});

module.exports = PropertyAnnotation;