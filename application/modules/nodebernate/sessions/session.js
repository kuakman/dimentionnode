/**
 * Session Class
 * Author: Patricio Ferreira
 */
 
var Backbone = require('backbone'),
    _ = require('underscore');
    
var Session = Backbone.Base.extend({
    
    /**
     * Constructor
     */
    initialize: function() {
        this.set('currentSession', null);
    },
    
    /**
     * Open new Session connection.
     */
    open: function() { },
    
    /**
     * Close current Session Connection.
     */
    close: function() { },
    
    /**
     * Returns true if current session to the DB is opened, otherwise false.
     */
    isSessionOpened: function() { },
    
    /**
     * Returns the current Session reference.
     */
    getSession: function() { return this.get('currentSession'); }
    
}, {
    
    NAME: 'Session',
    
    create: function() {
        throw new Error('Static Session.create() method must be overriden in subclasses.');
    }
    
});

module.exports = Session;