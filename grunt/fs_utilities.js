"use strict";

var fs = require('fs');
var path = require('path');

// 同步递归获取指定目录下的所有文件
function getAllFiles(root) {
  var result = [], files = fs.readdirSync(root)
  files.forEach(function(file) {
    var pathname = root+ "/" + file
      , stat = fs.lstatSync(pathname)
    if (stat === undefined) return

    // 不是文件夹就是文件
    if (!stat.isDirectory()) {
      result.push(pathname)
    // 递归自身
    } else {
      result = result.concat(getAllFiles(pathname))
    }
  });
  return result
}

// 同步获取指定目录下的子目录列表
function getChildDirectories (root, isRecursion) {
  var result = [],
    files = fs.readdirSync(root);
  files.forEach(function (file) {
    var pathname = root + "/" + file,
      stat = fs.lstatSync(pathname);
    if (stat === undefined) return;

    // 如果是目录名，就加入result
    if (stat.isDirectory()) {
      result.push(file);
    }
    // 如果递归获取子目录
    if (isRecursion === true) {
      result = result.concat(getChildDirectories(pathname));
    }

  });
  return result;
}

var fsu = {
  getAllFiles : getAllFiles,
  getChildDirectories : getChildDirectories
};

module.exports = fsu;
