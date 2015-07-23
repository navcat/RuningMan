
/**
 * 背景层
 * 
 * @pudate  2015-7-22 22:27:48 更改地图为瓦片地图
 */
var RuningBgLayer = cc.Layer.extend({
	map00: null,    // 背景1
	map01: null,    // 背景2
	mapWidth: 0,    // 地图宽度
	mapIndex: 0,
	space: null,		// 物理空间
	spriteSheet: null,   // 精灵缓存
	objects: [],
	/**
	 * 构造方法
	 * @param space 传递物理空间对象
	 */
	ctor: function(space){
		this._super();
		this.space = space;  // 物理空间对象
		// 清空旧数组
		this.objects = [];
		this.init();
	},
	
	init: function(){
		this._super();
		
		/// 添加背景
		/** 
		// 方式一：原始方法
		var winSize = cc.director.getWinSize();
		bg = new cc.Sprite(res.PlayBG_png);
		var cp = new cc.p(winSize.width / 2, winSize.height / 2);
		bg.setPosition(cp);
		
		this.addChild(bg);
		*/
		// 方式二：创建TiledMap背景
		// 地图1
		this.map00 = new cc.TMXTiledMap(res.map00_tmx);
		this.addChild(this.map00);
		this.mapWidth = this.map00.getContentSize().width;

		// 地图二
		this.map01 = new cc.TMXTiledMap(res.map01_tmx);
		this.map01.setPosition(cc.p(this.mapWidth, 0));
		this.addChild(this.map01);
		
		/// 创建sprite sheet
		cc.spriteFrameCache.addSpriteFrames(res.background_plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.background_png);
		this.addChild(this.spriteSheet);
		this.loadObjects(this.map00, 0);
		this.loadObjects(this.map01, 1);

		this.scheduleUpdate();
	},
	/**
	 * 检查和更新背景地图
	 * @param eyeX
	 * @returns {Boolean} 
	 * 	true 表示已经改变了地图位置
	 */
	checkAndReload: function(eyeX){
		var newMapIndex = parseInt(eyeX / this.mapWidth);
		if(this.mapIndex == newMapIndex){
			return false;
		}
		// 设置地图的X坐标
		if (0 == newMapIndex % 2){
			// 改变地图2
			this.map01.setPositionX(this.mapWidth * (newMapIndex + 1));
			this.loadObjects(this.map01, newMapIndex + 1);
		}else{
			// 改变题图1
			this.map00.setPositionX(this.mapWidth * (newMapIndex + 1));
			this.loadObjects(this.map00, newMapIndex + 1);
		}
		this.removeObjects(newMapIndex - 1);
		this.mapIndex = newMapIndex;
		return true;
	},
	
	/**
	 * 加载岩石和硬币
	 */
	loadObjects: function(map, mapIndex){
		// 添加硬币
		var coinGroup = map.getObjectGroup("coin");
		var coinArray = coinGroup.getObjects();
		for(var i = 0; i < coinArray.length; i++){
			var coin = new Coin(this.spriteSheet,
				this.space,
				cc.p(coinArray[i]["x"] + this.mapWidth * mapIndex,coinArray[i]["y"]));
			coin.mapIndex = mapIndex;
			this.objects.push(coin);
		}
		// 添加岩石
		var rockGroup = map.getObjectGroup("rock");
		var rockArray = rockGroup.getObjects();
		for (var i = 0; i < rockArray.length; i++) {
			var rock = new Rock(this.spriteSheet,
				this.space,
				rockArray[i]["x"] + this.mapWidth * mapIndex);
			rock.mapIndex = mapIndex;
			this.objects.push(rock);
		}
	},
	removeObjects:function (mapIndex) {
		while((function (obj, index) {
			for (var i = 0; i < obj.length; i++) {
				if (obj[i].mapIndex == index) {
					obj[i].removeFromParent();
					obj.splice(i, 1);
					return true;
				}
			}
			return false;
		})(this.objects, mapIndex));
	},
	
	removeObjectByShape:function (shape) {
		for (var i = 0; i < this.objects.length; i++) {
			if (this.objects[i].getShape() == shape) {
				this.objects[i].removeFromParent();
				this.objects.splice(i, 1);
				break;
			}
		}
	},
	/**
	 * 定时器
	 * @param dt
	 */
	update : function(dt){
		// 根据tag获取动画层
		var animationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
		// 获取动画层距离左物理边界的位置
		var eyeX = animationLayer.getEyeX();
		// 实时检测和更新地图
		this.checkAndReload(eyeX);
	}
})