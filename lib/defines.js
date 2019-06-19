const opencvBuild = require(`@nut-tree/opencv-build-${process.platform}`);
const { getLibDir, linkSystemLibs } = require('./commons');

if (linkSystemLibs()) {
  opencvBuild.getLibs(getLibDir())
    .filter(lib => lib.libPath)
    .map(lib => lib.opencvModule)
    .forEach(opencvModule => console.log(`OPENCV4NODEJS_FOUND_LIBRARY_${opencvModule.toUpperCase()}`));

  return;
}

// set defines from auto build
opencvBuild.opencvModules.forEach(m => console.log(`OPENCV4NODEJS_FOUND_LIBRARY_${m.toUpperCase()}`));