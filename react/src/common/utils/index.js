
import md5 from 'md5';
/**
 * 根据时间戳和随机值生成ID
 * @param {长度} length 
 */
export const genID = length =>{
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}

export const genMD5ID = () =>{
    return md5('' + Date.now() + Math.random());
}

export const timeStampMilSec = () => {
    return new Date().getTime();
}

export const timeStampSec = () => {
    return parseInt(timeStampMilSec()/1000+"");
}

export const rand = (function(){
	var today = new Date(); 
	var seed = today.getTime();
	function rnd() {
		seed = ( seed * 9301 + 49297 ) % 233280;
		return seed / ( 233280.0 );
	};
	return function rand(number){
		return Math.ceil(rnd(seed) * number);
	};
})();

// var g=1551334252272; //定义一个时间戳变量
// var d=new Date(g);   //创建一个指定的日期对象
// console.log(d);
// console.log(formatDate(d));
export const timeFormatYMD = (ts) => {
    const now = new Date(ts*1000);
    const year=now.getFullYear();  //取得4位数的年份
    const month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    const date=now.getDate();      //返回日期月份中的天数（1到31）
    // const hour=now.getHours();     //返回日期中的小时数（0到23）
    // const minute=now.getMinutes(); //返回日期中的分钟数（0到59）
    // const second=now.getSeconds(); //返回日期中的秒数（0到59）
    return year+"-"+month+"-"+date;//+" "+hour+":"+minute+":"+second; 
}

export const paramUrl = () => {
    var url = window.location.search //获取url中"?"符后的字串 ('?modFlag=business&role=1')
    var theRequest = {};//new Object()
    if (url.indexOf('?') !== -1) {
        var str = url.substr(1) //substr()方法返回从参数值开始到结束的字符串；
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
    }
    return theRequest;
}

export const getMetaContentByName = (name, key='content') => {
	// key = key==null ? 'content' : key
	const ele = document.querySelector("meta[name='"+name+"']")
	if(!ele)	return null
	return ele.getAttribute(key) || null
}

export const handlePropagation = event => {
	event.stopPropagation();
};

export const handlePrevDefault = event => {
	event.preventDefault();
};

