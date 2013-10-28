/**
 * ModelReader Class
 * Author: Patricio Ferreira
 */
 
 var Reader = require('./reader'),
    _ = require('underscore'),
    _s = require('underscore.string');
    
var ModelReader = Reader.extend({
    
    initialize: function() {
        ModelReader.__super__.initialize.apply(this, arguments);
    },
    
    /**
     * @Override parse();
     */
    parse: function() {
        ModelReader.__super__.parse.apply(this, arguments);
    },
    
    /**
     * @Override classes();
     */
    classes: function() {
        ModelReader.__super__.classes.apply(this, arguments);
    },
    
     /**
     * @Override properties();
     */
    properties: function() {
        ModelReader.__super__.properties.apply(this, arguments);
    },
    
     /**
     * @Override methods();
     */
    methods: function() {
        ModelReader.__super__.methods.apply(this, arguments);
    },
    
    /**
     * @Override onClassAdded();
     */
    onClassAdded: function(ca, collection, opts) {
        ca.set('session', this.get('session'));
        ModelReader.__super__.onClassAdded.apply(this, arguments);
    }
    
});

module.exports = ModelReader;