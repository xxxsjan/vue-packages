import { gitcheck } from "./gitcheck";
import { version } from "../package.json";
import cac from "cac";
import path from "path";
import { gitPushWithRetry } from "./gitretry";

const cli = cac();

cli.help();

cli.version(version);

cli.option("-d ,--dir <dir>", "Parse folder", {
  default: ".",
});

cli
  .command("gp <dir>", "Remove a dir")
  .option("-gp, --gitpush <dir>", "Execute git push with retry", {
    default: ".",
  })
  .option("-r, --retry <number>", "Retry attempts count", {
    default: 3, // 设置默认重试次数
  })
  .action((dir, options) => {
    const dirPath = path.resolve(dir);
    gitPushWithRetry(dirPath, options.retry);
  });

cli.command("[...files]", "files").action((files, options) => {
  const dirPath = path.resolve(options.dir);
  gitcheck(dirPath);
});

const parsed = cli.parse();
