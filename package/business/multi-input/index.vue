<template>
  <ul class="pg-multi-input">
    <li class="pg-MI-item" v-for="(item, index) in value" :key="index">
      <template v-for="(option, i) in options">
        <el-input
          :key="i"
          v-model="item[option.key]"
          :placeholder="option.label"
        ></el-input>
      </template>
      <el-button
        type="danger"
        v-show="value.length > 1"
        @click="deleteRow(index)"
        >删行</el-button
      >
    </li>
    <el-button type="primary" icon="el-icon-plus" @click="addRow"
      >增行</el-button
    >
  </ul>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-multi-input",
  mixins: [comp],
  props: {},
  data() {
    return {
      options: this.element.config.options
    };
  },
  watch: {
    value(val) {
      if (val instanceof Array && val.length <= 0) {
        this.addRow();
      } else {
        return false;
      }
    }
  },
  methods: {
    getRow(value) {
      let obj = {};
      value.forEach(item => {
        obj[item.key] = "";
      });
      return obj;
    },
    addRow() {
      const row = this.getRow(this.element.config.options);
      this.value.push(row);
    },
    deleteRow(index) {
      this.value.splice(index, 1);
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.pg-multi-input {
  padding: 0;
  max-width: 500px;
  // MI代表multi-input
  .pg-MI-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 32px;
  }
  .pg-MI-item + .pg-MI-item {
    margin-top: 5px;
  }
}
</style>
