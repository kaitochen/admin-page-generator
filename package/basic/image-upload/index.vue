<template>
  <span>
    <div class="_dragContainer">
      <draggable
        class="_dragContainer"
        v-model="value"
        v-bind="{
          group: 'images',
          ghostClass: 'ghost',
          animation: 200,
          handle: '.drag-image'
        }"
      >
        <transition-group name="fade" tag="div" class="file-list">
          <template v-for="(file, index) in value">
            <div class="image drag-image" :key="index">
              <el-image
                class="image"
                :src="file"
                fit="cover"
                :preview-src-list="[file]"
              ></el-image>
              <span
                class="close el-icon-error"
                @click="deleteAlready(index)"
              ></span>
            </div>
          </template>
        </transition-group>
      </draggable>
      <div
        class="upload-item"
        @click="chooseImage"
        v-if="!isReadOnly || !element.config.disabled"
        v-show="value.length < element.config.limit"
      >
        <i class="el-icon-plus"></i>
      </div>
    </div>

    <input
      type="file"
      ref="file"
      class="file-input"
      :multiple="element.config.multiple"
      accept=".png,.jpg,.jpeg"
    />
    <file-upload-dialog
      :visible="dialogVisible"
      :already="value"
      :ready="readyFile"
      type="image"
      @cancel="cancel"
      @upload="upload"
      @delete="deleteFile"
      @choose="choose"
    />
  </span>
</template>
<script>
import Draggable from "vuedraggable";

import comp from "../../../mixins/comp";
import multiSelector from "../../../mixins/multiSelector";
import FileUploadDialog from "../../../components/FileUploadDialog";
import { filterImage } from "../../../util/transform.js";
export default {
  name: "pg-image-upload",
  mixins: [comp, multiSelector],
  components: { FileUploadDialog, Draggable },
  props: {},
  data() {
    return {
      dialogVisible: false,
      readyFile: []
    };
  },
  methods: {
    chooseImage() {
      if (this.element.config.multiple) {
        this.dialogVisible = true;
      } else {
        this.$refs.file.click();
      }
    },
    // fileToImage(file) {
    //   return window.URL.createObjectURL(file);
    // },
    cancel() {
      if (this.readyFile.length > 0) {
        this.$confirm("还有文件未上传，确定关闭？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.readyFile = [];
            this.dialogVisible = false;
          })
          .catch(() => {});
      } else {
        this.readyFile = [];
        this.dialogVisible = false;
      }
    },
    upload() {
      this._uploadFile(this.readyFile, files => {
        this.value = this.value.concat(files);
        this.readyFile = [];
        this.dialogVisible = false;
      });
    },
    deleteFile(index) {
      this.readyFile.splice(index, 1);
    },
    choose() {
      this.$refs.file.click();
    },
    deleteAlready(index) {
      this.value.splice(index, 1);
    },
    _uploadFile(files, cb) {
      let _upload = [];
      for (let i = 0; i < files.length; i++) {
        _upload.push(this.$upload.aliUpload(files[i]));
      }
      Promise.all(_upload)
        .then(res => {
          cb(
            res.map(item => {
              return item.url;
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$refs.file.addEventListener("change", e => {
      let files = e.target.files;
      if (files) {
        let { res, error } = filterImage(files, this.element.config.sizeLimit);
        if (error.length > 0) {
          this.$message.error(
            "以下文件不符合文件格式或者超出了最大文件大小(" +
              this.element.config.sizeLimit +
              "MB)，已被忽略：" +
              error.join(";\n")
          );
        }
        if (res.length > 0) {
          const limit = this.element.config.limit;
          let len = this.value.length;
          let readyLen = this.readyFile.length;
          let resLen = res.length;
          if (len + resLen + readyLen <= limit) {
            this.readyFile = this.readyFile.concat([...res]);
            if (!this.element.config.multiple) {
              this._uploadFile(this.readyFile, files => {
                this.value = this.value.concat(files);
                this.readyFile = [];
                this.dialogVisible = false;
              });
            }
          } else {
            this.$message.error(
              "文件上传数量限制为" +
                limit +
                "，还可上传数量为" +
                (limit - len - readyLen)
            );
          }
        }
      }
      e.target.value = "";
    });
  }
};
</script>
<style lang="scss" scoped>
._dragContainer {
  // width: 100%;
  display: flex;
  flex-direction: row;
}
.file-list {
  margin: 0;
  padding: 0;
  min-height: 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
.upload-item {
  width: 60px;
  height: 60px;
  background-color: #f8f8f8;
  border: 1px dashed #e5e5e5;
  border-radius: 5px;
  cursor: pointer;
  color: #e5e5e5;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.file-input {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
}
.image {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  position: relative;
}
.close {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  font-size: 16px;
  color: #999999;
  cursor: pointer;
}
</style>
