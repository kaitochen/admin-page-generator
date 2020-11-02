<template>
  <span>
    <ul class="file-list">
      <li class="upload-item" @click="chooseImage">
        <i class="el-icon-plus"></i>
      </li>
    </ul>
    <input type="file" ref="file" class="file-input" />
  </span>
</template>
<script>
export default {
  name: "pgd-image-upload",
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
    chooseImage() {
      if (this.readOnly) {
        return;
      }
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
  min-height: 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  li + li {
    margin-left: 10px;
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
</style>
