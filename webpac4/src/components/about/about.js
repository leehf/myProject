console.log("about")

import React from "react"

import ReactDOM from "react-dom"



// js引入
import "@/static/js/common"
import "@/static/js/rem"

//组件的引入
import Test from "./about.jsx"

/* const firstR = React.createElement("h2", null, "this is a react-demo");

ReactDOM.render(firstR, document.querySelector("#app")); */
//数据
let data = {
	msg: "这是一个demo 4（this is a demo）",
	arr: ["a", "b", "c", "d"]
}

//方法的渲染，正常情况还有生命周期存在



ReactDOM.render( <div> <Test msg = {
		data.msg
	}
	arr = {
		data.arr
	} > </Test></div> , document.querySelector("#app"));
