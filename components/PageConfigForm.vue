<template>
  <el-form class="_config-pg-form" label-position="top">
    <div class="_config-pg-form-item">
      <p class="_config-pg-title">页面配置</p>
      <el-form-item label="上下文配置">
        <template v-for="(_context, index) in config">
          <div
            style="display: flex;flex-direction: row;margin-bottom: 10px"
            :key="index"
          >
            <el-input
              type="textarea"
              v-model="config[index]"
              size="small"
              :rows="3"
            >
            </el-input>
            <el-button
              type="text"
              size="small"
              style="height: 32px"
              icon="el-icon-error"
              @click="deleteContext(index)"
              >删除</el-button
            >
          </div>
        </template>
        <el-button type="primary" @click="addContext">增加上下文</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "page-config-form",
  props: {
    element: {
      type: [Array, String],
      required: true
    }
  },
  data() {
    return {
      config: this.element || []
    };
  },
  watch: {
    element(val) {
      this.config = Array.isArray(val) ? val : val.split(",");
    },
    config: {
      deep: true,
      handler(val) {
        this.$emit("update:element", val);
      }
    }
  },
  methods: {
    addContext() {
      this.config.push("");
    },
    deleteContext(index) {
      this.config.splice(index, 1);
    }
  }
};
</script>
<style lang="scss"></style>
