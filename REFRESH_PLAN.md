# NimoteCode Website Refresh Plan

## 1. Product discovery findings

### Executive summary

NimoteCode is a Flutter-based developer workspace for mobile and desktop-class form factors that combines local/SSH project access, a custom code editor, terminal sessions, Git workflows, AI chat/agent automation, LSP diagnostics/code actions, debugging, remote search, task execution, timeline diagnostics, and project sync/cache.

The product’s strongest code-proven problem statement is: **developers need to inspect, edit, run, diagnose, and commit real projects from a mobile device or tablet, especially against SSH workspaces, without switching between disconnected terminal, editor, Git, and AI tools.**

Evidence:

- App initialization wires Flutter, Firebase, RevenueCat, Hive, Rust plugins, Provider state, project sync, terminal commands, subscription state, and timeline services in `lib/main.dart`.
- Primary panel shell includes local explorer, remote explorer, search, source control, LSP, debug, sync/cache, AI model config, tasks, and timeline in `lib/layout/panel_layout.dart`.
- Product config defines workspace panels and limits for editor tabs, terminal sessions, AI agent execution, subscriptions, and review-mode automation safety in `lib/core/config.dart`.
- RevenueCat/Firebase premium enforcement and trials are implemented in `lib/services/subscription_manager.dart` and `lib/services/premium_access_service.dart`.
- Feature gates enumerate monetizable capabilities: AI Agent unlimited, Git write, LSP, multi-terminal, remote search, sync, timeline AI, debug, and advanced tasks in `lib/services/feature_gate.dart` and `lib/services/paywall_service.dart`.

### User types

1. **Mobile-first developers and maintainers**
   - Need SSH, terminal, editor, search, and Git from phone/tablet.
   - Evidence: SSH remote explorer in `lib/panels/ssh_login_panel.dart`; terminal in `lib/terminal/multi_terminal_manager.dart`; source control in `lib/git/source_control_panel.dart`.

2. **On-call engineers / incident responders**
   - Need to connect to servers, run diagnostics, search logs/output, inspect timeline/root cause, and apply fixes quickly.
   - Evidence: terminal reconnection/session recovery in `lib/terminal/multi_terminal_manager.dart`; timeline root-cause/fix actions in `lib/timeline/timeline_panel.dart`; debug panel in `lib/panels/debug_panel.dart`.

3. **AI-assisted individual developers**
   - Need chat and agent workflows with provider configuration, file context, history, and controlled tool execution.
   - Evidence: AI chat panel/provider selector in `lib/ai_chat/ai_chat_panel.dart`; AI agent models/services under `lib/ai_chat/agent/`; agent usage limits in `lib/services/agent_usage_service.dart`.

4. **Remote project power users**
   - Need remote search, LSP, debug, sync/cache, task automation, and multiple terminal sessions.
   - Evidence: remote search quota/gate in `lib/panels/search_panel.dart`; LSP panel in `lib/panels/lsp/lsp_panel.dart`; sync/cache in `lib/panels/sync_cache_panel.dart`; tasks in `lib/tasks/ui/tasks_panel.dart`.

### Core workflows

1. **Open a workspace**
   - Choose local or SSH explorer from the shell.
   - Save SSH profiles with host/port/user/root path; use password, key file, or pasted key auth.
   - Evidence: panel selection in `lib/layout/panel_layout.dart`; SSH auth/profile persistence in `lib/panels/ssh_login_panel.dart`.

2. **Edit files in a mobile-optimized editor**
   - Open local/remote files, use tabs, copy/cut/paste, undo/redo, current cursor position, programming keyboard, outline and terminal panels.
   - Evidence: tab and editor state in `lib/models/app_model.dart`; editor modules under `lib/editor/`; editor tab/outline references in `lib/layout/panel_layout.dart`.

3. **Run commands and manage terminals**
   - Start terminal sessions, recover/rebind after connection loss, search output, customize/rename tabs, use “super terminal” block parsing.
   - Evidence: `lib/terminal/multi_terminal_manager.dart`, `lib/terminal/terminal.dart`, `lib/terminal/super/*`, `lib/terminal/search/*`.

4. **Search project content**
   - Search remote file contents with case/regex toggles and metered free usage before Pro gating.
   - Evidence: `lib/panels/search_panel.dart`.

