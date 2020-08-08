const puppeteer = require('puppeteer')
const download = require('image-downloader')

const crawlTitleAndLinks = async (url, string, callback) => {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()    
        await page.goto(url, {waitUntil: 'domcontentloaded'})
        const articles = await page.evaluate(function(_url, _string) {
            let titleLinks = document.querySelectorAll(_string)
            titleLinks = [...titleLinks]
            console.log(titleLinks)
            let articles = titleLinks.map(link => ({
                title: link.getAttribute('title'),
                url: _url + link.getAttribute('href'),
            }))
            
            return articles
        }, url, string)

        callback(undefined, articles) 
        await browser.close()
    } catch (e) {
        callback("The URL or REGEX is wrong!", undefined)
    }
    // console.log(articles)
}

const crawlImg = async (url, string) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, {waitUntil: 'domcontentloaded'})

    const imgLinks = await page.evaluate((_string) => {
        let imgElements = document.querySelectorAll(_string)
        imgElements = [...imgElements]
        let imgLinks = imgElements.map(i => i.getAttribute('src'))
        return imgLinks
    }, string);
    console.log(imgLinks)

    await Promise.all(imgLinks.map(imgUrl => download.image({
        url: imgUrl,
        dest: __dirname
    })));

    await browser.close()
}

module.exports = {
    crawlTitleAndLinks,
    crawlImg
}