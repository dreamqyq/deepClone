const caches = [];
const deepClone = source => {
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

const findCloneResultFromCaches = source => {
  for (let i = 0; i < caches.length; i++) {
    if (caches[i][0] === source) {
      return caches[i][1];
    }
  }
};

const initResult = source => {
  let result;
  switch (source.constructor.name) {
    case 'Object':
      result = {};
      break;
    case 'Array':
      result = new Array();
      break;
    case 'Date':
      result = new Date(source.getTime());
      break;
    case 'Function':
      result = function () {
        return source.apply(this, arguments);
      };
      break;
    case 'String':
      result = new String(source.valueOf());
      break;
    case 'Boolean':
      result = new Boolean(source.valueOf());
      break;
    case 'Number':
      result = new Number(source.valueOf());
      break;
    case 'Set':
      result = new Set();
      source.forEach(value => {
        result.add(deepClone(value));
      });
      break;
    case 'Map':
      result = new Map();
      for (let [key, value] of source) {
        result.set(key, deepClone(value));
      }
      break;
    case 'Error':
      result = new Error(source.message);
      break;
    case 'RegExp':
      result = new RegExp(source.source, source.flags);
      break;
    default:
      result = {};
  }
  return result;
};

module.exports = deepClone;
