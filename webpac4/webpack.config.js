const webpack = require('webpack');
const path = require("path");
const glob = require("glob"); //用于遍历文件
const HtmlWebPackPlugin = require("html-webpack-plugin"); //html文件的引入
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清楚dist
const copyWebpackPlugin = require('copy-webpack-plugin'); //可复制静态目录
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css分离打包
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //css压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //js压缩

const env = process.env.NODE_ENV;

/* const htmlPlugin = new HtmlWebPackPlugin({
	template: path.join(__dirname, "./src/index.html"),
	filename: "index.html"
})
 */
// const htmlPluginsArr = [];
//html对应加入js
function htmlPlugins() {
	let htmlPluginsArr = [];
	glob.sync('./src/components/**/*.js').forEach(function(name) {
		let htmlPlugin = {};
		let nameStr = name.split("src/components/")[1].split("/")[0];
		console.log(nameStr)
		htmlPlugin = new HtmlWebPackPlugin({
			template: path.join(__dirname, "./pubilc/index.html"),
			filename: nameStr + ".html",
			inject: true,
			hash: false,
			chunks: ["common", nameStr]
		})
		htmlPluginsArr.push(htmlPlugin);
	})
	let cssPlugin = new MiniCssExtractPlugin({ //实例MiniCssExtractPlugin,实现样式分离
		filename: "css/[name].css",
		// allChunks: true,
		// chunkFilename: '[id].css',
	})

	// console.log(cssPlugin)
	htmlPluginsArr.push(cssPlugin);
	htmlPluginsArr.push(new webpack.HotModuleReplacementPlugin()) /* 开启热更新 */
	/* 	htmlPluginsArr.push(new copyWebpackPlugin([{
			from: __dirname + '/src/static', //打包的静态资源目录地址
			to: './static' //打包到dist下面的static、、只能用本地json测试、图片
		}])); */

	htmlPluginsArr.push(new CleanWebpackPlugin()); //清空dist
	return htmlPluginsArr;
}


// 动态添加入口
function getEntry() {
	let entry = {};

	// entry["common"] = "./src/static/js/common.js"//公用js添加入口文件中
	glob.sync('./src/components/**/*.js').forEach(function(name) {
		//读取src目录所有多页面入口
		// console.log(name)
		let nameStr = name.split("src/components/")[1].split("/")[0];
		// entry["babelPolyfill"] = "babel-polyfill";
		entry[nameStr] = name;
	})
	console.log(env);
	// console.log(entry)
	return entry;
}



module.exports = {
	// mode: "development", //development为开发模式,production//为发布模式打包
	entry: getEntry(),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].js'
		// chunkFilename: '[name].js'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				// 注意: priority属性
				// 其次: 打包业务中公共代码
				common: {
					name: "common",
					chunks: "all",
					minSize: 1,
					minChunks: 2,
					priority: 0
				}
			}
		},
		minimizer: [
			new UglifyJsPlugin({
				//js压缩，在使用css压缩后，原有的webpack4.0自带的压缩失效，必须重新安装插件
				cache: true, // Boolean/String,字符串即是缓存文件存放的路径
				parallel: true, // 启用多线程并行运行提高编译速度
				sourceMap: true
				/*
				  uglifyOptions: {
				    output: {
				      comments: false  // 删掉所有注释
				    }，
				    compress: {
				        warning: false, // 插件在进行删除一些无用的代码时不提示警告
				        drop_console: true // 过滤console,即使写了console,线上也不显示
				    }
				  } */
			}),
			new OptimizeCSSAssetsPlugin() //css压缩
		]
	},
	plugins: htmlPlugins(),
	module: {
		//所有第三方 模块的配置规则
		rules: [
			//第三方匹配规则
			{
				test: /\.js|jsx$/,
				use: "babel-loader",
				exclude: /node_modules/
			}, //一定需要添加上exclude排除項
			{
				test: /\.(c|sa|sc)ss$/,
				use: [
					// process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
					({
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					}),
					// 'style-loader',
					'css-loader',
					'sass-loader', {
						loader: "postcss-loader",
						options: {
							// url: false,
							plugins: [
								require("autoprefixer")({ /*在这里添加*/
									browsers: ['last 100 versions'] //必须设置支持的浏览器才会自动添加添加浏览器兼容
								})
							],
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000
				}
			},
			{
				test: /\.(png|jpge|jpg|gif|svg)/,
				loader: 'url-loader',
				options: {
					outputPath: "img/", //图片打包输出路径
					// publicPath: "./img", //打包后图片引用路径
					limit: 50000
				}
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx", "json", ".css", ".scss", ".png", ".jpge"], //表示这几个文件的后缀名，可省略不写，自动补齐 
		alias: {
			"@": path.join(__dirname, "./src") //路径替代符，@符号相当于直接表示项目的src的根目录下
		}
	},
	devServer: {
		// publicPath: '/', //
		contentBase: path.resolve(__dirname, 'dist'), //此处的路径必须和输出output文件的路径一致 否则无法自动更新，或者是基于output的相对路径
		// compress: true,
		// historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
		inline: true, //设置为true，当源文件改变时会自动刷新页面
		// grogress: true,
		host: '9.9.9.248', // 默认是localhost
		port: 8088, //指定用于侦听请求的端口号
		open: true, //当open启用时，开发服务器将打开浏览器。
		hot: true, // 开启热更新，开启热加载还需在主入口js文件中配置
		// openPage:'index.html',//指定在打开浏览器时导航到的页面。
		overlay: { //当存在编译器错误或警告时，在浏览器中显示全屏覆盖,显示警告和错误：
			warnings: true,
			errors: true
		},
		disableHostCheck: true,
		proxy: { //代理配置
			'/api': {
				// target: 'https://x.d.cn',/*需要跨域的接口地址*/
				pathRewrite: {
					'^/api': ''
				}, //如果不想/api传递，我们需要重写路径
			}
		}
	}
}
