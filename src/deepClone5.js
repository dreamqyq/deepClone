"use strict";
class DeepClone {
  constructor() {
    this.caches = [];
  }
  clone(source) {
    if (source instanceof Object) {
      const cachesResult = this.findCloneResultFromCaches(source);
      if (cachesResult) return cachesResult;
      const result = this.initResult(source);
      this.caches.push([source, result]);
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
            result[key] = this.clone(source[key]);
          }
        }
      }
      return result;
    } else {
      return source;
    }
  }
  findCloneResultFromCaches(source) {
    for (let i = 0; i < this.caches.length; i++) {
      if (this.caches[i][0] === source) {
        return this.caches[i][1];
      }
    }
  }
  initResult(source) {
    const Constructor = source.constructor;
    switch (Constructor.name) {
      case "Object":
      case "Array":
        return new Constructor();
      case "String":
      case "Boolean":
      case "Number":
        return new Constructor(source);
      case "Date":
        return new Date(source.getTime());
      case "Function":
        return function () {
          return source.apply(this, arguments);
        };
      case "Set": {
        const result = new Set();
        source.forEach((value) => {
          result.add(this.clone(value));
        });
        return result;
      }
      case "Map": {
        const result = new Map();
        for (let [key, value] of source) {
          result.set(key, this.clone(value));
        }
        return result;
      }
      case "Error":
        return new Error(source.message);
      case "RegExp":
        return new RegExp(source.source, source.flags);
      default:
        return (result = new Object());
    }
  }
}

module.exports = DeepClone;
