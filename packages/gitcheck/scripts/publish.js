import { spawn } from "child_process";
import pc from "picocolors";

main();
async function main() {
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
    });
    spawnObj.stderr.on("data", function (err) {
      stderr += err.toString();
    });
    spawnObj.on("close", function (code) {
      if (stdout) {
        console.log(pc.green(stdout));
        console.log(pc.green("✔ 发布成功"));
      } else {
        if (stderr) {
          console.log(pc.red(stderr));
        }
      }
    });
    spawnObj.on("exit", (code) => {
      resolve(code);
    });
  });
}
