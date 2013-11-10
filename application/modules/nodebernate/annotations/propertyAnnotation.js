/**
 * PropertyAnnotation Class
 * Author: Patricio Ferreira
 */
 
 var Annotation = require('./annotation'),
    _ = require('underscore');
    
var PropertyAnnotation = Annotation.extend({
    
    initialize: function() {
        PropertyAnnotation.__super__.initialize.apply(this, arguments);
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