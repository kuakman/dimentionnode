/**
 * Mongodb Connector
 * Author: Patricio Ferreira
 */
 
 var path = require('path'),
    fs = require('fs'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    directory = require('../../util/directory'),
    annotation = require('annotation'),
    colors = require('colors');
    
var MongoDBConnector = Backbone.Base.extend({
    
    paths: [],
    
    initialize: function(opts) {
        opts || (opts = {});
        if(opts.callback) this.callback = opts.callback;
    },
        
    /**
     * Scan recursevly inside the path looking for annotations.
     */
    scan: function(paths) {
        if(paths && paths.length > 0) {
            this.paths = _.compact(_.map(paths, function(p) { return (this.pathExist(p)) ? { path: p, files: [] } : false; }, this));
        }
        if(this.paths.length > 0) {
            this.nextPath(this.paths.shift());
        } else {
            this.callback();
        }
    },
    
    nextPath: function(p) {
        console.log(('   Scanning path: ' + p.path).blue);
        var files = directory.walk(p.path);
        if(files && files.length > 0) {
            p.files = files;
            this.nextFile(p, p.files.shift());
        } else {
            this.scan();
        }
    },
    
    /**
     * Scan Annotations inside each files.
     */ 
    nextFile: function(p, file) {
        try {
            annotation(file, _.bind(this.onClassParsed, this, p, file));
        } catch(ex) {
            console.log(ex.message.red);
            this.onClassParsed();
        }
    },
    
    /**
     * Check if the path exists
     * @param p {String}
     * @returns {Boolean}
     */
    pathExist: function(p) {
        return fs.existsSync(p);
    },
    
    /**
     * Class Parsed Handler.
     * @param classInfo {AnnotationReader}
     */
    onClassParsed: function(p, file, classInfo) {
        try {
            console.log(('       Class [' + file + ']').yellow);
            if(classInfo) {
                // TODO Staregy Pattern to read stuff.
            }
        } catch(ex) {
            console.log(ex.message.red);
            console.log("Continue...".blue);
        } finally {
            if(p.files.length > 0) {
                this.nextFile(p, p.files.shift());
            } else {
                this.scan();
            }
        }
    }
    
});

module.exports = MongoDBConnector;