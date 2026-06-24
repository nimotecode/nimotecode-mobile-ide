---
title: 移动值班诊断 | NimoteCode
description: 使用 NimoteCode 的终端、搜索、LSP、调试、Timeline 与 AI 能力，在手机或平板上完成值班排障和问题诊断。
---

# 移动值班诊断

NimoteCode 适合移动端排障闭环：连接、检查、运行命令、搜索输出，再逐步升级到结构化诊断。

## 典型流程

1. 通过 SSH 连接目标工作区。
2. 打开终端，运行健康检查、日志、构建或测试命令。
3. 搜索终端输出或远程文件内容中的错误特征。
4. 在编辑器中打开受影响文件。
5. 如果具备 Pro 权限，使用 LSP 诊断与代码动作继续定位问题。
6. 在已配置场景下，通过 Debug 查看断点、调用栈、变量和观察表达式。
7. 使用 Timeline 回看上下文；如具备 Pro，可进一步运行 Timeline AI 做根因分析或修复建议。

## 适合使用的能力

- 支持断线恢复的终端会话。
- 支持远程内容搜索，免费额度内可用，Pro 可无限使用。
- Pro 的 LSP 诊断与 Debug。
- Timeline 上下文与 Pro 的 Timeline AI。
- AI Chat 用于解释报错和规划下一步。

## 相关文档

- [终端](/zh/docs/terminal)
- [搜索](/docs/search)
- [LSP](/zh/docs/lsp)
- [调试面板](/zh/docs/debug)
- [Timeline](/zh/docs/timeline)
