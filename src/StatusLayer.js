/**
 * 状态层
 */
var StatusLayer = cc.Layer.extend({
	labelCoin: null,
	labelMeter: null,
	coins:0,
	ctor: function(){
		this._super();
		this.init();
	},
	
	init: function(){
		this._super();
		
		// 获取窗口大小
		var winSize = cc.director.getWinSize();

		// 添加金币标签
		this.labelCoin = new cc.LabelTTF("Coins:0", "Helvetica", 20);
		this.labelCoin.setColor(cc.color(255, 255, 255, 1));
		this.labelCoin.setPosition(cc.p(70, winSize.height - 20));
		this.addChild(this.labelCoin);
		
		// 添加距离标签
		this.labelMeter = new cc.LabelTTF("0M", "Helvetica", 20);
		this.labelMeter.setColor(cc.color(255, 255, 255, 1));
		this.labelMeter.setPosition(cc.p(winSize.width-70,  winSize.height - 20));
		this.addChild(this.labelMeter);
	}
});