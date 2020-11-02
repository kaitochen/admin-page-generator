export default {
  type: "date-picker",
  name: "日期选择器",
  icon: "date-picker",
  config: {
    prop: "",
    label: "日期选择器",
    required: false,
    disabled: false,
    defaultValue: "",
    type: "date",
    typeOptions: ["year", "month", "date", "daterange", "monthrange"],
    format: "yyyy-MM-dd"
  }
};
