<template>
  <div class="history">
    <ul>
      <template v-for="(item, index) in historyList">
        <li :key="index">
          <p class="title">
            <span @click.stop="checkHistory(item)">{{ item.name }}</span
            ><span class="el-icon-error" @click="deleteHistory(item)"></span>
          </p>
          <p class="text" @click.stop="checkHistory(item)">
            {{ item.owner }} {{ item.createDate }}
          </p>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: "history-record",
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    historyList: {
      type: Array,
      required: true
    }
  },
  methods: {
    checkHistory(data) {
      this.$emit("check", data);
    },
    deleteHistory(data) {
      this.$emit("delete", data);
    }
  }
};
</script>
<style lang="scss" scoped>
.history {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      padding: 5px 10px;
      box-sizing: border-box;
      .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        margin-bottom: 5px;
      }
      .text {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
