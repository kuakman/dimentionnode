/**
 * MongoDBSession Class
 * Author: Patricio Ferreira
 */
 
var Session = require('../session'),
    SessionFactory = require('../sessionFactory'),
    mongo = require('mongoskin'),
    _ = require('underscore');
    
var MongodbSession = Session.extend({
    
    initialize: function() {
        MongodbSession.__super__.initialize.apply(this, arguments);
    },
    
    /**
     * @Override Session.open();
     * Implementation for MongoDB driver.
     */
    open: function() {
        
    },
    
    /**
     * @Override Session.close();
     * Implementation for MongoDB driver.
     */
    close: function() {
        
    },
    
    /**
     * @Override Session.isSessionOpened();
     * Implementation for MongoDB driver.
     */
    isSessionOpened: function() {
        
    }
    
}, {
    
    NAME: 'MongodbSession',
    
    create: function() {  return new MongodbSession(); }
    
});

SessionFactory.addFactory(MongodbSession);