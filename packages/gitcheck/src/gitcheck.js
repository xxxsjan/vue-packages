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
    spinner.succeed(pc.green(`分析完成! 未发现git项目(${pc.italic(cwd)})`));
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

      const stagedList = res.filter((r) => r.staged).map((r) => r.gitDir);

      const not_addedList = res
        .filter((r) => r.not_added && !r.staged)
        .map((r) => r.gitDir);
      const aheadList = res.filter((r) => r.ahead).map((r) => r.gitDir);

      spinner.succeed(
        pc.green(`${pc.bold("目录分析完成")} (${pc.italic(cwd)})`)
      );

      if (unsafeDir.length > 0) {
        console.log(
          pc.bgBlue(`🚀 insecure directory（${unsafeDir.length}）: `)
        );
        unsafeDir.map((m) => console.log(pc.italic(pc.red(m))));
      }
      if (not_addedList.length > 0) {
        logTitle(undefined, undefined, undefined, not_addedList.length);

        not_addedList.map((m) => console.log(pc.italic(pc.yellow(m))));
      }

      if (stagedList.length > 0) {
        logTitle("add", undefined, undefined, stagedList.length);

        stagedList.map((m) => console.log(pc.italic(pc.yellow(m))));
      }

      if (aheadList.length > 0) {
        logTitle("add", "commit", undefined, aheadList.length);
        aheadList.map((m) => console.log(pc.italic(pc.yellow(m))));
      }

      if (
        unsafeDir.length === 0 &&
        not_addedList.length === 0 &&
        stagedList.length === 0 &&
        aheadList.length === 0
      ) {
        console.log(pc.green("✅ 已全部提交且推送"));
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
      // if (res.staged.length) {
      //   console.log(dirPath, res);
      // }
      return {
        ahead: res.ahead,
        gitDir: dirPath,
        unsafeDir: false,

        staged: res.staged.length > 0,
        not_added: res.not_added.length > 0,
        modified: res.modified.length > 0,
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
    isNotCommit: res.includes("git add <file>"),
  };
}

function logTitle(add, commit, push, count = 0) {
  const status = (key) => (key ? "✅" : "❌");
  console.log(
    pc.bgBlue(
      `🚀 add${status(add)} commit${status(commit)} push${status(
        push
      )}（${count}）: `
    )
  );
}
