/*
	Canvas Handling Library
*/

fitCanvas = function(canvas) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.cursor = 'none';
};

window.onresize = function(event) {
	canvas = document.getElementById("evolvWorld");
	fitCanvas(canvas);
};

if (navigator.userAgent.search("Firefox") > 0){
	window.requestAnimationFrame = window.mozRequestAnimationFrame;
};

main = function() {
	fitCanvas(canvas);
	
	canvas.runList.run();
	canvas.dispList.draw();

	
	//console.log(mouse.x,mouse.y);
	//window.mozRequestAnimationFrame( main ) 
	window.requestAnimationFrame( main );
	ticks++;

};
