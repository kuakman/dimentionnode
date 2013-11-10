/**
 * Session Class
 * Author: Patricio Ferreira
 */
 
var Backbone = require('backbone'),
    _ = require('underscore');
    
var Session = Backbone.Base.extend({
    
    /**
     * Connector Object.
     */
    connector: null,
    
    /**
     * Constructor
     */
    initialize: function() {
        this.validate();
        this.parse();
        this.set('currentSession', null);
        this.set('connected', false);
    },
    
    /**
     * Validate configuration object.
     */
    validate: function() { },
    
    /**
     * Parse config object.
     */
    parse: function() { },
    
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
    isSessionOpened: function() {
        return this.get('connected');
    },
    
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