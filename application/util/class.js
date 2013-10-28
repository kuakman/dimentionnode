/**
*	Class utils
*	Author: Patricio Ferreira
**/

var	Backbone = require('backbone'),
	_ = require('underscore');

//Helper function to get a value from a Backbone object as a property
//or as a function.
var getValue = function(object, prop) {
	if (!(object && object[prop])) return null;
	return _.isFunction(object[prop]) ? object[prop]() : object[prop];
};

// Helper function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var extend = function(protoProps, staticProps) {
	var parent = this;
	var child;

	// The constructor function for the new subclass is either defined by you
	// (the "constructor" property in your `extend` definition), or defaulted
	// by us to simply call the parent's constructor.
	if (protoProps && _.has(protoProps, 'constructor')) {
	  child = protoProps.constructor;
	} else {
	  child = function(){ return parent.apply(this, arguments); };
	}
	
    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

	// Set the prototype chain to inherit from `parent`, without calling
	// `parent`'s constructor function.
	var Surrogate = function(){ this.constructor = child; };
	Surrogate.prototype = parent.prototype;
	child.prototype = new Surrogate;

	// Add prototype properties (instance properties) to the subclass,
	// if supplied.
	if (protoProps) _.extend(child.prototype, protoProps);

	// Set a convenience property in case the parent's prototype is needed
	// later.
	child.__super__ = parent.prototype;

	return child;
};

/** Base Class **/

var Base = Backbone.Base = function(attr) {
	attr || (attr = {});
    
    this.attributes = _.extend({}, attr);
	this.set(attr);
    
	this.initialize.apply(this, arguments);
};

_.extend(Backbone.Base.prototype, Backbone.Events, {

	/**
	 * Sets the value of an attribute.
	 * If any value is passed it replaces the whole attributes object.
	 */
	set: function(key, value, opts) {
        opts = (opts) || {};
        (!_.isUndefined(opts.replaceAll)) || (opts.replaceAll = true);
        this.previous = { key: key, value: this.attributes[key] };
        
		if( _.isObject(key) || key === null) {
			if (opts.replaceAll) {
				this.attributes = key;
			} else {
				this.attributes = _.extend({}, this.attributes, key);
			}
		} else {
			this.attributes[key] = value;
		}
	},

	/**
	 * Returns an attribute from the instance class if a key is specified.
	 * If the key is not present, returns the whole attributes object.
	 */
	get: function(key) { 
		return (_.isUndefined(key)) ? this.attributes : this.attributes[key];
	},
	
	/**
	 * Returns if an attributes has changed since the last set.
	 */
	hasChanged: function(key, value) {
        return (this.previous[key] != value);
	},
	
	/**
	 * To Override in the subclasses
	 */
	_validate: function(attrs, options) {
        return true;
	}
});

Base.extend = extend;

module.exports.Base = Base;