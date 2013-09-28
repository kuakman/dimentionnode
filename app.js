/**
 * Dimention Node Project.
 **/
var http = require('http');
var path = require('path');
var express = require('express');
var config = require('./application/config').environments[process.env.NODE_ENV];
var Router = require('./application/routes');
var UnitTest = require('./test');
var LiveEdit = require('./application/modules/liveedit');
var colors = require('colors');
var _ = require('underscore');
var _s = require("underscore.string");

var router = express();

UnitTest.initialize({ app: router }).run(_.bind(function() {
    
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
        console.log('Running on Development Environment...'.blue);
        router.use(express.logger('dev'));
        router.use(express.errorHandler({ dumExceptions: true, showStack: true }));
    });
    
    router.configure('production', function() {
        console.log('Running on Production Environment...'.blue);
        router.use(express.errorHandler());
    });
    
    var server = http.createServer(router).listen(process.env.PORT, process.env.IP, function() {
        /** LiveEdit **/
        if(config.liveedit) LiveEdit.launch({ server: server });
        
        var addr = server.address();
        var output = "Dimention Node server listening at " + addr.address + ":" + addr.port;
        console.log(output.blue);
    });
    
}));