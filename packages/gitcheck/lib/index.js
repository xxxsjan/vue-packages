#! /usr/bin/env node
import path from 'path';
import { glob } from 'glob';
import pc from 'picocolors';
import { simpleGit } from 'simple-git';
import cac from 'cac';

async function gitcheck(cwd) {
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
      unsafeDir.map((m) => console.log(pc.yellow(m)));
    }
    if (notCommit.length == 0) {
      console.log(pc.green("已全部提交"));
    } else {
      console.log(pc.bgBlue(`未提交的项目文件夹（${notCommit.length}）: `));
      notCommit.map((m) => console.log(pc.red(m)));
    }
  });
}
async function gitStatus(dirPath) {
  const git = simpleGit(dirPath, { binary: "git" });

  const res = await git
    .status()
    .then((res) => {
      // not_added + modified = files
      return {
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

var version = "0.0.3";

const cli = cac();

cli.help();

cli.version(version);

cli.option("-d ,--dir <dir>", "Parse folder", {
  default: ".",
});

cli
  .command("rm <dir>", "Remove a dir")
  .option("-r, --recursive", "Remove recursively")
  .action((dir, options) => {
    console.log("options: ", options);
    console.log("remove " + dir);
  });
cli.command("[...files]", "files").action((files, options) => {
  const dirPath = path.resolve(options.dir);
  gitcheck(dirPath);
});

cli.parse();

// console.log("parsed: ", parsed);
