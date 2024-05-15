import { gitcheck } from "./gitcheck";
import { version } from "../package.json";
import cac from "cac";
import path from "path";

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

const parsed = cli.parse();
