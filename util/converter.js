import curlToParams from "curl-to-params";
function decodeUnicode(str) {
  str = str.replace(/\\u/g, "%u");
  return decodeURI(str);
}
export const protocolConverter = url => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return {
      type: "http",
      data: {
        url: url
      }
    };
  }
  if (url.startsWith("request://")) {
    url = url.replace("request://", "curl ");
    const code = curlToParams(url);
    let params = code;
    if (params.body) {
      params.body = decodeUnicode(params.body);
      // if (params.method !== "get" && params.method !== "GET") {
      // let formData = new FormData();
      let _data = {};
      let _params = params.body.split("&&");
      for (let i = 0; i < _params.length; i++) {
        const key = _params[i].split("=")[0];
        const value = _params[i].split("=")[1];
        if (value === "" || value === undefined || value === null) {
          continue;
        }
        try {
          _data[key] = JSON.parse(value);
        } catch (e) {
          _data[key] = `${value.replace(/\\'/g, "'")}`;
        }
        // formData.append(key, value);
      }
      params.body = _data;
      // } else {

      // let data = {};
      // let _params = params.body.split("&&");
      // for (let i = 0; i < _params.length; i++) {
      //   const key = _params[i].split("=")[0];
      //   const value = _params[i].split("=")[1];
      //   if (value === "" || value === undefined || value === null) {
      //     continue;
      //   }
      //   data[key] = value;
      // }
      // params.body = data;
      // }
    }
    return {
      type: "request",
      data: params
    };
  }
  if (url.startsWith("route://")) {
    url = url.replace("route://", "curl ");
    const code = curlToParams(url);
    let params = code;
    // console.log("route", params);

    return { type: "route", data: params };
  }
  if (url.startsWith("page://")) {
    url = url.replace("page://", "");
    url = url.replace(/\\\r|\\\n/g, "");
    url = url.replace(/\s+/g, " ");
    let params = url.split(" ");
    if (params.length === 2) {
      return {
        type: "page",
        data: {
          url: params[1],
          method: params[0]
        }
      };
    } else {
      return {
        type: "page",
        data: null
      };
    }
  }
  if (url.startsWith("action://")) {
    url = url.replace("action://", "");
    url = url.replace(/\\\r|\\\n/g, "");
    url = url.replace(/\s+/g, " ");
    return {
      type: "action",
      data: {
        action: url || ""
      }
    };
  }
};
export const protocolMatchData = (url, data, context) => {
  url = url.replace(/"/g, "'");
  const reg = /\{[a-zA-z.]*\}/g;
  let matchResult = url.match(reg);
  if (matchResult && matchResult.length > 0) {
    if (data instanceof Array) {
      // console.log("array");
      data.forEach(_item => {
        let keys = Object.keys(_item);
        let _keys =
          context && _item[context]
            ? Object.keys(_item[context])
            : Object.keys(_item);
        const _data = context && _item[context] ? _item[context] : _item;
        matchResult.forEach(item => {
          try {
            const params = item.replace("{", "").replace("}", "");
            let key = params.split(".");
            let value = "";
            if (key.length > 1) {
              let _context = key[0];
              let _key = key[1];
              if (_key === "_") {
                value =
                  _keys.indexOf(_context) > -1
                    ? _data[_context]
                    : keys.indexOf(_context) > -1
                    ? _item[_context]
                    : {};
                let str = "";
                for (let k in value) {
                  let _val;
                  try {
                    _val =
                      typeof value[k] === "string"
                        ? value[k].replace(/'/g, "\\'")
                        : value[k] instanceof Object
                        ? JSON.stringify(value[k])
                        : value[k];
                  } catch (e) {
                    _val = value[k];
                  }
                  str += `-d '${k}=${_val}' `;
                }
                value = str;
              } else {
                value =
                  _keys.indexOf(_context) > -1
                    ? _data[_context][_key]
                    : keys.indexOf(_context) > -1
                    ? _item[_context][_key]
                    : "";
                let _val;
                try {
                  _val =
                    typeof value === "string"
                      ? value.replace(/'/g, "\\'")
                      : value instanceof Object
                      ? JSON.stringify(value)
                      : value;
                } catch (e) {
                  _val = value;
                }
                value = _val;
              }
            } else {
              let _key = key[0];
              if (_key === "_") {
                value = _item;
                let str = "";
                for (let k in value) {
                  let _val;
                  try {
                    _val =
                      typeof value[k] === "string"
                        ? value[k].replace(/'/g, "\\'")
                        : value[k] instanceof Object
                        ? JSON.stringify(value[k])
                        : value[k];
                  } catch (e) {
                    _val = value[k];
                  }
                  str += `-d '${k}=${_val}' `;
                }
                value = str;
              } else {
                value =
                  _keys.indexOf(_key) > -1
                    ? _data[_key]
                    : keys.indexOf(_key) > -1
                    ? _item[_key]
                    : "";
                let _val;
                try {
                  _val =
                    typeof value === "string"
                      ? value.replace(/'/g, "\\'")
                      : value instanceof Object
                      ? JSON.stringify(value)
                      : value;
                } catch (e) {
                  _val = value;
                }
                value = _val;
              }
            }
            if (value !== "") {
              url = url.replace(item, value);
            }
          } catch (e) {
            console.log(e);
          }
        });
      });
    } else if (data instanceof Object) {
      // console.log("object");
      let keys = Object.keys(data);
      let _keys =
        context && data[context]
          ? Object.keys(data[context])
          : Object.keys(data);
      const _data = context && data[context] ? data[context] : data;
      matchResult.forEach(item => {
        try {
          const params = item.replace("{", "").replace("}", "");
          let key = params.split(".");
          let value = "";
          if (key.length > 1) {
            let _context = key[0];
            let _key = key[1];
            if (_key === "_") {
              value =
                _keys.indexOf(_context) > -1
                  ? _data[_context]
                  : keys.indexOf(_context) > -1
                  ? data[_context]
                  : {};
              let str = "";
              for (let k in value) {
                let _val;
                try {
                  _val =
                    typeof value[k] === "string"
                      ? value[k].replace(/'/g, "\\'")
                      : value[k] instanceof Object
                      ? JSON.stringify(value[k])
                      : value[k];
                } catch (e) {
                  _val = value[k];
                }
                str += `-d '${k}=${_val}' `;
              }
              value = str;
            } else {
              value =
                _keys.indexOf(_context) > -1
                  ? _data[_context][_key]
                  : keys.indexOf(_context) > -1
                  ? data[_context][_key]
                  : "";
              let _val;
              try {
                _val =
                  typeof value === "string"
                    ? value.replace(/'/g, "\\'")
                    : value instanceof Object
                    ? JSON.stringify(value)
                    : value;
              } catch (e) {
                _val = value;
              }
              value = _val;
            }
          } else {
            let _key = key[0];
            if (_key === "_") {
              value = data;
              let str = "";
              for (let k in value) {
                let _val;
                try {
                  _val =
                    typeof value[k] === "string"
                      ? value[k].replace(/'/g, "\\'")
                      : value[k] instanceof Object
                      ? JSON.stringify(value[k])
                      : value[k];
                } catch (e) {
                  _val = value[k];
                }
                str += `-d '${k}=${_val}' `;
              }
              value = str;
            } else {
              value =
                _keys.indexOf(_key) > -1
                  ? _data[_key]
                  : keys.indexOf(_key) > -1
                  ? data[_key]
                  : "";
              let _val;
              try {
                console.log(value, typeof value === "string");
                _val =
                  typeof value === "string"
                    ? value.replace(/'/g, "\\'")
                    : value instanceof Object
                    ? JSON.stringify(value)
                    : value;
              } catch (e) {
                _val = value;
              }
              value = _val;
            }
          }
          url = url.replace(item, value);
        } catch (e) {
          console.log(e);
        }
      });
    }
  }
  return url;
};

export const executeProtocol = function(params) {
  const { type, data, cb = () => {} } = params;
  const _t = this;
  switch (type) {
    case "page":
      return this.navigator.pageNavigate(_t, data, cb);
    case "route":
      return this.navigator.routeNavigate(_t, data, cb);
    case "request":
      return this.navigator.requestNavigate(_t, data, cb);
    case "http":
      return this.navigator.httpNavigate(_t, data, cb);
  }
};
