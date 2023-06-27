const fs = require("fs");
const { join } = require("path");

if (process.env.npm_config_loglevel === "silly") {
  log.level = "silly";
}

const filename = join(__dirname, "package.json");
const packageJson = require(filename);

delete packageJson.opencv4nodejs.disableAutoBuild;

try {
  fs.writeFileSync(filename, JSON.stringify(packageJson, null, 2));
} catch (err) {
  console.log(err);
  process.exit(-1);
}
const { install } = require("./build_release_opencv/install");

install().then(() => {
  packageJson.opencv4nodejs.disableAutoBuild = 1;
});
