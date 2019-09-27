const opencvBuild = require(`@nut-tree/opencv-build-${process.platform}`);
const { resolvePath } = require('./commons');

// set include dir from auto build
console.log(resolvePath(opencvBuild.opencvInclude));
console.log(resolvePath(opencvBuild.opencv4Include));
