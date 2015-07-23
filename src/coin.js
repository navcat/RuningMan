/**
 * 硬币类
 */
var Coin = cc.Class.extend({
	space: null,
	sprite: null,
	shape: null,
	_mapIndex: 0,
	get mapIndex(){
		return this._mapIndex;
	},
	set mapIndex(index){
		this._mapIndex = index;
	},
	ctor: function(spriteSheet, space, pos){
		this.space = space;
		
		// 初始化硬币动画
		var animFrames = [];
		for(var i = 0; i < 8; i++){
			var name = "coin" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(name);
			animFrames.push(frame);
		}
		
		var animation = new cc.Animation(animFrames, 0.2);
		var action = new cc.RepeatForever(new cc.Animate(animation));
		
		this.sprite = new cc.PhysicsSprite("#coin0.png");
		
		// 初始化物理层
		var radius = 0.95 * this.sprite.getContentSize().width / 2;  // 半径
		var body = new cp.StaticBody();
		body.setPos(pos);
		this.sprite.setBody(body);
		
		this.shape = new cp.CircleShape(body, radius, cp.vzero);
		this.shape.setCollisionType(SpriteTag.coin);
		//Sensors 只是调用碰撞机回调函数,并且永远不生成真实的碰撞机
		this.shape.setSensor(true);
		
		this.space.addStaticShape(this.shape);
		
		this.sprite.runAction(action);
		spriteSheet.addChild(this.sprite, 1);
	},
	/**
	 * 清除操作
	 */
	removeFromParent: function(){
		this.space.removeStaticShape(this.shape);
		this.shape = null;
		this.sprite.removeFromParent();
		this.sprite = null;
	},
	
	getShape: function(){
		return this.shape;
	}
});