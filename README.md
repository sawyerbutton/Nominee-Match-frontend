# Nominee Match Frontend

Nominee Match是一个创新的提名匹配平台，旨在连接开发者与项目，实现高效的人才匹配。该平台集成了Web3技术，支持区块链支付和智能合约交互。

## 功能特性

### 1. 用户管理
- 用户注册和登录
- 个人资料管理
- 身份认证和授权
- Web3钱包集成
  - MetaMask连接
  - WalletConnect支持
  - 多链钱包支持

### 2. 开发者功能
- 开发者资料展示
- 技能和专长展示
- 项目经验展示
- 可接受的工作类型设置
- 区块链信誉展示
- 链上项目历史

### 3. 匹配系统
- 智能匹配算法
- 项目需求分析
- 开发者推荐
- 匹配度评分
- 智能合约自动匹配
- 链上信誉验证

### 4. 支付系统
- 安全的支付处理
- 交易历史记录
- 支付状态追踪
- 加密货币支付
  - ETH支付界面
  - ERC20代币支付
  - 多链支付支持
- 智能合约支付流程
- 支付状态链上验证
- Gas费用估算和显示

### 5. Web3功能
- 智能合约交互
  - 项目发布
  - 支付托管
  - 信誉评分
- 区块链事件监听
- 交易状态实时更新
- 多链支持
  - Ethereum
  - Polygon
  - BSC
- Web3钱包管理
  - 余额显示
  - 交易历史
  - 代币管理

## 技术栈

- **前端框架**: Angular
- **UI组件**: Angular Material
- **状态管理**: NgRx
- **样式处理**: SCSS
- **类型系统**: TypeScript
- **包管理器**: pnpm
- **Web3技术**:
  - Web3.js
  - Ethers.js
  - Web3Modal
  - IPFS
  - OpenSea API

## 项目结构

```
src/
├── app/
│   ├── core/           # 核心服务和功能
│   ├── features/       # 功能模块
│   │   ├── developer/  # 开发者相关功能
│   │   ├── matching/   # 匹配系统
│   │   ├── payment/    # 支付系统
│   │   └── profile/    # 用户档案
│   ├── shared/         # 共享组件和工具
│   └── web3/          # Web3集成模块
│       ├── components/ # Web3相关组件
│       ├── services/   # Web3服务
│       └── utils/      # Web3工具
├── assets/            # 静态资源
└── environments/      # 环境配置
```

## 开发环境设置

1. 安装依赖
```bash
pnpm install
```

2. 配置环境变量
```bash
cp .env.example .env
# 编辑.env文件配置必要的环境变量
# 包括Web3相关配置：
# - WEB3_PROVIDER_URL
# - CONTRACT_ADDRESSES
# - IPFS_GATEWAY
# - OPENSEA_API_KEY
```

3. 启动开发服务器
```bash
pnpm start
```

4. 构建生产版本
```bash
pnpm build
```

5. 运行测试
```bash
pnpm test
```

## 设计规范

- 遵循Material Design设计规范
- 响应式设计，支持多设备
- 无障碍设计支持
- 深色/浅色主题支持
- Web3设计规范
  - 钱包连接流程
  - 交易确认界面
  - 链上数据展示
  - 错误处理提示

## Web3组件

### 1. 钱包连接组件
- 多钱包支持
- 网络切换
- 账户切换
- 余额显示

### 2. 交易组件
- 交易确认
- Gas费用估算
- 交易状态
- 交易历史

### 3. 智能合约交互组件
- 合约调用
- 事件监听
- 状态更新
- 错误处理

### 4. 区块链数据展示组件
- 链上数据
- 交易历史
- 代币余额
- NFT展示

## 性能优化

- 组件懒加载
- 路由预加载
- 图片优化
- 缓存策略
- Web3优化
  - 节点连接池
  - 事件监听优化
  - 批量交易处理
  - 数据缓存

## 安全特性

- XSS防护
- CSRF防护
- 输入验证
- Web3安全
  - 交易签名验证
  - 私钥保护
  - 钓鱼防护
  - 网络切换提醒

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 许可证

MIT License
