# 廖聪 · 个人作品集

React + Vite，纯前端。源素材保持原样，网页素材另存于 `public/assets`。

## 启动

```sh
pnpm install
pnpm dev
```

浏览器打开终端显示的本地地址。

```sh
pnpm build
pnpm preview
```

## 内容调整

- `src/main.jsx`：个人介绍、经历、联系方式、能力模块。
- `src/projects.json`：项目分类、标题、说明和组图。
- `src/style.css`：颜色、版式、动效和响应式规则。
- `asset-sources.json`：已使用图片对应的原始文件路径。
- `public/assets/hero-film.mp4`：首屏背景视频。

项目图支持分类、组图预览、键盘方向键和 Escape 关闭；联系方式支持邮件、电话及复制微信号。字体优先加载在线字体，离线时回退至系统字体。此版本仅本地预览，未发布到公网。

## 完整作品版

- 26 个图片项目、464 张项目图片；`《风的留白》`不在展示清单。
- 秋季大片封面轮播 3 张横屏作品，组图包含该项目全部 14 张图片。
- 秀场模特与现场花絮各自独立；品牌 Campaign 使用「重塑边界，解构日常」。
- Licht Bestreben 宣发花絮位于品牌项目之后。
- 面包树三个项目位于图片档案末尾。
- 首屏 5 段视频顺播循环；9 条秀场视频与 13 条不同内容的 AI 视频独立播放列表。
- `src/films.json` 管理所有视频及真实视频封面；相同内容以 SHA-256 校验后在 AI 视频库中去重。
- 图片下的子目录（面料、静物、拍立得等）完整收入各自项目；项目缩略图与大图分别加载。
- `public/assets/catalog` 为网页图片副本，`public/assets/films` 为视频副本；原始素材不作修改。

走秀视频区位于两张秀场照片卡片之后；「光落在房间里」的 4 张图合并至「物的片刻」，该项目现共 11 张，原封面保留。

## 性能优化版

性能结果、验证范围与维护方法见 [PERFORMANCE.md](./PERFORMANCE.md)。

完整项目清单在 `src/projects.json`，`scripts/prepare-catalog.mjs` 自动生成轻量 `src/project-cards.json`。使用 `pnpm dev` / `pnpm build` 会先更新生成文件；编辑图片清单后请运行标准脚本。完整组图通过动态 import 按需加载。

视频使用 `-web.mp4` 网页版及 `-hero.mp4` 首屏静音版，影片在点击后加载；原始素材目录保持不变。图像包含大图、卡片图、480px 小图和 160px 组图缩略图。

当前界面额外使用「播放影片」按钮启动未加载的视频，播放后可用原生控制条。离屏和后台会暂停视频；首屏标题原有 17 秒循环保持不变。

## GitHub Pages 部署

仓库：`liaoc1420-coder/liao-cong`。

- `main` 保存源码，`gh-pages` 保存构建后的静态网页。
- 修改后运行 `pnpm deploy`：自动构建并更新发布分支，无需强制推送。
- 仓库 Settings → Pages → Source 使用 **Deploy from a branch**，分支选择 **gh-pages / (root)**。
- 线上路径通过 `VITE_BASE_PATH=/liao-cong/` 设置，所有图片、视频与组图地址支持该子路径。
- 本地 `pnpm dev` 仍使用根路径。
- 只上传网站使用的网页素材；`source-assets`、预览截图、开发依赖和本地素材来源表不提交。
