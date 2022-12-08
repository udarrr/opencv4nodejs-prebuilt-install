(function start() {
  if (!require("./package.json").config.ci) {
    throw new Error("Not supported");
  }
})();
