### 国际化配置

#### 新增语言
1 语言包只需要添加到 locale目录下 

2 在XhLangSelect 组件下新增
```
<el-dropdown-item :disabled='app.getLang === `你的语言包`' command='你的语言包'>你的语言包</el-dropdown-item>
```

