import { spawn } from "child_process";
import pc from "picocolors";

main();
async function main() {
  await spawn_Promise("npm", ["run", "build"], process.cwd());
  console.log(pc.green("✔ 打包成功"));
  await spawn_Promise(
    "npm",
    ["publish", "--registry", "https://registry.npmjs.org"],
    process.cwd()
  )
    .then(() => {
      console.log(pc.green("✔ 发布成功"));
    })
    .catch((err) => {
      console.log(pc.red(err));
    });
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
    });
    spawnObj.stderr.on("data", function (err) {
      stderr += err.toString();
    });
    spawnObj.on("close", function (code) {
      if (stdout) {
        resolve(stdout);
      } else {
        if (stderr) {
          reject(stderr);
        }
      }
    });
    // spawnObj.on("exit", (code) => {});
  });
}
