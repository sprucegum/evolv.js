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

Effector = function(x, y, parent, path, kernel, lifetime){
	this.x = x;
	this.y = y;
	this.parent = parent;
	this.path = path;
	this.kernel = kernel;
	this.lifetime = lifetime;
}
Effector.prototype.run = function(){
	if (lifetime > 0){ 
		this.path();
		
	} else {
		this.parent.drawList.list.splice(parent.runningIndex,1);
	}
	
	lifetime--;
}
Effector.prototype.draw = function(){
if (lifetime > 0){ 
		this.kernel();
		
	} else {
		this.parent.runList.list.splice(parent.runningIndex,1);
	}
	
}
