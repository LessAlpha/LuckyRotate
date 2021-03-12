const BsonObjID = require("bson-objectid");
const { shell } = require('electron')
// console.log(new bsonObjID().)
const net = require('net')
 
// 检测端口是否被占用
exports.isPortOccupied = (port, callback) => {
	// 创建服务并监听该端口
	var server = net.createServer().listen(port)
	
	server.on('listening', function () { // 执行这块代码说明端口未被占用
		server.close() // 关闭服务
		// console.log('The port【' + port + '】 is available.') // 控制台输出信息
		callback(port, false)
	})
	
	server.on('error', function (err) {
		if (err['code'] === 'EADDRINUSE') { // 端口已经被使用
			// console.log('The port【' + port + '】 is occupied, please change other port.')
		}
		callback(port, true)
	})
}

// 显示打开文件夹
exports.openFolder = (path)=> {
	shell.showItemInFolder(path)
}

exports.openDev = (browserView, debug)=> {

}

exports.getTimeStamp = ()=> {
	return new Date().getTime()
}

exports.newUUID = ()=> {
	// @ts-ignore 莫名报错？
	return BsonObjID().str
}

const deepCopy = input => { // 简单的递归深拷贝，只考虑 context 中 state 的复制，因此没有处理 function 等
	if (input instanceof Object) {
		if (Array.isArray(input)) {
			return input.map(deepCopy);
		}
		let output = {};
		Object.entries(input).forEach(([key, value]) => {
			output[key] = deepCopy(value);
		});
		return output;
	}
	return input;
};
exports.deepCopy = deepCopy



exports.timeFormatYMDHMS = (ts) => {
	const ymd = this.timeFormatYMD(ts)
	const hms = this.timeFormatHMS(ts)
	
    return ymd + ' ' + hms
}

exports.timeFormatYMD = (ts) => {
	let now 
	if(!ts)	now = new Date()
	else now = new Date(ts*1000)

    let year = '' + now.getFullYear();  //取得4位数的年份
    let month = '' + (now.getMonth()+1);  //取得日期中的月份，其中0表示1月，11表示12月
	let date = '' + now.getDate();      //返回日期月份中的天数（1到31）

	if(year.length===1)	year = '0' + year
	if(month.length===1)	month = '0' + month
	if(date.length===1)	date = '0' + date
	
    return year + "-" + month + "-" + date;//+" "+hour+":"+minute+":"+second; 
}

exports.timeFormatHMS = (ts) => {
	let now 
	if(!ts)	now = new Date()
	else now = new Date(ts*1000)
	
    let hour = '' + now.getHours();     //返回日期中的小时数（0到23）
    let minute = '' + now.getMinutes(); //返回日期中的分钟数（0到59）
	let second = '' + now.getSeconds(); //返回日期中的秒数（0到59）
	
	if(hour.length===1)	hour = '0' + hour
	if(minute.length===1)	minute = '0' + minute
	if(second.length===1)	second = '0' + second

    return hour + ":" + minute + ":" + second;//+" "+hour+":"+minute+":"+second; 
}

