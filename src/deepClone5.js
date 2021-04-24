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
          result[key] = this.clone(source[key]);
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
          result.add(this.clone(value));
        });
        break;
      case 'Map':
        result = new Map();
        for (let [key, value] of source) {
          result.set(key, this.clone(value));
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
  }
}

module.exports = DeepClone;
