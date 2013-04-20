/*
	Effect Class
*/

drippy = new effectKernel(function(context, parent){
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

shizzle = new effectKernel(function(context, parent){
	//console.log("blurring",parent.x,parent.y, parent.width, parent.height);
	accumulator = 0;
	effMatrix = [	
			[0.05,0.05,0.05],
			[-0.01,0.1,0.01,0.05],
			[0.05,0.05,0.05],

	];
	for (var i=0; i< parent.width;i++){
		for(var j=0; j < parent.height;j++){
			accumulator += Math.random();
			var rgba = [0,0,0,0];
			imgData = context.getImageData(parent.x + i, parent.y + j,1 ,1 );
			angle = 2*Math.PI*Math.sin(Math.sin(Math.PI*accumulator/32));
			//console.log(parent.pixels.data[(i*parent.height + j*parent.width) + 3]);	
			
			if (0.00004>(Math.sin(2*Math.PI*(accumulator%8)/(2*Math.cos(2*Math.PI*(accumulator%9999)/2)))+1))
			if (parent.pixels.data[(i*parent.height + j*parent.width) + 3] > 0){
			
				//console.log(angle); 
				for (var n = 7;n>=0;n--){
					tx = constrain(0,parent.x + i + Math.round(n*Math.sin(angle)), canvas.width);
					ty =  constrain(0,parent.y + j + Math.round(n*Math.cos(angle)), canvas.height);
					//context.putImageData(imgData, tx , ty );
					if (true){
						for (var k=0;k<effMatrix[0].length;k++){
							for (var l=0;l<effMatrix.length;l++){
								pixel = context.getImageData( k + tx - effMatrix[0].length/2,
												l + ty - effMatrix.length/2,1,1)
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
								context.putImageData(imgData,tx + k, ty + l);
							}
						}
					}
					context.putImageData(imgData,tx, ty);
				}
			}
		}				
	}
});

blur = new effectKernel(function(context, parent){
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

