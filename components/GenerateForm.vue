<template>
  <div class="pg-application">
    <div class="pg-container">
      <aside class="pg-aside">
        <div class="pg-component-list">
          <p class="pg-list-title">基础组件</p>
          <draggable
            tag="ul"
            :list="basicComponents"
            v-bind="{
              group: { name: 'designer', pull: 'clone', put: false },
              sort: false,
              ghostClass: 'ghost'
            }"
            @end="handleMoveEnd"
            @start="handleMoveStart"
            :move="handleMove"
          >
            <li v-for="(item, index) in basicComponents" :key="index">
              <a>
                <i class="icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </a>
            </li>
          </draggable>
        </div>
        <div class="pg-component-list">
          <p class="pg-list-title">布局组件</p>
          <draggable
            tag="ul"
            :list="layoutComponents"
            v-bind="{
              group: { name: 'designer', pull: 'clone', put: false },
              sort: false,
              ghostClass: 'ghost'
            }"
            @end="handleMoveEnd"
            @start="handleMoveStart"
            :move="handleMove"
          >
            <li v-for="(item, index) in layoutComponents" :key="index">
              <a>
                <i class="icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </a>
            </li>
          </draggable>
        </div>
        <div class="pg-component-list">
          <p class="pg-list-title">业务组件</p>
          <draggable
            tag="ul"
            :list="businessComponents"
            v-bind="{
              group: { name: 'designer', pull: 'clone', put: false },
              sort: false,
              ghostClass: 'ghost'
            }"
            @end="handleMoveEnd"
            @start="handleMoveStart"
            :move="handleMove"
          >
            <li v-for="(item, index) in businessComponents" :key="index">
              <a>
                <i class="icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </a>
            </li>
          </draggable>
        </div>
      </aside>
      <section class="pg-center-container">
        <div class="pg-center-tool">
          <el-button type="primary" @click="showDrawer">预览</el-button>
          <el-button type="primary" @click="saveConfig">保存配置</el-button>
          <el-button type="primary" @click="importConfig">导入配置</el-button>
          <el-button type="primary" @click="clear">清空</el-button>
          <el-button type="primary" @click="quit">退出</el-button>
          <el-button type="primary" @click="showJson">代码/布局切换</el-button>
        </div>
        <el-form
          v-show="!showJsonState"
          ref="form"
          label-width="120px"
          label-position="left"
          class="generator-container"
        >
          <drag-view
            :selectForm.sync="selectForm"
            :dragData="dragData"
          ></drag-view>
        </el-form>
        <json-editor :data.sync="json" :visible="showJsonState"></json-editor>
      </section>
      <aside class="pg-config-aside">
        <el-tabs v-model="activeName">
          <el-tab-pane label="组件配置" name="comp" v-show="!showJsonState">
            <template v-if="isEmptyObject(selectForm) && selectForm.type">
              <generate-config-form :select="selectForm"></generate-config-form>
            </template>
          </el-tab-pane>
          <el-tab-pane label="页面配置" name="page">
            <page-config-form
              :element.sync="pageConfig.context"
            ></page-config-form>
          </el-tab-pane>
          <el-tab-pane label="历史版本" name="history">
            <history-record
              :id="id"
              :historyList="historyList"
              @check="checkHistory"
              @delete="deleteHistory"
            ></history-record>
          </el-tab-pane>
        </el-tabs>
      </aside>
    </div>
    <el-drawer
      title="预览"
      :visible.sync="drawer"
      :with-header="false"
      size="90%"
      direction="ttb"
      :append-to-body="true"
      class="_preview"
    >
      <div v-if="drawer">
        <generate-view
          :data.sync="generateData"
          :dragData="dragData"
        ></generate-view>
      </div>
    </el-drawer>
    <el-dialog
      title="保存"
      :visible.sync="dialogVisible"
      width="500px"
      :append-to-body="true"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="{
          name: [
            { required: true, message: '版本名称不能为空', trigger: 'change' }
          ]
        }"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="版本名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="_savePage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Draggable from "vuedraggable";
import GenerateConfigForm from "./GenerateConfigForm";
import DragView from "./DragView";
import GenerateView from "./GenerateView";
import PageConfigForm from "./PageConfigForm";
import HistoryRecord from "./HistoryRecord";
import JsonEditor from "./JsonEditor";
import { configs } from "./componentsConfig.js";
// import { formConfig } from "../mock/index.js";
import { validateConfigLength } from "../util/validate.js";
import { configToData } from "../util/transform.js";
import { importWidget } from "../util/init.js";

