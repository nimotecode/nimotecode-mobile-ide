# 支持

## 联系方式

- 邮箱：aoun.ma@foxmail.com
- GitHub Issues：https://github.com/nimotecode/nimote_issues/issues

## 隐私 / 账户请求

如需隐私、账户或数据删除请求，请通过以上渠道联系，并尽量提供：

- 账户邮箱（如有）
- 平台（iOS/Android）
- 请求类型（访问/更正/删除）

## 常见问题

### 数据与凭据安全

1. SSH 密码仅用于会话期内存，不会持久化保存到本地连接配置。
2. AI API Key 使用系统级安全存储（如 iOS Keychain / Android Keystore 支撑存储）。
3. 发布版本会减少敏感认证/凭据日志输出。

### SSH 连接失败

1. 检查 host/port/username/认证方式。
2. 确认 SSH 服务网络可达。
3. 检查私钥格式或密码。
4. 使用已保存连接重试。

### 终端无响应

1. 确认工作区连接状态。
2. 新建终端标签后重试。
3. 检查远程主机 shell 可用性。

### AI 无响应

1. 检查 provider 配置（API key/base URL/model）。
2. 检查到 provider 端点的网络连通性。
3. 切换到其他已配置 provider。

### Source Control 操作失败

1. 确认目录为有效 Git 仓库。
2. 检查仓库 Git 身份配置。
3. 刷新面板后重试。

### Pro 功能不可用

1. 检查登录状态。
2. 触发订阅状态校验。
3. 从受限功能入口重试。
