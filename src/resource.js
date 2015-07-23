var res = {
	HelloBG_png : "res/helloBG.png",    // 开始界面的背景
	Start_n_png : "res/start_n.png",    // 开始按钮
	Start_s_png : "res/start_s.png",
	PlayBG_png  : "res/PlayBG.png",     // 跑步背景
	Runner_png  : "res/running.png",		// 奔跑者
	Running_plist : "res/running.plist", 	// 奔跑者
	map_png: "res/map.png",					// TiledMAP
	map00_tmx: "res/map00.tmx",
	map01_tmx: "res/map01.tmx",
	background_png :"res/background.png",    // 金币及岩石
	background_plist : "res/background.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}