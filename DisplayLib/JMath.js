/* 
 Commonly used mathematical functions
*/

constrain = function(min,input,max){
	if (input < min){
		return min;
	} else if (input > max){
		return max;
	}
	return input;
}
