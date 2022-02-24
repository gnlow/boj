import pptr, * as P from "https://deno.land/x/puppeteer@9.0.2/mod.ts"
import { launch } from "./util/launch.ts"
import { progress } from "./util/log.ts"

import { bundle } from "./bundle.ts"
import { download } from "./download.ts"
import { make } from "./make.ts"
import { purify } from "./purify.ts"
import { test } from "./test.ts"

const browser = await launch()

const pages: P.Page[] = []

async function openPage() {
    const page = await browser.newPage()
    pages.push(page)
    return page
}
async function closePage() {
    await pages[pages.length - 1].close()
    pages.pop()
}

async function view(targets: number[]) {
    while (targets.length < pages.length) {
        await closePage()
        progress("Close tab")
    }

    while (pages.length < targets.length) {
        await openPage()
        progress("Open tab")
    }
    await Promise.all(pages.map(
        async (page, i) => {
            page.goto(`https://www.acmicpc.net/problem/${targets[i]}`)
        }
    ))
}

const commands = {
    bundle,
    b: bundle,

    download: download(pages),
    d: download(pages),

    make,
    m: make,

    purify,
    p: purify,

    test,
    t: test,

    view,
    v: view,
}

let targets: number[] = []

while (true) {
    const answer = prompt(
        [
            ...Object.keys(commands),
            "quit", "q",
        ].join(", ")
        + "\n targets: "
        + targets.join(" ")
        + "\n"
    ) || ""
    if (answer == "q") {
        break
    } else if (Number(answer[0])) {
        targets = answer.split(" ").map(Number)
    } else if (answer in commands) {
        console.log("do: " + answer)
        await commands[answer as keyof typeof commands](targets)
    }
}