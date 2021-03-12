
const { BrowserView, BrowserWindow } = require('electron')
const path = require('path')
const log = require('../utils/log')
const { Evts } = require('../conf/refer')

class BaseViewer extends BrowserView {
	
	constructor(browserWindow, winOptions, type, url) {
		super(Object.assign(BaseViewer.DefaultOptions, winOptions))

		this.parentWindow = browserWindow
		this.type = type
		this.path = ''
		// this.key = this.type + '/' + this.path
		this.url = url
		this.channel2WinCallback = new Map()
		this.domReady = false
		this.msgWillSendToRender = []

		this.registerMsgFromRender()
		
		this.webContents.loadURL(url)
		// .loadURL(path.join('file://', __dirname, '../assets/index.html'));
	}
	// 显示
	show(sumTabs) {
	}
	onResize() {

	}
	// 移除自身
	removeSelf() {
		// const v = BrowserWindow.fromBrowserView(this)// 始终返回null
		// if(!v)	return
		this.parentWindow.removeBrowserView(this)
	}
	// 注册来自渲染进程的事件
	registerMsgFromRender() {
		this.webContents.on('ipc-message', this.onAsyncEvtFromRender.bind(this))
		this.webContents.on('ipc-message-sync', this.onSyncEvtFromRender.bind(this))
	}
	// 发送消息给渲染进程网页
	sendMsgToRender(channel, data) {
		if(!this.domReady) {
			this.msgWillSendToRender.push({channel, data})
			return
		}
		if(channel!==Evts.M2R_LOCAL_EXPLORER_LIST)	log(1, 'sendMsgToRender', this.id, channel, data)
		this.webContents.send(channel, data)
	}
	// 注销所有事件监听
	unregisterMsgFromRender() {
		// this.webContents.removeAllListeners()
		// this.webContents.removeListener('ipc-message',) 
		this.channel2WinCallback.clear()
	}
	// 添加window的监听
	addListenerToWindow(channel, callback) {
		this.channel2WinCallback.set(channel, callback)
	}

	onAsyncEvtFromRender(evt, channel, data) {
		log(1, 'onAsyncEvtFromRender', this.id, channel, data)
		if(!this.domReady && channel===Evts.R2M_DOM_RENDER_READY) {
			this.domReady = true
			this.sendMsgBeforeDomReadyToRender()
		}
		let c = this.channel2WinCallback.get(channel)
		if(c)		c(evt, data, channel, this.id)
	}

	onSyncEvtFromRender(evt, channel, data) {
		log(1, 'onSyncEvtFromRender', this.id, channel, data)
		let c = this.channel2WinCallback.get(channel)
		if(c)		c(evt, data, channel, this.id)
	}

	
	sendMsgBeforeDomReadyToRender() {
		while(this.msgWillSendToRender.length>0) {
			const e = this.msgWillSendToRender.shift()
			this.sendMsgToRender(e.channel, e.data)
		}
	}

	// 销毁
	destroy() {
		this.unregisterMsgFromRender()
		this.channel2WinCallback = null
		log(1, 'destroy-BaseViewer', this.path)
		super.destroy()
	}
}

BaseViewer.DefaultOptions = {
	backgroundColor: '#eee8d5',
	webPreferences: {
        // nodeIntegration: false, // 不集成 Nodejs
		preload: path.join(__dirname, '../../assets/renderer.js') // 预加载的 js 文件内仍可以使用 Nodejs 的 API
	},
}

module.exports = BaseViewer
