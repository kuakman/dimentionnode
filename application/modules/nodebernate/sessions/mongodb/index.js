/**
 * MongoDBSession Class
 * Author: Patricio Ferreira
 */
 
var mongoskin = require('mongoskin'),
    Session = require('../session'),
    SessionFactory = require('../sessionFactory'),
    _ = require('underscore');
    
var MongodbSession = Session.extend({
    
    initialize: function() {
        MongodbSession.__super__.initialize.apply(this, arguments);
        this.set('currentSession', mongoskin.db(this.get('connectionURL')), this.get('options'));
    },
    
    /**
     * @Override Session.parse();
     * Implementation for MongoDB driver.
     */
    parse: function() {
        var stringReplicaSet = 'mongo://';
        stringReplicaSet += this.get('authentication').user + ':' + this.get('authentication').pass + '@';
        stringReplicaSet += _.map(this.get('replicaSet'), function(rpl) {
            var stringURL = rpl.host;
            if(rpl.port !== '') stringURL += ':' + rpl.port;
            return stringURL;
        }, this).join(',');
        stringReplicaSet += '/' + this.get('authentication').db;
        if(this.get('options').autoreconnect) stringReplicaSet += '?autoreconnect=' + this.get('options').autoreconnect;
        if(this.get('options').poolSize) stringReplicaSet += '&poolSize=' + this.get('options').poolSize;
        this.set('connectionURL', stringReplicaSet);
        this.set('options', { safe: (this.get('options').safe) ? this.get('options').safe : false });
    },
    
    /**
     * @Override Session.validate()
     * Implementation for MongoDB driver.
     */
    validate: function() {
        if(!this.get('authentication')) throw new Error('Session requires authentication configuration object in order to be instanciated.');
        if(!this.get('authentication').db || !this.get('authentication').user || !this.get('authentication').pass) throw new Error('Session requires a db, user and pass attributes to be able to connect to a DB');   
        if(!this.get('replicaSet')) throw new Error('Session requires a replicaSet configuration object in order to be instanciated.');
        if(!_.isArray(this.get('replicaSet')) && !_.isObject(this.get('replicaSet'))) throw new Error('replicaSet object must be an object or an Array instance.');
        if(_.isObject(this.get('replicaSet'))) this.set('replicaSet', [this.get('replicaSet')]);
        _.each(this.get('replicaSet'), function(rpl) {
            if(!rpl.host || !rpl.port) throw new Error('Session requires an IP and a PORT in the replicaSet server to be able to connect to a DB');
        }, this);
    },
    
    /**
     * @Override Session.open();
     * Implementation for MongoDB driver.
     */
    open: function(callback) {
        if(this.connector) {
            this.connector.open(_.bind(function() {
                callback.apply(this, arguments);
                this.set('connected', true);
            }, this));
        }
    },
    
    /**
     * @Override Session.close();
     * Implementation for MongoDB driver.
     */
    close: function(force, callback) {
        if(this.connector) {
            this.connector.close(force, _.bind(function() {
                callback.apply(this, arguments);
                this.set('connected', false);
            }, this));
        }
    },
    
    /**
     * TODO:
     */
    router: function(collection, db) { }
    
}, {
    
    NAME: 'MongodbSession',
    
    create: function(config) { return new MongodbSession(config); }
    
});

SessionFactory.addFactory(MongodbSession);