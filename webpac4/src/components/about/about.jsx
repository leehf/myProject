import React from "react"

//样式引入
import "@/static/css/common.scss";
import "./about.scss"; 
/* 图片引入 */
import bg from "@/static/img/bg1"

export default function test(props) {
	return <div><h1> {props.msg}</h1><hr/>{props.arr} <a href="./index.html">跳转首页</a><a href="./detail.html">跳转详情页</a><img src={bg} /></div>
}; //这是js，如果需要支持 需要使用jsx提供支持