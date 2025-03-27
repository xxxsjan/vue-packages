import { gitcheck } from "./gitcheck";
import { version } from "../package.json";
import cac from "cac";
import path from "path";
import { gitPushWithRetry } from "./gitretry";

const cli = cac();

cli.help();

cli.version(version);

cli
  .command("push [dir]", "git push with retry")
  .option("-d, --dir <dir>", "Execute git push with retry", {
    default: ".",
  })
  .option("-r, --retry <number>", "Retry attempts count", {
    default: 10, // 默认重试次数
  })
  .action((dir, options) => {
    const targetDir = dir || options.dir;
    const dirPath = path.resolve(targetDir);
    gitPushWithRetry(dirPath, options.retry);
  });

cli
  .command("check [dir]", "Check git repo")
  .option("-d ,--dir <dir>", "Parse folder", {
    default: ".",
  })
  .action((dir, options) => {
    const targetDir = dir || options.dir;
    const dirPath = path.resolve(targetDir);
    gitcheck(dirPath);
  });

cli.command("[...files]", "files").action((files, options) => {
  gitcheck(process.cwd());
});

const parsed = cli.parse();
