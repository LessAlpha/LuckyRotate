/**
 * 将传入的数组根据当前系统语言，按照中文或英文名重新排序，会影响原数组
 * @param list 必填要排序的list
 * @returns {*}
 */
export function arraySortByName(list) {
	if (list === undefined || list === null) return []
	list.sort((a, b) => {
		let strA = a.name
		let strB = b.name
		// 谁为非法值谁在前面
		if (strA === undefined || strA === null || strA === '' || strA === ' ' || strA === '　') {
			return -1
		}
		if (strB === undefined || strB === null || strB === '' || strB === ' ' || strB === '　') {
			return 1
		}
		// 如果a和b中全部都是汉字，或者全部都非汉字
		if ((strA.split('').every(char => notChinese(char)) && strB.split('').every(char => notChinese(char))) ||
			(strA.split('').every(char => !notChinese(char)) && strB.split('').every(char => !notChinese(char)))) {
			return strA.localeCompare(strB)
		} else {
			const charAry = strA.split('')
			for (var i in charAry) {
				if ((charCompare(strA[i], strB[i]) !== 0)) {
					return charCompare(strA[i], strB[i])
				}
			}
			// 如果通过上面的循环对比还比不出来，就无解了，直接返回-1
			return -1
		}
	})
	return list
}
   
function charCompare(charA, charB) {
	// 谁为非法值谁在前面
	if (charA === undefined || charA === null || charA === '' || charA === ' ' || charA === '　') {
	  	return -1
	}
	if (charB === undefined || charB === null || charB === '' || charB === ' ' || charB === '　') {
	  	return 1
	}
	// 如果都为英文或者都为汉字则直接对比
	if ((notChinese(charA) && notChinese(charB)) || (!notChinese(charA) && !notChinese(charB))) {
	  	return charA.localeCompare(charB)
	} else {
		// 如果不都为英文或者汉字，就肯定有一个是英文，如果a是英文，返回-1，a在前，否则就是b是英文，b在前
		if (notChinese(charA)) {
			return -1
		} else {
			return 1
		}
	}
}
   
function notChinese(char) {
	const charCode = char.charCodeAt(0)
	return charCode >= 0 && charCode <= 128
}