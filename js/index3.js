// 主题切换   对下载设置

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

const isMain = str => (/^#{1,2}(?!#)/).test(str)
const isSub = str => (/^#{3}(?!#)/).test(str)
convert = raw => {
    let arr = raw.split(/\n(?=\s*#{1,3}[^#])/).filter(s => s != "").map(s => s.trim())

    let html = ''
    for (let i = 0; i < arr.length; i++) {

        if (arr[i + 1] !== undefined) {

            //如果arr[0]是一个或两个 # 和  arr[1]是一个或两个 # 的
            if (isMain(arr[i]) && isMain(arr[i + 1])) {
                //如果这一层和下一层都是一个页面，那么 section只有一层就好
                html += `
                <section data-markdown>
                <textarea data-template>
                ${arr[i]}
                </textarea>
                </section>
                `
            } else if (isMain(arr[i]) && isSub(arr[i + 1])) {
                //当一个页面有 子页面的情况下，要在前面加个 <section> 包裹元素，但是不加</section> , 确保下面是子集
                html += `
            <section>
                <section data-markdown>
                <textarea data-template>
                ${arr[i]}
                </textarea>
                </section>
               `
            }
            //                     isSub(arr[i+1])  记得要+1
            else if (isSub(arr[i]) && isSub(arr[i + 1])) {
                html += `
			<section data-markdown>
			<textarea data-template>
			${arr[i]}
			</textarea>
			</section>
			`
            } else if (isSub(arr[i]) && isMain(arr[i + 1])) {
                //当一个页面有子页面的情况下，要在后面加个 </section> 包裹元素，但是不加</section> , 确保上面是子集
                html += `
                <section data-markdown>
                <textarea data-template>
                ${arr[i]}
                </textarea>
                </section>               
            </section>
            `
            }
        } else {
            //如果最后一个是主页面
            if (isMain(arr[i])) {
                html += `
                <section data-markdown>
                <textarea data-template>
                ${arr[i]}
                </textarea>
                </section> 
                `
            }
            //如果是子页面
            else if (isSub[i]) {
                html += `
                <section data-markdown>
                <textarea data-template>
                ${arr[i]}
                </textarea>
                </section>               
            </section>
            `
            }
        }
    }
    return html
}

const Menu = {
    init() {
        this.$settingIcon = $('.icon-setting')
        this.$menu = $('.menu')
        this.$closeIcon = $('.icon-close')
        this.$$tabs = $$('.tab')
        this.$$contents = $$('.content')

        this.bind()

    },
    bind() {
        //修改完之后要去修改css，将 menu 开始设置为隐藏
        this.$settingIcon.onclick = () => {
            this.$menu.classList.add('open')
        }
        this.$closeIcon.onclick = () => {
            this.$menu.classList.remove('open')
        }
        //tab 切换  原生js 方法
        this.$$tabs.forEach($tab => $tab.onclick = () => {
            this.$$tabs.forEach($node => $node.classList.remove('active'))
            $tab.classList.add('active')
            //找到 tab的下标位置
            let index = [...this.$$tabs].indexOf($tab)
            this.$$contents.forEach($node => $node.classList.remove('active'))
            this.$$contents[index].classList.add('active')
        })
    }
}

const ImgUploader = {
    init() {
        this.$fileInput = $('#img-uploader')
        this.$textarea = $('.editor textarea')

        AV.init({
            appId: "YNTGzaacfDj2wy1k5icS82Ja-gzGzoHsz",
            appKey: "o275icdNAxWeMR3dcpBmOaAX",
            serverURLs: "https://yntgzaac.lc-cn-n1-shared.com"
        })

        this.bind()
    },
    bind() {
        let self = this
        this.$fileInput.onchange = function () {
            if (this.files.length > 0) {
                let localFile = this.files[0]
                console.log(localFile)
                if (localFile.size / 1048576 > 2) {
                    alert('文件不能超过2M')
                    return
                }

                self.insertText(`![上传中，进度0%]()`)
                let avFile = new AV.File(encodeURI(localFile.name), localFile)
                avFile.save({
                    keepFileName: true,
                    onprogress(progress) {
                        // console.log(progress.percent)
                        self.insertText(`![上传中，进度${progress.percent}%]()`)
                    }
                }).then(file => {
                    console.log('文件保存完成')
                    console.log(file)
                    let text = `![${file.attributes.name}](${file.attributes.url}?imageView2/0/w/800/h/400)`
                    self.insertText(text)
                }).catch(err => console.log(err))
            }
        }
    },
    insertText(text = '') {
        let $textarea = this.$textarea
        let start = $textarea.selectionStart
        let end = $textarea.selectionEnd
        let oldText = $textarea.value


        $textarea.value = `${oldText.substring(0, start)}${text} ${oldText.substring(end)}`
        $textarea.focus()
        $textarea.setSelectionRange(start, start + text.length)
    }
}

const Editor = {
    init() {
        console.log('Editor init...')
        this.$editInput = $('textarea')
        this.$saveBtn = $('.btn-save')

        //当页面没有markdown 时，自动输入模板 （# one slide）
        this.markdown = localStorage.markdown || `# one slide `
        this.$slideContainer = $('.slides')

        this.bind()
        this.start()
    },
    bind() {

        this.$saveBtn.onclick = () => {
            //把 editInput 的值不用保存到页面上，直接保存起来，之后页面重新刷新
            localStorage.markdown = this.$editInput.value
            location.reload()
        }
    },
    start() {
        //将 markdown 的内容保存到本地显示出来
        this.$editInput.value = this.markdown

        this.$slideContainer.innerHTML = convert(this.markdown)
        Reveal.initialize({
            controls: true,
            progress: true,
            center: localStorage.align === 'left-top' ? false : true,
            hash: true,
            transition: localStorage.transition || 'slide',
            // none/fade/slide/convex/concave/zoom        
            // More info https://github.com/hakimel/reveal.js#dependencies
            dependencies: [{
                src: 'plugin/markdown/marked.js',
                condition: function () {
                    return !!document.querySelector('[data-markdown]');
                }
            },
            {
                src: 'plugin/markdown/markdown.js',
                condition: function () {
                    return !!document.querySelector('[data-markdown]');
                }
            },
            {
                src: 'plugin/highlight/highlight.js'
            },
            {
                src: 'plugin/search/search.js',
                async: true
            },
            {
                src: 'plugin/zoom-js/zoom.js',
                async: true
            },
            {
                src: 'plugin/notes/notes.js',
                async: true
            }
            ]
        })
    }
}

const Theme = {
    init() {
        this.$$figures = $$('.themes figure')
        this.$transition = $('.transition')
        this.$align = $('.theme .align')
        this.$reveal = $('.reveal')

        this.bind()
        this.loadTheme()
    },
    bind() {
        this.$$figures.forEach($figure => $figure.onclick = () => {
            this.$$figures.forEach($item => $item.classList.remove('select'))
            $figure.classList.add('select')
            this.setTheme($figure.dataset.theme)
        })

        this.$transition.onchange = function () {
            localStorage.transition = this.value
            location.reload()
        }
        this.$align.onchange = function () {
            localStorage.align = this.value
            location.reload()
        }
    },
    setTheme(theme) {
        localStorage.theme = theme
        location.reload()
    },
    loadTheme() {
        // 切换 link ，改变主题样式
        let theme = localStorage.theme || 'beige'

        let $link = document.createElement('link')
        $link.rel = 'stylesheet'
        $link.href = `css/theme/${theme}.css`
        document.head.appendChild($link)


        Array.from(this.$$figures).find($figure => $figure.dataset.theme === theme).classList.add('select')
        this.$transition.value = localStorage.transition || 'slide'
        this.$align.value = localStorage.align || 'center'
        this.$reveal.classList.add(this.$align.value)
    }
}

const Print = {
    init() {
        this.$download = $('.download')
        this.bind()
        this.start()
    },
    bind() {
        this.$download.addEventListener('click', () => {
            let $link = document.createElement('a')
            $link.setAttribute('target', '_blank')
            $link.setAttribute('href', location.href.replace(/\#\/.*/, '?print-pdf'))
            $link.click()
        })
        window.onafterprint = () => window.close()
    },
    start() {
        let link = document.createElement('link')
        link.rel = 'stylesheet'
        link.type = 'text/css'
        if (window.location.search.match(/print-pdf/gi)) {
            link.href = 'css/print/pdf.css'
            window.print()
        }
        else {
            link.href = 'css/print/paper.css'
        }
        document.head.appendChild(link)
    }
}

const help = {
    init() {
        this.$helper = $('.markdown')
    }
}

const App = {
    init() {
        [...arguments].forEach(Module => Module.init())
    }
}

App.init(Menu, Editor, Theme, Print, ImgUploader)