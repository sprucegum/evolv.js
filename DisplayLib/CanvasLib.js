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
} else if (navigator.userAgent.search("WebKit") > 0){
	window.requestAnimationFrame = window.webkitRequestAnimationFrame;
}

main = function() {
	
	canvas.runList.run();
	canvas.dispList.draw(context);

	
	//console.log(mouse.x,mouse.y);
	//window.mozRequestAnimationFrame( main ) 
	//window.requestAnimationFrame( main );
	window.requestAnimationFrame( main );
	ticks++;

};
