
/**
 * 动画层
 */
var AnimationLayer = cc.Layer.extend({
	spriteSheet: null,
	sprite: null,
	runingAction: null,
	ctor: function(){
		this._super();
		this.init();
	},
	/**
	 * 初始化方法
	 */
	init: function(){
		this._super();
		// 加载精灵表到cash
		cc.spriteFrameCache.addSpriteFrames(res.Running_plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.Runner_png);
		this.addChild(this.spriteSheet);
		
		// 创建精灵帧数组
		var animFrames = [];
		for(var i = 0; i < 8; i++){
			var name = "runner" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(name);
			animFrames.push(frame)
		}
		
		// 通过精灵帧在一定时间内完成动画
		var animation = new cc.Animation(animFrames, 0.1);
		
		// 用一个持续重复动作封装该动画
		this.runingAction = new cc.RepeatForever(new cc.Animate(animation));
		
		this.sprite = new cc.Sprite("#runner0.png");
		this.sprite.attr({
			x: 80,
			y: 85
		});
		this.sprite.runAction(this.runingAction);
		this.spriteSheet.addChild(this.sprite);
		
		
		//var spritRuner = new cc.Sprite(res.Runner_png);
		//spritRuner.attr({
		//	x: 80,
		//	y: 85
		//});
		//var actionTo = new cc.moveTo(2, cc.p(300, 85));
		//spritRuner.runAction(new cc.Sequence(actionTo));
		//this.addChild(spritRuner);
	}
});