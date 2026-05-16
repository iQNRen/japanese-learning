# Nihongo Study

一个简洁优雅的日语学习 Web 应用，纯前端实现，无需构建工具或服务器。

## 功能

- **五十音图** — 完整的平假名/片假名对照表，点击即可发音
- **单词学习** — 按分类浏览日语单词，支持搜索和分页
- **句子练习** — 按场景分类的日语句子，支持搜索和分页
- **测试模式** — 日中/日英/英日/罗马音 四种翻译测试 + 发音记忆测试

## 使用方式

直接在浏览器中打开 `japanese-learning.html` 即可，无需安装任何依赖。

```
# macOS
open japanese-learning.html

# Linux
xdg-open japanese-learning.html

# Windows
start japanese-learning.html
```

## 项目结构

```
├── japanese-learning.html    # 入口页面
├── src/
│   ├── css/
│   │   └── style.css         # 样式（CSS 变量主题）
│   └── js/
│       ├── core.js           # 应用入口
│       ├── modules/
│       │   ├── gojuon.js     # 五十音图模块
│       │   ├── words.js      # 单词模块
│       │   ├── sentences.js  # 句子模块
│       │   ├── quiz.js       # 测试模块
│       │   └── speech.js     # 语音合成模块
│       └── data/
│           ├── words/        # 单词数据（按分类）
│           └── sentences/    # 句子数据（按场景）
└── README.md
```

## 特性

- 零依赖，纯 HTML/CSS/JS
- 响应式设计，支持手机和桌面
- Google TTS 发音 + Web Speech API 备用
- CSS 自定义属性主题系统
- 数据驱动，易于扩展内容

## License

MIT
