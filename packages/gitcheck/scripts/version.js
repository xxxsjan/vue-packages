import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { inc } from "semver";
import parseArgs from "minimist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = parseArgs(process.argv.slice(2));

updateVersion();

export function updateVersion() {
  const pkgData = fs.readFileSync(path.resolve(__dirname, "../package.json"));
  const pkgJson = JSON.parse(pkgData);
  const version = pkgJson.version;

  // "major" | "premajor" | "minor" | "preminor" | "patch" | "prepatch" | "prerelease";

  const nextVersion = argv.beta
    ? inc(version, "prerelease", "beta", "1")
    : inc(version, "patch");

  pkgJson.version = nextVersion;
  console.log("nextVersion: ", nextVersion);

  // fs.writeFileSync(
  //   path.resolve(__dirname, "../package.json"),
  //   JSON.stringify(pkgJson, null, 2)
  // );
}
