# 5月15日

### 一、chore: 搭建项目

查看vite官方文档[开始 | Vite 官方中文文档 (vitejs.cn)](https://vitejs.cn/vite3-cn/guide/#scaffolding-your-first-vite-project)，根据官方给出的步骤来搭建项目

第一步：

```
pnpm create vite // 在终端中输入这段代码
```

第二步：

根据命令提示符，选择所需要的配置

![image-20240515204801737](MarkdownImgs/README/image-20240515204801737.png)

> [!IMPORTANT]
>
> 项目搭建完成，还需要使用`pnpm i`指令下载node_modules文件夹才能运行

### 二、配置eslint

查看eslint中文文档[ESLint 入门 - ESLint - 插件化的 JavaScript 代码检查工具](https://zh-hans.eslint.org/docs/latest/use/getting-started)，根据官方给出的步骤来配置eslint

> [!NOTE]
>
> 使用eslint的目的是在于根据项目需求进行配置，帮助团队维持一致的代码风格，并且可以在代码编写过程中提供实时反馈

第一步：

```
pnpm i eslint -D // 在终端中输入这段代码，先别着急，这段代码需要修改，在下面会说
```

第二步：

```
npm init @eslint/config // 在终端中输入这段代码
```

在运行 `npm init @eslint/config` 后，你的目录下会有 `.eslintrc.{js,yml,json}` 文件

第三步：

```
pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser // 在终端中输入这段代码
```

下载相关插件

第四步：

将你的目录下会有 `.eslintrc.{js,yml,json}` 文件内容修改为如下的内容：

```
// @see https://eslint.bootcss.com/docs/rules/

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  /* 指定如何解析语法 */
  parser: 'vue-eslint-parser',
  /** 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* 继承已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', '@typescript-eslint'],
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/semi': 'off',

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
    'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
    'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
  },
}

```

> [!NOTE]
>
> 在这个文件里面，配置的rules是一些常见的规则

第五步：

在项目目录下，新建`.eslintignore`文件，内容如下

```
dist
node_modules
```

第六步：

在`package.json`文件的scripts配置项中添加如下代码

```
"scripts": {
    "lint": "eslint src",
    "fix": "eslint src --fix",
}
```

> [!WARNING]
>
> 在第一步`pnpm i eslint -D`下载的eslint版本是9.0.0，在9.0.0的版本中，按照如上的步骤配置会报错（`pnpm run lint`不能正常运行），从 ESLint v9.0.0 开始，`.eslintrc` 配置格式已经被弃用（deprecated），取而代之的是 flat config（扁平配置）系统成为新的默认配置系统。（我太菜了，不知道他在讲什么>.<`)
>
> 参考如下：
>
> [Bug: "Error: Could not find config file." · Issue #18287 · eslint/eslint (github.com)](https://github.com/eslint/eslint/issues/18287)
>
> 反正我只知道，9.0.0的版本就是用不了，然后我就查看了我三周前的一个练习项目的`package.json`文件，如下图所示
>
> ![image-20240515211116698](MarkdownImgs/README/image-20240515211116698.png)
>
> 然后我运行了`pnpm i eslint@8.57.0 -D`，将eslint的版本降低到了8.57.0，然后`pnpm run lint`就能正常运行，能够检查代码了

### 三、配置prettier

> [!NOTE]
>
> prettier是代码格式化工具，配置它的目的是用于自动格式化代码，使其符合统一的风格规范

第一步：

```
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
```

安装相关的插件

第二步：

将`prettierrc.json`文件，添加如下的规则：

```
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```

第三步：

将`prettierignore`文件添加如下的内容：

```
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```

按照上述的步骤配置完成之后，进行格式化代码之后，就会按照上面添加的规则进行格式化
