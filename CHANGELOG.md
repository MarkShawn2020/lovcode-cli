# Changelog

## 2.1.53

- docs: 全新 README，讲述从反编译到调试通的完整故事
- docs: 添加实际运行截图作为封面（LOVCODE logo + Opus 4.6）
- docs: 添加 Apache-2.0 LICENSE
- chore: 仓库设为 public，优化 GitHub 描述和话题标签
- chore: 添加 release workflow（tag 触发 GitHub Release）

## 2.1.52

- fix(api): 修复 OAuth 模式下 API 500/429 错误
- chore: 项目重命名为 Lovcode CLI (powered by Lovstudio)
- feat: 自定义 LOVCODE ASCII 艺术 Logo
- fix: 禁用实验性 beta 头（prompt-caching-scope 等）
- fix: 修复 USER_TYPE 未定义导致 User-Agent 异常
- fix: 修复非流式模式下 adaptive thinking 参数错误
