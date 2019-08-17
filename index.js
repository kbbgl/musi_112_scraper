const puppeteer = require('puppeteer');

// 23 lectures
// https://oyc.yale.edu/music/musi-112/lecture-{LECTURE_NUMBER}

for(i = 1; i < 24; i++){

    var url = `https:oyc.yale.edu/music/musi-112/lecture-${i}`;
    // console.log(`Scraping ${url}`);

}
(async () => {
    const browser = await puppeteer.launch({headless: true});

    const page = await browser.newPage();

    await page.goto("https://oyc.yale.edu/music/musi-112/lecture-23");
    
    // open transcript modal
    await page.click(".cboxElement");
    await page.waitForSelector("#cboxLoadedContent", {visible: true});

    var result = await page.evaluate(() => {
        
        let arr = [];
        // let transcriptElements = Array.prototype.slice.call(document.querySelector("#cboxLoadedContent").firstChild.children);
        let transcriptElements = document.querySelector("#cboxLoadedContent").firstChild.children;

        var i;
        for (i = 0; i < transcriptElements.length; i++) {
            var obj = {};
            obj.tag = transcriptElements[i].tagName;
            obj.text = transcriptElements[i].innerText;
            arr.push(obj);
        }
        return arr;
   }) 

   console.log(result[1]);
    browser.close();
})()