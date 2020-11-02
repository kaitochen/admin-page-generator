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
