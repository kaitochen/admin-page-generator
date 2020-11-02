<template>
  <div class="_table-item" :style="{ width: element.config.width + 'px' }">
    <p class="_table-header">{{ element.config.label }}</p>
    <p class="_table-body"></p>
  </div>
</template>
<script>
export default {
  name: "pgd-table-text",
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    element: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
._table-item {
  height: 80px;
  min-width: 50px;
  background-color: #fff;
}
p {
  margin: 0;
}
._table-header {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
  line-height: 40px;
  box-sizing: border-box;
  color: #999999;
  font-size: 14px;
  font-weight: bold;
}
._table-body {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 12px;
  color: #666666;
}
</style>
