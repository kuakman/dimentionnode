/**
 *  ServiceAnnotation Class
 * Author: Patricio Ferreira
 */
 
 var Annotation = require('./annotation'),
    _ = require('underscore');
    
var ServiceAnnotation = Annotation.extend({
    
    /**
     * Constructor
     */
    initialize: function() {
        ServiceAnnotation.__super__.initialize.apply(this, arguments);
    },
    
    /**
     * @Override
     * Parse Service Annotation
     */
    parse: function() {
        
    },
    
}, {
    
    NAME: 'ServiceAnnotation'
    
});

module.exports = ServiceAnnotation;