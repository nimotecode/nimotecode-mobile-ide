# SSH Workspace

NimoteCode supports SSH-based remote workspace development.

## Connection Setup

Required fields:

- Host
- Port
- Username
- Authentication method

Supported authentication methods:

- Password
- Private key
  - key file path
  - pasted private key content
  - optional passphrase

## Connection Flow

1. Create a new remote connection
2. Connect to server
3. Enter or confirm remote workspace directory
4. Open files and terminal in the same workspace context

## Explorer and File Actions

Remote Explorer provides:

- Directory tree browsing
- Open file in editor
- Create file/folder
- Rename/delete operations
- Workspace/session history support

## Notes

- If connection drops, reconnect from the same profile.
- Ensure target path is valid and accessible on the remote host.
