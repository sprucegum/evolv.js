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

ConnectionManager = function(serverRoot){
	this.serverRoot = serverRoot;

};

ConnectionManager.prototype.returnJSON = function(ajaxEvent){
	//console.log("jsonString",ajaxEvent);
	return JSON.parse(ajaxEvent.currentTarget.response);
};

ConnectionManager.prototype.getJSON = function(jsonObj, callback){
	var rq = new XMLHttpRequest();
	rq.open("GET", this.serverRoot + "?jtk=true&data=" + JSON.stringify({jtkConnection:true,data:jsonObj}), 1);
	rq.onloadend = callback;
	rq.send();
};

ConnectionManager.prototype.postJSON = function(jsonObj, callback){
	var rq = new XMLHttpRequest();
	rq.open("POST", this.serverRoot + JSON.stringify(jsonObj), 1);
	rq.onloadend = callback;
	rq.send();
};

// Takes a list of windows and sets the dimensions of each window 
// 

WindowManager = function (canvas) {
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.padding = 50;
	this.conMan = new ConnectionManager('/');
	
}
WindowManager.prototype.start = function(){
	var winset = this.getWindowSet("main_page");
};

WindowManager.prototype.getWindowSet = function(set_name){
	//this.conMan.getJSON	
	var request_object = {command:"get_set",set:set_name};
	var winman = this;
	return this.conMan.getJSON(request_object,function (resp){
		winman.buildWindows(winman.conMan.returnJSON(resp))
	});
}

WindowManager.prototype.buildWindows = function(jsonList){
	var win = null;
	var cursor = [0,0]; // x, y
	var cellsize = [0,0]; // width, height
	var canvas = this.canvas;
	console.log("jsonList",jsonList);
	// Major rows
	for (var i = 0; i<jsonList.length; i++) {
	   	//console.log("i", i);
		// columns
		for (var j = 0; j<jsonList[i].length; j++){
		    	//console.log("j",j);
			console.log(jsonList[i][j]);
			cellsize[0] = canvas.width/jsonList[i].length;
			cellsize[1] = canvas.height/jsonList.length;
			win = this.buildWindow(
				jsonList[i][j],
				cellsize[0] - 2*this.padding,
				cellsize[1] - 2*this.padding,
				cursor[0] + this.padding,
				cursor[1] + this.padding
			);
			if (win){
				canvas.dispList.list[0].addChild(win);
								
			}
			cursor[0] += cellsize[0];
		}
		cursor[0] = 0;
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
	window = new textLine(windowJSON.text,x,y,64);
	window.draggable = true;
    }

    return window;


};