5. **Review and commit changes**
   - Inspect source control, branch, merge/rebase/pull/push/fetch, use stash/history/diff panels, launch Git AI.
   - Evidence: `lib/git/source_control_panel.dart`, `lib/git/commit_panel.dart`, `lib/git/commit_history_panel.dart`, `lib/git/stash_panel.dart`, `lib/git/panels/git_ai_panel.dart`.

6. **Use AI Chat or AI Agent**
   - Configure providers, chat with current-file context, switch to agent mode, consume free agent runs, upgrade for unlimited agent usage.
   - Evidence: `lib/ai_chat/ai_chat_panel.dart`, `lib/ai_chat/ai_chat_controller.dart`, `lib/services/agent_usage_service.dart`.

7. **Diagnose code with LSP and debugger**
   - Refresh diagnostics, open files at diagnostic locations, load code actions, install/verify language servers, manage breakpoints/variables/watch/call stack.
   - Evidence: `lib/panels/lsp/lsp_panel.dart`, `lib/services/editor_lsp_service.dart`, `lib/panels/debug_panel.dart`, `lib/services/debug_service.dart`.

8. **Run repeatable tasks**
   - Create/edit/group tasks, run a task in terminal, run filtered tasks sequentially or in parallel behind advanced task gate.
   - Evidence: `lib/tasks/ui/tasks_panel.dart`, `lib/tasks/services/task_service.dart`.

9. **Understand causal timeline**
   - Capture trace events and optionally run AI root-cause analysis or fix suggestions behind timeline AI gate.
   - Evidence: `lib/timeline/timeline_panel.dart`, `lib/timeline/timeline_service.dart`.

10. **Sync/cache projects**
   - Cache remote projects locally or sync local projects with path safety under Pro gate.
   - Evidence: `lib/panels/sync_cache_panel.dart`, `lib/services/project_sync_service.dart`.

### Functional inventory

#### Workspace and connectivity

- Local explorer and remote SSH explorer: `lib/layout/panel_layout.dart`.
- SSH profile persistence, last login, password secure storage, key file/paste auth, keepalive interval: `lib/panels/ssh_login_panel.dart`, `lib/services/ssh_credential_secure_storage.dart`.
- Workspace state for local/remote/root path/connection: `lib/core/workspace.dart`.

#### Editor

- Multi-tab editor with max open tabs configured to 6: `lib/core/config.dart`, `lib/models/app_model.dart`.
- File content cache, cursor position, undo/redo, clipboard, programming keyboard, editor AI/outline/terminal toggles: `lib/models/app_model.dart`.
- Syntax/layout/line widgets under `lib/editor/`.

#### Terminal

- Multi-terminal manager with tab list, active index, SSH session recovery, app lifecycle reconnect, super mode: `lib/terminal/multi_terminal_manager.dart`.
- Max terminal sessions configured to 6: `lib/core/config.dart`.
- Multi-terminal actions are Pro-gated: `lib/terminal/multi_terminal_manager.dart`, `lib/services/feature_gate.dart`.
- Terminal search/custom commands: `lib/terminal/search/*`, `lib/terminal/custom_command_manager.dart`, `lib/terminal/terminal_commands_panel.dart`.

#### Search

- Remote content search with debounce, case sensitivity, regex, per-session quota, Pro unlimited gate: `lib/panels/search_panel.dart`.

#### Source control

- Git panel initialization against local or remote workspace: `lib/git/source_control_panel.dart`.
- Branch, merge, rebase, pull, push, fetch, commit, stash, history, diff, Git AI: `lib/git/source_control_panel.dart`, `lib/git/*`.
- Git write actions are Pro-gated: `lib/git/source_control_panel.dart`, `lib/services/feature_gate.dart`.

#### AI

- AI chat with provider config selector and privacy notice: `lib/ai_chat/ai_chat_panel.dart`.
- AI agent system with planning, execution, memory, tool registry, loop detection, security validation, file/remote/local tool services: `lib/ai_chat/agent/**`.
- Agent free usage limit defaults to 10 and is remotely configurable: `lib/services/remote_feature_config_service.dart`, `lib/services/agent_usage_service.dart`.

#### LSP

- LSP diagnostics, code actions, install wizard, active file language/server handling: `lib/panels/lsp/lsp_panel.dart` and parts.
- LSP access is Pro-gated: `lib/panels/lsp/lsp_panel.dart`.

