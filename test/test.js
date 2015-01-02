"use strict";

/*global describe,it*/

var assert = require('assert');
var util = require('util');
var type_dispatch = require('..');

function A(){
}

function B(){
	this.name = "BBB";
}

A.prototype.method1 = type_dispatch(

	[],
	function(){
		return util.format("no args");
	},

	//TODO when, null and undefined values passed in, can't discern type
	[null],
	function(n){
		return util.format("got one null arg: ", n);
	},

	//TODO when, null and undefined values passed in, can't discern type
	[undefined],
	function(n){
		return util.format("got one undefined arg: ", n);
	},

	[Number],
	function(n){
		return util.format("got one arg: ", n);
	},

	[String,B],
	function(a_string,instanceOfB){
		return util.format("got two args: ", a_string, instanceOfB);
	}
);

describe('type_dispatch',function(){
  it('A should handle 5 different function signatures',function(){
    var a = new A();
    assert.equal(a.method1(),'no args');
    assert.equal(a.method1(2),'got one arg:  2');
    assert.equal(a.method1(null),'got one null arg:  null');
    assert.equal(a.method1(undefined),'got one undefined arg:  undefined');
    assert.equal(a.method1("first", new B()),"got two args:  first { name: 'BBB' }");
  });
});
