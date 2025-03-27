import { execSync } from "child_process";

export function gitPushWithRetry(dirPath = process.cwd(), retries = 1) {
  let success = false;

  while (retries > 0 && !success) {
    try {
      console.log(`执行git push (剩余重试次数: ${retries})`);
      execSync("git push", { cwd: dirPath, stdio: "inherit" });
      success = true;
      console.log("\x1b[32m%s\x1b[0m", "✅ 操作完成");
    } catch (error) {
      retries--;
      console.log("\x1b[31m%s\x1b[0m", `推送失败，${retries}次重试机会`);
      if (retries === 0) {
        console.error("\x1b[31m%s\x1b[0m", "git push重试次数用尽");
        process.exit(1);
      }
    }
  }
}