#### Debug

- Debug UI with breakpoints, call stack, variables, watch, output, expression evaluation: `lib/panels/debug_panel.dart`.
- Uses DAP service/config/language config: `lib/services/debug_service.dart`, `lib/services/debug_config_service.dart`, `lib/services/debug_language_config.dart`.
- Debug access is Pro-gated and unavailable in local explorer mode via `lib/layout/panel_layout.dart`.

#### Tasks

- Task list/filtering/groups, task editor, sequential/parallel filtered runs, terminal-backed execution: `lib/tasks/ui/tasks_panel.dart`.
- Advanced task actions are Pro-gated: `lib/tasks/ui/tasks_panel.dart`.
- Tasks are unavailable in local explorer mode via `lib/layout/panel_layout.dart`.

#### Timeline

- Timeline panel, trace actions, root cause analysis, fix suggestions: `lib/timeline/timeline_panel.dart`.
- Timeline AI is Pro-gated: `lib/timeline/timeline_panel.dart`.

#### Sync/cache

- Local project sync and remote project cache flows with workspace-root path safety and history: `lib/panels/sync_cache_panel.dart`.
- Sync/cache action is Pro-gated: `lib/panels/sync_cache_panel.dart`.

#### Account, subscription, and monetization

- Firebase login/auth, Google/Apple/email support implied by dependencies and login pages under `lib/login/`, user model in `lib/models/user_model.dart`.
- RevenueCat packages: lifetime, yearly, monthly; entitlement key `nimotecode Pro`: `lib/core/config.dart`, `lib/services/subscription_manager.dart`.
- Server-authoritative premium access, trials, device hashes, signed short-lived offline cache: `lib/services/premium_access_service.dart`.

#### Localization and settings

- Generated localization includes English, Chinese, Japanese, Korean, Russian: `lib/generated/l10n_*.dart`.
- Settings page and controller under `lib/settings/`.
- Themes include multiple IDE themes in `lib/models/app_model.dart` and theme files under `lib/styles/`.

### Hidden or under-marketed capabilities

- Signed premium cache with five-minute offline grace: `lib/services/premium_access_service.dart`, `lib/services/subscription_manager.dart`.
- Device-trial blocking and installation/device hashes: `lib/services/premium_access_service.dart`.
- Remote feature overrides from Firebase Remote Config: `lib/services/remote_feature_config_service.dart`.
- Review safety switches that restrict automation for App Store review: `lib/core/config.dart`.
- Agent safety layers: path validation, command validation, lock managers, sensitive tool checker, loop detection: `lib/ai_chat/agent/services/tools/*`, `lib/ai_chat/agent/utils/*`.
- Terminal “super mode” block parsing and interactive-app fallbacks: `lib/terminal/multi_terminal_manager.dart`, `lib/terminal/super/*`.

### Technical architecture

- Flutter app with Provider state management and singleton services: `lib/main.dart`, `lib/models/app_model.dart`.
- Rust plugin bridge for SSH, diffing, highlighting, LSP/DAP types, timeline, generated FRB bindings: `lib/plugins/*`, `flutter_rust_bridge.yaml`, `pubspec.yaml`.
- Firebase services: Core, Auth, Firestore, Functions, Remote Config, App Installations: `pubspec.yaml`, `lib/main.dart`, `lib/services/premium_access_service.dart`.
- RevenueCat purchases and paywall UI: `pubspec.yaml`, `lib/services/subscription_manager.dart`.
- Local persistence via Hive, SharedPreferences, secure storage: `pubspec.yaml`, `lib/services/hive_service.dart`, `lib/services/ssh_credential_secure_storage.dart`, `lib/services/ai_config_secure_storage.dart`.
- Internationalized UI with generated localizations: `lib/generated/l10n_*.dart`.

### Competitive positioning

Primary category: **mobile IDE / remote development workspace**.

Adjacent categories:

- SSH client + terminal emulator.
- Mobile Git client.
- AI coding assistant / agentic coding tool.
- Remote dev environment manager.
- Lightweight observability/diagnostics workbench.

Differentiators supported by code:

