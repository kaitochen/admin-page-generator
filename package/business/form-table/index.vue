<template>
  <div class="pg-form-table-container">
    <div
      style="width:100%"
      v-if="!element.config.disabled && element.config.multiUpload"
    >
      <el-button type="primary" @click="multiUpload">批量上传</el-button>
    </div>
    <el-table class="pg-form-table" :data="value" border>
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
            <template v-if="element.config.disabled">
              <p @click="clickColumn(scope, col)">
                {{ scope.row[col.config.prop] }}
              </p>
            </template>
            <template v-else>
              <el-input
                v-if="col.config.type == 'text'"
                v-model="scope.row[col.config.prop]"
                placeholder=""
              ></el-input>
              <div v-else-if="col.config.type == 'video'">
                <p class="pg-form-table-video">
                  <span
                    class="pg-form-table-video-text"
                    @click="clickColumn(scope, col)"
                    >{{ scope.row[col.config.prop] }}</span
                  >
                  <span
                    class="pg-form-table-video-close el-icon-error"
                    @click="deleteVideo($event, scope, col.config.prop)"
                  ></span>
                </p>
                <el-button
                  v-show="!scope.row[col.config.prop]"
                  type="primary"
                  @click="checkUpload(scope, col.config.prop)"
                  >上传</el-button
                >
              </div>
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" v-if="!element.config.disabled">
        <template v-slot="scope">
          <el-button
            type="text"
            style="color: #ff4e56"
            @click="deleteRow(scope)"
            >删行</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="flex:1" v-if="!element.config.disabled">
      <el-button type="primary" @click="addRow">增行</el-button>
    </div>

    <input
      type="file"
      ref="file"
      :multiple="multi"
      accept=".mp3,.mp4,.ogg"
      class="file"
    />
  </div>
</template>
<script>
import comp from "../../../mixins/comp";
import {
  protocolConverter,
  protocolMatchData,
  executeProtocol
} from "../../../util/converter.js";
export default {
  name: "pg-form-table",
  mixins: [comp],
  components: {},
  props: {},
  computed: {
    rowItem() {
      let obj = {};
      this.element.columns.forEach(item => {
        obj[item.config.prop] = "";
      });
      return obj;
    },
    uploadProp() {
      let prop = "";
      this.element.columns.forEach(item => {
        if (item.config.type === "video") {
          prop = item.config.prop;
        }
      });
      return prop;
    }
  },
  data() {
    return {
      checkedData: {},
      multi: false
    };
  },
  watch: {},
  methods: {
    addRow() {
      let obj = {};
      this.element.columns.forEach(item => {
        obj[item.config.prop] = "";
      });
      this.value.push(obj);
    },
    deleteRow(scope) {
      const index = scope.$index;
      this.value.splice(index, 1);
    },
    checkUpload(data, prop) {
      this.checkedData = data;
      this.checkedData["__prop"] = prop;
      this.multi = false;
      this.$nextTick(() => {
        this.$refs.file.click();
      });
    },
    multiUpload() {
      this.multi = true;
      if (this.value.length > 0) {
        this.$nextTick(() => {
          this.$refs.file.click();
        });
      } else {
        this.$message.warning("没有数据列，无法上传");
      }
    },
    deleteVideo(e, scope, prop) {
      // e.stopPropagation();
      // e.preventDefault();
      console.log(e, scope);
      const index = scope.$index;
      this.value[index][prop] = "";
    },
    clickColumn(scope, col) {
      if (col.config.type == "video") {
        // const value = scope.row[col.config.prop];
        // console.log(value, col.config.url);
        try {
          let source = [scope.row];
          const { type, data } = protocolConverter(
            protocolMatchData(col.config.url, source, "")
          );
          if (type === "request" || type === "http") {
            executeProtocol.call(this, { type, data });
          } else {
            console.log("other");
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  mounted() {
    this.$refs.file.addEventListener("change", e => {
      if (this.multi) {
        let files = e.target.files;
        const _file = new Array(this.value.length).fill(undefined);
        for (let i = 0; i < files.length; i++) {
          const name = files[i].name;
          const res = name.match(/^\d-/);
          if (res != null) {
            const index = res[0].slice(0, -1) - 1;
            if (index < _file.length) {
              _file[index] = files[i];
            }
          }
        }
        if (this.uploadProp) {
          _file.forEach((file, index) => {
            if (file) {
              this.$custom
                .upload(file)
                .then(res => {
                  const prop = this.uploadProp;
                  console.log(index, prop);
                  this.value[index][prop] = res.fileData.vid;
                })
                .catch(err => {
                  console.log(err);
                });
            }
          });
        }
      } else {
        let files = e.target.files[0];
        this.$custom
          .upload(files)
          .then(res => {
            console.log(res);
            const index = this.checkedData.$index;
            const prop = this.checkedData.__prop;
            this.value[index][prop] = res.fileData.vid;
          })
          .catch(err => {
            console.log(err);
          });
      }

      // } else {
      // this.$message.error(
      //   "文件上传数量限制为" +
      //     limit +
      //     "，还可上传数量为" +
      //     (limit - len - readyLen)
      // );
      // }
      // }
      // }
      e.target.value = "";
    });
  }
};
</script>
<style lang="scss">
.generate {
  .pg-form-table-container {
    margin-top: 10px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    .pg-form-table {
      flex: none;
      width: auto;
      .el-table-column--selection .cell {
        padding: 0 10px;
      }
    }
    .pg-form-table-video {
      width: 100%;
      padding-right: 30px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .pg-form-table-video-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pg-form-table-video-close {
      position: absolute;
      width: 24px;
      height: 24px;
      right: 0;
      line-height: 24px;
      text-align: center;
      cursor: pointer;
    }
    .file {
      width: 0;
      height: 0;
      opacity: 0;
    }
  }
}
</style>
