const path = require("path");
const { join } = require("path");

const isWin = () => process.platform == "win32";

const isOSX = () => process.platform == "darwin" && process.arch !== "arm64";

const isOSXM1 = () => process.platform == "darwin" && process.arch === "arm64";

const rootDir = join(process.cwd(), "osOpencvWorlds", isWin() ? "win32" : isOSX() ? "darwin" : isOSXM1() ? "darwinM1" : "linux");
const opencvRoot = join(rootDir, "opencv");
const opencvBuild = join(opencvRoot, "build");
const opencvInclude = join(opencvBuild, "include");
const opencvLibDir = isWin() ? join(opencvBuild, "bin", "Release") : join(opencvBuild, "lib");
const opencvBinDir = isWin() ? join(opencvBuild, "bin", "Release") : join(opencvBuild, "bin");

module.exports = {
  rootDir,
  opencvRoot,
  opencvBuild,
  opencvInclude,
  opencvLibDir,
  opencvBinDir,
};
