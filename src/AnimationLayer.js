
/**
 * 动画层
 */
var AnimationLayer = cc.Layer.extend({
	spriteSheet: null,
	sprite: null,
	space: null,
	runingAction: null,
	ctor: function(space){
		this._super();
		this.space = space;
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
		
		//1. create PhysicsSprite with a sprite frame name
		this.sprite = new cc.PhysicsSprite("#runner0.png");
		var contentSize = this.sprite.getContentSize();
		// 2. init the runner physic body
		this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
		//3. set the position of the runner
		this.body.p = cc.p(g_runnerStartX, g_groundHeight + contentSize.height / 2);
		//4. apply impulse to the body
		this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
		//5. add the created body to space
		this.space.addBody(this.body);
		//6. create the shape for the body
		this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
		//7. add shape to space
		this.space.addShape(this.shape);
		//8. set body to the physic sprite
		this.sprite.setBody(this.body);
		
		this.sprite.runAction(this.runingAction);
		this.spriteSheet.addChild(this.sprite);

		/**
		this.sprite = new cc.Sprite("#runner0.png");
		this.sprite.attr({
			x: 80,
			y: 85
		});
		this.sprite.runAction(this.runingAction);
		this.spriteSheet.addChild(this.sprite);
		*/
		
		/**
		var spritRuner = new cc.Sprite(res.Runner_png);
		spritRuner.attr({
			x: 80,
			y: 85
		});
		var actionTo = new cc.moveTo(2, cc.p(300, 85));
		spritRuner.runAction(new cc.Sequence(actionTo));
		this.addChild(spritRuner);
		**/
	}
});