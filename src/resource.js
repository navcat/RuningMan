var res = {
	HelloBG_png : "res/helloBG.png",    // 开始界面的背景
	Start_n_png : "res/start_n.png",    // 开始按钮
	Start_s_png : "res/start_s.png",
	PlayBG_png  : "res/PlayBG.png",     // 跑步背景
	Runner_png  : "res/runner.png",		// 奔跑者
	Runing_plist : "res/running.plist" 	// 奔跑者
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}