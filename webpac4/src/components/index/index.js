console.log("index")

import React from "react"

import ReactDOM from "react-dom"




// js引入
import "@/static/js/common"
import "@/static/js/rem"

//组件的引入
import Test from "./index.jsx"

/* const firstR = React.createElement("h2", null, "this is a react-demo");

ReactDOM.render(firstR, document.querySelector("#app")); */
//数据
let data = {
	msg: "这是一个demo 4（this is a demo）",
	arr: ["a", "b", "c", "d"]
}

//方法的渲染，正常情况还有生命周期存在



ReactDOM.render( < div > < Test msg = {
		data.msg
	}
	arr = {
		data.arr
	} > < /Test></div > , document.querySelector("#app"));


//class的应用
//静态属性 ：通过构造函数，直接访问的属性，叫做静态属性
class Animal {
	//添加一个构造器,每一个class中都会有一个构造器，如果没有指定构造器，就会存在一个隐形空构造器
	//构造器作用，就是每当new实例一个类的时候，必先执行构造器中代码
	constructor(name, age) {
		this.name = name; //可以通过实例new 访问的属性，称为实例属性
		this.age = age;
	}

	static info = "是条狗"; //通过static关键词修饰的是静态属性、
	static show() {
		console.log("Animael的静态方法")
	}
	//该类的实例方法
	set() {
		console.log("Animael的实例方法")
	}
}
// const a = new Animal("dog", 3);
// console.log(a)
// console.log(a.info) //返回undefined，实例无法访问
// console.log(Animal.info) //返回"是条狗"，只能通过Animal访问，该类的静态属性属性
// a.set() //实例方法只能通过实例之后访问
// Animal.show()//
class dog extends Animal {
	constructor(name, age, type) {
		super();
		//this指向只能在super之后才能使用，
		//type：可作为当前dog类 特有的参数，区别于其他继承类
		this.name = name;
		this.age = age;
		this.type = type;
	}
}

//狗类，可继承Animal
const dog1 = new dog("黑狗", 4, "黑色类型")
console.log(dog1);
dog1.set()

class cat extends Animal {

}
const cat1 = new cat("白猫", 4)
console.log(cat1);
dog1.set()
