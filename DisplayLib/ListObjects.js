// Various self running lists

function runList(parent){
	this.list = [];
	this.parent = parent;
}
runList.constructor = runList;
runList.prototype.run =  function (){
	if (this.list.length > 0){
		for (var i=0;i<this.list.length;i++){
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
};

effectList.prototype.run = function (context){
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
	this.effList = new effectList(parent);

}
// List needs a sort function to ensure the right object is rendered first in each stack
displayList.prototype.draw = function(context){

	if (this.list.length > 0){
		for (var i=0;i<this.list.length;i++){
			this.list[i].draw(context);
		};
	};
	if (this.effList.length > 0){
		for (var j = 0;j<this.efflist.length; j++){
			this.effList[j](context);
		}
	};
}
displayList.prototype.click = function(e){
	if (this.list.length > 0){
		for (var i=0;i<this.list.length;i++){
			 if(this.list[i].click(e)){
				return true;
			};
		};
	};
	return false;
}
