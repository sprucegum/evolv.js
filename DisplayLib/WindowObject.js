/* 
 Window object primitive class and methods
 Requires ListObjects
*/

windowObject = function(parent){
	this.x = this.y = this.height = this.width = this.z = 0;
	this.color = "#203";
	this.outline = "#406";
	this.model = null;
	this.dispList = new displayList(this);
	this.runList = new runList(this);
	this.draggable = false;
	this.dragging = false;
	this.resizing = false;
	this.parent = parent;
	this.gx = 0;
	this.gy = 0;
	this.minwidth = this.minheight = 0;
	this.clickable = true;

};
windowObject.prototype.addChild = function(child) {
	this.runList.add(child);
	this.dispList.add(child);
};
windowObject.prototype.decorate = function(){
	this.resizer = new windowObject(this);
	this.resizer.draggable = true;
	this.resizer.resizeable = true;
	this.resizer.x = this.width - 18;
	this.resizer.y = this.height - 18;
	this.resizer.width = 16;
	this.resizer.height = 16;
	this.resizer.resize = function(){};
	this.dispList.list.push(this.resizer);
	this.runList.list.splice(0,0,this.resizer);
};
windowObject.prototype.resize = function(){

	this.width += mouse.dx;
	this.height += mouse.dy;

	
}

windowObject.prototype.draw = function(context) {
	//console.log(this,context);
	context.fillStyle = this.outline;
	context.fillRect(this.gx-2,
			 this.gy-2,
			this.width+4,
			this.height+4
	);
	context.fillStyle = this.color;
	context.fillRect(this.gx,
			 this.gy,
			this.width,
			this.height
	);

	this.dispList.draw(context);
};
windowObject.prototype.mouseDetect = function(){

	if ((this.gx < mouse.x) && (this.gy < mouse.y)) {
		if (((this.gx+this.width) > mouse.x) && ((this.gy+this.height) > mouse.y)){
			return true;
		}
	}
	return false;			
}
windowObject.prototype.xy = function(){
	var x = this.x;
	var y = this.y;
	if (this.parent){
		x = this.parent.gx + this.x;
		y = this.parent.gy + this.y;
	}
	this.gx = x;
	this.gy = y;
}




windowObject.prototype.run = function(){
	//console.log(this);

	if (this.draggable && this.dragging){
		this.x = this.x + mouse.dx;	
		this.y = this.y + mouse.dy;	
	} 
	if (this.resizeable && this.dragging){
		this.parent.width += mouse.dx;
		this.parent.height += mouse.dy;
		this.parent.resizing = true;
	}
	if (this.parent.resizing){
	
		this.resize();
	}
	this.xy();
	this.resizing = false;
	this.runList.run();
	return true;
}

windowObject.prototype.click = function(e) {
	//console.log(this,mouse.x,mouse.y);
	this.e = e;
	//console.log(e.type);
	
	//console.log(e.which);
	if (e.which == 3){
		e.preventDefault();
	};
	if (this.mouseDetect()){
		//bubble down and interact with topmost object
		//console.log(this);
		if (!this.dispList.click(e)){
			//mousedown
			if (e.type == "mousedown"){
				if (this.draggable){
					this.dragging = true;
					this.parent.dispList.toFront(this);
					console.log(this);
					return true;
				}
			}
			if (e.type == "mouseup"){	
				if (this.dragging){
					this.dragging = false;
					return true;
				}
			};
		}
;

	}
	
	//this.dispList.click(e);
	return false;
};


