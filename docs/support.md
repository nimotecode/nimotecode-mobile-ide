# Support

Need help with NimoteCode?

## Contact

- Email: aoun.ma@foxmail.com
- GitHub Issues: https://github.com/nimotecode/nimote_issues/issues

## Privacy / Account Requests

For privacy, account, or data deletion requests, contact us through the channels above and include:

- your account email (if available)
- your platform (iOS/Android)
- request type (access/correction/deletion)

## Common Questions

### Data and credential safety

1. SSH passwords are session-only and are not persisted in local saved profiles.
2. AI API keys are stored in platform secure storage (for example iOS Keychain / Android Keystore-backed storage).
3. Release builds reduce sensitive authentication/credential logging.

### SSH connection fails

1. Verify host/port/username/auth method.
2. Confirm SSH service reachability from your network.
3. Re-check private key format or password.
4. Retry from a saved connection profile.

### Terminal not responding

1. Confirm workspace connection status.
2. Open a new terminal tab and retry.
3. Check shell availability on remote host.

### AI not responding

1. Verify provider config (API key/base URL/model).
2. Verify network access to provider endpoint.
3. Try another configured provider.

### Source Control actions fail

1. Confirm workspace is a valid Git repository.
2. Check Git identity/config in repo.
3. Refresh Source Control panel and retry.

### Pro feature unavailable

1. Check login state.
2. Trigger subscription verification.
3. Retry from the gated feature entry.
