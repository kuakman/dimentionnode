/**
 * PropertyAnnotation Class
 * Author: Patricio Ferreira
 */
 
 var Annotation = require('./annotation'),
    _ = require('underscore');
    
var PropertyAnnotation = Annotation.extend({
    
    initialize: function() {
        PropertyAnnotation.__super__.initialize.apply(this, arguments);
        
        if(!this.get('data')) throw new Error('ClassAnnotation requires the annotationClass structure to be able to work.');
        if(!this.get('reader')) throw new Error('ClassAnnotation requires a reader to be able to perform a lookup.');
        
        this.parse();
    },
    
    parse: function() {
        _.each(this.get('data'), function(c) {
            var key = c.key.toLowerCase();
            if(_.contains(PropertyAnnotation.annotations, key)) {
                this.set(key, c.value);
            }
        }, this);
    }
    
}, {
    
    NAME: 'PropertyAnnotation',
    
    annotations: [
        'property',
        'propertytype',
        'validator',
        /** Relationships **/
        'onetoone',
        'onetomany',
        'manytomany'
    ],
    
    primitives: [
        Number,
        String,
        Boolean,
        Date,
    ]
    
});

module.exports = PropertyAnnotation;