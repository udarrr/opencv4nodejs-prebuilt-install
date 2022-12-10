const fs = require("fs");
const path = require("path");

const packageJson = require("../package.json");
packageJson.scripts = {
  install: "prebuild-install || exit 0",
};

try {
  const filename = path.join(process.cwd(), "package.json");
  fs.writeFileSync(filename, JSON.stringify(packageJson, null, 2));
} catch (err) {
  console.log(err);
  process.exit(-1);
}
console.log(`Install script added to package.json`);
