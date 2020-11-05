export const validateConfigLength = config => {
  if (config.length !== 1) {
    return false;
  } else {
    return true;
  }
};

export const validateEl = el => {
  return (rule, value, callback) => {
    console.log(value, el);
    if (typeof value === "string" && value === "") {
      callback(new Error("输入不能为空"));
    } else if (value instanceof Array && value.length <= 0) {
      callback(new Error("选择不能为空"));
    } else {
      callback();
    }
  };
};
