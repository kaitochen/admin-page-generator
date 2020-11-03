export default {
  type: "select",
  name: "下拉选择框",
  icon: "select",
  config: {
    prop: "",
    label: "下拉选择框",
    required: false,
    disabled: false,
    textual: false,
    defaultValue: "",
    dynamic: false,
    multiple: false,
    filterable: false,
    remote: false,
    options: [{ value: "value", label: "label" }],
    dynamicUrl: "/getOptions"
  }
};
