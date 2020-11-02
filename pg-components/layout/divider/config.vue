<template>
  <el-form class="_config-pg-form" label-position="top">
    <div class="_config-pg-form-item">
      <p class="_config-pg-title">属性配置</p>
      <el-form-item label="分割文本">
        <el-input type="text" v-model="element.config.label" size="small" />
      </el-form-item>
      <el-form-item label="文本显示位置">
        <el-select v-model="element.config.position" placeholder="">
          <el-option
            v-for="item in element.config.positionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "header-config",
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss"></style>
