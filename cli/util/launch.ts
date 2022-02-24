import pptr from "https://deno.land/x/puppeteer@9.0.2/mod.ts"

export async function launch() {
    const browser = await pptr.launch({
        headless: false,
        defaultViewport: null,
    })
    //const context = await browser.createIncognitoBrowserContext()
    
    return browser
}