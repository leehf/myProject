console.log("公共js")
const deatest = () => {
	console.log("测试箭头函数效果！！！")
}


const promise = new Promise((resolve, reject) => {
	resolve(1);
	console.log("promise 是否解析1");
}).then(r => {
	console.log("promise 是否解析2");
});


function toindex() {
	window.location.href = "./index.html"
};
