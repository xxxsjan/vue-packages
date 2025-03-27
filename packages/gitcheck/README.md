# gitpromax

🔍 git增效命令行工具

## 功能特性 / Features

- 🗂️ 目录扫描检测 - Directory Scanning
  - 递归检测.git目录分布情况
  - 支持指定扫描深度和过滤规则

- 🔁 智能重试 - Smart Retry
  - 自动重试失败的git push操作
  - 可配置重试次数和间隔时间

- 📊 进度可视化 - Progress Visualization
  - 实时显示扫描/重试进度
  - 支持彩色控制台输出

- 🛠️ 扩展架构 - Extensible Architecture
  - 插件式命令设计
  - 支持自定义检测规则

## 安装说明

```bash
npm install -g gitpromax
```

## 技术细节

### 性能优化

- 使用worker_threads实现并行扫描
- 采用LRU缓存减少重复目录访问

## 使用示例

```bash
# 扫描当前目录
gt 

# 扫描上级目录
gt check -d ../

# 带重试的git push
gt push -r 10 # git push最多重试10次
```

## 全局选项

| 选项/Option       | 类型/Type | 默认值/Default | 描述/Description                 |
|-------------------|-----------|----------------|----------------------------------|
| -h, --help        | boolean   | false          | 显示帮助信息/Show help          |
| -v, --version     | boolean   | false          | 显示版本号/Show version          |
| --verbose         | boolean   | false          | 显示详细输出/Verbose output      |
