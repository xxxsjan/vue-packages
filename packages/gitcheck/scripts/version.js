import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { inc } from "semver";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkgData = fs.readFileSync(path.resolve(__dirname, "../package.json"));
const pkgJson = JSON.parse(pkgData);
const version = pkgJson.version;

// "major" | "premajor" | "minor" | "preminor" | "patch" | "prepatch" | "prerelease";

const nextVersion = inc(version, "patch");

pkgJson.version = nextVersion;

fs.writeFileSync(
  path.resolve(__dirname, "../package.json"),
  JSON.stringify(pkgJson, null, 2)
);
