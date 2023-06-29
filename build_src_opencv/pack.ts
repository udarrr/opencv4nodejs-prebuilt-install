const path = require("path");
import blob from "@u4/tiny-glob";
import tar from "tar";
const pump = require("pump");

export class Pack {
  static cb(err: any) {
    if (err) {
      console.log("install", err.message);
      return process.exit(1);
    }
    console.log("install", "Successfully installed prebuilt binary!");
    return;
  }
  static async getPaths(patterns: Array<string>) {
    const paths: Array<string> = [];

    for (let pattern of patterns) {
      for (const m of await blob(pattern, {})) {
        console.log(`Possible path is ${JSON.stringify(m)}`);
        paths.push(path.resolve(m));
      }
    }
    return paths;
  }

  static mode(octal: string) {
    return parseInt(octal, 8);
  }

  static async pack(filenames: Array<string>, tarPath: string) {
    const res = await tar.create(
      {
        gzip: { level: 9 },
        file: tarPath,
      },
      filenames
    );
    console.log(res);
  }

  static async unpack(folderPath: string, filePath: string) {
    const res = await tar.extract({ cwd: folderPath, file: filePath });
    console.log(res);
  }
}
