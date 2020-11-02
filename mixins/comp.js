export default {
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    element: {
      type: Object,
      required: true
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
      value: this.element.config.defaultValue
    };
  },
  watch: {
    data(val) {
      let prop = this.element.config.prop;
      if (this.context) {
        this.value = val[this.context][prop];
      } else {
        this.value = val[prop];
      }
    },
    value: {
      deep: true,
      handler(val) {
        const _prop = this.element.config.prop;
        let _data = {};
        if (this.context) {
          _data = {
            ...this.data,
            [this.context]: { ...this.data[this.context], [_prop]: val }
          };
        } else {
          _data = {
            ...this.data,
            [_prop]: val
          };
        }
        this.$emit("update:data", _data);
      }
    }
  }
};
