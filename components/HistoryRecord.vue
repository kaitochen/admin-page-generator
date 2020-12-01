<template>
  <div class="history">
    <ul>
      <template v-for="(item, index) in historyList">
        <li :key="index" @click.stop="checkHistory(item)">
          <p class="title">
            <span>{{ item.name }}</span
            ><span
              class="el-icon-error"
              @click.stop="deleteHistory(item)"
            ></span>
          </p>
          <p class="text">{{ item.owner }} {{ item.createDate }}</p>
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
      this.$confirm("是否确定删除该版本？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("delete", data);
        })
        .catch(() => {});
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
      cursor: pointer;
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
