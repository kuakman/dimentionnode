/**
 * Config File for dimention node.
 * Author: Patricio Ferreira
 **/

var config = {
    environments: {
        development: {
            skipTest: true,
            debug: true,
            liveedit: true,
            store: {
                authentication: {
                    db: 'dimention-dev',
                    user: 'kuakman',
                    pass: 'letmein'
                },
                replicaSet: {
                    host: process.env.IP,
                    port: process.env.PORT
                },
                options: {
                    autoreconnect: true,
                    poolSize: 5,
                    safe: true
                }
            },
            dbconnector: {
                engine: 'mongodb',
                scanPaths: ['application/models', 'application/services']
            }
        },
        stage: {
            skipTest: false,
            debug: true,
            liveedit: false,
            store: {
                replicaSet: {
                    host: process.env.IP,
                    port: process.env.PORT,
                    autoreconnect: true,
                    poolSize: 5
                },
                options: {
                    db: 'dimention-dev',
                    user: 'kuakman',
                    pass: 'letmein',
                    safe: true       
                }
            },
            dbconnector: {
                scanPaths: ['application/models', 'application/services']
            }
        },
        production: {
            skipTest: false,
            debug: false,
            liveedit: false,
            store: { },
            dbconnector: {
                driver: 'couchdb-connector',
                options: { }
            }
        }
    }
};

module.exports = config;