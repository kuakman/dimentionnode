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
        this.properties();
        this.methods();
    },
    
    /**
     * Parse Classes.
     */
    classes: function() {
        try {
            var ca = new ClassAnnotation({ data: this.getAnnotation('class'), path: this.get('path'), reader: Reader });
            this.get('cs').add(ca);
        } catch(ex) {
            console.log(ex.message.bold.red);
        }
    },
    
    /**
     * Parse Properties.
     */
    properties: function(ca) {
        try {
            //ca.get('properties').add(new PropertyAnnotation({ data: this.getAnnotation('properties'), reader: Reader }));
        } catch(ex) {
            console.log(ex.message.bold.red);
        }
    },
    
    /**
     * Parse Methods.
     */
    methods: function(ca) {
        try {
            //ca.get('methods').add(new MethodAnnotation({ data: this.getAnnotation('methods'), reader: Reader }));
        } catch(ex) {
            console.log(ex.message.bold.red);
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