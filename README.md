# 拾光笔记

一个温暖、轻盈的个人笔记工作台，包含笔记、任务、图片收藏、搜索筛选和新建笔记等交互。

## 源码结构

- `app/page.tsx`：React 页面组件与交互逻辑
- `app/layout.tsx`：页面元数据和根布局
- `styles.css`：完整视觉样式，React 与静态版共用
- `index.html` + `script.js`：无需构建即可打开的静态版本
- `vite.config.ts`、`worker/`、`build/`：Vinext 与 Cloudflare Worker 构建配置

## 本地开发

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

开发服务启动后，按照终端显示的本地地址访问即可。

## 构建

```bash
npm run build
```

如果只想快速查看静态版本，直接用浏览器打开根目录的 `index.html`。

## 修改指南

- 修改页面内容或功能：编辑 `app/page.tsx`
- 修改颜色、布局或响应式效果：编辑 `styles.css`
- 修改网站标题和描述：编辑 `app/layout.tsx`

项目使用 React 19、Next.js 兼容 API 和 Vinext 构建。
