"use strict";

var type_dispatch = require('..');

function A(){
}

function B(){
	this.name = "BBB";
}

A.prototype.method1 = type_dispatch( 

	[],
	function(){
		console.log("no args");
	},

	//TODO when, null and undefined values passed in, can't discern type
	[null],
	function(n){
		console.log("got one null arg: ", n);
	},

	//TODO when, null and undefined values passed in, can't discern type
	[undefined],
	function(n){
		console.log("got one undefined arg: ", n);
	},

	[Number],
	function(n){
		console.log("got one arg: ", n);
	},

	[String,B],
	function(a_string,instanceOfB){
		console.log("got two args: ", a_string, instanceOfB);
	}
);

var a = new A();
a.method1();
a.method1(2);
a.method1(null);
a.method1(undefined);
a.method1("first", new B());
