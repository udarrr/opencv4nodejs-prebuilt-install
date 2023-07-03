"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pack_1 = require("../build_release_opencv/pack");
const Downloader = require("nodejs-file-downloader");
const packageJson = require("../package.json");
const path = require("path");
const { existsSync } = require("fs");
const file = `opencv_${process.platform}_${packageJson.opencv4nodejs.autoBuildOpencvVersion}_${process.arch}.tgz`;
console.log(file);

async function download() {
  let libUrl = `https://github.com/udarrr/opencv4nodejs-prebuilt-install/releases/download/v${packageJson.version}/${file}`;

  try {
    if (process.platform === "darwin" && process.arch !== "arm64") {
      const pathToLib = `${path.join(process.cwd(), "osOpencvWorlds", "darwin", file)}`;
      const pathToDir = path.join(process.cwd(), "osOpencvWorlds", "darwin");

      await downloadIfExist(pathToDir, pathToLib, libUrl);
      await pack_1.Pack.unpack(pathToDir, pathToLib);
    } else if (process.platform === "darwin" && process.arch === "arm64") {
      const pathToLib = `${path.join(process.cwd(), "osOpencvWorlds", "darwinM1", file)}`;
      const pathToDir = `${path.join(process.cwd(), "osOpencvWorlds", "darwinM1")}`;

      await downloadIfExist(pathToDir, pathToLib, libUrl);
      await pack_1.Pack.unpack(pathToDir, pathToLib);
    } else if (process.platform === "linux") {
      const pathToLib = `${path.join(process.cwd(), "osOpencvWorlds", "linux", file)}`;
      const pathToDir = `${path.join(process.cwd(), "osOpencvWorlds", "linux")}`;

      await downloadIfExist(pathToDir, pathToLib);
      await pack_1.Pack.unpack(pathToDir, pathToLib, libUrl);
    } else if (process.platform === "win32") {
      const pathToLib = `${path.join(process.cwd(), "osOpencvWorlds", "win32", file)}`;
      const pathToDir = `${path.join(process.cwd(), "osOpencvWorlds", "win32")}`;

      await downloadIfExist(pathToDir, pathToLib, libUrl);
      await pack_1.Pack.unpack(pathToDir, pathToLib);
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

async function downloadIfExist(pathToDir, pathToLib, libUrl) {
  if (!existsSync(pathToLib)) {
    await new Downloader({
      url: libUrl,
      directory: pathToDir,
    }).download();
  }
}

download();
