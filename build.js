/**
 * Build Process
 * Author: Patricio Ferreira
 **/
 
 var path = require('path'), 
    DBConnector = require('./application/modules/mongodb-connector');
 
 exports.build = function(callback) {
    /** FIXME: Make it recursive **/
    DBConnector.initialize(path.resolve('application/model/model.js'));
    callback();
    
 };