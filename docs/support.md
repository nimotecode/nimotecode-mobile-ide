---
title: Support | NimoteCode
description: Get support for NimoteCode through email, GitHub issues, documentation, and troubleshooting guides.
---

# NimoteCode Support Center

Need help with NimoteCode? We're here to assist you.

## Contact Us

Get in touch with our team for support, feedback, or questions.

<div class="feature-grid feature-grid-primary">
<VPFeatures>
  <VPFeature
    title="Email Support"
    details="Reach out to us directly at nimotecode@gmail.com for personalized assistance."
  />
  <VPFeature
    title="GitHub Issues"
    details="Report bugs, request features, or track existing issues on our GitHub repository."
  />
  <VPFeature
    title="Documentation"
    details="Check our comprehensive guides and tutorials for self-service troubleshooting."
  />
  <VPFeature
    title="Community"
    details="Join our community to connect with other NimoteCode users and share knowledge."
  />
</VPFeatures>
</div>

## Quick Links

| Resource | What You'll Find |
|----------|------------------|
| [Quick Start Guide](/docs/quick-start) | Step-by-step setup and first-time use |
| [Features Overview](/features) | Complete capability map and feature details |
| [FAQ](/docs/faq) | Common questions and troubleshooting tips |
| [Full Documentation](/docs) | Complete guides for all features |

## Common Issues & Solutions

### SSH Connection Problems

**Problem:** Can't connect to SSH server

**Solutions:**
1. Verify host, port, username, and authentication method are correct
2. Confirm the SSH service is reachable from your network
3. Double-check private key format or password
4. Try connecting from a saved connection profile
5. Check if your server allows password authentication (if using password)
6. Verify your network doesn't block SSH traffic

**Technical Details:**
- NimoteCode uses standard SSH protocols
- Connections timeout after 30 seconds by default
- Heartbeat monitoring begins after successful connection

### Terminal Not Responding

**Problem:** Terminal appears frozen or unresponsive

**Solutions:**
1. Confirm workspace connection status in the header
2. Open a new terminal tab and retry the operation
3. Check if your shell is available on the remote host
4. Verify you have appropriate permissions in the working directory
5. Try running a simple command like `pwd` or `ls` first

**Technical Details:**
- Terminal sessions persist across reconnections
- Output is buffered for searchability
- ANSI escape codes are supported for colors and formatting

### AI Assistant Issues

**Problem:** AI not responding or configuration errors

**Solutions:**
1. Verify provider configuration (API key, base URL, model name)
2. Confirm network access to the provider endpoint
3. Try a different configured provider if available
4. Check that your API key has sufficient credits/permissions
5. Verify the model name is correct for your provider

**Technical Details:**
- API keys are stored in platform secure storage
- Multiple providers can be configured simultaneously
- Streaming responses are supported when available

### Source Control Problems

**Problem:** Git operations failing

**Solutions:**
1. Confirm the workspace is a valid Git repository
2. Check Git identity and configuration in the repository
3. Refresh the Source Control panel and retry
4. Verify you have appropriate permissions for the repository
5. Check network access to Git remote (if pushing/pulling)

**Technical Details:**
- Source Control requires Pro subscription
- Git identity is pulled from repository config
- Operations are atomic and can be retried

### Pro Feature Unavailable

**Problem:** Can't access Pro features

**Solutions:**
1. Check your login state in Settings
2. Trigger subscription verification from Account page
3. Retry from the gated feature entry point
4. Restore purchases if you previously subscribed
5. Verify your subscription is active and not expired

**Technical Details:**
- Pro gating: `sourceControl`, `lsp`, `debug`, `syncCache`
- Subscription status is cached and periodically refreshed
- Trial mode is available for new users

### Debug Panel Issues

**Problem:** Debugger not working as expected

**Solutions:**
1. Confirm you're in an SSH workspace (not available in Local mode)
2. Verify debug adapter is properly configured
3. Check launch configuration in `.nimote/launch.json`
4. Ensure your program is compiled with debug symbols
5. Check debugger logs in Timeline panel

**Technical Details:**
- Debug panel is Pro-only and SSH-only
- Uses DAP (Debug Adapter Protocol)
- Breakpoints, call stack, variables, and watch are supported

## Privacy & Account Requests

For privacy, account, or data deletion requests, contact us through the channels above and include:

| Information | Why We Need It |
|-------------|-----------------|
| **Account Email** | To locate your account (if registered) |
| **Platform** | iOS or Android, for appropriate handling |
| **Request Type** | Access, correction, or deletion request |
| **Additional Details** | Any specific context to help process your request |

We process these requests in accordance with our [Privacy Policy](/privacy) and applicable data protection laws.

## Security & Credentials

Your security is important to us. Here's how we protect your data:

### Data Protection

| Credential Type | Storage Method |
|-----------------|----------------|
| **SSH Passwords** | Session-only, never persisted in saved profiles |
| **AI API Keys** | Platform secure storage (iOS Keychain / Android Keystore) |
| **SSH Private Keys** | Encrypted storage with user protection |
| **Account Auth** | Secure token-based authentication |

### Security Practices

- Release builds minimize sensitive authentication/credential logging
- No sensitive data is transmitted to third parties without your consent
- All network communications use industry-standard encryption
- Local data is protected at rest using platform security features

## Feature Requests & Feedback

We love hearing from our users! To suggest features or provide feedback:

1. **GitHub Issues**: Submit detailed feature requests with use cases
2. **Email**: Send general feedback to nimotecode@gmail.com
3. **Community**: Share ideas with other users

When submitting feedback, include:
- What you're trying to accomplish
- Your current workflow
- How NimoteCode could help
- Any specific feature ideas you have

## Response Times

We strive to respond to all inquiries promptly:

- **Critical Issues**: Within 24-48 hours
- **General Support**: Within 2-3 business days
- **Feature Requests**: Reviewed regularly, response when prioritized
- **Privacy Requests**: Processed within 30 days as required by law

---

Still need help? [Contact Us](#contact-us) and we'll assist you as soon as possible.
