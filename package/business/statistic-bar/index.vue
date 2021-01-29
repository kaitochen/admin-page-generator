<template>
  <ul class="pg-statistic-bar">
    <li class="pg-statistic-item" v-for="(item, index) in value" :key="index">
      <img class="pg-statistic-icon" :src="item.icon" />
      <div class="pg-statistic-message">
        <span>{{ item.label }}</span>
        <p>{{ item.num }}</p>
      </div>
    </li>
  </ul>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-statistic-bar",
  mixins: [comp],
  props: {},
  data() {
    return {};
  },
  watch: {},
  methods: {},
  mounted() {}
};
</script>
<style lang="scss"></style>
