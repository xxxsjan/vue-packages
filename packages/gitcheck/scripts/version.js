import fs from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { inc } from "semver";
import parseArgs from "minimist";
import { exec } from "child_process";
import pc from "picocolors";
import prompts from "prompts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = parseArgs(process.argv.slice(2));

function getRemoteVersion() {
  return new Promise((resolve, reject) => {
    exec(`npm show gitcheck-cli version`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      const version = stdout.trim();
      resolve(version);
    });
  });
}

export async function updateVersion() {
  const pkgData = fs.readFileSync(path.resolve(__dirname, "../package.json"));
  const pkgJson = JSON.parse(pkgData);

  const remoteVersion = await getRemoteVersion();

  // "major" | "premajor" | "minor" | "preminor" | "patch" | "prepatch" | "prerelease";

  // const nextVersion = argv.beta
  //   ? inc(remoteVersion, "prerelease", "beta", "1")
  //   : inc(remoteVersion, "patch");
  const nextVersion = inc(remoteVersion, "prerelease", "beta", "1");

  pkgJson.version = nextVersion;

  console.log(pc.green(`Version updated to ${nextVersion}`));

  const response = await prompts({
    type: "confirm",
    name: "confirmation",
    message: `确认修改版本号：${remoteVersion}-->${nextVersion}`,
    // initial: true,
  });

  if (response.confirmation) {
    fs.writeFileSync(
      path.resolve(__dirname, "../package.json"),
      JSON.stringify(pkgJson, null, 2)
    );
    console.log(pc.green(`✔ Version updated to ${nextVersion}`));
  }
  return response.confirmation;
}
