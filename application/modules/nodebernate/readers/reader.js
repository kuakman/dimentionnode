/**
 * Reader Class
 * Author: Patricio Ferreira
 */
 
 var directory = require('../../../util/directory'),
    path = require('path'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    _s = require('underscore.string'),
    SessionFactory = require('../sessions/sessionFactory'),
    colors = require('colors');
    
var ClassAnnotation = require('../annotations/classAnnotation');
    
var Reader = Backbone.Base.extend({
    
    initialize: function() {
        if(!this.get('config')) throw new Error('Readers require a config attribute to be able to work.');
        if(!this.get('annotations')) throw new Error('Readers require an annotation attribute to be able to work.');
        if(!this.get('path')) throw new Error('Readers require a path attribute to be able to work.');
        if(!this.get('file')) throw new Error("Readers require a file attribute to be able to work.");
        
        this.set('cs', new Backbone.Collection([], { model: ClassAnnotation })),
        this.get('cs').on('add', _.bind(this.onClassAdded, this));
        
        try {
            var connector = this.get('config').dbconnector.engine.toLowerCase();
            require('../sessions/' + connector);
            this.set('session', SessionFactory.createSession(_s.capitalize(connector + 'Session'), this.get('config').dbconnector.options));
        } catch(ex) {
            console.log(('Error while injecting Session: ' + ex.message).bold.red);
            process.exit();
        }
    },
    
    /**
     * Parse annotation information for a specific type of reader.
     **/
    parse: function() {
        this.classes();
    },
    
    /**
     * Parse Classes.
     */
    classes: function() {
        try {
            this.get('cs').add({ data: this.getAnnotation('class'), path: this.get('path'), reader: Reader });
        } catch(ex) {
            console.log(ex.message.bold.red);
            process.exit();
        }
    },
    
    /**
     * Parse Properties.
     */
    properties: function(ca) {
        try {
            _.each(_.keys(this.getAnnotation('properties')), function(prop) {
                ca.get('properties').add({ class: ca, data: this.getAnnotation('properties')[prop], name: prop, reader: Reader });
            }, this);
        } catch(ex) {
            console.log(ex.message.bold.red);
            process.exit();
        }
    },
    
    /**
     * Parse Methods.
     */
    methods: function(ca) {
        try {
            _.each(_.keys(this.getAnnotation('methods')), function(prop) {
                ca.get('methods').add({ class: ca, data: this.getAnnotation('methods')[prop], name: prop, reader: Reader });
            }, this);
        } catch(ex) {
            console.log(ex.message.bold.red);
            process.exit();
        }
    },
    
    /**
     * Class Added Handler.
     */
    onClassAdded: function(ca, collection, opts) {
        this.properties(ca);
        this.methods(ca);
    },
    
    /**
     * Get Annotation list by type.
     */
    getAnnotation: function(type) {
        return this.get('annotations')[type];
    }
    
}, {
   
    /** Static Members **/
   
    /**
     * Factory Method - Creates a Type of Reader
     */
    create: function(opts) {
        var definition = _.find(opts.annotations.class, function(a) { return (a.key.toLowerCase() == 'classtype'); }, this);
        if(definition && definition.value) {
            try {
                var Clazz = require('./' + definition.value.toLowerCase() + 'Reader');
                return new Clazz(opts);
            } catch(ex) {
                console.log(ex.message.bold.red);
                process.exit();
            }
        }
        return null;
    },
    
    /**
     * Find a Class file and return his Path.
     */
    findClass: function(className, classPath) {
        var fullClassFile = directory.findFile(_s.camelize(className) + '.js', classPath);
        return (fullClassFile) ? fullClassFile.split(".")[0] : null;
    }
   
});

module.exports = Reader;