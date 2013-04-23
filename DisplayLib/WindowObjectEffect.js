/*
	Effect Class
*/

Effect = function(kernel){
	this.kernel = kernel;
};	
Effect.prototype.run = function(context,parent){
	this.kernel(context,parent);
};
		
Tweener = function(kernel, start, stop, time){
	this.value = start;
	this.start = start;
	this.stop = stop;
	this.time = time;
	this.kernel = kernel;
}
Tweener.prototype.run = function(){
	this.value = this.kernel();
}

Effector = function(x, y, parent, pather, kernel, lifetime){
	this.clickable = false;
	this.x = x;
	this.y = y;
	this.width = 1;
	this.height = 1;
	this.parent = parent;
	this.pather = pather;
	this.kernel = kernel;
	this.lifetime = lifetime;
}


Effector.prototype.run = function(){
	//console.log(this.lifetime);
	if (this.lifetime > 0){ 
		this.pather.run();
		
	} else {
		//console.log("deleting Effector from runList", this);
		this.parent.runList.list.splice(parent.runningIndex,1);
	}
	
	
}
Effector.prototype.xy = function(){
	return true;
}
Effector.prototype.draw = function(context){
	if (this.lifetime > 0){
			//console.log(this.lifetime); 
			this.kernel(context, this);
		
	} else {
		//console.log("deleting Effector", this);
		this.parent.dispList.list.splice(parent.runningIndex,1);
		effectcount--;
	}
	this.lifetime -= 1;
}

Pather = function(parent, kernel){
	this.parent = parent;
	this.kernel = kernel;	
}
Pather.prototype.run = function(){
	this.kernel(this, this.parent);
}
//continues motion in given direction


