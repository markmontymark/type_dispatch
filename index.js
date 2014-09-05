// type-dispatch.js 0.0.1
//
// multi-method dispatch for JavaScript based on argument TYPES, not values
// depends on:
// 	 - multimethod 
// 	 - and my internal version of typeof 

(function() {
	/*global define*/
	"use strict";

	// from typeof
	var toString = Object.prototype.toString;
	var typeOfAsObject = function(object) {
		var type = typeof object;
		if (type === 'undefined') {
			return 'undefined';
		}

		if (object && object.constructor){
				type = object.constructor;
		} 
		else if (type === 'object') {
			type = toString.call(object).slice(8, -1);
		}
		return type;//.toLowerCase();
	};

	var arg_type_dispatch = function(list){
		var retval = [];
		for(var i=0,len=list.length; i < len ; i++){
			if(list[i] === null){
				retval.push(null);
			} 
			else if(list[i] === undefined){
				retval.push(undefined);
			}
			else {
				retval.push(typeOfAsObject(list[i]));
			}
		}
		console.log("args: ",retval);
		return retval;
	};

	var exported = function() { 
		var	retval = multimethod().dispatch(function(){
			return arg_type_dispatch(arguments);
		});
		// For now, require arguments.length % 2 === 0
		for(var i=0,len=arguments.length; i < len; i+=2){
			retval.when(arguments[i],arguments[i+1]);
		}
		return retval;
	};


	// The following snippet courtesy of underscore.js and multimethod.js
	// Export `type_dispatch` to the window/exports namespace.
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = exported;
			var multimethod = require('multimethod');
		}
		exports.exported = exported;
	} else if (typeof define === 'function' && define.amd) {
		define('type_dispatch', function() {
			return exported;
		});
	} else {
		this.type_dispatch = exported;
		var multimethod = this['multimethod'];
	}

	exported.version = '0.0.1';

}).call(this);
