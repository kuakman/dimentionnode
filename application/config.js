/**
 * Config File for dimention node.
 * Author: Patricio Ferreira
 **/

var config = {
    environments: {
        development: {
            debug: true,
            liveedit: true,
            store: {
                host: process.env.IP,
                port: process.env.PORT,
                db: 'dimention-dev',
                user: 'kuakman',
                pass: 'letmein'
            },
            dbconnector: {
                driver: 'mongodb-connector',
                scanPaths: ['application/models', 'application/services'],
                options: {
                    autoreconnect: true,
                    poolSize: 5,
                    safe: true       
                }
            }
        },
        stage: {
            debug: true,
            liveedit: false,
            store: {
                host: process.env.IP,
                port: process.env.PORT,
                db: 'dimention-stage',
                user: 'kuakman',
                pass: 'letmein'
            },
            dbconnector: {
                driver: 'mongodb-connector',
                scanPaths: ['application/models', 'application/services'],
                options: {
                    autoreconnect: true,
                    poolSize: 5,
                    safe: true       
                }
            }
        },
        production: {
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