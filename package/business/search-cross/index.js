export default {
  type: "search-cross",
  name: "搜索穿梭框",
  icon: "search-cross",
  columns: [
    {
      type: "grid",
      name: "栅格布局",
      icon: "grid",
      belong: "normal",
      columns: [
        {
          type: "col",
          columns: []
        },
        {
          type: "col",
          columns: []
        },
        {
          type: "col",
          columns: []
        }
      ],
      config: {}
    }
  ],
  config: {
    prop: "",
    label: "穿梭框",
    condition: "",
    required: false,
    defaultValue: [],
    url: ""
  }
};
