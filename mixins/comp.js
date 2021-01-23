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
  inject: ["setReadOnly"],
  data() {
    return {
      value: this.element.config.defaultValue
    };
  },
  computed: {
    isReadOnly() {
      return this.setReadOnly() || false;
    }
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        let prop = this.element.config.prop;
        let _value;
        if (this.context) {
          _value = val[this.context][prop];
        } else {
          _value = val[prop];
        }
        this.value =
          this.element.config.multiple &&
          _value !== undefined &&
          _value !== null &&
          _value !== "" &&
          typeof _value === "string"
            ? _value.split(",")
            : _value;
      }
    },
    value: {
      deep: true,
      handler(val) {
        let _val = val;
        if (val == undefined) {
          if (this.element.type === "number") {
            _val = this.element.config.min;
          } else {
            _val = this.element.config.defaultValue;
          }
        }

        // if(val == undefined){
        //   val = this.element.config.defaultValue
        // }
        const _prop = this.element.config.prop;
        let _data = {};
        if (this.context) {
          _data = {
            ...this.data,
            [this.context]: { ...this.data[this.context], [_prop]: _val }
          };
        } else {
          _data = {
            ...this.data,
            [_prop]: _val
          };
        }
        this.$emit("update:data", _data);
      }
    }
  }
};
