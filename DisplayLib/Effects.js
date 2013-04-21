/*
	Effect Class
*/

drippy = new Effect(function(context, parent){
	//console.log("blurring",parent.x,parent.y, parent.width, parent.height);
	for (var i=0; i< parent.width;i++){
		for(var j=0; j < parent.height;j++){
			var rgba = [0,0,0,0];
			imgData = context.getImageData(parent.x + i, parent.y + j,1 ,1 );
			//console.log(imgData);	
			if (Math.sin(2*Math.PI*(i/Math.random())) > 0.8){
				for (var n = 2;n>=0;n--){
					context.putImageData(imgData,parent.x + i, parent.y + j + n);
				}
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
			
			angle = 2*Math.PI*Math.sin(Math.sin(Math.PI*accumulator/32));
			//console.log(parent.pixels.data[(i*parent.height + j*parent.width) + 3]);	
			
			if (0.00004>(Math.sin(2*Math.PI*(accumulator%8)/(2*Math.cos(2*Math.PI*(accumulator%9999)/2)))+1))
			if (parent.pixels.data[(i*parent.height + j*parent.width) + 3] > 0){ //If not transparent
				//Spawn blurbot
				var bB = new blurBot(parent.x + i, parent.y + j, parent, new Pather(parent, testPather), blurKern, 20, angle);
				parent.addChild(bB);
				//console.log(angle); 

			}
		}				
	}
});
testPather = function(pather, target){
	//console.log("pathing");
	target.x += 3*mouse.dx;
	target.y += 3*mouse.dy;
}
blurBot.prototype = new Effector();
blurBot.constructor = blurBot;
function blurBot(x, y, parent, pather, kernel, lifetime, angle){
	this.x = x;
	this.y = y;
	this.dx = Math.round(3.0*Math.sin(angle), canvas.width);
	this.dy = Math.round(3.0*Math.sin(angle), canvas.width);
	this.len = 4;
	this.parent = parent;
	this.pather = pather;
	this.angle;
	this.kernel = kernel
	this.lifetime = lifetime;

}
blurBot.prototype.kernel = function(context, parent){
	blurKern(this.parent,context);
}

function blurKern (context, parent){
	effMatrix = [	
		[0.05,0.05,0.05],
		[-0.01,0.1,0.01,0.05],
		[0.05,0.05,0.05],

	];
	//console.log(parent, context);
	imgData = context.getImageData(parent.x, parent.y, 1, 1 );
	for (var n = parent.len;n>=0;n--){
		
		//context.putImageData(imgData, tx , ty );
		if (true){
			for (var k=0;k<effMatrix[0].length;k++){
				for (var l=0;l<effMatrix.length;l++){
					var tx = constrain(0,parent.x + k - effMatrix[0].length/2, canvas.width);
					var ty =  constrain(0,parent.y  + l - effMatrix.length/2 , canvas.height);
					pixel = context.getImageData( tx, ty,1,1)
					if (pixel){
						for(var c=0; c<4;c++){
							//console.log(imgData);
							imgData.data[c] = 
							constrain(0,
								effMatrix[l][k]*pixel.data[c] + imgData.data[c],
								255
							);

		
						}
					}
					console.log(context,tx,ty);
					context.putImageData(imgData,tx, ty);
				}
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

