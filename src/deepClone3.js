"use strict";
const deepClone = (source) => {
  if (source instanceof Object) {
    let result;
    switch (source.constructor.name) {
      case "Object":
        result = {};
        break;
      case "Array":
        result = new Array();
        break;
      case "Date":
        result = new Date(source.getTime());
        break;
      case "Function":
        result = function () {
          return source.apply(this, arguments);
        };
        break;
      case "String":
        result = new String(source.valueOf());
        break;
      case "Boolean":
        result = new Boolean(source.valueOf());
        break;
      case "Number":
        result = new Number(source.valueOf());
        break;
      case "Set":
        result = new Set();
        source.forEach((value) => {
          result.add(deepClone(value));
        });
        break;
      case "Map":
        result = new Map();
        for (let [key, value] of source) {
          result.set(key, deepClone(value));
        }
        break;
      case "Error":
        result = new Error(source.message);
        break;
      case "RegExp":
        result = new RegExp(source.source, source.flags);
        break;
      default:
        result = {};
    }
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        const index = parseInt(key);
        // String 对象用 for in 遍历，会自动遍历到 「第n个位置的字符」
        // 而这个属性是只读属性，无法赋值，就会导致代码报错，需要跳过这些属性
        if (
          source.constructor.name !== "String" ||
          (source.constructor.name === "String" &&
            (index < 0 || index >= source.length || isNaN(index)))
        ) {
          result[key] = deepClone(source[key]);
        }
      }
    }
    return result;
  } else {
    return source;
  }
};

module.exports = deepClone;
