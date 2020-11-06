<template>
  <el-form
    ref="form"
    label-width="150px"
    :model="generateData.form"
    label-position="left"
    class="pg-form"
  >
    <generate-view
      :context="context"
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
      }
    };
  },
  data() {
    return {
      generateData: this.data,
      context: "form"
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
    btnEvent(type) {
      switch (type) {
        case "save":
      }
      this.$refs.form.validate(valid => {
        console.log(valid, this.generateData);
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
