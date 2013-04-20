/*
	Effect Class
*/

effectKernel = function(kernel){
			this.kernel = kernel;
			this.effList = [];
		};	
effectKernel.prototype.run = function(context,parent){
	this.kernel(context,parent);
};
		
tweener = function(start, stop, time){
	this.value;
	this.kernel = null;
}
effectKernel.prototype.run = function(){
	this.kernel();
};
