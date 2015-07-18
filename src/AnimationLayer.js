
/**
 * 动画层
 */
var AnimationLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
		
		var spritRuner = new cc.Sprite(res.Runner_png);
		spritRuner.attr({
			x: 80,
			y: 85
		});
		var actionTo = new cc.moveTo(2, cc.p(300, 85));
		spritRuner.runAction(new cc.Sequence(actionTo));
		this.addChild(spritRuner);
	}
});