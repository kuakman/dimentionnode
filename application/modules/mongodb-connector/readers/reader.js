/**
 * Reader Class
 * Author: Patricio Ferreira
 */
 
 var Backbone = require('backbone'),
    _ = require("underscore"),
    _s = require('underscore.string');
    
var Reader = Backbone.Base.extend({
    
    annotations: { },
    
    initialize: function(opts) {
        opts || (opts = {});
        
        if(!opts.annotations) throw new Error('Readers require an annotation attribute to be able to work.');
        this.annotations = opts.annotations;
    },
    
    /**
     * Get Annotation list by type.
     */
    getAnnotation: function(type) {
        return this.annotations[type];
    },
    
    /**
     * Parse annotation information for a specific type of reader.
     */
    parse: function() {
        this.classes();
        this.properties();
        this.methods();
    },
    
    /**
     * Parse Classes.
     */
    classes: function() { },
    
    /**
     * Parse Properties.
     */
    properties: function() { },
    
    /**
     * Parse Methods.
     */
    methods: function() { },
    
});

Reader.create = function(annotations) {
    var ClassInfo = _.find(annotations.class, function(a) { if(a.key.toLowerCase() == 'classtype') return (a.value.toLowerCase() == 'model' || a.value.toLowerCase() == 'service'); });
    var ClassType = (ClassInfo) ? require('./' + ClassInfo.value.toLowerCase() + 'Reader') : Reader;
    return new ClassType({ annotations: annotations });
};

module.exports = Reader;