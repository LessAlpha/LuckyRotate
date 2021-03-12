
const path = require('path')
const { app } = require('electron')
// const { ExplorerItemTypes,ROOT_NODE_ID } = require('./refer')

exports.debug = process.argv.indexOf('--debug')!==-1
exports.isMac = process.platform === 'darwin'

// const ServerConfig = require('./dev.json')

exports.UIConfig = {
	RelativePointOfView : {
		EXPLORER: {x: 375, y: 54},
		NO_EXPLORER: {x: 0, y: 54},
		// Y_NO_TAB_BAR: 24,
		// Y_HAS_TAB_BAR: 54,
		// PADDING_RIGHT_NO_EXPLORER: 65,
		// PADDING_RIGHT_HAS_EXPLORER: 375,
	}
}


exports.ServerConfig = {
	// URL_CHECK_UPDATE: "http://localhost:920/api/check_update",

	URL_APP: "http://localhost:3678/",

	// URL_API_PLATFORM: "http://localhost:9201/api",// 中心服接口链接

	// URL_API: "http://localhost/api/",// 本地-请求接口地址

}
exports.DefaultWorkDirectory = path.join(app.getPath('documents'), 'hq')

exports.ContentTypes = {
	"css": "text/css",
	"gif": "image/gif",
	"html": "text/html",
	"ico": "image/x-icon",
	"jpeg": "image/jpeg",
	"jpg": "image/jpeg",
	"js": "text/javascript",
	"json": "application/json",
	"pdf": "application/pdf",
	"png": "image/png",
	"svg": "image/svg+xml",
	"swf": "application/x-shockwave-flash",
	"tiff": "image/tiff",
	"txt": "text/plain",
	"wav": "audio/x-wav",
	"wma": "audio/x-ms-wma",
	"wmv": "video/x-ms-wmv",
	"xml": "text/xml"
};