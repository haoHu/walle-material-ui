module.exports = function (grunt) {
  "use strict";
  var fsu = require('./grunt/fs_utilities.js');
  var path = require("path");
  // 组件less文件配置

  var initComponentsLessCompileFiles = function () {
    var componentsPathName = 'components';
    var components = fsu.getChildDirectories(path.join(__dirname, componentsPathName));
    var result = {};
    console.log(components);
    components.forEach(function (file) {
      result[path.join(componentsPathName, file, file + '.css')] = path.join(componentsPathName, file, file + '.less');
    });
    console.log(result);
    return result;
  };
  // initComponentsLessCompileFiles();

  // 配置工具参数
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    clean : {
      dist : "dist"
    },
    //雪碧图
    sprity: {
      options : {
        // name : 'sprite',
        style : "../../../less/icons.less",
        'dimension': [{
            ratio: 1, dpi: 72
          }, {
            ratio: 2, dpi: 192
          }],
        cssPath : "../images/icons",
        processor : 'css',
        orientation : "vertical",
        margin:5,
        prefix : 'icon',
        split : true,

      },
      "dist/images/icons/icons" : "images/icons/**/*.png"
    },
    // svg sprite & svg symbol
    svg_sprite : {
      options : {
        shape : {
          id : {
            separator : '-',
            generator : function (name) {
              console.log(name);
              var separator = this.separator,
                id = path.join(path.dirname(name), path.basename(name, '.svg')).split(path.sep);
              id.shift();
              id.shift();
              id = id.join(separator).replace(/\s+/g, this.whitespace);
              return id;
            }
          }
        },
        mode : {
          css : {
            // 相对dest指向路径
            sprite : "../images/svg/sprite.css.svg",
            dimensions : true,
            bust : false,
            render : {
              less : {
                // 相对dest指向路径
                dest : '../../less/svg.sprite.less'
              }
            },
            example : {
              // 相对dest指向路径
              dest : "../../examples/sprite.svg.css.html"
            },
            dest : '../dist/css/'
          },
          symbol : {
            dimensions : true,
            bust : false,
            render : {
              less : {
                dest : '../../less/svg.symbol.less'
              }
            },
            example : {
              dest : "../../examples/sprite.svg.symbol.html"
            },
            dest : '../dist/images'
          }
        }
      },
      src : ['images/svg/**/*.svg']

    },
    // iconfont
    webfont : {
      icons : {
        src : 'images/webfont/*.svg',
        dest : 'dist/images/webfont',
        destCss : 'less',
        options : {
          font : 'NightElf',
          fontFilename : 'night-elf',
          // styles : ['font', 'webfont'],
          types : ['eot', 'woff2', 'woff', 'ttf', 'svg'],
          order : ['eot', 'woff2', 'woff', 'ttf', 'svg'],
          syntax : 'bem',
          stylesheet : 'less',
          templateOptions : {
            baseClass : 'ficon',
            classPrefix : 'ficon_',
            mixinPrefix : 'ficon_'
          },
          relativeFontPath : "../images/webfont",
          version : '0.1.0',
          htmlDemo : true,
          htmlDemoTemplate : 'test/templates/template.html',
          htmlDemoFilename : 'night.elf.webfont',
          destHtml : 'examples',
          ligatures : true,
          engine : 'fontforge',
          ie7 : false,
          normalize : true,
          // customOutputs : [{
          //   template : 'test/templates/template.html',
          //   dest : 'examples/'
          // }]

        }
      }
    },

    less : {
      core : {
        options : {
          paths : ["less"],
          sourceMap : true,
          sourceMapRootpath : "/",
          sourceMapFilename : "dist/css/core.css.map",
          sourceMapURL : "core.css.map"
        },
        files : {
          "dist/css/core.css" : "less/core.less"
        }
      },
      svg_sprite : {
        options : {
          paths : ["less"],
          sourceMap : true,
          sourceMapRootpath : "/",
          sourceMapFilename : "dist/css/svg.sprite.css.map",
          sourceMapURL : "svg.sprite.css.map"
        },
        files : {
          "dist/css/svg.sprite.css" : "less/svg.sprite.less"
        }
      },
      svg_symbol : {
        options : {
          paths : ["less"],
          sourceMap : true,
          sourceMapRootpath : "/",
          sourceMapFilename : "dist/css/svg.symbol.css.map",
          sourceMapURL : "svg.symbol.css.map"
        },
        files : {
          "dist/css/svg.symbol.css" : "less/svg.symbol.less"
        }
      },
      components : {
        options : {
          paths : ["components"],
          sourceMap : false
        },
        // files : {
        //   "components/button/button.css" : "components/button/button.less"
        // }
        files : initComponentsLessCompileFiles()
      }
    },
    autoprefixer : {
      options : {
        browsers : [
          "Chrome >= 20"
        ]
      },
      core : {
        files : {
          "dist/css/core.css" : "dist/css/core.css"
        }
      }
    },
    csslint : {
      options : {
        csslintrc : "less/.csslintrc"
      },
      dist : [
        'dist/css/core.css',
        'dist/components/**/*.css'
      ],
      // distmin : [
      //   'dist/css/core.min.css'
      // ]
    },
    cssmin : {
      options : {
        keepSpecialComments : "*",
        sourceMap : true,
        advanced: false
      },
      core: {
        src : "dist/css/core.css",
        dest : "dist/css/core.min.css"
      }
    },
    connect : {
      options : {
        port : 8041,
        hostname : 'localhost',
        livereload : 35730
      },
      livereload : {
        options: {
          open : true,
          base : "."
        }
      }
    },
    watch : {
      src : {
        files : "components/**/*.js",
        tasks : ["jshint:core"]
      },
      less : {
        files : ["less/**/*.less"],
        tasks : ["dist-less"]
      },
      livereload : {
        options : {
          livereload : "<%= connect.options.livereload %>"
        },
        files : [
          "examples/**/*.html",
          "dist/js/**/*.js",
          "dist/css/**/*.css",
          "components/**/*.css",
          "components/**/*.js",
          "components/**/*.html"
        ]
      }
    }
  });

  // 引用工具
  require("load-grunt-tasks")(grunt, {scope: 'devDependencies'});

  // 注册任务流

  // 注册webfont任务
  grunt.registerTask("web-font", [
    "webfont"
  ]);

  // 注册SVG icons拼接
  grunt.registerTask("svg-sprite", [
    "svg_sprite"
  ]);

  // 注册雪碧图拼接任务
  grunt.registerTask("icons-sprite", [
    "sprity"
  ]);

  // 注册less编译任务
  grunt.registerTask("less-compile", [
    "less"
  ]);

  // 注册less编译生成css任务
  grunt.registerTask("dist-less", [
    // 编译less
    "less-compile",
    // 自动生成前缀
    "autoprefixer",
    // css语法检查
    "csslint",
    // css压缩
    "cssmin"
  ]);

  // 注册开发调试任务流
  grunt.registerTask("serve", [
    "svg-sprite",
    "icons-sprite",
    "web-font",
    "dist-less",
    "connect:livereload",
    "watch"
  ]);

  // 注册发布任务
  grunt.registerTask("build", [
    "svg-sprite",
    "icons-sprite",
    "web-font",
    "dist-lest"
  ]);

}
