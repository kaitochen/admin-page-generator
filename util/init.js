export const deepClone = obj => {
  let _this = obj;
  // Handle null or undefined or function
  if (null == _this || "object" != typeof _this) return _this;
  // Handle the 3 simple types, Number and String and Boolean
  if (
    _this instanceof Number ||
    _this instanceof String ||
    _this instanceof Boolean
  )
    return _this.valueOf();
  // Handle Date
  if (_this instanceof Date) {
    let copy = new Date();
    copy.setTime(_this.getTime());
    return copy;
  }
  // Handle Array or Object
  if (_this instanceof Object || _this instanceof Array) {
    let copy = _this instanceof Array ? [] : {};
    for (var attr in _this) {
      // eslint-disable-next-line no-prototype-builtins
      if (_this.hasOwnProperty(attr))
        copy[attr] = _this[attr] ? deepClone(_this[attr]) : _this[attr];
    }
    return copy;
  }
  throw new Error("Unable to clone obj! Its type isn't supported.");
};
export const isEmptyObject = obj => {
  if (JSON.stringify(obj) === "{}") {
    return false; // 如果为空,返回false
  }

  return true;
};
export const cloneWidget = obj => {
  let _this = obj;
  // Handle null or undefined or function
  if (null == _this || "object" != typeof _this) return _this;
  // Handle the 3 simple types, Number and String and Boolean
  if (
    _this instanceof Number ||
    _this instanceof String ||
    _this instanceof Boolean ||
    _this instanceof Date
  )
    return _this;

  // return _this;
  // Handle Date
  // Handle Array or Object
  if (_this.constructor == Object) {
    const type = _this.type;
    let key = "";
    if (type) {
      key = generateKey(type);
    } else {
      key = generateKey("col");
    }
    _this.key = key;
    _this.config = Object.assign(_this.config, { prop: key });
    if (_this.columns) {
      _this.columns = cloneWidget(_this.columns);
    }
    return _this;
  }
  if (_this.constructor == Array) {
    return _this.map(item => {
      const type = item.type;
      let key = "";
      if (type) {
        key = generateKey(type);
      } else {
        key = generateKey("col");
      }
      item.key = key;
      if (item.config) item.config = Object.assign(item.config, { prop: key });
      if (item.columns) {
        _this.columns = cloneWidget(item.columns);
      }
      return item;
    });
  }
  throw new Error("Unable to clone obj! Its type isn't supported.");
};
export const importWidget = obj => {
  let _this = obj;
  // Handle null or undefined or function
  if (null == _this || "object" != typeof _this) return _this;
  // Handle the 3 simple types, Number and String and Boolean
  if (
    _this instanceof Number ||
    _this instanceof String ||
    _this instanceof Boolean ||
    _this instanceof Date
  )
    return _this;

  // return _this;
  // Handle Date
  // Handle Array or Object
  if (_this.constructor == Object) {
    const type = _this.type;
    let key = "";
    if (type) {
      key = generateKey(type);
    } else {
      key = generateKey("col");
    }
    _this.key = key;
    if (!_this.config.prop) {
      _this.config = Object.assign(_this.config, { prop: key });
    }
    if (_this.columns) {
      _this.columns = importWidget(_this.columns);
    }
    return _this;
  }
  if (_this.constructor == Array) {
    return _this.map(item => {
      const type = item.type;
      let key = "";
      if (type) {
        key = generateKey(type);
      } else {
        key = generateKey("col");
      }
      item.key = key;
      if (item.config && !item.config.prop)
        item.config = Object.assign(item.config, { prop: key });
      if (item.columns) {
        _this.columns = importWidget(item.columns);
      }
      return item;
    });
  }
  throw new Error("Unable to clone obj! Its type isn't supported.");
};
export const generateKey = key => {
  return `${key}_${new Date().getTime()}_${parseInt(Math.random() * 100000)}`;
};

export class GenerateNavigate {
  constructor(options) {
    let { page, route, request, http } = options;
    this.pageNavigate = () => {};
    this.routeNavigate = () => {};
    this.requestNavigate = () => {};
    this.httpNavigate = () => {};
    this._page = page;
    this._route = route;
    this._request = request;
    this._http = http;
    this.init();
  }
  init() {
    if (this._page instanceof Function) {
      this.setPageNavigate(this._page);
    }
    if (this._route instanceof Function) {
      this.setRouteNavigate(this._route);
    }
    if (this._request instanceof Function) {
      this.setRequestNavigate(this._request);
    }
    if (this._http instanceof Function) {
      this.setHttpNavigate(this._http);
    }
  }
  _rewriteNavigate(type, cb) {
    switch (type) {
      case "page":
        this.pageNavigate = cb;
        break;
      case "route":
        this.routeNavigate = cb;
        break;
      case "request":
        this.requestNavigate = cb;
        break;
      case "http":
        this.httpNavigate = cb;
        break;
    }
  }
  setPageNavigate(cb) {
    this._rewriteNavigate("page", cb);
  }
  setRouteNavigate(cb) {
    this._rewriteNavigate("route", cb);
  }
  setRequestNavigate(cb) {
    this._rewriteNavigate("request", cb);
  }
  setHttpNavigate(cb) {
    this._rewriteNavigate("http", cb);
  }
}

export class GeneratorUpload {
  constructor(options) {
    const {
      ali = () => {
        return Promise.resolve();
      },
      tx = () => () => {
        return Promise.resolve();
      },
      qiniu = () => () => {
        return Promise.resolve();
      },
      server = () => () => {
        return Promise.resolve();
      }
    } = options;
    this._aliUpload = file => {
      return ali(file);
    };
    this._txUpload = file => {
      return tx(file);
    };
    this._qiniuUpload = file => {
      return qiniu(file);
    };
    this._serverUpload = file => {
      return server(file);
    };
  }
  setUploadFn(type, cb) {
    switch (type) {
      case "ali":
        this._aliUpload = cb;
        break;
      case "tx":
        this._txUpload = cb;
        break;
      case "qiniu":
        this._qiniuUpload = cb;
        break;
      case "server":
        this._serverUpload = cb;
        break;
    }
  }
  aliUpload(file) {
    return this._aliUpload(file);
  }
  txUpload(file) {
    return this._txUpload(file);
  }
  qiniuUpload(file) {
    return this._qiniuUpload(file);
  }
  serverUpload(file) {
    return this._serverUpload(file);
  }
}
