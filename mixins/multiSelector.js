import {
  protocolConverter,
  protocolMatchData,
  executeProtocol
} from "../util/converter";
export default {
  data() {
    return {
      options: []
    };
  },
  watch: {
    "element.config.multiple": function(val) {
      this.value = val ? [] : "";
    },
    data(newValue, oldValue) {
      if (
        this.element.config.dynamic &&
        Object.keys(oldValue).length <= 0 &&
        Object.keys(newValue).length > 0
      ) {
        this.curlCommand(this.element.config.dynamicUrl, this.curlCallback);
      }
    }
  },
  methods: {
    curlCallback(params) {
      if (params.type === "request" || params.type === "http") {
        executeProtocol
          .call(this, params)
          .then(res => {
            if (res && res.code === 200) {
              console.log(res);
              this.options = res.data;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    curlCommand(command, cb) {
      try {
        let params = protocolConverter(
          protocolMatchData(command, this.data, this.context)
        );
        cb(params);
      } catch (e) {
        console.log("catch error", e);
      }
    }
  }
};
