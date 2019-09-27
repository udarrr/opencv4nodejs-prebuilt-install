const { join } = require("path");

const isWin = () => process.platform == 'win32'

const isOSX = () => process.platform == 'darwin'

const isUnix = () => !isWin() && !isOSX();

const rootDir = `node_modules/@nut-tree/opencv-build-${process.platform}`
const opencvRoot = join(rootDir, 'opencv');
const opencvBuild = join(opencvRoot, 'build');
const opencvInclude = join(opencvBuild, 'include');
const opencvLibDir = isWin() ? join(opencvBuild, 'bin/Release') : join(opencvBuild, 'lib');
const opencvBinDir = isWin() ? join(opencvBuild, 'bin/Release') : join(opencvBuild, 'bin');

module.exports = {
    rootDir,
    opencvRoot,
    opencvBuild,
    opencvInclude,
    opencvLibDir,
    opencvBinDir
}
