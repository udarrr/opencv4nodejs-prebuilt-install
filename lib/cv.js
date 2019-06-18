const path = require("path");
const { resolvePath } = require("./commons");

let winLibsPath;
if (process.env.BINDINGS_DEBUG) {
  winLibsPath = "../build/Debug/opencv4nodejs";
} else {
  winLibsPath = "../build/Release/opencv4nodejs";
}
// ensure binaries are added to path on windows
if (process.platform === "win32") {
  // append opencv binary path to node process
  if (!process.env.path.includes(winLibsPath)) {
    process.env.path = `${process.env.path};${winLibsPath};`;
  }
}

let cv;
if (process.env.BINDINGS_DEBUG) {
  cv = require(path.join(__dirname, "../build/Debug/opencv4nodejs"));
} else {
  cv = require(path.join(__dirname, "../build/Release/opencv4nodejs"));
}

// resolve haarcascade files
const { haarCascades, lbpCascades } = cv;
Object.keys(haarCascades).forEach(
    key =>
        (cv[key] = resolvePath(
            path.join(__dirname, "./haarcascades"),
            haarCascades[key]
        ))
);
Object.keys(lbpCascades).forEach(
    key =>
        (cv[key] = resolvePath(
            path.join(__dirname, "./lbpcascades"),
            lbpCascades[key]
        ))
);

module.exports = cv;
