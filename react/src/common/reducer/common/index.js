import * as actionTypes from './actionTypes'
import {deepCopy} from '../../utils';
import { StorageKey } from '../../conf/ref'
import { ColorGroup } from '../../conf'

let rewardNamesStorage = localStorage.getItem(StorageKey.NAME_LIST)
if(!rewardNamesStorage) {
    rewardNamesStorage = "A,B,C"
    localStorage.setItem(StorageKey.NAME_LIST, rewardNamesStorage)
}
// const rewardNames = rewardNamesStorage.split(',')

const generateConfByNames = (names) => {

    const rewardNames = names.split(',')
    
    const prizeId = []
        , colors = []
        , SumColors = ColorGroup.length
    for(var i=0; i<rewardNames.length; i++) {
        if(i===0)
            prizeId.push(""+rewardNames.length)
        else
            prizeId.push(""+i)
        
        colors.push(ColorGroup[i%SumColors])
    }
    if(colors[0]===colors[colors.length-1]) {
        colors[colors.length-1] = colors[2]
    }

    return {
        rewardNames, prizeId, colors
    }
}
const dataOriginal = generateConfByNames(rewardNamesStorage)

export const defaultValue_common = {
    rewardNames: dataOriginal.rewardNames, //转盘奖品名称数组
    // rewardUrl: [], //转盘奖品图片
    prizeId: dataOriginal.prizeId,
    colors: dataOriginal.colors, //转盘奖品区块对应背景颜色
    outsideRadius: 340, //转盘外圆的半径
    textRadius: 390, //转盘奖品位置距离圆心的距离
    insideRadius: 68, //转盘内圆的半径
    startAngle: 0, //开始角度
    bRotate: false //false:停止;ture:旋转
}

export default (global, action) => {
    const g = deepCopy(global)
    switch (action.type) {
        case actionTypes.SET_NAME_LSIT:{
            localStorage.setItem(StorageKey.NAME_LIST, action.data.names)
            const d = generateConfByNames(action.data.names)
            return Object.assign(g, d)
        }
        default:
            return global;
    }
};

// const prizeId = []
// for(var i=0; i<rewardNames.length; i++) {
//     if(i===0)
//         prizeId.push(""+rewardNames.length)
//     else
//         prizeId.push(""+i)
// }

// const colors = [
//     "#AE3EFF",
//     "#4D3FFF",
//     "#FC262C",
//     "#3A8BFF",
//     "#EE7602",
//     "#FE339F",// Group
//     "#AE3EFF",
//     "#4D3FFF",
//     "#FC262C",
//     "#3A8BFF",
//     "#EE7602",
//     "#FE339F",
//     "#AE3EFF",
//     "#4D3FFF",
//     "#FC262C",
//     "#3A8BFF",
//     "#EE7602",
//     "#FE339F",
//     "#3A8BFF",
// ]
