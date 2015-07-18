
/**
 * 背景层
 */
var RuningBgLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
		
		// 添加背景
		var winSize = cc.director.getWinSize();
		bg = new cc.Sprite(res.PlayBG_png);
		var cp = new cc.p(winSize.width / 2, winSize.height / 2);
		bg.setPosition(cp);
		
		this.addChild(bg);
	}
})