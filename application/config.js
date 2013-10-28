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
                host: process.env.IP,
                port: process.env.PORT,
                db: 'dimention-dev',
                user: 'kuakman',
                pass: 'letmein'
            },
            dbconnector: {
                engine: 'mongodb',
                scanPaths: ['application/models', 'application/services'],
                options: {
                    autoreconnect: true,
                    poolSize: 5,
                    safe: true       
                }
            }
        },
        stage: {
            skipTest: false,
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
                scanPaths: ['application/models', 'application/services'],
                options: {
                    autoreconnect: true,
                    poolSize: 5,
                    safe: true       
                }
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