<template>
  <el-form class="_config-pg-form" label-position="top">
    <div class="_config-pg-form-item">
      <p class="_config-pg-title">属性配置</p>
      <el-form-item label="字段名称">
        <el-input type="text" v-model="element.config.prop" size="small" />
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "statistic-bar-config",
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  methods: {
    
  }
};
</script>
<style lang="scss">
._dynamic-option {
  .el-input-group__prepend {
    width: 40px;
    text-align: center;
    padding: 0;
  }
}
._options {
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  ._options-add {
    width: 24px;
    height: 24px;
    background-color: cornflowerblue;
    opacity: 0.8;
    border-radius: 12px;
    flex-shrink: 0;
    margin: 0 3px;
    cursor: pointer;
    text-align: center;
    line-height: 24px;
    color: #fff;
  }
  ._options-delete {
    width: 24px;
    height: 24px;
    background-color: #ff4e56;
    opacity: 0.8;
    border-radius: 12px;
    flex-shrink: 0;
    margin: 0 3px;
    cursor: pointer;
    text-align: center;
    line-height: 24px;
    color: #fff;
  }
}
</style>
