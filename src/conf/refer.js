
const { app } = require('electron')

// 进程通信事件
exports.Evts = {
	R2M_DOM_RENDER_READY: 'r2m/domRenderReady',// 主页面就绪完毕
	R2M_LOG: 'r2m/log',// 输出日志到运行日志中

}

exports.UIEvts = {
	
}
// 本地保存数据
exports.StorageKeys = {
	App: {
		name: 'app',
		keys: {
			NAME_LIST: 'app/nameList',// 当前的启动记录日期，用于服务端统计日启动用户
			
		}
	},
}
// exports.ROOT_DIRECTORY_ID = ''// 根目录ID