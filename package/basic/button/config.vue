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
      <el-form-item label="icon">
        <icon-picker :select.sync="element.config.icon" />
      </el-form-item>
      <el-form-item label="条件判断">
        <el-input
          size="small"
          style="width: 100%"
          v-model="element.config.condition"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限设置">
        <el-input
          size="small"
          style="width: 100%"
          v-model="element.config.role"
        ></el-input>
      </el-form-item>
      <el-form-item label="触发时是否校验数据">
        <el-radio-group v-model="element.config.valid">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否为批量操作">
        <el-radio-group v-model="element.config.selection">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="按钮类型">
        <el-radio-group v-model="element.config.btnType">
          <el-radio label="text">文字按钮</el-radio>
          <el-radio label="button">普通按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否圆角">
        <el-radio-group v-model="element.config.isCircle">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否为朴素按钮">
        <el-radio-group v-model="element.config.plain">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="点击链接">
        <el-input
          size="small"
          style="width: 100%"
          v-model="element.config.url"
        ></el-input>
      </el-form-item>
      <el-form-item label="按钮颜色">
        <el-select
          v-model="element.config.btnStyle"
          placeholder=""
          class="flex-full"
        >
          <el-option
            v-for="item in options"
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
import IconPicker from "../../../components/IconPicker";
export default {
  name: "button-config",
  components: {
    IconPicker
  },
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      options: [
        { value: "ghost", label: "透明" },
        { value: "primary", label: "默认" },
        { value: "success", label: "成功" },
        { value: "info", label: "通知" },
        { value: "warning", label: "警告" },
        { value: "danger", label: "危险" }
      ]
    };
  }
};
</script>
<style lang="scss"></style>
