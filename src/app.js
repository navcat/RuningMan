
// 菜单层
var MenuLayer = cc.Layer.extend({
    ctor:function () {
        // 调用父类的方法
        this._super();
    },
    /**
     * 初始化方法
     */
    init: function(){
    	this._super();
    	/////////////////////////////
    	// 获取窗口的大小
    	var size = cc.winSize;
    	
    	// 添加 背景图片
    	var bg = new cc.Sprite(res.HelloBG_png);
    	var pos = new cc.p(size.width / 2, size.height / 2);
    	bg.setPosition(pos);
    	this.addChild(bg);
    	
    	// 添加开始按钮
    	// cc.MenuItemFont.setFontSize(60);

		//var menuItemPlay = new cc.MenuItemImage(
		//	res.Start_n_png,
		//	res.Start_s_png,
		//	this.onPlay, this);
    	// 或者
    	var menuItemPlay = new cc.MenuItemSprite(
    		new cc.Sprite(res.Start_n_png), 	// 正常情况下的按钮图片
    		new cc.Sprite(res.Start_s_png), 	// 按中后的图片
			this.onPlay, this);
    	var menu = new cc.Menu(menuItemPlay);
    	menu.setPosition(pos);
    	this.addChild(menu, 1);
    },
    onPlay: function(){
    	cc.log('starting----')
    	// 开始游戏
    	cc.director.runScene(new PlayScene());
    }
});

// 菜单场景 
var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});

