<template>
  <div class="_list-page">
    <generate-view
      :data.sync="generateData"
      :dragData="element"
      @search="search"
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
      generateData: this.data
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
    search() {
      this.$emit("search");
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
