var g_groundHeight = 57;  // 奔跑小人开始距离底部的位置
var g_runnerStartX = 80;  // 奔跑小人开始坐标x

/// 动画层全局配置
if(typeof TagOfLayer == "undefined"){
	var TagOfLayer = {};
	TagOfLayer.BackGround = 0;    	// 背景层TAG
	TagOfLayer.Animation = 1;		// 动画层TAG
	TagOfLayer.Status = 2;			// 状态层TAG
};

if(typeof SpriteTag == "undefined"){
	var SpriteTag = {};
	SpriteTag.runner = 0;  		// 奔跑小人TAG
	SpriteTag.coin = 0;			// 金币TAG
	SpriteTag.rock = 2;			// 岩石阻挡物 TAG
}