- Mobile-first integration of SSH workspace, editor, terminal, Git, LSP, debug, AI, timeline, and sync in one shell: `lib/layout/panel_layout.dart`.
- Agent automation has explicit safety/control mechanisms: `lib/core/config.dart`, `lib/ai_chat/agent/services/tools/*`.
- Timeline root-cause/fix workflow bridges terminal/debug/LSP/editor events: `lib/timeline/timeline_panel.dart`, `lib/timeline/timeline_service.dart`.
- Monetization is granular by high-value workflow, not just one blanket Pro flag: `lib/services/feature_gate.dart`, `lib/services/paywall_service.dart`.

### Premium opportunities

Code-backed premium capabilities that can justify subscriptions:

- Unlimited AI Agent runs: `Feature.aiAgentUnlimited`, `lib/services/agent_usage_service.dart`.
- Git write and Git AI workflows: `Feature.gitWrite`, `lib/git/source_control_panel.dart`.
- Multi-terminal beyond baseline use: `Feature.multiTerminal`, `lib/terminal/multi_terminal_manager.dart`.
- LSP diagnostics/code actions/install wizard: `Feature.lsp`, `lib/panels/lsp/lsp_panel.dart`.
- DAP debugger: `Feature.debug`, `lib/panels/debug_panel.dart`.
- Remote search beyond free quota: `Feature.remoteSearch`, `lib/panels/search_panel.dart`.
- Sync/cache workflows: `Feature.sync`, `lib/panels/sync_cache_panel.dart`.
- Timeline AI root-cause and fix suggestions: `Feature.timelineAI`, `lib/timeline/timeline_panel.dart`.
- Advanced task batch/parallel execution: `Feature.tasksAdvanced`, `lib/tasks/ui/tasks_panel.dart`.

### Missing expectations or uncertainty

- Store links and platform availability must be verified externally; code only proves iOS/Android/macOS/Linux/Windows platform branches exist in Rust initialization (`lib/main.dart`) and mobile RevenueCat keys (`lib/core/config.dart`).
- The website claims Discord/GitHub/Twitter links in config, but source code does not prove those communities exist.
- The app supports Apple/Google/email auth by dependencies/login modules, but exact UI coverage should be verified in `lib/login/*` before promising all auth flows prominently.
- Website says “thousands of developers”; source code cannot substantiate user count.
- Website claims “MIT License”; no source evidence in app code and should be removed unless repository license confirms it.
- Website claims iOS/Android minimum versions; source code examined here does not prove exact OS requirements.

## 2. Website audit findings

Website stack:

- VitePress 1.1.0 with scripts `docs:dev`, `docs:build`, `docs:preview`: `/mnt/d/Work/nimoteoffical/package.json`.
- Main VitePress config is `/mnt/d/Work/nimoteoffical/docs/.vitepress/config.ts`.
- Custom theme files are under `/mnt/d/Work/nimoteoffical/docs/.vitepress/theme/`.
- Main English source pages include `/docs/index.md`, `/docs/features.md`, `/docs/download.md`, and `/docs/docs/*.md`.
- Generated `docs/.vitepress/dist` is committed/present, but should not be edited as source.

### Navigation

Findings:

- Navigation currently mixes conversion, support, legal, and account deletion in top-level nav: `docs/.vitepress/config.ts`.
- `Download` is not in the top nav root, even though homepage CTAs lead there.
- Account deletion is a compliance/legal page and should not compete with product/conversion nav.
- Multi-locale nav exists, but implementation should begin with English source and then migrate translations.

Recommendation:

- Top nav should prioritize Product, Docs, Pricing/Pro, Download, Support.
- Legal/account deletion should move to footer/sidebar/help pages.

### Information architecture

Findings:

- Existing docs are capability-based and broadly aligned with app panels.
- Missing a dedicated “Pro / Pricing” page even though subscription logic is sophisticated and code-proven.
- Missing “Use cases” pages for remote hotfix, on-call diagnosis, mobile Git, AI agent workflows.
- Missing “Security & privacy for AI/SSH/subscriptions” page, despite secure storage and safety gates in code.

### Homepage

Findings:

