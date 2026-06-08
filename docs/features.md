---
title: Features | NimoteCode
description: Capability map for NimoteCode's SSH workspace, editor, terminal, Git, AI, LSP, debugger, tasks, timeline, search, and sync/cache workflows.
---

# Features

NimoteCode combines the tools needed to work on real projects from mobile devices: workspace access, editing, terminal execution, Git, AI, diagnostics, automation, and sync/cache.

## Capability map

| Domain | Capabilities | Availability |
|--------|--------------|--------------|
| Workspace | Local explorer, SSH remote explorer, saved SSH profiles, password/key authentication | Free |
| Editor | Multi-tab editing, clipboard, undo/redo, cursor tracking, outline and dock panels | Free |
| Terminal | Baseline terminal sessions, output search, command workflows | Free |
| Multi-terminal | Parallel terminal tabs and advanced terminal organization | Pro |
| Search | Remote content search with case-sensitive and regex options | Metered free; unlimited Pro |
| AI Chat | Provider configuration, current-file context, coding questions | Free |
| AI Agent | Multi-step automation with tool execution and safety layers | Metered free; unlimited Pro |
| Source Control | Diff review, Git write workflows, branches, stash, history, Git AI | Pro |
| LSP | Diagnostics, code actions, install/verification workflow | Pro |
| Debug | Breakpoints, call stack, variables, watch, output, expression evaluation | Pro |
| Tasks | Task creation and terminal-backed task execution | Free core; advanced batch/parallel Pro |
| Timeline | Trace viewing and event context | Free core; AI analysis Pro |
| Sync / Cache | Local project sync and remote project cache flows | Pro |
| Account | Sign-in, subscription verification, restore purchase flow | Free |

## Workspace and connectivity

NimoteCode starts with a workspace. You can open a local project or connect to a remote SSH project. SSH profiles support host, port, username, workspace root path, password authentication, key-file authentication, pasted-key authentication, and optional remembered credentials.

Use this when you need to inspect and change a real project without setting up a full remote desktop environment.

## Editor

The editor supports tabbed file editing, cursor tracking, copy/cut/paste, undo/redo, current-file state, file caching, outline access, AI panel integration, terminal panel integration, and mobile programming keyboard controls.

## Terminal

The terminal is designed for command execution inside the active workspace. It supports command output, search, reconnection-aware session management, quick/custom commands, and advanced multi-terminal workflows with Pro.

## Source Control (Pro)

Source Control brings Git workflows into the same app:

- Review staged, unstaged, and conflicted files.
- Inspect diffs and history.
- Commit changes.
- Pull, push, fetch, merge, and rebase.
- Manage branches and stash workflows.
- Use Git AI for commit and change-review assistance.

## AI Chat and Agent

AI Chat is for direct coding help, explanations, and planning. AI Agent is for multi-step workflows that can involve tool execution. Free usage is metered for agent runs; Pro unlocks unlimited agent usage.

AI provider configuration is flexible, including custom compatible endpoints where configured in the app.

## LSP and Debug (Pro)

LSP adds diagnostics and code actions for supported language-server setups. Debug adds DAP-style runtime tools such as breakpoints, variables, watch expressions, call stack, output, and expression evaluation.

These are Pro workflows because they turn the mobile workspace into a deeper diagnostic environment.

## Search

Remote content search supports keyword search, case sensitivity, regex, and opening results in the editor. Free usage is metered; Pro unlocks unrestricted remote search.

## Tasks

Tasks let you define repeated workspace commands and execute them through terminal-backed flows. Advanced filtered and parallel task execution is Pro-gated.

## Timeline

Timeline captures and displays development context. Timeline AI actions can run root-cause analysis and fix suggestions for traces when Pro access is available.

## Sync / Cache (Pro)

Sync/cache workflows help move project content between local and remote contexts with workspace-root path checks and operation history.

## Explore next

- [Quick Start](/docs/quick-start)
- [Pro](/pro)
- [SSH Workspace](/docs/ssh)
- [AI Assistant](/docs/ai)
- [Source Control](/docs/source-control)
- [Security and Safety](/docs/security)
