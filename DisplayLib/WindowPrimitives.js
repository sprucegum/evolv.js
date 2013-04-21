/* 
 Window object primitive class and methods
 Requires ListObjects
*/
textWindow.prototype = new windowObject();
textWindow.constructor = textWindow; 
function textWindow(title,text,x,y,width, height){
	windowObject.call(this);
	this.text = text;
	this.x = x;
	this.y = y;
	this.stroke = "rgba(0,0,0,128)";
	this.fill = "rgba(255,255,255,64)";

	this.font = "'F25'";
	this.height = height;
	this.width = width;
	this.size = 16;
	this.draggable = true;
	this.addChild(new textLine(title, 4, 0, this.size + 4));
	this.addChild(new textBlock(text, 0, this.size +8, width, height - (this.size +8) , this));
	this.minwidth = 20;
	this.decorate();
}

textBlock.prototype = new windowObject();
textBlock.constructor = textBlock;

function textBlock(text,x,y,width, height, parent){
	windowObject.call(this);
	this.text = text;
	this.x = x;
	this.y = y;
	this.color = "#406";
	this.outline = "#406";
	this.font = "'F25'";
	this.height = height;
	this.width = width;
	this.size = parent.size;
	this.draggable = false;
	// split up text and fit into block.
	this.stext = text.split(" ");
	var cursor = 0;
	var line = 0;
	var tcanvas = document.createElement('canvas');
	tcanvas.height = height;
	tcanvas.width = width;
	tctx = tcanvas.getContext("2d");
	for (var i = 0; i < this.stext.length; i++){
		word = new textLine(this.stext[i],cursor, line*(this.size), this.size);
		
		word.font = this.font;
		word.width = word.textWidth(tctx);
		//console.log(cursor + word.width, this.width)
		if ((cursor + word.width) > this.width){
			cursor = 0;
			++line;
			//console.log(line);
			word.x = 0;
			word.y = line*(this.size);
		}
		cursor += word.width + (0.75*this.size);

		this.addChild(word);
		
	}
}

textBlock.prototype.resize = function(){
	this.width += mouse.dx;
	this.height += mouse.dy;
	this.dispList = new displayList(this);
	this.runList = new runList(this);
	this.replacement = new textBlock(this.text, this.x, this.y, this.width, this.height, this.parent);
	for (var i=0; i<this.replacement.dispList.list.length; i++){
		this.addChild(this.replacement.dispList.list[i]);
	}
	this.replacement = null;
	
}
/*
textBlock.prototype.draw = function(context){
	this.dispList.draw(context);
}
*/

textLine.prototype = new windowObject();
textLine.constructor = textLine;
function textLine(text,x,y,size){
	
	windowObject.call(this);
	this.text = text;
	this.x = x;
	this.y = y;
	this.stroke = "rgba(0,0,0,128)";
	this.fill = "rgba(255,255,255,64)";
	this.font = "'F25'"
	this.height = size;
	this.size = size;
	this.draggable = false;
	//console.log(this);
}
textLine.prototype.textWidth = function(context){
	context.font= this.size + "px" + this.font;
	return context.measureText(this.text).width;
}

textLine.prototype.draw = function(context){
	context.font= this.size + "px" + this.font;
	context.strokeStyle = this.stroke;
	context.fillStyle = this.fill;
	context.textBaseline = "top";
	this.width = context.measureText(this.text).width;
	context.strokeText(this.text,this.gx,+ this.gy);
	context.fillText(this.text,this.gx,this.gy);
}

/* 
	Background Primitive. Draws Background
*/
backGround.prototype = new windowObject();
backGround.constructor = backGround;
function backGround(){
	windowObject.call(this);
	this.width = window.innerWidth;
	this.height = window.innerHeight;
};
backGround.prototype.draw = function (context){
	rs = BLOCK; // Rect Size
	ilim = window.innerWidth/rs;
	jlim = window.innerHeight/rs;

	for(var i=0; i<ilim;i++){
		for(var j=0;j<jlim; j++){
			pulse1 = Math.sin((ticks)*(2*Math.PI/(ilim*15))-Math.PI);
			pulse2 = Math.sin((2*Math.PI*(ticks+(j*16))/(jlim*80))-Math.PI);
			pulse3 = Math.sin((j*j*j)*(2*Math.PI/(jlim*jlim))+Math.PI);
			pulse4 = Math.sin((i*i)*(2*Math.PI/(ilim*ilim))+Math.PI);
			dist = Math.sqrt(Math.pow(i*rs - mouse.x,2)
					+ Math.pow(j*rs - mouse.y,2)
			);
			light = Math.pow(Math.E,-(dist/200));
			
			context.fillStyle = "rgb("+Math.round((pulse2*96 +50*light))
				+","+Math.round(50*light)+","+Math.round((45)+50*light)+")";
			//console.log(context.fillStyle, i ,j, (127*pulse1)+128);
			context.fillRect(i*rs,j*rs,rs+1,rs+1);
		}			
	}
	this.dispList.draw(context);
};

/*
	Mouse cursor primitive. Draws and handles mouse object
*/

mouseCursor.prototype = new windowObject();
mouseCursor.constructor = mouseCursor;
function mouseCursor(img){
	this.dispList = new displayList(this);
	this.img = img;
	this.canvas = document.createElement('canvas');
	if (this.canvas){
		this.canvas.width = this.img.width;
		this.canvas.height = this.img.height;
		this.context = this.canvas.getContext('2d');
		if (this.context){
			this.context.drawImage(this.img,0,0);
			this.pixels = this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
		}
	}
	
	this.x=0;
	this.y=0;
	//this.width = img.width;
	//this.height = img.height;

	this.width = 64;
	this.height = 64;
	this.lastx = 0;
	this.lasty = 0;
};
mouseCursor.prototype.draw = function(context){
	context.drawImage(this.img,this.x,this.y);
	this.dispList.draw(context);
	//console.log(this.x,this.y);
}
mouseCursor.prototype.move = function(e){		
	this.x = e.clientX; this.y = e.clientY;
	
}

mouseCursor.prototype.run = function(){
	this.dx = this.x - this.lastx; 
	this.dy = this.y - this.lasty; 
	this.lastx = this.x;
	this.lasty = this.y;
	this.runList.run();
}

mouseCursor.prototype.click = function(){
	return false;
}

/*
 Bit Drawing primitive. Takes a 2D array and displays it using blocks
*/
drawBits.prototype = new windowObject();


drawBits.constructor = drawBits; 
function drawBits(bits,x,y,scale){
	windowObject.call(this);
	this.width = bits[0].length*scale;
	this.height = bits.length*scale;
	this.x = x - (this.width)/2;
	this.y = y;
	this.scale = scale;
	this.bits = bits;
};
drawBits.prototype.draw = function(context) {
	for (var i = 0; i< this.bits.length;i++){
		for(var j = 0; j < this.bits[0].length;j++){
			if (this.bits[i][j] == 1){

				context.fillStyle = this.color;
				//console.log(context.fillStyle,color);
				context.fillRect(this.gx + this.scale*j,
						this.gy + this.scale*i,
						this.scale,
						this.scale
				);
			}
		}
	}
	this.dispList.draw(context);
};

