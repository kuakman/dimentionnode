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