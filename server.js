/**
 * Dimentio Node Test project.
 **/
var http = require('http');
var path = require('path');
var express = require('express');

// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();

router.configure(function() {
    router.set('views', __dirname + '/application/views');
    router.set('view engine', 'jade');
    
    router.use(express.compress());
    router.use(express.bodyParser());
    router.use(express.methodOverride());
    
    router.use(express.static(path.resolve(__dirname, 'client')));
});

var server = http.createServer(router).listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Dimention Node server listening at", addr.address + ":" + addr.port);
});