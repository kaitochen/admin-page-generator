<template>
  <span>
    <draggable
      class="_dragContainer"
      v-model="value"
      v-bind="{
        group: 'media',
        ghostClass: 'ghost',
        animation: 200,
        handle: '.drag-media'
      }"
    >
      <transition-group name="fade" tag="div" class="file-list">
        <template v-for="(file, index) in value">
          <div class="file-item drag-media" :key="index">
            <p :title="file" @click="open(file)">{{ file }}</p>
            <span
              v-if="!(isReadOnly || element.config.disabled)"
              class="close el-icon-error"
              @click="deleteAlready(index)"
            ></span>
          </div>
        </template>
      </transition-group>
    </draggable>
    <div
      class="file-upload"
      v-if="!(isReadOnly || element.config.disabled)"
      v-show="value.length < element.config.limit"
    >
      <el-button
        type="primary"
        size="mini"
        @click="chooseFile"
        :disabled="isReadOnly || element.config.disabled"
        >选择文件</el-button
      >
      <input
        type="file"
        ref="file"
        class="file-input"
        :multiple="element.config.multiple"
        accept=".mp3,.mp4,.ogg"
      />
      <p class="file-explain">
        {{ element.config.placeholder || "请上传对应格式的文件" }}
      </p>
    </div>
    <file-upload-dialog
      :visible="dialogVisible"
      :already="value"
      :ready="readyFile"
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
import { filterMedia } from "../../../util/transform.js";
export default {
  name: "pg-media-upload",
  components: {
    FileUploadDialog,
    Draggable
  },
  mixins: [comp, multiSelector],
  props: {},
  data() {
    return {
      dialogVisible: false,
      readyFile: []
    };
  },
  computed: {},
  methods: {
    chooseFile() {
      if (this.element.config.multiple) {
        this.dialogVisible = true;
      } else {
        this.$refs.file.click();
      }
    },
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
        _upload.push(this.$upload.upload(files[i]));
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
    },
    open(file) {
      console.log(file);
      window.open(file, "_target");
    }
  },
  mounted() {
    if (this.$refs.file) {
      this.$refs.file.addEventListener("change", e => {
        let files = e.target.files;
        if (files) {
          let { res, error } = filterMedia(
            files,
            this.element.config.sizeLimit
          );
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
  }
};
</script>
<style lang="scss" scoped>
.file-list {
  margin: 0;
  padding: 0;
}
.file-upload {
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
}
.file-explain {
  flex: 1;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999999;
  font-size: 12px;
  margin: 0;
  line-height: 32px;
}
.file-input {
  width: 0;
  height: 0;
  opacity: 0;
}
.file-item {
  width: 100%;
  height: 32px;
  max-width: 400px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  color: #333333;
  font-size: 12px;
  margin-bottom: 8px;
  p {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
}
.close {
  width: 32px;
  height: 32px;
  font-size: 16px;
  color: #999999;
  text-align: center;
  line-height: 32px;
}
</style>
