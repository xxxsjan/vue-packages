import { updateVersion } from "./version.js";
import { spawn } from "child_process";
import pc from "picocolors";

main();
async function main() {
  // updateVersion()
  await spawn_Promise(
    "npm",
    ["publish", "--registry", "https://registry.npmjs.org"],
    process.cwd()
  );
}

function spawn_Promise(command, params, cwd) {
  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    var spawnObj = spawn(command, params, {
      encoding: "utf-8",
      cwd: cwd,
    });
    spawnObj.stdout.on("data", function (data) {
      stdout += data.toString();
      console.log(pc.green(stdout));
    });
    spawnObj.stderr.on("data", function (err) {
      stderr += err.toString();
      console.log(pc.red(stderr));
    });
    spawnObj.on("close", function (code) {});
    spawnObj.on("exit", (code) => {
      resolve(code);
    });
  });
}
