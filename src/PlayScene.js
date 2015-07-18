/**
 * 跑步场景
 */
var PlayScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		
		this.addChild(new RuningBgLayer());
		this.addChild(new AnimationLayer());
		this.addChild(new StatusLayer());
	}
});