import { Command } from "commander";
import pkg from "../package.json";
import tools from "./modules/index";

const { getIP, folderPrint, getSystemInfo, getTimeNode, npkill, getHttpHeader } =
  tools;
const { version, name } = pkg;

const program = new Command(name);

// node .\lib\index.js -v
program
  .alias("doo")
  .description("A cli tool")
  .version(version, "-v, --version, -V");

program.command("npkill").description("remove node_modules dir").action(npkill);

// doo ip
program
  .command("ip")
  .description("Get the local external network i p address")
  .option("-i,--intranet,--in", "Get ip for intranet")
  .option("-o,--extranet,--out", "Get ip for extranet")
  .action(getIP);
  
//  doo system
program
  .command("system")
  .alias("sys")
  .description("Get system information ")
  .option("-v, --visual", "Rendering in a visual way")
  .action(getSystemInfo);
// doo time
program
  .command("time")
  .description("Get system information ")
  .action(getTimeNode);

program
  .command("folder-print")
  .alias("fp")
  .option(
    "-d, --depth <type>",
    "Set the depth of the folder to be traversed",
    "10"
  )
  .option("-p, --print", "Generate a markdown file")
  .description("Print directory structure")
  .action(folderPrint);

program
  .command("http")
  .description("Get http header")
  .option("-u,--url <char>", "http url", "https://api.ipify.org")
  .option("-h,--header", "show header")
  .action(getHttpHeader);
  
program.parse();
