// hoffy.js
/*
Sonam Tailor 
Homework #2
*/

//This function returns the sum of the arguments as a Number
function sum(num1, num2, ... numn){
	//the sum of no arguments is 0 
	if (arguments.length === 0){
		//console.log("0")
		return 0;
	}
	//one argument passed so the sum is just the number 
	if(arguments.length === 1){
		return num1;
	}
	if (arguments.length === 2){
		//console.log("2")
		return num1 + num2;
	}
	//let result;
	return num1 + num2 + numn.reduce((sum, num) => {
		return sum + num;
	});
}

//This function calls function fn, n times passing in the argument, arg to each invocation
//no return value 
function callFn(fn, n, arg){
	if(n!==0){
		fn(arg);
		callFn(fn, n-1, arg);
	}

}

//function repeatedly calls fn n times and has a variable number of arguments 
function betterCallFn(fn, n, args1, ... argsn){
	if(n!==0){
		fn(args1, ... argsn); //spread
		betterCallFn(fn, n-1, args1, ... argsn); //rest
	}
}

//This function behaves the same way as the original function, but it returns the opposite value 
//that the original function would have returned 
function opposite(oldFn){
	return function newfunct(...args){
		const result = oldFn(...args);
		return !result;
	};
	//return newfunct;
}

//returns an array containing two arrays - one with all elements that passed the tes, and the other with all the elements that did not pass 
function bucket(arr, fn){
	const passed = arr.filter(val => fn(val));
	const failed = arr.filter(val => !fn(val));

	const result = [];
	result.push(passed);
	result.push(failed);
	return result;
}

//returns a function that has one extra parameter more than oldFn --> determines whether oldFn should be run
function addPermissions(oldFn){
	function newFunct(object, ...args){
		if(object === null || object === undefined){
			return undefined;
		}
		else if (object.admin === true){
			return oldFn(...args);
		}
		else{
			return undefined;
		}
	}
	return newFunct;

}

//this function is an alternative interface to fs.readFile function
function myReadFile(fileName, successFn, errorFn){
	const fs = require('fs');
	fs.readFile(fileName, 'utf-8', function read(err, data){
		//error - pass err to the error function
		if (err){
			return errorFn(err);
		}
		//success - pass data in to the successFn function
		else{
			return successFn(data);
		}
	});
}

//returns a new function that has three parameters - calls the extractor function to manipulate the data being fed into the success callback 
function readAndExtractWith(extractor){
	const fs = require('fs');
	function myFunct(fileName, successFn, errorFn){
		fs.readFile(fileName, 'utf-8', function read(err, data){
			if(err){
				return errorFn(err);
			}
			else{
				return successFn(extractor(data));
			}
		});
	}
	return myFunct;
}

//returns an array of objects with the original headers (column names) as properties and 
//values taken from the original data in each row that aligns with the column name 
function rowsToObjects(data){
	const arr =[];
	const headers = data.headers;
	const rows = data.rows; //a 2D array --> we want the first list of rows 
	//first parameter is the value of the row and second parameter is the row #
	rows.map(function(val,row){
		const dict = {};
		//first parameter is the actual curr header and seocnd is col number
		headers.map(function(head, col){
			dict[head] = rows[row][col];
		});
		arr.push(dict);
	});

	return arr;
}
module.exports = {
    sum: sum,
    callFn: callFn,
    betterCallFn: betterCallFn,
    opposite: opposite,
    bucket: bucket,
    addPermissions: addPermissions,
    myReadFile: myReadFile,
    readAndExtractWith: readAndExtractWith,
    rowsToObjects: rowsToObjects,

    // ...
};


//Code for Testing 
//console.log(sum(89, 1, 6, 4, 5));
//console.log(sum(1, 2, 3));
//console.log(sum(1, 1, 1, 1, 1, 1, 1, 1, 1, 1));
//console.log(sum(1));
//console.log(sum());
//callFn(console.log, 2, "foo", "bar", "baz", "qux", "quxx", "corge");
//betterCallFn(console.log, 2, "foo", "bar", "baz", "qux", "quxx", "corge");
//console.log(opposite(oldFn));
// const numbers = [1, 7, 2, 5, 30];
// const [evens, odds] = bucket(numbers, n => n % 2 === 0);
// console.log('odds', odds, '| evens', evens);
// const getWords = (s) => s.trim().split('\n').reduce((words, line) => [...words, ...line.split(' ')], []);
// const f = readAndExtractWith(getWords);
// const success = (data) => console.log(data); 
// const failure = (err) => console.log('Error opening file:', err);

// console.log(f('tests/bruh.txt', success, failure));

 // const headers = ['a', 'b', 'c'];
 // const rows = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
 // const result = rowsToObjects({headers, rows});
 //console.log(result);

