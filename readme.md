想要展示的页面

//一个 # 一个页面，但是 ### 相当于是 ## 的子页面，需要上下键控制它的方向
// let raw = `

// # 开班典礼1
// 若愚@饥人谷

// ## 课程介绍2
// a

// ## 老师介绍3
// b

// ## 常见问题4
// c

// ### 问题1
// d

// ### 问题2
// e

// ## 谢谢5
// f

// `

----------------------------------

测试数据
loadMarkdown(`

# 欢迎来到饥人谷
## 第一章

## 第二章

### 第一节
内容

### 第二节
`)

-----------------------------------------------

//convert(raw)


// let result = `
// <section data-markdown>
// <textarea data-template>
// # 开班典礼
// 若愚@饥人谷
// </textarea>
// </section>

// <section data-markdown>
// <textarea data-template>
// ## 课程介绍
// </textarea>
// </section>

// <section data-markdown>
// <textarea data-template>
// ## 老师介绍3
// </textarea>
// </section>


// <section>
// <section data-markdown>
// <textarea data-template>
// ## 常见问题4
// </textarea>
// </section>

// <section data-markdown>
// <textarea data-template>
// ### 问题1
// </textarea>
// </section>

// <section data-markdown>
// <textarea data-template>
// ### 问题2
// </textarea>
// </section>

// </section>

// <section data-markdown>
// <textarea data-template>
// ## 谢谢5
// </textarea>
// </section>




// `




二、规律总结：
1、使用最多的字体颜色是白色和黑色等无彩色。

2、在有彩色里面：黄色、褐色、红色的近似色是使用最多的。

3、偏暗的颜色：蓝颜色、暗红色、紫色、红色、纯黑色

4、偏亮的颜色：浅黄色、浅灰色、绿色。

5、浅色背景要搭配深色字，深色背景要搭配浅色字。

比如如果底色是黑的，字体颜色可以选用白色、黄色，

最好是一个深一个浅那样的搭配，还有就是不能反差太离谱。

6、通常，浅色背景+深色字，要比深色背景+浅色字效果要好些。

7、其它法则：淡色背景——亦可搭配邻近色的暗色调。

8、深色背景——要搭配白色或互补色的亮色调。