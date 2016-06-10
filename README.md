瓦力的前端UI库
====

# 目录结构

````
  |-bower_components # 第三方依赖
  |-components # 组件代码
  |   |-com1
  |   |-com2
  |   |-...
  |
  |-dist # 最终使用的代码
  |   |-css 
  |   |-images
  |       |-icons
  |       |-svg
  |       |-webfont
  |
  |
  |
  |-examples # 样例代码
  |-grunt # grunt方法
  |-images # 图片资源
  |   |-icons
  |   |-svg
  |   |-webfont
  |-less # UI库的核心源代码
  |-node_modules
  |-test
  |-.editorconfig
  |-.gitignore
  |-bower.json
  |-Gruntfile.js
  |-package.json
  |_README.md

````

# 使用

## install

````
  > npm install
  > bower install
````

这里需要注意，由于webfont生成工具`grunt-webfont`需要一个node环境外的字体编辑工具--`fontforge`，我们需要手动安装`fontforge`。安装教程[grunt-webfont](https://github.com/sapegin/grunt-webfont)

## 开发

````
  > grunt serve
````

开发时，通过这个指令可以启动一个webserver，并且启动文件监听，当文件发声变化，页面自动刷新。

## 发布

````
  > grunt build
````
