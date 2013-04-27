/*
	Creates, Requests, and Saves window objects

	WindowBuilder
		Takes a JSON Object which describes a window
		then creates a window with those properties

	WindowManager
		Takes a list of JSON Objects, calculates window placement,
		then creates the windows and attaches them to the root window

	ConnectionManager
		controls communications between client and server
	

*/

ConnectionManager = function(){
	

}

ConnectionManager.prototype.returnJSON = function(jsonStr){
	return JSON.parse(json);
}

ConnectionManager.prototype.getJSON = function(jsonObj, callback){
	var rq = new XMLHttpRequest();
	rq.open("GET", JSON.stringify(jsonObj), 1);
	rq.onloadend = callback;
	rq.send();
}

ConnectionManager.prototype.postJSON = function(jsonObj, callback){
	var rq = new XMLHttpRequest();
	rq.open("POST", JSON.stringify(jsonObj), 1);
	rq.onloadend = callback;
	rq.send();
}


