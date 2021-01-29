<template>
  <div class="search-cross">
    <div class="_search-cross">
      <div class="_search-cross-view">
        <el-form
          ref="form"
          label-width="80px"
          label-position="left"
          style="width: 100%"
        >
          <generate-view
            :dragData="element"
            :data.sync="search"
            context=""
          ></generate-view>
        </el-form>
      </div>
      <div class="_search-cross-button">
        <el-button type="primary" icon="el-icon-search" @click="_search"
          >搜索</el-button
        >
        <el-button icon="el-icon-circle-close" @click="_clear">清空</el-button>
      </div>
    </div>
    <div class="_search-cross-content">
      <div class="_search-cross-list">
        <div class="_search-cross-container">
          <div class="_search-cross-header">
            <el-checkbox
              v-model="sourceCheck"
              :indeterminate="sourceIsIndeterminate"
              @change="sourceAllChange"
            ></el-checkbox>
            <p>可选列表</p>
            <el-button
              circle
              title="添加到选择结果"
              class="el-icon-right"
              @click="addToTarget"
            ></el-button>
          </div>
          <div class="_search-cross-center">
            <el-checkbox-group
              v-model="checkedSource"
              @change="sourceCheckedChange"
            >
              <el-checkbox
                class="_search-cross-row"
                v-for="item in list"
                :key="item.id"
                :label="item.id"
              >
                <label style="margin-left: 10px">{{ item.title }}</label>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div>
          <el-button
            class="el-icon-arrow-left"
            title="上一页"
            @click="prev"
            :disabled="pageIndex === 1"
          ></el-button>
          <el-button
            class="el-icon-arrow-right"
            title="下一页"
            @click="next"
            :disabled="pageIndex >= pageTotal"
          ></el-button>
        </div>
      </div>

      <div class="_search-cross-container">
        <div class="_search-cross-header">
          <el-checkbox
            v-model="targetCheck"
            :indeterminate="targetIsIndeterminate"
            @change="targetAllChange"
          ></el-checkbox>
          <p>选择结果</p>
          <el-button
            circle
            class="el-icon-close"
            @click="deleteTarget"
          ></el-button>
        </div>
        <div class="_search-cross-center">
          <el-checkbox-group
            v-model="checkedTarget"
            @change="targetCheckedChange"
          >
            <el-checkbox
              class="_search-cross-row"
              v-for="item in value"
              :key="item.id"
              :label="item.id"
            >
              <label style="margin-left: 10px">{{ item.title }}</label>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GenerateView from "../../../components/GenerateView";
import comp from "../../../mixins/comp";
import {
  protocolConverter,
  protocolMatchData,
  executeProtocol
} from "../../../util/converter.js";
export default {
  name: "pg-search-cross",
  components: {
    GenerateView
  },
  mixins: [comp],
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
  data() {
    return {
      generateData: this.data,
      search: {
        classify: "",
        name: ""
      },
      sourceCheck: false,
      targetCheck: false,
      checkedSource: [],
      checkedTarget: [],
      list: [],
      pageIndex: 1,
      pageSize: 20,
      pageTotal: 1,
      sourceIsIndeterminate: false,
      targetIsIndeterminate: false
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
    _search() {
      let { type, data } = protocolConverter(
        protocolMatchData(this.element.config.url, [this.search], "")
      );
      if (type == "request") {
        data.body = `pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&${data.body}`;
        executeProtocol.call(this, {
          type,
          data,
          cb: res => {
            console.log(res);
            if (res.code === 200) {
              this.pageTotal = res.data.pageTotal;
              this.list = res.data.list;
            }
          }
        });
      }
      // this.getData();
    },
    _clear() {
      this.search = {
        classify: "",
        name: ""
      };
      // const search = this.generateData[this.context];
      // for (let k in search) {
      //   search[k] = "";
      // }
      // this.generateData[this.context] = search;
    },
    prev() {
      if (this.pageIndex > 1) {
        this.pageIndex -= 1;
        this._search();
      }
    },
    next() {
      if (this.pageIndex < this.pageTotal) {
        this.pageIndex += 1;
        this._search();
      }
    },
    addToTarget() {
      const map = new Map();
      this.value.forEach(item => {
        if (!map.has(item.id)) {
          map.set(item.id, item);
        }
      });
      this.list
        .filter(item => {
          return this.checkedSource.indexOf(item.id) > -1;
        })
        .forEach(item => {
          if (!map.has(item.id)) {
            map.set(item.id, { id: item.id, title: item.title });
          }
        });

      this.value = [...map.values()];
      this.checkedSource = [];
      this.sourceIsIndeterminate = false;
      this.sourceCheck = false;
    },
    deleteTarget() {
      this.value = this.value.filter(item => {
        return this.checkedTarget.indexOf(item.id) < 0;
      });
      this.checkedTarget = [];
      this.targetIsIndeterminate = false;
      this.targetCheck = false;
    },
    sourceAllChange(val) {
      this.checkedSource = val ? this.list.map(item => item.id) : [];
      this.sourceIsIndeterminate = false;
    },
    sourceCheckedChange(value) {
      this.sourceCheck = value.length === this.list.length;
      this.sourceIsIndeterminate =
        value.length > 0 && value.length < this.list.length;
    },
    targetAllChange(val) {
      this.checkedTarget = val ? this.value.map(item => item.id) : [];
      this.targetIsIndeterminate = false;
    },
    targetCheckedChange(value) {
      this.targetCheck = value.length === this.value.length;
      this.targetIsIndeterminate =
        value.length > 0 && value.length < this.value.length;
    }
  },
  mounted() {
    this._search();
  }
};
</script>
<style lang="scss">
.generate {
  .search-cross {
    background-color: #ffffff;
    max-width: 800px;
  }
  ._search-cross {
    // min-height: 45px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background-color: #f8faff;
    padding: 3px 0;
    // margin: 0 10px;
  }
  ._search-cross-view {
    flex: 1;
    // min-height: 45px;
    display: flex;
    flex-direction: row;
  }
  ._search-cross-button {
    width: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
    height: 44px;
    // margin: 3px 0 3px 20px;
  }
  ._search-cross-content {
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  ._search-cross-list {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  ._search-cross-container {
    flex: 1;
    height: 300px;
    border: 1px solid #f8faff;
  }
  ._search-cross-header {
    width: 100%;
    height: 40px;
    background: #f8faff;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;
    p {
      margin-left: 20px;
      flex: 1;
    }
  }
  ._search-cross-center {
    width: 100%;
    height: 260px;
    overflow: auto;
  }
  ._search-cross-row {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    box-sizing: border-box;
    border-bottom: 1px solid #f8faff;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
