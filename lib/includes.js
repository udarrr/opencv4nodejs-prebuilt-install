const {opencv4Include, opencvInclude} = require("./dirs");

const {resolvePath, linkSystemLibs, defaultIncludeDir, defaultIncludeDirOpenCV4} = require('./commons');

if (linkSystemLibs()) {
    const explicitIncludeDir = resolvePath(process.env.OPENCV_INCLUDE_DIR);
    if (explicitIncludeDir) {
        console.log(explicitIncludeDir);
        return;
    }
    console.log(defaultIncludeDir);
    console.log(defaultIncludeDirOpenCV4);
    return;
}

// set include dir from auto build
console.log(resolvePath(opencvInclude));
console.log(resolvePath(opencv4Include));
