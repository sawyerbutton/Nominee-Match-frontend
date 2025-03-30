# Nominee Match Frontend

Nominee Match是一个创新的提名匹配平台，旨在连接开发者与项目，实现高效的人才匹配。

## 功能特性

### 1. 用户管理
- 用户注册和登录
- 个人资料管理
- 身份认证和授权

### 2. 开发者功能
- 开发者资料展示
- 技能和专长展示
- 项目经验展示
- 可接受的工作类型设置

### 3. 匹配系统
- 智能匹配算法
- 项目需求分析
- 开发者推荐
- 匹配度评分

### 4. 支付系统
- 安全的支付处理
- 交易历史记录
- 支付状态追踪

## 技术栈

- **前端框架**: Angular
- **UI组件**: Angular Material
- **状态管理**: NgRx
- **样式处理**: SCSS
- **类型系统**: TypeScript
- **包管理器**: pnpm

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
│   └── app.module.ts   # 主模块
├── assets/            # 静态资源
└── environments/      # 环境配置
```

## 开发环境设置

1. 安装依赖
```bash
pnpm install
```

2. 启动开发服务器
```bash
pnpm start
```

3. 构建生产版本
```bash
pnpm build
```

4. 运行测试
```bash
pnpm test
```

## 设计规范

- 遵循Material Design设计规范
- 响应式设计，支持多设备
- 无障碍设计支持
- 深色/浅色主题支持

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 许可证

MIT License
