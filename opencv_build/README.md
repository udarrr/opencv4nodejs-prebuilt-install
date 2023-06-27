[![Build Status](https://travis-ci.org/nut-tree/npm-opencv-build.svg?branch=master)](http://travis-ci.org/nut-tree/npm-opencv-build)
[![Build status](https://ci.appveyor.com/api/projects/status/wj3muncnxef8ivfo/branch/master?svg=true)](https://ci.appveyor.com/project/s1hofmann/npm-opencv-build/branch/master)

A simple script to auto build recent OpenCV + contrib version via npm. This script is used to auto build <a href="https://github.com/nut-tree/opencv4nodejs"><b>opencv4nodejs-prebuilt</b></a>.

# Install

``` bash
npm install opencv-build
```

## Requirements

- cmake

### Windows

- windows build tools or Visual Studio

``` bash
npm install --global windows-build-tools
```

## Environment Variables

It's possible to specify build environment variables by inserting them into the `package.json` where the dependency is declared an object like:

```json
{
  "opencv4nodejs": {
    "autoBuildFlags": "-DOPENCV_GENERATE_PKGCONFIG=ON -DOPENCV_PC_FILE_NAME=opencv.pc",
    "autoBuildOpencvVersion": "4.1.1"
  }
}
```

The following environment variables can be passed:

- autoBuildBuildCuda
- autoBuildFlags
- autoBuildOpencvVersion
- autoBuildWithoutContrib
- disableAutoBuild
- opencvIncludeDir
- opencvLibDir
- opencvBinDir
