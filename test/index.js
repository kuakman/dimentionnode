/**
 * Unit Test for Dimention Node
 * Author: Patricio Ferreira
 **/

var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    rimraf = require('rimraf'),
    directory = require(path.resolve('./application/util/directory')),
    _ = require('underscore'),
    colors = require('colors');
    
var UnitTest = _.extend({
    
    basePath: process.cwd(),
    
    initialize: function(opts) {
        opts || (opts = {});
        
        if(!opts.app) throw new Error('UnitTest class requires a reference to the application \'app\'.');
        if(opts.basePath) this.basePath = opts.basePath;
        
        this.app = opts.app;
        
        /** Validation wrapper **/
        this.onJSCoverageCompleted = _.wrap(this.onJSCoverageCompleted, _.bind(this.onProcessError, this));
        this.onSpecReportCompleted = _.wrap(this.onSpecReportCompleted, _.bind(this.onProcessError, this));
        this.onProcessCompleted = _.wrap(this.onProcessCompleted, _.bind(this.onProcessError, this));
        
        return this;
    },
    
    run: function(callback) {
        if(process.env.NODE_SKIP_TEST === true) {
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
        console.log('Building Coverage...'.underline.yellow);
        var jscovCmd = 'jscoverage --no-highlight application application-cov';
        exec(jscovCmd, _.bind(this.onJSCoverageCompleted, this));
    },
    
    /** Handlers **/
    
    onJSCoverageCompleted: function(error, stdout, stderr) {
        console.log('Coverage Done.'.underline.yellow);
        console.log('Running Mocha SPEC...'.underline.yellow);
        var files = directory.walk(__dirname);
        var mochaCmd = 'export UNIT_TEST=1; mocha -R spec -c -t 5000 -u bdd ' + files.join(' ');
        exec(mochaCmd, _.bind(this.onSpecReportCompleted, this));
    },
    
    onSpecReportCompleted: function(error, stdout, stderr) {
        console.log(stdout.cyan);
        console.log('Mocha SPEC Done.'.underline.yellow);
        console.log('Running Mocha HTML-COV...'.underline.yellow);
        var files = directory.walk(__dirname);
        var mochaCmd = 'export UNIT_TEST=1; mocha -R html-cov -c -t 5000 -u bdd ' + files.join(' ') + " --coverage > public/coverage/coverage.html";
        exec(mochaCmd, _.bind(this.onProcessCompleted, this));
    },
    
    onProcessCompleted: function(error, stdout, stderr) {
        console.log(stdout.cyan);
        console.log('Mocha HTML-COV Done.'.underline.yellow);
        this.callcack();
    },
    
    onProcessError: function(wrappedFunc, error, stdout, stderr) {
        console.log('onProcessError args: ', arguments);
        if(error) {
            console.log(stdout.red);
            process.exit();
        }
        wrappedFunc.apply(this, [error, stdout, stderr]);
    }
    
});

module.exports = UnitTest;