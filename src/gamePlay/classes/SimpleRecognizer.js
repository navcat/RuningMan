/**
 * 手势识别器
 */

function Point(x, y){
	this.X = x;
	this.Y = y;
}

function SimpleRecognizer(){
	this.points = [];
	this.result = "";
}

//在onTouchBegan时调用
SimpleRecognizer.prototype.beginPoint = function(x, y){
	this.points = [];
	this.result = "";
	this.points.push(new Point(x, y));
}

//在onTouchMoved时调用
SimpleRecognizer.prototype.movePoint = function(x, y){
	this.points.push(new Point(x, y));
	
	if(this.result == "not support"){
		return ;
	}
	
	var newRtn = "";
	var len = this.points.length;
	var dx = this.points[len - 1].X - this.points[len - 2].X;
	var dy = this.points[len - 1].Y - this.points[len - 2].Y;
	
	// 左右移动
	if(Math.abs(dx) > Math.abs(dy)){
		if(dx > 0){
			newRtn = "right";
		}else{
			newRtn = "left";
		}
	}else{   // 上下移动
		if(dy > 0){
			newRtn = "up";
		}else{
			newRtn = "down";
		}
	}
	
	// 刚开始，默认一个方向值
	if(this.result == ""){
		this.result = newRtn;
		return;
	}
	
	// 如果方向更改，则重新设置方向
	if(this.result != newRtn){
		this.result = "not support";
	}
}

//在onTouchEnded时调用
SimpleRecognizer.prototype.endPoint = function(){
	if(this.points.length < 3){
		return "error";
	}
	return this.result;
}

SimpleRecognizer.prototype.getPoints = function(){
	return this.points;
}