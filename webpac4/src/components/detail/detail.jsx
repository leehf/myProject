import React from "react"

//样式引入
import "@/static/css/common.scss";
import "./detail.scss";

export default function test(props) {
	return <div><h1> {props.msg}</h1><hr/>{props.arr} <a href="./about.html">跳转about页</a><a href="./detail.html">跳转详情页</a></div>
}; //这是js，如果需要支持 需要使用jsx提供支持