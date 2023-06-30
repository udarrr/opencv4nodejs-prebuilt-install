import * as fs from "fs";
import * as path from "path";

import { opencvModules } from "./constants";
import { dirs } from "./dirs";
import { applyEnvsFromPackageJson, autoBuildFlags, isAutoBuildDisabled, isWithoutContrib, opencvVersion, readAutoBuildFile } from "./env";
import { getLibsFactory } from "./getLibsFactory";
import { setupOpencv } from "./setupOpencv";
import { AutoBuildFile } from "./types";
import { isOSX, isWin, requireCmake, requireGit } from "./utils";
import { Pack } from "./pack";
const packageJSON = require("../package.json");

const log = require("npmlog");

const getLibs = getLibsFactory({ isWin, isOSX, opencvModules, path, fs });

class InstallOpencv {
  static checkInstalledLibs(autoBuildFile: AutoBuildFile) {
    let hasLibs = true;

    log.info("install", "checking for opencv libraries");

    if (!fs.existsSync(dirs.opencvLibDir)) {
      log.info("install", "library dir does not exist:", dirs.opencvLibDir);
      return;
    }
    const installedLibs = getLibs(dirs.opencvLibDir);

    autoBuildFile.modules.forEach(({ opencvModule, libPath }) => {
      if (!libPath) {
        log.info("install", "%s: %s", opencvModule, "ignored");
        return;
      }
      const foundLib = installedLibs.find((lib) => lib.opencvModule === opencvModule);
      hasLibs = hasLibs && !!foundLib;
      log.info("install", "%s: %s", opencvModule, foundLib ? foundLib.libPath : "not found");
    });

    return hasLibs;
  }

  static async install() {
    // if project directory has a package.json containing opencv4nodejs variables
    // apply these variables to the process environment
    applyEnvsFromPackageJson();

    if (isAutoBuildDisabled()) {
      log.info("install", "OPENCV4NODEJS_DISABLE_AUTOBUILD is set");
      log.info("install", "skipping auto build...");
      return;
    }
    log.info("install", "if you want to use an own OpenCV installation set OPENCV4NODEJS_DISABLE_AUTOBUILD");

    // prevent rebuild on every install
    const autoBuildFile = readAutoBuildFile();
    if (autoBuildFile) {
      log.info("install", `found auto-build.json: ${dirs.autoBuildFile}`);

      if (autoBuildFile.opencvVersion !== opencvVersion()) {
        log.info("install", `auto build opencv version is ${autoBuildFile.opencvVersion}, but OPENCV4NODEJS_AUTOBUILD_OPENCV_VERSION=${opencvVersion()}`);
      } else if (autoBuildFile.autoBuildFlags !== autoBuildFlags()) {
        log.info("install", `auto build flags are ${autoBuildFile.autoBuildFlags}, but OPENCV4NODEJS_AUTOBUILD_FLAGS=${autoBuildFlags()}`);
      } else {
        const hasLibs = InstallOpencv.checkInstalledLibs(autoBuildFile);
        if (hasLibs) {
          log.info("install", "found all libraries");
          return;
        } else {
          log.info("install", "missing some libraries");
        }
      }
    } else {
      log.info("install", `failed to find auto-build.json: ${dirs.autoBuildFile}`);
    }

    log.info("install", "");
    log.info("install", "running install script...");
    log.info("install", "");
    log.info("install", "opencv version: %s", opencvVersion());
    log.info("install", "with opencv contrib: %s", isWithoutContrib() ? "no" : "yes");
    log.info("install", "custom build flags: %s", autoBuildFlags());
    log.info("install", "");

    try {
      await requireGit();
      await requireCmake();
      await setupOpencv();
    } catch (err) {
      log.error(err);
      process.exit(1);
    }
  }

  static async start() {
    const filename = path.join(process.cwd(), "package.json");
    const packageJson = require(filename);
    const file = `opencv_${process.platform}_${packageJson.opencv4nodejs.autoBuildOpencvVersion}.tgz`;

    delete packageJson.opencv4nodejs.disableAutoBuild;

    try {
      fs.writeFileSync(filename, JSON.stringify(packageJson, null, 2));
    } catch (err) {
      console.log(err);
      process.exit(-1);
    }

    await InstallOpencv.install();
    packageJson.opencv4nodejs.disableAutoBuild = 1;

    try {
      if (process.platform === "darwin") {
        let patterns: Array<string> = [
          path.join("opencv", "build", "include"),
          path.join("opencv", "build", "lib", `libopencv_world.${packageJSON.autoBuildOpencvVersion}.dylib`),
          path.join("opencv", "build", "bin"),
        ];

        await Pack.pack(patterns, `${path.join(process.cwd(), "osOpencvWorlds", "darwin", file)}`);
      } else if (process.platform === "linux") {
        let patterns: Array<string> = [
          path.join("opencv", "build", "include"),
          path.join(`opencv", "build", "lib", "libopencv_world.so.${packageJSON.autoBuildOpencvVersion}`),
          path.join("opencv", "build", "bin"),
        ];

        await Pack.pack(patterns, `${path.join(process.cwd(), "osOpencvWorlds", "linux", file)}`);
      } else if (process.platform === "win32") {
        let patterns: Array<string> = [path.join("opencv", "build", "include"), path.join("opencv", "build", "lib"), path.join("opencv", "build", "bin")];

        await Pack.pack(patterns, `${path.join(process.cwd(), "osOpencvWorlds", "win32", file)}`);
      }
      fs.writeFileSync(filename, JSON.stringify(packageJson, null, 2));
    } catch (err) {
      console.log(err);
      process.exit(-1);
    }
  }
}
InstallOpencv.start();
