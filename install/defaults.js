const opencvBuild = require(`@nut-tree/opencv-build-${process.platform}`)
const { resolvePath } = require('../lib/commons')
const fs = require('fs')
const { basename } = require("path");

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

// linkLib produces linker flags for GNU ld and BSD ld
// It generates linker flags based on the libPath, which make dealing with version numbers in lib names easier
// On Linux, it passes the full path via -l:/path/to/lib which links against the given file
// On macOS it strips the *.dylib suffix and the lib prefix and passes the result to via -l
// This results in e.g. -lopencv_world.4.1
const linkLib = (lib) => {
  if (opencvBuild.isOSX()) {
    return `-l${basename(lib.libPath, ".dylib").replace("lib", "")}`;
  } else {
    return `-l:${basename(lib.libPath)}`;
  }
}
const libs = opencvBuild.isWin()
  ? libsFoundInDir.map(lib => resolvePath(lib.libPath))
  // dynamically link libs if not on windows
  : ['-L' + libDir]
      .concat(libsFoundInDir.map(lib => linkLib(lib)))
      .concat('-Wl,-rpath,' + libDir)

module.exports = {
    OPENCV4NODEJS_LIBRARIES: () => libs.join("\n"),
    OPENCV4NODEJS_INCLUDES: () => inc.join("\n"),
    OPENCV4NODEJS_DEFINES: () => defines.join("\n")
}
