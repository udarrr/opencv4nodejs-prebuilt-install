import * as path from "path";
const log = require("npmlog");
import { execFile } from "./utils";
const fg = require("fast-glob");

export async function findMsBuild() {
  const progFiles = new Set([process.env.programfiles, process.env.ProgramW6432, process.env["programfiles(x86)"]]);
  const matches: string[] = [];

  for (const progFile of progFiles) {
    if (progFile) {
      const reg = `${progFile.replace(/\\/g, "/")}/Microsoft Visual Studio/*/*/MSBuild/*/Bin/MSBuild.exe`;

      for (const m of await fg([reg], {})) {
        matches.push(path.resolve(m));
      }
    }
  }
  matches.sort();

  if (!matches.length) {
    return Promise.reject("no Microsoft Visual Studio found in program files directorys");
  }
  if (matches.length > 1) {
    log.warn("find-msbuild", `find ${JSON.stringify(matches)}`);
  }
  const pbuilds = matches.map(async (selected: string) => {
    log.silly("find-msbuild", matches.join(", "));
    // const selected = matches[matches.length - 1];
    const txt = await execFile(selected, ["/version"]);
    const m = txt.match(/(\d+)\.\d+/);
    if (!m) {
      log.warn("find-msbuild", `${selected} is not a valid msbuild path, can not find it's versdion`);

      return {
        path: selected,
        version: "",
      };
    }
    //   return Promise.reject('fail to get MSBuild.exe version number');
    log.info("find-msbuild", `discover msbuild v${m[1]} in ${selected}`);

    return {
      path: selected,
      version: m[1] as string,
    };
  });
  const builds = await Promise.all(pbuilds);

  return builds.filter((a) => a.version).reverse()[0];
}
