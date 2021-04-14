index2.js思路
    第一次进来执行App里的 init ，将 menu 初始化，同时去执行 editor 的初始化，
去初始化的时候，进入localStorage 读取 markdown，没有的话去读取模板，然后执行bind（）函数，之后就是start（）函数，然后将初始化的数据放进html里。之后就看到最原始的模板。
    用户去编辑markdown时，点击保存，将内容保存到localStorage里的markdown，页面会刷新，再次进入init，再进editor的markdown，此时的markdown就是自己的写过的 markdown，
再次执行刷新











可以说是一个固定的套路

const Menu = {
    init() {
         
    }
}

const App = {
    init() {
        [...arguments].forEach = Module.init()
    }
}

App.init(Menu)

----------------------------------------------------------------------
但是想要添加其他的参数，
const Menu = {
    init() {
         
    }
}

const Editor = {
    init() {
        console.log(Editor init...)
    }
}

const App = {
    init() {
        [...arguments].forEach = Module.init()
    }
}

App.init(Menu, Editor)