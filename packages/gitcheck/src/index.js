import gitcheck from "./gitcheck";
import { version } from "../package.json";
import cac from "cac";

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

cli.command("hello", "Say hello").action(() => {
  console.log("hello");
});

cli.command("*", "Default command").action((input, options) => {
  console.log("This is the default command");
});

const parsed = cli.parse();

if (parsed.args.length == 0) {
  console.log("default: ", parsed);
  gitcheck();
}