- Hero says “Code anywhere. Ship everywhere.” This is broad and less specific than the code-proven product: an SSH/mobile developer workspace.
- Homepage includes many raw feature cards; it reads like an inventory, not a conversion story.
- Homepage says “Single tab terminal with session persistence” while app implements multi-terminal and Pro-gates multi-terminal actions (`lib/terminal/multi_terminal_manager.dart`, `Feature.multiTerminal`).
- Pricing table says Timeline AI and Tasks are Free; code gates Timeline AI and advanced task operations behind Pro (`lib/timeline/timeline_panel.dart`, `lib/tasks/ui/tasks_panel.dart`).
- Homepage says AI Agent is Pro only, but code gives signed-in users metered free agent usage with a default limit of 10 (`lib/services/agent_usage_service.dart`, `lib/services/remote_feature_config_service.dart`).

### Landing pages

Findings:

- `features.md` is comprehensive but includes claims that are stronger than the code evidence or incorrectly marked Free/Pro.
- `download.md` includes unverified user count and unsupported exact system requirements.
- No dedicated landing pages for the highest-intent categories: SSH remote development, mobile Git client, AI coding agent, on-call mobile debugging.

### Documentation

Findings:

- Core docs pages exist for SSH, Terminal, Source Control, AI, LSP, Debug, Tasks, Timeline, Sync/Cache, Settings, Configuration.
- Docs are short and mostly conceptual; many lack “before you start,” “free vs Pro,” troubleshooting, safety, or exact workflow steps.
- No docs page for account/subscription/trials/restore despite code implementing subscription state, restore, trial checks, and account deletion URLs.

### SEO

Findings:

- Global metadata exists in `docs/.vitepress/config.ts`.
- Missing page-specific descriptions on key pages.
- Missing structured product/software app schema.
- Weak keyword focus: pages do not target “mobile IDE”, “SSH code editor”, “Git client for iPad/iPhone/Android”, “AI coding agent mobile”, “remote development on phone”.
- Generated dist exists but source should own SEO improvements.

### Messaging

Findings:

- “Mobile-first IDE for real delivery” is closer to actual product than “Code anywhere” but still underuses the strongest differentiator: SSH workspace + terminal + editor + Git + AI in one mobile UI.
- Current pages list features without explaining which urgent jobs users are trying to complete.
- Some claims imply full free access where code gates advanced actions.

### Conversion paths

Findings:

- Primary CTA is Download; docs CTA exists.
- No Pro/Pricing page to explain why Pro is worth buying.
- Feature cards do not consistently route to relevant docs or upgrade rationale.
- Missing “start with SSH workspace” funnel, which is the most code-evident activation path.

## 3. Proposed information architecture

English source IA for initial implementation:

- `/` — Homepage: mobile SSH developer workspace positioning.
- `/features` — Evidence-aligned capability map with correct Free/Pro model.
- `/pro` — Pro capabilities, trial/restore explanation, paid value matrix.
- `/download` — Store links, honest availability, first-run CTA.
- `/use-cases/remote-hotfix` — SSH + editor + terminal + Git flow.
- `/use-cases/on-call-diagnostics` — terminal + search + timeline + debug/LSP.
- `/use-cases/ai-agent` — chat/agent, metered free usage, Pro unlimited.
- `/docs/quick-start` — first-success activation path.
- `/docs/ssh`
- `/docs/editor` — add missing editor docs.
- `/docs/terminal`
- `/docs/search` — add missing remote search docs.
- `/docs/source-control`
- `/docs/ai`
- `/docs/lsp`
- `/docs/debug`
- `/docs/tasks`
- `/docs/timeline`
- `/docs/sync-cache`
- `/docs/account-subscription` — add missing account/subscription docs.
- `/docs/settings`
- `/docs/configuration`
- `/docs/security` — add missing safety/security docs.
- `/support`, `/privacy`, `/terms`, `/account-delete`.

## 4. Proposed documentation structure

Recommended docs sections:

1. **Start**
   - Quick Start
   - Open a workspace
   - Connect over SSH
   - Configure AI provider

2. **Daily workflow**
   - Editor
   - Terminal
   - Search
   - Source Control
   - Tasks

3. **Diagnosis**
   - LSP
   - Debug
   - Timeline

4. **AI workflows**
   - AI Chat
   - AI Agent
   - Agent safety and limits

5. **Pro and account**
   - Pro features
   - Subscription restore
   - Trials and sign-in
   - Sync/cache

6. **Reference**
   - Settings
   - Configuration
   - Security model
   - FAQ

## 5. Proposed homepage structure

1. Hero
   - Headline: “A mobile SSH workspace for real code fixes.”
   - Subhead: “Edit files, run terminals, review Git changes, ask AI, and diagnose remote projects from phone or tablet.”
   - CTAs: Download, Quick Start.

