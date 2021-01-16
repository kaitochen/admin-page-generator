<template>
  <div class="pg-form-table-container">
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
              <p>{{ scope.row[col.config.prop] }}</p>
            </template>
            <template v-else>
              <el-input
                v-if="col.config.type == 'text'"
                v-model="scope.row[col.config.prop]"
                placeholder=""
              ></el-input>
              <div v-else-if="col.config.type == 'video'">
                <p class="pg-form-table-video">
                  {{ scope.row[col.config.prop] }}
                  <span class="pg-form-table-video-close el-icon-error" @click="deleteVideo(scope, col.config.prop)"></span>
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
    <input type="file" ref="file" accept=".mp3,.mp4,.ogg" class="file" />
  </div>
</template>
<script>
import comp from "../../../mixins/comp";
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
    }
  },
  data() {
    return {
      checkedData: {}
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
      this.$refs.file.click();
    },
    deleteVideo(scope,prop){
      const index = scope.$index;
      this.value[index][prop] = "";
    }
  },
  mounted() {
    this.$refs.file.addEventListener("change", e => {
      let files = e.target.files[0];
      // if (files) {
      //   let { res, error } = filterMedia(files, 50);
      //   if (error.length > 0) {
      //     this.$message.error(
      //       "以下文件不符合文件格式或者超出了最大文件大小(" +
      //         50 +
      //         "MB)，已被忽略：" +
      //         error.join(";\n")
      //     );
      //   }
      // if (res.length > 0) {
      // const limit = 1;
      this.$custom
        .upload(files)
        .then(res => {
          console.log(res);
          const index = this.checkedData.$index;
          const prop = this.checkedData.__prop;
          this.value[index][prop] = res.uploaderid;
        })
        .catch(err => {
          console.log(err);
        });

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
