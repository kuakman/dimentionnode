/**
 * Dimention Node Project.
 **/
var http = require('http');
var path = require('path');
var express = require('express');
var UnitTest = require('./test');
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
        
        /** Add Routes Here **/
        
        /** Libraries added by default into the jade template engine **/
        router.locals._ = _;
        router.locals._s = _s;
        
        router.use(express.static(path.resolve(__dirname, 'public')));
    });
    
    router.configure('development', function() {
        console.log('Running on Development Environment...');
        router.use(express.errorHandler({ dumExceptions: true, showStack: true }));
    });
    
    router.configure('production', function() {
        console.log('Running on Production Environment...');
        router.use(express.errorHandler());
    });
    
    var server = http.createServer(router).listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
      var addr = server.address();
      console.log("Dimention Node server listening at", addr.address + ":" + addr.port);
    });
    
}, this));