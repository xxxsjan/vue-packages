import { gitcheck } from "./gitcheck";
import { version } from "../package.json";
import cac from "cac";
import path from "path";

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
