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
	

};

ConnectionManager.prototype.returnJSON = function(jsonStr){
	return JSON.parse(json);
};

ConnectionManager.prototype.getJSON = function(jsonObj, callback){
	var rq = new XMLHttpRequest();
	rq.open("GET", JSON.stringify(jsonObj), 1);
	rq.onloadend = callback;
	rq.send();
};

ConnectionManager.prototype.postJSON = function(jsonObj, callback){
	var rq = new XMLHttpRequest();
	rq.open("POST", JSON.stringify(jsonObj), 1);
	rq.onloadend = callback;
	rq.send();
};

// Takes a list of windows and sets the dimensions of each window 
// 

WindowManager = function (canvas, jsonList) {
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.jsonList = jsonList;
	this.padding = 10;
	var win = null;
	var cursor = [0,0]; // x, y
	var cellsize = [0,0]; // width, height
	// Major rows
	for (var i = 0; i<jsonList.length; i++) {
	   	//console.log("i", i);
		// columns
		for (var j = 0; j<jsonList[i].length; j++){
		    	//console.log("j",j);
			console.log(jsonList[i][j]);
			cellsize[0] = canvas.width/this.jsonList[i].length;
			cellsize[1] = canvas.height/this.jsonList.length;
			win = this.buildWindow(
				jsonList[i][j],
				cellsize[0]+this.padding,
				cellsize[1]+this.padding,
				cursor[0] - 2*this.padding,
				cursor[1] - 2*this.padding
			);
			if (win){
				canvas.dispList.list[0].addChild(win);
				
				cursor[0] += cellsize[0];
				
			}
			
		}
		cursor[1] += cellsize[1];
	    
	}
}


// Constructs Windows from JSON objects
/*
{"type":"textWindow","title":"Hello World", "text":"Hut one, hut two, hut three, HUT!"}
{"type":"textLine", "text":"Old Dirty Bastard"}

*/

WindowManager.prototype.buildWindow = function(windowJSON, width, height, x, y ) {
    var window = null;
    if (windowJSON.type == "textWindow"){
	console.log("textWin!");
	window = new textWindow(windowJSON.title,windowJSON.text,x,y,width, height);
    } else if (windowJSON.type == "textLine"){
	console.log("textLine!");
	window = new textLine(windowJSON.text,x,y,height);
    }

    return window;


};
