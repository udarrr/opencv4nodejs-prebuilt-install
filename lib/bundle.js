const { opencvLibDir } = require("./dirs");
const { readdirSync } = require("fs");
const { resolvePath } = require('./commons');
const { join } = require("path");

for (const file of readdirSync(opencvLibDir)) {
    console.log(resolvePath(join(opencvLibDir, file)));
}
