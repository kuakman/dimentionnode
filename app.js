/**
 * Dimention Node Project.
 **/
var http = require('http');
var express = require('express');
var path = require('path');
var colors = require('colors');
var Backbone = require('backbone');
var _ = require('underscore');
var _s = require("underscore.string");
var classUtil = require('./application/util/class');

var config = require('./application/config').environments['development']; // c9.io doesn't support environment variables like 'process.env.NODE_ENV'...
var Router = require('./application/routes');

/** Process for lunching the application **/

var Store = require('./application/modules/store');
var Test = require('./test');
var Build = require('./build');
var LiveEdit = require('./application/modules/liveedit');

var router = express();

/**
 * 1) Database Connection (ORM - Annotations)
 * 2) Run UnitTesting (Integration with Store)
 *      - JSCoverage
 *      - Mocha Spec
 *      - Mocha HTML-COV
 * 3) Run Build Process
 *      - Stylesheets compilation with Sass preprocesor (ruby -> sass)
 *      - Build JS bundles for public
 *      - Ofuscate JS Bundles
 *      - Minify CSS and JS Bundles
 **/

Store.initialize(config, process.cwd() + '/application/modules/' , _.bind(function() {
    
    Test.run(router, config).run(_.bind(function() {
    
        Build.run(_.bind(function() {
            
            router.configure(function() {
                router.set('views', __dirname + '/application/views');
                router.set('view engine', 'jade');
                
                router.use(express.compress());
                router.use(express.bodyParser());
                router.use(express.methodOverride());
                router.enable('strict routing');
                
                /** Add Routes Here **/
                Router.configure(router);
                
                /** Libraries added by default into the jade template engine **/
                router.locals._ = _;
                router.locals._s = _s;
                
                router.use(express.static(path.resolve(__dirname, 'public')));
            });
            
            router.configure('development', function() {
                console.log('Running on Development Environment...'.bold.green);
                router.use(express.logger('dev'));
                router.use(express.errorHandler({ dumExceptions: true, showStack: true }));
            });
            
            router.configure('production', function() {
                console.log('Running on Production Environment...'.bold.green);
                router.use(express.errorHandler());
            });
            
            var server = http.createServer(router).listen(process.env.PORT, process.env.IP, function() {
                /** LiveEdit **/
                if(config.liveedit) LiveEdit.launch({ server: server });
                
                var addr = server.address();
                var output = "Dimention Node server listening at " + addr.address + ":" + addr.port;
                console.log(output.bold.green);
            });
            
        }));
        
    }));
    
}));