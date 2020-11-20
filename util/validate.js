export const validateConfigLength = config => {
  if (config.length !== 1) {
    return false;
  } else {
    return true;
  }
};

// const validateRule = {
//   text: validateText
// };
const validateText = el => {
  let _validator;
  let rules = "";
  if (el.config.pattern.length <= 0) {
    return (rule, value, callback) => {
      let _value = value + "";
      if (_value == "") {
        callback(new Error("输入不能为空"));
      } else {
        callback();
      }
    };
  }
  let _pattern = el.config.pattern.join(",");
  switch (_pattern) {
    case "ch":
      _validator = /[^\u4e00-\u9fa5]/g;
      rules = "仅能输入中文字符";
      break;
    case "eng":
      _validator = /[^A-Za-z]/g;
      rules = "仅能输入英文字符";
      break;
    case "num":
      _validator = /[^0-9]/g;
      rules = "仅能输入数字";
      break;
    case "symbol":
      _validator = /[^`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
      rules = "仅能输入标点符号";
      break;
    case "ch,eng":
    case "eng,ch":
      _validator = /[^\u4e00-\u9fa5A-Za-z]/g;
      rules = "仅能输入中英文字符";
      break;
    case "ch,num":
    case "num,ch":
      _validator = /[^0-9\u4e00-\u9fa5]/g;
      rules = "仅能输入中文与数字";
      break;
    case "ch,symbol":
    case "symbol,ch":
      _validator = /[^`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、\u4e00-\u9fa5]/g;
      rules = "仅能输入中文与符号";
      break;
    case "eng,num":
    case "num,eng":
      _validator = /[^0-9A-Za-z]/g;
      rules = "仅能输入英文与数字";
      break;
    case "eng,symbol":
    case "symbol,eng":
      _validator = /[^A-Za-z`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
      rules = "仅能输入英文与符号";
      break;
    case "num,symbol":
    case "symbol,num":
      _validator = /[^0-9`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
      rules = "仅能输入数字与符号";
      break;
    case "ch,eng,num":
    case "ch,num,eng":
    case "eng,ch,num":
    case "eng,num,ch":
    case "num,ch,eng":
    case "num,eng,ch":
      _validator = /[^\u4e00-\u9fa5A-Za-z0-9]/g;
      rules = "仅能输入中英文与数字";
      break;
    case "ch,eng,symbol":
    case "ch,symbol,eng":
    case "eng,ch,symbol":
    case "eng,symbol,ch":
    case "symbol,ch,eng":
    case "symbol,eng,ch":
      _validator = /[^\u4e00-\u9fa5A-Za-z`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
      rules = "仅能输入中英文与符号";
      break;
    case "ch,num,symbol":
    case "ch,symbol,num":
    case "num,ch,symbol":
    case "num,symbol,ch":
    case "symbol,ch,num":
    case "symbol,num,ch":
      _validator = /[^0-9\u4e00-\u9fa5`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
      rules = "仅能输入中文，数字与符号";
      break;
    case "eng,num,symbol":
    case "eng,symbol,num":
    case "num,eng,symbol":
    case "num,symbol,eng":
    case "symbol,eng,num":
    case "symbol,num,eng":
      _validator = /[^A-Za-z0-9`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
      rules = "仅能输入英文，数字与符号";
      break;
    default:
      _validator = /[^\u4e00-\u9fa5A-Za-z0-9`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
      rules = "输入不能为空";
      break;
  }
  return (rule, value, callback) => {
    let _value = value + "";
    if (_value == "") {
      callback(new Error("输入不能为空"));
    } else if (_value.match(_validator)) {
      callback(new Error(rules));
    } else {
      callback();
    }
  };
};
const validateUpload = () => {
  return (rule, value, callback) => {
    if (value instanceof Array && value.length <= 0) {
      callback(new Error("该项为必填，不能为空"));
    } else {
      callback();
    }
  };
};
const validateArrayObj = () => {
  return (rule, value, callback) => {
    if (value instanceof Array && value.length <= 0) {
      callback(new Error("该项为必填，不能为空"));
    } else if (value instanceof Object && JSON.stringify(value) === "{}") {
      callback(new Error("该项为必填，不能为空"));
    } else if (checkEmptyArrayObject(value)) {
      callback(new Error("该项为必填，有部分值为空！"));
    } else {
      callback();
    }
  };
};
const checkEmptyArrayObject = arr => {
  if (arr instanceof Array) {
    let result = false;
    arr.forEach(item => {
      if (item instanceof Object) {
        for (let key in item) {
          if (
            item[key] === null ||
            item[key] === undefined ||
            item[key] === ""
          ) {
            result = true;
          }
        }
      }
    });
    return result;
  } else {
    return true;
  }
};
export const validateEl = el => {
  let _validateFn;
  switch (el.type) {
    case "input":
    case "textarea":
      _validateFn = validateText(el);
      break;
    case "file-upload":
    case "media-upload":
    case "image-upload":
      _validateFn = validateUpload();
      break;
    case "multi-input":
      _validateFn = validateArrayObj();
      break;
    default:
      _validateFn = (rule, value, callback) => {
        if (
          value == undefined ||
          value == null ||
          (value === "" &&
            (typeof value === "string" || typeof value === "number"))
        ) {
          callback(new Error("输入不能为空"));
        } else if (value instanceof Array && value.length <= 0) {
          callback(new Error("该项为必填不能为空"));
        } else {
          callback();
        }
      };
  }
  return _validateFn;
};
