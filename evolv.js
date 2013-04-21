// Creature Related Classes

organNode = function(parent,fsT,bsT,ffT,bfT){ 
	// Takes as input the parent, as well as the
	//Forward and Backward signal tables, function tables
	this.children = [];
	this.parent = parent;
	this.forwardSignal = 0.0;
	this.backwardSignal = 0.0;
	this.genome = [];
	this.size = [];
	this.fsT = fsT; 	//this.forwardSigTable = fsT;
	this.bsT = bsT; 	//this.backwardSigTable = bsT;
	this.ffT = fft; 	//this.forwardFuncTable = ffT; translates external signals to function signals
	this.bfT = bfT;		//this.backwardFuncTable = bfT;
	// each organ function has it's own look up table.
}

// Each node has the potential to serve as any other node

organNode.prototype.process = function(inSig,outSig){
	// Look at forwardSignal, update forward output

	// call children

	// look at backward signal, update backward output
}


organNode.prototype.move = function(inSig,outSig){

}

organNode.prototype.reproduce = function(inSig,outSig){
	/* Reproduction virtual machine
	// Genome pointer, body pointer, link pointer
	// Reproduction variables
	// Total Energy, Energy Consumed, Accumulator
	

	//external signals ... enable, disable
taylor series
	//internal ISA
	//one code for each organ, placement
	// create, modify, or delete (absorb) nodes
	// if statements based on energy or accumulator
	// accumulator increment, decrement, reset
	// control codes to jump pointer

	// for luts, there will be a control code, then the length of the LUT,
	// then finally, there will be the LUT elements themselves
	// there may be control codes within the lut structure, a series of NOPS's  
	// may indicate an upcoming control code, which could be used to take snippets
	// of other LUT's, or to selectively code the node depending on growth stage

	// 
	*/

	// node format will have a code for node type, size, tuning, and its lookup tables

	// there will be an internal link stack with, pop, push, and branch to link.

	// there will be two character conditional codes, where the condition is specified and if true, the next code is executed, otherwise, it is skipped. 
}

organNode.prototype.eat = function(inSig,outSig){

}

organNode.prototype.writeResponse = function(inSig,outSig){
	// determines which table,

}

organNode.prototype.toggleEcho = function(inSig,outSig){
	// determines if function outputs are routed to main outputs
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
