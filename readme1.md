
一、 index.js 
        start 思路
进入 start 时先看 localStorage 里有没有 markdown ，没有的话就使用 TPL 这个模板，
    然后进入 下面的html，把 html放到页面上， 所以不论 localStorage 里有没有Markdown，开始的页面上都会出现一个效果
当用户输入并提交内容时，会调用函数 loadMarkdown， 页面会重新刷新，之后会重新进入 start 函数里
之后函数会冲洗进入 localStorage.markdown 中，修改里面的参数

