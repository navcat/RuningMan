/**
 * 跑步场景
 */
var PlayScene = cc.Scene.extend({
	space:null,   // 物理边界
	gameLayer: null,
	shapesToRemove :[],
	onEnter: function(){
		this._super();
		
		this.shapesToRemove = [];

		// 初始化物理层
		this.initPhysics();
		this.gameLayer = new cc.Layer();
		
		//// 添加背景
		/*
		/// 方式一：直接从图片添加
		this.addChild(new RuningBgLayer());
		this.addChild(new AnimationLayer(this.space));
		this.addChild(new StatusLayer());
		*/
		/// 方式二： 从TiledMap 添加
		// 添加背景层
		this.gameLayer.addChild(new RuningBgLayer(this.space), 0, TagOfLayer.BackGround);
		// 添加动画层
		this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
		this.addChild(this.gameLayer);
		// 添加状态层
		this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

		this.scheduleUpdate();
	},
	/**
	 * 初始化物理层
	 * 
	 * 物理引擎提供重力、碰撞检测以及模拟物理场景，它们会让我们的游戏世界看上去更加真实。
	 * 总的来说，一个游戏只需要一个*space*对象。space对象可以被不同的层所共享。
	 * 我们经常把*space对象的初始化代码* 放在PlayScene。
	 */
	initPhysics: function(){
		//1. 创建一个新的物理空间
		this.space = new cp.Space();
		//2. 经验值，设置重力值
		this.space.gravity = cp.v(0, -350);

		// 3. 设置边界
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_groundHeight),// start point
				cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallBottom);
		
		// 设置小花栗鼠CollisionHandler
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.coin,
				this.collisionCoinBegin.bind(this), null, null, null);
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.rock,
				this.collisionRockBegin.bind(this), null, null, null);
	},
	/**
	 * 碰撞到金币，增加金币
	 * @param arbiter
	 * @param space
	 */
	collisionCoinBegin:function (arbiter, space) {
		var shapes = arbiter.getShapes();
		// shapes[0] is runner
		this.shapesToRemove.push(shapes[1]);
		
		// 增加金币
		var statusLayer = this.getChildByTag(TagOfLayer.Status);
		statusLayer.addCoin(1);
	},

	/**
	 * 当玩家碰撞到岩石时，游戏结束
	 * @param arbiter
	 * @param space
	 */
	collisionRockBegin:function (arbiter, space) {
		cc.log("==game over");
		cc.director.pause();
		this.addChild(new GameOverLayer());
	},
	update:function (dt) {
		// chipmunk step
		this.space.step(dt);
		
		// 模拟cpSpaceAddPostStepCallback
		for(var i = 0; i < this.shapesToRemove.length; i++) {
			var shape = this.shapesToRemove[i];
			this.gameLayer.getChildByTag(TagOfLayer.BackGround).removeObjectByShape(shape);
		}
		this.shapesToRemove = [];
		// 获取动画层
		var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
		var eyeX = animationLayer.getEyeX();
		
		this.gameLayer.setPosition(cc.p(-eyeX, 0));
	}
});