<template>
  <div class="pg-form-table-container">
    <el-table class="pg-form-table" :data="value" border>
      <template v-for="col in element.columns">
        <el-table-column
          v-if="col.type === 'table-text'"
          :key="col.key"
          :prop="col.config.prop"
          :label="col.config.label"
          :width="col.config.width"
          :min-width="col.config.minWidth"
        >
          <template v-slot="scope">
            <template v-if="element.config.disabled">
              {{ scope.row[col.config.prop] }}
            </template>
            <template v-else>
              <el-input
                v-model="scope.row[col.config.prop]"
                placeholder=""
              ></el-input>
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" v-if="!element.config.disabled">
        <template v-slot="scope">
          <el-button type="danger" plain @click="deleteRow(scope)">删行</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="flex:1" v-if="!element.config.disabled">
      <el-button type="primary" @click="addRow">增行</el-button>
    </div>
  </div>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-form-table",
  mixins: [comp],
  components: {},
  props: {},
  computed: {
    rowItem() {
      let obj = {};
      this.element.columns.forEach(item => {
        obj[item.config.prop] = "";
      });
      return obj;
    }
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    addRow() {
      this.value.push(this.rowItem);
    },
    deleteRow(scope) {
      const index = scope.$index;
      this.value.splice(index, 1);
    }
  }
};
</script>
<style lang="scss">
.generate {
  .pg-form-table-container {
    margin-top: 10px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    .pg-form-table {
      flex: none;
      width: auto;
      .el-table-column--selection .cell {
        padding: 0 10px;
      }
    }
  }
}
</style>
