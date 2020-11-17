import curlToParams from "curl-to-params";
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
    let params = JSON.parse(code);
    if (params.body) {
      let formData = new FormData();
      let _params = params.body.split("&");
      for (let i = 0; i < _params.length; i++) {
        const key = _params[i].split("=")[0];
        const value = _params[i].split("=")[1];
        formData.append([key], value);
      }
      params.body = formData;
    }
    return {
      type: "request",
      data: params
    };
  }
  if (url.startsWith("route://")) {
    url = url.replace("route://", "curl ");
    const code = curlToParams(url);
    let params = JSON.parse(code);
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
  const reg = /\{[a-zA-z.]*\}/g;
  let matchResult = url.match(reg);
  if (matchResult && matchResult.length > 0) {
    let keys = Object.keys(data);
    let _keys = context ? Object.keys(data[context]) : Object.keys(data);
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
                ? data[context][_context]
                : keys.indexOf(_context) > -1
                ? data[_context]
                : {};
            let str = "";
            for (let k in value) {
              str += `-d "${k}=${value[k]}" `;
            }
            value = str;
          } else {
            value =
              _keys.indexOf(_context) > -1
                ? data[context][_context][_key]
                : keys.indexOf(_context) > -1
                ? data[_context][_key]
                : "";
          }
        } else {
          let _key = key[0];
          if (_key === "_") {
            value = data;
            let str = "";
            for (let k in value) {
              str += `-d "${k}=${value[k]}" `;
            }
            value = str;
          } else {
            value =
              _keys.indexOf(_key) > -1
                ? data[context][_key]
                : keys.indexOf(_key) > -1
                ? data[_key]
                : "";
          }
        }
        url = url.replace(item, value);
      } catch (e) {
        console.log(e);
      }
    });
  }
  console.log(url);
  return url;
};

export const executeProtocol = function(params) {
  const { type, data } = params;
  switch (type) {
    case "page":
      return this.navigator.pageNavigate(data);
    case "route":
      return this.navigator.routeNavigate(data);
    case "request":
      return this.navigator.requestNavigate(data);
    case "http":
      return this.navigator.httpNavigate(data);
  }
};
