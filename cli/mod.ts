import {
    pipe as $, b, i, c,
    darkorange,
} from "https://denopkg.com/gnlow/blue/mod.ts"

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

function hilitFirst(str: string) {
    const [first, ...rest] = str
    return c(darkorange)($(b, i)(first) + rest.join(""))
}

const commands = {
    view,
    v: view,

    make,
    m: make,

    download: download(pages),
    d: download(pages),

    test,
    t: test,

    purify,
    p: purify,

    bundle,
    b: bundle,
}

let targets: number[] = []

while (true) {
    const answer = prompt(
        [
            ...Object.keys(commands).filter(x => x.length != 1),
            "quit",
        ].map(hilitFirst).join(" / ")
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