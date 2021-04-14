// 本页面实现OneSlide的基本效果（当控制台输入的是Markdown时，页面会出现一个在线ppt效果）


//  一个或两个 # 表示方法，#{}        
    const isMain = str => (/^#{1,2}(?!#)/).test(str)
    const isSub = str => (/^#{3}(?!#)/).test(str)

    function convert(raw) {
        let arr = raw.split(/\n(?=\s*#)/).filter(s => s!="").map(s => s.trim())

    let html = ''
    for(let i=0; i<arr.length; i++) {

        if(arr[i+1] !== undefined) {

        //如果arr[0]是一个或两个 # 和  arr[1]是一个或两个 # 的
        if(isMain(arr[i]) && isMain(arr[i+1])) {
            //如果这一层和下一层都是一个页面，那么 section只有一层就好
            html += `
                <section data-markdown>
                <textarea data-template>
                ${arr[i]}
                </textarea>
                </section>
                ` 
        }
        else if(isMain(arr[i]) && isSub(arr[i+1])) {
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
        else if(isSub(arr[i]) && isSub(arr[i+1])) {
            html += `
			<section data-markdown>
			<textarea data-template>
			${arr[i]}
			</textarea>
			</section>
			`
        }
        else if(isSub(arr[i]) && isMain(arr[i+1])) {
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
    }
    else {
        //如果最后一个是主页面
        if(isMain(arr[i])) {
            html += `
                <section data-markdown>
                <textarea data-template>
                ${arr[i]}
                </textarea>
                </section> 
                `
        }
        //如果是子页面
        else if(isSub[i]) {
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

//设置原始的数据
function loadMarkdown(raw) {
	localStorage.markdown = raw
	location.reload()
}



function start() {
    let TPL = `# one Slide`
    //                          tpl  模板
    let html = convert(localStorage.markdown || TPL)
    document.querySelector('.slides').innerHTML = html
    Reveal.initialize({
        controls: true,
        progress: true,
        center: true,
        hash: true,

        transition: 'slide', // none/fade/slide/convex/concave/zoom

        // More info https://github.com/hakimel/reveal.js#dependencies
        dependencies: [
            { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'plugin/highlight/highlight.js' },
            { src: 'plugin/search/search.js', async: true },
            { src: 'plugin/zoom-js/zoom.js', async: true },
            { src: 'plugin/notes/notes.js', async: true }
        ]
    })
}

start()




