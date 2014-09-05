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
a.method1("first", new B());
```
