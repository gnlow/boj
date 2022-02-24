import pptr, * as P from "https://deno.land/x/puppeteer@9.0.2/mod.ts"
import { progress, success } from "./log.ts"

const PORT = 9222

export async function launch() {
    progress("Launch")
    const { webSocketDebuggerUrl: wsUrl } =
        await fetch(`http://localhost:${PORT}/json/version`)
            .then(x => x.json())
            .catch(() => undefined)
    
    let browser: P.Browser
    if (wsUrl) {
        browser = await pptr.connect({
            browserWSEndpoint: wsUrl,
        })
        progress("Connect to existing browser")
    } else {
        browser = await pptr.launch({
            headless: false,
            defaultViewport: null,
            args: [
                `--remote-debugging-port=${PORT}`
            ],
        })
        progress("Launch new browser")
    }
    const [page] = await browser.pages()
    await page.goto("https://solved.ac/login?prev=%2Fclass")
    success("Launch")
    return browser
}