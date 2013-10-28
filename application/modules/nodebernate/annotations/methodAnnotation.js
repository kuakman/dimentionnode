/**
 * MethodAnnotation Class
 * Author: Patricio Ferreira
 */
 
 var Annotation = require('./annotation'),
    Backbone = require('backbone'),
    _ = require('underscore');
    
var MethodAnnotation = Annotation.extend({
    
    initialize: function() {
        MethodAnnotation.__super__.initialize.apply(this, arguments);
        
        if(!this.get('data')) throw new Error('ClassAnnotation requires the annotationClass structure to be able to work.');
        if(!this.get('reader')) throw new Error('ClassAnnotation requires a reader to be able to perform a lookup.');
        
        this.parse();
    },
    
    parse: function() {
        _.each(this.get('data'), function(c) {
            var key = c.key.toLowerCase();
            if(_.contains(MethodAnnotation.annotations, key)) {
                this.set(key, c.value);
            }
        }, this);
    }
    
}, {
    
    NAME: 'MethodAnnotation',
    
    annotations: [
        'method',
        'staticmethod'
    ]
    
});

module.exports = MethodAnnotation;