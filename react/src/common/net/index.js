import { EvtsAgent } from '../conf/ref'

const electron = window.electron
	, mobile = window.ReactNativeWebView
	, MsgLogFilter = [EvtsAgent.R2M_DOCUMENT_EDITED, EvtsAgent.R2M_VIEW_TAB_FOCUSED]

export const sendAsyncMsgToAgent =(channel, data)=>{
	if(MsgLogFilter.indexOf(channel)===-1)	
		console.log(channel+'-Async', data)
	if(electron) {
		electron.ipcRenderer.send(channel, data)
	} else if(mobile) {
		const obj = {cmd:channel, data}//Object.assign({cmd: channel}, data)
		mobile.postMessage(JSON.stringify(obj))
	}
}

export const sendSyncMsgToElectron = (channel, data)=>{
	if(!electron)	return
	if(MsgLogFilter.indexOf(channel)===-1)	
		console.log(channel+'-Sync', data)
	return electron.ipcRenderer.sendSync(channel, data)
}

export const register = (channel, callback)=>{
	if(!electron)	return
	electron.ipcRenderer.on(channel, callback)
}

export const remove = (channel, callback)=>{
	if(!electron)	return
	electron.ipcRenderer.removeListener(channel, callback)
}

export const log = (level, ...msgs) => {
	if(!electron)	return

	const msg = msgs.toString()
	electron.ipcRenderer.send(EvtsAgent.R2M_LOG, {level, msg})
}