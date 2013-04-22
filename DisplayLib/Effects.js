/*
	Effect Class
*/

drippy = new Effect(function(context, parent){
	//console.log("blurring",parent.x,parent.y, parent.width, parent.height);
	accumulator = 0;
	//console.log("running shizzle",parent);

	for (var i=0; i< parent.width;i++){
		for(var j=0; j < parent.height;j++){
			accumulator += Math.random();
			var rgba = [0,0,0,0];
			
			angle = Math.sin(Math.PI*accumulator/100);
			//console.log(parent.pixels.data[(i*parent.height + j*parent.width) + 3]);	
			
			if (0.001>Math.random())
			if (parent.pixels.data[4*(i + j*parent.width) + 3] != 0){ //If not transparent
				//Spawn blurbot
				var bB = new blurBot(parent.x + i, parent.y + j, parent, new Pather(null, testPather), paintKern, Math.round(20*Math.random()) + 15, angle);
				parent.addChild(bB);
				//console.log(angle); 

			}
		}				
	}
});

drizzle = new Effect(function(context, parent){
	//console.log("blurring",parent.x,parent.y, parent.width, parent.height);
	accumulator = 0;
	//console.log("running shizzle",parent);

	for (var i=0; i< parent.width;i++){
		for(var j=0; j < parent.height;j++){
			accumulator += Math.random();
			var rgba = [0,0,0,0];
			
			angle = Math.sin(Math.PI*accumulator/100);
			//console.log(parent.pixels.data[(i*parent.height + j*parent.width) + 3]);	
			
			if (0.001>Math.random())
			if (parent.pixels.data[4*(i + j*parent.width) + 3] != 0){ //If not transparent
				//Spawn blurbot
				var bB = new blurBot(parent.x + i, parent.y + j, parent, new Pather(null, testPather), dripKern, Math.round(20*Math.random()) + 15, angle);
				parent.addChild(bB);
				//console.log(angle); 

			}
		}				
	}
});

shizzle = new Effect(function(context, parent){
	//console.log("blurring",parent.x,parent.y, parent.width, parent.height);
	accumulator = 0;
	//console.log("running shizzle",parent);

	for (var i=0; i< parent.width;i++){
		for(var j=0; j < parent.height;j++){
			accumulator += Math.random();
			var rgba = [0,0,0,0];
			
			angle = Math.sin(Math.PI*accumulator/100);
			//console.log(parent.pixels.data[(i*parent.height + j*parent.width) + 3]);	
			
			if (0.001>Math.random())
			if (parent.pixels.data[4*(i + j*parent.width) + 3] != 0){ //If not transparent
				//Spawn blurbot
				var bB = new blurBot(parent.x + i, parent.y + j, parent, new Pather(null, testPather), blurKern, Math.round(20*Math.random()) + 10, angle);
				parent.addChild(bB);
				//console.log(angle); 

			}
		}				
	}
});
testPather = function(pather, target){
	//console.log("pathing");
	target.dy += target.ddy; 
	target.y +=  target.dy;
	target.x += target.dx;
}
blurBot.prototype = new Effector();
blurBot.constructor = blurBot;
function blurBot(x, y, parent, pather, kernel, lifetime, angle){
	this.x = x;
	this.y = y;
	this.width = 3;
	this.height = 3;
	this.dx = Math.round(0.5*Math.sin(angle), canvas.width);
	this.dy = Math.round(0.5*Math.cos(angle), canvas.width);
	this.len = 16;
	this.parent = parent;
	this.pather = pather;
	this.pather.parent = this;
	this.ddy = 0.06;
	this.angle = angle;
	this.kernel = kernel
	this.lifetime = lifetime;

}

