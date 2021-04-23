const deepClone = (source) => {
  if (source instanceof Object) {
    let result;
    if (source instanceof Array) {
      result = new Array();
    } else if (source instanceof Date) {
      result = new Date();
    } else if (source instanceof Function) {
      result = function () {
        return source.apply(this, arguments);
      };
    } else if (source instanceof RegExp) {
      result = new RegExp(source.source, source.flags);
    } else {
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
