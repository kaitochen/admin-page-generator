export default {
  type: "form-table",
  name: "表单表格",
  icon: "form-table",
  columns: [{
    type: "table-text",
    name: "表格子项",
    icon: "table-text",
    belong: "normal",
    config: {
      label: "ID",
      width: "50",
      minWidth: "",
      type: "text",
      prop: "id",
      options: [
        { value: "text", label: "文本" },
        { value: "image", label: "图片" },
        { value: "action", label: "操作" }
      ],
      url: "/getAction/{id}"
    }
  }],
  config: {
    prop: "",
    label: "表单表格",
    required: false,
    disabled: false,
    defaultValue: [],
    height: 500,
    showHeader: true
  }
};
