import { spawn } from "child_process";
import pc from "picocolors";
import { updateVersion } from "./version.js";
// 登录账号 npm login --registry https://registry.npmjs.org
// npm publish --registry=https://registry.npmjs.org
main();
async function main() {
  try {
    const user = await spawn_Promise(
      "npm",
      ["whoami", "--registry", "https://registry.npmjs.org"],
      process.cwd()
    );
    console.log(pc.cyan(`✔ 当前登录用户: ${user.trim()}`));
  } catch (err) {
    console.log(pc.red("✖ 未检测到npm登录状态"));
    console.log(
      pc.yellow("请先执行：npm login --registry=https://registry.npmjs.org")
    );
    return;
  }
  const confirm = await updateVersion();
  if (!confirm) {
    return;
  }
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
          reject(stderr || "Command failed without error message");
        }
      }
    });
    // spawnObj.on("exit", (code) => {});
  });
}

// npm unpublish gitcheck-cli@0.0.9-beta.1
