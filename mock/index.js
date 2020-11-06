export const formConfig = [
  {
    type: "form",
    belong: "normal",
    config: {
      editable: true,
      prop: ""
    },
    columns: [
      {
        type: "action",
        belong: "normal",
        config: { prop: "" },
        columns: [
          {
            type: "button",
            belong: "normal",
            config: {
              prop: "",
              label: "返回",
              icon: "el-icon-back",
              url: "action://back",
              btnStyle: "ghost",
              condition: "",
              role: "",
              btnType: "button",
              isCircle: false,
              plain: false,
              valid: false
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
              plain: false,
              valid: true
            }
          },
          {
            type: "button",
            belong: "normal",
            config: {
              prop: "",
              label: "提交",
              icon: "el-icon-top",
              url: "",
              btnStyle: "ghost",
              condition: "",
              role: "",
              btnType: "button",
              isCircle: false,
              plain: false,
              valid: true
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
              plain: false,
              valid: false
            }
          },
          {
            type: "button",
            belong: "normal",
            config: {
              prop: "",
              label: "清空",
              icon: "el-icon-delete",
              url: "action://clear",
              btnStyle: "ghost",
              condition: "",
              role: "",
              btnType: "button",
              isCircle: false,
              plain: false,
              valid: false
            }
          }
        ]
      },
      {
        type: "header",
        belong: "normal",
        config: { label: "基础信息", prop: "" }
      },
      {
        type: "grid",
        belong: "normal",
        config: { prop: "grid" },
        columns: [
          {
            type: "col",
            columns: [
              {
                type: "input",
                belong: "",
                config: {
                  prop: "",
                  label: "文本输入框",
                  required: false,
                  disabled: false,
                  textual: false,
                  maxLength: 50,
                  minLength: 1,
                  placeholder: "",
                  defaultValue: "",
                  pattern: []
                }
              },
              {
                type: "color-picker",
                belong: "",
                config: {
                  prop: "",
                  label: "颜色选择器",
                  required: false,
                  disabled: false,
                  defaultValue: "rgb(255,0,0)",
                  isOpacity: false
                }
              },
              {
                type: "switch",
                belong: "",
                config: {
                  prop: "",
                  label: "开关",
                  required: false,
                  disabled: false,
                  activeText: "开启",
                  inactiveText: "关闭",
                  activeColor: "#04f",
                  inactiveColor: "#f00",
                  defaultValue: true
                }
              },
              {
                type: "date-picker",
                belong: "",
                config: {
                  prop: "",
                  label: "日期选择器",
                  required: false,
                  disabled: false,
                  defaultValue: "",
                  type: "date",
                  typeOptions: [
                    "year",
                    "month",
                    "date",
                    "daterange",
                    "monthrange"
                  ],
                  format: "yyyy-MM-dd"
                }
              }
            ]
          },
          {
            type: "col",
            columns: [
              {
                type: "number",
                belong: "",
                config: {
                  prop: "",
                  label: "数字输入框",
                  required: false,
                  disabled: false,
                  textual: false,
                  max: 50,
                  min: 1,
                  placeholder: "",
                  defaultValue: 1,
                  step: 1,
                  precision: 0
                }
              },
              {
                type: "time-picker",
                belong: "",
                config: {
                  prop: "",
                  label: "时间选择器",
                  required: false,
                  disabled: false,
                  defaultValue: "",
                  isRange: false
                }
              },
              {
                type: "cascader",
                belong: "",
                config: {
                  prop: "",
                  label: "级联选择框",
                  required: false,
                  disabled: false,
                  textual: false,
                  defaultValue: "",
                  dynamic: true,
                  multiple: false,
                  filterable: false,
                  lazy: false,
                  checkStrictly: false,
                  showAllLevels: false,
                  dynamicUrl: "request://-X post /api/getOptions"
                }
              },
              {
                type: "date-time-picker",
                belong: "",
                config: {
                  prop: "",
                  label: "日期时间选择器",
                  required: false,
                  disabled: false,
                  defaultValue: "",
                  isRange: false
                }
              }
            ]
          }
        ]
      },
      {
        type: "grid",
        belong: "normal",
        config: { prop: "grid" },
        columns: [
          {
            type: "col",
            columns: [
              {
                type: "rate",
                belong: "",
                config: {
                  prop: "",
                  label: "评分",
                  required: false,
                  disabled: false,
                  max: 5,
                  defaultValue: 0,
                  allowHalf: false,
                  showScore: false
                }
              },
              {
                type: "checkbox",
                belong: "",
                config: {
                  prop: "",
                  label: "多选框",
                  required: false,
                  disabled: false,
                  textual: false,
                  defaultValue: [],
                  dynamic: false,
                  options: [{ value: "value", label: "label" }],
                  dynamicOptions: {
                    url: "/getOptions",
                    value: "value",
                    label: "label"
                  }
                }
              },
              {
                type: "radio",
                belong: "",
                config: {
                  prop: "",
                  label: "单选框",
                  required: false,
                  disabled: false,
                  textual: false,
                  defaultValue: "",
                  dynamic: false,
                  options: [{ value: "value", label: "label" }],
                  dynamicOptions: {
                    url: "/getOptions",
                    value: "value",
                    label: "label"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        type: "header",
        belong: "normal",
        config: { label: "详细信息", prop: "" }
      },
      {
        type: "grid",
        belong: "normal",
        config: { prop: "grid" },
        columns: [
          {
            type: "col",
            columns: [
              {
                type: "file-upload",
                belong: "",
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
              },
              {
                type: "image-upload",
                belong: "",
                config: {
                  prop: "",
                  label: "图片上传框",
                  required: false,
                  disabled: false,
                  placeholder: "",
                  defaultValue: [],
                  limit: 10,
                  multiple: false,
                  sizeLimit: 50,
                  pattern: ""
                }
              },
              {
                type: "media-upload",
                belong: "",
                config: {
                  prop: "",
                  label: "音视频上传框",
                  required: false,
                  disabled: false,
                  placeholder: "",
                  defaultValue: [],
                  limit: 10,
                  multiple: false,
                  sizeLimit: 50,
                  pattern: ""
                }
              },
              {
                type: "textarea",
                belong: "",
                config: {
                  prop: "",
                  label: "文本域输入框",
                  required: false,
                  disabled: false,
                  textual: false,
                  maxLength: 500,
                  minLength: 1,
                  placeholder: "",
                  defaultValue: "",
                  pattern: []
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
