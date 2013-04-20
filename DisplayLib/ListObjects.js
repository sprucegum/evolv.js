// Various self running lists

function runList(){
	this.list = [];
	this.parent = null;
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
function effectList(){
	this.list = [];

}
effectList.prototype.run = function (context, parent){
	if (this.list.length > 0){
		for (var i=0;i<this.list.length;i++){
			this.list[i].run(context,parent);
		};
	};
};

tweenList.prototype = new runList();
tweenList.constructor = tweenList;

function tweenList(){
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

function displayList(){
	this.parent = null;
	this.list = [];
	this.effList = new effectList();

}
// List needs a sort function to ensure the right object is rendered first in each stack
displayList.prototype.draw = function(){
	canvas = document.getElementById("evolvWorld");
	context = canvas.getContext("2d");
	if (this.list.length > 0){
		for (var i=0;i<this.list.length;i++){
			this.list[i].draw(context);
		};
	};
	if (this.effList.length > 0){
		for (var j = 0;j<this.efflist.length; j++){
			this.effList[j](context,this);
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
