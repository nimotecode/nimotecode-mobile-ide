# Introduction

NimoteCode is a mobile IDE focused on real development workflows across local and SSH workspaces.

## What You Can Do

- Open a local folder or connect to a remote server via SSH.
- Edit code with syntax highlighting, outline, search, and replace.
- Run terminal commands in multiple tabs.
- Use Source Control features inside the app.
- Configure AI providers and use AI Chat or AI Agent workflows.
- Run project tasks and inspect Timeline events/traces.

## Architecture

- Frontend: Flutter (Dart)
- Native/plugin layer: Rust (via Flutter Rust Bridge)
- Workspace model: Local + Remote (SSH)

## Typical Workflow

1. Open Local Explorer or connect Remote Explorer.
2. Open files, edit, and save.
3. Run commands in terminal tabs.
4. Check Source Control changes and commit.
5. Use AI to explain, refactor, or automate repetitive actions.

## Next Steps

- [Features](/features)
- [Quick Start](/docs/quick-start)
- [SSH](/docs/ssh)
- [Terminal](/docs/terminal)
- [AI](/docs/ai)
