# gitcheck-cli

🔍 扫描指定目录下的Git仓库提交状态并执行自动化操作

## 功能特性

- 快速扫描目录树中的Git仓库
- 显示各仓库的最后提交时间和未提交改动
- 自动重试失败的git push操作
- 支持多级目录递归检测

## 安装说明

```bash
npm install -g gitcheck-cli
```

## 使用示例

```bash
# 扫描当前目录
gitcheck -d .

# 扫描上级目录
gitcheck -d ../

# 带重试的git push
gitcheck -gp ./project
```

## 参数说明

### 扫描模式

`-d, --dir <directory>`  
**English**: Specify target directory  
**功能**: 指定要扫描的目录路径  
**默认值**: 当前目录

### 推送模式

`-gp, --gitpush <directory>`  
**English**: Execute git push with retry  
**功能**: 在指定目录执行带自动重试的git push操作

## 实现原理

1. 通过递归遍历检测.git目录识别Git仓库
2. 使用child_process执行git status和git log获取提交信息
3. 实现指数退避算法进行push重试
4. 支持Windows/Linux多平台路径格式

## 异常处理

- 网络错误自动重试3次（间隔2s/4s/8s）
- 自动跳过无权限访问的目录
- 遇到损坏的Git仓库时显示警告
- 提供--verbose参数显示详细错误日志

## 截图示例
<!-- 在此处添加screenshots/example.png -->

## 全局选项

```
Options:
  -h, --help       显示帮助信息
  -v, --version    显示版本号
  --verbose        显示详细输出
```
