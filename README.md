# type_dispatch

Allow a function to dispatch to other function based on argument types

# Usage 

```javascript
var type_dispatch = require('type_dispatch');

function A(){ }
function B(){ this.name = "BBB"; }

A.prototype.method1 = type_dispatch( 
	[],
	function(){
		console.log("no args");
	},

	[String,B],
	function(a_string,instanceOfB){
		console.log("got two args: ", a_string, instanceOfB);
	}
);

var a = new A();
a.method1();
// no args
a.method1("first", new B());
// got two args:  first { name: 'BBB' }

```

# TODO

- If a match on argument types is not found, then nothing is called and no errors are thrown.  This should be configurable.
- If a null or undefined value is passed, then can't determine if that argument should have been of some type.
- allow n-many arrays of types before the function definition, something like:
    
[],
[String],
function(maybeString){}
