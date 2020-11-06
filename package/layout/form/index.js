export default {
  type: "form",
  name: "表单布局",
  icon: "form",
  belong: "normal",
  columns: [
    {
      type: "action",
      belong: "normal",
      config: {},
      columns: [
        {
          type: "button",
          belong: "normal",
          config: {
            prop: "",
            label: "返回",
            icon: "el-icon-back",
            url: "",
            btnStyle: "ghost",
            condition: "",
            role: "",
            btnType: "button",
            isCircle: false,
            plain: false
          }
        },
        {
          type: "button",
          belong: "normal",
          config: {
            prop: "",
            label: "保存",
            icon: "el-icon-circle-check",
            url: "",
            btnStyle: "ghost",
            condition: "",
            role: "",
            btnType: "button",
            isCircle: false,
            plain: false
          }
        },
        {
          type: "button",
          belong: "normal",
          config: {
            prop: "",
            label: "提交",
            icon: "el-icon-upload",
            url: "",
            btnStyle: "ghost",
            condition: "",
            role: "",
            btnType: "button",
            isCircle: false,
            plain: false
          }
        },
        {
          type: "button",
          belong: "normal",
          config: {
            prop: "",
            label: "编辑",
            icon: "el-icon-edit",
            url: "",
            btnStyle: "ghost",
            condition: "",
            role: "",
            btnType: "button",
            isCircle: false,
            plain: false
          }
        },
        {
          type: "button",
          belong: "normal",
          config: {
            prop: "",
            label: "清空",
            icon: "el-icon-delete",
            url: "",
            btnStyle: "ghost",
            condition: "",
            role: "",
            btnType: "button",
            isCircle: false,
            plain: false
          }
        }
      ]
    }
  ],
  config: {
    prop: "form",
    editable: true
  }
};
