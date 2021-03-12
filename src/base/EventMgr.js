

class EventMgr {
	// private static _instance: EventMgr;
	static mapHandler = new Map()//<EventKind, Map<string, (data: any) => void>>;//kind, 

	static clearAllEvt(){
		this.mapHandler.clear();
	}

	/** 
	 * 注册监听事件（可以为不同类注册同一个事件）
	 * @param kind 事件类型
	 * @param className 响应函数所属类名
	 * @param func 响应函数
	 */
	static register(kind, className, func) {
		const funcs = this.mapHandler.get(kind) || (new Map());
		// if (funcs.has(className)) {
		// 	return
		// }
		funcs.set(className, func);
		this.mapHandler.set(kind, funcs);
		// console.info("register", kind, className, this.mapHandler)
	}

	/**
	 * 取消监听事件
	 * @param kind 事件类型
	 * @param className 响应函数所属类名
	 */
	static unregister(kind, className) {

		if (!this.mapHandler.has(kind)) {
			return
		}
		const funcs = this.mapHandler.get(kind);
		funcs.has(className) && funcs.delete(className);
		this.mapHandler.set(kind, funcs);
	}

	/**
	 * TODO 删除一个类名元素上注册的所有指令
	 * @param className 
	 */
	static unregisterInComp (className) {
		this.mapHandler.forEach((value,key)=>{
			this.unregister(key, className)
		})
	}

	/**
	 * 派发事件
	 * @param kind 事件类型
	 * @param data 传递的数据
	 */
	static dispatch(kind, data) {
		if (!this.mapHandler.has(kind)) {
			return
		}
		const funcs = this.mapHandler.get(kind);
		funcs.forEach(value => {
			value(data);//kind, kind
		})

	}

}

module.exports = EventMgr