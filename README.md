# opencv4nodejs-prebuilt-install

![Tested](https://github.com/udarrr/opencv4nodejs-prebuilt-install/workflows/Tests/badge.svg)
![Released](https://github.com/udarrr/opencv4nodejs-prebuilt-install/workflows/Create%20tagged%20release/badge.svg)
![Supported node versions](https://img.shields.io/badge/node-12%2C%2013%2C%2014%2C%2015%2C%2016%2C%2017%2C%2018%2C%2019%2C%2020%2C%2021-green)
![Supported electron versions](https://img.shields.io/badge/electron-8%2C%209%2C%2010%2C%2011%2C%2012%2C%2013%2C%2014%2C%2015%2C%2016%2C%2017%2C%2018%2C%2019%2C%2022%2C%2023%2C%2024%2C%2025-green)

### Simple installation Opencv versions for node with pre-compiled bindings

Cross-platform!

#### Supports

- Windows, Linux , MacOS
- node 12,14,15,16,17,18,19,20,21
- electron 8,9,10,11,12,13,14,15,16,17,18,19,22,23,24,25
- currently arh x64 (possible M1, arm64 and others if were available hosts with the type of processes)

## How to install

``` bash
npm i opencv4nodejs-prebuilt-install
```

check supporting platforms and processes!

- prebuilt in node_modules/opencv4nodejs-prebuilt-install/build

## Quick Start with prebuild

``` javascript
const cv = require('opencv4nodejs-prebuilt-install');
```

## With TypeScript

``` javascript
import * as cv from 'opencv4nodejs-prebuilt-install'
```

## Local compiling

Set your own properties inside of package.json for opencv4nodejs up to 4.6.0 depends on necessary versions and flags

```nodejs
  "opencv4nodejs": {
    "autoBuildWithoutContrib": 1,
    "autoBuildOpencvVersion": "4.1.1",
    "autoBuildFlags": "-DBUILD_opencv_world=1 -DBUILD_LIST=core,highgui,videoio -DOPENCV_FORCE_3RDPARTY_BUILD=ON -DBUILD_PNG=ON -DBUILD_TIFF=ON -DBUILD_JASPER=ON -DBUILD_JPEG=ON -DBUILD_ZLIB=ON -DBUILD_OPENEXR=ON -DWITH_FFMPEG=OFF -DWITH_GSTREAMER=ON -DBUILD_USE_SYMLINKS=OFF -DWITH_VTK=OFF",
    "disableAutoBuild": 1
  },
```

- Then for building opencv for current processor

```nodejs
npm run create_opencvlib
```

Result in folder osOpencvWorlds/\*/\*.tar

- and then for building opencv for current node with have been prepared files for processor

```nodejs
npm run create_opencvnode_prebuild
```

Result in folder opencv/build/bin for windows or in opencv/build/lib for linux and darwin

## Add bindings to native methods of opencv

Create fork of the repo and add necessary changes then create poll request to the repo and i will recreate libs

For example i was able to add method invert recently

- added to core.cc

```typescript
Nan::SetMethod(target, "invert", Invert);
Nan::SetMethod(target, "invertAsync", InvertAsync);

NAN_METHOD(Core::Invert) {
 FF::syncBinding<CoreBindings::Invert>("Core", "Invert", info);
}

NAN_METHOD(Core::InvertAsync) {
 FF::asyncBinding<CoreBindings::Invert>("Core", "Invert", info);
}
```

- added to core.h

```typescript
 static NAN_METHOD(Invert);
 static NAN_METHOD(InvertAsync);
```

- added to coreBinding.h

```typescript
 class Invert : public CvClassMethodBinding<Mat> {
 public:
  void createBinding(std::shared_ptr<FF::Value<cv::Mat>> self) {
         auto flags = opt<FF::IntConverter>("flags", 0);
   auto dst = ret<Mat::Converter>("dst");

   executeBinding = [=]() {
    cv::invert(self->ref(), dst->ref(), flags->ref());
   };
  };
 };
```

- added to cv.d.ts

```typescript
export function invert(mat: Mat, flags?: number): Mat;
export function invertAsync(mat: Mat, flags?: number): Promise<Mat>;
```
