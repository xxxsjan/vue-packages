#! /usr/bin/env node
import o from"picocolors";import e from"path";import{glob as i}from"glob";import{simpleGit as n}from"simple-git";import t from"cac";async function r(t){t=t||process.cwd();const r=await i("**/.git/",{cwd:t,ignore:"node_modules/**"});if(0==r.length)return void console.log(o.yellow(t+"下，未发现git项目目录"));const l=r.map((async o=>{const i=e.resolve(t,o,".."),r=await async function(o){const e=n(o,{binary:"git"}),i=await e.status().then((e=>({gitDir:o,unsafeDir:!1,finish:0==e.files.length,notCommit:e.files.length>0}))).catch((e=>({gitDir:o,unsafeDir:e.message.includes("config --global --add safe.directory")})));return i}(i);return r}));Promise.all(l).then((e=>{const i=e.filter((o=>o.unsafeDir)).map((o=>o.gitDir)),n=e.filter((o=>o.notCommit)).map((o=>o.gitDir));i.length>0&&(console.log(o.bgBlue(`不安全仓库（${i.length}）: `)),i.map((e=>console.log(o.yellow(e))))),0==n.length?console.log(o.green("已全部提交")):(console.log(o.bgBlue(`未提交的项目文件夹（${n.length}）: `)),n.map((e=>console.log(o.red(e)))))}))}const l=t();l.help(),l.version("0.0.5"),l.option("-d ,--dir <dir>","Parse folder",{default:"."}),l.command("rm <dir>","Remove a dir").option("-r, --recursive","Remove recursively").action(((o,e)=>{console.log("options: ",e),console.log("remove "+o)})),l.command("[...files]","files").action(((o,i)=>{r(e.resolve(i.dir))})),l.parse();
