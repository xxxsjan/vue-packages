import pc from "picocolors";
import path from "path";
import { glob } from "glob";
import { simpleGit } from "simple-git";
import ora from "ora";

export async function gitcheck(cwd) {
  cwd = cwd || process.cwd();

  const spinner = ora("分析目录中").start();

  const isGitDir = await glob("**/.git/", {
    cwd,
    ignore: "node_modules/**",
  });
  if (isGitDir.length == 0) {
    spinner.succeed(pc.green("分析完成! " + cwd + "下，未发现git项目"));
    return;
  }

  const promises = isGitDir.map(async (p) => {
    const dirPath = path.resolve(cwd, p, "..");

    const res = await gitStatus(dirPath);
    return res;
  });
  Promise.all(promises)
    .then((res) => {
      const unsafeDir = res.filter((r) => r.unsafeDir).map((r) => r.gitDir);
      const notCommit = res.filter((r) => r.notCommit).map((r) => r.gitDir);
      const staged = res.filter((r) => r.staged).map((r) => r.gitDir);

      spinner.succeed(pc.green("分析完成"));

      if (unsafeDir.length > 0) {
        console.log(pc.bgBlue(`不安全仓库（${unsafeDir.length}）: `));
        unsafeDir.map((m) => console.log(pc.red(m)));
      }

      if (staged.length > 0) {
        console.log(pc.bgBlue(`已暂存，但未推送（${staged.length}）：`));
        staged.map((m) => console.log(pc.yellow(m)));
      } else {
        if (notCommit.length > 0) {
          console.log(pc.bgBlue(`未提交的项目文件夹（${notCommit.length}）: `));
          notCommit.map((m) => console.log(pc.yellow(m)));
        } else {
          const ahead = res.filter((r) => r.ahead).map((r) => r.gitDir);
          if (ahead.length > 0) {
            ahead.map((m) => console.log(pc.yellow(m)));
          } else {
            console.log(pc.green("已全部提交且推送"));
          }
        }
      }
    })
    .catch((err) => {
      spinner.fail(pc.red("分析失败"));
      console.log(pc.red(err));
    });
}
export async function gitStatus(dirPath) {
  const git = simpleGit(dirPath, { binary: "git" });

  const res = await git
    .status()
    .then((res) => {
      console.log("res: ", dirPath, res);
      // not_added 修改未暂存
      // files 改动文件
      // staged 暂存文件
      return {
        ahead: res.ahead,
        gitDir: dirPath,
        unsafeDir: false,
        finish: res.files.length == 0,
        notCommit: res.files.length > 0,
        staged: res.staged.length > 0,
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
