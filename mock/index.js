export const formConfig = [
  {
    type: "form",
    belong: "normal",
    config: {
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
      ],
      prop: "form_1603879596188_77002"
    },
    columns: [
      {
        type: "header",
        belong: "normal",
        config: { label: "基础信息", prop: "header_1603879599497_38174" },
        key: "header_1603879599497_38174"
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
                  prop: "input_1603879615960_74973",
                  label: "文本输入框",
                  required: false,
                  disabled: false,
                  textual: false,
                  maxLength: 50,
                  minLength: 1,
                  placeholder: "",
                  defaultValue: "",
                  pattern: []
                },
                key: "input_1603879615960_74973"
              },
              {
                type: "date-time-picker",
                belong: "",
                config: {
                  prop: "date-time-picker_1603879867368_62039",
                  label: "日期时间选择器",
                  required: false,
                  disabled: false,
                  defaultValue: "",
                  isRange: false
                },
                key: "date-time-picker_1603879867368_62039"
              },
              {
                type: "color-picker",
                belong: "",
                config: {
                  prop: "color-picker_1603879872616_3745",
                  label: "颜色选择器",
                  required: false,
                  disabled: false,
                  defaultValue: "rgb(255,0,0)",
                  isOpacity: false
                },
                key: "color-picker_1603879875679_69502"
              },
              {
                type: "switch",
                belong: "",
                config: {
                  prop: "switch_1603879906504_43537",
                  label: "开关",
                  required: false,
                  disabled: false,
                  activeText: "开启",
                  inactiveText: "关闭",
                  activeColor: "#04f",
                  inactiveColor: "#f00",
                  defaultValue: true
                },
                key: "switch_1603879906504_43537"
              }
            ],
            key: "col_1603879607945_85079"
          },
          {
            type: "col",
            columns: [
              {
                type: "number",
                belong: "",
                config: {
                  prop: "number_1603879618999_49685",
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
                },
                key: "number_1603879618999_49685"
              },
              {
                type: "date-picker",
                belong: "",
                config: {
                  prop: "date-picker_1603879868887_81824",
                  label: "日期选择器",
                  required: false,
                  disabled: false,
                  defaultValue: "",
                  isRange: false,
                  type: "date",
                  typeOptions: ["date", "month", "year"],
                  format: "yyyy-MM-dd"
                },
                key: "date-picker_1603879870165_59299"
              },
              {
                type: "time-picker",
                belong: "",
                config: {
                  prop: "time-picker_1603879880104_51338",
                  label: "时间选择器",
                  required: false,
                  disabled: false,
                  defaultValue: "",
                  isRange: false
                },
                key: "time-picker_1603879880104_51338"
              }
            ],
            key: "col_1603879610789_28736"
          }
        ],
        key: "grid_1603879607945_24684"
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
                  prop: "rate_1603879896440_10908",
                  label: "评分",
                  required: false,
                  disabled: false,
                  max: 5,
                  defaultValue: 0,
                  allowHalf: false,
                  showScore: false
                },
                key: "rate_1603879896440_10908"
              },
              {
                type: "checkbox",
                belong: "",
                config: {
                  prop: "checkbox_1603879910335_89327",
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
                },
                key: "checkbox_1603879910335_89327"
              },
              {
                type: "media-upload",
                belong: "",
                config: {
                  prop: "media-upload_1603879931849_17948",
                  label: "音视频上传框",
                  required: false,
                  disabled: false,
                  placeholder: "",
                  defaultValue: [],
                  limit: 10,
                  multiple: false,
                  sizeLimit: 50,
                  pattern: ""
                },
                key: "media-upload_1603879931849_17948"
              },
              {
                type: "radio",
                belong: "",
                config: {
                  prop: "radio_1603879912048_26234",
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
                },
                key: "radio_1603879912048_26234"
              }
            ],
            key: "col_1603879885496_25578"
          }
        ],
        key: "grid_1603879885495_66173"
      },
      {
        type: "header",
        belong: "normal",
        config: { label: "详细信息", prop: "header_1603879918591_1973" },
        key: "header_1603879918591_1973"
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
                type: "textarea",
                belong: "",
                config: {
                  prop: "textarea_1603879929602_62821",
                  label: "文本域输入框",
                  required: false,
                  disabled: false,
                  textual: false,
                  maxLength: 500,
                  minLength: 1,
                  placeholder: "",
                  defaultValue: "",
                  pattern: []
                },
                key: "textarea_1603879929602_62821"
              },
              {
                type: "file-upload",
                belong: "",
                config: {
                  prop: "file-upload_1603879939129_50541",
                  label: "文件上传框",
                  required: false,
                  disabled: false,
                  placeholder: "",
                  defaultValue: [],
                  limit: 10,
                  multiple: false,
                  sizeLimit: 50,
                  pattern: ""
                },
                key: "file-upload_1603879939129_50541"
              },
              {
                type: "image-upload",
                belong: "",
                config: {
                  prop: "image-upload_1603879936752_42816",
                  label: "图片上传框",
                  required: false,
                  disabled: false,
                  placeholder: "",
                  defaultValue: [],
                  limit: 10,
                  multiple: false,
                  sizeLimit: 50,
                  pattern: ""
                },
                key: "image-upload_1603879936752_42816"
              }
            ],
            key: "col_1603879926856_54096"
          }
        ],
        key: "grid_1603879926856_91832"
      }
    ],
    key: "form_1603879596188_77002"
  }
];
