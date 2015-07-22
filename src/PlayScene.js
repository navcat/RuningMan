/**
 * 跑步场景
 */
var PlayScene = cc.Scene.extend({
	space:null,   // 物理边界
	onEnter: function(){
		this._super();
		
		this.initPhysics();
		
		this.addChild(new RuningBgLayer());
		this.addChild(new AnimationLayer(this.space));
		this.addChild(new StatusLayer());
		
		this.scheduleUpdate();
	},
	initPhysics: function(){
		//1. new space object 
		this.space = new cp.Space();
		//2. setup the  Gravity
		this.space.gravity = cp.v(0, -350);

		// 3. set up Walls
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_groundHeight),// start point
				cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallBottom);
	},
	update:function (dt) {
		// chipmunk step
		this.space.step(dt);
	}
});