
const Store = require('electron-store')

class DB extends Store {

	constructor(name, options={}) {
		super(Object.assign(DB.DefaultOption, {name}, options))
		// this.key2OnChange = new Map()
		// this.set(key, val)
		// this.delete(key)
		// this.onDidChange(key, callback)
		// this.onDidAnyChange(callback)
		// this.size
	}

	getItem(key, defaultVal=null) {
		let v = this.get(key)
		if(!v && defaultVal) {
			v = defaultVal
			this.setItem(key, defaultVal)
		}
		return v
	}

	setItem(key, val) {
		this.set(key, val)
	}

	deleteItem(key) {
		this.delete(key)
	}
	

	static getItem(name, options={}) {
		// const item0 = this.key2Store.get(name)
		// if(item0)	return item0

		const item = new DB(name, options)
		// this.key2Store.set(name, item)
		
		return item
	}

	// static setItem(name, key, data) {
	// 	const item = this.getItem(name)
	// 	item.set(key, data)
	// }

	// static deleteItem(name) {
	// 	let item = this.getItem(name)
	// 	item.delete(name)
	// 	this.key2Store.delete(name)
	// 	item = null
	// }

	// static getExistItem(name) {

	// }

	static hasItem(name, options) {
		const item = new DB(name, options)
		return item.size>0
	}

}

// DB.key2Store = new Map()

DB.DefaultOption = {
	// name: "config",//文件名称,默认 config
	// cwd: app.getPath('userData'),//文件位置,尽量不要动
	encryptionKey: "aes-256-cbc" ,//对配置文件进行加密
	// clearInvalidConfig: true, // 发生 SyntaxError  则清空配置,
}

module.exports = DB

