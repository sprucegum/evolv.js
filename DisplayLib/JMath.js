/* 
 Window object primitive class and methods
 Requires ListObjects
*/

constrain = function(min,input,max){
		return Math.ceil(Math.floor(input,min),max);
}
