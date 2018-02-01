# Pinterest实战项目（一）——概述

出于实战练习的目的，想写一个完整的项目。看到[Pinterest](http://www.pinterest.com)，觉得效果不错。逻辑并不复杂（编写时也简化了部分逻辑）。网站国内访问需要翻墙，这里放张截图：
￼
![](https://ws1.sinaimg.cn/large/00678xkmly1fo0xuj4l5rj310z0n0e81.jpg)

## 技术栈

### 前端：Vue，scss，Spectre.css

Vue.js有很好的开发体验，全家桶省去了各种库、工具的选择麻烦，cli的助力更是快速上手，专注于开发。
搭配一个UI框架，更是大大加快开发效率。除了ElementUI，iView外，还推荐[Vuetify](https://vuetifyjs.com/)，一个基于MaterialUI的框架，功能丰富，定制性强，还提供很多cli可以使用，如NUXT、PWA、Electron等模版。

有一个小问题，直接使用UI框架，那么整个网站的UI设计都需要尽可能与框架一致，否则就会遇到不少的样式覆盖，甚至于样式的冲突（可提高自定义样式的权重，但将来修改也是问题）。我在项目中只选择了一个轻量级的CSS样式库[Spectre.css](https://picturepan2.github.io/spectre/)。

CSS使用了BEM的命名规范，但理解不深刻，整体运用可能不是很得当，在一个Vue页面中Block和Element的划分不是很明确，命名起来有不少负担。
另外一个问题，BEM规范会有很多修饰符`--`或`__`，有人会觉得丑陋，而且命名时，Block下的名称会越来越长。比较好的解决办法就是像ElementUI的方式，配合SCSS的函数，很优雅的实现规范命名，语意明确。
具体方式可以参考：[BEM在Sass3.4中的提升](https://www.w3cplus.com/preprocessor/pushing-bem-to-the-next-level-with-sass-3-4.html)
弄清思想才能更好的实践
[BEM思想之彻底弄清BEM语法](https://www.w3cplus.com/css/mindbemding-getting-your-head-round-bem-syntax.html)

项目中整体页面的需要的组件并不多，就基于功能自己编写，没有拆分的特别细，然后根据页面来组织。
一套UI组件真的是需要很强大的抽象能力，如果随便编写，必然会有复用问题，或者大量props。在Vuetify中大量使用了mixins特性，抽离了一些参数和方法，然后在组件中混合，达到更好的复用。
参考：[在Vue.js 中使用Mixin](http://zcfy.cc/article/using-mixins-in-vue-js-css-tricks-3257.html)。

### 后端：express，mongodb，passport

使用express是因为相对较熟悉，但开发中也遇到了不少问题：

- 异常处理的问题。什么样的异常需要返回客户端。
- 回调函数。会使代码变的很丑

另外可以试试企业级框架[egg](https://eggjs.org/zh-cn/)，基于koa2，更注重约定来开发，还有async/await特性使用。

### 部署：docker配合github hook，jenkins，自动构建部署于阿里云。

一个网站随着业务的发展，必然会使用分层模式分别部署应用层、服务层、数据层，所以就使用Docker模拟这种架构。
另外于我而言，主要是在容器内安装各种程序的依赖，主机会很清爽，避免了莫名奇妙的冲突。持续集成，自动化部署的特性，也简化了部署时候的反复操作。
