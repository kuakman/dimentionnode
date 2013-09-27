/**
 * Config File for dimention node.
 * Author: Patricio Ferreira
 **/

var config = {
    enviroments: {
        dev: {
            debug: true,
            liveedit: true,
            store: {
                host: process.env.IP,
                port: process.env.PORT,
                db: 'dimention-dev',
                user: 'kuakman',
                pass: 'letmein'
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
            }
        },
        production: {
            debug: false,
            liveedit: false
        }
    }
};

module.exports = config;