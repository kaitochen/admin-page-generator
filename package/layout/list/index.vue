<template>
  <div class="_list-page">
    <generate-view
      :context="context"
      :data.sync="generateData"
      :dragData="element"
    ></generate-view>
  </div>
</template>
<script>
import GenerateView from "../../../components/GenerateView";
export default {
  name: "pg-list",
  components: {
    GenerateView
  },
  provide() {
    return {
      setReadOnly: () => {
        return false;
      }
    };
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
  data() {
    return {
      generateData: this.data,
      context: "list"
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
  }
};
</script>
<style lang="scss">
.generate {
  ._list-page {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
