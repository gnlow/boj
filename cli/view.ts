import pptr, * as P from "https://deno.land/x/puppeteer@9.0.2/mod.ts"
import { progress } from "./util/log.ts"

async function openPage(pages: P.Page[], browser: P.Browser) {
    const page = await browser.newPage()
    pages.push(page)
    return page
}
async function closePage(pages: P.Page[]) {
    await pages[pages.length - 1].close()
    pages.pop()
}

export const view = (pages: P.Page[], browser: P.Browser) => async function(targets: number[]) {
    while (targets.length < pages.length) {
        await closePage(pages)
        progress("Close tab")
    }

    while (pages.length < targets.length) {
        await openPage(pages, browser)
        progress("Open tab")
    }
    await Promise.all(pages.map(
        async (page, i) => {
            page.goto(`https://www.acmicpc.net/problem/${targets[i]}`)
        }
    ))
}