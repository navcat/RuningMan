var res = {
		HelloBG_png : "res/gamePlay/helloBG.png",    // 开始界面的背景
		Start_n_png : "res/gamePlay/start_n.png",    // 开始按钮
		Start_s_png : "res/gamePlay/start_s.png",
		PlayBG_png  : "res/gamePlay/PlayBG.png",     // 跑步背景
		Runner_png  : "res/gamePlay/running.png",		// 奔跑者
		Running_plist : "res/gamePlay/running.plist", 	// 奔跑者
		map_png: "res/gamePlay/map.png",					// TiledMAP
		map00_tmx: "res/gamePlay/map00.tmx",
		map01_tmx: "res/gamePlay/map01.tmx",
		background_png :"res/gamePlay/background.png",    // 金币及岩石
		background_plist : "res/gamePlay/background.plist",
		restart_n_png : "res/gameOver/restart_n.png",
		restart_s_png : "res/gameOver/restart_s.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}