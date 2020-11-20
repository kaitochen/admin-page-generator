<template>
  <vue-tinymce :disabled="true" :setting="setting" />
</template>
<script>
export default {
  name: "pgd-rich-text",
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    element: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      content: "",
      setting: {
        menubar: false,
        toolbar:
          "undo redo | preview | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar:
          "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: "link image media table lists preview quickbars",
        language: "zh_CN",
        height: 350
      }
    };
  }
};
</script>
