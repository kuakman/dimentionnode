/**
 * ClassAnnotation Class
 * Author: Patricio Ferreira
 */
 
 var Backbone = require('backbone'),
    _ = require('underscore'),
    _s = require('underscore.string'),
    Annotation = require('./annotation'),
    Reader = require('../readers'),
    SessionFactory = require('../sessions/sessionFactory');
    
var ClassAnnotation = Annotation.extend({
    
    /**
     * Constructor
     */
    initialize: function() {
        ClassAnnotation.__super__.initialize.apply(this, arguments);
        this.set('properties', new Backbone.Collection([], { model: require('./propertyAnnotation') })),
        this.set('methods', new Backbone.Collection([], { model: require('./methodAnnotation') })),
        this.parse();
    },
    
    /**
     * Validate Annotation attributes
     * @override Annotation.validate()
     */
    validate: function() {
        ClassAnnotation.__super__.validate.apply(this, arguments);
        if(!this.get('reader').get('config')) throw new Error('Annotation \'reader\' instance must have defined a configuration object.');
        if(!this.get('reader').get('config').store) this.get('reader').get('config').store = {}; 
        if(!this.get('reader').get('config').dbconnector) this.get('reader').get('config').dbconnector = {};
        this.cfg = this.get('reader').get('config');
    },
    
    /** 
     * Parse Annotation data
     * @override Annotation.parse();
     */
    parse: function() {
        _.each(this.get('data'), function(c) {
            var key = c.key.toLowerCase();
            if(_.contains(ClassAnnotation.annotations, key)) {
                this.set(key, c.value);
            }
        }, this);
    },
    
    /**
     * Process ClassDef Attribute.
     */
    onClassdef: function(annotation) {
        if(annotation.superclass) this.onSuperClass(annotation.superclass);
        if(annotation.class) this.onClass(annotation.class);
        if(annotation.collection) this.onCollection(annotation.collection);
    },
    
    /**
     * SuperClass Definition
     */
    onSuperClass: function(superclass) {
        this.attributes['superclass'] = require(Reader.findClass(superclass.toLowerCase(), this.get('reader').get('path')));
        this.injectSession(this.attributes['superclass']);
    },
    
    /**
     * Class Definition
     */
    onClass: function(clazz) {
        this.attributes['class'] = require(Reader.findClass(clazz.toLowerCase(), this.get('reader').get('path')));
        if(!this.attributes['superclass']) this.injectSession(this.attributes['class']);
    },
    
    /**
     * Collection Definition
     */
    onCollection: function(collection) {
        this.attributes['collection'] = collection;
    },
    
    /**
     * Inject Session into class specified by parameter.
     */
    injectSession: function(clazz) {
        var Session = SessionFactory.createSession(_s.capitalize(this.cfg.dbconnector.engine + 'Session'), this.cfg.store);
    }
    
}, {
    
    NAME: 'ClassAnnotation',
    
    annotations: [
        'classdef'
    ],
    
});

module.exports = ClassAnnotation;