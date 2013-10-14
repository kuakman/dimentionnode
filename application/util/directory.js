/**
 * Directory Class
 * Author: Patricio Ferreira
 **/

var fs = require('fs'),
    path = require('path'),
    Backbone = require('backbone'),
    _ = require('underscore');
    
var Directory = Backbone.Base.extend({
    
    initialize: function() { },
    
    walk: function(dir, exclude) {
        exclude || (exclude = []);
        
        var results = [];
        var files = fs.readdirSync(path.resolve(dir));
        for(var i = 0; i < files.length; i++) {
            if(files[i].indexOf('.DS_Store') == -1) {
                var filep = path.resolve(dir + "/" + files[i]);
                var fstats = fs.statSync(filep);
                if(fstats && fstats.isDirectory()) {
                    if(!this.fileContains(files[i], exclude)) {
                        results = results.concat(this.walk(filep)); 
                    } else {
                        results = results.concat(this.walk(filep)); 
                    }
                } else {
                    if(!this.fileContains(files[i], exclude)) {
                        results.push(filep);
                    }
                }
            }
        }
        return results;
    },
    
    fileContains: function(str, arr) {
        var result = false;
        for(var i = 0; i < arr.length; i++) {
            if(arr[i].indexOf(str) != -1) {
                result = true;
                break;
            }
        }
        return result;
    },
    
    /**
     * Find File in the directory specified by parameter (recursivly over subfolders)
     */
    findFile: function(filename, dir) {
        var result = null;
        var files = fs.readdirSync(path.resolve(dir));
        for(var i = 0; i < files.length; i++) {
            var filep = path.resolve(dir + "/" + files[i]);
            if(files[i].indexOf(filename) == -1) {
                var fstats = fs.statSync(filep);
                if(fstats && fstats.isDirectory()) {
                    this.findFile(filename, filep);
                }
            } else {
                result = filep;
                break;
            }
        }
        return result;
    }
    
});

module.exports = new Directory();