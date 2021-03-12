import { SystemTypes, ClientTypes } from './ref'
import { paramUrl, getMetaContentByName } from '../utils'

export const Version = 'V-022101';

export const ColorGroup = ["#AE3EFF", "#4D3FFF", "#FC262C", "#3A8BFF", "#EE7602", "#FE339F"]

export const Server = {

	// URL_API: "./api/",// 远程IP-请求接口地址
	// URL_FILE: "./uploads/img_article/",//远程IP-文件地址

	URL_API: "http://localhost/api/",// 本地-请求接口地址

	// URL_API: 'http://192.168.254.124:9292/api/',// 内网-请求接口地址
	// URL_API: "http://192.168.254.124:9898/uploads/img_article/",内网-文件地址

	
}


export let agentInfo = {
	// paramUrl().a || 
	clientType: '',
	systemType: '',// 移动端中iPhone和iPad统一为ios，其他为Android（暂不考虑winphone）
	// browserType: '',
	isDesktop: false,

	appWidth: 0,
	appHeight: 0,

	isMobileDisplayMode: false,//是否移动端模式显示
}
// TODO 确定客户端类型
;(()=>{
	const metaC = getMetaContentByName('c')
		, searchC = paramUrl().c || ClientTypes.WEB
		, ct = searchC ? searchC : (metaC ? metaC : ClientTypes.WEB)// TODO meta > serach > 'web'
		, ua = navigator.userAgent
	let st = ''
	switch(ct) {
		case ClientTypes.MOBILE:
			st = (ua.indexOf('iPhone')>-1 || ua.indexOf('iPad')>-1) ? SystemTypes.IOS : SystemTypes.ANDROID
			break
		case ClientTypes.DESKTOP:
			if(navigator.platform === "Win32" || navigator.platform === "Windows") st = SystemTypes.WIN
			else st = SystemTypes.MAC
			break
		case ClientTypes.WECHAT_PROGRAM:
		case ClientTypes.WECHAT_PUBLIC:

			break
		// case ClientTypes.WEB:
		default:
			if(ua.indexOf('iPhone')>-1 || ua.indexOf('iPad')>-1)	st = SystemTypes.IOS
			else if(ua.indexOf('Android')>-1)	st = SystemTypes.ANDROID
			else if(navigator.platform === "Win32" || navigator.platform === "Windows")	st = SystemTypes.WIN
			else st = SystemTypes.MAC
	}

	agentInfo.clientType = ct
	agentInfo.systemType = st
	agentInfo.isDesktop = ct===ClientTypes.DESKTOP
	agentInfo.isMobileDisplayMode = st===SystemTypes.ANDROID || st===SystemTypes.IOS
	// agentInfo.appWidth = document.body.offsetWidth
	// agentInfo.appHeight = document.body.offsetHeight
	// console.log('agent-info : ', agentInfo)
})();

// 中文字体中第一个是windows系统默认安装的字体，第二个是Mac系统的
export const EditorFontFamilies = ['微软雅黑,-apple-system', '宋体,华文宋体', '楷体,华文楷体', '黑体,华文黑体', '仿宋,华文仿宋', 'Ubuntu, Arial, sans-serif', 'Ubuntu Mono, Courier New, Courier, monospace']