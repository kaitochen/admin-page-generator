<template>
  <el-form class="_config-pg-form" label-position="top">
    <div class="_config-pg-form-item">
      <p class="_config-pg-title">属性配置</p>
      <el-form-item label="字段标识">
        <el-input type="text" v-model="element.config.prop" size="small" />
      </el-form-item>
      <el-form-item label="字段名称">
        <el-input type="text" v-model="element.config.label" size="small" />
      </el-form-item>
      <el-form-item label="宽度">
        <el-input
          size="small"
          style="width: 100%"
          v-model="element.config.width"
        ></el-input>
      </el-form-item>
      <el-form-item label="最小宽度">
        <el-input
          size="small"
          style="width: 100%"
          v-model="element.config.minWidth"
        ></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select
          v-model="element.config.type"
          placeholder=""
          class="flex-full"
        >
          <el-option
            v-for="item in element.config.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作链接">
        <el-input
          size="small"
          style="width: 100%"
          type="textarea"
          v-model="element.config.url"
        ></el-input>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "table-text-config",
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss"></style>
