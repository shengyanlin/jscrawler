const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function example() 
{
    //use two list to store the data
    var titleList = [];
    var priceList = [];

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
    try 
    {
        // 跳轉到目標網頁
        await driver.get('https://www.gap.tw/plp/19082100002461.html');

        // 遍歷所有商品
        for(let i=1; i<=12; i++) 
        {
            for(let j=1; j<=8; j++) 
            {
                console.log("This is the",i,"row and",j,"column.")

                // 建立商品名稱和價格的css選擇器
                let titleSelector = `#app > div > section > div > div > div.contaier.float-clearfix > div > div:nth-child(${i}) > div > div.contaier.productList > div:nth-child(${j}) > div > div.title > a`;
                let priceSelector = `#app > div > section > div > div > div.contaier.float-clearfix > div > div:nth-child(${i}) > div > div.contaier.productList > div:nth-child(${j}) > div > div.price > span`;

                // 等待元素出現
                await driver.wait(until.elementLocated(By.css(titleSelector)), 10000);
                await driver.wait(until.elementLocated(By.css(priceSelector)), 10000);

                // 獲取元素
                let title = await driver.findElement(By.css(titleSelector));
                let price = await driver.findElement(By.css(priceSelector));

                // 獲取並列印名稱和價格
                let titleText = await title.getText();
                let priceText = await price.getText();

                console.log("Title:",titleText);
                console.log("Price:",priceText);
                
                //將名稱和價格加入list
                titleList.push(titleText);
                priceList.push(priceText);

                // 滾動到當前商品的位置
                await driver.executeScript('arguments[0].scrollIntoView(true);', price);
                                
                // 等待一下以模擬瀏覽網頁的行為
                await driver.sleep(1000);
                
            }
        }
        // 將list印出來
        console.log(titleList);
        console.log(priceList);
    } 
    finally 
    {
        await driver.quit();
    }
}
example();
