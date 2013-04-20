// Creature Related Classes

organNode = function(parent,fsT,bsT,ffT,fbT){ 
	// Takes as input the parent, as well as the
	//Forward and Backward signal tables, function tables
	this.children = [];
	this.parent = parent;
	this.forwardSignal = 0.0;
	this.backwardSignal = 0.0;
}

organNode.prototype.run = function(){

}

signalLUT = function(lut){
	// Look up table is sorted list	
	// typical look up list = [[0,0],[1,4],...,[8.0,4.0]];
	this.lut = lut;
	
}

signalLUT.prototype.lookUp = function(signal){
	//search, then get value at index 
	//let's try it with linear interpolation some time
	return this.lut[this.getIndex(signal)][1];
}

signalLUT.prototype.addResponse = function(inSignal,outSignal){
	// insert the correct position of the look-up list.
	var index = this.getIndex(inSignal);
	this.lut.splice(index+1,0,[inSignal,outSignal]);
}

signalLUT.prototype.replaceResponce = function(inSignal,outSignal){
	var index = this.getIndex(inSignal);
	this.lut.list[index] = [inSignal,outSignal];
}

signalLUT.prototype.getIndex = function(signal){
	//Binary Search through table
	return this.bSearch(0,this.lut.length-1,signal);
		
}
signalLUT.prototype.bSearch = function (low,high,value){
	var target = Math.floor(low + ((high - low)/2));
	console.log(target,this.lut);
	if (this.lut[target][0] == value){
		console.log("check1");
		return target;
	} else if (this.lut[target][0] > value){
		console.log("chec2k2");
		if (target > 0){
			console.log("check2");
			if (this.lut[target-1][0] < value){
				return this.returnClosest(target-1,target,value);
			} else {
				return this.bSearch(low,target-1,value);
			}
		}
		return target;	
	} else {
		console.log("check32");
		if (target < (this.lut.length - 1)){
			console.log("checkasd32");
			if (this.lut[target+1][0] > value){
				return this.returnClosest(target,target+1,value);
			} else {
				return this.bSearch(target+1 ,high,value);
			}
		}
		return target;	

	};

}

signalLUT.prototype.returnClosest = function(lowIndex,highIndex, value){
	console.log("return closest:l,h",lowIndex,highIndex);
	if ((value - this.lut[lowIndex][0]) > (this.lut[highIndex][0] - value)){
		// If the higher number is closer
		return highIndex;
	} else {
		return lowIndex;
	}
}
