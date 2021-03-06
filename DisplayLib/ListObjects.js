// Various self running lists

function runList(parent){
	this.list = [];
	this.parent = parent;
}
runList.constructor = runList;

runList.prototype.run =  function (){
	if (this.list.length > 0){
		for (var i=0;i<this.list.length;i++){
			if (this.parent)
				this.parent.runningIndex = i;
			this.list[i].run();
		};
	};
};

runList.prototype.add = function(element){
	this.list.push(element);
	//console.log("adding, parent, child",this.parent, element);
	if (this.parent){
		element.parent = this.parent;
		element.xy();
	}
};

effectList.prototype = new runList();
effectList.constructor = effectList;
function effectList(parent){
	this.list = [];
	this.parent = parent;

}
effectList.prototype.add = function(element){
	this.list.push(element);
	if (navigator.userAgent.search("Firefox") > 0)
		this.list.pop();
	
};

effectList.prototype.run = function (context){
	//console.log("running effectlist",this.parent);
	if (this.list.length > 0){
		for (var i=0;i<this.list.length;i++){
			this.list[i].run(context,this.parent);
		};
	};
};

tweenList.prototype = new runList();
tweenList.constructor = tweenList;

function tweenList(parent){
	this.list = [];
}
tweenList.prototype.run = function (){
	if (this.list.length > 0){
		for (var i=0;i<this.list.length;i++){
			this.list[i].run();
		};
	};
};

displayList.prototype = new runList();
displayList.constructor = displayList;

function displayList(parent){
	this.parent = parent;
	this.list = [];
	this.effList = new effectList(this.parent);

}


displayList.prototype.draw = function(context){
	if (this.list.length > 0){
		for (var i=0;i<this.list.length;i++){
			if (this.parent)
				this.parent.runningIndex = i;
			this.list[i].draw(context);
		};
	};
	this.effList.run(context);
}
displayList.prototype.toFront = function (item){
	//console.log("toFront:",item, this.list);
	this.list.splice(this.list.indexOf(item),1);
	this.list.push(item);
}

displayList.prototype.click = function(e){
	if (this.list.length > 0){
		for (var i = this.list.length - 1 ;i >= 0 ;i--){
			if (this.list[i].clickable){
				if (this.parent)
					this.parent.runningIndex = i;
				 	
				 if(this.list[i].click(e)){
					return true;
				};
			}
		};
	};
	return false;
}
