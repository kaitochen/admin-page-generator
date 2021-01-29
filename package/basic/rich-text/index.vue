<template>
  <vue-tinymce
    v-model="value"
    :setting="setting"
    :disabled="isReadOnly || element.config.disabled"
  />
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-rich-text",
  mixins: [comp],
  props: {},
  data() {
    const _this = this;
    return {
      setting: {
        menubar: true,
        toolbar:
          "undo redo | preview code | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar:
          "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: "link image media table lists preview quickbars code",
        language: "zh_CN",
        height: 500,
        images_upload_handler: function(blobInfo, successFun, failFun) {
          const file = blobInfo.blob(); //转化为易于理解的file对象
          _this.$upload.upload(file).then(res => {
            console.log(res);
            if (res.url) {
              successFun(res.url);
            } else {
              failFun("上传失败");
            }
          });
        },
        file_picker_callback: function(callback, value, meta) {
          let filetype;
          switch (meta.filetype) {
            case "image":
              filetype = ".jpg, .jpeg, .png";
              break;
            case "media":
              filetype = ".mp3, .mp4";
              break;
            case "file":
              filetype = "*";
              break;
            default:
              break;
          }
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", filetype);
          input.click();
          input.onchange = function() {
            var file = this.files[0];
            _this.$upload.upload(file).then(res => {
              if (res.url) {
                if (meta.filetype == "file") {
                  callback(res.url, { text: file.name });
                }
                if (meta.filetype == "image") {
                  callback(res.url, { alt: file.name });
                }
                if (meta.filetype == "media") {
                  callback(res.url);
                }
              } else {
                _this.$message.error("上传失败");
              }
            });
          };
        }
      }
    };
  }
};
</script>
