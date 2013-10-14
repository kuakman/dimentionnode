/**
 * Router Class
 * Author: Patricio Ferreira
 **/
 
 var fs = require('fs'),
    path = require('path'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    _s = require('underscore.string'),
    colors = require('colors');
    
var Router = Backbone.Base.extend({
  
    basePath: process.cwd(),
  
    initialize: function(opts) {
        opts || (opts = {});
      
        if(!opts.app) throw new Error('Router Class requires an instance of express application to be able to run.');
        if(opts.basePath) this.basePath = opts.basePath;
        this.app = opts.app;
        
        this.process();
    },
  
    process: function() {
        if(this.routes) {
            console.log(('    Routes for [' + this.name + ']').bold.magenta);
            _.each(this.routes, function(r) {
                if(this[r.method]) {
                    console.log(('        ' + r.key + ' -> ' + r.verb).yellow);
                    var deps = _.compact(_.map(r.depends, function(m) { 
                        if(_.isFunction(m)) return m;
                        return _.bind(this[m], this);
                    }, this));
                    this.app[r.verb](r.key, deps, _.bind(this[r.method], this));
                }
            }, this);
        }
    },
  
    render: function(req, res, action, opts) {
        opts || (opts = {});
        
        if(!action) throw new Error('\'action\' parameter is required to be able to render the view properly.');
        if(!opts.viewPath) opts.viewPath = '';
        
        var params = _.extend({ action: action, viewPath: opts.viewPath, model: (opts.model) ? opts.model : {} });
        res.render(opts.viewPath + action, params);
    }
    
});

/**
 * Process All routers.
 **/
exports.configure = function(app, basepath) {
    var files = fs.readdirSync((basepath) ? basepath : __dirname);
    console.log('Routing for Dimention Node...'.cyan);
    if(files) {
        _.each(files, function(f) {
            if(f.indexOf('.js') != -1) {
                var rFile = _s.strLeft(f, '.');
                if(rFile != 'index') {
                    var RouteClass = new require(__dirname + '/' + rFile);
                    new RouteClass({ app: app });
                }
            } else {
                console.log("    Ignoring File [" + f + "]...".red);
            }
        }, this);  
    }
    console.log('Routing for Dimention Node Completed.\n'.cyan);
};

exports.Router = Router;