<template>
  <el-dialog
    title="批量上传"
    :visible="visible"
    width="800px"
    :append-to-body="true"
    :show-close="false"
  >
    <div class="_dialog-container">
      <ul class="files-list" v-if="type === 'file'">
        <li
          class="files-item"
          v-for="(item, index) in already"
          :key="'already_' + index"
        >
          <span class="icon el-icon-success"></span>
          <p>{{ item.name }}</p>
        </li>
        <li
          class="files-item"
          v-for="(item, index) in ready"
          :key="'ready_' + index"
        >
          <span class="icon el-icon-upload2"></span>
          <p>{{ item.name }}</p>
          <span class="close el-icon-error" @click="deleteFile(index)"></span>
        </li>
      </ul>
      <ul class="images-list" v-else-if="type === 'image'">
        <li
          class="images-item"
          v-for="(item, index) in already"
          :key="'already_' + index"
        >
          <el-image
            class="images-item"
            :src="item"
            :preview-src-list="[item]"
            fit="cover"
          ></el-image>
          <span class="image-icon el-icon-success"></span>
        </li>
        <li
          class="images-item"
          v-for="(item, index) in ready"
          :key="'ready_' + index"
        >
          <el-image
            class="images-item"
            :src="fileToImage(item)"
            :preview-src-list="[fileToImage(item)]"
            fit="cover"
          ></el-image>
          <span
            class="image-close el-icon-error"
            @click="deleteFile(index)"
          ></span>
        </li>
      </ul>
    </div>
    <div slot="footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="choose">选择文件</el-button>
      <el-button type="primary" @click="upload">上传</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "file-upload-dialog",
  props: {
    visible: {
      type: Boolean,
      required: false
    },
    already: {
      type: Array,
      required: true
    },
    ready: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: "file"
    }
  },
  methods: {
    deleteFile(index) {
      this.$emit("delete", index);
    },
    cancel() {
      this.$emit("cancel");
    },
    upload() {
      this.$emit("upload");
    },
    choose() {
      this.$emit("choose");
    },
    fileToImage(file) {
      return window.URL.createObjectURL(file);
    }
  }
};
</script>
<style lang="scss" scoped>
._dialog-container {
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
}
.files-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
}
.files-item {
  max-width: 400px;
  height: 32px;
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
    margin: 0;
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
.icon {
  width: 32px;
  height: 32px;
  font-size: 20px;
  color: #28bd28;
  text-align: center;
  line-height: 32px;
}
.images-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 10px 0;
  flex-wrap: wrap;
}
.images-item {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
}
.image-icon {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  color: #28bd28;
  font-size: 16px;
}
.image-close {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  color: #999999;
  font-size: 16px;
  cursor: pointer;
}
</style>
