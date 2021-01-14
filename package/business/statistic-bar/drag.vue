<template>
  <ul class="pg-statistic-bar">
    <li class="pg-statistic-item">
      <span class="pg-statistic-icon"></span>
      <div class="pg-statistic-message">
        <span>统计数据</span>
        <p>52000</p>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "pgd-statistic-bar",
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
.pg-statistic-bar {
  // min-height: 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
  .pg-statistic-item {
    height: 60px;
    background-color: #ffffff;
    margin: 5px 10px 5px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 15px;
    border-radius: 5px;
    box-shadow: 0 0 5px 5px #f8f8f8;
    .pg-statistic-icon {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: #37f;
    }
    .pg-statistic-message {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      margin-left: 15px;
      span {
        color: #666;
        font-size: 12px;
      }
      p {
        color: #333;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
