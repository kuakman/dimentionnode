/**
 * Router Class
 * Author: Patricio Ferreira
 **/
 
 var Backbone = require('backbone'),
    _ = require('undercore');
    
var Router = Backbone.Base.extend({
  
    basePath: process.cwd(),
  
    initialize: function(opts) {
        opts || (opts = {});
      
        if(!opts.app) throw new Error('Router Class requires an instance of express application to be able to run.');
        if(opts.basePath) this.basePath = opts.basePath;
        this.app = opts.app;
    },
  
    process: function() {
        
    },
  
    render: function() {
        
    }
    
});

/**
 * Process All routers.
 **/
exports.configure = function(basepath) {
    
};

module.exports = Router;