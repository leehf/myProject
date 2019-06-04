# luck-draw

>这是一个简单的九宫格抽奖组件 demo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
<<<<<<< HEAD

=======
>>>>>>> 717dc36b145da4a5feb40940a156639a4b84031f
/*
 * 为父组件传递的参数有：
 * infoUrl //：进入页面时，需要向后台请求抽奖信息的地址
 * awardUrl //：点击抽奖按钮后，需要向后台请求中奖信息的地址
 * needDialog//：中奖后是否需要中奖信息弹窗，默认为true
 * rotaVal //:设定转动的圈数,默认为4圈
 *	receive(data) {	//请求成功并且成功转到中奖物品后返回的回调函数，data为请求成功后的数据},
 *	overtime(time) {//请求超时并返回的回调函数 time是当前旋转的定时器}
 *	cjStart() {//点击抽奖按钮的回调}
 *
 *  当前组件（子组件）参数由：
 * activeIndex//:九宫格转到当前的index（物品栏）值
 * boxRote //：背景图外圈轮转
 * delay //一个布尔值，为了用户点击抽奖到抽奖结果出来前，多次点击抽奖按钮
 * rewardId //请求成功后中奖的物品ID
 * rewardIndex //请求成功后中奖的物品ID 转化成的物品信息index值 
 * cjInfo//抽奖信息，list数组或者json数据
 * 其中抽奖信息中有：
 * picUrl：抽奖物品图片地址 
 * id：抽奖物品ID
 * name:抽奖物品name，暂时没添加，把name放在图片里面了
<<<<<<< HEAD
 *
 *
=======
>>>>>>> 717dc36b145da4a5feb40940a156639a4b84031f
 * rewardInfo//中奖信息,json数据
 * imgUrl：中奖物品图片地址 
 * id：中奖物品ID
 * name:中奖物品name，暂时没添加，把name放在图片里面了
 *
<<<<<<< HEAD
 *
 *
 *
 *
 *
 *
 * 调用方式：
 * <cj :infoUrl="infoUrl" :awardUrl="awardUrl" v-on:receiveData="receive" v-on:timeOut="overtime" :needDialog="needDialog" :cjClick="cjStart"></cj>

 */
=======
 * 调用方式： <cj '
 :infoUrl="infoUrl" :awardUrl="awardUrl" v-on:receiveData="receive" v-on:timeOut="overtime" :needDialog="needDialog" :cjClick="cjStart">
'</cj>
 *
 */
>>>>>>> 717dc36b145da4a5feb40940a156639a4b84031f

# 访问DEMO地址：
<a href="https://leehf.github.io/myProject/luck-draw/dist">点击访问</a>