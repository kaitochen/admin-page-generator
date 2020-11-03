<template>
  <el-dialog
    title="批量上传"
    :visible="visible"
    width="800px"
    :append-to-body="true"
    :show-close="false"
  >
    <div class="_dialog-container">
      <ul class="files-list">
        <li
          class="files-item"
          v-for="(item, index) in already"
          :key="'already_' + index"
        >
          <span class="icon el-icon-circle-check"></span>
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
  color: #37f;
  text-align: center;
  line-height: 32px;
}
</style>