export default {
  name: "generate-form",
  components: {
    Draggable,
    GenerateConfigForm,
    DragView,
    GenerateView,
    PageConfigForm,
    HistoryRecord,
    JsonEditor
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      basicComponents: Object.values(configs.basic),
      layoutComponents: Object.values(configs.layout),
      businessComponents: Object.values(configs.business),
      dragData: {
        columns: []
      },
      selectForm: {},
      drawer: false,
      activeName: "comp",
      pageConfig: {
        context: []
      },
      generateData: {},
      historyList: [],
      dialogVisible: false,
      form: {
        name: ""
      },
      showJsonState: false,
      json: ""
    };
  },
  watch: {
    json(val) {
      this.dragData = JSON.parse(val);
    }
  },
  methods: {
    handleMoveEnd() {},
    handleMoveStart() {
      console.log("start");
    },
    handleMove() {
      return true;
    },
    showDrawer() {
      if (validateConfigLength(this.dragData.columns)) {
        this.generateData = configToData(this.dragData.columns[0]);
        this.$nextTick(() => {
          this.drawer = true;
        });
      } else {
        this.$message.error("根节点只能有一个组件");
      }
    },
    checkHistory(data) {
      this.$emit("getHistoryInfo", {
        data: data,
        callback: result => {
          const { content } = result;
          const _content = JSON.parse(content);
          this.dragData = {
            columns: _content.page
          };
          this.pageConfig = _content.config;
        }
      });
    },
    deleteHistory(data) {
      // console.log(data);
      this.$emit("deleteHistory", {
        data: data,
        callback: () => {
          this.getHistory();
          // console.log(result);
        }
      });
    },
    saveConfig() {
      this.dialogVisible = true;
      // let root = this.dragData.columns;
      // this.$emit("save", root);
    },
    _savePage() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          let root = this.dragData.columns;
          this.$emit("save", {
            content: { page: root, config: this.pageConfig },
            name: this.form.name
          });
        }
      });
    },
    importConfig() {
      this.$emit("import", (page, config) => {
        this.dragData.columns = importWidget(page);
        this.pageConfig = {
          context: config
        };
      });
    },
    clear() {
      this.dragData.columns = [];
    },
    quit() {
      this.$emit("quit");
    },
    getHistory() {
      this.$emit("getHistory", data => {
        this.historyList = data;
        if (data.length > 0) {
          this.checkHistory(data[0]);
        }
      });
    },
    showJson() {
      if (!this.showJsonState) {
        this.json = JSON.stringify(this.dragData, null, 2);
      }
      this.showJsonState = !this.showJsonState;
    }
  },
  mounted() {
    this.getHistory();
  }
};
</script>
<style lang="scss">
$primary-color: #409eff;
$primary-background-color: #ecf5ff;
ul {
  list-style: none;
}
.pg-application {
  width: 100%;
  height: 100%;
  overflow: auto;
  .pg-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .pg-aside {
    width: 300px;
    background-color: #ffffff;
    overflow: auto;
    .pg-component-list {
      .pg-list-title {
        color: #666;
        font-size: 14px;
        margin: 10px;
      }
      ul {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        margin: 0;
        user-select: none;
        li {
          width: 130px;
          color: #333;
          font-size: 12px;
          text-align: center;
          height: 30px;
          background-color: #f2f2f2;
          line-height: 28px;
          margin: 5px;
          box-sizing: border-box;
          cursor: move;
          border: 1px solid #f2f2f2;
          &:hover {
            color: $primary-color;
            border: 1px dashed $primary-color;
          }
        }
      }
    }
  }
  .pg-center-container {
    flex: 1;
    height: 100vh;
    background-color: #f2f2f2;
    // overflow: auto;
    position: relative;
    // padding-top: 50px;
    box-sizing: border-box;
    .pg-center-tool {
      height: 50px;
      background-color: #ffffff;
      // position: fixed;
      // top: 0;
      // left: 300px;
      // right: 300px;
      z-index: 9;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 12px;
    }
    ._container {
      width: 100%;
      height: 100%;
      min-height: 45px;
    }
    .generator-container {
      height: calc(100vh - 50px);
      padding: 10px;
      box-sizing: border-box;
      overflow: auto;
      .widget-view + .widget-view {
        margin-top: 5px;
      }
      .widget-view {
        width: 100%;
        min-height: 40px;
        border: 1px dashed #e5e5e5;
        color: #333;
        cursor: move;
        // margin-bottom: 5px;
        background-color: #ffffff;
        padding: 5px;
        box-sizing: border-box;
        position: relative;
        .el-form-item {
          margin-bottom: 0;
          .el-rate {
            margin-top: 6px;
          }
        }
        .widget-view-action {
          position: absolute;
          top: 0;
          right: -1px;
          display: flex;
          flex-direction: row;
        }
        .widget-view-delete {
          width: 20px;
          height: 20px;
          background-color: $primary-color;
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
          z-index: 9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 5px;
        }
        .widget-view-add {
          width: 20px;
          height: 20px;
          background-color: $primary-color;
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
          z-index: 9;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .widget-active {
        border: 1px dashed $primary-color;
      }
      .ghost {
        background: #f56c6c;
        border: 2px solid #f56c6c;
        outline-width: 0;
        height: 3px;
        min-height: 3px;
        box-sizing: border-box;
        font-size: 0;
        content: "";
        overflow: hidden;
        padding: 0;
      }
    }
    ._container-horizontal {
      display: flex;
      flex-direction: row;
      .widget-view {
        width: auto;
        padding: 0;
      }
      .widget-view + .widget-view {
        margin-top: 0;
      }
      .ghost {
        background: #f56c6c;
        border: 2px solid #f56c6c;
        outline-width: 0;
        width: 3px;
        min-height: 80px;
        height: 100%;
        box-sizing: border-box;
        font-size: 0;
        content: "";
        overflow: hidden;
        padding: 0;
      }
    }
  }
  .pg-config-aside {
    width: 300px;
    height: 100vh;
    padding: 12px;
    background-color: #ffffff;
    box-sizing: border-box;
    overflow: auto;
    $--color-primary: #3377ff;
    ._config-pg-form {
      width: 100%;
      min-height: 100%;
      box-sizing: border-box;
    }
    ._config-pg-form-item {
      .el-form-item {
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .el-form-item__label {
        height: 30px;
        line-height: 30px;
      }
    }
    ._config-pg-title {
      font-size: 14px;
      color: #666;
      border-left: 5px solid $--color-primary;
      padding: 0 12px;
      box-sizing: border-box;
      margin: 0;
    }
  }
  .el-drawer__body {
    background-color: #f8faff;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .flex-full {
    width: 100% !important;
  }
}
._preview {
  .el-drawer__open .el-drawer.ttb {
    overflow-y: auto;
  }
}
</style>
