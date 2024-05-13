#! /usr/bin/env node
import path from 'path';
import { glob } from 'glob';
import { spawn } from 'child_process';
import pc from 'picocolors';
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
    const res = await spawn_Promise(`git`, [`status`], dirPath);
    return res;
  });
  Promise.all(promises).then((res) => {
    const unsafeDir = res.filter((r) => r.unsafeDir).map((r) => r.gitDir);
    // const finish = res.filter((r) => r.finish).map((r) => r.gitDir);
    const notCommit = res.filter((r) => r.notCommit).map((r) => r.gitDir);
    if (unsafeDir.length > 0) {
      console.log(pc.blue(`不安全仓库（${unsafeDir.length}）: `));
      unsafeDir.map((m) => console.log(pc.yellow(m)));
    }
    if (notCommit.length == 0) {
      console.log(pc.green("已全部提交"));
    } else {
      console.log(pc.cyan(`未提交的项目文件夹（${notCommit.length}）: `));
      notCommit.map((m) => console.log(pc.red(m)));
    }
  });
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
      resolve({
        stdout,
        stderr,
        gitDir: cwd,
        unsafeDir: stderr.includes("config --global --add safe.directory"),
        finish: stdout.includes("nothing to commit"),
        notCommit: stdout.includes("git add <file>"),
      });
    });
  });
};

var version = "0.0.1";

const cli = cac();

cli.help();

cli.version(version);

// 默认option配置
cli.option("--type <type>", "类型", {
  default: "node",
});

cli
  .command("rm <dir>", "Remove a dir")
  .option("-r, --recursive", "Remove recursively")
  .action((dir, options) => {
    console.log("options: ", options);
    console.log("remove " + dir);
  });

// cli
//   .command("dir <dir>", "解析目录")
//   .option("-d, --dir", "解析目录")
//   .action((dir, options) => {
//     console.log("dir: ", dir);
//     const dirPath = path.resolve(dir);
//     console.log("dirPath: ", dirPath);
//     gitcheck(dirPath);
//   });
const parsed = cli.parse();

if (parsed.args.length == 0) {
  if (parsed.options.d) {
    const dirPath = path.resolve(parsed.options.d);
    gitcheck(dirPath);
  } else {
    gitcheck();
  }
}