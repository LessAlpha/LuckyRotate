
const path = require('path')
const fs = require('fs')
const { app } = require('electron')
const { timeFormatYMDHMS } = require('./index')
const { debug } = require('../conf')

exports.LevelsLog = {
	NONE: 0,
	LOG: 1,
	WARN: 2,
	ERROR: 3,
	ALL: 4,
}


let LogLevel = this.LevelsLog.ALL

let logPath = path.join(app.getPath('documents'), debug ? '.log.log' : '.log.log')

if(!fs.existsSync(logPath)) {
	fs.writeFile(logPath, 'start log\n', (err) => {
		if(err)	console.error('start log file error', err)
	})
}

module.exports = (level, ...msgs) => {
	if(level>LogLevel)	return

	const sinfo = stackInfo()
    	// , method = sinfo['method']
    	, file = sinfo['file']
    	, line = sinfo['line']
		, sMsg = file + ":" + line //+ "> "//"(" + method + ") <" + 
	
	const msg = '(' + timeFormatYMDHMS() + ' ' + sMsg + ') ' + msgs.toString()

	if(app.isPackaged) {
		fs.appendFile(logPath, msg + '\n', err => {
			if(err)	console.error('append log error',err)
		})
	} else {
		console.log(msg)
	}

}


// 获取代码执行栈
const stackInfo = () => {
    var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
    var stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
    var stacklist = (new Error()).stack.split('\n').slice(3);
    var s = stacklist[0];
    var sp = stackReg.exec(s) || stackReg2.exec(s);
    var data = {};
    if (sp && sp.length === 5) {
        data.method = sp[1];
        data.path = sp[2];
        data.line = sp[3];
        data.pos = sp[4];
        data.file = path.basename(data.path);
    }
 
    return data;
}


