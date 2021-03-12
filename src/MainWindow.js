
// const {app} = require('electron')
// const path = require('path')
// const fs = require('fs')
const BaseWindower = require('./base/BaseWindower')
const conf = require('./conf')
const { Evts, UIEvts } = require('./conf/refer')
const EventMgr = require('./base/EventMgr')
// const log = require('./utils/log')

class MainWindow extends BaseWindower {

	constructor() {
		super({
			title: 'HQ',
			// minWidth: 0, minHeight: 0,
			// width: 0, height: 0
		}, 'main', conf.ServerConfig.URL_APP + 'index.html')

		// this.currentView = null // 当前显示的view网页实例
		this.className = 'MainWindow'
		this.visibilityOfExplorer = true // 窗口是否显示了文件浏览器面板
		this.mainRenderReady = false// 主渲染界面就绪
		this.openingDocument = false
		this.registerEvts()
	
		// this.appIcon = new Tray(path.join(path.resolve('./'), 'assets/.png'))

		if(conf.debug)	this.webContents.openDevTools({mode:'detach'})
	}

	registerEvts() {
		this.registerMsgFromRender(Evts.R2M_DOM_RENDER_READY, this.onMainRenderReady.bind(this))

		// 通用栏操作
		this.registerMsgFromRender(Evts.R2M_MAXIMIZE_OR_NOT, this.onMaximizeOrNot.bind(this))
		this.registerMsgFromRender(Evts.R2M_MINIZE, this.onMinimize.bind(this))
		this.registerMsgFromRender(Evts.R2M_CLOSE_APP, this.onCloseApp.bind(this))

		// EventMgr.register(UIEvts., this.className, this..bind(this))

		// this.on('close', this.willExit.bind(this))
		// this.on('blur', this.onBlur.bind(this))
	}

	// window对象的准备事件，其它webcontents渲染进程中通过ipcRender发送该channel的数据也会触发！所以加个状态设置
	onMainRenderReady(evt, data) {
		if(this.mainRenderReady)	return// 其它webcontents的该事件也会派发过来

		// log(1, 'onMainRenderReady', Evts.R2M_DOM_RENDER_READY)
		this.mainRenderReady = true
		// this.sendMsgToRender(Evts.M2R_LOCAL_EXPLORER_LIST, Explorer.getLocalExplorerList)
		
		if(conf.isMac) {
			this.toFullWorkScreen()
		} else {
			this.maximize()// 在mac启动时该函数无效
		}
		this.setMinimumSize(800, 600)
		this.sendMsgToRender(Evts.M2R_MAXIMIZE_OR_NOT, {action: this.isMaximized()})
		
	}

	onMaximizeOrNot(evt, data) {
		const isMaxNow = this.isMaximized()
		if(isMaxNow) {
			this.unmaximize()
		} else {
			this.maximize()
		}
		this.sendMsgToRender(Evts.M2R_MAXIMIZE_OR_NOT, {action: !isMaxNow})
	}

	onMinimize(evt, data) {
		this.minimize()
	}

	onCloseApp(evt, data) {
		// TODO 判断未保存文件
		// log(1, 'onCloseApp')
		this.close()
	}

	onResize() {
		// this.sendMsgToRender(Evts.M2R_MAXIMIZE_OR_NOT, {action: this.isMaximized()})
	}

	exit() {
		EventMgr.clearAllEvt()
	}
}

module.exports = MainWindow
