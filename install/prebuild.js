const opencvBuild = require(`@nut-tree/opencv-build-${process.platform}`)
const fs = require('fs')
const log = require('npmlog')
const { exec } = require("child_process");
const { resolvePath } = require('../lib/commons')

opencvBuild.applyEnvsFromPackageJson()

const libDir = resolvePath(opencvBuild.opencvLibDir);

log.info('install', 'using lib dir: ' + libDir)

if (!fs.existsSync(libDir)) {
  throw new Error('library dir does not exist: ' + libDir)
}

const libsFoundInDir = opencvBuild
  .getLibs(libDir)
  .filter(lib => lib.libPath)

if (!libsFoundInDir.length) {
  throw new Error('no OpenCV libraries found in lib dir: ' + libDir)
}

log.info('install', 'found the following libs:')
libsFoundInDir.forEach(lib => log.info('install', lib.opencvModule + ' : ' + lib.libPath))

const defines = libsFoundInDir
  .map(lib => `OPENCV4NODEJS_FOUND_LIBRARY_${lib.opencvModule.toUpperCase()}`)

const includes = [resolvePath(opencvBuild.opencvInclude), resolvePath(opencvBuild.opencv4Include)]

const libs = opencvBuild.isWin()
  ? libsFoundInDir.map(lib => resolvePath(lib.libPath))
  // dynamically link libs if not on windows
  : ['-L' + libDir]
      .concat(libsFoundInDir.map(lib => '-lopencv_' + lib.opencvModule))
      .concat('-Wl,-rpath,' + libDir)

console.log()
log.info('install', 'setting the following defines:')
defines.forEach(def => log.info('defines', def))
console.log()
log.info('install', 'setting the following includes:')
includes.forEach(inc => log.info('includes', inc))
console.log()
log.info('install', 'setting the following libs:')
libs.forEach(lib => log.info('libs', lib))

process.env['OPENCV4NODEJS_DEFINES'] = defines.join('\n')
process.env['OPENCV4NODEJS_INCLUDES'] = includes.join('\n')
process.env['OPENCV4NODEJS_LIBRARIES'] = libs.join('\n')

const UPLOAD_TOKEN_KEY = 'GITHUB_TOKEN';
const uploadToken = process.env[UPLOAD_TOKEN_KEY];

if (!uploadToken) {
  throw new Error(`Missing upload token at env ${UPLOAD_TOKEN_KEY}`)
}

const prebuildCmd = `prebuild --include-regex "\.(node|a|so|dylib|lib|dll).*$" -u ${uploadToken}`
log.info('install', `Running prebuild`)
const child = exec(prebuildCmd, {
    maxBuffer: 1024 * 1024 * 10
}, function(err, stdout, stderr) {
  const _err = err || stderr
  if (_err) log.error(_err)
})
child.stdout.pipe(process.stdout)
child.stderr.pipe(process.stderr)
