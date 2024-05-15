import pc from "picocolors";
import path from "path";
import { glob } from "glob";
import { simpleGit } from "simple-git";

export async function gitcheck(cwd) {
  cwd = cwd || process.cwd();

  const isGitDir = await glob("**/.git/", {
    cwd,
    ignore: "node_modules/**",
  });
  if (isGitDir.length == 0) {
    console.log(pc.yellow(cwd + "下，未发现git项目目录"));
    return;
  }

  const promises = isGitDir.map(async (p) => {
    const dirPath = path.resolve(cwd, p, "..");

    const res = await gitStatus(dirPath);
    return res;
  });
  Promise.all(promises).then((res) => {
    const unsafeDir = res.filter((r) => r.unsafeDir).map((r) => r.gitDir);
    const notCommit = res.filter((r) => r.notCommit).map((r) => r.gitDir);

    if (unsafeDir.length > 0) {
      console.log(pc.bgBlue(`不安全仓库（${unsafeDir.length}）: `));
      unsafeDir.map((m) => console.log(pc.red(m)));
    }
    if (notCommit.length == 0) {
      const ahead = res.filter((r) => r.ahead).map((r) => r.gitDir);
      if (ahead.length > 0) {
        console.log(pc.bgBlue(`已提交，但未推送（${ahead.length}）：`));
        ahead.map((m) => console.log(pc.yellow(m),));
      } else {
        console.log(pc.green("已全部提交且推送"));
      }
    } else {
      console.log(pc.bgBlue(`未提交的项目文件夹（${notCommit.length}）: `));
      notCommit.map((m) => console.log(pc.yellow(m)));
    }
  });
}
export async function gitStatus(dirPath) {
  const git = simpleGit(dirPath, { binary: "git" });

  const res = await git
    .status()
    .then((res) => {
      // not_added + modified = files
      return {
        ahead: res.ahead,
        gitDir: dirPath,
        unsafeDir: false,
        finish: res.files.length == 0,
        notCommit: res.files.length > 0,
      };
    })
    .catch((err) => {
      return {
        gitDir: dirPath,
        unsafeDir: err.message.includes("config --global --add safe.directory"),
      };
    });

  return res;
}
async function gitStatusRaw(dirPath) {
  const res = await simpleGit(dirPath)
    .raw("status")
    .catch((err) => {
      return err.message;
    });

  return {
    result: res,
    gitDir: dirPath,
    unsafeDir: res.includes("config --global --add safe.directory"),
    finish: res.includes("nothing to commit"),
    notCommit: res.includes("git add <file>"),
  };
}

const spawn_Promise = (command, params, cwd) => {
  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    var spawnObj = spawn(command, params, {
      encoding: "utf-8",
      cwd: cwd,
    });
    spawnObj.stdout.on("data", function (data) {
      // console.log("stdout: ", data.toString());
      stdout += data.toString();
    });
    spawnObj.stderr.on("data", function (err) {
      // console.log("stderr: ", err.toString());
      stderr += err.toString();
    });
    // spawnObj.on("close", function (code) {
    // console.log("close code : " + code);
    // });
    spawnObj.on("exit", (code) => {
      // console.log("exit code : " + code);
      resolve();
    });
  });
};
