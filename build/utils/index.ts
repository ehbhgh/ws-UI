import { spawn } from "child_process";
import { projectPath, distPath } from "./paths";
import * as rimraf from "rimraf"; // 以对象形式导入 rimraf

export const withTaskName = <T>(name: string, fn: () => any) => {
  return Object.assign(fn, {
    displayName: name,
  });
};

// 在 node 中使用子进程来运行脚本
export const run = (command: string) => {
  const [cmd, ...args] = command.split(" ");
  return new Promise((resolve, reject) => {
    // 判断是否是 windows 系统
    if (process.platform === "win32" && cmd === "rm") {
      // 使用 rimraf 来删除文件或目录
      rimraf.sync(distPath(args[1])); // 使用 rimraf.sync 方法
      resolve("delete ok");
    }
    else {
      const app = spawn(cmd, args, {
        cwd: projectPath,
        stdio: "inherit", // 将这个子进程的输出共享给父进程
        shell: true, // 使用 shell 执行命令
      });

      app.on("close", resolve);
    }
  });
};
