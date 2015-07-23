
/**
 * 动画层
 * 
 * 实现让奔跑小人不断的重复奔跑动作
 * 
 */
var AnimationLayer = cc.Layer.extend({
	spriteSheet: null,
	sprite: null,
	space: null,    // 物理空间
	runingAction: null,
	body: null,
	shape: null,
	/**
	 * 构造方法
	 * @param space 物理空间 (单例：即整个游戏使用同一个物理空间)
	 */
	ctor: function(space){
		this._super();
		this.space = space;
		this.init();
		
		// 显示调试信息
		 this._debugNode = new cc.PhysicsDebugNode(this.space);
		 this.addChild(this._debugNode, 10);
	},
	/**
	 * 初始化方法
	 * 通过缓存添加精灵动画
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
			// 从缓存中获取帧
			var frame = cc.spriteFrameCache.getSpriteFrame(name);
			animFrames.push(frame);
		}
		
		// 通过精灵帧在一定时间内完成动画
		var animation = new cc.Animation(animFrames, 0.1);
		// 用一个持续重复动作封装该动画
		this.runingAction = new cc.RepeatForever(new cc.Animate(animation));
		
		// 将精灵添加到物理层
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
		
		this.scheduleUpdate();

		/**
		// 方式二：从缓存添加
		this.sprite = new cc.Sprite("#runner0.png");
		this.sprite.attr({
			x: 80,
			y: 85
		});
		this.sprite.runAction(this.runingAction);
		this.spriteSheet.addChild(this.sprite);
		*/
		
		/**
		// 方式一：手动创建
		var spritRuner = new cc.Sprite(res.Runner_png);
		spritRuner.attr({
			x: 80,
			y: 85
		});
		var actionTo = new cc.moveTo(2, cc.p(300, 85));
		spritRuner.runAction(new cc.Sequence(actionTo));
		this.addChild(spritRuner);
		**/
	},
	
	/**
	 * 既然物理body将要不断地向右移动，精灵会和物理body同步它的位置。
		过了一段时间后，玩家会跑到屏幕外面，就像上一篇教程说的那样。
		所以我们需要在每帧移动游戏层的x坐标，让它保持在可见的范围内。
	 * @returns int x坐标
	 */
	getEyeX: function(){
		return this.sprite.getPositionX() - g_runnerStartX;
	}
});