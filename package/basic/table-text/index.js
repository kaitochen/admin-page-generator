export default {
  type: "table-text",
  name: "表格子项",
  icon: "table-text",
  belong: "normal",
  config: {
    prop: "",
    label: "文本",
    width: 100,
    minWidth: 100,
    type: "text",
    options: [
      { value: "text", label: "文本" },
      { value: "image", label: "图片" },
      { value: "action", label: "操作" },
      { value: "video", label: "视频" },
      { value: "select", label: "下拉框" }
    ],
    url: "/getAction/{id}"
  }
};
