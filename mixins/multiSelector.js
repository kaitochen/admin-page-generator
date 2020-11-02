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
        Object.keys(oldValue).length <= 0 &&
        Object.keys(newValue).length > 0 &&
        this.element.config.dynamic
      ) {
        this.curlCommand(this.element.config.dynamicUrl);
      }
    }
  },
  methods: {
    curlCommand(command) {
      try {
        let params = protocolConverter(
          protocolMatchData(command, this.data, this.context)
        );
        if (params.type === "request" || params.type === "http") {
          executeProtocol
            .call(this, params)
            .then(res => {
              if (res && res.code === 200) {
                this.options = res.data;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } catch (e) {
        console.log("catch error", e);
      }
    }
  }
};
