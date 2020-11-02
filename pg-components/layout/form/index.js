export default {
  type: "form",
  name: "表单布局",
  icon: "form",
  belong: "normal",
  columns: [],
  config: {
    prop: "form",
    editable: true,
    paddingUrl: "",
    submitUrl: "",
    editUrl: "",
    btn: ["save", "submit", "edit", "clear"],
    btnOption: [
      { value: "save", label: "保存" },
      { value: "submit", label: "提交" },
      { value: "edit", label: "编辑" },
      { value: "clear", label: "清空" }
    ]
  }
};
