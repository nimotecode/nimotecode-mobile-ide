---
title: 手机远程热修 | NimoteCode
description: 使用 NimoteCode 通过 SSH 连接远程项目，在手机上编辑代码、运行验证命令并完成 Git 审查与提交。
---

# 手机远程热修

当生产相关问题不能等你回到电脑前，NimoteCode 可以把核心修复流程收敛到同一个移动工作区里。

## 典型流程

1. 使用 Remote Explorer 连接服务器或开发主机。
2. 确认项目根路径正确。
3. 在编辑器中打开受影响文件。
4. 用终端检查状态、运行测试或复现问题。
5. 如有需要，先让 AI Chat 帮你解释问题或规划补丁。
6. 保存修改。
7. 如果具备 Pro 权限，使用 Source Control 审查 diff 并提交。
8. 在合适场景下继续通过同一套 Git 工作流推送或同步。

## 适合使用的能力

- SSH 配置档案与密钥/密码认证。
- 标签式编辑器。
- 终端输出搜索。
- 远程内容搜索。
- Pro 的 Source Control 与 Git AI。
- 如项目需要本地/远程内容移动，可使用 Pro 的 Sync / Cache。

## 相关文档

- [SSH 工作区](/zh/docs/ssh)
- [编辑器](/zh/docs/editor)
- [终端](/zh/docs/terminal)
- [Source Control](/zh/docs/source-control)
