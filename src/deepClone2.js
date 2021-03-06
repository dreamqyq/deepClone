"use strict";
const deepClone = (source) => {
  if (source instanceof Object) {
    const result = {};
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

module.exports = deepClone;
