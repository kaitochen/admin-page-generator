import GenerateForm from "./components/GenerateForm";
import {
  dragComponents,
  generateComponents
} from "./components/componentsConfig.js";
import {
  deepClone,
  isEmptyObject,
  cloneWidget,
  generateKey,
  GenerateNavigate
} from "./util/init";

import "./theme/default.scss";
const components = [GenerateForm]
  .concat(Object.values(dragComponents))
  .concat(Object.values(generateComponents));

GenerateForm.install = function(Vue) {
  Vue.component(GenerateForm.name, GenerateForm);
};

const install = function(Vue, options) {
  Vue.prototype.deepClone = deepClone;
  Vue.prototype.isEmptyObject = isEmptyObject;
  Vue.prototype.cloneWidget = cloneWidget;
  Vue.prototype.generateKey = generateKey;
  Vue.prototype.navigator = new GenerateNavigate(options);
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { install, GenerateForm };
export default {
  install,
  GenerateForm
};
