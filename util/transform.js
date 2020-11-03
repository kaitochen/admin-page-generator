import { FORM_COMPONENT } from "../components/componentsConfig";
export const configToData = config => {
  let data = {};
  let type = config.type;
  let _form = {};
  switch (type) {
    case "form":
      formToData(config.columns, _form);
      data["form"] = _form;
      break;
    case "list":
      break;
  }
  return data;
};

export const formToData = (config, _form) => {
  config.forEach(comp => {
    if (FORM_COMPONENT.indexOf(comp.type) > -1) {
      let _prop = comp.config.prop;
      let value = comp.config.defaultValue;
      _form[_prop] = value;
    } else {
      if (comp.columns && comp.columns.length > 0) {
        formToData(comp.columns, _form);
      }
    }
  });
};

export const uploadAcceptTransform = types => {
  if (types.indexOf("all") > -1 || types.length <= 0) {
    return "*";
  }
  const type = {
    word: ".doc,.docx",
    excel: ".xls,.xlsx",
    ppt: ".ppt,.pptx",
    pdf: ".pdf",
    txt: ".txt"
  };
  let result = types
    .map(item => {
      return type[item];
    })
    .join(",");
  return result;
};

export const filterFile = (files, types, maxSize) => {
  const maxByte = maxSize * 1024 * 1024;
  if (types.indexOf("all") > -1 || types.length <= 0 || files.length <= 0) {
    let result = [];
    let error = [];
    files.forEach(file => {
      if (file.size < maxByte) {
        result.push(file);
      } else {
        error.push(file.name);
      }
    });
    return {
      res: result,
      error: error
    };
  }
  const type = {
    word: ["doc", "docx"],
    excel: ["xls", "xlsx"],
    ppt: ["ppt", "pptx"],
    pdf: ["pdf"],
    txt: ["txt"]
  };
  let typeArr = [];
  types.forEach(item => {
    typeArr = typeArr.concat(type[item] || []);
  });
  let result = [];
  let error = [];
  files.forEach(file => {
    let type = file.name.split(".");
    type = type[type.length - 1];
    type = type.toLowerCase();
    console.log(file, maxSize);
    if (typeArr.indexOf(type) > -1 && file.size < maxByte) {
      result.push(file);
    } else {
      error.push(file.name);
    }
  });
  return {
    res: result,
    error: error
  };
};

export const filterMedia = (files, maxSize) => {
  const maxByte = maxSize * 1024 * 1024;
  if (files.length <= 0) {
    return {
      res: [],
      error: []
    };
  }

  let typeArr = ["mp3", "mp4", "ogg"];
  let result = [];
  let error = [];
  files.forEach(file => {
    let type = file.name.split(".");
    type = type[type.length - 1];
    type = type.toLowerCase();
    console.log(file, maxSize);
    if (typeArr.indexOf(type) > -1 && file.size < maxByte) {
      result.push(file);
    } else {
      error.push(file.name);
    }
  });
  return {
    res: result,
    error: error
  };
};
