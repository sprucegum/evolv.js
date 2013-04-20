// Creature Related Classes

organNode = function(parent,fsT,bsT,ffT,fbT){ 
	// Takes as input the parent, as well as the
	//Forward and Backward signal tables, function tables
	this.children = [];
	this.parent = parent;
	this.forwardSignal = 0.0;
	this.backwardSignal = 0.0;
	this.fsignTable = ;
}

organNode.prototype.run = function(){

}

signalLUT = function(lut){
	// Look up table is sorted list	
	// typical look up list = [[0,0],[1,4],...,[8.0,4.0]];
	this.lut = lut;
	this.bitdepth = this.getBitDepth();
	
}

signalLUT.prototype.lookUp = function(signal){
	//Binary Search through table, produce linear interpolation
}

signalLUT.prototype.addReaction = function(inSignal,outSignal){
	// insert the correct position of the look-up list.

}

signalLUT.prototype.replaceReaction = function(inSignal,outSignal){

}

signalLUT.prototype.lookUp = function(signal){
	//Binary Search through table, produce linear interpolation
}
