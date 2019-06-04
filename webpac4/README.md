# webpack4 多页面开发配置
# 
	一个webpack4的多页面开发配置实践。
# 
# 项目路径相关
	src下是开发内容，publick的index.html是所有页面html模板，dist是打包文件路径，package.json作为项目依赖项和项目介绍等，webpack.config.js 多页面webpack开发配置；
	当前 src/components下是一个demo例子，dist下是打包后的demo
# 
# 
# 配置所需插件
# 
1. webpack4+webpack_cli;
2. js的loader插件配置（兼容es6+）;
3. css-loader（这里简单配置了scss和sass的插件配置）;
4. html-webpack-plugin (自动生成html模板);
5. glob 插件用于动态添加入口
6. 详情可见webpack.config.js中
# 
# 开发配置可用于
# 
1. es6+的js开发应用，
2. jsx开发和相关react语法（react开发）
3. scss预编译
4. 编译后页面公用js和css单独分离出来统一加载，单独页面所引用，单独调用
5. 跨域请求代理配置等
6. 开发文件在src路径下components下每个页面对应一个文件夹
7. static作为静态或者公用js和css，图片等资源，public下index.html作为通用入口
#
# 控制命令行
# 
1. 安装所有依赖项：npm install 或者 cnpm install（前提安装node 8.0以上）
2. 开发过程并调试： npm run dev;
3. 开发环境过程打包(js和css不压缩)： npm run build-dev; 
4. 生产环境打包(js和css压缩)： npm run build; 
