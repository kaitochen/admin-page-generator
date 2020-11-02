<template>
  <span>
    <ul class="file-list"></ul>
    <div class="file-upload">
      <el-button
        type="primary"
        size="mini"
        @click="chooseFile"
        :disabled="readOnly || element.config.disabled"
        >选择文件</el-button
      >
      <input type="file" ref="file" class="file-input" />
      <p class="file-explain">
        {{ element.config.placeholder || "请上传对应格式的文件" }}
      </p>
    </div>
  </span>
</template>
<script>
export default {
  name: "pgd-file-upload",
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    element: {
      type: Object,
      required: true
    }
  },
  methods: {
    chooseFile() {
      this.$refs.file.click();
    }
  },
  mounted() {
    this.$refs.file.addEventListener("change", e => {
      console.log(e);
    });
  }
};
</script>
]
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
</style>
