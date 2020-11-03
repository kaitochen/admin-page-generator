export default {
  type: "list",
  name: "列表布局",
  icon: "list",
  belong: "normal",
  columns: [
    {
      type: "action",
      name: "操作栏",
      icon: "action",
      belong: "normal",
      config: {},
      columns: []
    },
    {
      type: "search",
      name: "搜索栏",
      icon: "search",
      belong: "normal",
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
        prop: ""
      }
    },
    {
      type: "table",
      name: "表格布局",
      icon: "table",
      belong: "normal",
      columns: [
        {
          type: "table-text",
          name: "表格子项",
          icon: "table-text",
          belong: "normal",
          config: {
            label: "ID",
            width: "50",
            minWidth: "",
            type: "text",
            options: [
              { value: "text", label: "文本" },
              { value: "image", label: "图片" },
              { value: "action", label: "操作" }
            ],
            url: "/getAction/{id}"
          }
        }
      ],
      config: {
        prop: "",
        selection: false,
        height: 500,
        pagination: true
      }
    }
  ],
  config: {
    searchUrl: "",
    pagination: true
  }
};
