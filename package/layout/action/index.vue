<template>
  <div class="_action">
    <generate-view :isHorizontal="true" :dragData="element"></generate-view>
  </div>
</template>
<script>
import GenerateView from "../../../components/GenerateView";
export default {
  name: "pg-action",
  components: {
    GenerateView
  },
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      data: []
    };
  }
};
</script>
<style lang="scss">
.generate {
  ._action {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    background-color: #ffffff;
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
}
</style>
