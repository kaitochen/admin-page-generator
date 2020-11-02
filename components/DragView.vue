<template>
  <draggable
    class="_container"
    v-model="dragData.columns"
    v-bind="{
      group: 'designer',
      ghostClass: 'ghost',
      animation: 200,
      handle: '.drag-widget'
    }"
    @end="_handleMoveEnd"
    @add="_handleWidgetAdd"
  >
    <transition-group
      name="fade"
      tag="div"
      class="_container"
      :class="{ '_container-horizontal': isHorizontal }"
    >
      <template v-for="(element, index) in dragData.columns">
        <div
          class="drag-widget widget-view"
          v-if="element && element.key"
          :key="element.key"
          @click.stop="_selectWidget(index)"
          :class="{ 'widget-active': selectWidget.key === element.key }"
        >
          <template v-if="element.belong === 'normal'">
            <component
              :key="element.key"
              :is="'pgd-' + element.type"
              :read-only="true"
              :element="element"
              :selectForm.sync="selectWidget"
            >
            </component>
          </template>
          <template v-else>
            <el-form-item :label="element.config.label">
              <component
                :key="element.key"
                :is="'pgd-' + element.type"
                :read-only="true"
                :element="element"
              ></component>
            </el-form-item>
          </template>
          <div class="widget-view-action">
            <span
              v-show="selectWidget.key === element.key"
              class="widget-view-delete el-icon-paperclip"
              @click.stop="_copyWidget(index)"
            ></span>
            <span
              v-show="selectWidget.key === element.key"
              class="widget-view-delete el-icon-delete"
              @click.stop="_deleteWidget(index)"
            ></span>
          </div>
        </div>
      </template>
    </transition-group>
  </draggable>
</template>
<script>
import Draggable from "vuedraggable";

export default {
  name: "pgd-drag-view",
  components: {
    Draggable
  },
  props: {
    dragData: {
      type: Object,
      required: true
    },
    selectForm: {
      type: Object,
      required: true
    },
    isHorizontal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectWidget: this.selectForm
    };
  },
  watch: {
    selectForm(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit("update:selectForm", val);
      },
      deep: true
    }
  },
  methods: {
    _handleWidgetAdd(evt) {
      // console.log("add", evt);
      // console.log("end", evt);
      const newIndex = evt.newIndex;
      const key = this.generateKey(this.dragData.columns[newIndex]["type"]);
      if (this.dragData.columns[newIndex].belong === "normal") {
        this.$set(this.dragData.columns, newIndex, {
          type: this.dragData.columns[newIndex].type,
          belong: this.dragData.columns[newIndex].belong,
          config: Object.assign(
            this.deepClone(this.dragData.columns[newIndex].config),
            {
              prop: this.dragData.columns[newIndex].config.prop || key
            }
          ),
          columns: this.cloneWidget(
            this.deepClone(this.dragData.columns[newIndex].columns)
          ),
          key
        });
      } else {
        this.$set(this.dragData.columns, newIndex, {
          type: this.dragData.columns[newIndex].type,
          belong: this.dragData.columns[newIndex].belong || "",
          config: Object.assign(
            this.deepClone(this.dragData.columns[newIndex].config),
            {
              prop: this.dragData.columns[newIndex].config.prop || key
            }
          ),
          key
        });
      }
      // this.$emit("update:selectForm", this.dragData.columns[newIndex]);
      this.selectWidget = this.dragData.columns[newIndex];
    },
    _handleMoveEnd({ newIndex, oldIndex }) {
      console.log("index", newIndex, oldIndex);
    },
    _selectWidget(index) {
      // this.$emit("update:selectForm", this.dragData.columns[index]);
      this.selectWidget = this.dragData.columns[index];
    },
    _deleteWidget(index) {
      this.dragData.columns.splice(index, 1);
      // let newIndex = index - 1 > 0 ? index - 1 : 0;
      // this.selectWidget(0);
    },
    _copyWidget(index) {
      const newIndex = index + 1;
      console.log(newIndex);
      this.dragData.columns.splice(
        newIndex,
        0,
        this.deepClone(this.dragData.columns[index])
      );
      const key = this.generateKey(this.dragData.columns[newIndex]["type"]);
      if (this.dragData.columns[newIndex].belong === "normal") {
        this.$set(this.dragData.columns, newIndex, {
          ...this.dragData.columns[newIndex],
          config: Object.assign(
            this.deepClone(this.dragData.columns[newIndex].config),
            {
              prop: this.dragData.columns[newIndex].config.prop || key
            }
          ),
          columns: this.cloneWidget(
            this.deepClone(this.dragData.columns[newIndex].columns)
          ),
          key
        });
      } else {
        this.$set(this.dragData.columns, newIndex, {
          ...this.dragData.columns[newIndex],
          config: Object.assign(
            this.deepClone(this.dragData.columns[newIndex].config),
            {
              prop: this.dragData.columns[newIndex].config.prop || key
            }
          ),
          key
        });
      }
      // this.$emit("update:selectForm", this.dragData.columns[newIndex]);
      // this.selectWidget = this.dragData.columns[newIndex];
    }
  }
};
</script>
