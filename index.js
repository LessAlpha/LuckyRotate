

const {app, ipcMain, shell} = require('electron')
// const http = require('http')
// const path = require('path')
// const url = require('url')
// const fs = require('fs')
const Windower = require('./src/MainWindow')
const { SetMenu } = require('./src/conf/menu')
// const EventMgr = require('./src/base/EventMgr')
// const log = require('./src/utils/log')

const conf = require('./src/conf');
// const EventMgr = require('./src/base/EventMgr');
// const { UIEvts } = require('./src/conf/refer');

let mainWindow;
let server;
function startApp() {
	// log(1, 'process.argv', process.argv)
	// log(1, 'second', process.argv.length, '\n0:', process.argv[0], '\n1:', process.argv[1], '\n')
	if(!conf.debug)
		conf.ServerConfig.URL_APP = `file://${__dirname}/assets/`
	SetMenu()
	createMainWindow()
}

function registerEvts() {
}

// 新建主窗口
function createMainWindow () {
	
	mainWindow = new Windower()
	registerEvts()
}

const closeApp = () => {

	if(mainWindow) {
		mainWindow.exit()
		ipcMain.removeAllListeners()
	}
	if(server) {
		server.close()
		server = null
	}
	mainWindow = null
	if (process.platform !== 'darwin')
		app.quit()
}




const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  	app.quit()
} else {

	app.on('second-instance', (evt, argv, workingDirectory) => {
		// 当运行第二个实例时,将会聚焦到这个窗口
		// log(1, 'second', argv.length, '\n0:', argv[0], '\n1:', argv[1], '\n2:', argv[2], '\n  workingDirectory=', workingDirectory)
		if(mainWindow) {
			if(mainWindow.isMinimized()) 	mainWindow.restore()
			mainWindow.focus()
		}
	})

	app.on('ready', startApp)
	
	app.on('window-all-closed', () => {
		// log(1, 'all-closed')
		closeApp()
	})
	
	// 仅Mac有该事件，
	app.on('activate', () => {
		// log(1, 'on-activate', mainWindow === null)
		if (mainWindow === null) {
			startApp()
		} 
	})
}
