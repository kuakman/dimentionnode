/**
 * Mongodb Connector | Annotation based
 * Author: Patricio Ferreira
 */
 
 var Backbone = require('backbone'),
    _ = require('underscore'),
    annotation = require('annotation');
    
var MongoDBConnector = Backbone.Base.extend({
    
    initialize: function(opts) {
        opts || (opts = {});
        
        if(!opts.basePath) throw new Error('MongoDBConnector requires a basePath property to be able to scan for MongoDB annotations');
        this.basePath = opts.basePath;
        
        this.scan();
    },
    
    scan: function() {
        annotation(this.basePath, _.bind(this.onAnnotated, this));
    },
    
    onAnnotated: function(ar) {
        //console.log(ar.getClassAnnotations(), ar.getPropertyAnnotations('id'), ar.getMethodAnnotations('initialize'));
    }
    
});

/** Static Initializer **/
MongoDBConnector.initialize = function(basePath) {
    new MongoDBConnector({ basePath: basePath });
}

module.exports = MongoDBConnector;