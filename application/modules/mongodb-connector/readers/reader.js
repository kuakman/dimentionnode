/**
 * Reader Class
 * Author: Patricio Ferreira
 */
 
 var directory = require('../../../util/directory'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    _s = require('underscore.string'),
    colors = require('colors');
    
var ClassAnnotation = require('../annotations/classAnnotation'),
    PropertyAnnotation = require('../annotations/propertyAnnotation'),
    MethodAnnotation = require('../annotations/methodAnnotation');
    
var Reader = Backbone.Base.extend({
    
    initialize: function() {
        
        if(!this.get('annotations')) throw new Error('Readers require an annotation attribute to be able to work.');
        if(!this.get('path')) throw new Error('Readers require a path attribute to be able to work.');
        if(!this.get('file')) throw new Error("Readers require a file attribute to be able to work.");
        
        this.set('cs', new Backbone.Collection([], { model: ClassAnnotation })),
        this.get('cs').on('add', _.bind(this.onClassAdded, this));
    },
    
    /**
     * Parse annotation information for a specific type of reader.
     */
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
                ca.get('properties').add({ data: this.getAnnotation('properties')[prop], name: prop, reader: Reader });
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
                ca.get('methods').add({ data: this.getAnnotation('methods')[prop], name: prop, reader: Reader });
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
     * TODO: Improve Factory Method
     */
    create: function(opts) {
        var ClassInfo = _.find(opts.annotations.class, function(a) { if(a.key.toLowerCase() == 'classtype') return (a.value.toLowerCase() == 'model' || a.value.toLowerCase() == 'service'); });
        var ClassType = (ClassInfo) ? require('./' + ClassInfo.value.toLowerCase() + 'Reader') : Reader;
        return new ClassType(opts);
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