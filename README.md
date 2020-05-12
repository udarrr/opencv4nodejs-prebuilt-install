opencv4nodejs
=============

![opencv4nodejs](https://user-images.githubusercontent.com/31125521/37272906-67187fdc-25d8-11e8-9704-40e9e94c1e80.jpg)

[![Build Status](https://travis-ci.org/justadudewhohacks/opencv4nodejs.svg?branch=master)](http://travis-ci.org/justadudewhohacks/opencv4nodejs)
[![Build status](https://ci.appveyor.com/api/projects/status/cv3o65nrosh1udbb/branch/master?svg=true)](https://ci.appveyor.com/project/justadudewhohacks/opencv4nodejs/branch/master)
[![Coverage](https://codecov.io/github/justadudewhohacks/opencv4nodejs/coverage.svg?branch=master)](https://codecov.io/gh/justadudewhohacks/opencv4nodejs)
[![npm download](https://img.shields.io/npm/dm/opencv4nodejs.svg?style=flat)](https://www.npmjs.com/package/opencv4nodejs)
[![node version](https://img.shields.io/badge/node.js-%3E=_6-green.svg?style=flat)](http://nodejs.org/download/)
[![Slack](https://slack.bri.im/badge.svg)](https://slack.bri.im/)

**opencv4nodejs allows you to use the native OpenCV library in nodejs. Besides a synchronous API the package provides an asynchronous API, which allows you to build non-blocking and multithreaded computer vision tasks. opencv4nodejs supports OpenCV 3 and OpenCV 4.**

**The ultimate goal of this project is to provide a comprehensive collection of nodejs bindings to the API of OpenCV and the OpenCV-contrib modules. To get an overview of the currently implemented bindings, have a look at the [type declarations](https://github.com/justadudewhohacks/opencv4nodejs/tree/master/lib/typings) of this package. Furthermore, contribution is highly appreciated. If you want to add missing bindings check out the <a href="https://github.com/justadudewhohacks/opencv4nodejs/tree/master/CONTRIBUTING.md"><b>contribution guide</b>.**

* **[Examples](#examples)**
* **[How to install](#how-to-install)**
* **[Usage with Docker](#usage-with-docker)**
* **[Usage with Electron](#usage-with-electron)**
* **[Usage with NW.js](#usage-with-nwjs)**
* **[Quick Start](#quick-start)**
* **[Async API](#async-api)**
* **[With TypeScript](#with-typescript)**
* **[External Memory Tracking (v4.0.0)](#external-mem-tracking)**

<a name="examples"></a>

# Examples

See <a href="https://github.com/justadudewhohacks/opencv4nodejs/tree/master/examples"><b>examples</b></a> for implementation.

### Face Detection

![face0](https://user-images.githubusercontent.com/31125521/29702727-c796acc4-8972-11e7-8043-117dd2761833.jpg)
![face1](https://user-images.githubusercontent.com/31125521/29702730-c79d3904-8972-11e7-8ccb-e8c467244ad8.jpg)

### Face Recognition with the OpenCV face module

Check out <a href="https://medium.com/@muehler.v/node-js-opencv-for-face-recognition-37fa7cb860e8"><b>Node.js + OpenCV for Face Recognition</b></a>.

![facerec](https://user-images.githubusercontent.com/31125521/35453007-eac9d516-02c8-11e8-9c4d-a77c01ae1f77.jpg)

### Face Landmarks with the OpenCV face module

![facelandmarks](https://user-images.githubusercontent.com/31125521/39297394-af14ae26-4943-11e8-845a-a06cbfa28d5a.jpg)

### Face Recognition with <a href="https://github.com/justadudewhohacks/face-recognition.js"><b>face-recognition.js</b></a>

Check out <a href="https://medium.com/@muehler.v/node-js-face-recognition-js-simple-and-robust-face-recognition-using-deep-learning-ea5ba8e852"><b>Node.js + face-recognition.js : Simple and Robust Face Recognition using Deep Learning</b></a>.

[![IMAGE ALT TEXT](https://user-images.githubusercontent.com/31125521/35453884-055f3bde-02cc-11e8-8fa6-945f320652c3.jpg)](https://www.youtube.com/watch?v=ArcFHpX-usQ "Nodejs Face Recognition using face-recognition.js and opencv4nodejs")

### Hand Gesture Recognition
Check out <a href="https://medium.com/@muehler.v/simple-hand-gesture-recognition-using-opencv-and-javascript-eb3d6ced28a0"><b>Simple Hand Gesture Recognition using OpenCV and JavaScript</b></a>.

![gesture-rec_sm](https://user-images.githubusercontent.com/31125521/30052864-41bd5680-9227-11e7-8a62-6205f3d99d5c.gif)

### Object Recognition with Deep Neural Networks
Check out <a href="https://medium.com/@muehler.v/node-js-meets-opencvs-deep-neural-networks-fun-with-tensorflow-and-caffe-ff8d52a0f072"><b>Node.js meets OpenCV’s Deep Neural Networks — Fun with Tensorflow and Caffe</b></a>.

#### Tensorflow Inception

![husky](https://user-images.githubusercontent.com/31125521/32703295-f6b0e7ee-c7f3-11e7-8039-b3ada21810a0.jpg)
![car](https://user-images.githubusercontent.com/31125521/32703296-f6cea892-c7f3-11e7-8aaa-9fe48b88fe05.jpeg)
![banana](https://user-images.githubusercontent.com/31125521/32703297-f6e932ca-c7f3-11e7-9a66-bbc826ebf007.jpg)


#### Single Shot Multibox Detector with COCO

![dishes-detection](https://user-images.githubusercontent.com/31125521/32703228-eae787d4-c7f2-11e7-8323-ea0265deccb3.jpg)
![car-detection](https://user-images.githubusercontent.com/31125521/32703229-eb081e36-c7f2-11e7-8b26-4d253b4702b4.jpg)

### Machine Learning
Check out <a href="https://medium.com/@muehler.v/machine-learning-with-opencv-and-javascript-part-1-recognizing-handwritten-letters-using-hog-and-88719b70efaa"><b>Machine Learning with OpenCV and JavaScript: Recognizing Handwritten Letters using HOG and SVM</b></a>.

![resulttable](https://user-images.githubusercontent.com/31125521/30635645-5a466ea8-9df3-11e7-8498-527e1293c4fa.png)

### Object Tracking

![trackbgsubtract](https://user-images.githubusercontent.com/31125521/29702733-c7b59864-8972-11e7-996b-d28cb508f3b8.gif)
![trackbycolor](https://user-images.githubusercontent.com/31125521/29702735-c8057686-8972-11e7-9c8d-13e30ab74628.gif)

### Feature Matching

![matchsift](https://user-images.githubusercontent.com/31125521/29702731-c79e3142-8972-11e7-947e-db109d415469.jpg)

### Image Histogram

![plotbgr](https://user-images.githubusercontent.com/31125521/29995016-1b847970-8fdf-11e7-9316-4eb0fd550adc.jpg)
![plotgray](https://user-images.githubusercontent.com/31125521/29995015-1b83e06e-8fdf-11e7-8fa8-5d18326b9cd3.jpg)

<a name="how-to-install"></a>

# How to install

``` bash
npm install --save opencv4nodejs
```

Native node modules are built via node-gyp, which already comes with npm by default. However, node-gyp requires you to have python installed. If you are running into node-gyp specific issues have a look at known issues with [node-gyp](https://github.com/nodejs/node-gyp) first.

**Important note:** node-gyp won't handle whitespaces properly, thus make sure, that the path to your project directory does **not contain any whitespaces**. Installing opencv4nodejs under "C:\Program Files\some_dir" or similar will not work and will fail with: "fatal error C1083: Cannot open include file: 'opencv2/core.hpp'"!**

On Windows you will furthermore need Windows Build Tools to compile OpenCV and opencv4nodejs. If you don't have Visual Studio or Windows Build Tools installed, you can easily install the VS2015 build tools:

``` bash
npm install --global windows-build-tools
```

## Installing OpenCV Manually

Setting up OpenCV on your own will require you to set an environment variable to prevent the auto build script to run:

``` bash
# linux and osx:
export OPENCV4NODEJS_DISABLE_AUTOBUILD=1
# on windows:
set OPENCV4NODEJS_DISABLE_AUTOBUILD=1
```

### Windows

You can install any of the OpenCV 3 or OpenCV 4 <a href="https://github.com/opencv/opencv/releases/"><b>releases</b></a> manually or via the [Chocolatey](https://chocolatey.org/) package manager:

``` bash
# to install OpenCV 4.1.0
choco install OpenCV -y -version 4.1.0
```

Note, this will come without contrib modules. To install OpenCV under windows with contrib modules you have to build the library from source or you can use the auto build script.

Before installing opencv4nodejs with an own installation of OpenCV you need to expose the following environment variables:
- *OPENCV_INCLUDE_DIR* pointing to the directory with the subfolder *opencv2* containing the header files
- *OPENCV_LIB_DIR* pointing to the lib directory containing the OpenCV .lib files

Also you will need to add the OpenCV binaries to your system path:
- add an environment variable *OPENCV_BIN_DIR* pointing to the binary directory containing the OpenCV .dll files
- append `;%OPENCV_BIN_DIR%;` to your system path variable

Note: Restart your current console session after making changes to your environment.

### MacOSX

Under OSX we can simply install OpenCV via brew:

``` bash
brew update
brew install opencv@4
brew link --force opencv@4
```

### Linux

Under Linux we have to build OpenCV from source manually or using the auto build script.

## Installing OpenCV via Auto Build Script

The auto build script comes in form of the [opencv-build](https://github.com/justadudewhohacks/npm-opencv-build) npm package, which will run by default when installing opencv4nodejs. The script requires you to have git and a recent version of cmake installed.

### Auto Build Flags

You can customize the autobuild flags using *OPENCV4NODEJS_AUTOBUILD_FLAGS=<flags>*.
Flags must be space-separated.

This is an advanced customization and you should have knowledge regarding the OpenCV compilation flags. Flags added by default are listed [here](https://github.com/justadudewhohacks/npm-opencv-build/blob/master/src/constants.ts#L44-L82).

### Installing a Specific Version of OpenCV

You can specify the Version of OpenCV you want to install via the script by setting an environment variable:
`export OPENCV4NODEJS_AUTOBUILD_OPENCV_VERSION=4.1.0`

### Installing only a Subset of OpenCV modules

If you only want to build a subset of the OpenCV modules you can pass the *-DBUILD_LIST* cmake flag via the *OPENCV4NODEJS_AUTOBUILD_FLAGS* environment variable. For example `export OPENCV4NODEJS_AUTOBUILD_FLAGS=-DBUILD_LIST=dnn` will build only modules required for `dnn` and reduces the size and compilation time of the OpenCV package.

## Configuring Environments via package.json

It's possible to specify build environment variables by inserting them into the `package.json` as follows:

```json
{
  "name": "my-project",
  "version": "0.0.0",
  "dependencies": {
    "opencv4nodejs": "^X.X.X"
  },
  "opencv4nodejs": {
    "disableAutoBuild": 1,
    "opencvIncludeDir": "C:\\tools\\opencv\\build\\include",
    "opencvLibDir": "C:\\tools\\opencv\\build\\x64\\vc14\\lib",
    "opencvBinDir": "C:\\tools\\opencv\\build\\x64\\vc14\\bin"
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

## Disabeling installation of prebuilt OpenCV

By default opencv4nodejs-prebuilt will install a prebuilt version of OpenCV for the current platform via @nut-tree/opencv-build-(win32/linux/darwin).
If you want to disable this behaviour (to e.g. provide your own OpenCV build), set the following environment variable:

``` bash
# linux and osx:
export OPENCV4NODEJS_PREBUILT_SKIP_DEPENDENCIES=1
# on windows:
set OPENCV4NODEJS_PREBUILT_SKIP_DEPENDENCIES=1
```