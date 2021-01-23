<template>
  <el-form
    ref="form"
    label-width="150px"
    :model="generateData"
    label-position="left"
    class="pg-form"
  >
    <generate-view
      :data.sync="generateData"
      :dragData="element"
    ></generate-view>
  </el-form>
</template>
<script>
import GenerateView from "../../../components/GenerateView";
export default {
  name: "pg-form",
  components: {
    GenerateView
  },
  props: {
    element: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  provide() {
    return {
      setReadOnly: () => {
        return !this.element.config.editable;
      },
      validate: () => {
        return new Promise(resolve => {
          this.$refs.form.validate(valid => {
            resolve(valid);
          });
        });
      },
      clear: () => {
        return this.clear();
      }
    };
  },
  data() {
    return {
      generateData: this.data,
      copyDataStr: ""
    };
  },
  watch: {
    data(val) {
      this.generateData = val;
    },
    generateData: {
      deep: true,
      handler(val) {
        this.$emit("update:data", val);
      }
    }
  },

  methods: {
    forgive() {
      this.$emit("forgive");
    },
    clear() {
      this.generateData = JSON.parse(this.copyDataStr);
    }
  },
  mounted() {
    this.copyDataStr = JSON.stringify(this.data);
  }
};
</script>
<style lang="scss" scoped></style>
