/**
 * Home Route
 * Author: Patricio Ferreira
 **/
 
var Router = require('./index').Router,
    _ = require('underscore');
    
var Home = Router.extend({
    
    name: 'home',
    
    viewPath: 'home/',
    
    routes: [
        { key: '/', verb: 'get', method: 'home' }
    ],    
    
    initialize: function(opts) {
        Home.__super__.initialize.apply(this, arguments);
    },
    
    home: function(req, res) {
        this.render(req, res, this.name, { viewPath: this.viewPath });
    }
    
});

module.exports = Home;