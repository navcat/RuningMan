// 跑步小人的运动状态
if(typeof RunnerStat == "undefined") {
	var RunnerStat = {};
	RunnerStat.running = 0;
	RunnerStat.jumpUp = 1;
	RunnerStat.jumpDown = 2;
};
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
	runningAction: null,
	body: null,
	shape: null,
	jumpUpAction:null,
	jumpDownAction:null,
	
	recognizer:null,
	stat:RunnerStat.running,// 初始化跑步小人运动状态为running
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
		this._debugNode.setVisible(false);
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

		this.initAction();
		
		/**

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
		this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
		*/
		
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
		
		this.sprite.runAction(this.runningAction);
		this.spriteSheet.addChild(this.sprite);
		
		// 初始化操作摇杆
		this.recognizer = new SimpleRecognizer();

		/**
		// 方式二：从缓存添加
		this.sprite = new cc.Sprite("#runner0.png");
		this.sprite.attr({
			x: 80,
			y: 85
		});
		this.sprite.runAction(this.runningAction);
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
		// 添加事件管理
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}, this);
		
		
		this.scheduleUpdate();
	},
	initAction:function () {
		// init runningAction
		var animFrames = [];
		// num equal to spriteSheet
		for (var i = 0; i < 8; i++) {
			var str = "runner" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation = new cc.Animation(animFrames, 0.1);
		this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
		this.runningAction.retain();

		// init jumpUpAction
		animFrames = [];
		for (var i = 0; i < 4; i++) {
			var str = "runnerJumpUp" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		animation = new cc.Animation(animFrames, 0.2);
		this.jumpUpAction = new cc.Animate(animation);
		this.jumpUpAction.retain();

		// init jumpDownAction
		animFrames = [];
		for (var i = 0; i < 2; i++) {
			var str = "runnerJumpDown" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		animation = new cc.Animation(animFrames, 0.3);
		this.jumpDownAction = new cc.Animate(animation);
		this.jumpDownAction.retain();
	},
	
	onTouchBegan:function(touch, event) {
		var pos = touch.getLocation();
		event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);
		return true;
	},

	onTouchMoved:function(touch, event) {
		var pos = touch.getLocation();
		event.getCurrentTarget().recognizer.movePoint(pos.x, pos.y);
	},

	onTouchEnded:function(touch, event) {
		var rtn = event.getCurrentTarget().recognizer.endPoint();
		cc.log("rnt = " + rtn);
		switch (rtn) {
		case "up":
			event.getCurrentTarget().jump();
			break;
		default:
			break;
		}
	},
	/**
	 * 跳跃
	 */
	jump:function () {
		cc.log("jump");
		if (this.stat == RunnerStat.running) {
			this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
			this.stat = RunnerStat.jumpUp;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.jumpUpAction);
		}
	},
	/**
	 * 既然物理body将要不断地向右移动，精灵会和物理body同步它的位置。
	 * 过了一段时间后，玩家会跑到屏幕外面，所以我们需要在每帧移动游戏层的x坐标，让它保持在可见的范围内。
	 * @returns int x坐标
	 */
	getEyeX: function(){
		return this.sprite.getPositionX() - g_runnerStartX;
	},
	/**
	 * 销毁时我们需要释放已创建的action
	 */
	onExit:function() {
		this.runningAction.release();
		this.jumpUpAction.release();
		this.jumpDownAction.release();
		this._super();
	},
	update: function(){
		// 更新跑步距离
		var statusLayer = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
		statusLayer.updateMeter(this.sprite.getPositionX() - g_runnerStartX);
		
		//更新跑步者的状态
		var vel = this.body.getVel();
		// 向上跳跃
		if (this.stat == RunnerStat.jumpUp) {
			if (vel.y < 0.1) {
				this.stat = RunnerStat.jumpDown;
				this.sprite.stopAllActions();
				this.sprite.runAction(this.jumpDownAction);
			}
		} else if (this.stat == RunnerStat.jumpDown) {
			if (vel.y == 0) {
				this.stat = RunnerStat.running;
				this.sprite.stopAllActions();
				this.sprite.runAction(this.runningAction);
			}
		}
	}
});