"use strict";
const caches = [];
const deepClone = (source) => {
  if (source instanceof Object) {
    const cachesResult = findCloneResultFromCaches(source);
    if (cachesResult) return cachesResult;
    const result = initResult(source);
    caches.push([source, result]);
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        result[key] = deepClone(source[key]);
      }
    }
    return result;
  } else {
    return source;
  }
};

const findCloneResultFromCaches = (source) => {
  for (let i = 0; i < caches.length; i++) {
    if (caches[i][0] === source) {
      return caches[i][1];
    }
  }
};

const initResult = (source) => {
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
        result.add(deepClone(value));
      });
      return result;
    }
    case "Map": {
      const result = new Map();
      for (let [key, value] of source) {
        result.set(key, deepClone(value));
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
};

module.exports = deepClone;