function paintKern (context, parent){

	//console.log(parent, context);
	var tx = constrain(0,parent.x,canvas.width);
	var ty = constrain(0,parent.y,canvas.height);
	var imgData = context.getImageData(tx, ty, 1, 1 );
	var size = Math.round(10*Math.sin(parent.angle)) + 2;
	//console.log(parent.angle);
	if (imgData){

		
			//context.putImageData(imgData, tx , ty );
			if (true){
				for (var k=0;k<size;k++){
					for (var l=0;l<size;l++){
						var tx = constrain(0,parent.x + k - 2, canvas.width);
						var ty =  constrain(0,parent.y  + l - 4 , canvas.height);
						pixel = context.getImageData( tx, ty,1,1)
						if (pixel){
							for(var c=0; c<4;c++){
								//console.log(imgData);
								imgData.data[c] = constrain(0, pixel.data[c], 255);
		
							}
						}
						//console.log(context,tx,ty);
						context.putImageData(imgData,tx, ty);
					}
				}
			}
			//context.putImageData(imgData,tx, ty);
		
	}
}
function dripKern (context, parent){

	//console.log(parent, context);
	var tx = constrain(0,parent.x,canvas.width);
	var ty = constrain(0,parent.y,canvas.height);
	var imgData = context.getImageData(tx, ty, 1, 1 );
	var size = Math.round(10*Math.sin(parent.angle)) + 2;
	//console.log(parent.angle);
	if (imgData){

		
			//context.putImageData(imgData, tx , ty );
			if (true){
				pixel = context.getImageData( parent.x, parent.y,1,1)
				for (var k=0;k<size;k++){
					for (var l=0;l<size;l++){
						var tx = constrain(0,parent.x + k - 2, canvas.width);
						var ty =  constrain(0,parent.y  + l - 4 , canvas.height);
						
						if (pixel){
							for(var c=0; c<4;c++){
								//console.log(imgData);
								imgData.data[c] = constrain(0, pixel.data[c], 255);
		
							}
						}
						//console.log(context,tx,ty);
						context.putImageData(imgData,tx, ty);
					}
				}
			}
			//context.putImageData(imgData,tx, ty);
		
	}
}

function blurKern (context, parent){
	effMatrix = [	
		[2,0.0,0.0],
		[0.0,0.0,0.0],
		[0.0,0.0,0.0]

	];
	//console.log(parent, context);
	tx = constrain(0,parent.x,canvas.width);
	ty = constrain(0,parent.y,canvas.height);
	imgData = context.getImageData(tx, ty, 1, 1 );
	if (imgData){
		

		//context.putImageData(imgData, tx , ty );

		for (var k=0;k<effMatrix[0].length;k++){
			for (var l=0;l<effMatrix.length;l++){
				var tx = constrain(0,parent.x + k - effMatrix[0].length/2, canvas.width);
				var ty =  constrain(0,parent.y  + l - effMatrix.length/2 , canvas.height);
				pixel = context.getImageData( tx, ty,1,1)
				if (pixel){
					for(var c=0; c<4;c++){
						//console.log(imgData);
						imgData.data[c] = constrain(0, effMatrix[l][k]*pixel.data[c] + imgData.data[c], 255);

					}
				}
				//console.log(context,tx,ty);
				context.putImageData(imgData,tx, ty);
			}
		}

		//context.putImageData(imgData,tx, ty);
	
	}
}

blur = new Effect(function(context, parent){
	effMatrix = [	[0.05,0.05,0.05],
			[0.05,0.05,0.05],
			[0.05,0.05,0.05]
	];
	//console.log("blurring",parent.x,parent.y, parent.width, parent.height);
	for (var i=0; i< parent.width;i++){
		for(var j=0; j < parent.height;j++){
			var rgba = [0,0,0,0];
			imgData = context.getImageData(parent.x + i, parent.y + j,1 ,1 );
			//console.log(imgData);	
			if (imgData.data[3] < 1){
				for (var k=0;k<effMatrix[0].length;k++){
					for (var l=0;l<effMatrix.length;l++){
						pixel = context.getImageData(	parent.x + i - effMatrix[0].length/2,
										 parent.y + j -effMatrix.length/2,1,1)
						if (pixel){
							for(var c=0; c<4;c++){
								//console.log(imgData);
								imgData.data[c] = 
								constrain(0,
									effMatrix[k][l]*pixel.data[c] + imgData.data[c],
									255
								);

								
							}
						}
					}
				}
				context.putImageData(imgData,parent.x + i, parent.y + j);
			}
		}				
	}
});

