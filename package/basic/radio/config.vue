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
      <el-form-item label="默认值">
        <el-input
          type="text"
          v-model="element.config.defaultValue"
          size="small"
        />
      </el-form-item>
      <el-form-item label="是否必填">
        <el-radio v-model="element.config.required" :label="true">是</el-radio>
        <el-radio v-model="element.config.required" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-radio v-model="element.config.disabled" :label="true">是</el-radio>
        <el-radio v-model="element.config.disabled" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="选项配置">
        <el-radio v-model="element.config.dynamic" :label="true">动态</el-radio>
        <el-radio v-model="element.config.dynamic" :label="false"
          >静态</el-radio
        >
      </el-form-item>
      <el-form-item label="动态配置属性" v-if="element.config.dynamic">
        <el-input
          type="textarea"
          class="_dynamic-option"
          v-model="element.config.dynamicUrl"
          placeholder="请输入请求地址"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="静态配置属性" v-else>
        <div
          class="_options"
          v-for="(radio, index) in element.config.options"
          :key="index"
        >
          <el-input v-model="radio.value"></el-input>
          <el-input v-model="radio.label"></el-input>
          <span
            class="_options-add"
            v-show="index === element.config.options.length - 1"
            @click="addOptions"
            >+</span
          >
          <span
            class="_options-delete"
            v-show="
              index < element.config.options.length - 1 ||
                (element.config.options.length === 0 &&
                  index === element.config.options.length - 1)
            "
            @click="deleteOptions"
            >-</span
          >
        </div>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "radio-config",
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  methods: {
    addOptions() {
      let options = [...this.element.config.options];
      options.push({ value: "value" + options.length, label: "label" });
      this.element.config.options = options;
    },
    deleteOptions(index) {
      this.element.config.options.splice(index, 1);
    }
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