2. Activation flow
   - Connect to SSH or open local project.
   - Edit and run commands.
   - Commit or diagnose with Pro tools.

3. Use cases
   - Remote hotfix.
   - On-call diagnosis.
   - AI-assisted coding.

4. Capability clusters
   - Workspace/editor/terminal.
   - Git/search/tasks.
   - AI/LSP/debug/timeline/sync.

5. Free vs Pro
   - Accurate code-aligned gates:
     - Free/core: workspace, editor, baseline terminal, AI chat, metered agent, basic tasks, timeline viewing.
     - Pro/unlimited/advanced: Git write, multi-terminal, LSP, debug, sync/cache, remote search beyond quota, timeline AI, advanced tasks, unlimited agent.

6. Trust/safety
   - Secure storage, confirmation/safety gates, subscription verification.

7. Final CTA
   - Download + docs.

## 6. SEO improvements

- Set global description to: “NimoteCode is a mobile SSH developer workspace with code editor, terminal, Git, AI agent, LSP, debugger, tasks, timeline diagnostics, and sync/cache.”
- Add page-specific frontmatter titles/descriptions.
- Add SoftwareApplication JSON-LD in VitePress head.
- Add dedicated pages targeting:
  - mobile SSH IDE
  - code editor for iPad/iPhone/Android
  - mobile Git client for developers
  - AI coding agent on mobile
  - remote debugging and diagnostics on mobile
- Remove unverified user-count and license claims unless independently verified.

## 7. Conversion improvements

- Add `/pro` page explaining exact paid workflow unlocks.
- Add Pro badges consistently where code gates features.
- Replace broad feature inventory with “jobs to be done” sections.
- Route CTAs by intent:
  - New users: Quick Start.
  - Ready users: Download.
  - Evaluators: Features / Pro.
  - Technical users: Docs.
- Explain metered free usage for Agent/Search rather than claiming “Pro only” or “Free unlimited.”

## 8. Content migration plan

Phase 1: English source refresh

- Update `docs/index.md`, `docs/features.md`, `docs/download.md`, and `docs/.vitepress/config.ts`.
- Add `docs/pro.md`, `docs/docs/editor.md`, `docs/docs/search.md`, `docs/docs/account-subscription.md`, `docs/docs/security.md`.
- Add use-case pages under `docs/use-cases/`.
- Update theme CSS only as needed for maintainable reusable sections.

Phase 2: Documentation corrections

- Update existing docs pages with correct Free/Pro gates and code-backed details.
- Remove/soften unsupported claims from download/support/legal-adjacent pages.

Phase 3: Locale migration

- Port updated IA to zh/ja/ko/ru/es after English source stabilizes.
- Avoid editing generated `dist` files directly.

## 9. Implementation roadmap

### Commit 1 — Evidence-aligned IA and SEO

- Update VitePress config nav/sidebar/head metadata.
- Add JSON-LD SoftwareApplication schema.
- Add `/pro` page and missing docs stubs.

### Commit 2 — Homepage and feature repositioning

- Rewrite homepage around mobile SSH workspace and core workflows.
- Correct Free/Pro table.
- Rewrite feature page as capability clusters with code-aligned gating.

### Commit 3 — Docs and conversion paths

- Add editor/search/account/security docs.
- Add use-case pages.
- Update quick start/download to remove unsupported claims and route users clearly.

### Commit 4 — Styling polish and build verification

- Add reusable CSS classes in theme custom CSS.
- Run `npm run docs:build`.
- Fix any VitePress build errors.

## 10. Risks and assumptions

- Store URLs, exact OS requirements, public community links, and user counts are not derivable from app source code and must remain omitted or phrased cautiously unless verified elsewhere.
- Generated localization pages may become stale after English source refresh; translations should be a follow-up task.
- Some advanced AI agent internals are present in source but may be partially hidden by review safety mode (`lib/core/config.dart`); copy should emphasize controlled automation rather than fully autonomous background execution.
- Feature gates can be remotely overridden by Firebase Remote Config (`lib/services/remote_feature_config_service.dart`), so website should describe default product model while noting Pro availability may vary by plan/platform.
- Do not edit `docs/.vitepress/dist` as source; rebuild it through the existing VitePress build process.
