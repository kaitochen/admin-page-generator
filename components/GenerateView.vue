<template>
  <div class="generate" :class="{ 'generate-horizontal': isHorizontal }">
    <template v-for="element in dragData.columns">
      <component
        v-if="element.belong === 'normal'"
        :key="element.key"
        :is="'pg-' + element.type"
        :read-only="false"
        :element="element"
        :data.sync="generateData"
        :context="context"
        :scope="scope"
        @search="search"
      >
      </component>
      <el-form-item
        :key="element.key"
        v-else
        :label="element.config.label"
        :title="element.config.label"
        :prop="element.config.prop"
        :rules="getRule(element)"
      >
        <component
          :key="element.key"
          :is="'pg-' + element.type"
          :read-only="false"
          :element="element"
          :data.sync="generateData"
          :context="context"
          :scope="scope"
          @search="search"
        ></component>
      </el-form-item>
    </template>
  </div>
</template>
<script>
import { validateEl } from "../util/validate";
export default {
  name: "pg-view",
  components: {},
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    dragData: {
      type: Object,
      required: true
    },
    isHorizontal: {
      type: Boolean,
      default: false
    },
    scope: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      required: true
    },
    context: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      generateData: {}
    };
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.generateData = val;
      }
    },
    generateData: {
      deep: true,
      handler(val) {
        this.$emit("update:data", val);
      }
    }
  },
  methods: {
    getRule(el) {
      const valid = el.config.required
        ? {
            validator: validateEl(el),
            trigger: "change",
            required: true
          }
        : {
            required: false
          };
      return valid;
    },
    search() {
      this.$emit("search");
    }
  },
  mounted() {
    this.generateData = this.data;
  }
};
</script>
<style lang="scss"></style>
