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
        result[key] = deepClone(source[key]);
      }
    }
    return result;
  } else {
    return source;
  }
};

module.exports = deepClone;
