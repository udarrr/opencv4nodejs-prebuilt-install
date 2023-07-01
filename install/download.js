"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pack_1 = require("../build_release_opencv/pack");
const Downloader = require("nodejs-file-downloader");
const packageJson = require("../package.json");
const path = require("path");
const file = `opencv_${process.platform}_${packageJson.opencv4nodejs.autoBuildOpencvVersion}_${process.arch}.tgz`;
console.log(file);

async function download() {
  let libUrl = `https://github.com/udarrr/opencv4nodejs-prebuilt-install/releases/download/v${packageJson.version}/${file}`;

  try {
    if (process.platform === "darwin" && process.arch !== "arm64") {
      await new Downloader({
        url: libUrl,
        directory: path.join(process.cwd(), "osOpencvWorlds", "darwin"),
      }).download();

      await pack_1.Pack.unpack(`${path.join(process.cwd(), "osOpencvWorlds", "darwin")}`, `${path.join(process.cwd(), "osOpencvWorlds", "darwin", file)}`);
    } else if (process.platform === "darwin" && process.arch === "arm64") {
      await new Downloader({
        url: libUrl,
        directory: path.join(process.cwd(), "osOpencvWorlds", "darwinM1"),
      }).download();

      await pack_1.Pack.unpack(`${path.join(process.cwd(), "osOpencvWorlds", "darwinM1")}`, `${path.join(process.cwd(), "osOpencvWorlds", "darwinM1", file)}`);
    } else if (process.platform === "linux") {
      await new Downloader({
        url: libUrl,
        directory: path.join(process.cwd(), "osOpencvWorlds", "linux"),
      }).download();

      await pack_1.Pack.unpack(`${path.join(process.cwd(), "osOpencvWorlds", "linux")}`, `${path.join(process.cwd(), "osOpencvWorlds", "linux", file)}`);
    } else if (process.platform === "win32") {
      await new Downloader({
        url: libUrl,
        directory: path.join(process.cwd(), "osOpencvWorlds", "win32"),
      }).download();

      await pack_1.Pack.unpack(`${path.join(process.cwd(), "osOpencvWorlds", "win32")}`, `${path.join(process.cwd(), "osOpencvWorlds", "win32", file)}`);
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
