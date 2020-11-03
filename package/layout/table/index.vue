<template>
  <div class="pg-table-container">
    <el-table class="pg-table" :data="data" border>
      <el-table-column
        type="selection"
        width="50"
        v-if="element.config.selection"
      >
      </el-table-column>
      <template v-for="col in element.columns">
        <el-table-column
          v-if="col.type === 'table-text'"
          :key="col.key"
          :prop="col.config.prop"
          :label="col.config.label"
          :width="col.config.width"
          :min-width="col.config.minWidth"
        >
        </el-table-column>
        <el-table-column
          v-if="col.type === 'table-operation'"
          :key="col.key"
          :label="col.config.label"
          :width="col.config.width"
          :min-width="col.config.minWidth"
          :fixed="col.config.fixRight ? 'right' : false"
        >
          <template v-slot="scope">
            <generate-view
              :scope="scope"
              :dragData="col"
              :isHorizontal="true"
            ></generate-view>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <el-pagination
      v-if="element.config.pagination"
      style="padding: 10px 0;text-align:center;background-color: #FFFFFF"
      background
      :page-sizes="[10, 20, 50, 100]"
      :total="500"
      :page-size="10"
      :current-page="1"
      layout="sizes,prev, pager, next,jumper"
    >
    </el-pagination>
  </div>
</template>
<script>
import GenerateView from "../../../components/GenerateView";
export default {
  name: "pg-table",
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
      data: [
        {
          nickname: "这就是昵称",
          username: "这就是账号"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.generate {
  .pg-table-container {
    margin-top: 10px;
    padding: 0 10px;
    .pg-table {
      .el-table-column--selection .cell {
        padding: 0 10px;
      }
    }
  }
}
</style>
