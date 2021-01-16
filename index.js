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
  GenerateNavigate,
  GeneratorUpload
} from "./util/init";

import "./theme/default.scss";

import tinymce from "tinymce";
import VueTinymce from "./lib/tinymce/index";

const components = [GenerateForm]
  .concat(Object.values(dragComponents))
  .concat(Object.values(generateComponents));

GenerateForm.install = function(Vue) {
  Vue.component(GenerateForm.name, GenerateForm);
};

const install = function(Vue, options) {
  Vue.prototype.$tinymce = tinymce;
  Vue.use(VueTinymce);
  Vue.prototype.deepClone = deepClone;
  Vue.prototype.isEmptyObject = isEmptyObject;
  Vue.prototype.cloneWidget = cloneWidget;
  Vue.prototype.generateKey = generateKey;
  Vue.prototype.navigator = new GenerateNavigate(options.navigator);
  Vue.prototype.$upload = new GeneratorUpload(options.upload);
  Vue.prototype.$custom = options.custom;
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
