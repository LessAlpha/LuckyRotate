
const { BrowserWindow, screen, ipcMain } = require('electron')
const path = require('path')

class BaseWindower extends BrowserWindow {

	constructor(winOptions, type, url) {
		super(Object.assign(BaseWindower.DefaultOptions, winOptions))

		if(winOptions.width==undefined || winOptions.height==undefined) {// 默认全屏
			this.toFullWorkScreen()
		}

		this.type = type
		this.url = url

		this.on('resize', this.onResize.bind(this))
		this.on('close', this.onClose.bind(this))

		if(url)	this.loadPage(url)
	}
	
	onResize() {
	}
	
	onClose() {
	}
	// 注册
	registerMsgFromRender(channel, callback) {
		ipcMain.on(channel, callback)
	}
	// 发送消息给本渲染进程网页
	sendMsgToRender(channel, data) {
		this.webContents.send(channel, data)
	}

	// 显示
	show() {

	}
	// 隐藏
	hide() {

	}
	// 加载网页
	loadPage(url) {
		this.loadURL(url)
	}
	toFullWorkScreen() {
		const { width, height } = screen.getPrimaryDisplay().workAreaSize
		// this.setSize(width, height)
		// this.setPosition(0, 0)
		this.setBounds({x:0, y:0, width, height})
	}
}

BaseWindower.DefaultOptions = {
	minWidth: 500,
	minHeight: 500,
	x:0,
	y:0,
	// show:false,
	// frame: false,
	// titleBarStyle: 'hidden',//'hiddenInset',
	// backgroundColor: '#eee8d5',
	webPreferences: {
		preload: path.join(__dirname, '../../assets/renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
	},
}

module.exports = BaseWindower
