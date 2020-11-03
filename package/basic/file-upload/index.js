export default {
  type: "file-upload",
  name: "文件上传框",
  icon: "file-upload",
  config: {
    prop: "",
    label: "文件上传框",
    required: false,
    disabled: false,
    placeholder: "",
    defaultValue: [],
    limit: 10,
    multiple: false,
    sizeLimit: 50,
    typeLimit: [],
    typeOptions: [
      { value: "all", label: "不限" },
      { value: "word", label: "word文档" },
      { value: "excel", label: "excel文件" },
      { value: "ppt", label: "ppt文件" },
      { value: "pdf", label: "pdf文件" },
      { value: "txt", label: "txt文件" }
    ]
  }
};
