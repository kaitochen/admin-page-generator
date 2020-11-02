const getConfig = () => {
  const path = require("path");
  const files = require.context("../pg-components", true, /\.js$/);
  const modules = {};
  files.keys().forEach(key => {
    const dirname = path.dirname(key);
    const dirnames = dirname.replace("./", "").split("/");
    if (dirnames.length === 2) {
      if (!modules[dirnames[0]]) {
        modules[dirnames[0]] = {};
      }
      modules[dirnames[0]][dirnames[1]] = files(key).default || files(key);
    }
  });
  return modules;
};
const getComponent = () => {
  const path = require("path");
  const files = require.context("../pg-components", true, /config\.vue$/);
  const modules = {};
  files.keys().forEach(key => {
    const dirname = path.dirname(key);
    const dirnames = dirname.replace("./", "").split("/");
    if (dirnames.length === 2) {
      modules[dirnames[1] + "-config"] = files(key).default || files(key);
    }
  });
  return modules;
};
const getDragComponents = () => {
  const path = require("path");
  const files = require.context("../pg-components", true, /drag\.vue$/);
  const modules = {};
  files.keys().forEach(key => {
    const dirname = path.dirname(key);
    const dirnames = dirname.replace("./", "").split("/");
    if (dirnames.length === 2) {
      modules["pgd-" + dirnames[1]] = files(key).default || files(key);
    }
  });
  return modules;
};
const getGenerateComponents = () => {
  const path = require("path");
  const files = require.context("../pg-components", true, /index\.vue$/);
  const modules = {};
  files.keys().forEach(key => {
    const dirname = path.dirname(key);
    const dirnames = dirname.replace("./", "").split("/");
    if (dirnames.length === 2) {
      modules["pg-" + dirnames[1]] = files(key).default || files(key);
    }
  });
  return modules;
};
export const configs = getConfig();
export const configComponents = getComponent();
export const dragComponents = getDragComponents();
export const generateComponents = getGenerateComponents();
export const FORM_COMPONENT = [
  "input",
  "number",
  "select",
  "cascader",
  "checkbox",
  "color-picker",
  "date-picker",
  "data-time-picker",
  "time-picker",
  "file-upload",
  "image-upload",
  "image-upload",
  "media-upload",
  "radio",
  "rate",
  "switch",
  "textarea"
];
