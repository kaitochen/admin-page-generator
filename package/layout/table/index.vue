<template>
  <div class="pg-table-container">
    <el-table
      class="pg-table"
      :data="dataList"
      border
      @selection-change="selectionChange"
      row-id="id"
      :tree-props="{
        children: element.config.isTree ? 'children' : '',
        hasChildren: element.config.isTree ? 'hasChildren' : ''
      }"
    >
      <el-table-column
        type="selection"
        width="50"
        v-if="element.config.selection"
      >
      </el-table-column>
      <template v-for="col in element.columns">
        <el-table-column
          v-if="col.type === 'table-text'"
          :key="col.key"
          :prop="col.config.prop"
          :label="col.config.label"
          :width="col.config.width"
          :min-width="col.config.minWidth"
        >
          <template v-slot="scope">
            <template v-if="col.config.type === 'text'">
              {{ scope.row[col.config.prop] }}
            </template>
            <template v-if="col.config.type === 'image'">
              <el-image
                style="height: 100px"
                fit="contain"
                :src="setImage(scope.row, col.config.prop)"
                :preview-src-list="setImageList(scope.row, col.config.prop)"
              >
              </el-image>
            </template>
            <template v-if="col.config.type === 'action'">
              <el-link
                type="primary"
                @click="clickBtn(scope, col.config.url)"
                >{{ scope.row[col.config.prop] }}</el-link
              >
            </template>
          </template>
        </el-table-column>

        <el-table-column
          v-if="col.type === 'table-operation'"
          :key="col.key"
          :label="col.config.label"
          :width="col.config.width"
          :min-width="col.config.minWidth"
          :fixed="col.config.fixRight ? 'right' : false"
        >
          <template v-slot="scope">
            <generate-view
              :scope="scope"
              :dragData="col"
              :isHorizontal="true"
              :data.sync="generateData"
              :context="context"
            ></generate-view>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <el-pagination
      v-if="element.config.pagination"
      style="padding: 10px 0;text-align:center;background-color: #FFFFFF"
      background
      @current-change="changePage"
      @size-change="changeSize"
      :page-sizes="[10, 20, 50, 100]"
      :total="_pageTotal"
      :page-size="_pageSize"
      :current-page="_pageIndex"
      layout="sizes,prev,pager,next,jumper"
    >
    </el-pagination>
  </div>
</template>
<script>
import GenerateView from "../../../components/GenerateView";
import {
  protocolConverter,
  protocolMatchData,
  executeProtocol
} from "../../../util/converter.js";
export default {
  name: "pg-table",
  components: {
    GenerateView
  },
  props: {
    element: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  inject: [
    "getData",
    "pageIndex",
    "pageSize",
    "pageTotal",
    "setPageContext",
    "pageContext",
    "routeContext"
  ],
  computed: {
    _pageIndex() {
      return this.pageIndex();
    },
    _pageSize() {
      return this.pageSize();
    },
    _pageTotal() {
      return this.pageTotal();
    },
    dataList() {
      return this.generateData[this.context];
    }
  },
  data() {
    return {
      generateData: this.data,
      context: "table",
      selectionData: [],
      scope: {}
    };
  },
  watch: {
    data(val) {
      this.generateData = val;
    },
    generateData: {
      deep: true,
      handler(val) {
        this.$emit("update:data", val);
      }
    }
  },
  methods: {
    selectionChange(val) {
      this.selectionData = val;
      this.setPageContext({
        tableSelection: this.selectionData,
        ids: this.selectionData.map(item => item.id)
      });
    },
    changePage(val) {
      this.getData(val);
    },
    changeSize(val) {
      this.getData(1, val);
    },
    setImage(data, prop) {
      const value = data[prop];
      if (Array.isArray(value)) {
        return value[0];
      } else {
        if (value) {
          const img = value.split(",");
          return img[0];
        } else {
          return "";
        }
      }
    },
    setImageList(data, prop) {
      const value = data[prop];
      if (Array.isArray(value)) {
        return value;
      } else {
        if (value) {
          const img = value.split(",");
          return img;
        } else {
          return [];
        }
      }
    },
    clickBtn(scope, url) {
      if (!url) {
        // this.$message.error("该按钮无点击触发，请设置！");
        return;
      }
      this.dealProtocol(scope, url);
    },
    dealProtocol(scope, url) {
      try {
        let source;
        if (scope && scope.row) {
          source = [
            this.scope.row,
            this.data,
            this.pageContext(),
            this.routeContext()
          ];
        } else {
          source = [this.data, this.pageContext(), this.routeContext()];
        }
        const { type, data } = protocolConverter(
          protocolMatchData(url, source, "")
        );

        if (type === "action") {
          // console.log("action");
          const { action = "" } = data;
          switch (action) {
            case "back":
              this.$router.go(-1);
              break;
            // case "clear":
            //   if (this.context && this.generateData[this.context]) {
            //     const _data = this.generateData[this.context];
            //     for (let k in _data) {
            //       _data[k] = "";
            //     }
            //     this.generateData[this.context] = _data;
            //   } else {
            //     const _data = this.generateData;
            //     for (let k in _data) {
            //       _data[k] = "";
            //     }
            //     this.generateData = _data;
            //   }
            //   break;
            default:
              break;
          }
        } else if (type === "request" || type === "http") {
          executeProtocol.call(this, { type, data });
        } else if (type === "route") {
          executeProtocol.call(this, { type, data });
        } else {
          console.log("other");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style lang="scss">
.generate {
  .pg-table-container {
    margin-top: 10px;
    padding: 0 10px;
    .pg-table {
      .el-table-column--selection .cell {
        padding: 0 10px;
      }
    }
  }
}
</style>
