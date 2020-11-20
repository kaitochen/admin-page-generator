<template>
  <ul class="pg-multi-input">
    <li class="pg-MI-item" v-for="(item, index) in value" :key="index">
      <template v-for="(option, i) in element.config.options">
        <el-input
          :key="i"
          v-model="item[option.key]"
          :placeholder="option.label"
        ></el-input>
      </template>
    </li>
  </ul>
</template>
<script>
export default {
  name: "pgd-multi-input",
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
  data() {
    return {
      value: []
    };
  },
  watch: {
    "element.config.options": {
      deep: true,
      handler(value) {
        let obj = {};
        value.forEach(item => {
          obj[item.key] = "";
        });
        this.value = [obj];
      }
    }
  },
  methods: {
    init(value) {
      let obj = {};
      value.forEach(item => {
        obj[item.key] = "";
      });
      this.value = [obj];
    }
  },
  mounted() {
    this.init(this.element.config.options);
  }
};
</script>
<style lang="scss">
.pg-multi-input {
  // MI代表multi-input
  .pg-MI-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 32px;
  }
}
</style>
