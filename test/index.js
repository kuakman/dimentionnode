/**
 * Unit Test for Dimention Node
 * Author: Patricio Ferreira
 **/

var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    rimraf = require('rimraf'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    directory = require(path.resolve('./application/util/directory')),
    colors = require('colors');
    
var UnitTest = Backbone.Base.extend({
    
    basePath: process.cwd(),
    
    initialize: function(opts) {
        opts || (opts = {});
        
        if(!opts.app) throw new Error('UnitTest class requires a reference to the application \'app\'.');
        if(opts.basePath) this.basePath = opts.basePath;
        if(opts.config.skipTest) this.skip = opts.config.skipTest;
        
        this.app = opts.app;
        
        /** Validation wrapper **/
        this.onJSCoverageCompleted = _.wrap(this.onJSCoverageCompleted, _.bind(this.onProcessError, this));
        this.onSpecReportCompleted = _.wrap(this.onSpecReportCompleted, _.bind(this.onProcessError, this));
        this.onProcessCompleted = _.wrap(this.onProcessCompleted, _.bind(this.onProcessError, this));
    },
    
    run: function(callback) {
        if(this.skip) {
            console.log('Skipping Unit Testing...'.yellow);
            callback();
            return;
        } else {
            this.callback = callback;
        }
        console.log('Initializing UnitTesting...'.cyan);
        this.clean();
        this.execute();
    },
    
    clean: function() {
        try {
            if(fs.existsSync(this.basePath + "/application-cov/")) rimraf.sync(this.basePath + "/application-cov/");
            if(fs.existsSync(this.basePath + "/public/coverage/coverage.html")) fs.unlinkSync(this.basePath + '/public/coverage/coverage.html');
        } catch(ex) {
            console.log(ex.message.red);
            return;
        }
    },
    
    execute: function() {
        console.log('    Building Coverage...'.yellow);
        // FIXME: Exclude list for JScoverage
        var jscovCmd = 'jscoverage --no-highlight application application-cov --exclude ./application/util/class.js,./application/util/directory.js';
        exec(jscovCmd, _.bind(this.onJSCoverageCompleted, this));
    },
    
    /** Handlers **/
    
    onJSCoverageCompleted: function(error, stdout, stderr) {
        console.log('    Running Mocha SPEC...'.yellow);
        var files = directory.walk(__dirname, [__filename]);
        if(files.length > 0) {
            var mochaCmd = 'export UNIT_TEST=1; mocha -R spec -c -t 5000 -u bdd ' + files.join(' ');
            exec(mochaCmd, _.bind(this.onSpecReportCompleted, this));
        } else {
            this.onSpecReportCompleted(null, 'No Unit Test found.', '');
        }
    },
    
    onSpecReportCompleted: function(error, stdout, stderr) {
        console.log(('    ' + stdout).magenta);
        console.log('    Running Mocha HTML-COV...'.yellow);
        var files = directory.walk(__dirname, [__filename]);
        if(files.length > 0) {
            var mochaCmd = 'export UNIT_TEST=1; mocha -R html-cov -c -t 5000 -u bdd ' + files.join(' ') + " --coverage > public/coverage/coverage.html";
            exec(mochaCmd, _.bind(this.onProcessCompleted, this));
        } else {
            this.onProcessCompleted(null, '', '');
        }
    },
    
    onProcessCompleted: function(error, stdout, stderr) {
        console.log('UnitTesting Completed.\n'.cyan);
        this.callback();
    },
    
    onProcessError: function(wrappedFunc, error, stdout, stderr) {
        if(error) {
            console.log(stdout.red);
            process.exit();
        }
        wrappedFunc.apply(this, [error, stdout, stderr]);
    }
    
});

exports.run = function(router, config) {
    return new UnitTest({ app: router, config: config });
};