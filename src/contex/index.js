// const { app } = require('electron')
const { EventEmitter } = require('events')
// const fs = require('fs')
// const Store = require('electron-store')
// const path = require('path')
const DB = require('../db')
const refer = require('../conf/refer')
const { DefaultWorkDirectory } = require('../conf')
// const utils = require('../utils')
// const { DefaultWorkDirectory } = require('../conf')
// const { generateNewDirectoryName, generateNewDocumentName } = require('../assist')

// 用户数据
class C extends EventEmitter {
	
	constructor() {
		super()
		this.storeApp = DB.getItem(refer.StorageKeys.App.name)
	}

	launchToday() {

	}
	
	// getFileWorkPath() {
	// 	return this.storeUser.getItem(refer.StorageKeys.User.keys.LOCAL_WORK_DIRECTORY, DefaultWorkDirectory)
	// }



}


module.exports = new C()