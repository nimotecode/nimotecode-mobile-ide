# Configuration

This page helps you set up NimoteCode for stable daily use, with a focus on AI, SSH, and task workflows.

## AI Configuration Strategy

Create at least two profiles:

- Primary profile for daily coding
- Backup profile for failover or cost control

Tune each profile for your usage style:

- Lower randomness for precise code tasks
- Higher context for large project reasoning
- Streaming enabled for faster perceived response

## AI Provider Setup Checklist

- Add provider, API key, endpoint, and model
- Verify responses in AI Chat
- Confirm AI Agent can execute with your selected profile
- Keep prompts and limits aligned with cost/performance goals
- API keys are stored via platform secure storage (for example iOS Keychain / Android Keystore-backed storage)

## SSH Configuration Strategy

For each server environment, keep a dedicated profile:

- Environment name (for example: Staging, Production)
- Host, port, user, and authentication method
- Stable workspace root path for predictable navigation

Recommended:

- Use key-based auth for production servers
- Separate high-risk and low-risk environments
- Validate access rights before running tasks
- If password auth is used, treat it as session-only: password is used in-memory and not persisted in local SSH profile storage

## Tasks Configuration Strategy

Design tasks around recurring outcomes:

- Build and test
- Lint and format
- Service restart and health checks
- Log inspection shortcuts

Tips:

- Use clear task names by team convention
- Group related tasks for quick filtering
- Keep high-risk commands clearly labeled

## Launch-Ready Baseline

Before daily usage, confirm:

1. AI profile works in Chat and Agent
2. SSH profile can connect and open workspace
3. At least one build/test task runs successfully
4. Source Control can complete commit and sync
