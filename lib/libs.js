const opencvBuild = require(`@nut-tree/opencv-build-${process.platform}`);
const { resolvePath, getLibDir, linkSystemLibs } = require('./commons');

function linkLibs(libs) {
  libs
      .map(lib => lib.libPath)
      .filter(libPath => libPath)
      .forEach(libPath => console.log(resolvePath(libPath)));
}

if (linkSystemLibs()) {
  linkLibs(opencvBuild.getLibs(getLibDir()));
  return;
}

// get libs from auto build
if (process.platform === 'win32') {
  linkLibs(opencvBuild.getLibs(resolvePath(opencvBuild.opencvLibDir)));
  return;
}

// if not windows, link libs dynamically
console.log(`-L<(PRODUCT_DIR)`);
opencvBuild.opencvModules.forEach(lib => console.log(`-lopencv_${lib}`));
