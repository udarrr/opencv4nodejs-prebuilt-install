const path = require('path');
const { resolvePath } = require('./commons');

const requirePath = path.join(__dirname, process.env.BINDINGS_DEBUG ? '../build/Debug/opencv4nodejs' : '../build/Release/opencv4nodejs')

const logDebug = process.env.OPENCV4NODES_DEBUG_REQUIRE ? require('npmlog').info : () => {}

let cv = null
try {
  logDebug('require', 'require path is ' + requirePath)
  cv = require(requirePath);
} catch (err) {
  logDebug('require', 'failed to require cv with exception: ' + err.toString())
  throw err
}

// resolve haarcascade files
const { haarCascades, lbpCascades } = cv;
Object.keys(haarCascades).forEach(
  key => cv[key] = resolvePath(path.join(__dirname, './haarcascades'), haarCascades[key]));
Object.keys(lbpCascades).forEach(
  key => cv[key] = resolvePath(path.join(__dirname, './lbpcascades'), lbpCascades[key]));

module.exports = cv;
