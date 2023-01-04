//导入模块
const electron = require('electron') 

const app = electron.app
app.htaokeUrl = "http://www.baidu.com"
const BrowserWindow = electron.BrowserWindow
var path = require("path");


function createWindow() {
	if (app.mainWindow) return;
	app.mainWindow = new BrowserWindow({
		width: 1440,
		height: 900,
		hasShadow: true,
		title: "【 xxx.com 】V " + app.appVer,
		webPreferences: {
			//设置session 如果一样的话 使用相同session
			partition: app.defaultPartition,
			// preload: path.join(__dirname, "ybk_before_load.js"),
			//表示是否允许一个使用 https的界面来展示由 http URLs 传过来的资源。默认false
			allowDisplayingInsecureContent: true,
			//此参数禁用当前窗口的同源策略
			allowRunningInsecureContent: true,
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
			
		}
	})



	// app.mainWindow.loadFile('index.html') //将index.html导入窗口
	var e = {
		httpReferrer: "http",
		extraHeaders: "",
		userAgent: app.USER_AGENT
	};
	app.mainWindow.loadURL(app.htaokeUrl, e);
	
	
	app.mainWindow.on("closed", function() {
		app.mainWindow = null;
		platforms.onExit()
	});
	app.mainWindow.setThumbarButtons([]);
	app.mainWindow.setProgressBar(1);
	app.mainWindow.setMenuBarVisibility(false);
	
	
	var n = app.mainWindow.webContents;
	
	//窗口结束加载时
	n.on("did-finish-load", onFinishLoad);
	
}


app.whenReady().then(createWindow) //创建窗口
//侦听器
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (app.mainWindow.getAllWindows().length === 0) {
		createWindow()
	}
})


//加载结束的监听
function onFinishLoad() {
	console.log('finish')
	if (!app.mainWindow) return;
	
	app.insertHookJs(app.mainWindow.webContents, path.join(__dirname, "./test.js"), function(e, n) {
		return 
	})
}
	

//app加下hook js文件  a:当前webcontents e:文件名 t:回调函数
app.insertHookJs = function(a, e, t) {
	var n = require("fs");
	console.log("-----------2222")

		console.log("-----------333")
		console.log(e)
	n.readFile(e, "utf-8", function(err, result) {
		console.log('---111555')
		if (err) {
			console.log('---11144')
			if (t) t(err)
		} else {
			console.log('---111333')
			console.log(result)
			if (a) a.executeJavaScript(result, true, function(e) {
				console.log('---11122')
				if (t) t(null, e)
			})
		}
	})
};	
	