export const deepCopy = input => { // 简单的递归深拷贝，只考虑 context 中 state 的复制，因此没有处理 function 等
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

// 绑定this的目的是，使得func的this指针保持普通,调用时候的指向
// argument也为调用debounce过后的func传入的参数
export const debounce=(func,wait)=>{
	let timer = null;
	return function(){
		if(timer) clearTimeout(timer);
		timer = setTimeout(()=>{
			func.apply(this, arguments);
		},wait)
	}
  
}

export const minValInArray = (array) => {
    return Math.min.apply(Math,array);
}

export const IsPC = () => {
    var userAgent = navigator.userAgent;
    var Agents = ["Android", "iPhone", "Windows Phone", "iPad"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgent.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export const os = () => {
	var ua = navigator.userAgent,
	isWindowsPhone = /(?:Windows Phone)/.test(ua),
	isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
	isAndroid = /(?:Android)/.test(ua),
	isFireFox = /(?:Firefox)/.test(ua),
	isChrome = /(?:Chrome|CriOS)/.test(ua),
	isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
	isPhone = /(?:iPhone)/.test(ua) && !isTablet,
	isPc = !isPhone && !isAndroid && !isSymbian;
	return {
		isTablet: isTablet,
		isPhone: isPhone,
		isAndroid: isAndroid,
        isPc: isPc,
        isChrome
	};	
}

//利用原生Js获取操作系统版本
export const getOS = () => {
    var isWin = (navigator.platform === "Win32") || (navigator.platform === "Windows");
    if (isWin) return 'Win'
    var isMac = (navigator.platform === "Mac68K") || (navigator.platform === "MacPPC") || (navigator.platform === "Macintosh") || (navigator.platform === "MacIntel");
    if (isMac) return "Mac";
    var isUnix = (navigator.platform === "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return "Linux";

    return "other";
}

// // TODO 判断客户端类型，目前仅判断了PC浏览器和移动端浏览器
// export const whichTypeAgent = () => {
//     let tp = AgentTypes.BROWSER_PC;
//     var userAgent = navigator.userAgent;
//     var Agents = ["Android", "iPhone", "Windows Phone", "iPad"];
//     for (var v = 0; v < Agents.length; v++) {
//         if (userAgent.indexOf(Agents[v]) > 0) {
//             tp = AgentTypes.BROWSER_MOBILE;
//             break;
//         }
//     }
//     return tp;
// }

// 获取路径连接符，windows为反斜线，其它为斜线
let pathJoinTag = null
export const getPathJoinTag = () => {
    if(pathJoinTag) return pathJoinTag
    var agent = navigator.userAgent.toLowerCase();
    // var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0 || agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
        pathJoinTag = '\\'
    } else {
        pathJoinTag = '/'
    }
    return pathJoinTag
}

export const byteLength = (str) => {  //获取字符串的字节数，扩展string类型方法
    let b = 0, len = str.length;  //初始化字节数递加变量并获取字符串参数的字符个数
    if(len) {  //如果存在字符串，则执行计划
        for(var i = 0; i < len; i ++) {  //遍历字符串，枚举每个字符
            if(String.charCodeAt(str[i]) > 255) {  //字符编码大于255，说明是双字节字符
                b += 2;  //则累加2个
            } else {
                b ++;  //否则递加一次
            }
        }
        return b;  //返回字节数
    } else {
        return 0;  //如果参数为空，则返回0个
    }
}

export const limitStrByteLength = (str, length) => {

    let i = 0, l = str.length;  //初始化字节数递加变量并获取字符串参数的字符个数
    
    for(var b=0; i < l; i ++) {  //遍历字符串，枚举每个字符
        if(String.charCodeAt(str[i]) > 255) {  //字符编码大于255，说明是双字节字符
            b += 2;  //则累加2个
        } else {
            b ++;  //否则递加一次
        }
        if(b>=length) {
            break
        }
    }
    return str.substr(0, i)
}


// 图片处理
/**
 * 
 * @param {图片base64字符串} base64 
 * @param {*结果回调} callback 
 * @param {*压缩系数0-1之间,默认0.6} quality 
 * @param {*宽高限制，如果宽或高超过则等比例缩小至该值，默认2048} widthHeightMax 
 * @param {*图片最大容量限制，kb值，默认1024} sizeMax 
 */
export const compressBase64Img = (base64, callback, quality=0.6, widthHeightMax=2048, sizeMax=1024) => {
    var newImage = new Image();
    // var quality = 0.6;    //压缩系数0-1之间
    console.log("quality/widthHeightMax/sizeMax = ", quality,'/', widthHeightMax,'/', sizeMax);
    newImage.src = base64;
    newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
    var imgWidth, imgHeight;
    newImage.onload = function () {
        imgWidth = this.width;
        imgHeight = this.height;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        if (Math.max(imgWidth, imgHeight) > widthHeightMax) {
            if (imgWidth > imgHeight) {
                canvas.width = widthHeightMax;
                canvas.height = widthHeightMax * imgHeight / imgWidth;
            } else {
                canvas.height = widthHeightMax;
                canvas.width = widthHeightMax * imgWidth / imgHeight;
            }
        } else {
            canvas.width = imgWidth;
            canvas.height = imgHeight;
            quality = 0.6;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
        // 如想确保图片压缩到自己想要的尺寸,如要求在sizeMax kb之间，请加以下语句，quality初始值根据情况自定
        while (base64.length / 1024 > sizeMax) {
        	quality -= 0.01;
        	base64 = canvas.toDataURL("image/jpeg", quality);
        }
        // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
        // while (base64.length / 1024 < 50) {
        // 	quality += 0.001;
        // 	base64 = canvas.toDataURL("image/jpeg", quality);
        // }
        callback(base64);//必须通过回调函数返回，否则无法及时拿到该值
    }
}

export const openOuter = (e) => {
	const url = e.target.getAttribute('href');
	e.preventDefault();
	// e.stopPropagationImediate()
	window.open(url, '_blank');
	// console.log('url', url)
}


export const randArr = (arr) => {
    for (var i = 0; i < arr.length; i++) {
        var iRand = -1 + rand(arr.length)//parseInt(arr.length * Math.random());
        var temp = arr[i];
        arr[i] = arr[iRand];
        arr[iRand] = temp;
    }
    return arr;
}