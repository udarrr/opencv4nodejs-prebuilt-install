"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pack_1 = require("../build_release_opencv/pack");
const Downloader = require("nodejs-file-downloader");
const packageJson = require("../package.json");
const path = require("path");
const file = `opencv_${process.platform}_${packageJson.opencv4nodejs.autoBuildOpencvVersion}_${process.arch}.tgz`;
async function download() {
  let libUrl;
  let dir;
  if (process.platform === "win32") {
    libUrl = `https://github.com/udarrr/opencv4nodejs-prebuilt-install/releases/download/v${
      packageJson.version
    }/opencv_win32_${packageJson.opencv4nodejs.autoBuildOpencvVersion}.tgz`;
    dir = path.join(process.cwd(), "osOpencvWorlds", "win32");
  }
  if (process.platform === "darwin") {
    libUrl = `https://github.com/udarrr/opencv4nodejs-prebuilt-install/releases/download/v${
      packageJson.version
    }/opencv_darwin_${packageJson.opencv4nodejs.autoBuildOpencvVersion}.tgz`;
    dir = path.join(process.cwd(), "osOpencvWorlds", "darwin");
  }
  if (process.platform === "linux") {
    libUrl = `https://github.com/udarrr/opencv4nodejs-prebuilt-install/releases/download/v${
      packageJson.version
    }/opencv_linux_${packageJson.opencv4nodejs.autoBuildOpencvVersion}.tgz`;
    dir = path.join(process.cwd(), "osOpencvWorlds", "linux");
  }
  const downloader = new Downloader({
    url: libUrl,
    directory: dir,
  });
  try {
    await downloader.download();
    if (process.platform === "darwin") {
      pack_1.Pack.unpack(`${path.join(process.cwd(), "osOpencvWorlds", "darwin")}`, `${path.join(process.cwd(), "osOpencvWorlds", "darwin", file)}`);
    } else if (process.platform === "linux") {
      pack_1.Pack.unpack(`${path.join(process.cwd(), "osOpencvWorlds", "linux")}`, `${path.join(process.cwd(), "osOpencvWorlds", "linux", file)}`);
    } else if (process.platform === "win32") {
      pack_1.Pack.unpack(`${path.join(process.cwd(), "osOpencvWorlds", "win32")}`, `${path.join(process.cwd(), "osOpencvWorlds", "win32", file)}`).then(() => console.log("done"));
    }
    await new Promise((res) =>
      setTimeout(() => {
        res("done");
      }, 5000)
    );
    console.log("Lib has been downloaded");
  } catch (error) {
    console.log("Download failed", error);
  }
}
download();
