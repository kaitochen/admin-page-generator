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
import VueTinymce from "@packy-tang/vue-tinymce";
//样式
import "tinymce/skins/content/default/content.min.css";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";

//主题
import "tinymce/themes/silver";

//插件
import "tinymce/plugins/link"; //链接插件
import "tinymce/plugins/image"; //图片插件
import "tinymce/plugins/media"; //媒体插件
import "tinymce/plugins/table"; //表格插件
import "tinymce/plugins/lists"; //列表插件
import "tinymce/plugins/quickbars"; //快速栏插件
import "tinymce/plugins/preview"; //全屏插件
import "tinymce/plugins/code"; //全屏插件

/**
 * 注：
 * 5.3.x版本需要额外引进图标，没有所有按钮就会显示not found
 */
import "tinymce/icons/default/icons";

//本地化
import "./lib/tinymce/langs/zh_CN.js";

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
