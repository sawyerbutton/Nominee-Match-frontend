# Nominee Match UI设计文档

## 1. 设计系统

### 1.1 颜色系统
```scss
// 主色调
$primary-color: #1976D2;
$secondary-color: #424242;
$accent-color: #FF4081;

// 中性色
$background-color: #FFFFFF;
$surface-color: #F5F5F5;
$text-primary: #212121;
$text-secondary: #757575;

// 状态色
$success-color: #4CAF50;
$warning-color: #FFC107;
$error-color: #F44336;
```

### 1.2 字体系统
```scss
// 字体家族
$font-family-base: 'Roboto', sans-serif;
$font-family-heading: 'Roboto Condensed', sans-serif;

// 字体大小
$font-size-xs: 12px;
$font-size-sm: 14px;
$font-size-base: 16px;
$font-size-lg: 18px;
$font-size-xl: 24px;
$font-size-2xl: 32px;
```

### 1.3 间距系统
```scss
// 间距
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
$spacing-2xl: 48px;
```

## 2. 组件库

### 2.1 基础组件
- Button
- Input
- Select
- Checkbox
- Radio
- Switch
- Card
- Dialog
- Snackbar

### 2.2 业务组件
- DeveloperCard
- MatchResult
- PaymentForm
- ProfileEditor
- SkillSelector

## 3. 页面布局

### 3.1 响应式断点
```scss
// 断点
$breakpoint-xs: 0;
$breakpoint-sm: 600px;
$breakpoint-md: 960px;
$breakpoint-lg: 1280px;
$breakpoint-xl: 1920px;
```

### 3.2 布局组件
- Header
- Footer
- Sidebar
- MainContent
- Grid
- Flex

## 4. 交互设计

### 4.1 动画
- 页面过渡
- 组件动画
- 加载动画
- 反馈动画

### 4.2 手势
- 滑动
- 点击
- 拖拽
- 缩放

## 5. 页面模板

### 5.1 登录/注册页
```
+------------------------+
|      Logo             |
|                       |
|  [Email Input]        |
|  [Password Input]     |
|                       |
|  [Login Button]       |
|  [Register Link]      |
+------------------------+
```

### 5.2 开发者主页
```
+------------------------+
|  Header               |
|  +------------------+ |
|  | Profile Summary  | |
|  +------------------+ |
|                       |
|  [Skills Section]     |
|  [Experience Section] |
|  [Projects Section]   |
|                       |
+------------------------+
```

### 5.3 匹配结果页
```
+------------------------+
|  Search Filters       |
|                       |
|  [Developer Cards]    |
|  [Match Score]        |
|  [Action Buttons]     |
|                       |
+------------------------+
```

## 6. 无障碍设计

### 6.1 键盘导航
- Tab顺序
- 快捷键
- 焦点管理

### 6.2 屏幕阅读
- ARIA标签
- 语义化HTML
- 替代文本

## 7. 主题系统

### 7.1 浅色主题
- 明亮背景
- 深色文字
- 高对比度

### 7.2 深色主题
- 深色背景
- 浅色文字
- 柔和对比度

## 8. 设计资源

### 8.1 图标系统
- Material Icons
- 自定义图标
- 图标字体

### 8.2 插图系统
- 空状态插图
- 错误状态插图
- 成功状态插图 
