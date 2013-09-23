/**
 * Directory Class
 * Author: Patricio Ferreira
 **/

var fs = require('fs'),
    path = require('path'),
    Backbone = require('backbone'),
    classUtil = require('../util/class'),
    _ = require('underscore');
    
var Directory = Backbone.Base.extend({
    
    initialize: function() { },
    
    walk: function(dir, exclude) {
        var results = [];
        var files = fs.readdirSync(path.resolve(dir));
        for(var i = 0; i < files.length; i++) {
            if(files[i].indexOf('.DS_Store') == -1) {
                var filep = path.resolve(dir + "/" + files[i]);
                var fstats = fs.statSync(filep);
                if(fstats && fstats.isDirectory()) {
                    if(exclude) {
                        if(!this.fileContains(files[i], exclude)) {
                            results = results.concat(this.walk(filep)); 
                        }
                    } else {
                        results = results.concat(this.walk(filep)); 
                    }
                } else {
                    results.push(filep);
                }
            }
        }
        return results;
    },
    
    fileContains: function(str, arr) {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i].indexOf(str) != -1) return true;
        }
        return false;
    }
    
});

module.exports = new Directory();