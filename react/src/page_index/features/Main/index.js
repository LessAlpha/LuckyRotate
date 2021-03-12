import React, { useRef, useLayoutEffect, useContext } from 'react';
import { css } from 'emotion';
import { context } from '../../context';
import Icon from '../../../common/components/ToolIcon'
import Pointer from '../../../common/statics/img/wheel-pointer.png'
import ImgBg from '../../../common/statics/img/wheel-bg.png'
// import { cState } from '../../conf'
import { setNameList } from '../../../common/reducer/common/actionCreator'
import usePop from '../../customHooks/usePop'
import { rand, randArr } from '../../../common/utils'


const Main = () => {
    const self = useRef();
    const popHook = usePop();
    // const []
    const { common:{state:cState, dispatch:cDispatch} } = useContext(context);
    
    useLayoutEffect(()=>{
        drawWheelCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cState]);

    useLayoutEffect(()=>{
        let a = cState.rewardNames
        a = randArr(a)
        const sa = a.join(',')
        cDispatch(setNameList(sa))
    }, [])

    const onClickPointer = () => {
        // 正在转动，直接返回
        if(cState.bRotate) return;

        cState.bRotate = !cState.bRotate;
        var count = cState.rewardNames.length;
        var id = rand(count)
        var prize = {
            id: "" + id,
            // name: cState.rewardNames[id-1]
        }
        // console.log('prize:', id, cState.rewardNames[id])
        cState.prizeId.forEach(function(currentValue, index) {
            if(currentValue === prize.id){
                var item = index;
                var name = cState.rewardNames[index]
                rotateFunc(item, name, count);
            }
        })
    }

    const onClickResetName = () => {
        popHook.showLogin()
    }

    //旋转转盘 item:奖品序号，从0开始的; txt：提示语 ,count 奖品的总数量;
    const rotateFunc = function (item, tip,count){
        popHook.pushTipFlash("敬请期待明天的主持嘉宾")
        // 应该旋转的角度，旋转插件角度参数是角度制。
        var baseAngle = 360 / count;
        // 旋转角度 == 270°（当前第一个角度和指针位置的偏移量） - 奖品的位置 * 每块所占的角度 - 每块所占的角度的一半(指针指向区域的中间)
        var angles = 360 * 3 / 4 - ( item * baseAngle) - baseAngle / 2; // 因为第一个奖品是从0°开始的，即水平向右方向
        // eslint-disable-next-line no-undef
        $('#wheelCanvas').stopRotate();
        // 注意，jqueryrotate 插件传递的角度不是弧度制。
        // 哪个标签调用方法，旋转哪个控件
        // eslint-disable-next-line no-undef
        $('#wheelCanvas').rotate({
            angle:0,
            animateTo:angles + 360 * 3, // 这里多旋转了5圈，圈数越多，转的越快
            duration: 15000,
            callback:function (){ // 回调方法
                // console.log("prize：", tip);
                popHook.pushTipFlash("恭喜明天的主持嘉宾："+tip)
                cState.bRotate = !cState.bRotate;

            }
        });
    };

    const drawWheelCanvas = () => {
        var canvas = document.getElementById("wheelCanvas");
        var baseAngle = Math.PI * 2 / (cState.rewardNames.length);
        var ctx = canvas.getContext("2d");
        var canvasW = canvas.width; // 画板的高度
        var canvasH = canvas.height; // 画板的宽度
        // console.log(canvasW);
        ctx.fillStyle = "#fff000";
        ctx.clearRect(0,0,canvasW,canvasH);//去掉背景默认的黑色
        ctx.strokeStyle = "#199301"; //线的颜色
        ctx.font = '26px Microsoft YaHei';
        //ctx.closePath();
        //使用了beginPath(),canvas会知道是重新画一条，如果给这几条设置不同的属性也是可以的。
        for(var index = 0; index < cState.rewardNames.length; index++) {
            var angle = cState.startAngle + index * baseAngle;
            ctx.fillStyle = cState.colors[index];
            ctx.beginPath();
            ctx.arc(canvasW * 0.5, canvasH * 0.5, cState.outsideRadius, angle, angle + baseAngle, false);
            ctx.arc(canvasW * 0.5, canvasH * 0.5, cState.insideRadius, angle + baseAngle, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            ctx.fillStyle = "#FFFF00";
            var rewardName = cState.rewardNames[index];

            // var line_height = 24;
            var translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * cState.textRadius;
            var translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * cState.textRadius;
            ctx.translate(translateX, translateY);
            ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
            //ctx.drawImage(imgUrl1, -15, 10);
            ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 100);
            //添加对应图标
            // if(index == 0){
            //     ctx.drawImage(imgUrl1,-35,0,60,60);
            // }else if(index == 1){
            //     ctx.drawImage(imgUrl2,-35,0,60,60);
            // }else if(index == 2){
            //     ctx.drawImage(imgUrl3,-35,0,60,60);
            // }else if(index == 3){
            //     ctx.drawImage(imgUrl4,-35,0,60,60);
            // }else if(index == 4){
            //     ctx.drawImage(imgUrl5,-35,0,60,60);
            // }else{
            //     ctx.drawImage(imgUrl6,-35,0,60,60);
            // }
            ctx.restore(); //很关键
        }
    }

    return (<main ref={self} className={wrapper}>
        <div className={toolbar_style}>
            <Icon icon="users" onClick={onClickResetName}>名单</Icon>
        </div>
        <div className="ck-wheel">
            <div className="wheel">
                <canvas className="item" id="wheelCanvas" width="844px" height="844px"></canvas>
                <img className="pointer" src={Pointer} alt="button" onClick={onClickPointer} />
            </div>
        </div>
    </main>);
};

export default Main;

// CSS
const wrapper = css`
    height: calc(100vh - 56px);
    margin: 56px 0 0;
    overflow: scroll;
    font-size: 54.8px;

    .ck-wheel{
        width:100%;
        height:6.64em;
        // background:url(./balloon@2x.png);
        background-size: contain;
    }

    .wheel{
        display:block;
        /* width:6.64em;
        height:6.64em; */
        position: absolute;
        left: 50%;
        top: 55%;
        transform: translate(-50%,-50%) scale(1.7);
        background-image: url(${ImgBg});
        background-size:100% 100%;
        margin: 0 auto;
    }
    img.pointer{
        position:absolute;
        width: 3em;
        height: 3.3em;
        left: 1.82em;
        top: 1.67em;
        cursor: pointer;
        opacity: 0.86;
        &:hover {
            opacity: 1;
        }
    }
    #wheelCanvas{
        width:6.64em;
        height:6.64em;
    }
`;

const toolbar_style = css`
    position: absolute;
    right: 10px;
    top: 10px;
`
