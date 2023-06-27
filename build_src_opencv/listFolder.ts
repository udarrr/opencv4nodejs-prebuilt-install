import { existsSync, lstatSync, readdirSync, realpathSync } from "fs";
import { join, resolve } from "path";

export const listFolder = (libDir: string, fileEnding: string) => {
  if (!existsSync(libDir)) {
    throw new Error(`specified lib dir does not exist: ${libDir}`);
  }
  const fileMatch = new RegExp(`.*\.${fileEnding}$`);
  const files = readdirSync(libDir) as string[];
  return files
    .filter(file => file.match(fileMatch))
    .filter(file => lstatSync(join(libDir, file)).isFile())
    .map(file => realpathSync(resolve(libDir, file)));
};
