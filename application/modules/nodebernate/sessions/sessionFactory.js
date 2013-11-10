/**
 * SessionFactory Class
 * Author: Patricio Ferreira
 * 
 * Description: Polymorphic Factory Class.
 */
 
 var Backbone = require('backbone'),
    _ = require('underscore');
    
var SessionFactory = Backbone.Base.extend({
   
    initialize: function() { throw new Error('SessionFactory cannot be instanciated'); }
    
}, {
    
    NAME: 'SessionFactory',
    
    factories: new Backbone.Collection([]),
    
    addFactory: function(Factory) {
        var f = SessionFactory.factories.findWhere({ type: Factory.NAME });
        if(!f) SessionFactory.factories.add({ type: Factory.NAME, class: Factory }); 
    },
    
    createSession: function(type, config) {
        var Factory = SessionFactory.factories.findWhere({ type: type });
        if(!Factory) throw new Error('Unsupported SessionType. Session Factory not found for the SessionType');
        return Factory.get('class').create(_.extend({}, config));
    }
    
});

module.exports = SessionFactory;