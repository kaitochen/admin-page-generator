<template>
  <editor
    style="height: calc(100vh - 50px);"
    v-show="visible"
    v-model="json"
    @init="initEditor"
    theme="chrome"
    lang="json"
  ></editor>
</template>
<script>
const editor = require("vue2-ace-editor");
export default {
  name: "JsonEditor",
  components: {
    editor
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    data: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // json: ""
    };
  },
  computed: {
    json: {
      get: function() {
        return this.data;
      },
      set: function(val) {
        this.$emit("update:data", val);
      }
    }
  },
  // watch: {
  //   // data: {
  //   //   deep: true,
  //   //   handler(val) {
  //   //     this.json = JSON.stringify(val, null, 2);
  //   //   }
  //   // },
  //   json(val) {
  //     this.$emit("update:data", JSON.parse(val));
  //   }
  // },
  methods: {
    initEditor(editor) {
      require("brace/ext/language_tools");
      require("brace/mode/json");
      require("brace/theme/chrome");
      require("brace/snippets/json");
      // editor.gotoLine(1);
      //   //启动换行
      editor.getSession().setUseWrapMode(true);
      editor.setOptions({
        readOnly: false,
        autoScrollEditorIntoView: true,
        displayIndentGuides: false,
        fixedWidthGutter: true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2,
        fontSize: 12,
        showPrintMargin: false
      });
    }
  }
};
</script>
