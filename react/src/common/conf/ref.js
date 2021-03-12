
// 进程通信事件
export const EvtsAgent = {
	R2M_DOM_RENDER_READY: 'r2m/domRenderReady',// 主页面就绪完毕
	R2M_LOG: 'r2m/log',// 输出日志到运行日志中
}
// 本地存储Key值
export const StorageKey = {
	NAME_LIST: 'nameList'
}

export const ThemeCommon = {
	// 背景色相关
	BG_LOW_3: '--common-bg-low-3',
	BG_LOW_2: '--common-bg-low-2',
	BG_LOW_1: '--common-bg-low-1',
	BG: '--common-bg',
	BG_HIGH_1: '--common-bg-high-1',
	BG_HIGHLIGHT_1: '--common-bg-highlight-1',

	TXT_BG_LOW_3: '--common-txt-bg-low-3',
	TXT_BG_LOW_2: '--common-txt-bg-low-2',
	TXT_BG_LOW_1: '--common-txt-bg-low-1',
	TXT_BG: '--common-txt-bg',
	TXT_BG_HIGH_1: '--common-txt-bg-high-1',

	TXT_TITLE: '--common-txt-title',
	TXT_CONTENT: '--common-txt-content',
	TXT_HOVER: '--common-txt-hover',
	TXT_SELECTED: '--common-txt-selected',
	TXT_GRAY: '--common-txt-gray',
	TXT_FOCUS: '--common-txt-focus',
	TXT_BLUR: '--common-txt-blur',

	ICON_BG_NORMAL:'--common-icon-bg-normal',
	ICON_BG_HOVER:'--common-icon-bg-hover',
	ICON_BG_SELECTED:'--common-icon-bg-selected',
	ICON_BG_DISABLED:'--common-icon-bg-disabled',

	ICON_TXT_NORMAL:'--common-icon-txt-normal',
	ICON_TXT_HOVER:'--common-icon-txt-hover',
	ICON_TXT_SELECTED:'--common-icon-txt-selected',
	ICON_TXT_DISABLED:'--common-icon-txt-disabled',

	ICON_TIP_HOVER_TXT: '--common-icon-tip-hover-txt',
	ICON_TIP_HOVER_BG: '--common-icon-tip-hover-bg',
	ICON_TIP_NORMAL_TXT: '--common-icon-tip-normal-txt',
	ICON_TIP_NORMAL_BG: '--common-icon-tip-normal-bg',

	LIST_BG_NORMAL: '--common-list-bg-normal',
	LIST_BG_HOVER: '--common-list-bg-hover',
	LIST_BG_SELECTED: '--common-list-bg-selected',
	LIST_BG_DISABLED: '--common-list-bg-disabled',

	// LIST_TXT_NORMAL: '--common-list-txt-normal',
	// LIST_TXT_HOVER: '--common-list-txt-hover',
	// LIST_TXT_SELECTED: '--common-list-txt-selected',
	// LIST_TXT_DISABLED: '--common-list-txt-disabled',

	LIST_SCROLLBAR: '--common-list-scrollbar',

	INPUT_BORDER_BLUR: '--common-input-border-blur',
	INPUT_BORDER_FOCUS: '--common-input-border-focus',
	INPUT_BORDER_DISABLED: '--common-input-border-disabled',

	SELECTION_BG: '--common-selection-bg',
	SELECTION_TXT: '--common-selection-txt',

	SCROLLBAR_THUMB: '--common-scrollbar-thumb',
	SCROLLBAR_THUMB_SHADOW: '--common-scrollbar-thumb-shadow',

}

export const PopupTypes = {
	NONE:'none',
	NEW:'new',
	OPEN:'open',
	EXPORT:'export',
	THEME:'theme',
	TIP_CONFIRM:'tipConfirm',
	TIP_LOCK:'tipLock',
	TIP_LOGIN:'tipLogin',
	POP_MSG:'popMsg',
	LOGIN:'user',
	RESET_NAMES: 'resetNames'
}

export const ErrMsg = {
	0: '请求成功',// "Succeed",
}

// 客户端类型 从meta中获取，默认web
export const ClientTypes = {
	MOBILE: 'mobile',
	DESKTOP: 'desktop',
	WEB: 'web',
	WECHAT_PUBLIC: 'wechat_public',
	WECHAT_PROGRAM: 'wechat_program',
}
// 系统类型 默认mac
export const SystemTypes = {
	WIN: 'win',
	MAC: 'mac',
	ANDROID: 'android',
	IOS: 'ios',
	// WINDOWS_PHONE: 'windows_phone'
}

// // CSS 主题变量名
// export const Theme = {
// 	MAIN: '--theme-main',
// 	LIGHT: '--theme-light',
// 	DARK: '--theme-dark',
// 	EX: '--theme-ex',
// 	ASSIST: '--theme-assist',

// 	SELECTION_BG: '--theme-selection-bg',
// 	SELECTION_TXT_COLOR: '--theme-selection-txt-color',

// 	BG_LOW_3: '--theme-bg-low-3',
// 	BG_LOW_2: '--theme-bg-low-2',
// 	BG_LOW_1: '--theme-bg-low-1',
// 	BG: '--theme-bg',
// 	BG_HIGH_1: '--theme-bg-high-1',

// 	HIGHLIGHT_1: '--theme-highlight-1',
// 	HIGHLIGHT_2: '--theme-highlight-2',
// 	HIGHLIGHT_3: '--theme-highlight-3',
// 	HIGHLIGHT_4: '--theme-highlight-4',
// 	HIGHLIGHT_5: '--theme-highlight-5',

// 	TXT_NORMAL_1: '--theme-txt-normal-1',
// }