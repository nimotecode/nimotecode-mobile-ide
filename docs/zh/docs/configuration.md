# 配置示例

## AI 提供商示例

```yaml
Display Name: My Provider
Provider: openai | anthropic | gemini | grok | deepseek | zhipu | moonshot | ollama | custom
API Key: sk-xxxx
Base URL: https://api.example.com/v1
Model: model-name
Temperature: 0.7
Max Tokens: 4096
Top P: 1.0
Enable Streaming: true
System Prompt: optional
Context Window Size: 8192
Enable File Context: true
```

## SSH 连接示例

```yaml
Name: Production Server
Host: 203.0.113.10
Port: 22
Username: ubuntu
Auth: key
Private Key: 文件路径或粘贴私钥
Passphrase: optional
```

## Task 示例

```yaml
Label: Flutter Test
Type: shell
Command: flutter
Args: [test]
Group: test
Scope: ssh
WorkingDir: ${workspaceFolder}
Background: false
```
