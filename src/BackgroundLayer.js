
/**
 * 背景层
 */
var RuningBgLayer = cc.Layer.extend({
	map00: null,
	map01: null,
	mapWidth: 0,
	mapIndex: 0,
	ctor: function(){
		this._super();
		this.init();
	},
	
	init: function(){
		this._super();
		// 添加背景
		/** 原始方法
		var winSize = cc.director.getWinSize();
		bg = new cc.Sprite(res.PlayBG_png);
		var cp = new cc.p(winSize.width / 2, winSize.height / 2);
		bg.setPosition(cp);
		
		this.addChild(bg);
		*/
		
		// 创建TiledMap背景
		this.map00 = new cc.TMXTiledMap(res.map00_tmx);
		this.addChild(this.map00);
		this.mapWidth = this.map00.getContentSize().width;

		this.map01 = new cc.TMXTiledMap(res.map01_tmx);
		this.map01.setPosition(cc.p(this.mapWidth, 0));
		this.addChild(this.map01);
		
		this.scheduleUpdate();
	},
	checkAndReload: function(eyeX){
		var newMapIndex = parseInt(eyeX / this.mapWidth);
		if(this.mapIndex == newMapIndex){
			return false;
		}
		if (0 == newMapIndex % 2){
			this.map01.setPositionX(this.mapWidth * (newMapIndex + 1));
		}else{
			this.map00.setPositionX(this.mapWidth * (newMapIndex + 1));
		}
		this.mapIndex = newMapIndex;
		return true;
	},
	
	update : function(dt){
		var animationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
		var eyeX = animationLayer.getEyeX();
		this.checkAndReload(eyeX);
	}
})