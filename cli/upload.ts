import pptr, * as P from "https://deno.land/x/puppeteer@9.0.2/mod.ts"
import { progress } from "./util/log.ts"

export const upload = (pages: P.Page[]) => async function(targets: number[]) {
    progress("Start >upload")
    await Promise.all(pages.map(
        async (page, i) => {
            const code = await Deno.readTextFile(`dist/${targets[i]}.min.js`)
            progress(`Load 'dist/${targets[i]}.min.js'`)
            await page.goto(
                `https://www.acmicpc.net/submit/${targets[i]}`,
                { waitUntil: "load" },
            )
            progress(`Load 'https://www.acmicpc.net/submit/${targets[i]}'`)
            await page.$eval(
                ".CodeMirror",
                (e, code) => e.CodeMirror.setValue(code),
                code,
            )
            await page.click("#submit_button")
            progress(`Upload #${targets[i]}`)
        }
    ))
}