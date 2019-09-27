const opencvBuild = require(`@nut-tree/opencv-build-${process.platform}`)
const { resolvePath } = require('../lib/commons')
const fs = require('fs')

const libDir = resolvePath(opencvBuild.opencvLibDir);

if (!fs.existsSync(libDir)) {
  throw new Error("library dir does not exist: " + libDir);
}

const libsFoundInDir = opencvBuild.getLibs(libDir).filter(lib => lib.libPath);

if (!libsFoundInDir.length) {
  throw new Error("No OpenCV libraries found in lib dir: " + libDir);
}

const defines = libsFoundInDir.map(
  lib => `OPENCV4NODEJS_FOUND_LIBRARY_${lib.opencvModule.toUpperCase()}`
);

const inc = [
  resolvePath(opencvBuild.opencvInclude),
  resolvePath(opencvBuild.opencv4Include)
];

const libs = opencvBuild.isWin()
  ? libsFoundInDir.map(lib => resolvePath(lib.libPath))
  : // dynamically link libs if not on windows
    ["-L" + libDir]
      .concat(libsFoundInDir.map(lib => "-lopencv_" + lib.opencvModule))
      .concat("-Wl,-rpath," + libDir);

module.exports = {
    OPENCV4NODEJS_LIBRARIES: () => libs.join("\n"),
    OPENCV4NODEJS_INCLUDES: () => inc.join("\n"),
    OPENCV4NODEJS_DEFINES: () => defines.join("\n")
}
